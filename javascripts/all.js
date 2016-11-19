'use strict';

(function(){
  function ajax(url, done) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          done(httpRequest.responseText);
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  function loadBody(newPage){
    var body = newPage.querySelector('body');
    document.body.innerHTML = body.innerHTML;
  }

  function updateTitle(newPage){
    document.title = newPage.querySelector('title').innerText;
  }

  function turbolink(path){
    ajax(path, function(responseText){
      var newPage = document.createElement('html');
      newPage.innerHTML = responseText;
      loadBody(newPage);
      updateTitle(newPage);
      pageLoad();
    });
  }

  function anchorClick(e){
    var el = e.target;
    if(window.location.host === el.host && !e.ctrlKey && !e.metaKey){
      turbolink(el.href);
      history.pushState({}, '', el.href);
      e.preventDefault();
    }
  }

  function pageLoad(){
    var anchors = document.getElementsByTagName('a');
    for(var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', anchorClick);
    }
  }

  window.onpopstate = function(e){
    turbolink(window.location.href);
  }

  window.Blunckr = {
    pageLoad: pageLoad
  };
})();
