(function(){
  var menu=document.querySelector('.menu-toggle');
  var nav=document.querySelector('.primary-nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){var open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.classList.toggle('is-open',!open)});
    nav.addEventListener('click',function(event){if(event.target.closest('a')){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open')}});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open')}});
  }
  var form=document.querySelector('#inquiry-form');
  if(form){
    var params=new URLSearchParams(location.search);
    var topic=params.get('interest');
    var map={poultry:'Poultry calcium',landscape:'Landscape materials',design:'Design / architecture',bulk:'Bulk material',agriculture:'Agriculture / soil','personal-care':'Personal care',research:'Materials research'};
    if(topic&&map[topic])form.elements.interest.value=map[topic];
    form.addEventListener('submit',function(event){
      event.preventDefault();if(!form.reportValidity())return;
      var data=new FormData(form);
      var value=function(name){return String(data.get(name)||'').trim()};
      var subject='BMC inquiry: '+value('interest');
      var body='Name: '+value('name')+'\nEmail: '+value('email')+'\nOrganization: '+value('organization')+'\nIsland / location: '+value('location')+'\nTopic: '+value('interest')+'\n\nInquiry:\n'+value('message');
      location.href='mailto:amar@bahamamineralcompany.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }
  function activateTab(tab, tabs, panels, focus){
    var index=tabs.indexOf(tab);
    tabs.forEach(function(item,i){item.setAttribute('aria-selected',String(i===index));item.tabIndex=i===index?0:-1});
    panels.forEach(function(panel,i){panel.hidden=i!==index});
    if(focus)tab.focus();
    return index;
  }
  var explorer=document.querySelector('.possibility-explorer');
  if(explorer){
    var galleryTabs=Array.from(explorer.querySelectorAll('.possibility-tab'));
    var galleryPanels=galleryTabs.map(function(tab){return document.getElementById(tab.getAttribute('aria-controls'))});
    var counter=explorer.querySelector('.possibility-progress');
    function selectGallery(index,focus){
      index=(index+galleryTabs.length)%galleryTabs.length;
      activateTab(galleryTabs[index],galleryTabs,galleryPanels,focus);
      counter.textContent=String(index+1).padStart(2,'0')+' / '+String(galleryTabs.length).padStart(2,'0');
      galleryTabs[index].scrollIntoView({block:'nearest',inline:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
    galleryTabs.forEach(function(tab,i){
      tab.addEventListener('click',function(){selectGallery(i,false)});
      tab.addEventListener('keydown',function(event){
        if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();selectGallery(i+(event.key==='ArrowRight'?1:-1),true)}
        if(event.key==='Home'||event.key==='End'){event.preventDefault();selectGallery(event.key==='Home'?0:galleryTabs.length-1,true)}
      });
    });
    explorer.querySelector('.possibility-prev').addEventListener('click',function(){selectGallery(galleryTabs.findIndex(function(tab){return tab.getAttribute('aria-selected')==='true'})-1,false)});
    explorer.querySelector('.possibility-next').addEventListener('click',function(){selectGallery(galleryTabs.findIndex(function(tab){return tab.getAttribute('aria-selected')==='true'})+1,false)});
  }
  document.querySelectorAll('.award-roadmap').forEach(function(roadmap){
    var tabs=Array.from(roadmap.querySelectorAll('[role="tab"]'));
    var panels=tabs.map(function(tab){return roadmap.querySelector('#'+tab.getAttribute('aria-controls'))});
    tabs.forEach(function(tab,i){
      tab.addEventListener('click',function(){activateTab(tab,tabs,panels,false)});
      tab.addEventListener('keydown',function(event){
        if(event.key==='ArrowRight'||event.key==='ArrowDown'||event.key==='ArrowLeft'||event.key==='ArrowUp'){
          event.preventDefault();
          activateTab(tabs[(i+(event.key==='ArrowRight'||event.key==='ArrowDown'?1:-1)+tabs.length)%tabs.length],tabs,panels,true);
        }
      });
    });
  });
})();
