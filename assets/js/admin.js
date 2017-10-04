// 验证邮箱
$(function () {
  var $sendCode = $('#sendCode-hook');
  var $email = $('#email');
  $email.on('input', function () {
    var val = $.trim($(this).val().replace(/\s/g, ""));
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (reg.test($(this).val())) {
      $sendCode.addClass('a').removeAttr('disabled');
    } else {
      $sendCode.removeClass('a').attr('disabled', 'disabled');
    }
  })
  $sendCode.click(function () {
    var t = 10;
    var _this = this;
    $(_this).attr('disabled', 'disabled').removeClass('a')
    timer();
    $.ajax({
      type: 'get',
      url: 'csecl/v1/tokens/'+$email.val()+'?role=api',
      sucsess: function(data){
        console.log(data);
      }
    })
    function timer() {
      if (t > 0) {
        $(_this).text('发送成功(' + t + ')');
        t--;
        setTimeout(function () {
          timer()
        }, 1000);
      }else{
        $(_this)
          .removeAttr('disabled')
          .addClass('a')
          .text('发送验证码');
      }
    }
  })
})