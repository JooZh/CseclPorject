

// 验证码获取和登录判断
$(function () {
  var $sendCode = $('#sendCode-hook');
  var $email = $('#email');
  var $submit = $('#submit-hook');
  var $loginError = $('.login-error');
  var $codeError = $('.code-error');
  var origin = 'csecl';
  $email.on('input', function () {
    $loginError.hide().text('');
    var val = $.trim($(this).val().replace(/\s/g, ""));
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (reg.test($(this).val())) {
      $sendCode.addClass('a').removeAttr('disabled');
    } else {
      $sendCode.removeClass('a').attr('disabled', 'disabled');
    }
  });
  $sendCode.click(function () {
    var t = 10;
    var _this = this;
    $(_this).attr('disabled', 'disabled').removeClass('a');
    timer();
    // 请求部分等待
    $.ajax({
      type: 'GET',
      url: origin + '/v1/tokens/' + $email.val() + '?role=api',
      sucsess: function (data) {
        if (data.success !== 'success') {
          $loginError.show().text('该邮箱不是管理员邮箱');
        }
      },
      error: function () {
        $loginError.show().text('验证失败，请稍后再试');
      }
    });
    function timer() {
      if (t > 0) {
        $(_this).text('发送成功(' + t + ')');
        t--;
        setTimeout(function () {
          timer();
        }, 1000);
      } else {
        $(_this).removeAttr('disabled').addClass('a').text('发送验证码');
      }
    }
  });
  $submit.click(function () {
    $submit.attr('disabled', 'disabled');
    $('.sign-wrapper').fadeIn('fast');
    $.ajax({
      type: 'POST',
      url: origin + '/v1/tokens/' + $email.val() + '?role=api?code=' + $('#backCode-hook').val(),
      success: function (data) {
        if (data.success === 'success') {
          setTimeout(function () {
            $('.sign').html('<p><span class="icon icon-ok"></span></p><p><span>登录成功,进入管理</span></p>');
          }, 1500);
          setTimeout(function () {
            $('.login-wrapper').fadeOut();
          }, 2500);
        } else {
          setTimeout(function () {
            $('.sign').html('<p><span class="icon icon-close"></span></p><p><span>登录失败,账号或者验证码错误</span></p>');
          }, 1500);
          setTimeout(function () {
            $('.sign-wrapper').fadeOut('fast');
            $submit.removeAttr('disabled');
            setTimeout(function () {
              $('.sign').html('<p><img src="./assets/images/loading.gif"></p><p><span>正在登录...</span></p></p>');
            }, 500)
          }, 3000)
        }

      },
      error: function (data) {
        setTimeout(function () {
          $('.sign').html('<p><span class="icon icon-close"></span></p><p><span>登录失败，稍后重试</span></p>');
        }, 1500);
        setTimeout(function () {
          $('.sign-wrapper').fadeOut('fast');
          $submit.removeAttr('disabled');
          setTimeout(function () {
            $('.sign').html('<p><img src="./assets/images/loading.gif"></p><p><span>正在登录...</span></p></p>');
          }, 500)
        }, 3000)
      }
    });
  });
});