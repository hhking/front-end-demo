 /**
 * config
 * $wrap,$slide,$content
 */
var SlideText = (function() {

  var opts = {
    _cloneNum: 1,
    _margin: 0,
    _contentW: 0,
    _speed: 20
  };
  var _$wrap,_$slide,_$content;

  var _setMargin = function ($tar,num) {
    if(!!num) {
      $tar.css({
        marginRight: num + 'px'
      });
    }
  }

  var _setSlideWidth = function ($tar, num, extra) {
    $tar.css({
      width: (_getWidth(_$content) + extra) * num + 'px'
    })
  }

  var _getWidth = function ($tar) {
    console.log($tar.offset().width);
    opts._contentW = $tar.offset().width;
    return $tar.offset().width;
  }

  var _cloneContent = function ($tar) {
    var wrapW = _getWidth(_$wrap);
    var contentW = _getWidth(_$content);
    opts._cloneNum = Math.ceil(wrapW/contentW);
    for(var i = 0; i < opts._cloneNum; i++) {
      $tar.clone().appendTo(_$slide);
    }
  }

  var _slideText = function (speed) {
    var _left = 0;
    setInterval(function() {
      if(-_left == (opts._contentW + opts._margin)) {
        _left = 0;
      } else {
        _left --;
      }
      _$slide.css({
        '-webkit-transform': 'translate3d('+_left+'px,0,0'+')',
			  'transform': 'translate3d('+_left+'px,0,0'+')'
      });
    },speed);
  }

  var SlideTextFunc = function (config) {

  }

  SlideTextFunc.prototype.init = function (config) {
    _$wrap = $(config.wrap);
    _$slide = $(config.slide);
    _$content = $(config.content);
    opts._margin = config.margin || opts._margin;
    opts._speed = config.speed || opts._speed;
    _setMargin(_$content,opts._margin);
    _cloneContent(_$content);
    _setSlideWidth(_$slide, opts._cloneNum + 1, opts._margin);
    _slideText(opts._speed);
  }

  return SlideTextFunc;
})();

(function() {
  var slideText = new SlideText();
  slideText.init({
    wrap: '.slide-wrap',
    slide: '.slide-text',
    content: '.slide-content',
    margin: 10,
    speed: 20
  })
})(Zepto);
