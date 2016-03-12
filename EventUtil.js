//跨浏览器事件
var EventUtil = {

  //添加事件处理程序
  addHandler: function(element, type, handler) {
    //首先检测是否存在DOM2级方法
    if (element.addEventListener) {
      //第三个参数true表示在捕获阶段调用事件处理程序
      //false标识在冒泡阶段调用事件处理程序
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      //IE的方法
      //IE8及更早版本只支持事件冒泡
      //注意第一个参数是"'on'+type"，保证兼容IE8及更早版本
      //!!!事件处理程序的作用域:全局作用域，即this=window
      element.attachEvent("on" + type, handler);
    } else {
      //现代浏览器应该不会执行这里
      element["on" + type] = handler;
    }
  },

  //event对象引用
  //注意IE中的event对象是在window上
  getEvent: function(event) {
    return event ? event : window.event;
  },

  //事件目标
  //IE对应event.srcElement
  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  //IE中returnValue相当于DOM中的preventDefault()方法
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  //IE中cancelBubble相当于DOM中的stopPropagation()方法
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  //相关元素
  getRelatedTarget: function(event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      return event.toElement;
    } else if (event.fromElement) {
      return event.fromElemnet;
    } else {
      return null;
    }
  },
  //鼠标按钮
  //button:0表示主鼠标按钮；1表示中间鼠标按钮（滚轮）；2表示次鼠标按钮
  //IE8及之前版本提供的button属性很大差异，如下：
  //0：没有按下按钮；1：按下主鼠标按钮；2：按下次鼠标按钮；3：同时按下主、次；4：按下中间；5：同时按下主、中；6：同时按下次、中；7：同时按下三个。
  getButton: function(event) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) {
      return event.button;
    } else {
      switch (event.button) {
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0;
        case 2:
        case 6:
          return 2;
        case 4:
          return 1;
      }
    }
  },
  //鼠标滚轮事件
  //Opera 9.5 之前版本wheelDelta正负颠倒
  getWheelDelta: function(event) {
    if (event.wheelDelta) {
      return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
    } else {
      return -event.detail * 40;
    }
  },

  //字符编码
  //只发生在keypress事件时
  //IE8及之前版本和Opera的keyCode中保存ASCII编码
  getCharCode: function(event) {
    if(typeof event.charCode == "number"){
      return event.charCode;
    } else {
      return event.keyCode;
    }
  }
};

//用例
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "mousedown", function(event) {
  event = EventUtil.getEvent(event);
  alert(EventUtil.getButton(event));
});

var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "keypress", function(event){
  event = EventUtil.getEvent(event);
  alert(EventUtil.getCharCode(event));
});
