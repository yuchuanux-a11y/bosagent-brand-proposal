const names=['封面','关键词','竞品分析 01','竞品分析 02','品牌主张与定位','设计策略','设计概念'];
const dialog=document.querySelector('#slides');
const slideImage=document.querySelector('#slide-image');
const prev=document.querySelector('#prev-slide'),next=document.querySelector('#next-slide');
let slide=0,toastTimer;
function renderSlide(){
 const src='assets/slide-0'+(slide+1)+'.png';
 slideImage.src=src;slideImage.alt=names[slide]+'原稿';
 document.querySelector('#slide-title').textContent=names[slide];
 document.querySelector('#slide-counter').textContent=String(slide+1).padStart(2,'0')+' / 07';
 document.querySelector('#slide-download').href=src;
 prev.disabled=slide===0;next.disabled=slide===names.length-1;
}
document.querySelectorAll('[data-open-slides]').forEach(button=>button.addEventListener('click',()=>{
 slide=Number(button.dataset.openSlides);renderSlide();dialog.showModal();document.body.classList.add('viewer-open');
}));
document.querySelector('#close-viewer').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('viewer-open'));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
prev.addEventListener('click',()=>{if(slide>0){slide--;renderSlide()}});
next.addEventListener('click',()=>{if(slide<6){slide++;renderSlide()}});
dialog.addEventListener('keydown',e=>{
 if(e.key==='ArrowLeft'&&slide>0){e.preventDefault();slide--;renderSlide()}
 if(e.key==='ArrowRight'&&slide<6){e.preventDefault();slide++;renderSlide()}
});
const toast=document.querySelector('#toast');
function notify(message){toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),5000)}
document.querySelector('#share').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(location.href);notify('链接已复制，可分享给团队成员')}
 catch{notify('可复制地址栏链接分享：'+location.href)}
});
const nav=[...document.querySelectorAll('.desktop-nav a')];
const sections=nav.map(a=>document.querySelector(a.getAttribute('href')));
function markCurrent(){
 const line=Math.min(200,innerHeight*0.3);let current=null;
 for(const section of sections){if(section.getBoundingClientRect().top<=line)current=section.id}
 nav.forEach(a=>{const active=a.hash==='#'+current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
}
let queued=false;addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{markCurrent();queued=false})}},{passive:true});
addEventListener('resize',markCurrent);markCurrent();

