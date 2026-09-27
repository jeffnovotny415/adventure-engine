const {copy,books}=window.DOORWAY_DEMO;
const query=new URLSearchParams(location.search),fresh=query.get('state')==='fresh';
if(query.has('large'))document.documentElement.classList.add('large');
const $=s=>document.querySelector(s),dialog=$('#entry');let selected=null,origin=null,restarting=false,timer=null;
for(const id of ['note','heading','hint','back','sample'])$('#'+id).textContent=copy[id];
$('#close').ariaLabel=copy.close;
for(const [i,book]of books.entries()){
 const saved=book.saved&&!fresh;
 const button=document.createElement('button');button.className='door';button.dataset.index=i;button.dataset.saved=saved;button.setAttribute('aria-haspopup','dialog');
 button.innerHTML=`<span class="door-art"><img src="assets/${book.slug}.webp" width="1024" height="1536" alt=""><span class="ribbon" aria-hidden="true"></span></span><span class="genre"></span><span class="title"></span><span class="action"></span>`;
 button.querySelector('.genre').textContent=book.genre;button.querySelector('.title').textContent=book.title;button.querySelector('.action').textContent=saved?copy.continue:copy.begin;
 button.onclick=()=>{selected={...book,saved};origin=button;restarting=false;showEntry();dialog.showModal();$('#enter').focus()};$('#doors').append(button);
}
function showEntry(){
 $('#entry-image').src='assets/'+selected.slug+'.webp';$('#entry-genre').textContent=selected.genre;
 $('#entry-title').textContent=restarting?copy.restartTitle:selected.title;
 $('#entry-description').textContent=restarting?copy.restartHelp:selected.description;
 $('#place').hidden=!selected.saved||restarting;$('#place-label').textContent=copy.resumeLabel;$('#place-title').textContent=selected.resume.title;
 $('#enter').textContent=restarting?copy.restartConfirm:selected.saved?copy.continue:copy.begin;
 $('#restart').hidden=!selected.saved;$('#restart').textContent=restarting?copy.cancel:copy.restart;
}
function close(){clearTimeout(timer);dialog.classList.remove('entering');$('#enter').disabled=false;dialog.close();origin?.focus()}
$('#close').onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});
$('#restart').onclick=()=>{restarting=!restarting;showEntry();$('#enter').focus()};
$('#enter').onclick=()=>{
 const scene=selected.saved&&!restarting?selected.resume:selected.start;
 $('#enter').disabled=true;dialog.classList.add('entering');
 timer=setTimeout(()=>{dialog.classList.remove('entering');$('#enter').disabled=false;dialog.close();$('#library').hidden=true;$('#reader').hidden=false;
 $('#reader-book').textContent=selected.title;$('#reader-title').textContent=scene.title;$('#reader-text').replaceChildren();
 for(const text of scene.text.trim().split(/\n\s*\n/)){const p=document.createElement('p');p.textContent=text.replaceAll('{world_name}','your neighborhood').replaceAll('{hero_name}','Reader');$('#reader-text').append(p)}
 window.scrollTo(0,0);$('#reader-title').focus();},matchMedia('(prefers-reduced-motion: reduce)').matches?0:360);
};
$('#back').onclick=()=>{$('#reader').hidden=true;$('#library').hidden=false;origin?.focus();origin?.scrollIntoView({block:'nearest'})};
