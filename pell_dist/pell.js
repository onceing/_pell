(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var actions = {

  // 加一个绿色
  addBackColor: {
    icon: '<b>G</b>',
    title: 'AddBackColor',
    result: function result() {
      return exec('BackColor', 'green');
    }
  },
  bold: {
    // 图标
    icon: '<b>B</b>',
    // 标题
    title: 'Bold',
    // 事件
    result: function result() {
      return exec('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: function result() {
      return exec('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: function result() {
      return exec('underline');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    result: function result() {
      return exec('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: function result() {
      return exec('formatBlock', '<H1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: function result() {
      return exec('formatBlock', '<H2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: function result() {
      return exec('formatBlock', '<P>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: function result() {
      return exec('formatBlock', '<BLOCKQUOTE>');
    }
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: function result() {
      return exec('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: function result() {
      return exec('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: function result() {
      return exec('formatBlock', '<PRE>');
    }
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: function result() {
      return exec('insertHorizontalRule');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: function result() {
      var url = window.prompt('Enter the link URL');
      if (url) exec('createLink', url);
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: function result() {
      var url = window.prompt('Enter the image URL');
      if (url) exec('insertImage', url);
    }
  }
};

var classes = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content'
};

var exec = function exec(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  document.execCommand(command, false, value);
};

var preventTab = function preventTab(event) {
  // 9是Tab键 禁止使用Tab键
  if (event.which === 9) event.preventDefault();
};

//// export导出初始函数供外部调用
// 函数接受一个变量作为参数

var init = function init(settings) {

  //// 组成新的actions
  // 用户扩展的actions与pell内置的actions（只传了action的名字，需要替换为action对象）
  settings.actions = settings.actions

  // map方法返回由回调函数生成的新变量组成的数组
  ? settings.actions.map(function (action) {
    // 如果用户传了名字，即返回内置的action类型 obj[property]等价于obj.property
    if (typeof action === 'string') return actions[action];

    // 内置actions存在的属性会被覆盖，不存在的会添加，返回新的action对象
    else if (actions[action.name]) return _extends({}, actions[action.name], action);

    // 用户完全自定义（内置actions里面没有这个对象）
    return action;
  })

  // 用户没传action，把内置action全部返回
  : Object.keys(actions).map(function (action) {
    return actions[action];
  });

  // 自定义css类名
  settings.classes = _extends({}, classes, settings.classes);

  // 创建功能barbarbar
  var actionbar = document.createElement('div');
  actionbar.className = settings.classes.actionbar;
  settings.element.appendChild(actionbar);

  // 创建输入框的DOM元素
  settings.element.content = document.createElement('div');
  // 设置DIV可以编辑
  settings.element.content.contentEditable = true;
  // 设置DIV类名
  settings.element.content.className = settings.classes.content;
  // 绑定input事件，onChange事件是用户自定义
  settings.element.content.oninput = function (event) {
    return settings.onChange(event.target.innerHTML);
  };
  // 不让按Tab键
  settings.element.content.onkeydown = preventTab;
  // 把输入框添加到容器里
  settings.element.appendChild(settings.element.content);

  console.log(settings.actions);
  // 把每个action添加到功能barbarbar里面
  settings.actions.forEach(function (action) {
    // 创建按钮
    var button = document.createElement('button');
    // 设置css类名
    button.className = settings.classes.button;
    // 还有图标，
    button.innerHTML = action.icon;
    // 标题
    button.title = action.title;
    // 事件
    button.onclick = action.result;
    // 放到功能barbarbar里面
    actionbar.appendChild(button);
  });

  // 
  if (settings.styleWithCSS) exec('styleWithCSS');

  // 顺便返回这个DOM元素
  return settings.element;
};

// 导出默认变量
var pell = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
