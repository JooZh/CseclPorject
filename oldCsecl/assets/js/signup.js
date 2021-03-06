
// 引入china_cities.min.js , api.js
var origin = 'csecl';
var citMap = china_cities;
var signup =  {
  postData: origin+'/v1/applications/createapp?role=api',
  checkNumber: origin+'/v1/applications/chk?role=api'
};
var $content = $('.content');
// 省份 县市选择
$(function () {
  var $provinceSelect = $('.select-province-hook');
  var $showProvince = $('.show-province-hook');
  var $citySelect = $('.select-city-hook');
  var $showCity = $('.show-city-hook');
  // 添加省份列表
  $.each(citMap, function (index, value) {
    if (index > 0) {
      $showProvince.append('<li title="' + value.name + '">' + value.name + '</li>')
    }
  });
  // 点击选择省份
  $provinceSelect.click(function (e) {
    e.stopPropagation();
    $showProvince.slideToggle()
  });
  // 省份未选择
  $citySelect.click(function (e) {
    e.stopPropagation();
    if ($showCity.find('li').length) {
      $showCity.slideToggle()
    } else {
      $citySelect.find('.show-select-hook').html('先选择省份')
    }
  });
  // 省份列表项被点击插入省份的区域
  $.each($showProvince.find('li'), function (index, value) {
    $(value).click(function (e) {
      e.stopPropagation();
      $provinceSelect.find('.show-select-hook').html($(this).html());
      $provinceSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
      $showProvince.slideUp();
      $showCity.html('');
      $citySelect.find('.show-select-hook').html('请选择');
      $citySelect.find('.show-select-hook').next().removeClass('icon-ok');
      $.each(citMap[index + 1].sub, function (i, v) {
        if (i > 0) {
          $showCity.append('<li title="' + v.name + '">' + v.name + '</li>')
        }
      });
      $.each($showCity.find('li'), function (key, item) {
        $(item).click(function (e) {
          e.stopPropagation();
          $citySelect.find('.show-select-hook').html($(this).html()).attr('title', $(this).html());
          $citySelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
          $showCity.slideUp();
        })
      })
    })
  });
  $content.click(function () {
    $showProvince.slideUp();
    $showCity.slideUp()
  })
});

// 选择年级
$(function () {
  var $yearSelect = $('.select-year-hook');
  var $showYear = $('.show-year-hook');
  var year = new Date().getFullYear();
  var yearList = [(year - 1), year];
  $.each(yearList, function (index, value) {
    $showYear.append('<li >' + value + '</li>')
  });
  $yearSelect.click(function (e) {
    e.stopPropagation();
    $showYear.slideToggle()
  });
  $.each($showYear.find('li'), function (key, item) {
    $(item).click(function (e) {
      e.stopPropagation();
      $yearSelect.find('.show-select-hook').html($(this).html());
      $yearSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
      $showYear.slideUp()
    })
  });
  $content.click(function () {
    $showYear.slideUp()
  })
});

// 选择学院
$(function () {
  var $collegeSelect = $('.select-college-hook');
  var $showCollege = $('.show-college-hook');
  $collegeSelect.click(function (e) {
    e.stopPropagation();
    $showCollege.slideToggle()
  });
  $.each($showCollege.find('li'), function (key, item) {
    $(item).click(function (e) {
      e.stopPropagation();
      $collegeSelect.find('.show-select-hook').html($(this).html());
      $collegeSelect.find('.show-select-hook').next().removeClass('icon-close').addClass('icon-ok');
      $showCollege.slideUp()
    })
  });
  $content.click(function () {
    $showCollege.slideUp()
  })
});

//显示方向
$(function () {
  var $selectRod = $('.fx-hook label');
  var $showConeb = $('.fx-info .info-word');
  $.each($selectRod, function (index, value) {
    $(value).click(function () {
      $showConeb.hide();
      $showConeb.eq(index).show()
    })
  })
});

// 鼠标焦点颜色
$(function () {
  var $input = $('input[type!=radio],textarea');
  var focusColor = '#5597F5';
  var defaultColor = '#cccccc';
  $input.click(function (e) {
    if (e.target.tagName === 'TEXTAREA') {
      $input.css('border-color', defaultColor);
      $(this).css('border-color', focusColor)
    } else {
      $input.parent('.show-border').css('border-color', defaultColor);
      $(this).parent('.show-border').css('border-color', focusColor)
    }
  })
});

// 实时检查------------------------
$(function () {
  // 姓名
  checkedInput('#username', /^[\u4E00-\u9FA5]{2,4}$/);
  // 学号
  checkedInput('#student', /^20[1-9]\d{9}$/, 1);
  // 手机
  checkedInput('#phone', /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/);
  // 验证QQ
  checkedInput('#qq', /^\d{5,11}$/);
  // 验证电子邮箱
  checkedInput('#email', /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/);
  // 验证专业
  checkedInput('#major', /^[\u4E00-\u9FA5]{2,8}$/);
  // 验证数学
  checkedInput('#math', /^([1-9])$|^([1-9]\d)$|^(1[0-4]\d)$|^(150)$/);
  // 验证英语
  checkedInput('#english', /^([1-9])$|^([1-9]\d)$|^(1[0-4]\d)$|^(150)$/);
  // 验证推荐人
  checkedInput('#referrer', /^[\u4E00-\u9FA5]+$/);
  // 文本域验证
  $.each($('textarea'), function (index, value) {
    $(value).on('input', function () {
      // 去掉空格
      var len = $.trim($(this).val().replace(/\s/g, "")).length;
      if (len < 20) {
        $(this).next().css('color', '#d9534f');
        $(this).next().find('span').text('还差' + (20 - len) + '字');
        $(this).next().find('.icon').removeClass('icon-ok');
        $(this).next().find('.icon').addClass('icon-close');
      } else {
        $(this).next().css('color', '#5597F5');
        $(this).next().find('span').text(len + '/200字');
        $(this).next().find('.icon').removeClass('icon-close');
        $(this).next().find('.icon').addClass('icon-ok');
      }
    })
  });
  function checkedInput(el, reg, fn) {
    $(el).on('input', function () {
      $('.student-error').text('').hide();
      var dom = $(this).next();
      if (reg.test($(this).val())) {
        dom.removeClass('icon-close');
        dom.addClass('icon-ok');
        // 实时验证是否重复注册
        if (fn) {
          $.ajax({
            type: "post",
            url: signup.checkNumber,
            data: { 'number': $(this).val() },
            success: function (data) {
              if (parseInt(data.code) === 201) {
                dom.removeClass('icon-ok');
                dom.addClass('icon-close');
                $('.student-error').text('该学号已经报名成功!!').fadeIn();
              }
            },
            error: function () {
              dom.removeClass('icon-ok');
              dom.addClass('icon-close');
              $('.student-error').text('验证失败，请稍后再试!!').fadeIn();
            }
          });
        }
      } else {
        dom.removeClass('icon-ok');
        dom.addClass('icon-close');
      }
    })
  }
});

// 验证提交
$(function () {
  var $okInfo = $('.ok-info');
  var $errorInfo = $('.error-info');
  $('.reg .submit').click(function () {
    var $allIcon = $('.reg i.icon');
    var $ok = $('.reg i.icon-ok');
    if ($ok.length < 19) {
      $.each($allIcon, function (index, item) {
        if (!$(item).hasClass('icon-ok')) {
          $(this).addClass('icon-close');
        } else {
          $(this).removeClass('icon-close');
          $(this).addClass('icon-ok');
        }
      });
      $errorInfo.fadeIn('fast');
      setTimeout(function () {
        $errorInfo.fadeOut('fast');
      }, 2000)
    } else {
      var data = {
        'application': {
          'name': $('#username').val(),
          'sex': parseInt($("input[name='sex']:checked").val()),
          'number': $('#student').val(),
          'address': '中国 ' + $('#placeProvince').text() + ' ' + $('#placeCity').text(),
          'phone': $('#phone').val(),
          'qq': $('#qq').val(),
          'email': $('#email').val(),
          'college': $('#college').text(),
          'major': $('#major').val(),
          'grade': $('#grade').text(),
          'math_grade': parseInt($('#math').val()),
          'english_grade': parseInt($('#english').val()),
          'direct': $("input[name='fx']:checked").val(),
          'referrer': $('#referrer').val()
        },
        'question': {
          'answer1': $('#question1').val(),
          'answer2': $('#question2').val(),
          'answer3': $('#question3').val(),
          'answer4': $('#question4').val(),
          'answer5': $('#question5').val(),
          'answer6': $('#question6').val()
        }
      };
      var $steup = $('.steup');
      // 弹出正在提交界面
      $okInfo.fadeIn();
      $('#form-reset').click(function () {
        $okInfo.fadeOut()
      });
      $('#form-commit').click(function () {
        $('.confirm').hide();
        $steup.html('<p><img src="./assets/images/loading.gif"></p><p><span>正在验证数据...</span></p>');
        setTimeout(function () {
          $steup.html('<p><img src="./assets/images/loading.gif"></p><p><span>正在提交数据...</span></p>');
        }, 2000);
        setTimeout(function () {
          $.ajax({
            type: "post",
            url: signup.postData,
            data: data,
            success: function (data) {
              if (parseInt(data.code) === 200) {
                $steup.html('<p><span class="icon icon-ok"></span></p><p><span>恭喜，报名成功</span></p>');
                setTimeout(function(){
                  window.location.reload();
                },3000);
              }
            },
            error: function () {
              $steup.html('<p><span class="icon icon-close"></span></p><p><span>提交失败，稍后重试</span></p>');
              setTimeout(function(){
                $okInfo.fadeOut();
                $steup.html('');
                setTimeout(function(){
                  $('.confirm').show();
                },2000)
              },2000)
            }
          })
        }, 3000)
      })
    }
  })
});
