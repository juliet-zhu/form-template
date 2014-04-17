window.tools={
  getTips:function(selector){
    var lis = $(selector).find('li');
    if(lis.length){
      $('.note').hide();
      $('.error').hide();
      lis.each(function(index){
        var field = $(this).attr('field');
        var value = $(this).html();
        var $append_selector = $('[name='+field+']').parent();
        $('<label/>').attr('class','error').attr('for',field).html(value).insertAfter($append_selector);
        if($append_selector.hasClass('input-with-icon')){
          $append_selector.addClass('highlight-error')
        }else{
          $('[name='+field+']').addClass('error');
        }  
      }); 
    }else{
      return;
    }
  }
}