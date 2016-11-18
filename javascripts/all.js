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

  function ghettoLink(e){
    var el = e.target;
    if(window.location.host === el.host){
      ajax(el.href, function(responseText){
        var newPage = document.createElement('html');
        newPage.innerHTML = responseText;
        loadBody(newPage);
        updateTitle(newPage);
        history.pushState({}, '', el.href);
        pageLoad();
      });
      e.preventDefault();
    }
  }

  function pageLoad(){
    var anchors = document.getElementsByTagName('a');
    for(var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', ghettoLink);
    }
  }

  window.Blunckr = {
    pageLoad: pageLoad
  };
})();
