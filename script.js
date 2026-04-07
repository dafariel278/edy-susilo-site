const dot=document.getElementById('dot'),ring=document.getElementById('ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){
  dot.style.left=mx+'px';dot.style.top=my+'px';
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.scard,.nav-avail').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('h'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('h'));
});
const heroImg=document.getElementById('heroImg');
addEventListener('mousemove',e=>{
  const xn=(e.clientX/innerWidth-.5),yn=(e.clientY/innerHeight-.5);
  heroImg.style.transform=`scale(1.06) translate(${xn*-12}px,${yn*-8}px)`;
});
gsap.registerPlugin(ScrollTrigger);
const tl=gsap.timeline({defaults:{ease:'power3.out'}});
tl.to('.h-num',{opacity:1,y:0,duration:.9,delay:.2})
  .to('.h-name',{opacity:1,y:0,duration:1.1},'-=.5')
  .to('.h-desc',{opacity:1,y:0,duration:.9},'-=.6')
  .to('.h-btn',{opacity:1,y:0,duration:.8},'-=.5');
document.querySelectorAll('.rv').forEach((el,i)=>{
  gsap.to(el,{
    scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},
    opacity:1,y:0,duration:.85,ease:'power3.out',delay:(i%3)*.1
  });
});
function drag(card){
  let sx,sy,sl,st,dragging=false,vx=0,vy=0,lx,ly;
  const down=e=>{
    e.preventDefault();
    dragging=true;sx=e.clientX;sy=e.clientY;
    sl=parseInt(card.style.left)||0;st=parseInt(card.style.top)||0;
    lx=sx;ly=sy;card.style.zIndex=50;
    gsap.to(card,{scale:1.04,duration:.2});
  };
  const move=e=>{
    if(!dragging)return;
    vx=e.clientX-lx;vy=e.clientY-ly;lx=e.clientX;ly=e.clientY;
    card.style.left=(sl+e.clientX-sx)+'px';
    card.style.top=(st+e.clientY-sy)+'px';
  };
  const up=()=>{
    if(!dragging)return;dragging=false;
    card.style.zIndex='';
    gsap.to(card,{scale:1,duration:.3});
    const cl=parseInt(card.style.left),ct=parseInt(card.style.top);
    gsap.to(card,{left:cl+vx*5,top:ct+vy*5,duration:.6,ease:'power2.out'});
  };
  card.addEventListener('mousedown',down);
  document.addEventListener('mousemove',move);
  document.addEventListener('mouseup',up);
  card.addEventListener('touchstart',e=>{
    const t=e.touches[0];
    sx=t.clientX;sy=t.clientY;
    sl=parseInt(card.style.left)||0;st=parseInt(card.style.top)||0;
    card.style.zIndex=50;gsap.to(card,{scale:1.04,duration:.2});
  },{passive:true});
  card.addEventListener('touchmove',e=>{
    e.preventDefault();const t=e.touches[0];
    card.style.left=(sl+t.clientX-sx)+'px';card.style.top=(st+t.clientY-sy)+'px';
  },{passive:false});
  card.addEventListener('touchend',()=>{
    card.style.zIndex='';gsap.to(card,{scale:1,duration:.3});
  });
}
document.querySelectorAll('.scard').forEach(drag);