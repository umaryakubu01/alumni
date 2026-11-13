(function(){
var P={
home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
power:'<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/>',
award:'<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
next:'<path d="m9 18 6-6-6-6"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
cap:'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'};
function ic(n){return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true">'+P[n]+'</svg>'}
var SIL='<svg class="sil" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="36" r="18"/><path d="M12 100c0-24 17-38 38-38s38 14 38 38z"/></svg>';
function ph(p,cls,yr){return '<div class="ph'+(cls?' '+cls:'')+'" data-sv="'+p.service+'">'+SIL+(p.photo?'<img src="assets/photos/'+p.photo+'" alt="">':'')+(yr?'<span class="yr">'+p.year+'</span>':'')+'</div>'}
function fx(i){return ' fx" style="--i:'+i+'"'}
var A=ALUMNI.slice().sort(function(a,b){return b.year-a.year});
var S={view:'home',mode:'roll',country:'All'},spotT,idleT,spotI=0;
var stage=document.getElementById('stage'),sheet=document.getElementById('profile'),nav=document.getElementById('nav'),dlg=document.getElementById('dlg');
document.getElementById('sample').textContent=window.SAMPLE_CONTENT?'Sample content. Every name, rank and date on this screen is invented for design and testing.':'';
document.getElementById('quit').innerHTML=ic('power')+'Close app';
function byCourse(c){return A.filter(function(a){return a.course===c})}
function best(){return A.filter(function(a){return a.best})}
function navRender(){
  nav.innerHTML=[['home','home','Start'],['Junior Course','cap','Junior Course'],['Senior Course','shield','Senior Course']].map(function(i){return '<button class="tab'+(S.view===i[0]?' on':'')+'" data-go="'+i[0]+'">'+ic(i[1])+i[2]+'</button>'}).join('');
}
function home(){
  clearInterval(spotT);var b=best();
  stage.innerHTML='<div class="home"><div class="hl"><h1 class="'+fx(0).slice(1)+'>Alumni</h1><p class="'+fx(1).slice(1)+'>Officers who completed the Junior Course or the Senior Course at the Department of Air Warfare. Choose a course to begin.</p>'+
  '<div class="entries">'+Object.keys(COURSES).map(function(c,i){return '<button class="entry'+fx(2+i)+' data-go="'+c+'"><span><strong>'+c+'</strong><small>Established '+COURSES[c].since+'</small></span>'+ic('next')+'</button>'}).join('')+'</div>'+
  '<div class="hist'+fx(4)+'><h3>History of the Department</h3><ul class="track">'+MILESTONES.map(function(m,i){return '<li><b>'+m.year+'</b>'+m.text+'</li>'}).join('')+'</ul></div></div>'+
  '<button class="spot'+fx(3)+' id="spot"><h3>Alumni spotlight</h3><div class="sb" id="sb"></div></button></div>';
  function spot(){var p=b[spotI%b.length],el=document.getElementById('spot'),sb=document.getElementById('sb');if(!el)return;el.dataset.p=p.id;
    sb.innerHTML=ph(p,'',true)+'<div class="rk">'+p.rank+'</div><div class="nm">'+p.name+'</div><p>'+p.reason+'</p><span class="more">View profile '+ic('next')+'</span>'}
  spot();
  spotT=setInterval(function(){var sb=document.getElementById('sb');if(!sb)return;sb.classList.add('fade');setTimeout(function(){spotI++;spot();sb.classList.remove('fade')},400)},9000);
}
function row(p,i){return '<button class="row'+fx(i)+' data-p="'+p.id+'"><span class="y">'+p.year+'</span>'+ph(p,'th')+'<span><span class="nm">'+p.name+(p.best?ic('award'):'')+'</span><br><span class="rk">'+p.rank+'</span></span><span class="meta">'+p.country+'<br>'+p.service+'</span>'+ic('next')+'</button>'}
function card(p,i){return '<button class="card'+fx(i)+' data-p="'+p.id+'">'+ph(p,'',true)+'<div class="in"><div class="rk">'+p.rank+'</div><div class="nm">'+p.name+(p.best?ic('award'):'')+'</div><div class="ct">'+p.country+'</div></div></button>'}
function bp(p,i){return '<button class="bp'+fx(i)+' data-p="'+p.id+'"><div class="top2"><span class="y">'+p.year+'</span>'+ph(p,'th')+'</div><div><div class="rk">'+p.rank+'</div><div class="nm">'+p.name+'</div></div><p>'+p.reason+'</p></button>'}
function list(){
  clearInterval(spotT);
  var all=byCourse(S.view),cs=['All'].concat(Array.from(new Set(all.map(function(a){return a.country}))).sort());
  var rows=S.mode==='best'?all.filter(function(a){return a.best}):all.filter(function(a){return S.country==='All'||a.country===S.country});
  var V=[['roll','list','Roll by year'],['wall','grid','Photo wall'],['best','award','Best participants']];
  var body=S.mode==='roll'?'<div class="roll" style="--r:'+Math.ceil(rows.length/2)+'">'+rows.map(row).join('')+'</div>':S.mode==='wall'?'<div class="wall">'+rows.map(card).join('')+'</div>':'<div class="bests">'+rows.map(bp).join('')+'</div>';
  stage.innerHTML='<div class="chead'+fx(0)+'><div><h2>'+S.view+' alumni</h2><p>Established '+COURSES[S.view].since+'. Most recent first. Tap a name to open the profile.</p></div><div class="views">'+V.map(function(v){return '<button class="'+(S.mode===v[0]?'on':'')+'" data-m="'+v[0]+'">'+ic(v[1])+v[2]+'</button>'}).join('')+'</div></div>'+
  (S.mode==='best'?'':'<div class="chips'+fx(1)+'>'+cs.map(function(c){return '<button class="chip'+(S.country===c?' on':'')+'" data-c="'+c+'">'+(c==='All'?'All countries':c)+'</button>'}).join('')+'</div>')+body;
  stage.scrollTop=0;
}
function show(v){S.view=v;S.mode='roll';S.country='All';closeP();navRender();v==='home'?home():list()}
function openP(id){
  var p=ALUMNI.find(function(a){return a.id===id});
  sheet.innerHTML='<div class="bar"><button class="btn" data-close>'+ic('back')+'Back to '+(S.view==='home'?'start':'list')+'</button></div>'+
  '<div class="pgrid" data-sv="'+p.service+'"><div>'+ph(p,'',true)+'<dl class="facts"><div><dt>Service</dt><dd>'+p.service+'</dd></div><div><dt>Country</dt><dd>'+p.country+'</dd></div><div><dt>Course</dt><dd>'+p.course+'</dd></div><div><dt>Completed</dt><dd>'+p.year+'</dd></div></dl></div>'+
  '<div><div class="rk">'+p.rank+'</div><h2>'+p.name+'</h2>'+(p.best?'<span class="badge">'+ic('award')+'Best participant, '+p.course+' '+p.year+'</span>':'')+
  '<div class="sec"><h3>Reason for inclusion</h3><p>'+p.reason+'</p></div>'+
  '<div class="sec"><h3>Achievements</h3><ul class="l">'+p.achievements.map(function(a){return '<li>'+a+'</li>'}).join('')+'</ul></div>'+
  '<div class="sec"><h3>Career milestones</h3><ul class="track">'+p.timeline.map(function(t){return '<li><b>'+t[0]+'</b>'+t[1]+'</li>'}).join('')+'</ul></div>'+
  '<p class="note">Rank shown is the highest rank in the record, not the rank held during the course.</p></div></div>';
  sheet.scrollTop=0;sheet.classList.add('open');sheet.setAttribute('aria-hidden','false');
}
function closeP(){sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true')}
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-go],[data-m],[data-c],[data-p],[data-close],[data-quit],[data-stay],[data-quit-yes]');if(!t)return;
  if(t.hasAttribute('data-quit')){dlg.classList.add('open');return}
  if(t.hasAttribute('data-stay')){dlg.classList.remove('open');return}
  if(t.hasAttribute('data-quit-yes')){window.close();setTimeout(function(){document.getElementById('dmsg').textContent='This window could not close itself. Press Alt and F4 together to exit.'},500);return}
  if(t.dataset.go)show(t.dataset.go);
  else if(t.dataset.m){S.mode=t.dataset.m;list()}
  else if(t.dataset.c){S.country=t.dataset.c;list()}
  else if(t.dataset.p)openP(t.dataset.p);
  else closeP();
});
function idle(){clearTimeout(idleT);idleT=setTimeout(function(){if(S.view!=='home'||sheet.classList.contains('open'))show('home')},90000)}
['pointerdown','scroll','keydown'].forEach(function(ev){document.addEventListener(ev,idle,true)});
idle();show('home');
})();
