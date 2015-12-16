$(function() {

  // examinee list highlight effect
  (function(){
    var inputs = $('.examinee-list input'),
        // {str} colors
        highlight = '#de6600',
        regularBG = '#e8e8e8',
        regularColor = '#333'; 
    inputs.change(function(){
      var input = $(this),
          inputField = $(this).parent(),
          examineeName = inputField.next();
      if (input.prop('checked')) {
        inputField.css('background-color',highlight);
        examineeName.css('color',highlight);        
      } else {
        inputField.css('background-color',regularBG);
        examineeName.css('color',regularColor);
      }
    });
  }());

  // gen. car-maker brands
  (function(){
    var optionContainer = $('#car-maker');
    return {
      getBrandList: function() {
        var brandList = {};
        $.ajax({
          url: 'data/brandList.json',
          dataType: 'json',
          async: false,
          success: function(data) {
            $.extend(brandList, data);
          }
        });
        return brandList
      },
      gen: function(list) {
        $.each(list, function(i, e) {
          var brandId = i,
            brandName = e,            
            ele = $('<option></option>');
          $(ele)
            .attr('value', brandId)
            .html(brandName)
            .appendTo(optionContainer);
        });
      },
      init: function() {
        var brandList = this.getBrandList();
        this.gen(brandList)
      }
    };
  }()).init();

  // plugin init: data picker
  $('#datepicker').datepicker({
    format: "yyyy/mm/dd",
    startDate: "today",
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: true,
    autoclose: false,
    todayHighlight: false
  });

  // plugin init: star rate
  $('#exam-level').starRate();

  // plugin init: form validation 
  // @ 3rd.party plugin: jquery-validation-bootstrap-tooltip + jquery.validation
  $('#validate-field').validate({
    rules: {
      examTitle: "required",
      examStartDate: {date:true, required: true},
      examEndDate: {date:true, required: true},
      examDuration: {digits:true, required: true},
      'examineeList[]': {required:true},
      questionList: {
        required: true,
        min: 1
      }
    },
    messages: {
      examTitle: '考試主題',
      examStartDate: '起始日:yyyy/mm/dd',
      examEndDate: '截止日:yyyy/mm/dd',
      examDuration: '請設時限 (數字)',
      'examineeList[]': '請至少選擇一名考生',
      questionList: '請至少設定一題考題'
    },
    tooltip_options: {
      examTitle: {placement: 'top'},
      examStartDate: {placement: 'bottom'},
      examEndDate: {placement: 'bottom'},
      examDuration: {placement: 'top'},
      'examineeList[]': {placement: 'right'},
      questionList: {placement: 'top'}
    },
    submitHandler: function(form) {
      form.submit();
    },
    focusInvalid: false, // turn focusInvalid (to 1.st error) functoin off
    focusCleanup: true // hide error tip as error-input:focus
  });


  // add new exam, then bind related events
  $('#add-exam').click(function() {
    var trEle = $('#row-prototype').clone(), // create an empty row
        starSrc = $('#exam-level'), // star container @ panel
        starSrcAPI = starSrc.data('starRate'), // API of star container
        star, // new star
        starAPI, // API of new star
        examInfo = { // fetch exam setting from panel
          brand: $('#car-maker').val(),
          level: starSrc.attr('lv')
        },
        brandTxt = $('#car-maker option[value='+examInfo.brand+']').html(), // fetch option text (brand name)
        trInit = $('#row-init'), // row of default info. (while no exam inserted)
        errContainer = $(this).parent(), // container for err message.
        examContainer = $('#exam-container'), // container for added exams
        inpt = $('<input type="hidden">'),
        errmsg = $('<span class="text-danger">請選擇車廠品牌</span>'),
        checkQuestionList = $('#qlist-check'),
        //emptyInput = $('<input type="hidden">'),
        no;

    if (examInfo.brand == 'na'){ 

      // if user forgets to set a brand, show err message, then dismiss automatically
      errContainer.find('.text-danger').remove(); // remove old err msg. (preventing from duplicating msg)
      errmsg.appendTo(errContainer)
        .delay(1000).fadeOut(500,function(){
          $(this).remove()
        });

    } else { 

      // add new exam while brand has been chosen
      trEle
        .removeAttr('id')
        .removeClass('hide')
        .appendTo(examContainer); // append new row to tbody
        checkQuestionList.val(1).trigger('blur');

      // exam no.
      no = examContainer.find('tr').length ; 
      $('td',trEle).eq(0).html(no);

      // level setup
      star = $('.starRate',trEle);
      star.find('input').attr('name','questionLevel[]')
      star.starRate();
      starAPI = star.data('starRate');
      starAPI.clickStar(examInfo.level)
      starSrcAPI.refresh(); // reset starRate panel

      // brand name setup
      $('td',trEle).eq(1)
        .append(brandTxt)
        .find('input').val(examInfo.brand)
          .attr('name','questionBrand[]'); // name=questionBrand: for form POST

      //  name="questionCount[]"
      $('td',trEle).eq(3).find('input').attr('name','questionCount[]')

      // bind event for del. button
      $('.del-exam',trEle).modalInit({
        confirmCallback:function(){
          //$('.default-info',trEle).remove();
          checkQuestionList.val(0);

          // show default msg if there's no more result to show
          if(0==trEle.siblings().length){ 
            trInit.fadeIn();
            checkQuestionList.val(0);

          }else{
          // re-order the # of each row
            trEle.siblings().each(function(i,e){
              $('td',e).eq(0).html(i+1)
            });  
          } 
          trEle.remove();
        }
      });

      // hide default info.
      trInit.hide();
    }

  });

});