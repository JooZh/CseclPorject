// 背景变色
$(function () {
  var $bgRgb = $('#particles')
  var $navRgb = $('.nav li')
  colorChange()
  // 设置定时器
  setInterval(function () {
    colorChange()
  }, 7000)
  function colorChange() {
    var bgRgb = [
      getRandomNumber(0, 100),
      getRandomNumber(0, 100),
      getRandomNumber(0, 100)
    ];
    var bgColor = 'rgb(' + bgRgb[0] + ',' + bgRgb[1] + ',' + bgRgb[2] + ')'
    $bgRgb.css('background', bgColor)
  }
  function getRandomNumber(rMin, rMax) {
    var cha = rMax - rMin;
    var rand = Math.random();
    return (rMin + Math.round(cha * rand))
  }
})

// 点击打开窗体
$(function () {
  var $navList = $('.nav li')
  var $content = $('.content')
  $.each($navList, function (index, value) {
    $(value).click(function () {
      $navList.fadeOut()
      $content.eq(index).slideDown()
      $content.find('.close').click(function () {
        $content.eq(index).slideUp('show', function () {
          $navList.fadeIn()
        })
      })
    })
  })
})

// 省份 县市选择
$(function () {
  var citMap = china_cities
  var $content = $('.content')
  var $provinceSelect = $('.select-province-hook')
  var $showProvince = $('.show-province-hook')
  var $citySelect = $('.select-city-hook')
  var $showCity = $('.show-city-hook')
  $.each(citMap, function (index, value) {
    if (index > 0) {
      $showProvince.append('<li title="' + value.name + '">' + value.name + '</li>')
    }
  })
  $provinceSelect.click(function (e) {
    e.stopPropagation()
    $showProvince.slideToggle()
  })
  $citySelect.click(function (e) {
    e.stopPropagation()
    if ($showCity.find('li').length) {
      $showCity.slideToggle()
    }else{
      $citySelect.find('.show-select-hook').html('先选择省份')
    }
  })
  $.each($showProvince.find('li'), function (index, value) {
    $(value).click(function (e) {
      e.stopPropagation()
      $provinceSelect.find('.show-select-hook').html($(this).html())
      $showProvince.slideUp()
      $showCity.html('')
      $citySelect.find('.show-select-hook').html('请选择')
      $.each(citMap[index + 1].sub, function (i, v) {
        if (i > 0) {
          $showCity.append('<li title="' + v.name + '">' + v.name + '</li>')
        }
      })
      $.each($showCity.find('li'), function (key, item) {
        $(item).click(function (e) {
          e.stopPropagation()
          $citySelect.find('.show-select-hook').html($(this).html()).attr('title', $(this).html())
          $showCity.slideUp()
        })
      })
    })
  })
  $content.click(function () {
    $showProvince.slideUp()
    $showCity.slideUp()
  })
})

// 选择年级
$(function () {
  var $content = $('.content')
  var $yearSelect = $('.select-year-hook')
  var $showYear = $('.show-year-hook')
  var year = new Date().getFullYear();
  var yearList = [(year - 1), year]
  $.each(yearList, function (index, value) {
    $showYear.append('<li >' + value + '级</li>')
  })
  $yearSelect.click(function (e) {
    e.stopPropagation()
    $showYear.slideToggle()
  })
  $.each($showYear.find('li'), function (key, item) {
    $(item).click(function (e) {
      e.stopPropagation()
      $yearSelect.find('.show-select-hook').html($(this).html())
      $showYear.slideUp()
    })
  })
  $content.click(function () {
    $showYear.slideUp()
  })
})

// 选择学院
$(function () {
  var $content = $('.content')
  var $collegeSelect = $('.select-college-hook')
  var $showCollege = $('.show-college-hook')
  $collegeSelect.click(function (e) {
    e.stopPropagation()
    $showCollege.slideToggle()
  })
  $.each($showCollege.find('li'), function (key, item) {
    $(item).click(function (e) {
      e.stopPropagation()
      $collegeSelect.find('.show-select-hook').html($(this).html())
      $showCollege.slideUp()
    })
  })
  $content.click(function () {
    $showCollege.slideUp()
  })
})

//显示方向
$(function () {
  var $selectRod = $('.fx-hook label')
  var $showConeb = $('.fx-info .info-word')
  $.each($selectRod, function (index, value) {
    $(value).click(function () {
      $showConeb.hide()
      $showConeb.eq(index).show()
    })
  })
})

// 鼠标焦点颜色
$(function () {
  var $input = $('input[type!=radio],textarea')
  var focusColor = '#5597F5'
  var defaultColor = '#cccccc'
  $input.click(function (e) {
    if (e.target.tagName === 'TEXTAREA') {
      $input.css('border-color', defaultColor)
      $(this).css('border-color', focusColor)
    } else {
      $input.parent('.aborder').css('border-color', defaultColor)
      $(this).parent('.aborder').css('border-color', focusColor)
    }
  })
})

// 输入字数判断
$(function() {
  var $textarea = $('textarea')
  var $textNumber = $('.text-number')
  $.each($textarea,function(index,value){
    $(value).on('input',function() {
      var len = $.trim($(this).val()).length
      if(len<20) {
        $textNumber.eq(index).text('还差'+(20-len)+'字')
      }else{
        $textNumber.eq(index).text(len+'/200字')
      }
    })
  })
})

// 填表效果

// $(function(){
//   var $line = $('.line,.submit,.line-text')
//   var $add = $('#consSaa')
//   var num = 2
//   var scroll = 100
//   console.log($line)
//   $line.hide()
//   $line.eq(0).show()
//   $line.eq(1).show()
//   $add.hide()
//   $line.eq(1).click(function(){
//     $add.show()
//   })
//   $add.click(function(){
//     $add.hide()
//     $line.eq(num).slideDown()
//     $line.eq(num).click(function(){
//       $add.show()
//     })
//     $('.bd-wrapper').animate({scrollTop: scroll}, 1000)
//     num++
//     scroll+=100
//   })
// })