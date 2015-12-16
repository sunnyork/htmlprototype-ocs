$(function() {

  $.fn.extend({
    trigSearch: function(userConf) {
      var conf = {},
          defaultConf = {
            kwContainer: $('#search-kw'), // {str} DOM ele for search box
            toPage: 1, // {num} jump to page N as displaying searching result
            rowSize:  10, // {num} show N pages once ( on pagination )
            tbody : $('#result-container'), // {str} DOM ele for inserting rows with data
            emptyRow : $('#row-prototype > tr'), // {str} DOM ele/ row template
            replaceBtn : '.replace-exam', // {str} selector / replace exam BTN @ emptyRow
            delBtn : '.del-exam', // {str} selector / del exam BTN @ emptyRow
            initRow : $('#row-init'), // {str} DOM ele/ default content (before querying)
            initNo : 0, //, // {num} the init. number ( 1st. col. @ 1st. row)
            paginationWrap : $('#pagination'), // {str} DOM ele / pagination outter wrap
            pagination : $('#pagination .pagination'), // {str} DOM ele / pagination innter wrap
            btns : $('.pagination-src li') // {str} DOM ele / pagination template
          },
          dataURI = 'data/examSearchResult1.php',
          replaceFileURI = 'data/2101.php',
          queryResult = {}, // {JSON} data fetched from back-end
          queryCondition = {}; // {JSON} query condition for searching items

      $.extend(conf,defaultConf,userConf);
      $.extend(queryCondition,{
        keyword: conf.keyword,
        toPage: conf.toPage,
        rowSize: conf.rowSize
      });

      return $(this).each(function(i, e) {

        var btn = $(e),
            test = 1;

        function trigSearch(){
          // private attr.
          var obj = this;

          // public func.
          obj.fetchData = function(cond){
            $.ajax({
              url: dataURI,
              dataType: 'json',
              async: false,
              data: cond,
              complete: function(data) {
                var obj = data.responseJSON.dataObj;
                if(!obj || obj.length ==0){
                  alert(findNothing);
                  return false;
                }else {
                  return $.extend(queryResult,data.responseJSON);
                }
              }
            });
            return queryResult;
          };
          obj.appendData = function(dataSrc,callBack) {
            var tbody = conf.tbody,
                initNo = conf.initNo;
            conf.initRow.hide(); // hide init info
            conf.tbody.html(' '); // clear old data
            $.each(dataSrc,function(i,e){
              var id = i,
                  row = conf.emptyRow.clone(),
                  desc = dataSrc[i].desc, // {str} exam description
                  date = dataSrc[i].date, // {str} date
                  delBtn = $(conf.delBtn,row),
                  replaceBtn = $(conf.replaceBtn,row),
                  td = $('td', row), // {DOM} get all TD in this row
                  j = 0,
                  no = (function() { // gen continous number from 0 ~ 10
                    initNo++;
                    return initNo;
                  })();
              td.eq(0).html(no);
              td.eq(1).html(id);
              td.eq(2).html(desc);
              td.eq(3).html(date);
              delBtn.attr('eid',id);
              replaceBtn.attr('eid',id);
              row.appendTo(tbody);
            });
            callBack(); // bind btn behavior
          };
          obj.bindBtn = function(tbody){
            var delBtn = tbody.find(conf.delBtn),
                replaceBtn = tbody.find(conf.replaceBtn);
            tbody.rowAccess();
            apiRA = tbody.data('rowAccess');

            delBtn.each(function(i,e){
              var btn = $(e),
                  row = btn.parent().parent();

              btn.modalInit({
                confirmCallback:function(){

                  $.ajax({
                    url:replaceFileURI,
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

            replaceBtn.each(function(i,e){
              $(e).modalInit({
                modalContainer:'#replace-container',
                cancelBtn: '#replace-cancel',
                confirmBtn: '#replace-confirm',
                openCallback: function(){
                  var idFlag = $('#replace-exam-id'),
                      eid = $(e).attr('eid'),
                      fileInput = $('#replace-exam-file'),
                      newFileInput = $('<input type="file" name="exam-file" id="replace-exam-file">');
                  idFlag.val(eid);
                  fileInput.remove();
                  newFileInput.insertBefore(idFlag);
                }
              });
            });
          };
          obj.setPagination = function(page){
            var outter = conf.paginationWrap,
                inner = conf.pagination,
                btns = conf.btns,
                prevRowBtn = btns.eq(0),
                btn = btns.eq(1),
                nextRowBtn = btns.eq(2),
                current = page.current, // current page
                startPage = page.startPage, // start of pagination no. ( this row @ this query)
                pagesLength = page.pagesLength, // how many pages to show for this row @ this query
                endPage = page.startPage + pagesLength - 1, // end of pagination ( this row @ this query)
                finalPage = page.finalPage, // last page # of THIS QUERY (!= this page)
                i = startPage;

            inner.html(' '); // clear old buttons
            //gen. btn for previous row (default: previous 10)
            if (0 != startPage - 1) {
              prevRowBtn.clone().trigSearch({
                toPage: startPage - 1
              }).appendTo(inner);
            }
            // gen. pagination buttons        
            while (i <= endPage) {
              var newBtn = btn.clone();
              newBtn
                .find('a').text(i).end()
                .appendTo(inner);
              if (i == current) {
                newBtn.addClass('active');
              }
              newBtn.trigSearch({
                toPage: i
              })
              i++;
            }
            // gen btn for next 10 (default: next 10)
            if (endPage < finalPage) {
              nextRowBtn.clone().trigSearch({
                toPage: endPage + 1
              }).appendTo(inner);
            }
          };
          obj.init = function(){
            btn.click(function(){ // while search btn triggered
              var result = obj.fetchData($.extend(queryCondition,{ // fetch data
                keyword:conf.kwContainer.val()
              }));
              obj.appendData(result.dataObj,function(){ // append result
                obj.bindBtn(conf.tbody); // bind behavior for del & replace btn.
                obj.setPagination(result.pagination); // reset the pagination
              });             
            });
          };
        }
        var trigSearch = new trigSearch();
        $(e).data('trigSearch', trigSearch); // API
        trigSearch.init();
      });
    }
  });
  
  $('#go-search').trigSearch();

});