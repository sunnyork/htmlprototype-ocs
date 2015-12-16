$(function() {

  // plugin init: form validation 
  // @ 3rd.party plugin: jquery-validation-bootstrap-tooltip + jquery.validation
  $('#validate-field').validate({
    rules: {
      'question-file':'required'
    },
    messages: {
      'question-file':'請選擇上傳的檔案'
    },
    tooltip_options: {
      'question-file':'top'
    },
    submitHandler: function(form) {
      form.submit();
    },
    focusInvalid: false, // turn focusInvalid (to 1.st error) functoin off
    focusCleanup: true // hide error tip as error-input:focus
  });

});