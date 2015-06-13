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
    this.addEventListener('update', (function(_this) {
      return function(e) {
        return _this.updateListener(e);
      };
    })(this));
  }

  Shape.prototype.drawListener = function() {};

  Shape.prototype.updateListener = function() {};

  Shape.prototype.draw = function(context, args) {
    this.broadcastEvent(new Event({
      type: 'draw',
      target: this
    }));
    return this;
  };

  Shape.prototype.update = function() {
    this.broadcastEvent(new Event({
      type: 'update',
      target: this
    }));
    return this;
  };

  Shape.prototype.style = function(value) {
    if (value instanceof cnl.lib.Style) {
      this.update({
        style: value.get()
      });
      return Shape.__super__.style.apply(this, arguments);
    }
    return Shape.__super__.style.call(this);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9pbmRleC5qcyIsImJ1aWxkL2xpYi9iYXNlLmpzIiwiYnVpbGQvbGliL2NvbXBvbmVudC5qcyIsImJ1aWxkL2xpYi9lbGVtZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50ZWQuanMiLCJidWlsZC9saWIvaW5kZXguanMiLCJidWlsZC9saWIvbm9kZS5qcyIsImJ1aWxkL2xpYi9wZW4uanMiLCJidWlsZC9saWIvc2hhcGUuanMiLCJidWlsZC9saWIvc3R5bGUuanMiLCJidWlsZC9wZW4vaW5kZXguanMiLCJidWlsZC9wZW4vbGluZS5qcyIsImJ1aWxkL3Blbi9yZWN0YW5nbGUuanMiLCJidWlsZC9wZW4vdGV4dC5qcyIsImJ1aWxkL3N0eWxlL2luZGV4LmpzIiwiYnVpbGQvc3R5bGUvc2hhcGUuanMiLCJub2RlX21vZHVsZXMvZXh0ZW5kc19fL2Rpc3QvZXh0ZW5kc19fLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5jbmwgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGliOiByZXF1aXJlKCcuL2xpYi9pbmRleCcpLFxuICBwZW46IHJlcXVpcmUoJy4vcGVuL2luZGV4JyksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlL2luZGV4Jylcbn07XG4iLCJ2YXIgQmFzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBCYXNlKCkge31cblxuICByZXR1cm4gQmFzZTtcblxufSkoKTtcbiIsInZhciBDb21wb25lbnQsIEV2ZW50LCBTdHlsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5TdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGUnKTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENvbXBvbmVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29tcG9uZW50KGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIENvbXBvbmVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLm1vdXNlbW92ZUxpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tb3VzZWRvd25MaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLm1vdXNldXBMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge307XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uKCkge307XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZXVwTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIHJldHVybiBDb21wb25lbnQ7XG5cbn0pKHJlcXVpcmUoJy4vc2hhcGUnKSk7XG4iLCJ2YXIgRWxlbWVudCwgRXZlbnQsIFN0eWxlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cblN0eWxlID0gcmVxdWlyZSgnLi9zdHlsZScpO1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEVsZW1lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEVsZW1lbnQoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgRWxlbWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLl9zdHlsZSA9IGFyZ3Muc3R5bGUgfHwgdGhpcy5fc3R5bGU7XG4gICAgdGhpcy5fc3RhdGUgPSBhcmdzLnN0YXRlIHx8IHRoaXMuX3N0YXRlO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignc3RhdGUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5zdGF0ZUxpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzdHlsZScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnN0eWxlTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbmRlcicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnJlbmRlckxpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gIH1cblxuICBFbGVtZW50LnByb3RvdHlwZS5zdGF0ZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5zdHlsZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5yZW5kZXJMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge307XG5cbiAgRWxlbWVudC5wcm90b3R5cGUuc3RhdGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgIHRoaXMuX3N0YXRlID0gdmFsdWU7XG4gICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgIHR5cGU6ICdzdGF0ZScsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBvbGQ6IHN0YXRlXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5zdHlsZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHN0eWxlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBzdHlsZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgdGhpcy5fc3R5bGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ3N0eWxlJyxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG9sZDogc3R5bGVcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICB0eXBlOiAncmVuZGVyJyxcbiAgICAgIHRhcmdldDogdGhpc1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gRWxlbWVudDtcblxufSkocmVxdWlyZSgnLi9ldmVudGVkJykpO1xuIiwidmFyIEV2ZW50LFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRXZlbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEV2ZW50KGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGRhdGUsIHBlcmY7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBFdmVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcmdzID0ge1xuICAgICAgICB0eXBlOiBhcmdzXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSAmJiB0eXBlb2YgYXJncyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBhcmdzO1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnR5cGUgPSBhcmdzLnR5cGUsIHRoaXMucGhhc2UgPSBhcmdzLnBoYXNlLCB0aGlzLmNhbmNlbGFibGUgPSBhcmdzLmNhbmNlbGFibGUsIHRoaXMuYnViYmxlcyA9IGFyZ3MuYnViYmxlcywgdGhpcy5zb3VyY2UgPSBhcmdzLnNvdXJjZSwgdGhpcy50YXJnZXQgPSBhcmdzLnRhcmdldCwgdGhpcy5idWJibGluZyA9IGFyZ3MuYnViYmxpbmcsIHRoaXMuc2lua2luZyA9IGFyZ3Muc2lua2luZywgdGhpcy5zdGFydGVkID0gYXJncy5zdGFydGVkLCB0aGlzLnN0b3BwZWQgPSBhcmdzLnN0b3BwZWQsIHRoaXMuY2FuY2VsZWQgPSBhcmdzLmNhbmNlbGVkLCB0aGlzLmFib3J0ZWQgPSBhcmdzLmFib3J0ZWQsIHRoaXMuZG9uZSA9IGFyZ3MuZG9uZTtcbiAgICBkYXRlID0gRGF0ZS5ub3coKTtcbiAgICBwZXJmID0gKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCA/IHBlcmZvcm1hbmNlLm5vdygpIDogdm9pZCAwKSB8fCAwO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrIHx8IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gICAgdGhpcy50aW1lc3RhbXAgPSAxMDAwICogZGF0ZSArIE1hdGguZmxvb3IoMTAwMCAqIChwZXJmIC0gTWF0aC5mbG9vcihwZXJmKSkpO1xuICB9XG5cbiAgRXZlbnQucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY2FuY2VsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYWJvcnRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50O1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJ2YXIgRXZlbnQsIEV2ZW50ZWQsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRlZCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFdmVudGVkLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFdmVudGVkKCkge1xuICAgIEV2ZW50ZWQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbe30sIHt9XTtcbiAgfVxuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgIHZhciBiYXNlLCBsaXN0ZW5lcnMsIHJlZjtcbiAgICBpZiAoY2FwdHVyZSA9PSBudWxsKSB7XG4gICAgICBjYXB0dXJlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZWYgPSB0eXBlLCB0eXBlID0gcmVmLnR5cGUsIGxpc3RlbmVyID0gcmVmLmxpc3RlbmVyLCBjYXB0dXJlID0gcmVmLmNhcHR1cmU7XG4gICAgfVxuICAgIGlmICh0eXBlICYmIHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGlzdGVuZXJzID0gKChiYXNlID0gdGhpcy5saXN0ZW5lcnNbY2FwdHVyZSA9PT0gdHJ1ZSA/IDEgOiAwXSlbdHlwZV0gfHwgKGJhc2VbdHlwZV0gPSBbXSkpO1xuICAgICAgaWYgKC0xID09PSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikpIHtcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgaWR4LCBsaXN0ZW5lcnMsIHJlZjtcbiAgICBpZiAoY2FwdHVyZSA9PSBudWxsKSB7XG4gICAgICBjYXB0dXJlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZWYgPSB0eXBlLCB0eXBlID0gcmVmLnR5cGUsIGxpc3RlbmVyID0gcmVmLmxpc3RlbmVyLCBjYXB0dXJlID0gcmVmLmNhcHR1cmU7XG4gICAgfVxuICAgIGlmICh0eXBlICYmIHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2NhcHR1cmUgPT09IHRydWUgPyAxIDogMF1bdHlwZV0pIHtcbiAgICAgICAgaWYgKC0xICE9PSAoaWR4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpKSkge1xuICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSwgbGVuLCBsaXN0ZW5lciwgbGlzdGVuZXJzLCBwaGFzZSwgdHlwZTtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBFdmVudCAmJiAodHlwZSA9IGV2ZW50LnR5cGUpICYmICFldmVudC5hYm9ydGVkKSB7XG4gICAgICBwaGFzZSA9IGV2ZW50LnBoYXNlO1xuICAgICAgaWYgKHBoYXNlID4gMCAmJiBwaGFzZSA8IDMgJiYgKGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzWzIgLSBwaGFzZV1bdHlwZV0pKSB7XG4gICAgICAgIGV2ZW50LnN0YXJ0KCk7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgICAgIGlmIChldmVudC5zdG9wcGVkIHx8IGV2ZW50LmFib3J0ZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5icm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQpIHtcbiAgICB2YXIgY2hpbGQsIGksIGxlbiwgcGhhc2UsIHJlZiwgcmVmMSwgdHlwZTtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBFdmVudCAmJiAodHlwZSA9IGV2ZW50LnR5cGUpKSB7XG4gICAgICBpZiAoIShldmVudC5hYm9ydGVkIHx8IGV2ZW50LmRvbmUgfHwgZXZlbnQucGhhc2UgPT09IDMpKSB7XG4gICAgICAgIGV2ZW50LnN0YXJ0KCk7XG4gICAgICAgIGV2ZW50LnNvdXJjZSB8fCAoZXZlbnQuc291cmNlID0gdGhpcyk7XG4gICAgICAgIGV2ZW50LnRhcmdldCB8fCAoZXZlbnQudGFyZ2V0ID0gdGFyZ2V0KTtcbiAgICAgICAgcGhhc2UgPSAoZXZlbnQucGhhc2UgfHwgKGV2ZW50LnBoYXNlID0gMSkpO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XG4gICAgICAgICAgZXZlbnQucGhhc2UgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgcmVmID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnBoYXNlID09PSAxICYmICFldmVudC5hYm9ydGVkKSB7XG4gICAgICAgICAgICAgIGNoaWxkLmJyb2FkY2FzdEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDIpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IHRoaXMpIHtcbiAgICAgICAgICBpZiAoIShldmVudC5jYW5jZWxlZCB8fCBldmVudC5hYm9ydGVkIHx8IGV2ZW50LmRvbmUgfHwgZXZlbnQucGhhc2UgPT09IDMpKSB7XG4gICAgICAgICAgICBpZiAoKHJlZjEgPSBldmVudC5jYWxsYmFjaykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICByZWYxLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudC5waGFzZSA9IDM7XG4gICAgICAgICAgZXZlbnQuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50ZWQ7XG5cbn0pKHJlcXVpcmUoJy4vbm9kZScpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBCYXNlOiByZXF1aXJlKCcuL2Jhc2UnKSxcbiAgRXZlbnQ6IHJlcXVpcmUoJy4vZXZlbnQnKSxcbiAgTm9kZTogcmVxdWlyZSgnLi9ub2RlJyksXG4gIEVsZW1lbnQ6IHJlcXVpcmUoJy4vZWxlbWVudCcpLFxuICBFdmVudGVkOiByZXF1aXJlKCcuL2V2ZW50ZWQnKSxcbiAgU3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcbiAgU2hhcGU6IHJlcXVpcmUoJy4vc2hhcGUnKSxcbiAgQ29tcG9uZW50OiByZXF1aXJlKCcuL2NvbXBvbmVudCcpLFxuICBQZW46IHJlcXVpcmUoJy4vcGVuJylcbn07XG4iLCJ2YXIgTm9kZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTm9kZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTm9kZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBOb2RlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBhcmdzLmNoaWxkcmVuIHx8IFtdO1xuICAgIHRoaXMucGFyZW50ID0gYXJncy5wYXJlbnQgfHwgbnVsbDtcbiAgfVxuXG4gIE5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgcGFyZW50O1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUgJiYgLTEgPT09IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkpIHtcbiAgICAgIGlmIChwYXJlbnQgPSBjaGlsZC5wYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIH1cbiAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIGlkeDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlICYmIC0xICE9PSAoaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSkpIHtcbiAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gTm9kZTtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIFBlbjtcblxubW9kdWxlLmV4cG9ydHMgPSBQZW4gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBlbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5kcmF3LmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgfVxuXG4gIFBlbi5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBQZW47XG5cbn0pKCk7XG4iLCJ2YXIgRXZlbnQsIFNoYXBlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFNoYXBlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTaGFwZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLm9yaWdpbiA9IGFyZ3Mub3JpZ2luIHx8IHRoaXMub3JpZ2luIHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLnNpemUgPSBhcmdzLnNpemUgfHwgdGhpcy5zaXplIHx8IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYXcnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5kcmF3TGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZUxpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gIH1cblxuICBTaGFwZS5wcm90b3R5cGUuZHJhd0xpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICBTaGFwZS5wcm90b3R5cGUudXBkYXRlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgIHR5cGU6ICdkcmF3JyxcbiAgICAgIHRhcmdldDogdGhpc1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGFwZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgdHlwZTogJ3VwZGF0ZScsXG4gICAgICB0YXJnZXQ6IHRoaXNcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2hhcGUucHJvdG90eXBlLnN0eWxlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBjbmwubGliLlN0eWxlKSB7XG4gICAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAgIHN0eWxlOiB2YWx1ZS5nZXQoKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gU2hhcGUuX19zdXBlcl9fLnN0eWxlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHJldHVybiBTaGFwZS5fX3N1cGVyX18uc3R5bGUuY2FsbCh0aGlzKTtcbiAgfTtcblxuICByZXR1cm4gU2hhcGU7XG5cbn0pKHJlcXVpcmUoJy4vZWxlbWVudCcpKTtcbiIsInZhciBTdHlsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBzbGljZSA9IFtdLnNsaWNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFN0eWxlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTdHlsZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBTdHlsZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYXJncy5tYXBwZXIpIHtcbiAgICAgIHRoaXMubWFwcGVyID0gYXJncy5tYXBwZXI7XG4gICAgfVxuICAgIHRoaXMuZGF0YSA9IGFyZ3MuZGF0YSB8fCB7fTtcbiAgfVxuXG4gIFN0eWxlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oanNvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoanNvbikge1xuICAgICAgdGhpcy5tYXBwZXIoanNvbiwgdGhpcy5kYXRhLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFN0eWxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSwga2V5LCBrZXlzLCBsZW4sIGxlbmd0aCwgcmVzdWx0O1xuICAgIGtleXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoIShsZW5ndGggPSBrZXlzLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuICAgIHJlc3VsdCA9IFtdO1xuICAgIGlmIChsZW5ndGggPT09IDEgJiYga2V5c1swXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBrZXlzID0ga2V5c1swXTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbGVuID0ga2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICh0aGlzLmRhdGFba2V5XSAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZGF0YVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID09PSAxID8gcmVzdWx0WzBdIDogcmVzdWx0KTtcbiAgfTtcblxuICBTdHlsZS5wcm90b3R5cGUubWFwcGVyID0gZnVuY3Rpb24oZGF0YSwgY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfTtcblxuICByZXR1cm4gU3R5bGU7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSZWN0YW5nbGU6IHJlcXVpcmUoJy4vcmVjdGFuZ2xlJyksXG4gIExpbmU6IHJlcXVpcmUoJy4vbGluZScpLFxuICBUZXh0OiByZXF1aXJlKCcuL3RleHQnKVxufTtcbiIsInZhciBMaW5lLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChMaW5lLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBMaW5lKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBhcmdzLnN0YXJ0IHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmVuZCA9IGFyZ3MuZW5kIHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHRoaXMuZmlsbCA9IGFyZ3MuZmlsbCwgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSwgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aDtcbiAgICByZXR1cm4gTGluZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIExpbmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGVuZCwgbGluZVdpZHRoLCBzdGFydCwgc3Ryb2tlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHN0YXJ0ID0gYXJncy5zdGFydCB8fCB0aGlzLnN0YXJ0IHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIGVuZCA9IGFyZ3MuZW5kIHx8IHRoaXMuZW5kIHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgbGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgICBpZiAobGluZVdpZHRoICUgMikge1xuICAgICAgICBzdGFydC54ICs9IDAuNTtcbiAgICAgICAgc3RhcnQueSArPSAwLjU7XG4gICAgICAgIGVuZC54ICs9IDAuNTtcbiAgICAgICAgZW5kLnkgKz0gMC41O1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgfVxuICAgICAgY29udGV4dC5tb3ZlVG8oc3RhcnQueCwgc3RhcnQueSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIExpbmUuX19zdXBlcl9fLmRyYXcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZXR1cm4gTGluZTtcblxufSkocmVxdWlyZSgnLi4vbGliL3BlbicpKTtcbiIsInZhciBSZWN0YW5nbGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWN0YW5nbGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoUmVjdGFuZ2xlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBSZWN0YW5nbGUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5zaXplID0gYXJncy5zaXplIHx8IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICB0aGlzLm9yaWdpbiA9IGFyZ3Mub3JpZ2luO1xuICAgIHRoaXMuZmlsbCA9IGFyZ3MuZmlsbCwgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSwgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aDtcbiAgICByZXR1cm4gUmVjdGFuZ2xlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgUmVjdGFuZ2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBmaWxsLCBsaW5lV2lkdGgsIG9yaWdpbiwgc2l6ZSwgc3Ryb2tlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIG9yaWdpbiA9IGFyZ3Mub3JpZ2luIHx8IHRoaXMub3JpZ2luIHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIHNpemUgPSBhcmdzLnNpemUgfHwgdGhpcy5zaXplIHx8IHtcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgfTtcbiAgICAgIGZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBsaW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICAgIGlmIChsaW5lV2lkdGggJSAyKSB7XG4gICAgICAgIG9yaWdpbi54ICs9IDAuNTtcbiAgICAgICAgb3JpZ2luLnkgKz0gMC41O1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICAgIG9yaWdpbi54ID0gb3JpZ2luLnkgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgfHwgc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCkge1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGw7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3Qob3JpZ2luLngsIG9yaWdpbi55LCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2U7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3Qob3JpZ2luLngsIG9yaWdpbi55LCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFJlY3RhbmdsZS5fX3N1cGVyX18uZHJhdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiBSZWN0YW5nbGU7XG5cbn0pKHJlcXVpcmUoJy4uL2xpYi9wZW4nKSk7XG4iLCJ2YXIgTGluZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTGluZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTGluZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLm9yaWdpbiA9IGFyZ3Mub3JpZ2luIHx8IHRoaXMub3JpZ2luIHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmZvbnQgPSBhcmdzLmZvbnQgfHwgdGhpcy5mb250O1xuICAgIHRoaXMuZmlsbCA9IGFyZ3MuZmlsbCB8fCB0aGlzLmZpbGw7XG4gICAgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSB8fCB0aGlzLnN0cm9rZTtcbiAgICB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoIHx8IHRoaXMubGluZVdpZHRoO1xuICAgIHRoaXMuYmFzZWxpbmUgPSBhcmdzLmJhc2VsaW5lIHx8IHRoaXMuYmFzZWxpbmU7XG4gICAgcmV0dXJuIExpbmUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBMaW5lLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBiYXNlbGluZSwgZmlsbCwgZm9udCwgb3JpZ2luLCBzdHJva2UsIHRleHQ7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoY29udGV4dCAmJiAodGV4dCA9IGFyZ3MudGV4dCkpIHtcbiAgICAgIG9yaWdpbiA9IGFyZ3Mub3JpZ2luIHx8IHRoaXMub3JpZ2luIHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIGZvbnQgPSBhcmdzLmZvbnQgfHwgdGhpcy5mb250O1xuICAgICAgZmlsbCA9IGFyZ3MuZmlsbCB8fCB0aGlzLmZpbGw7XG4gICAgICBzdHJva2UgPSBhcmdzLnN0cm9rZSB8fCB0aGlzLnN0cm9rZTtcbiAgICAgIGJhc2VsaW5lID0gYXJncy5iYXNlbGluZSB8fCB0aGlzLmJhc2VsaW5lIHx8ICd0b3AnO1xuICAgICAgaWYgKGZpbGwgfHwgc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuYmFzZWxpbmUgPSBiYXNlbGluZTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgICBvcmlnaW4ueCA9IG9yaWdpbi55ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCBvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZTtcbiAgICAgICAgY29udGV4dC5zdHJva2VUZXh0KHRleHQsIG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5kcmF3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmV0dXJuIExpbmU7XG5cbn0pKHJlcXVpcmUoJy4uL2xpYi9wZW4nKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgU2hhcGU6IHJlcXVpcmUoJy4vc2hhcGUnKVxufTtcbiIsInZhciBTaGFwZSwgXyxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5fID0gZnVuY3Rpb24obywgcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChTaGFwZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gU2hhcGUoKSB7XG4gICAgcmV0dXJuIFNoYXBlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgU2hhcGUucHJvdG90eXBlLm1hcHBlciA9IGZ1bmN0aW9uKGRhdGEsIGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGZpbGwsIGltYWdlLCByZWYsIHJlcGVhdCwgdXJsLCB3aWR0aDtcbiAgICBpZiAoKF8oZGF0YSwgJ3dpZHRoJykpIHx8IChfKGRhdGEsICdoZWlnaHQnKSkpIHtcbiAgICAgIGNvbnRleHQuc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IGRhdGEud2lkdGggfHwgMCxcbiAgICAgICAgaGVpZ2h0OiBkYXRhLmhlaWdodCB8fCAwXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoKF8oZGF0YSwgJ3RvcCcpKSB8fCAoXyhkYXRhLCAnbGVmdCcpKSkge1xuICAgICAgY29udGV4dC5vcmlnaW4gPSB7XG4gICAgICAgIHg6IGRhdGEueCB8fCAwLFxuICAgICAgICB5OiBkYXRhLnkgfHwgMFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2JhY2tncm91bmQnKSkge1xuICAgICAgY29udGV4dC5maWxsID0gZGF0YVsnYmFja2dyb3VuZCddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnZmlsbCcpKSB7XG4gICAgICBjb250ZXh0LmZpbGwgPSBkYXRhWydmaWxsJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdjb2xvcicpKSB7XG4gICAgICBjb250ZXh0LnN0cm9rZSA9IGRhdGFbJ2NvbG9yJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdzdHJva2UnKSkge1xuICAgICAgY29udGV4dC5zdHJva2UgPSBkYXRhWydzdHJva2UnXTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2xpbmUtd2lkdGgnKSkge1xuICAgICAgY29udGV4dC5saW5lIC0gKHdpZHRoID0gZGF0YVsnbGluZS13aWR0aCddKTtcbiAgICB9XG4gICAgaWYgKHVybCA9IChyZWYgPSBjb250ZXh0LmZpbGwpICE9IG51bGwgPyByZWYubWF0Y2goL3VybFxcKFxccyooW1wiJyddPylcXHMqKC4rKVxcMVxcKS8pIDogdm9pZCAwKSB7XG4gICAgICBpZiAocmVwZWF0ID0gY29udGV4dC5maWxsLm1hdGNoKC9ub3JlcGVhdHxyZXBlYXQteHxyZXBlYXQteS8pKSB7XG4gICAgICAgIHJlcGVhdCA9IHJlcGVhdFswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGVhdCA9IG51bGw7XG4gICAgICB9XG4gICAgICBmaWxsID0gbnVsbDtcbiAgICAgIChpbWFnZSA9IG5ldyBJbWFnZSkuc3JjID0gdXJsWzJdO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb250ZXh0LmZpbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLmNyZWF0ZVBhdHRlcm4oaW1hZ2UsIHJlcGVhdCB8fCAncmVwZWF0Jyk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICE9IG51bGwgPyBjYWxsYmFjay5jYWxsKF90aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgcmV0dXJuIGltYWdlLm9uZXJyb3IgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgIT0gbnVsbCA/IGNhbGxiYWNrLmNhbGwoX3RoaXMsIGUsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayAhPSBudWxsID8gY2FsbGJhY2suY2FsbCh0aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNoYXBlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvc3R5bGUnKSk7XG4iLCJ2YXIgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3Nlcykge1xuICB2YXIgTWl4aW5DbGFzcywgUGFyZW50Q2xhc3MsIGksIGtleSwgbGVuLCByZWYsIHZhbHVlO1xuICBpZiAoUGFyZW50Q2xhc3NlcyBpbnN0YW5jZW9mIEFycmF5ICYmIFBhcmVudENsYXNzZXMubGVuZ3RoKSB7XG4gICAgUGFyZW50Q2xhc3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgICAgZXh0ZW5kKFBhcmVudENsYXNzLCBzdXBlckNsYXNzKTtcblxuICAgICAgZnVuY3Rpb24gUGFyZW50Q2xhc3MoKSB7XG4gICAgICAgIHZhciBNaXhpbkNsYXNzLCBpLCBsZW47XG4gICAgICAgIFBhcmVudENsYXNzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBQYXJlbnRDbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICAgICAgTWl4aW5DbGFzcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQYXJlbnRDbGFzcztcblxuICAgIH0pKFBhcmVudENsYXNzZXMuc2hpZnQoKSk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICByZWYgPSBNaXhpbkNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICBpZiAoa2V5ICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgUGFyZW50Q2xhc3MucHJvdG90eXBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBQYXJlbnRDbGFzcyA9IFBhcmVudENsYXNzZXM7XG4gIH1cbiAgcmV0dXJuIGV4dGVuZChDaGlsZENsYXNzLCBQYXJlbnRDbGFzcyk7XG59O1xuIl19
