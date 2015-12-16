$(function() {

  // bind event for VIEW EXAM button
  $('.view-exam').click(function(){
    var id = $(this).attr('eid'),
        uri = '21a.html?eid='+id;
    location.href = uri;
  });

  // init plugin: rowAccess
  $('.rowAccess').rowAccess();
  var apiRA = $('.rowAccess').data('rowAccess');

  // init plugin: modalInit & inpage script
  $('.delete-exam').each(function(i,e){
    var btn = $(e),
        row = btn.parent().parent();

    btn.modalInit({
      confirmCallback: function(){
        $.ajax({
          url: 'data/2101.php',
          data: {
            id: btn.attr('eid')
          },
          type: 'post',
          success: function(response){
            if(response == 1){
              apiRA.markRow(row,function(){
                btn.parent().html(''); // remove btn
              });              
            } else {
              alert((response=='')?'刪除不成功':response);
            }
          },
          error: function(response){
            console.log('error error')
          },
          complete: function(response){
            if(response.status == 404) alert('無法連結伺服器');
          }
        });
      }
    });

  });

  // re-send invitation
  $('.re-invitate').click(function(){
    var btn = $(this),
        eid = btn.attr('eid');

    $.ajax({
      url: 'data/2102.php',
      data: {
        id: btn.attr('eid')
      },
      type: 'post',
      success: function(response){
        alert(response);
      },
      error: function(response){
        console.log('error error')
      },
      complete: function(response){
        if(response.status == 404) alert('無法連結伺服器');
      }
    });
  });

});