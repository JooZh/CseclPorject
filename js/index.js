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
    // var navRgb = [
    //   getRandomNumber(150, 240),
    //   getRandomNumber(150, 240),
    //   getRandomNumber(150, 240)
    // ]
    // var navColor = 'rgb(' + navRgb[0] + ',' + navRgb[1] + ',' + navRgb[2] + ')'
    $bgRgb.css('background', bgColor)
    // $navRgb.css('background', navColor)
  }
  function getRandomNumber(rMin, rMax) {
    var cha = rMax - rMin;
    var rand = Math.random();
    return (rMin + Math.round(cha * rand))
  }
})

// 点击打开窗体
$(function () {
  var $navList = $('.nav')
  var $content = $('.content')
  $.each($navList.find('li'), function (index,value) {
    $(value).click(function() {
      $navList.fadeOut()
      $content.slideDown()
      $content.find('span').click(function() {
        $content.slideUp('show',function(){
          $navList.fadeIn()
        })
      })
    })
  })
})