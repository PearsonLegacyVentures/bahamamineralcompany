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
    var map={poultry:'Poultry calcium',landscape:'Landscape materials',design:'Design / architecture',bulk:'Bulk material'};
    if(topic&&map[topic])form.elements.interest.value=map[topic];
    form.addEventListener('submit',function(event){
      event.preventDefault();if(!form.reportValidity())return;
      var data=new FormData(form);
      var value=function(name){return String(data.get(name)||'').trim()};
      var subject='BMC inquiry: '+value('interest');
      var body='Name: '+value('name')+'\nEmail: '+value('email')+'\nOrganization: '+value('organization')+'\nIsland / location: '+value('location')+'\nTopic: '+value('interest')+'\n\nInquiry:\n'+value('message');
      location.href='mailto:info@soilgold.bs?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }
})();
