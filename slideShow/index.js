var SlideShow = (function() {
  var $ul;
  var opts = {
    _distance: 30,
    _length: 0,
    _index: 0, //初始值
    _moveResultX: 0, //初始移动距离
    callback: function(index){
      console.log(index);
      return index;
    }
  };

  var _bind = function ($ul) {
    $ul.on('touchstart', function(e) {
      _fnTouchstart(e, opts);
    });
    $ul.on('touchmove', function(e) {
      _fnTouchmove(e, opts);
    });
    $ul.on('touchend', function() {
      _fnTouchend(opts);
    });
  }

  var _fnTransition = function(type, dom, num) {
    dom.css({
      '-webkit-transition': 'all ' + num + 's ' + type,
      'transition': 'all ' + num + 's ' + type
    });
  }

  var _fnTranslate = function(dom, distance) {
    var result = distance + 'px,0,0';
    dom.css({
      '-webkit-transform': 'translate3d(' + result + ')',
      'transform': 'translate3d(' + result + ')'
    });
  }

  var _fnScale = function(dom, scale) {
    var result = scale + ',' + scale + ',' + scale;
    var _transform = dom[0].style.transform || dom[0].style.webkitTransform || 'translate3d(0, 0, 0)';
    _transform = _transform.replace(/scale3d(.)+/g,'');
    // console.log(_transform);
    dom.css({
      '-webkit-transform': _transform + ' scale3d(' + result + ')',
      'transform': _transform + ' scale3d(' + result + ')'
    });
  }

  var _fnGetSlideDistance = function() {
    var $li = $ul.children();
    opts._length = $li.length;
    // console.log(opts._length);
    opts._slideDistance = $ul.width() / 3;
    _fnTransition('ease', $ul, 0);
    _fnTranslate($ul, 0);
    _fnTransition('ease', $ul, 0);
    $li.each(function(i){
      _fnTranslate($(this), opts._slideDistance * (i));
      if(i === opts._index + 1) {
        _fnScale($(this), '1');
      } else {
        _fnScale($(this), '.85');
      }
    });
  }

  //touchstart
  var _fnTouchstart = function(e, opts) {
    //按下时的坐标
    opts._startX = e.touches[0].pageX;
    opts._startY = e.touches[0].pageY;
    //上次移动距离保存
    opts._offsetX = opts._moveResultX;
  }

  //touchmove
  var _fnTouchmove = function(e, opts) {
    e.preventDefault();
    //触摸时的坐标
    opts._curX = e.touches[0].pageX;
    opts._curY = e.touches[0].pageY;
    //触摸时的距离
    opts._moveX = opts._curX - opts._startX;
    opts._moveY = opts._curY - opts._startY;

    //加上上次移动的距离
    opts._moveDistance = opts._moveX + opts._offsetX;
    opts._moveResultX = -(opts._slideDistance * opts._index - opts._moveDistance);

    //触摸时跟手
    _fnTransition('ease', $ul, 0);
    _fnTranslate($ul, opts._moveResultX);
  }

  //touchend
  var _fnTouchend = function (opts) {
    if(Math.abs(opts._moveX) <= opts._distance) {
      _fnSlide('', '.3');
    } else {
      if(opts._moveX > opts._distance) {
          _fnSlide('prev', '.3');
      } else if(Math.abs(opts._moveX) > opts._distance) {
          _fnSlide('next', '.3');
      }
    }

    opts._moveX = 0;
    opts._moveResultX = 0;
  }

  var _fnSlide = function(go, num) {
    //判断方向
    if(typeof go === 'number') {
      opts._index = go;
    } else if (go == 'next' && (opts._index <= opts._length - 3)) {
      opts._index++;
    } else if (go == 'prev' && (opts._index >= 0)) {
      opts._index--;
    }

    _fnScroll(num);
    opts.callback((opts._index + 2));
  }

  var _fnScroll = function(num) {
    _fnTransition('ease', $ul, num);
    _fnTranslate($ul, -opts._index * opts._slideDistance);
    _fnTransition('ease', $ul.children(), num);
    _fnScale($ul.children().eq(opts._index), '.85');
    if(opts._index + 2 !== opts._length){
      _fnScale($ul.children().eq(opts._index+2), '.85');
    }
    _fnScale($ul.children().eq(opts._index+1), 1);
  }

  var SlideShowFunc = function(config) {

  }

  SlideShowFunc.prototype.init = function(config) {
    $ul = $(config.element);
    _fnGetSlideDistance();
    _bind($ul);
    if(!!config.index) {
      opts._index = config.index;
      _fnSlide(opts._index-2, 0);
    }
    return this;
  }

  return SlideShowFunc;
})();


(function(){
  //element:ul id或者class
  //index 初始显示位置
  new SlideShow().init({
    element: '#slide-ul',
    index: 2
  });

  $('.refresh').on('click', function(){
    location.reload();
  })
})(Zepto);
