import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(dir,'../..');
const copy=JSON.parse(fs.readFileSync(path.join(dir,'ui_copy.json')));
const ids=['the_can_opener','space_walker','summoned_mage'];
const slugs=['can-opener','space-walker','summoned-mage'];
const saved=['scene_049','scene_024',null];
const books=ids.map((id,i)=>{
 const story=JSON.parse(fs.readFileSync(path.join(root,'webapp/src/data/stories',id+'.json')));
 const start=story.scenes[story.start_scene];
 const scene=story.scenes[saved[i]||story.start_scene];
 return {id,slug:slugs[i],title:story.title,description:story.description,genre:copy.genres[i],saved:Boolean(saved[i]),start:{title:start.title,text:start.text},resume:{title:scene.title,text:scene.text}};
});
fs.writeFileSync(path.join(dir,'data.js'),'window.DOORWAY_DEMO = '+JSON.stringify({copy,books},null,2)+';\n');
