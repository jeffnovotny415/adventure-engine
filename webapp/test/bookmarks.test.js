import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmptySave, migrateSave } from '../src/state/saveSchema.js';
import { createGameSession } from '../src/state/gameSession.js';
import { loadSave, startSavedGame, discardInvalidSave } from '../src/state/storage.js';
import { readingTextScale, TEXT_SCALES } from '../src/state/readingPreferences.js';
const link = { next_scene:'end' };
const stories = Object.fromEntries(['a','b','c'].map(id=>[id,{id,scenes:{start:{choices:{1:link}},end:{ending:true}}}]));
function fixture(initial = null) {
  let raw=initial;
  return {fail:false,getItem:()=>raw,setItem(k,v){if(this.fail)throw Error('quota');raw=v;},removeItem(){if(this.fail)throw Error('denied');raw=null;}};
}
const start = (session,id) => session.startNewGame(id,`Hero ${id}`,`World ${id}`,'start');
const legacy = () => ({...createEmptySave(),storyId:'a',currentSceneId:'start',heroName:'Original',worldName:'Original world'});

test('legacy bookmark migrates only on successful write and survives starting another book',()=>{
  const raw=JSON.stringify(legacy(),null,2), storage=fixture(raw), session=createGameSession(stories,storage);
  assert.equal(loadSave(stories,storage).save.heroName,'Original');
  assert.equal(storage.getItem(),raw);
  storage.fail=true; assert.equal(start(session,'b').status,'write_failed'); assert.equal(storage.getItem(),raw);
  storage.fail=false;session.retryPersistence();
  assert.equal(loadSave(stories,storage,'a').save.heroName,'Original');
  assert.equal(loadSave(stories,storage,'b').save.heroName,'Hero b');
});
test('each book retains its names, scene, reading anchor and text size on resume',()=>{
  const storage=fixture(),session=createGameSession(stories,storage);
  start(session,'a');session.updateReading({readingPosition:{paragraph:12,offset:39},uiPrefs:{largeText:true}});
  start(session,'b');session.updateReading({readingPosition:{paragraph:3,offset:0},uiPrefs:{largeText:false}});
  const reloaded=createGameSession(stories,storage);
  assert.equal(reloaded.continueGame('a').save.heroName,'Hero a');
  assert.deepEqual(reloaded.getSnapshot().save.readingPosition,{paragraph:12,offset:39});
  assert.equal(reloaded.getSnapshot().save.uiPrefs.largeText,true);
  reloaded.continueGame('b');assert.equal(reloaded.getSnapshot().save.uiPrefs.largeText,false);
  assert.deepEqual(reloaded.getSnapshot().save.readingPosition,{paragraph:3,offset:0});
});
test('choosing resets the old scene anchor but keeps that book text preference',()=>{
  const session=createGameSession(stories,fixture());start(session,'a');
  session.updateReading({readingPosition:{paragraph:12,offset:39},uiPrefs:{largeText:true}});session.applyChoice(link);
  assert.equal(session.getSnapshot().save.readingPosition,null);assert.equal(session.getSnapshot().save.uiPrefs.largeText,true);
});
test('ending cleanup and restart affect only the selected book',()=>{
  const storage=fixture(),session=createGameSession(stories,storage);
  start(session,'a');start(session,'b');session.continueGame('a');session.applyChoice(link);session.finishGame();
  assert.equal(loadSave(stories,storage,'a').status,'empty');assert.equal(loadSave(stories,storage,'b').status,'valid');
  const before=storage.getItem();session.updateReading({uiPrefs:{largeText:true}});assert.equal(storage.getItem(),before);
  assert.equal(session.getSnapshot().save.uiPrefs.largeText,true);
  start(session,'a');assert.deepEqual(Object.keys(loadSave(stories,storage).books).sort(),['a','b']);
});
test('failed partial cleanup preserves every bookmark and supports retry',()=>{
  const storage=fixture(),session=createGameSession(stories,storage);start(session,'a');start(session,'b');session.applyChoice(link);
  const before=storage.getItem();storage.fail=true;assert.equal(session.finishGame().status,'delete_failed');assert.equal(storage.getItem(),before);
  storage.fail=false;assert.equal(session.retryPersistence().status,'empty');assert.equal(loadSave(stories,storage,'a').status,'valid');
});
test('stale page-position writes do not replace newer library state',()=>{
  const storage=fixture(),one=createGameSession(stories,storage),two=createGameSession(stories,storage);
  start(one,'a');two.continueGame('a');start(one,'b');const before=storage.getItem();
  assert.equal(two.updateReading({readingPosition:{paragraph:1,offset:1}}).status,'conflict');assert.equal(storage.getItem(),before);
});
test('failed position/preferences writes keep the original bookmark until retry',()=>{
  const storage=fixture(),session=createGameSession(stories,storage);start(session,'a');const before=storage.getItem();
  storage.fail=true;assert.equal(session.updateReading({readingPosition:{paragraph:8,offset:2},uiPrefs:{largeText:true}}).status,'write_failed');assert.equal(storage.getItem(),before);
  storage.fail=false;session.retryPersistence();assert.equal(loadSave(stories,storage).save.uiPrefs.largeText,true);
});
test('malformed or future libraries are preserved and cannot be overwritten',()=>{
  for(const patch of [{version:9},{books:[]},{lastStoryId:'missing'},{books:{a:{...legacy(),version:99}}}]){
    const raw=JSON.stringify({format:'paths_of_wonder_library',version:1,lastStoryId:'a',books:{a:legacy()},...patch});const storage=fixture(raw);
    assert.equal(loadSave(stories,storage).status,'invalid');assert.equal(startSavedGame(legacy(),stories,storage).status,'invalid');assert.equal(storage.getItem(),raw);
    assert.equal(discardInvalidSave('stale',stories,storage).status,'invalid');assert.equal(storage.getItem(),raw);
  }
});
test('invalid reading positions/text preferences cannot enter a save',()=>{
  for(const readingPosition of [{paragraph:-1,offset:0},{paragraph:0,offset:-1},{paragraph:1.5,offset:0},[],{paragraph:Infinity,offset:0}])assert.equal(migrateSave({...legacy(),readingPosition},stories).status,'invalid');
  assert.equal(migrateSave({...legacy(),uiPrefs:{largeText:'yes'}},stories).status,'invalid');
});

test('legacy larger text remains readable and each supported size survives a restart', () => {
  assert.equal(readingTextScale(migrateSave(legacy(), stories).save.uiPrefs), 1);
  assert.equal(readingTextScale(migrateSave({...legacy(),uiPrefs:{largeText:true}},stories).save.uiPrefs), 1.28);
  const storage=fixture(), session=createGameSession(stories,storage);
  start(session,'a'); start(session,'b');
  for (const textScale of TEXT_SCALES) {
    session.continueGame('a');
    session.updateReading({readingPosition:{paragraph:8,offset:7},uiPrefs:{textScale}});
    const restored=createGameSession(stories,storage).continueGame('a').save;
    assert.equal(readingTextScale(restored.uiPrefs),textScale);
    assert.deepEqual(restored.readingPosition,{paragraph:8,offset:7});
    assert.equal(readingTextScale(loadSave(stories,storage,'b').save.uiPrefs),1);
  }
});

test('invalid sizes and failed size writes preserve the previous bookmark', () => {
  const storage=fixture(),session=createGameSession(stories,storage); start(session,'a');
  const before=storage.getItem();
  for(const textScale of [0,-1,100,1.3,'2',null,Infinity,NaN]) {
    assert.equal(session.updateReading({uiPrefs:{textScale}}).status,'ignored');
    assert.equal(storage.getItem(),before);
  }
  storage.fail=true;
  assert.equal(session.updateReading({uiPrefs:{textScale:2.25}}).status,'write_failed');
  assert.equal(storage.getItem(),before);
  assert.equal(readingTextScale(session.getSnapshot().save.uiPrefs),1);
  storage.fail=false; session.retryPersistence();
  assert.equal(readingTextScale(loadSave(stories,storage).save.uiPrefs),2.25);
});
