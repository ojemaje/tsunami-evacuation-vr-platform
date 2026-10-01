(function(){
  document.querySelectorAll('.slides > section').forEach(function(sec){
    if(sec.hasAttribute('data-nofooter')) return;
    var sl=sec.querySelector('.sl'); if(!sl) return;
    var f=document.createElement('div'); f.className='ft';
    f.textContent='Matiss Corrigou · Soutenance de stage · 2 octobre 2026'+(sec.getAttribute('data-sec')?'  ·  '+sec.getAttribute('data-sec'):'');
    sl.appendChild(f);
  });
  Reveal.initialize({
    width:1280, height:720, margin:0, minScale:0.2, maxScale:2,
    hash:true, controls:false, progress:true, slideNumber:'c/t',
    transition:'fade', transitionSpeed:'fast', center:false, backgroundTransition:'none',
    keyboard:{78:null,84:null,82:null}  // n, t, r gérés ci-dessous
  });

  var panel=document.getElementById('notes-panel');
  var timer=document.getElementById('timer');
  var notesOn=false, timerOn=false, start=null, tick=null;

  function currentNotes(){
    var s=Reveal.getCurrentSlide();
    var a=s && s.querySelector('aside.notes');
    var title=s ? (s.getAttribute('data-title')||'') : '';
    return '<div class="nt">Notes orales · '+title+'</div>'+(a? a.innerHTML.replace(/\n/g,'<br>') : '(pas de notes)');
  }
  function refreshNotes(){ if(notesOn){ panel.innerHTML=currentNotes(); panel.scrollTop=0; } }
  function fmt(t){ var m=Math.floor(t/60), s=t%60; return (m<10?'0':'')+m+':'+(s<10?'0':'')+s; }
  function tickFn(){
    if(start===null){ timer.textContent='00:00'; return; }
    var t=Math.floor((Date.now()-start)/1000);
    timer.textContent=fmt(t)+' / 20:00';
    timer.className = t>=1200 ? 'over' : (t>=1020 ? 'warn' : '');
  }
  function startTimer(){ if(start===null){ start=Date.now(); } if(!tick){ tick=setInterval(tickFn,500);} tickFn(); }

  Reveal.on('slidechanged', function(e){
    refreshNotes();
    if(e.indexh>0 && start===null){ startTimer(); }   // le chrono démarre à la 2e diapo
  });

  document.addEventListener('keydown', function(e){
    if(e.ctrlKey||e.metaKey||e.altKey) return;
    var k=e.key.toLowerCase();
    if(k==='n'){ notesOn=!notesOn; panel.style.display=notesOn?'block':'none'; refreshNotes(); }
    if(k==='t'){ timerOn=!timerOn; timer.style.display=timerOn?'block':'none'; if(timerOn){ if(!tick){ tick=setInterval(tickFn,500);} tickFn(); } }
    if(k==='r'){ start=null; tickFn(); }
  });
})();
