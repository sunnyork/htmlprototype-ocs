$(function(){(function(){$(".examinee-list input").change(function(){var a=$(this),c=$(this).parent(),d=c.next();a.prop("checked")?(c.css("background-color","#de6600"),d.css("color","#de6600")):(c.css("background-color","#e8e8e8"),d.css("color","#333"))})})();(function(){var a=$("#car-maker");return{getBrandList:function(){var a={};$.ajax({url:"data/brandList.json",dataType:"json",async:!1,success:function(d){$.extend(a,d)}});return a},gen:function(c){$.each(c,function(c,b){var e=$("<option></option>");
$(e).attr("value",c).html(b).appendTo(a)})},init:function(){var a=this.getBrandList();this.gen(a)}}})().init();$("#datepicker").datepicker({format:"yyyy/mm/dd",startDate:"today",todayBtn:"linked",keyboardNavigation:!1,forceParse:!0,autoclose:!1,todayHighlight:!1});$("#exam-level").starRate();$("#validate-field").validate({rules:{examStartDate:{date:!0,required:!0},examEndDate:{date:!0,required:!0},examDuration:{digits:!0,required:!0},"examineeList[]":{required:!0},questionList:{required:!0,min:1}},
messages:{examStartDate:"\u8d77\u59cb\u65e5:yyyy/mm/dd",examEndDate:"\u622a\u6b62\u65e5:yyyy/mm/dd",examDuration:"\u8acb\u8a2d\u6642\u9650 (\u6578\u5b57)","examineeList[]":"\u8acb\u81f3\u5c11\u9078\u64c7\u4e00\u540d\u8003\u751f",questionList:"\u8acb\u81f3\u5c11\u8a2d\u5b9a\u4e00\u984c\u8003\u984c"},tooltip_options:{examStartDate:{placement:"top"},examEndDate:{placement:"top"},examDuration:{placement:"top"},"examineeList[]":{placement:"right"},questionList:{placement:"top"}},submitHandler:function(a){a.submit()},
focusInvalid:!1,focusCleanup:!0});$("#add-exam").click(function(){var a=$("#row-prototype").clone(),c=$("#exam-level"),d=c.data("starRate"),b,e=$("#car-maker").val(),c=c.attr("lv"),k=$("#car-maker option[value="+e+"]").html(),g=$("#row-init");b=$(this).parent();var h=$("#exam-container");$('<input type="hidden">');var l=$('<span class="text-danger">\u8acb\u9078\u64c7\u8eca\u5ee0\u54c1\u724c</span>'),f=$("#qlist-check");"na"==e?(b.find(".text-danger").remove(),l.appendTo(b).delay(1E3).fadeOut(500,
function(){$(this).remove()})):(a.removeAttr("id").removeClass("hide").appendTo(h),f.val(1).trigger("blur"),b=h.find("tr").length,$("td",a).eq(0).html(b),b=$(".starRate",a),b.find("input").attr("name","questionLevel[]"),b.starRate(),b=b.data("starRate"),b.clickStar(c),d.refresh(),$("td",a).eq(1).append(k).find("input").val(e).attr("name","questionBrand[]"),$("td",a).eq(3).find("input").attr("name","questionCount[]"),$(".del-exam",a).modalInit({confirmCallback:function(){f.val(0);0==a.siblings().length?
(g.fadeIn(),f.val(0)):a.siblings().each(function(a,b){$("td",b).eq(0).html(a+1)});a.remove()}}),g.hide())})});