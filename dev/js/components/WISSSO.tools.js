(function($) {
  WISSSO.namespace("tools");
  WISSSO.tools.getTips = function(selector) {
    var lis = $(selector).find('li');
    if (lis.length) {
      $('.note').hide();
      $('.error').hide();
      lis.each(function(index) {
        var field = $(this).attr('field');
        var value = $(this).html();
        var $append_selector = $('[name=' + field + ']').parent();
        $('<label/>').attr('class', 'error').attr('for', field).html(
            value).insertAfter($append_selector);
        if ($append_selector.hasClass('input-with-icon')) {
          $append_selector.addClass('highlight-error')
        } else {
          $('[name=' + field + ']').addClass('error');
        }
      });
    } else {
      return;
    }
  }

  WISSSO.tools.transNotes = function(form, inputNames, la, noteSelector) {
    for ( var i = 0; i < inputNames.length; i++) {
      transNote(form, inputNames[i], la, noteSelector)
    }
    function transNote(from, name, la, noteSelector) {
      var laNote = la[noteSelector];
      $(from).find("[name='" + name + "']").parent().siblings(
          '.' + noteSelector).html(laNote[name]);
    }
  }

  WISSSO.tools.userLanguage = function() {
    var userLang = (navigator.language || navigator.browserLanguage)
        .toLowerCase();
    userLang = userLang.substr(0, 2);
    return userLang;
  }

  WISSSO.tools.checkMethods = {
    required: function( value, element, param ) { 
      return $.trim(value).length > 0;
    },
    //username
    nameLength:function(value,element){
      function inputByteLenght(str){
          var len = str.length;
          var byteLen = 0;
          if(len){
            for(var i=0; i<len; i++){
              if(str.charCodeAt(i)>255){
                byteLen += 2;
              }else{
                byteLen ++;
              }
            }
          }
          return byteLen;
        }
        var length = inputByteLenght(value);
        if(length<param[0] || length>param[1]){
          return false;
        }else{
          return true;
        }
    },

    //手机号
    mobile:function(value,element){
      return /^((13[0-9])|(14[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/.test(value);
    },

    //支付宝
    alipay:function(value,element){
      return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i.test(value) || /^((13[0-9])|(14[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/.test(value);
    },

    //身份证号
    IDNum:function(value,element){
      return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
    },

    //QQ号
    QQNum:function(value,element){
      return /^\s*[.0-9]{5,10}\s*$/.test(value);
    }
  }

  WISSSO.tools.Check = function(options){
    var settings = {
        selector:"",
        rules:{}
    };
    var result;
    settings = $.extend(true,{},settings,options);
    for( var value in settings.rules )
    switch (settings.rule){
      case "required":
        result =

    }
    function check(data){
      for(var prop in settings.rules){

      }
    }
    $(settings.selector).off('focusout keyup').on('focusout keyup',function(e){
      var data = $(this).val();
      // if(!data){
      //   console.log("不能为空")
      // }else{
      //   console.log(data);
      // }
    });

  }
}(jQuery))
