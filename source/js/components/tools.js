window.tools={
  getTips:function(selector){
            var lis = $(selector).find('li');
            if(lis.length){
              $('.note').hide();
              $('.error').hide();
              lis.each(function(index){
                var field = $(this).attr('field');
                var value = $(this).html();
                var $append_selector = $('[name='+field+']').parents('.form-group');
                $('<label/>').attr('id','error_tip_'+field).attr('class','error').html(value).appendTo($append_selector);   
              }); 
            }else{
              return;
            }
      }
}