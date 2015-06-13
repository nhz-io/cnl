(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.cnl = require('./index');

},{"./index":2}],2:[function(require,module,exports){
module.exports = {
  lib: require('./lib/index'),
  pen: require('./pen/index'),
  style: require('./style/index')
};

},{"./lib/index":8,"./pen/index":13,"./style/index":17}],3:[function(require,module,exports){
var Base;

module.exports = Base = (function() {
  function Base() {}

  return Base;

})();

},{}],4:[function(require,module,exports){
var Component, Event, Style,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Style = require('./style');

Event = require('./event');

module.exports = Component = (function(superClass) {
  extend(Component, superClass);

  function Component(args) {
    if (args == null) {
      args = {};
    }
    Component.__super__.constructor.apply(this, arguments);
    this.addEventListener('mousemove', (function(_this) {
      return function(e) {
        return _this.mousemoveListener(e);
      };
    })(this));
    this.addEventListener('mousedown', (function(_this) {
      return function(e) {
        return _this.mousedownListener(e);
      };
    })(this));
    this.addEventListener('mouseup', (function(_this) {
      return function(e) {
        return _this.mouseupListener(e);
      };
    })(this));
  }

  Component.prototype.mousemoveListener = function() {};

  Component.prototype.mousedownListener = function() {};

  Component.prototype.mouseupListener = function() {};

  return Component;

})(require('./shape'));

},{"./event":6,"./shape":11,"./style":12,"extends__":19}],5:[function(require,module,exports){
var Element, Event, Style,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Style = require('./style');

Event = require('./event');

module.exports = Element = (function(superClass) {
  extend(Element, superClass);

  function Element(args) {
    if (args == null) {
      args = {};
    }
    Element.__super__.constructor.apply(this, arguments);
    this._style = args.style || this._style;
    this._state = args.state || this._state;
    this.addEventListener('state', (function(_this) {
      return function(e) {
        return _this.stateListener(e);
      };
    })(this));
    this.addEventListener('style', (function(_this) {
      return function(e) {
        return _this.styleListener(e);
      };
    })(this));
    this.addEventListener('render', (function(_this) {
      return function(e) {
        return _this.renderListener(e);
      };
    })(this));
  }

  Element.prototype.stateListener = function() {};

  Element.prototype.styleListener = function() {};

  Element.prototype.renderListener = function() {};

  Element.prototype.state = function(value) {
    var state;
    if (arguments.length) {
      state = this._state;
      this._state = value;
      this.broadcastEvent(new Event({
        type: 'state',
        target: this,
        value: value,
        old: state
      }));
    }
    return this._state;
  };

  Element.prototype.style = function(value) {
    var style;
    if (arguments.length) {
      style = this._state;
      this._style = value;
      this.broadcastEvent(new Event({
        type: 'style',
        target: this,
        value: value,
        old: style
      }));
    }
    return this._style;
  };

  Element.prototype.render = function(context, args) {
    this.broadcastEvent(new Event({
      type: 'render',
      target: this
    }));
    return this;
  };

  return Element;

})(require('./evented'));

},{"./event":6,"./evented":7,"./style":12,"extends__":19}],6:[function(require,module,exports){
var Event,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Event = (function(superClass) {
  extend(Event, superClass);

  function Event(args, callback) {
    var date, perf;
    if (args == null) {
      args = {};
    }
    Event.__super__.constructor.apply(this, arguments);
    if (typeof args === 'string') {
      args = {
        type: args
      };
    } else if ((arguments.length < 2) && typeof args === 'function') {
      callback = args;
      args = {};
    }
    this.type = args.type, this.phase = args.phase, this.cancelable = args.cancelable, this.bubbles = args.bubbles, this.source = args.source, this.target = args.target, this.bubbling = args.bubbling, this.sinking = args.sinking, this.started = args.started, this.stopped = args.stopped, this.canceled = args.canceled, this.aborted = args.aborted, this.done = args.done;
    date = Date.now();
    perf = (typeof performance !== "undefined" && performance !== null ? performance.now() : void 0) || 0;
    this.callback = args.callback || callback || function() {};
    this.timestamp = 1000 * date + Math.floor(1000 * (perf - Math.floor(perf)));
  }

  Event.prototype.start = function() {
    this.started = true;
    return this;
  };

  Event.prototype.stop = function() {
    this.stopped = true;
    return this;
  };

  Event.prototype.cancel = function() {
    this.canceled = true;
    return this;
  };

  Event.prototype.abort = function() {
    this.aborted = true;
    return this;
  };

  Event.prototype.finish = function() {
    this.done = true;
    return this;
  };

  return Event;

})(require('./base'));

},{"./base":3,"extends__":19}],7:[function(require,module,exports){
var Event, Evented,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

module.exports = Evented = (function(superClass) {
  extend(Evented, superClass);

  function Evented() {
    Evented.__super__.constructor.apply(this, arguments);
    this.listeners = [{}, {}];
  }

  Evented.prototype.addEventListener = function(type, listener, capture) {
    var base, listeners, ref;
    if (capture == null) {
      capture = false;
    }
    if (type instanceof Object) {
      ref = type, type = ref.type, listener = ref.listener, capture = ref.capture;
    }
    if (type && typeof listener === 'function') {
      listeners = ((base = this.listeners[capture === true ? 1 : 0])[type] || (base[type] = []));
      if (-1 === listeners.indexOf(listener)) {
        listeners.push(listener);
      }
    }
    return this;
  };

  Evented.prototype.removeEventListener = function(type, listener, capture) {
    var idx, listeners, ref;
    if (capture == null) {
      capture = false;
    }
    if (type instanceof Object) {
      ref = type, type = ref.type, listener = ref.listener, capture = ref.capture;
    }
    if (type && typeof listener === 'function') {
      if (listeners = this.listeners[capture === true ? 1 : 0][type]) {
        if (-1 !== (idx = listeners.indexOf(listener))) {
          listeners.splice(idx, 1);
        }
      }
    }
    return this;
  };

  Evented.prototype.dispatchEvent = function(event) {
    var i, len, listener, listeners, phase, type;
    if (event instanceof Event && (type = event.type) && !event.aborted) {
      phase = event.phase;
      if (phase > 0 && phase < 3 && (listeners = this.listeners[2 - phase][type])) {
        event.start();
        for (i = 0, len = listeners.length; i < len; i++) {
          listener = listeners[i];
          if (event.stopped || event.aborted) {
            break;
          }
          listener.call(this, event);
        }
      }
    }
    return this;
  };

  Evented.prototype.broadcastEvent = function(event, target) {
    var child, i, len, phase, ref, ref1, type;
    if (event instanceof Event && (type = event.type)) {
      if (!(event.aborted || event.done || event.phase === 3)) {
        event.start();
        event.source || (event.source = this);
        event.target || (event.target = target);
        phase = (event.phase || (event.phase = 1));
        if (event.target === this) {
          event.phase = 2;
        }
        if (event.phase === 1) {
          this.dispatchEvent(event);
          ref = this.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (event.phase === 1 && !event.aborted) {
              child.broadcastEvent(event);
            } else {
              break;
            }
          }
        }
        if (event.phase === 2) {
          this.dispatchEvent(event);
        }
        if (event.source === this) {
          if (!(event.canceled || event.aborted || event.done || event.phase === 3)) {
            if ((ref1 = event.callback) != null) {
              ref1.call(this, event);
            }
          }
          event.phase = 3;
          event.finish();
        }
      }
    }
    return this;
  };

  return Evented;

})(require('./node'));

},{"./event":6,"./node":9,"extends__":19}],8:[function(require,module,exports){
module.exports = {
  Base: require('./base'),
  Event: require('./event'),
  Node: require('./node'),
  Element: require('./element'),
  Evented: require('./evented'),
  Style: require('./style'),
  Shape: require('./shape'),
  Component: require('./component'),
  Pen: require('./pen')
};

},{"./base":3,"./component":4,"./element":5,"./event":6,"./evented":7,"./node":9,"./pen":10,"./shape":11,"./style":12}],9:[function(require,module,exports){
var Node,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Node = (function(superClass) {
  extend(Node, superClass);

  function Node(args) {
    if (args == null) {
      args = {};
    }
    Node.__super__.constructor.apply(this, arguments);
    this.children = args.children || [];
    this.parent = args.parent || null;
  }

  Node.prototype.appendChild = function(child) {
    var parent;
    if (child instanceof Node && -1 === this.children.indexOf(child)) {
      if (parent = child.parent) {
        parent.removeChild(child);
      }
      child.parent = this;
      this.children.push(child);
    }
    return this;
  };

  Node.prototype.removeChild = function(child) {
    var idx;
    if (child instanceof Node && -1 !== (idx = this.children.indexOf(child))) {
      child.parent = null;
      this.children.splice(idx, 1);
    }
    return this;
  };

  return Node;

})(require('./base'));

},{"./base":3,"extends__":19}],10:[function(require,module,exports){
var Pen;

module.exports = Pen = (function() {
  function Pen() {
    return (function(_this) {
      return function() {
        return _this.draw.apply(_this, arguments);
      };
    })(this);
  }

  Pen.prototype.draw = function() {
    return null;
  };

  return Pen;

})();

},{}],11:[function(require,module,exports){
var Event, Shape,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

module.exports = Shape = (function(superClass) {
  extend(Shape, superClass);

  function Shape(args) {
    if (args == null) {
      args = {};
    }
    Shape.__super__.constructor.apply(this, arguments);
    this.origin = args.origin || this.origin || {
      x: 0,
      y: 0
    };
    this.size = args.size || this.size || {
      width: 0,
      height: 0
    };
    this.addEventListener('draw', (function(_this) {
      return function(e) {
        return _this.drawListener(e);
      };
    })(this));
  }

  Shape.prototype.drawListener = function() {};

  Shape.prototype.draw = function(context, args) {
    this.broadcastEvent(new Event({
      type: 'draw',
      target: this
    }));
    return this;
  };

  return Shape;

})(require('./element'));

},{"./element":5,"./event":6,"extends__":19}],12:[function(require,module,exports){
var Style,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

module.exports = Style = (function(superClass) {
  extend(Style, superClass);

  function Style(args) {
    if (args == null) {
      args = {};
    }
    Style.__super__.constructor.apply(this, arguments);
    if (args.mapper) {
      this.mapper = args.mapper;
    }
    this.data = args.data || {};
  }

  Style.prototype.load = function(json, callback) {
    if (json) {
      this.mapper(json, this.data, callback);
    }
    return this;
  };

  Style.prototype.get = function() {
    var i, key, keys, len, length, result;
    keys = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (!(length = keys.length)) {
      return this.data;
    }
    result = [];
    if (length === 1 && keys[0] instanceof Array) {
      keys = keys[0];
    }
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      if (this.data[key] != null) {
        result.push(this.data[key]);
      }
    }
    return (result.length === 1 ? result[0] : result);
  };

  Style.prototype.mapper = function(data, context, callback) {
    return callback();
  };

  return Style;

})(require('./base'));

},{"./base":3,"extends__":19}],13:[function(require,module,exports){
module.exports = {
  Rectangle: require('./rectangle'),
  Line: require('./line'),
  Text: require('./text')
};

},{"./line":14,"./rectangle":15,"./text":16}],14:[function(require,module,exports){
var Line,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Line = (function(superClass) {
  extend(Line, superClass);

  function Line(args) {
    if (args == null) {
      args = {};
    }
    this.start = args.start || {
      x: 0,
      y: 0
    };
    this.end = args.end || {
      x: 0,
      y: 0
    };
    this.stroke = args.stroke, this.lineWidth = args.lineWidth;
    this.fill = args.fill, this.stroke = args.stroke, this.lineWidth = args.lineWidth;
    return Line.__super__.constructor.apply(this, arguments);
  }

  Line.prototype.draw = function(context, args) {
    var end, lineWidth, start, stroke;
    if (args == null) {
      args = {};
    }
    if (context) {
      start = args.start || this.start || {
        x: 0,
        y: 0
      };
      end = args.end || this.end || {
        x: 0,
        y: 0
      };
      stroke = args.stroke || this.stroke;
      lineWidth = args.lineWidth || this.lineWidth;
      if (lineWidth % 2) {
        start.x += 0.5;
        start.y += 0.5;
        end.x += 0.5;
        end.y += 0.5;
      }
      if (stroke) {
        context.beginPath();
      }
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      if (stroke) {
        context.strokeStyle = stroke;
        if (lineWidth) {
          context.lineWidth = lineWidth;
        }
        context.stroke();
      }
    }
    return Line.__super__.draw.apply(this, arguments);
  };

  return Line;

})(require('../lib/pen'));

},{"../lib/pen":10,"extends__":19}],15:[function(require,module,exports){
var Rectangle,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Rectangle = (function(superClass) {
  extend(Rectangle, superClass);

  function Rectangle(args) {
    if (args == null) {
      args = {};
    }
    this.size = args.size || {
      width: 0,
      height: 0
    };
    this.fill = args.fill, this.stroke = args.stroke, this.lineWidth = args.lineWidth;
    return Rectangle.__super__.constructor.apply(this, arguments);
  }

  Rectangle.prototype.draw = function(context, args) {
    var fill, lineWidth, origin, size, stroke;
    if (args == null) {
      args = {};
    }
    if (context) {
      origin = args.origin || this.origin || {
        x: 0,
        y: 0
      };
      size = args.size || this.size || {
        width: 0,
        height: 0
      };
      fill = args.fill || this.fill;
      stroke = args.stroke || this.stroke;
      lineWidth = args.lineWidth || this.lineWidth;
      if (lineWidth % 2) {
        origin.x += 0.5;
        origin.y += 0.5;
      }
      if (fill instanceof Object) {
        context.save();
        context.translate(origin.x, origin.y);
        origin.x = origin.y = 0;
      }
      if (fill || stroke) {
        context.beginPath();
      }
      if (fill) {
        context.fillStyle = fill;
        context.fillRect(origin.x, origin.y, size.width, size.height);
      }
      if (stroke) {
        context.strokeStyle = stroke;
        if (lineWidth) {
          context.lineWidth = lineWidth;
        }
        context.strokeRect(origin.x, origin.y, size.width, size.height);
      }
      if (fill instanceof Object) {
        context.restore();
      }
    }
    return Rectangle.__super__.draw.apply(this, arguments);
  };

  return Rectangle;

})(require('../lib/pen'));

},{"../lib/pen":10,"extends__":19}],16:[function(require,module,exports){
var Line,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Line = (function(superClass) {
  extend(Line, superClass);

  function Line(args) {
    if (args == null) {
      args = {};
    }
    this.origin = args.origin || this.origin || {
      x: 0,
      y: 0
    };
    this.font = args.font || this.font;
    this.fill = args.fill || this.fill;
    this.stroke = args.stroke || this.stroke;
    this.lineWidth = args.lineWidth || this.lineWidth;
    this.baseline = args.baseline || this.baseline;
    return Line.__super__.constructor.apply(this, arguments);
  }

  Line.prototype.draw = function(context, args) {
    var baseline, fill, font, origin, stroke, text;
    if (args == null) {
      args = {};
    }
    if (context && (text = args.text)) {
      origin = args.origin || this.origin || {
        x: 0,
        y: 0
      };
      font = args.font || this.font;
      fill = args.fill || this.fill;
      stroke = args.stroke || this.stroke;
      baseline = args.baseline || this.baseline || 'top';
      if (fill || stroke) {
        context.baseline = baseline;
      }
      if (fill instanceof Object) {
        context.save();
        context.translate(origin.x, origin.y);
        origin.x = origin.y = 0;
      }
      if (fill) {
        context.fillStyle = fill;
        context.fillText(text, origin.x, origin.y);
      }
      if (stroke) {
        if (lineWidth) {
          context.lineWidth = lineWidth;
        }
        context.strokeStyle = stroke;
        context.strokeText(text, origin.x, origin.y);
      }
    }
    return Line.__super__.draw.apply(this, arguments);
  };

  return Line;

})(require('../lib/pen'));

},{"../lib/pen":10,"extends__":19}],17:[function(require,module,exports){
module.exports = {
  Shape: require('./shape')
};

},{"./shape":18}],18:[function(require,module,exports){
var Shape, _,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

_ = function(o, p) {
  return Object.prototype.hasOwnProperty.call(o, p);
};

module.exports = Shape = (function(superClass) {
  extend(Shape, superClass);

  function Shape() {
    return Shape.__super__.constructor.apply(this, arguments);
  }

  Shape.prototype.mapper = function(data, context, callback) {
    var fill, image, ref, repeat, url, width;
    if ((_(data, 'width')) || (_(data, 'height'))) {
      context.size = {
        width: data.width || 0,
        height: data.height || 0
      };
    }
    if ((_(data, 'top')) || (_(data, 'left'))) {
      context.origin = {
        x: data.x || 0,
        y: data.y || 0
      };
    }
    if (_(data, 'background')) {
      context.fill = data['background'];
    }
    if (_(data, 'fill')) {
      context.fill = data['fill'];
    }
    if (_(data, 'color')) {
      context.stroke = data['color'];
    }
    if (_(data, 'stroke')) {
      context.stroke = data['stroke'];
    }
    if (_(data, 'line-width')) {
      context.line - (width = data['line-width']);
    }
    if (url = (ref = context.fill) != null ? ref.match(/url\(\s*(["'']?)\s*(.+)\1\)/) : void 0) {
      if (repeat = context.fill.match(/norepeat|repeat-x|repeat-y/)) {
        repeat = repeat[0];
      } else {
        repeat = null;
      }
      fill = null;
      (image = new Image).src = url[2];
      image.onload = (function(_this) {
        return function() {
          context.fill = document.createElement('canvas').getContext('2d').createPattern(image, repeat || 'repeat');
          return callback != null ? callback.call(_this, null, context) : void 0;
        };
      })(this);
      return image.onerror = (function(_this) {
        return function(e) {
          return callback != null ? callback.call(_this, e, context) : void 0;
        };
      })(this);
    } else {
      return callback != null ? callback.call(this, null, context) : void 0;
    }
  };

  return Shape;

})(require('../lib/style'));

},{"../lib/style":12,"extends__":19}],19:[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = function(ChildClass, ParentClasses) {
  var MixinClass, ParentClass, i, key, len, ref, value;
  if (ParentClasses instanceof Array && ParentClasses.length) {
    ParentClass = (function(superClass) {
      extend(ParentClass, superClass);

      function ParentClass() {
        var MixinClass, i, len;
        ParentClass.__super__.constructor.apply(this, arguments);
        for (i = 0, len = ParentClasses.length; i < len; i++) {
          MixinClass = ParentClasses[i];
          MixinClass.apply(this, arguments);
        }
      }

      return ParentClass;

    })(ParentClasses.shift());
    for (i = 0, len = ParentClasses.length; i < len; i++) {
      MixinClass = ParentClasses[i];
      ref = MixinClass.prototype;
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        if (key !== 'constructor') {
          ParentClass.prototype[key] = value;
        }
      }
    }
  } else {
    ParentClass = ParentClasses;
  }
  return extend(ChildClass, ParentClass);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9pbmRleC5qcyIsImJ1aWxkL2xpYi9iYXNlLmpzIiwiYnVpbGQvbGliL2NvbXBvbmVudC5qcyIsImJ1aWxkL2xpYi9lbGVtZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50ZWQuanMiLCJidWlsZC9saWIvaW5kZXguanMiLCJidWlsZC9saWIvbm9kZS5qcyIsImJ1aWxkL2xpYi9wZW4uanMiLCJidWlsZC9saWIvc2hhcGUuanMiLCJidWlsZC9saWIvc3R5bGUuanMiLCJidWlsZC9wZW4vaW5kZXguanMiLCJidWlsZC9wZW4vbGluZS5qcyIsImJ1aWxkL3Blbi9yZWN0YW5nbGUuanMiLCJidWlsZC9wZW4vdGV4dC5qcyIsImJ1aWxkL3N0eWxlL2luZGV4LmpzIiwiYnVpbGQvc3R5bGUvc2hhcGUuanMiLCJub2RlX21vZHVsZXMvZXh0ZW5kc19fL2Rpc3QvZXh0ZW5kc19fLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LmNubCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBsaWI6IHJlcXVpcmUoJy4vbGliL2luZGV4JyksXG4gIHBlbjogcmVxdWlyZSgnLi9wZW4vaW5kZXgnKSxcbiAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUvaW5kZXgnKVxufTtcbiIsInZhciBCYXNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEJhc2UoKSB7fVxuXG4gIHJldHVybiBCYXNlO1xuXG59KSgpO1xuIiwidmFyIENvbXBvbmVudCwgRXZlbnQsIFN0eWxlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cblN0eWxlID0gcmVxdWlyZSgnLi9zdHlsZScpO1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQ29tcG9uZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDb21wb25lbnQoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMubW91c2Vtb3ZlTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLm1vdXNlZG93bkxpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMubW91c2V1cExpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gIH1cblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNlZG93bkxpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNldXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge307XG5cbiAgcmV0dXJuIENvbXBvbmVudDtcblxufSkocmVxdWlyZSgnLi9zaGFwZScpKTtcbiIsInZhciBFbGVtZW50LCBFdmVudCwgU3R5bGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuU3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlJyk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRWxlbWVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRWxlbWVudChhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBFbGVtZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuX3N0eWxlID0gYXJncy5zdHlsZSB8fCB0aGlzLl9zdHlsZTtcbiAgICB0aGlzLl9zdGF0ZSA9IGFyZ3Muc3RhdGUgfHwgdGhpcy5fc3RhdGU7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzdGF0ZScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnN0YXRlTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3N0eWxlJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMuc3R5bGVMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncmVuZGVyJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMucmVuZGVyTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfVxuXG4gIEVsZW1lbnQucHJvdG90eXBlLnN0YXRlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnN0eWxlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnJlbmRlckxpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5zdGF0ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgdGhpcy5fc3RhdGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ3N0YXRlJyxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG9sZDogc3RhdGVcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnN0eWxlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgc3R5bGU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlID0gdGhpcy5fc3RhdGU7XG4gICAgICB0aGlzLl9zdHlsZSA9IHZhbHVlO1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAnc3R5bGUnLFxuICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgb2xkOiBzdHlsZVxuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgIHR5cGU6ICdyZW5kZXInLFxuICAgICAgdGFyZ2V0OiB0aGlzXG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFbGVtZW50O1xuXG59KShyZXF1aXJlKCcuL2V2ZW50ZWQnKSk7XG4iLCJ2YXIgRXZlbnQsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFdmVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnQoYXJncywgY2FsbGJhY2spIHtcbiAgICB2YXIgZGF0ZSwgcGVyZjtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIEV2ZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZ3MgPSB7XG4gICAgICAgIHR5cGU6IGFyZ3NcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpICYmIHR5cGVvZiBhcmdzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGFyZ3M7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMudHlwZSA9IGFyZ3MudHlwZSwgdGhpcy5waGFzZSA9IGFyZ3MucGhhc2UsIHRoaXMuY2FuY2VsYWJsZSA9IGFyZ3MuY2FuY2VsYWJsZSwgdGhpcy5idWJibGVzID0gYXJncy5idWJibGVzLCB0aGlzLnNvdXJjZSA9IGFyZ3Muc291cmNlLCB0aGlzLnRhcmdldCA9IGFyZ3MudGFyZ2V0LCB0aGlzLmJ1YmJsaW5nID0gYXJncy5idWJibGluZywgdGhpcy5zaW5raW5nID0gYXJncy5zaW5raW5nLCB0aGlzLnN0YXJ0ZWQgPSBhcmdzLnN0YXJ0ZWQsIHRoaXMuc3RvcHBlZCA9IGFyZ3Muc3RvcHBlZCwgdGhpcy5jYW5jZWxlZCA9IGFyZ3MuY2FuY2VsZWQsIHRoaXMuYWJvcnRlZCA9IGFyZ3MuYWJvcnRlZCwgdGhpcy5kb25lID0gYXJncy5kb25lO1xuICAgIGRhdGUgPSBEYXRlLm5vdygpO1xuICAgIHBlcmYgPSAodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsID8gcGVyZm9ybWFuY2Uubm93KCkgOiB2b2lkIDApIHx8IDA7XG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2sgfHwgY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICB0aGlzLnRpbWVzdGFtcCA9IDEwMDAgKiBkYXRlICsgTWF0aC5mbG9vcigxMDAwICogKHBlcmYgLSBNYXRoLmZsb29yKHBlcmYpKSk7XG4gIH1cblxuICBFdmVudC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdG9wcGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jYW5jZWxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hYm9ydGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gRXZlbnQ7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsInZhciBFdmVudCwgRXZlbnRlZCxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudGVkID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEV2ZW50ZWQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEV2ZW50ZWQoKSB7XG4gICAgRXZlbnRlZC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmxpc3RlbmVycyA9IFt7fSwge31dO1xuICB9XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIGJhc2UsIGxpc3RlbmVycywgcmVmO1xuICAgIGlmIChjYXB0dXJlID09IG51bGwpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHJlZiA9IHR5cGUsIHR5cGUgPSByZWYudHlwZSwgbGlzdGVuZXIgPSByZWYubGlzdGVuZXIsIGNhcHR1cmUgPSByZWYuY2FwdHVyZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgJiYgdHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsaXN0ZW5lcnMgPSAoKGJhc2UgPSB0aGlzLmxpc3RlbmVyc1tjYXB0dXJlID09PSB0cnVlID8gMSA6IDBdKVt0eXBlXSB8fCAoYmFzZVt0eXBlXSA9IFtdKSk7XG4gICAgICBpZiAoLTEgPT09IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSkge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50ZWQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgIHZhciBpZHgsIGxpc3RlbmVycywgcmVmO1xuICAgIGlmIChjYXB0dXJlID09IG51bGwpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHJlZiA9IHR5cGUsIHR5cGUgPSByZWYudHlwZSwgbGlzdGVuZXIgPSByZWYubGlzdGVuZXIsIGNhcHR1cmUgPSByZWYuY2FwdHVyZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgJiYgdHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAobGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbY2FwdHVyZSA9PT0gdHJ1ZSA/IDEgOiAwXVt0eXBlXSkge1xuICAgICAgICBpZiAoLTEgIT09IChpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikpKSB7XG4gICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpLCBsZW4sIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIHBoYXNlLCB0eXBlO1xuICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEV2ZW50ICYmICh0eXBlID0gZXZlbnQudHlwZSkgJiYgIWV2ZW50LmFib3J0ZWQpIHtcbiAgICAgIHBoYXNlID0gZXZlbnQucGhhc2U7XG4gICAgICBpZiAocGhhc2UgPiAwICYmIHBoYXNlIDwgMyAmJiAobGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbMiAtIHBoYXNlXVt0eXBlXSkpIHtcbiAgICAgICAgZXZlbnQuc3RhcnQoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICAgICAgaWYgKGV2ZW50LnN0b3BwZWQgfHwgZXZlbnQuYWJvcnRlZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIHRhcmdldCkge1xuICAgIHZhciBjaGlsZCwgaSwgbGVuLCBwaGFzZSwgcmVmLCByZWYxLCB0eXBlO1xuICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEV2ZW50ICYmICh0eXBlID0gZXZlbnQudHlwZSkpIHtcbiAgICAgIGlmICghKGV2ZW50LmFib3J0ZWQgfHwgZXZlbnQuZG9uZSB8fCBldmVudC5waGFzZSA9PT0gMykpIHtcbiAgICAgICAgZXZlbnQuc3RhcnQoKTtcbiAgICAgICAgZXZlbnQuc291cmNlIHx8IChldmVudC5zb3VyY2UgPSB0aGlzKTtcbiAgICAgICAgZXZlbnQudGFyZ2V0IHx8IChldmVudC50YXJnZXQgPSB0YXJnZXQpO1xuICAgICAgICBwaGFzZSA9IChldmVudC5waGFzZSB8fCAoZXZlbnQucGhhc2UgPSAxKSk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpIHtcbiAgICAgICAgICBldmVudC5waGFzZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICByZWYgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2hpbGQgPSByZWZbaV07XG4gICAgICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDEgJiYgIWV2ZW50LmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgY2hpbGQuYnJvYWRjYXN0RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMikge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gdGhpcykge1xuICAgICAgICAgIGlmICghKGV2ZW50LmNhbmNlbGVkIHx8IGV2ZW50LmFib3J0ZWQgfHwgZXZlbnQuZG9uZSB8fCBldmVudC5waGFzZSA9PT0gMykpIHtcbiAgICAgICAgICAgIGlmICgocmVmMSA9IGV2ZW50LmNhbGxiYWNrKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHJlZjEuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMztcbiAgICAgICAgICBldmVudC5maW5pc2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gRXZlbnRlZDtcblxufSkocmVxdWlyZSgnLi9ub2RlJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJhc2U6IHJlcXVpcmUoJy4vYmFzZScpLFxuICBFdmVudDogcmVxdWlyZSgnLi9ldmVudCcpLFxuICBOb2RlOiByZXF1aXJlKCcuL25vZGUnKSxcbiAgRWxlbWVudDogcmVxdWlyZSgnLi9lbGVtZW50JyksXG4gIEV2ZW50ZWQ6IHJlcXVpcmUoJy4vZXZlbnRlZCcpLFxuICBTdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICBTaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpLFxuICBDb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50JyksXG4gIFBlbjogcmVxdWlyZSgnLi9wZW4nKVxufTtcbiIsInZhciBOb2RlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChOb2RlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBOb2RlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIE5vZGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGFyZ3MuY2hpbGRyZW4gfHwgW107XG4gICAgdGhpcy5wYXJlbnQgPSBhcmdzLnBhcmVudCB8fCBudWxsO1xuICB9XG5cbiAgTm9kZS5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciBwYXJlbnQ7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSAmJiAtMSA9PT0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSkge1xuICAgICAgaWYgKHBhcmVudCA9IGNoaWxkLnBhcmVudCkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgfVxuICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgaWR4O1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUgJiYgLTEgIT09IChpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSkge1xuICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBOb2RlO1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJ2YXIgUGVuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBlbiA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGVuKCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmRyYXcuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICB9XG5cbiAgUGVuLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIFBlbjtcblxufSkoKTtcbiIsInZhciBFdmVudCwgU2hhcGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU2hhcGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFNoYXBlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIFNoYXBlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMub3JpZ2luID0gYXJncy5vcmlnaW4gfHwgdGhpcy5vcmlnaW4gfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuc2l6ZSA9IGFyZ3Muc2l6ZSB8fCB0aGlzLnNpemUgfHwge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignZHJhdycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmRyYXdMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9XG5cbiAgU2hhcGUucHJvdG90eXBlLmRyYXdMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge307XG5cbiAgU2hhcGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgdHlwZTogJ2RyYXcnLFxuICAgICAgdGFyZ2V0OiB0aGlzXG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBTaGFwZTtcblxufSkocmVxdWlyZSgnLi9lbGVtZW50JykpO1xuIiwidmFyIFN0eWxlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU3R5bGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFN0eWxlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIFN0eWxlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhcmdzLm1hcHBlcikge1xuICAgICAgdGhpcy5tYXBwZXIgPSBhcmdzLm1hcHBlcjtcbiAgICB9XG4gICAgdGhpcy5kYXRhID0gYXJncy5kYXRhIHx8IHt9O1xuICB9XG5cbiAgU3R5bGUucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbihqc29uLCBjYWxsYmFjaykge1xuICAgIGlmIChqc29uKSB7XG4gICAgICB0aGlzLm1hcHBlcihqc29uLCB0aGlzLmRhdGEsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU3R5bGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCBrZXksIGtleXMsIGxlbiwgbGVuZ3RoLCByZXN1bHQ7XG4gICAga2V5cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmICghKGxlbmd0aCA9IGtleXMubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG4gICAgcmVzdWx0ID0gW107XG4gICAgaWYgKGxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGtleXMgPSBrZXlzWzBdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBrZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKHRoaXMuZGF0YVtrZXldICE9IG51bGwpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5kYXRhW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEgPyByZXN1bHRbMF0gOiByZXN1bHQpO1xuICB9O1xuXG4gIFN0eWxlLnByb3RvdHlwZS5tYXBwZXIgPSBmdW5jdGlvbihkYXRhLCBjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9O1xuXG4gIHJldHVybiBTdHlsZTtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlY3RhbmdsZTogcmVxdWlyZSgnLi9yZWN0YW5nbGUnKSxcbiAgTGluZTogcmVxdWlyZSgnLi9saW5lJyksXG4gIFRleHQ6IHJlcXVpcmUoJy4vdGV4dCcpXG59O1xuIiwidmFyIExpbmUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExpbmUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExpbmUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IGFyZ3Muc3RhcnQgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuZW5kID0gYXJncy5lbmQgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UsIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGg7XG4gICAgdGhpcy5maWxsID0gYXJncy5maWxsLCB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgTGluZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgZW5kLCBsaW5lV2lkdGgsIHN0YXJ0LCBzdHJva2U7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgc3RhcnQgPSBhcmdzLnN0YXJ0IHx8IHRoaXMuc3RhcnQgfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgZW5kID0gYXJncy5lbmQgfHwgdGhpcy5lbmQgfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBsaW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICAgIGlmIChsaW5lV2lkdGggJSAyKSB7XG4gICAgICAgIHN0YXJ0LnggKz0gMC41O1xuICAgICAgICBzdGFydC55ICs9IDAuNTtcbiAgICAgICAgZW5kLnggKz0gMC41O1xuICAgICAgICBlbmQueSArPSAwLjU7XG4gICAgICB9XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB9XG4gICAgICBjb250ZXh0Lm1vdmVUbyhzdGFydC54LCBzdGFydC55KTtcbiAgICAgIGNvbnRleHQubGluZVRvKGVuZC54LCBlbmQueSk7XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2U7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gTGluZS5fX3N1cGVyX18uZHJhdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiBMaW5lO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwidmFyIFJlY3RhbmdsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChSZWN0YW5nbGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFJlY3RhbmdsZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnNpemUgPSBhcmdzLnNpemUgfHwge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHRoaXMuZmlsbCA9IGFyZ3MuZmlsbCwgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSwgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aDtcbiAgICByZXR1cm4gUmVjdGFuZ2xlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgUmVjdGFuZ2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBmaWxsLCBsaW5lV2lkdGgsIG9yaWdpbiwgc2l6ZSwgc3Ryb2tlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIG9yaWdpbiA9IGFyZ3Mub3JpZ2luIHx8IHRoaXMub3JpZ2luIHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIHNpemUgPSBhcmdzLnNpemUgfHwgdGhpcy5zaXplIHx8IHtcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgfTtcbiAgICAgIGZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBsaW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICAgIGlmIChsaW5lV2lkdGggJSAyKSB7XG4gICAgICAgIG9yaWdpbi54ICs9IDAuNTtcbiAgICAgICAgb3JpZ2luLnkgKz0gMC41O1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICAgIG9yaWdpbi54ID0gb3JpZ2luLnkgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgfHwgc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCkge1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGw7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3Qob3JpZ2luLngsIG9yaWdpbi55LCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2U7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3Qob3JpZ2luLngsIG9yaWdpbi55LCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFJlY3RhbmdsZS5fX3N1cGVyX18uZHJhdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiBSZWN0YW5nbGU7XG5cbn0pKHJlcXVpcmUoJy4uL2xpYi9wZW4nKSk7XG4iLCJ2YXIgTGluZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTGluZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTGluZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLm9yaWdpbiA9IGFyZ3Mub3JpZ2luIHx8IHRoaXMub3JpZ2luIHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmZvbnQgPSBhcmdzLmZvbnQgfHwgdGhpcy5mb250O1xuICAgIHRoaXMuZmlsbCA9IGFyZ3MuZmlsbCB8fCB0aGlzLmZpbGw7XG4gICAgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSB8fCB0aGlzLnN0cm9rZTtcbiAgICB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoIHx8IHRoaXMubGluZVdpZHRoO1xuICAgIHRoaXMuYmFzZWxpbmUgPSBhcmdzLmJhc2VsaW5lIHx8IHRoaXMuYmFzZWxpbmU7XG4gICAgcmV0dXJuIExpbmUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBMaW5lLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBiYXNlbGluZSwgZmlsbCwgZm9udCwgb3JpZ2luLCBzdHJva2UsIHRleHQ7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoY29udGV4dCAmJiAodGV4dCA9IGFyZ3MudGV4dCkpIHtcbiAgICAgIG9yaWdpbiA9IGFyZ3Mub3JpZ2luIHx8IHRoaXMub3JpZ2luIHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIGZvbnQgPSBhcmdzLmZvbnQgfHwgdGhpcy5mb250O1xuICAgICAgZmlsbCA9IGFyZ3MuZmlsbCB8fCB0aGlzLmZpbGw7XG4gICAgICBzdHJva2UgPSBhcmdzLnN0cm9rZSB8fCB0aGlzLnN0cm9rZTtcbiAgICAgIGJhc2VsaW5lID0gYXJncy5iYXNlbGluZSB8fCB0aGlzLmJhc2VsaW5lIHx8ICd0b3AnO1xuICAgICAgaWYgKGZpbGwgfHwgc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuYmFzZWxpbmUgPSBiYXNlbGluZTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgICBvcmlnaW4ueCA9IG9yaWdpbi55ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCBvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZTtcbiAgICAgICAgY29udGV4dC5zdHJva2VUZXh0KHRleHQsIG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5kcmF3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmV0dXJuIExpbmU7XG5cbn0pKHJlcXVpcmUoJy4uL2xpYi9wZW4nKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgU2hhcGU6IHJlcXVpcmUoJy4vc2hhcGUnKVxufTtcbiIsInZhciBTaGFwZSwgXyxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5fID0gZnVuY3Rpb24obywgcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChTaGFwZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gU2hhcGUoKSB7XG4gICAgcmV0dXJuIFNoYXBlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgU2hhcGUucHJvdG90eXBlLm1hcHBlciA9IGZ1bmN0aW9uKGRhdGEsIGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGZpbGwsIGltYWdlLCByZWYsIHJlcGVhdCwgdXJsLCB3aWR0aDtcbiAgICBpZiAoKF8oZGF0YSwgJ3dpZHRoJykpIHx8IChfKGRhdGEsICdoZWlnaHQnKSkpIHtcbiAgICAgIGNvbnRleHQuc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IGRhdGEud2lkdGggfHwgMCxcbiAgICAgICAgaGVpZ2h0OiBkYXRhLmhlaWdodCB8fCAwXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoKF8oZGF0YSwgJ3RvcCcpKSB8fCAoXyhkYXRhLCAnbGVmdCcpKSkge1xuICAgICAgY29udGV4dC5vcmlnaW4gPSB7XG4gICAgICAgIHg6IGRhdGEueCB8fCAwLFxuICAgICAgICB5OiBkYXRhLnkgfHwgMFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2JhY2tncm91bmQnKSkge1xuICAgICAgY29udGV4dC5maWxsID0gZGF0YVsnYmFja2dyb3VuZCddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnZmlsbCcpKSB7XG4gICAgICBjb250ZXh0LmZpbGwgPSBkYXRhWydmaWxsJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdjb2xvcicpKSB7XG4gICAgICBjb250ZXh0LnN0cm9rZSA9IGRhdGFbJ2NvbG9yJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdzdHJva2UnKSkge1xuICAgICAgY29udGV4dC5zdHJva2UgPSBkYXRhWydzdHJva2UnXTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2xpbmUtd2lkdGgnKSkge1xuICAgICAgY29udGV4dC5saW5lIC0gKHdpZHRoID0gZGF0YVsnbGluZS13aWR0aCddKTtcbiAgICB9XG4gICAgaWYgKHVybCA9IChyZWYgPSBjb250ZXh0LmZpbGwpICE9IG51bGwgPyByZWYubWF0Y2goL3VybFxcKFxccyooW1wiJyddPylcXHMqKC4rKVxcMVxcKS8pIDogdm9pZCAwKSB7XG4gICAgICBpZiAocmVwZWF0ID0gY29udGV4dC5maWxsLm1hdGNoKC9ub3JlcGVhdHxyZXBlYXQteHxyZXBlYXQteS8pKSB7XG4gICAgICAgIHJlcGVhdCA9IHJlcGVhdFswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGVhdCA9IG51bGw7XG4gICAgICB9XG4gICAgICBmaWxsID0gbnVsbDtcbiAgICAgIChpbWFnZSA9IG5ldyBJbWFnZSkuc3JjID0gdXJsWzJdO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb250ZXh0LmZpbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLmNyZWF0ZVBhdHRlcm4oaW1hZ2UsIHJlcGVhdCB8fCAncmVwZWF0Jyk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICE9IG51bGwgPyBjYWxsYmFjay5jYWxsKF90aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgcmV0dXJuIGltYWdlLm9uZXJyb3IgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgIT0gbnVsbCA/IGNhbGxiYWNrLmNhbGwoX3RoaXMsIGUsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayAhPSBudWxsID8gY2FsbGJhY2suY2FsbCh0aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNoYXBlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvc3R5bGUnKSk7XG4iLCJ2YXIgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3Nlcykge1xuICB2YXIgTWl4aW5DbGFzcywgUGFyZW50Q2xhc3MsIGksIGtleSwgbGVuLCByZWYsIHZhbHVlO1xuICBpZiAoUGFyZW50Q2xhc3NlcyBpbnN0YW5jZW9mIEFycmF5ICYmIFBhcmVudENsYXNzZXMubGVuZ3RoKSB7XG4gICAgUGFyZW50Q2xhc3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgICAgZXh0ZW5kKFBhcmVudENsYXNzLCBzdXBlckNsYXNzKTtcblxuICAgICAgZnVuY3Rpb24gUGFyZW50Q2xhc3MoKSB7XG4gICAgICAgIHZhciBNaXhpbkNsYXNzLCBpLCBsZW47XG4gICAgICAgIFBhcmVudENsYXNzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBQYXJlbnRDbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICAgICAgTWl4aW5DbGFzcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQYXJlbnRDbGFzcztcblxuICAgIH0pKFBhcmVudENsYXNzZXMuc2hpZnQoKSk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICByZWYgPSBNaXhpbkNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICBpZiAoa2V5ICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgUGFyZW50Q2xhc3MucHJvdG90eXBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBQYXJlbnRDbGFzcyA9IFBhcmVudENsYXNzZXM7XG4gIH1cbiAgcmV0dXJuIGV4dGVuZChDaGlsZENsYXNzLCBQYXJlbnRDbGFzcyk7XG59O1xuIl19
