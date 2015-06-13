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
    this.addEventListener('update', (function(_this) {
      return function(e) {
        return _this.updateListener(e);
      };
    })(this));
    this.addEventListener('render', (function(_this) {
      return function(e) {
        return _this.renderListener(e);
      };
    })(this));
  }

  Element.prototype.updateListener = function() {};

  Element.prototype.renderListener = function() {};

  Element.prototype.update = function() {
    this.broadcastEvent(new Event({
      type: 'update',
      target: this
    }));
    return this;
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
    this.origin = args.origin;
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
    var fill, height, image, ref, repeat, url, width, x, y;
    if ((_(data, 'width')) || (_(data, 'height'))) {
      width = (parseFloat(data['width'])) || 0;
      height = (parseFloat(data['height'])) || 0;
      context.size = {
        width: width,
        height: height
      };
    }
    if ((_(data, 'top')) || (_(data, 'left'))) {
      x = (parseFloat(data['left'])) || 0;
      y = (parseFloat(data['top'])) || 0;
      context.origin = {
        x: x,
        y: y
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
      context.line - (width = (parseFloat(data['line-width'])) || 0);
    }
    if (url = (ref = context.fill) != null ? ref.match(/url\(\s*(["'']?)\s*(.+)\1\)/) : void 0) {
      url = url[2];
      if (repeat = context.fill.match(/(norepeat|repeat-x|repeat-y)/)) {
        repeat = repeat[1];
      } else {
        repeat = null;
      }
      fill = null;
      (image = new Image).src = url;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9pbmRleC5qcyIsImJ1aWxkL2xpYi9iYXNlLmpzIiwiYnVpbGQvbGliL2NvbXBvbmVudC5qcyIsImJ1aWxkL2xpYi9lbGVtZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50ZWQuanMiLCJidWlsZC9saWIvaW5kZXguanMiLCJidWlsZC9saWIvbm9kZS5qcyIsImJ1aWxkL2xpYi9wZW4uanMiLCJidWlsZC9saWIvc2hhcGUuanMiLCJidWlsZC9saWIvc3R5bGUuanMiLCJidWlsZC9wZW4vaW5kZXguanMiLCJidWlsZC9wZW4vbGluZS5qcyIsImJ1aWxkL3Blbi9yZWN0YW5nbGUuanMiLCJidWlsZC9wZW4vdGV4dC5qcyIsImJ1aWxkL3N0eWxlL2luZGV4LmpzIiwiYnVpbGQvc3R5bGUvc2hhcGUuanMiLCJub2RlX21vZHVsZXMvZXh0ZW5kc19fL2Rpc3QvZXh0ZW5kc19fLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ3aW5kb3cuY25sID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxpYjogcmVxdWlyZSgnLi9saWIvaW5kZXgnKSxcbiAgcGVuOiByZXF1aXJlKCcuL3Blbi9pbmRleCcpLFxuICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZS9pbmRleCcpXG59O1xuIiwidmFyIEJhc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQmFzZSgpIHt9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKCk7XG4iLCJ2YXIgQ29tcG9uZW50LCBFdmVudCwgU3R5bGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuU3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlJyk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDb21wb25lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIENvbXBvbmVudChhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBDb21wb25lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tb3VzZW1vdmVMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMubW91c2Vkb3duTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tb3VzZXVwTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfVxuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vkb3duTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2V1cExpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICByZXR1cm4gQ29tcG9uZW50O1xuXG59KShyZXF1aXJlKCcuL3NoYXBlJykpO1xuIiwidmFyIEVsZW1lbnQsIEV2ZW50LCBTdHlsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5TdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGUnKTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFbGVtZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbGVtZW50KGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIEVsZW1lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5fc3R5bGUgPSBhcmdzLnN0eWxlIHx8IHRoaXMuX3N0eWxlO1xuICAgIHRoaXMuX3N0YXRlID0gYXJncy5zdGF0ZSB8fCB0aGlzLl9zdGF0ZTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZUxpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdyZW5kZXInLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5yZW5kZXJMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9XG5cbiAgRWxlbWVudC5wcm90b3R5cGUudXBkYXRlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnJlbmRlckxpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBFbGVtZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICB0eXBlOiAndXBkYXRlJyxcbiAgICAgIHRhcmdldDogdGhpc1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgdHlwZTogJ3JlbmRlcicsXG4gICAgICB0YXJnZXQ6IHRoaXNcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEVsZW1lbnQ7XG5cbn0pKHJlcXVpcmUoJy4vZXZlbnRlZCcpKTtcbiIsInZhciBFdmVudCxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEV2ZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFdmVudChhcmdzLCBjYWxsYmFjaykge1xuICAgIHZhciBkYXRlLCBwZXJmO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgRXZlbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgYXJncyA9IHtcbiAgICAgICAgdHlwZTogYXJnc1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKChhcmd1bWVudHMubGVuZ3RoIDwgMikgJiYgdHlwZW9mIGFyZ3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gYXJncztcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy50eXBlID0gYXJncy50eXBlLCB0aGlzLnBoYXNlID0gYXJncy5waGFzZSwgdGhpcy5jYW5jZWxhYmxlID0gYXJncy5jYW5jZWxhYmxlLCB0aGlzLmJ1YmJsZXMgPSBhcmdzLmJ1YmJsZXMsIHRoaXMuc291cmNlID0gYXJncy5zb3VyY2UsIHRoaXMudGFyZ2V0ID0gYXJncy50YXJnZXQsIHRoaXMuYnViYmxpbmcgPSBhcmdzLmJ1YmJsaW5nLCB0aGlzLnNpbmtpbmcgPSBhcmdzLnNpbmtpbmcsIHRoaXMuc3RhcnRlZCA9IGFyZ3Muc3RhcnRlZCwgdGhpcy5zdG9wcGVkID0gYXJncy5zdG9wcGVkLCB0aGlzLmNhbmNlbGVkID0gYXJncy5jYW5jZWxlZCwgdGhpcy5hYm9ydGVkID0gYXJncy5hYm9ydGVkLCB0aGlzLmRvbmUgPSBhcmdzLmRvbmU7XG4gICAgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgcGVyZiA9ICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwgPyBwZXJmb3JtYW5jZS5ub3coKSA6IHZvaWQgMCkgfHwgMDtcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjayB8fCBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHRoaXMudGltZXN0YW1wID0gMTAwMCAqIGRhdGUgKyBNYXRoLmZsb29yKDEwMDAgKiAocGVyZiAtIE1hdGguZmxvb3IocGVyZikpKTtcbiAgfVxuXG4gIEV2ZW50LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNhbmNlbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudDtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIEV2ZW50LCBFdmVudGVkLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ZWQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRXZlbnRlZCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnRlZCgpIHtcbiAgICBFdmVudGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMubGlzdGVuZXJzID0gW3t9LCB7fV07XG4gIH1cblxuICBFdmVudGVkLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgYmFzZSwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxpc3RlbmVycyA9ICgoYmFzZSA9IHRoaXMubGlzdGVuZXJzW2NhcHR1cmUgPT09IHRydWUgPyAxIDogMF0pW3R5cGVdIHx8IChiYXNlW3R5cGVdID0gW10pKTtcbiAgICAgIGlmICgtMSA9PT0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpKSB7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIGlkeCwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tjYXB0dXJlID09PSB0cnVlID8gMSA6IDBdW3R5cGVdKSB7XG4gICAgICAgIGlmICgtMSAhPT0gKGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSkpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbGlzdGVuZXIsIGxpc3RlbmVycywgcGhhc2UsIHR5cGU7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRXZlbnQgJiYgKHR5cGUgPSBldmVudC50eXBlKSAmJiAhZXZlbnQuYWJvcnRlZCkge1xuICAgICAgcGhhc2UgPSBldmVudC5waGFzZTtcbiAgICAgIGlmIChwaGFzZSA+IDAgJiYgcGhhc2UgPCAzICYmIChsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1syIC0gcGhhc2VdW3R5cGVdKSkge1xuICAgICAgICBldmVudC5zdGFydCgpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgICAgICBpZiAoZXZlbnQuc3RvcHBlZCB8fCBldmVudC5hYm9ydGVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudCwgdGFyZ2V0KSB7XG4gICAgdmFyIGNoaWxkLCBpLCBsZW4sIHBoYXNlLCByZWYsIHJlZjEsIHR5cGU7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRXZlbnQgJiYgKHR5cGUgPSBldmVudC50eXBlKSkge1xuICAgICAgaWYgKCEoZXZlbnQuYWJvcnRlZCB8fCBldmVudC5kb25lIHx8IGV2ZW50LnBoYXNlID09PSAzKSkge1xuICAgICAgICBldmVudC5zdGFydCgpO1xuICAgICAgICBldmVudC5zb3VyY2UgfHwgKGV2ZW50LnNvdXJjZSA9IHRoaXMpO1xuICAgICAgICBldmVudC50YXJnZXQgfHwgKGV2ZW50LnRhcmdldCA9IHRhcmdldCk7XG4gICAgICAgIHBoYXNlID0gKGV2ZW50LnBoYXNlIHx8IChldmVudC5waGFzZSA9IDEpKTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgIHJlZiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHJlZltpXTtcbiAgICAgICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMSAmJiAhZXZlbnQuYWJvcnRlZCkge1xuICAgICAgICAgICAgICBjaGlsZC5icm9hZGNhc3RFdmVudChldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlID09PSAyKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSB0aGlzKSB7XG4gICAgICAgICAgaWYgKCEoZXZlbnQuY2FuY2VsZWQgfHwgZXZlbnQuYWJvcnRlZCB8fCBldmVudC5kb25lIHx8IGV2ZW50LnBoYXNlID09PSAzKSkge1xuICAgICAgICAgICAgaWYgKChyZWYxID0gZXZlbnQuY2FsbGJhY2spICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmVmMS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucGhhc2UgPSAzO1xuICAgICAgICAgIGV2ZW50LmZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudGVkO1xuXG59KShyZXF1aXJlKCcuL25vZGUnKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmFzZTogcmVxdWlyZSgnLi9iYXNlJyksXG4gIEV2ZW50OiByZXF1aXJlKCcuL2V2ZW50JyksXG4gIE5vZGU6IHJlcXVpcmUoJy4vbm9kZScpLFxuICBFbGVtZW50OiByZXF1aXJlKCcuL2VsZW1lbnQnKSxcbiAgRXZlbnRlZDogcmVxdWlyZSgnLi9ldmVudGVkJyksXG4gIFN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gIFNoYXBlOiByZXF1aXJlKCcuL3NoYXBlJyksXG4gIENvbXBvbmVudDogcmVxdWlyZSgnLi9jb21wb25lbnQnKSxcbiAgUGVuOiByZXF1aXJlKCcuL3BlbicpXG59O1xuIiwidmFyIE5vZGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKE5vZGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIE5vZGUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgTm9kZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmNoaWxkcmVuID0gYXJncy5jaGlsZHJlbiB8fCBbXTtcbiAgICB0aGlzLnBhcmVudCA9IGFyZ3MucGFyZW50IHx8IG51bGw7XG4gIH1cblxuICBOb2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHBhcmVudDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlICYmIC0xID09PSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSB7XG4gICAgICBpZiAocGFyZW50ID0gY2hpbGQucGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICB9XG4gICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciBpZHg7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSAmJiAtMSAhPT0gKGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkpKSB7XG4gICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIE5vZGU7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsInZhciBQZW47XG5cbm1vZHVsZS5leHBvcnRzID0gUGVuID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQZW4oKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuZHJhdy5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gIH1cblxuICBQZW4ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gUGVuO1xuXG59KSgpO1xuIiwidmFyIEV2ZW50LCBTaGFwZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChTaGFwZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gU2hhcGUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgU2hhcGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5vcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5zaXplID0gYXJncy5zaXplIHx8IHRoaXMuc2l6ZSB8fCB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMFxuICAgIH07XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdkcmF3JywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMuZHJhd0xpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gIH1cblxuICBTaGFwZS5wcm90b3R5cGUuZHJhd0xpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBTaGFwZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICB0eXBlOiAnZHJhdycsXG4gICAgICB0YXJnZXQ6IHRoaXNcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIFNoYXBlO1xuXG59KShyZXF1aXJlKCcuL2VsZW1lbnQnKSk7XG4iLCJ2YXIgU3R5bGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChTdHlsZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gU3R5bGUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgU3R5bGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGFyZ3MubWFwcGVyKSB7XG4gICAgICB0aGlzLm1hcHBlciA9IGFyZ3MubWFwcGVyO1xuICAgIH1cbiAgICB0aGlzLmRhdGEgPSBhcmdzLmRhdGEgfHwge307XG4gIH1cblxuICBTdHlsZS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKGpzb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKGpzb24pIHtcbiAgICAgIHRoaXMubWFwcGVyKGpzb24sIHRoaXMuZGF0YSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTdHlsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIGtleSwga2V5cywgbGVuLCBsZW5ndGgsIHJlc3VsdDtcbiAgICBrZXlzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKCEobGVuZ3RoID0ga2V5cy5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgIH1cbiAgICByZXN1bHQgPSBbXTtcbiAgICBpZiAobGVuZ3RoID09PSAxICYmIGtleXNbMF0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAga2V5cyA9IGtleXNbMF07XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAodGhpcy5kYXRhW2tleV0gIT0gbnVsbCkge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLmRhdGFba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAocmVzdWx0Lmxlbmd0aCA9PT0gMSA/IHJlc3VsdFswXSA6IHJlc3VsdCk7XG4gIH07XG5cbiAgU3R5bGUucHJvdG90eXBlLm1hcHBlciA9IGZ1bmN0aW9uKGRhdGEsIGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH07XG5cbiAgcmV0dXJuIFN0eWxlO1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgUmVjdGFuZ2xlOiByZXF1aXJlKCcuL3JlY3RhbmdsZScpLFxuICBMaW5lOiByZXF1aXJlKCcuL2xpbmUnKSxcbiAgVGV4dDogcmVxdWlyZSgnLi90ZXh0Jylcbn07XG4iLCJ2YXIgTGluZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTGluZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTGluZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0ID0gYXJncy5zdGFydCB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5lbmQgPSBhcmdzLmVuZCB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSwgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aDtcbiAgICB0aGlzLmZpbGwgPSBhcmdzLmZpbGwsIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UsIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGg7XG4gICAgcmV0dXJuIExpbmUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBMaW5lLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBlbmQsIGxpbmVXaWR0aCwgc3RhcnQsIHN0cm9rZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBzdGFydCA9IGFyZ3Muc3RhcnQgfHwgdGhpcy5zdGFydCB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBlbmQgPSBhcmdzLmVuZCB8fCB0aGlzLmVuZCB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBzdHJva2UgPSBhcmdzLnN0cm9rZSB8fCB0aGlzLnN0cm9rZTtcbiAgICAgIGxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoIHx8IHRoaXMubGluZVdpZHRoO1xuICAgICAgaWYgKGxpbmVXaWR0aCAlIDIpIHtcbiAgICAgICAgc3RhcnQueCArPSAwLjU7XG4gICAgICAgIHN0YXJ0LnkgKz0gMC41O1xuICAgICAgICBlbmQueCArPSAwLjU7XG4gICAgICAgIGVuZC55ICs9IDAuNTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIH1cbiAgICAgIGNvbnRleHQubW92ZVRvKHN0YXJ0LngsIHN0YXJ0LnkpO1xuICAgICAgY29udGV4dC5saW5lVG8oZW5kLngsIGVuZC55KTtcbiAgICAgIGlmIChzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZTtcbiAgICAgICAgaWYgKGxpbmVXaWR0aCkge1xuICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5kcmF3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmV0dXJuIExpbmU7XG5cbn0pKHJlcXVpcmUoJy4uL2xpYi9wZW4nKSk7XG4iLCJ2YXIgUmVjdGFuZ2xlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFJlY3RhbmdsZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gUmVjdGFuZ2xlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuc2l6ZSA9IGFyZ3Muc2l6ZSB8fCB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMFxuICAgIH07XG4gICAgdGhpcy5vcmlnaW4gPSBhcmdzLm9yaWdpbjtcbiAgICB0aGlzLmZpbGwgPSBhcmdzLmZpbGwsIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UsIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGg7XG4gICAgcmV0dXJuIFJlY3RhbmdsZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFJlY3RhbmdsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgZmlsbCwgbGluZVdpZHRoLCBvcmlnaW4sIHNpemUsIHN0cm9rZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBvcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBzaXplID0gYXJncy5zaXplIHx8IHRoaXMuc2l6ZSB8fCB7XG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgIH07XG4gICAgICBmaWxsID0gYXJncy5maWxsIHx8IHRoaXMuZmlsbDtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgbGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgICBpZiAobGluZVdpZHRoICUgMikge1xuICAgICAgICBvcmlnaW4ueCArPSAwLjU7XG4gICAgICAgIG9yaWdpbi55ICs9IDAuNTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgICBvcmlnaW4ueCA9IG9yaWdpbi55ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIHx8IHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KG9yaWdpbi54LCBvcmlnaW4ueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KG9yaWdpbi54LCBvcmlnaW4ueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBSZWN0YW5nbGUuX19zdXBlcl9fLmRyYXcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZXR1cm4gUmVjdGFuZ2xlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwidmFyIExpbmUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExpbmUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExpbmUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5vcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5mb250ID0gYXJncy5mb250IHx8IHRoaXMuZm9udDtcbiAgICB0aGlzLmZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICB0aGlzLmJhc2VsaW5lID0gYXJncy5iYXNlbGluZSB8fCB0aGlzLmJhc2VsaW5lO1xuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgTGluZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYmFzZWxpbmUsIGZpbGwsIGZvbnQsIG9yaWdpbiwgc3Ryb2tlLCB0ZXh0O1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQgJiYgKHRleHQgPSBhcmdzLnRleHQpKSB7XG4gICAgICBvcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBmb250ID0gYXJncy5mb250IHx8IHRoaXMuZm9udDtcbiAgICAgIGZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBiYXNlbGluZSA9IGFyZ3MuYmFzZWxpbmUgfHwgdGhpcy5iYXNlbGluZSB8fCAndG9wJztcbiAgICAgIGlmIChmaWxsIHx8IHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJhc2VsaW5lID0gYmFzZWxpbmU7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3JpZ2luLngsIG9yaWdpbi55KTtcbiAgICAgICAgb3JpZ2luLnggPSBvcmlnaW4ueSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCkge1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGw7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCwgb3JpZ2luLngsIG9yaWdpbi55KTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHJva2UpIHtcbiAgICAgICAgaWYgKGxpbmVXaWR0aCkge1xuICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2U7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlVGV4dCh0ZXh0LCBvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gTGluZS5fX3N1cGVyX18uZHJhdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiBMaW5lO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNoYXBlOiByZXF1aXJlKCcuL3NoYXBlJylcbn07XG4iLCJ2YXIgU2hhcGUsIF8sXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXyA9IGZ1bmN0aW9uKG8sIHApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU2hhcGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFNoYXBlKCkge1xuICAgIHJldHVybiBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFNoYXBlLnByb3RvdHlwZS5tYXBwZXIgPSBmdW5jdGlvbihkYXRhLCBjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIHZhciBmaWxsLCBoZWlnaHQsIGltYWdlLCByZWYsIHJlcGVhdCwgdXJsLCB3aWR0aCwgeCwgeTtcbiAgICBpZiAoKF8oZGF0YSwgJ3dpZHRoJykpIHx8IChfKGRhdGEsICdoZWlnaHQnKSkpIHtcbiAgICAgIHdpZHRoID0gKHBhcnNlRmxvYXQoZGF0YVsnd2lkdGgnXSkpIHx8IDA7XG4gICAgICBoZWlnaHQgPSAocGFyc2VGbG9hdChkYXRhWydoZWlnaHQnXSkpIHx8IDA7XG4gICAgICBjb250ZXh0LnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgoXyhkYXRhLCAndG9wJykpIHx8IChfKGRhdGEsICdsZWZ0JykpKSB7XG4gICAgICB4ID0gKHBhcnNlRmxvYXQoZGF0YVsnbGVmdCddKSkgfHwgMDtcbiAgICAgIHkgPSAocGFyc2VGbG9hdChkYXRhWyd0b3AnXSkpIHx8IDA7XG4gICAgICBjb250ZXh0Lm9yaWdpbiA9IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2JhY2tncm91bmQnKSkge1xuICAgICAgY29udGV4dC5maWxsID0gZGF0YVsnYmFja2dyb3VuZCddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnZmlsbCcpKSB7XG4gICAgICBjb250ZXh0LmZpbGwgPSBkYXRhWydmaWxsJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdjb2xvcicpKSB7XG4gICAgICBjb250ZXh0LnN0cm9rZSA9IGRhdGFbJ2NvbG9yJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdzdHJva2UnKSkge1xuICAgICAgY29udGV4dC5zdHJva2UgPSBkYXRhWydzdHJva2UnXTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2xpbmUtd2lkdGgnKSkge1xuICAgICAgY29udGV4dC5saW5lIC0gKHdpZHRoID0gKHBhcnNlRmxvYXQoZGF0YVsnbGluZS13aWR0aCddKSkgfHwgMCk7XG4gICAgfVxuICAgIGlmICh1cmwgPSAocmVmID0gY29udGV4dC5maWxsKSAhPSBudWxsID8gcmVmLm1hdGNoKC91cmxcXChcXHMqKFtcIicnXT8pXFxzKiguKylcXDFcXCkvKSA6IHZvaWQgMCkge1xuICAgICAgdXJsID0gdXJsWzJdO1xuICAgICAgaWYgKHJlcGVhdCA9IGNvbnRleHQuZmlsbC5tYXRjaCgvKG5vcmVwZWF0fHJlcGVhdC14fHJlcGVhdC15KS8pKSB7XG4gICAgICAgIHJlcGVhdCA9IHJlcGVhdFsxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGVhdCA9IG51bGw7XG4gICAgICB9XG4gICAgICBmaWxsID0gbnVsbDtcbiAgICAgIChpbWFnZSA9IG5ldyBJbWFnZSkuc3JjID0gdXJsO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb250ZXh0LmZpbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLmNyZWF0ZVBhdHRlcm4oaW1hZ2UsIHJlcGVhdCB8fCAncmVwZWF0Jyk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICE9IG51bGwgPyBjYWxsYmFjay5jYWxsKF90aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgcmV0dXJuIGltYWdlLm9uZXJyb3IgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgIT0gbnVsbCA/IGNhbGxiYWNrLmNhbGwoX3RoaXMsIGUsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayAhPSBudWxsID8gY2FsbGJhY2suY2FsbCh0aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNoYXBlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvc3R5bGUnKSk7XG4iLCJ2YXIgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3Nlcykge1xuICB2YXIgTWl4aW5DbGFzcywgUGFyZW50Q2xhc3MsIGksIGtleSwgbGVuLCByZWYsIHZhbHVlO1xuICBpZiAoUGFyZW50Q2xhc3NlcyBpbnN0YW5jZW9mIEFycmF5ICYmIFBhcmVudENsYXNzZXMubGVuZ3RoKSB7XG4gICAgUGFyZW50Q2xhc3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgICAgZXh0ZW5kKFBhcmVudENsYXNzLCBzdXBlckNsYXNzKTtcblxuICAgICAgZnVuY3Rpb24gUGFyZW50Q2xhc3MoKSB7XG4gICAgICAgIHZhciBNaXhpbkNsYXNzLCBpLCBsZW47XG4gICAgICAgIFBhcmVudENsYXNzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBQYXJlbnRDbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICAgICAgTWl4aW5DbGFzcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQYXJlbnRDbGFzcztcblxuICAgIH0pKFBhcmVudENsYXNzZXMuc2hpZnQoKSk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICByZWYgPSBNaXhpbkNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICBpZiAoa2V5ICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgUGFyZW50Q2xhc3MucHJvdG90eXBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBQYXJlbnRDbGFzcyA9IFBhcmVudENsYXNzZXM7XG4gIH1cbiAgcmV0dXJuIGV4dGVuZChDaGlsZENsYXNzLCBQYXJlbnRDbGFzcyk7XG59O1xuIl19
