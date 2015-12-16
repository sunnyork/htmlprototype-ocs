$(function() {

  (function(){

    var panel = '.panel',
        head = '.panel-heading',
        body = '.panel-collapse',
        headOn = 'score-open',
        panelShow = 'in';
        
    $(head).mousedown(function(){
      var phead = $(this),
          ppanel = phead.next();
      if(phead.hasClass(headOn)){
        phead.removeClass(headOn);
        ppanel.hide(400).removeClass(panelShow);
      }else{
        phead.addClass(headOn)
          .parent().siblings().find(head).removeClass(headOn).end()
          .find(body).hide(400).removeClass(panelShow);
        ppanel
          .show(400).addClass(panelShow);
      }
    });

  })();

});