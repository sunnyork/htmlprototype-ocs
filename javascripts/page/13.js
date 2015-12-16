$(function() {

  // plugin init: form validation 
  // @ 3rd.party plugin: jquery-validation-bootstrap-tooltip + jquery.validation
  $('#validate-field').validate({
    rules: {
      'examinee-file':'required',
      'examinee-company':'required',
      'examinee-country':'required'
    },
    messages: {
      'examinee-file':'請選擇上傳的檔案',
      'examinee-company':'請選擇所屬公司',
      'examinee-country':'請選擇所屬國家'
    },
    tooltip_options: {
      'examinee-file':'top',
      'examinee-company':{
        placement:'right'
      },
      'examinee-country':{
        placement:'right'
      }
    },
    submitHandler: function(form) {
      form.submit();
    },
    focusInvalid: false, // turn focusInvalid (to 1.st error) functoin off
    focusCleanup: true // hide error tip as error-input:focus
  });

});