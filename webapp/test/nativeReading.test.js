import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_NATIVE_READING, normalizeNativeReading } from '../src/state/readingPreferences.js';

test('native settings safely preserve real accessibility sizes and strict boolean states', () => {
  assert.equal(DEFAULT_NATIVE_READING.available,false);
  assert.deepEqual(normalizeNativeReading({textScale:53/17,voiceOver:true,hapticsAvailable:true}),
    {available:true,textScale:53/17,voiceOver:true,hapticsAvailable:true});
  for (const textScale of [0,-1,Infinity,NaN,100,'2',null]) {
    assert.deepEqual(normalizeNativeReading({textScale,voiceOver:'true',hapticsAvailable:1}),
      {available:true,textScale:1,voiceOver:false,hapticsAvailable:false});
  }
  assert.equal(normalizeNativeReading(undefined).textScale,1);
});
