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
  function Base() {
    Object.defineProperty(this, '___runtime', {
      enumerable: false,
      writable: false,
      configurable: false,
      value: {}
    });
  }

  return Base;

})();

},{}],4:[function(require,module,exports){
var Component, Event,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

module.exports = Component = (function(superClass) {
  extend(Component, superClass);

  function Component(args) {
    var fn, i, j, len, len1, name, ref, ref1;
    if (args == null) {
      args = {};
    }
    Component.__super__.constructor.apply(this, arguments);
    ref = ['grab', 'release', 'drag'];
    fn = (function(_this) {
      return function(name) {
        _this.addListener(name, (function(e) {
          var ref1;
          if (!((ref1 = this.events) != null ? ref1[name] : void 0)) {
            return e.stop();
          }
        }), true);
        return _this.addListener(name, (function(e) {
          var ref1;
          if (!((ref1 = this.events) != null ? ref1[name] : void 0)) {
            return e.stop();
          }
        }), false);
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      fn(name);
    }
    ref1 = ['grab', 'release', 'drag'];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      name = ref1[j];
      this.addListener(name, this[name + "CaptureListener"], true);
    }
  }

  Component.prototype.mousemoveListener = function(event) {
    var $, i, len, name, ref, ref1, ref2, ref3, ref4, zones;
    Component.__super__.mousemoveListener.apply(this, arguments);
    $ = this.___runtime;
    if ($.grab) {
      this.state = 'active';
      this.broadcastEvent($.dragEvent = new Event({
        type: 'drag'
      }, {
        x: event.x,
        y: event.y,
        target: this,
        offsetX: event.x - (((ref = $.dragEvent) != null ? ref.x : void 0) || ((ref1 = $.grabEvent) != null ? ref1.x : void 0) || 0),
        offsetY: event.y - (((ref2 = $.dragEvent) != null ? ref2.y : void 0) || ((ref3 = $.grabEvent) != null ? ref3.y : void 0) || 0)
      }));
    } else {
      this.state = null;
      if (zones = this.zones) {
        ref4 = ['hover', 'normal'];
        for (i = 0, len = ref4.length; i < len; i++) {
          name = ref4[i];
          if (!zones[name]) {
            continue;
          }
          this.state = name;
          break;
        }
      }
    }
    return this;
  };

  Component.prototype.mousedownListener = function(event) {
    var $;
    Component.__super__.mousedownListener.apply(this, arguments);
    ($ = this.___runtime).grab = true;
    if (this.state === 'active') {
      this.broadcastEvent($.grabEvent = new Event({
        type: 'grab'
      }, {
        x: event.x,
        y: event.y,
        target: this
      }));
    }
    return this;
  };

  Component.prototype.mouseupListener = function(event) {
    var $;
    Component.__super__.mouseupListener.apply(this, arguments);
    ($ = this.___runtime).grab = false;
    this.broadcastEvent($.grabEvent = new Event({
      type: 'release'
    }, {
      x: event.x,
      y: event.y,
      target: this
    }));
    return this;
  };

  Component.prototype.dragCaptureListener = function(event) {
    this.___runtime.dragEvent = event;
    localizeEventCoordinates(event, this.origin);
    return this;
  };

  Component.prototype.grabCaptureListener = function(event) {
    this.___runtime.grabEvent = event;
    localizeEventCoordinates(event, this.origin);
    return this;
  };

  Component.prototype.releaseCaptureListener = function(event) {
    this.___runtime.releaseEvent = event;
    localizeEventCoordinates(event, this.origin);
    return this;
  };

  Component.prototype.dragListener = function() {
    return this;
  };

  Component.prototype.grabListener = function() {
    return this;
  };

  Component.prototype.releaseListener = function() {
    return this;
  };

  return Component;

})(require('./shape'));

},{"./event":6,"./shape":11,"extends__":19}],5:[function(require,module,exports){
var Element, Event, localizeEventCoordinates,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

localizeEventCoordinates = function(event, origin) {
  event.localX = (event.localX != null ? event.localX : event.x) - ((origin != null ? origin.x : void 0) || 0);
  return event.localY = (event.localY != null ? event.localY : event.y) - ((origin != null ? origin.y : void 0) || 0);
};

module.exports = Element = (function(superClass) {
  extend(Element, superClass);

  function Element(args) {
    var fn, i, j, k, key, len, len1, len2, name, ref, ref1, ref2, ref3, ref4, value;
    if (args == null) {
      args = {};
    }
    Element.__super__.constructor.apply(this, arguments);
    ref = ['origin', 'size', 'state', 'style'];
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      if (args[key]) {
        this[key] = args[key];
      }
    }
    ref1 = args.styles;
    for (key in ref1) {
      value = ref1[key];
      (this.styles || (this.styles = {})) && (this.styles[key] = value);
    }
    ref2 = args.states;
    for (key in ref2) {
      value = ref2[key];
      (this.states || (this.states = {})) && (this.states[key] = value);
    }
    ref3 = ['mousemove', 'mousedown', 'mouseup', 'update', 'render'];
    fn = (function(_this) {
      return function(name) {
        _this.addListener(name, (function(e) {
          var ref4;
          if (!((ref4 = this.events) != null ? ref4[name] : void 0)) {
            return e.stop();
          }
        }), true);
        return _this.addListener(name, (function(e) {
          var ref4;
          if (!((ref4 = this.events) != null ? ref4[name] : void 0)) {
            return e.stop();
          }
        }), false);
      };
    })(this);
    for (j = 0, len1 = ref3.length; j < len1; j++) {
      name = ref3[j];
      fn(name);
    }
    ref4 = ['mousemove', 'mousedown', 'mouseup'];
    for (k = 0, len2 = ref4.length; k < len2; k++) {
      name = ref4[k];
      this.addListener(name, this[name + "CaptureListener"], true);
      this.addListener(name, this[name + "Listener"], false);
    }
  }

  Element.prototype.mousemoveCaptureListener = function(event) {
    this.___runtime.mousemoveEvent = event;
    localizeEventCoordinates(event, this.origin);
    return this;
  };

  Element.prototype.mousedownCaptureListener = function(event) {
    this.___runtime.mousedownEvent = event;
    localizeEventCoordinates(event, this.origin);
    return this;
  };

  Element.prototype.mouseupCaptureListener = function(event) {
    this.___runtime.mouseupEvent = event;
    localizeEventCoordinates(event, this.origin);
    return this;
  };

  Element.prototype.mousedownListener = function() {
    return this;
  };

  Element.prototype.mouseupListener = function() {
    return this;
  };

  Element.prototype.mousemoveListener = function() {
    return this;
  };

  Element.prototype.update = function(args) {
    var ref;
    if ((ref = this.events) != null ? ref.update : void 0) {
      this.broadcastEvent(new Event({
        type: 'update',
        target: this,
        args: args
      }));
    }
    return this;
  };

  Element.prototype.render = function(context) {
    var child, children, i, len, ref;
    if ((ref = this.events) != null ? ref.render : void 0) {
      this.broadcastEvent(new Event({
        type: 'render',
        target: this,
        context: context,
        args: args
      }));
    }
    if (children = this.children) {
      for (i = 0, len = children.length; i < len; i++) {
        child = children[i];
        child.render(context);
      }
    }
    return this;
  };

  return Element;

})(require('./evented'));

},{"./event":6,"./evented":7,"extends__":19}],6:[function(require,module,exports){
var Event,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Event = (function(superClass) {
  extend(Event, superClass);

  function Event(args, callback) {
    var date, key, perf, value;
    if (args == null) {
      args = {};
    }
    if (typeof args === 'string') {
      args = {
        type: args
      };
    } else {
      if ((arguments.length < 2) && typeof args === 'function') {
        callback = args;
        args = {};
      }
    }
    for (key in args) {
      value = args[key];
      this[key] = value;
    }
    if (callback && !this.callback) {
      this.callback = callback;
    }
    if (!args.hasOwnProperty('timestamp')) {
      date = Date.now();
      perf = (typeof performance !== "undefined" && performance !== null ? performance.now() : void 0) || 0;
      this.timestamp = 1000 * date + Math.floor(1000 * (perf - Math.floor(perf)));
    }
  }

  Event.prototype.start = function() {
    return (this.started = true) && this;
  };

  Event.prototype.stop = function() {
    return (this.stopped = true) && this;
  };

  Event.prototype.cancel = function() {
    return (this.canceled = true) && this;
  };

  Event.prototype.abort = function() {
    return (this.aborted = true) && this;
  };

  Event.prototype.finish = function() {
    return (this.done = true) && this;
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

  function Evented(args) {
    var key, ref, value;
    Evented.__super__.constructor.apply(this, arguments);
    ref = args != null ? args.events : void 0;
    for (key in ref) {
      value = ref[key];
      (this.events || (this.events = {})) && (this.events[key] = value);
    }
    this.listeners = [{}, {}];
  }

  Evented.prototype.addListener = function(type, listener, capture) {
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

  Evented.prototype.removeListener = function(type, listener, capture) {
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
    if ((type = event != null ? event.type : void 0) && !event.aborted) {
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
    if (type = event != null ? event.type : void 0) {
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
          if (this.children) {
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
        }
        if (event.target === this) {
          event.phase = 2;
        }
        if (event.phase === 2) {
          this.dispatchEvent(event);
        }
        if (event.source === this) {
          if (!(event.canceled || event.aborted || event.done || event.phase === 3)) {
            if ((ref1 = event.callback) != null) {
              if (typeof ref1.call === "function") {
                ref1.call(this, event);
              }
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
    args.children && (this.children = args.children);
    args.parent && (this.parent = args.parent);
  }

  Node.prototype.appendChild = function(child) {
    var ref;
    if (child instanceof Node && (this.children || (this.children = []))) {
      if (-1 === this.children.indexOf(child)) {
        if ((ref = child.parent) != null) {
          if (typeof ref.removeChild === "function") {
            ref.removeChild(child);
          }
        }
        child.parent = this;
        this.children.push(child);
      }
    }
    return this;
  };

  Node.prototype.removeChild = function(child) {
    var idx;
    if (child instanceof Node && this.children) {
      if (-1 !== (idx = this.children.indexOf(child))) {
        delete child.parent;
        this.children.splice(idx, 1);
      }
      if (this.children.length === 0) {
        delete this.children;
      }
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
        var ref;
        return (ref = _this.draw) != null ? ref.apply(_this, arguments) : void 0;
      };
    })(this);
  }

  return Pen;

})();

},{}],11:[function(require,module,exports){
var Event, Shape, findPointZones,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

findPointZones = function(x, y, zones) {
  var $, name, result;
  result = {};
  for (name in zones) {
    $ = zones[name];
    if (($[0] <= x && x <= ($[0] + $[2])) && ($[1] <= y && y <= ($[1] + $[3]))) {
      result[name] = $;
    }
  }
  return result;
};

module.exports = Shape = (function(superClass) {
  extend(Shape, superClass);

  function Shape(args) {
    var fn, i, key, len, name, ref, ref1, value;
    if (args == null) {
      args = {};
    }
    Shape.__super__.constructor.apply(this, arguments);
    ref = args.zones;
    for (key in ref) {
      value = ref[key];
      (this.zones || (this.zones = {})) && (this.zones[key] = value);
    }
    ref1 = ['draw'];
    fn = (function(_this) {
      return function(name) {
        _this.addListener(name, (function(e) {
          var ref2;
          if (!((ref2 = this.events) != null ? ref2[name] : void 0)) {
            return e.stop();
          }
        }), true);
        return _this.addListener(name, (function(e) {
          var ref2;
          if (!((ref2 = this.events) != null ? ref2[name] : void 0)) {
            return e.stop();
          }
        }), false);
      };
    })(this);
    for (i = 0, len = ref1.length; i < len; i++) {
      name = ref1[i];
      fn(name);
    }
  }

  Shape.prototype.mousemoveCaptureListener = function(event) {
    var i, len, name, ref, state, zones;
    Shape.__super__.mousemoveCaptureListener.apply(this, arguments);
    if (zones = findPointZones(event.localX, event.localY, this.zones)) {
      event.zones = zones;
      ref = ['active', 'hover', 'normal'];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        if (!zones[name]) {
          continue;
        }
        state = name;
        break;
      }
      if ((this.state = state || null)) {
        event.target = this;
      }
    }
    return this;
  };

  Shape.prototype.mousedownCaptureListener = function(event) {
    var i, len, name, ref, state, zones;
    Shape.__super__.mousedownCaptureListener.apply(this, arguments);
    if (zones = findPointZones(event.localX, event.localY, this.zones)) {
      event.zones = zones;
      ref = ['active', 'hover', 'normal'];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        if (!zones[name]) {
          continue;
        }
        state = name;
        break;
      }
      if ((this.state = state || null)) {
        event.target = this;
      }
    }
    return this;
  };

  Shape.prototype.mouseupCaptureListener = function(event) {
    var i, len, name, ref, state, zones;
    Shape.__super__.mouseupCaptureListener.apply(this, arguments);
    if (zones = findPointZones(event.localX, event.localY, this.zones)) {
      event.zones = zones;
      ref = ['active', 'hover', 'normal'];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        if (!zones[name]) {
          continue;
        }
        state = name;
        break;
      }
      if ((this.state = state || null)) {
        event.target = this;
      }
    }
    return this;
  };

  Shape.prototype.draw = function(context, args) {
    var ref;
    if ((ref = this.events) != null ? ref.draw : void 0) {
      this.broadcastEvent(new Event({
        type: 'draw',
        target: this,
        context: context,
        args: args
      }));
    }
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
        return context.stroke();
      }
    }
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
        return context.restore();
      }
    }
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
      if (font) {
        context.font = font;
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
        return context.strokeText(text, origin.x, origin.y);
      }
    }
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9pbmRleC5qcyIsImJ1aWxkL2xpYi9iYXNlLmpzIiwiYnVpbGQvbGliL2NvbXBvbmVudC5qcyIsImJ1aWxkL2xpYi9lbGVtZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50ZWQuanMiLCJidWlsZC9saWIvaW5kZXguanMiLCJidWlsZC9saWIvbm9kZS5qcyIsImJ1aWxkL2xpYi9wZW4uanMiLCJidWlsZC9saWIvc2hhcGUuanMiLCJidWlsZC9saWIvc3R5bGUuanMiLCJidWlsZC9wZW4vaW5kZXguanMiLCJidWlsZC9wZW4vbGluZS5qcyIsImJ1aWxkL3Blbi9yZWN0YW5nbGUuanMiLCJidWlsZC9wZW4vdGV4dC5qcyIsImJ1aWxkL3N0eWxlL2luZGV4LmpzIiwiYnVpbGQvc3R5bGUvc2hhcGUuanMiLCJub2RlX21vZHVsZXMvZXh0ZW5kc19fL2Rpc3QvZXh0ZW5kc19fLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5jbmwgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGliOiByZXF1aXJlKCcuL2xpYi9pbmRleCcpLFxuICBwZW46IHJlcXVpcmUoJy4vcGVuL2luZGV4JyksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlL2luZGV4Jylcbn07XG4iLCJ2YXIgQmFzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX19fcnVudGltZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB7fVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKCk7XG4iLCJ2YXIgQ29tcG9uZW50LCBFdmVudCxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQ29tcG9uZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDb21wb25lbnQoYXJncykge1xuICAgIHZhciBmbiwgaSwgaiwgbGVuLCBsZW4xLCBuYW1lLCByZWYsIHJlZjE7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBDb21wb25lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmVmID0gWydncmFiJywgJ3JlbGVhc2UnLCAnZHJhZyddO1xuICAgIGZuID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWYxO1xuICAgICAgICAgIGlmICghKChyZWYxID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYxW25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIHRydWUpO1xuICAgICAgICByZXR1cm4gX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmMTtcbiAgICAgICAgICBpZiAoISgocmVmMSA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmMVtuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCBmYWxzZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbmFtZSA9IHJlZltpXTtcbiAgICAgIGZuKG5hbWUpO1xuICAgIH1cbiAgICByZWYxID0gWydncmFiJywgJ3JlbGVhc2UnLCAnZHJhZyddO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYxLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbmFtZSA9IHJlZjFbal07XG4gICAgICB0aGlzLmFkZExpc3RlbmVyKG5hbWUsIHRoaXNbbmFtZSArIFwiQ2FwdHVyZUxpc3RlbmVyXCJdLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgJCwgaSwgbGVuLCBuYW1lLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHpvbmVzO1xuICAgIENvbXBvbmVudC5fX3N1cGVyX18ubW91c2Vtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAkID0gdGhpcy5fX19ydW50aW1lO1xuICAgIGlmICgkLmdyYWIpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSAnYWN0aXZlJztcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQoJC5kcmFnRXZlbnQgPSBuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZHJhZydcbiAgICAgIH0sIHtcbiAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgeTogZXZlbnQueSxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICBvZmZzZXRYOiBldmVudC54IC0gKCgocmVmID0gJC5kcmFnRXZlbnQpICE9IG51bGwgPyByZWYueCA6IHZvaWQgMCkgfHwgKChyZWYxID0gJC5ncmFiRXZlbnQpICE9IG51bGwgPyByZWYxLnggOiB2b2lkIDApIHx8IDApLFxuICAgICAgICBvZmZzZXRZOiBldmVudC55IC0gKCgocmVmMiA9ICQuZHJhZ0V2ZW50KSAhPSBudWxsID8gcmVmMi55IDogdm9pZCAwKSB8fCAoKHJlZjMgPSAkLmdyYWJFdmVudCkgIT0gbnVsbCA/IHJlZjMueSA6IHZvaWQgMCkgfHwgMClcbiAgICAgIH0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG4gICAgICBpZiAoem9uZXMgPSB0aGlzLnpvbmVzKSB7XG4gICAgICAgIHJlZjQgPSBbJ2hvdmVyJywgJ25vcm1hbCddO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWY0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgbmFtZSA9IHJlZjRbaV07XG4gICAgICAgICAgaWYgKCF6b25lc1tuYW1lXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3RhdGUgPSBuYW1lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vkb3duTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciAkO1xuICAgIENvbXBvbmVudC5fX3N1cGVyX18ubW91c2Vkb3duTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAoJCA9IHRoaXMuX19fcnVudGltZSkuZ3JhYiA9IHRydWU7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdhY3RpdmUnKSB7XG4gICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KCQuZ3JhYkV2ZW50ID0gbmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ2dyYWInXG4gICAgICB9LCB7XG4gICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgIHk6IGV2ZW50LnksXG4gICAgICAgIHRhcmdldDogdGhpc1xuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNldXBMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyICQ7XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5tb3VzZXVwTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAoJCA9IHRoaXMuX19fcnVudGltZSkuZ3JhYiA9IGZhbHNlO1xuICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQoJC5ncmFiRXZlbnQgPSBuZXcgRXZlbnQoe1xuICAgICAgdHlwZTogJ3JlbGVhc2UnXG4gICAgfSwge1xuICAgICAgeDogZXZlbnQueCxcbiAgICAgIHk6IGV2ZW50LnksXG4gICAgICB0YXJnZXQ6IHRoaXNcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5kcmFnQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUuZHJhZ0V2ZW50ID0gZXZlbnQ7XG4gICAgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50LCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5ncmFiQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUuZ3JhYkV2ZW50ID0gZXZlbnQ7XG4gICAgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50LCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5yZWxlYXNlQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUucmVsZWFzZUV2ZW50ID0gZXZlbnQ7XG4gICAgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50LCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5kcmFnTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLmdyYWJMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUucmVsZWFzZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIENvbXBvbmVudDtcblxufSkocmVxdWlyZSgnLi9zaGFwZScpKTtcbiIsInZhciBFbGVtZW50LCBFdmVudCwgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5sb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbihldmVudCwgb3JpZ2luKSB7XG4gIGV2ZW50LmxvY2FsWCA9IChldmVudC5sb2NhbFggIT0gbnVsbCA/IGV2ZW50LmxvY2FsWCA6IGV2ZW50LngpIC0gKChvcmlnaW4gIT0gbnVsbCA/IG9yaWdpbi54IDogdm9pZCAwKSB8fCAwKTtcbiAgcmV0dXJuIGV2ZW50LmxvY2FsWSA9IChldmVudC5sb2NhbFkgIT0gbnVsbCA/IGV2ZW50LmxvY2FsWSA6IGV2ZW50LnkpIC0gKChvcmlnaW4gIT0gbnVsbCA/IG9yaWdpbi55IDogdm9pZCAwKSB8fCAwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFbGVtZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbGVtZW50KGFyZ3MpIHtcbiAgICB2YXIgZm4sIGksIGosIGssIGtleSwgbGVuLCBsZW4xLCBsZW4yLCBuYW1lLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHZhbHVlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgRWxlbWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZWYgPSBbJ29yaWdpbicsICdzaXplJywgJ3N0YXRlJywgJ3N0eWxlJ107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSByZWZbaV07XG4gICAgICBpZiAoYXJnc1trZXldKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IGFyZ3Nba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVmMSA9IGFyZ3Muc3R5bGVzO1xuICAgIGZvciAoa2V5IGluIHJlZjEpIHtcbiAgICAgIHZhbHVlID0gcmVmMVtrZXldO1xuICAgICAgKHRoaXMuc3R5bGVzIHx8ICh0aGlzLnN0eWxlcyA9IHt9KSkgJiYgKHRoaXMuc3R5bGVzW2tleV0gPSB2YWx1ZSk7XG4gICAgfVxuICAgIHJlZjIgPSBhcmdzLnN0YXRlcztcbiAgICBmb3IgKGtleSBpbiByZWYyKSB7XG4gICAgICB2YWx1ZSA9IHJlZjJba2V5XTtcbiAgICAgICh0aGlzLnN0YXRlcyB8fCAodGhpcy5zdGF0ZXMgPSB7fSkpICYmICh0aGlzLnN0YXRlc1trZXldID0gdmFsdWUpO1xuICAgIH1cbiAgICByZWYzID0gWydtb3VzZW1vdmUnLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAndXBkYXRlJywgJ3JlbmRlciddO1xuICAgIGZuID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWY0O1xuICAgICAgICAgIGlmICghKChyZWY0ID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWY0W25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIHRydWUpO1xuICAgICAgICByZXR1cm4gX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmNDtcbiAgICAgICAgICBpZiAoISgocmVmNCA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmNFtuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCBmYWxzZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbmFtZSA9IHJlZjNbal07XG4gICAgICBmbihuYW1lKTtcbiAgICB9XG4gICAgcmVmNCA9IFsnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJ107XG4gICAgZm9yIChrID0gMCwgbGVuMiA9IHJlZjQubGVuZ3RoOyBrIDwgbGVuMjsgaysrKSB7XG4gICAgICBuYW1lID0gcmVmNFtrXTtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIobmFtZSwgdGhpc1tuYW1lICsgXCJDYXB0dXJlTGlzdGVuZXJcIl0sIHRydWUpO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCB0aGlzW25hbWUgKyBcIkxpc3RlbmVyXCJdLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2Vtb3ZlQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUubW91c2Vtb3ZlRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZWRvd25DYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5tb3VzZWRvd25FdmVudCA9IGV2ZW50O1xuICAgIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyhldmVudCwgdGhpcy5vcmlnaW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5tb3VzZXVwRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNldXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oYXJncykge1xuICAgIHZhciByZWY7XG4gICAgaWYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi51cGRhdGUgOiB2b2lkIDApIHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ3VwZGF0ZScsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgYXJnczogYXJnc1xuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgdmFyIGNoaWxkLCBjaGlsZHJlbiwgaSwgbGVuLCByZWY7XG4gICAgaWYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi5yZW5kZXIgOiB2b2lkIDApIHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ3JlbmRlcicsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgYXJnczogYXJnc1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBjaGlsZC5yZW5kZXIoY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFbGVtZW50O1xuXG59KShyZXF1aXJlKCcuL2V2ZW50ZWQnKSk7XG4iLCJ2YXIgRXZlbnQsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFdmVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnQoYXJncywgY2FsbGJhY2spIHtcbiAgICB2YXIgZGF0ZSwga2V5LCBwZXJmLCB2YWx1ZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZ3MgPSB7XG4gICAgICAgIHR5cGU6IGFyZ3NcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpICYmIHR5cGVvZiBhcmdzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gYXJncztcbiAgICAgICAgYXJncyA9IHt9O1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBhcmdzKSB7XG4gICAgICB2YWx1ZSA9IGFyZ3Nba2V5XTtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgJiYgIXRoaXMuY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgaWYgKCFhcmdzLmhhc093blByb3BlcnR5KCd0aW1lc3RhbXAnKSkge1xuICAgICAgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgICBwZXJmID0gKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCA/IHBlcmZvcm1hbmNlLm5vdygpIDogdm9pZCAwKSB8fCAwO1xuICAgICAgdGhpcy50aW1lc3RhbXAgPSAxMDAwICogZGF0ZSArIE1hdGguZmxvb3IoMTAwMCAqIChwZXJmIC0gTWF0aC5mbG9vcihwZXJmKSkpO1xuICAgIH1cbiAgfVxuXG4gIEV2ZW50LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5zdGFydGVkID0gdHJ1ZSkgJiYgdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5zdG9wcGVkID0gdHJ1ZSkgJiYgdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLmNhbmNlbGVkID0gdHJ1ZSkgJiYgdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuYWJvcnRlZCA9IHRydWUpICYmIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5kb25lID0gdHJ1ZSkgJiYgdGhpcztcbiAgfTtcblxuICByZXR1cm4gRXZlbnQ7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsInZhciBFdmVudCwgRXZlbnRlZCxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudGVkID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEV2ZW50ZWQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEV2ZW50ZWQoYXJncykge1xuICAgIHZhciBrZXksIHJlZiwgdmFsdWU7XG4gICAgRXZlbnRlZC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZWYgPSBhcmdzICE9IG51bGwgPyBhcmdzLmV2ZW50cyA6IHZvaWQgMDtcbiAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgIHZhbHVlID0gcmVmW2tleV07XG4gICAgICAodGhpcy5ldmVudHMgfHwgKHRoaXMuZXZlbnRzID0ge30pKSAmJiAodGhpcy5ldmVudHNba2V5XSA9IHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbe30sIHt9XTtcbiAgfVxuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgYmFzZSwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxpc3RlbmVycyA9ICgoYmFzZSA9IHRoaXMubGlzdGVuZXJzW2NhcHR1cmUgPT09IHRydWUgPyAxIDogMF0pW3R5cGVdIHx8IChiYXNlW3R5cGVdID0gW10pKTtcbiAgICAgIGlmICgtMSA9PT0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpKSB7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgIHZhciBpZHgsIGxpc3RlbmVycywgcmVmO1xuICAgIGlmIChjYXB0dXJlID09IG51bGwpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHJlZiA9IHR5cGUsIHR5cGUgPSByZWYudHlwZSwgbGlzdGVuZXIgPSByZWYubGlzdGVuZXIsIGNhcHR1cmUgPSByZWYuY2FwdHVyZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgJiYgdHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAobGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbY2FwdHVyZSA9PT0gdHJ1ZSA/IDEgOiAwXVt0eXBlXSkge1xuICAgICAgICBpZiAoLTEgIT09IChpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikpKSB7XG4gICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpLCBsZW4sIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIHBoYXNlLCB0eXBlO1xuICAgIGlmICgodHlwZSA9IGV2ZW50ICE9IG51bGwgPyBldmVudC50eXBlIDogdm9pZCAwKSAmJiAhZXZlbnQuYWJvcnRlZCkge1xuICAgICAgcGhhc2UgPSBldmVudC5waGFzZTtcbiAgICAgIGlmIChwaGFzZSA+IDAgJiYgcGhhc2UgPCAzICYmIChsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1syIC0gcGhhc2VdW3R5cGVdKSkge1xuICAgICAgICBldmVudC5zdGFydCgpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgICAgICBpZiAoZXZlbnQuc3RvcHBlZCB8fCBldmVudC5hYm9ydGVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudCwgdGFyZ2V0KSB7XG4gICAgdmFyIGNoaWxkLCBpLCBsZW4sIHBoYXNlLCByZWYsIHJlZjEsIHR5cGU7XG4gICAgaWYgKHR5cGUgPSBldmVudCAhPSBudWxsID8gZXZlbnQudHlwZSA6IHZvaWQgMCkge1xuICAgICAgaWYgKCEoZXZlbnQuYWJvcnRlZCB8fCBldmVudC5kb25lIHx8IGV2ZW50LnBoYXNlID09PSAzKSkge1xuICAgICAgICBldmVudC5zdGFydCgpO1xuICAgICAgICBldmVudC5zb3VyY2UgfHwgKGV2ZW50LnNvdXJjZSA9IHRoaXMpO1xuICAgICAgICBldmVudC50YXJnZXQgfHwgKGV2ZW50LnRhcmdldCA9IHRhcmdldCk7XG4gICAgICAgIHBoYXNlID0gKGV2ZW50LnBoYXNlIHx8IChldmVudC5waGFzZSA9IDEpKTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZWYgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDEgJiYgIWV2ZW50LmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5icm9hZGNhc3RFdmVudChldmVudCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDIpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IHRoaXMpIHtcbiAgICAgICAgICBpZiAoIShldmVudC5jYW5jZWxlZCB8fCBldmVudC5hYm9ydGVkIHx8IGV2ZW50LmRvbmUgfHwgZXZlbnQucGhhc2UgPT09IDMpKSB7XG4gICAgICAgICAgICBpZiAoKHJlZjEgPSBldmVudC5jYWxsYmFjaykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlZjEuY2FsbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVmMS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudC5waGFzZSA9IDM7XG4gICAgICAgICAgZXZlbnQuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50ZWQ7XG5cbn0pKHJlcXVpcmUoJy4vbm9kZScpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBCYXNlOiByZXF1aXJlKCcuL2Jhc2UnKSxcbiAgRXZlbnQ6IHJlcXVpcmUoJy4vZXZlbnQnKSxcbiAgTm9kZTogcmVxdWlyZSgnLi9ub2RlJyksXG4gIEVsZW1lbnQ6IHJlcXVpcmUoJy4vZWxlbWVudCcpLFxuICBFdmVudGVkOiByZXF1aXJlKCcuL2V2ZW50ZWQnKSxcbiAgU3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcbiAgU2hhcGU6IHJlcXVpcmUoJy4vc2hhcGUnKSxcbiAgQ29tcG9uZW50OiByZXF1aXJlKCcuL2NvbXBvbmVudCcpLFxuICBQZW46IHJlcXVpcmUoJy4vcGVuJylcbn07XG4iLCJ2YXIgTm9kZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTm9kZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTm9kZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBOb2RlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGFyZ3MuY2hpbGRyZW4gJiYgKHRoaXMuY2hpbGRyZW4gPSBhcmdzLmNoaWxkcmVuKTtcbiAgICBhcmdzLnBhcmVudCAmJiAodGhpcy5wYXJlbnQgPSBhcmdzLnBhcmVudCk7XG4gIH1cblxuICBOb2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHJlZjtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlICYmICh0aGlzLmNoaWxkcmVuIHx8ICh0aGlzLmNoaWxkcmVuID0gW10pKSkge1xuICAgICAgaWYgKC0xID09PSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSB7XG4gICAgICAgIGlmICgocmVmID0gY2hpbGQucGFyZW50KSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZWYucmVtb3ZlQ2hpbGQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmVmLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciBpZHg7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSAmJiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoLTEgIT09IChpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSkge1xuICAgICAgICBkZWxldGUgY2hpbGQucGFyZW50O1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNoaWxkcmVuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gTm9kZTtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIFBlbjtcblxubW9kdWxlLmV4cG9ydHMgPSBQZW4gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBlbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHJldHVybiAocmVmID0gX3RoaXMuZHJhdykgIT0gbnVsbCA/IHJlZi5hcHBseShfdGhpcywgYXJndW1lbnRzKSA6IHZvaWQgMDtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gIH1cblxuICByZXR1cm4gUGVuO1xuXG59KSgpO1xuIiwidmFyIEV2ZW50LCBTaGFwZSwgZmluZFBvaW50Wm9uZXMsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbmZpbmRQb2ludFpvbmVzID0gZnVuY3Rpb24oeCwgeSwgem9uZXMpIHtcbiAgdmFyICQsIG5hbWUsIHJlc3VsdDtcbiAgcmVzdWx0ID0ge307XG4gIGZvciAobmFtZSBpbiB6b25lcykge1xuICAgICQgPSB6b25lc1tuYW1lXTtcbiAgICBpZiAoKCRbMF0gPD0geCAmJiB4IDw9ICgkWzBdICsgJFsyXSkpICYmICgkWzFdIDw9IHkgJiYgeSA8PSAoJFsxXSArICRbM10pKSkge1xuICAgICAgcmVzdWx0W25hbWVdID0gJDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU2hhcGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFNoYXBlKGFyZ3MpIHtcbiAgICB2YXIgZm4sIGksIGtleSwgbGVuLCBuYW1lLCByZWYsIHJlZjEsIHZhbHVlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgU2hhcGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmVmID0gYXJncy56b25lcztcbiAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgIHZhbHVlID0gcmVmW2tleV07XG4gICAgICAodGhpcy56b25lcyB8fCAodGhpcy56b25lcyA9IHt9KSkgJiYgKHRoaXMuem9uZXNba2V5XSA9IHZhbHVlKTtcbiAgICB9XG4gICAgcmVmMSA9IFsnZHJhdyddO1xuICAgIGZuID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWYyO1xuICAgICAgICAgIGlmICghKChyZWYyID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYyW25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIHRydWUpO1xuICAgICAgICByZXR1cm4gX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmMjtcbiAgICAgICAgICBpZiAoISgocmVmMiA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmMltuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCBmYWxzZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZjEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG5hbWUgPSByZWYxW2ldO1xuICAgICAgZm4obmFtZSk7XG4gICAgfVxuICB9XG5cbiAgU2hhcGUucHJvdG90eXBlLm1vdXNlbW92ZUNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbmFtZSwgcmVmLCBzdGF0ZSwgem9uZXM7XG4gICAgU2hhcGUuX19zdXBlcl9fLm1vdXNlbW92ZUNhcHR1cmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh6b25lcyA9IGZpbmRQb2ludFpvbmVzKGV2ZW50LmxvY2FsWCwgZXZlbnQubG9jYWxZLCB0aGlzLnpvbmVzKSkge1xuICAgICAgZXZlbnQuem9uZXMgPSB6b25lcztcbiAgICAgIHJlZiA9IFsnYWN0aXZlJywgJ2hvdmVyJywgJ25vcm1hbCddO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSByZWZbaV07XG4gICAgICAgIGlmICghem9uZXNbbmFtZV0pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IG5hbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLnN0YXRlID0gc3RhdGUgfHwgbnVsbCkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2hhcGUucHJvdG90eXBlLm1vdXNlZG93bkNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbmFtZSwgcmVmLCBzdGF0ZSwgem9uZXM7XG4gICAgU2hhcGUuX19zdXBlcl9fLm1vdXNlZG93bkNhcHR1cmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh6b25lcyA9IGZpbmRQb2ludFpvbmVzKGV2ZW50LmxvY2FsWCwgZXZlbnQubG9jYWxZLCB0aGlzLnpvbmVzKSkge1xuICAgICAgZXZlbnQuem9uZXMgPSB6b25lcztcbiAgICAgIHJlZiA9IFsnYWN0aXZlJywgJ2hvdmVyJywgJ25vcm1hbCddO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSByZWZbaV07XG4gICAgICAgIGlmICghem9uZXNbbmFtZV0pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IG5hbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLnN0YXRlID0gc3RhdGUgfHwgbnVsbCkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2hhcGUucHJvdG90eXBlLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpLCBsZW4sIG5hbWUsIHJlZiwgc3RhdGUsIHpvbmVzO1xuICAgIFNoYXBlLl9fc3VwZXJfXy5tb3VzZXVwQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHpvbmVzID0gZmluZFBvaW50Wm9uZXMoZXZlbnQubG9jYWxYLCBldmVudC5sb2NhbFksIHRoaXMuem9uZXMpKSB7XG4gICAgICBldmVudC56b25lcyA9IHpvbmVzO1xuICAgICAgcmVmID0gWydhY3RpdmUnLCAnaG92ZXInLCAnbm9ybWFsJ107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IHJlZltpXTtcbiAgICAgICAgaWYgKCF6b25lc1tuYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBudWxsKSkge1xuICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGFwZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgcmVmO1xuICAgIGlmICgocmVmID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYuZHJhdyA6IHZvaWQgMCkge1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZHJhdycsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgYXJnczogYXJnc1xuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gU2hhcGU7XG5cbn0pKHJlcXVpcmUoJy4vZWxlbWVudCcpKTtcbiIsInZhciBTdHlsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBzbGljZSA9IFtdLnNsaWNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFN0eWxlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTdHlsZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBTdHlsZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYXJncy5tYXBwZXIpIHtcbiAgICAgIHRoaXMubWFwcGVyID0gYXJncy5tYXBwZXI7XG4gICAgfVxuICAgIHRoaXMuZGF0YSA9IGFyZ3MuZGF0YSB8fCB7fTtcbiAgfVxuXG4gIFN0eWxlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oanNvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoanNvbikge1xuICAgICAgdGhpcy5tYXBwZXIoanNvbiwgdGhpcy5kYXRhLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFN0eWxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSwga2V5LCBrZXlzLCBsZW4sIGxlbmd0aCwgcmVzdWx0O1xuICAgIGtleXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoIShsZW5ndGggPSBrZXlzLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuICAgIHJlc3VsdCA9IFtdO1xuICAgIGlmIChsZW5ndGggPT09IDEgJiYga2V5c1swXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBrZXlzID0ga2V5c1swXTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbGVuID0ga2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICh0aGlzLmRhdGFba2V5XSAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZGF0YVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID09PSAxID8gcmVzdWx0WzBdIDogcmVzdWx0KTtcbiAgfTtcblxuICBTdHlsZS5wcm90b3R5cGUubWFwcGVyID0gZnVuY3Rpb24oZGF0YSwgY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfTtcblxuICByZXR1cm4gU3R5bGU7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSZWN0YW5nbGU6IHJlcXVpcmUoJy4vcmVjdGFuZ2xlJyksXG4gIExpbmU6IHJlcXVpcmUoJy4vbGluZScpLFxuICBUZXh0OiByZXF1aXJlKCcuL3RleHQnKVxufTtcbiIsInZhciBMaW5lLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChMaW5lLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBMaW5lKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBhcmdzLnN0YXJ0IHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmVuZCA9IGFyZ3MuZW5kIHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHRoaXMuZmlsbCA9IGFyZ3MuZmlsbCwgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSwgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aDtcbiAgICByZXR1cm4gTGluZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIExpbmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGVuZCwgbGluZVdpZHRoLCBzdGFydCwgc3Ryb2tlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHN0YXJ0ID0gYXJncy5zdGFydCB8fCB0aGlzLnN0YXJ0IHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIGVuZCA9IGFyZ3MuZW5kIHx8IHRoaXMuZW5kIHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgbGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgICBpZiAobGluZVdpZHRoICUgMikge1xuICAgICAgICBzdGFydC54ICs9IDAuNTtcbiAgICAgICAgc3RhcnQueSArPSAwLjU7XG4gICAgICAgIGVuZC54ICs9IDAuNTtcbiAgICAgICAgZW5kLnkgKz0gMC41O1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgfVxuICAgICAgY29udGV4dC5tb3ZlVG8oc3RhcnQueCwgc3RhcnQueSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMaW5lO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwidmFyIFJlY3RhbmdsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChSZWN0YW5nbGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFJlY3RhbmdsZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnNpemUgPSBhcmdzLnNpemUgfHwge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHRoaXMub3JpZ2luID0gYXJncy5vcmlnaW47XG4gICAgdGhpcy5maWxsID0gYXJncy5maWxsLCB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHJldHVybiBSZWN0YW5nbGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBSZWN0YW5nbGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGZpbGwsIGxpbmVXaWR0aCwgb3JpZ2luLCBzaXplLCBzdHJva2U7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgb3JpZ2luID0gYXJncy5vcmlnaW4gfHwgdGhpcy5vcmlnaW4gfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgc2l6ZSA9IGFyZ3Muc2l6ZSB8fCB0aGlzLnNpemUgfHwge1xuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwXG4gICAgICB9O1xuICAgICAgZmlsbCA9IGFyZ3MuZmlsbCB8fCB0aGlzLmZpbGw7XG4gICAgICBzdHJva2UgPSBhcmdzLnN0cm9rZSB8fCB0aGlzLnN0cm9rZTtcbiAgICAgIGxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoIHx8IHRoaXMubGluZVdpZHRoO1xuICAgICAgaWYgKGxpbmVXaWR0aCAlIDIpIHtcbiAgICAgICAgb3JpZ2luLnggKz0gMC41O1xuICAgICAgICBvcmlnaW4ueSArPSAwLjU7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3JpZ2luLngsIG9yaWdpbi55KTtcbiAgICAgICAgb3JpZ2luLnggPSBvcmlnaW4ueSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCB8fCBzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChvcmlnaW4ueCwgb3JpZ2luLnksIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZTtcbiAgICAgICAgaWYgKGxpbmVXaWR0aCkge1xuICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdChvcmlnaW4ueCwgb3JpZ2luLnksIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFJlY3RhbmdsZTtcblxufSkocmVxdWlyZSgnLi4vbGliL3BlbicpKTtcbiIsInZhciBMaW5lLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChMaW5lLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBMaW5lKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMub3JpZ2luID0gYXJncy5vcmlnaW4gfHwgdGhpcy5vcmlnaW4gfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuZm9udCA9IGFyZ3MuZm9udCB8fCB0aGlzLmZvbnQ7XG4gICAgdGhpcy5maWxsID0gYXJncy5maWxsIHx8IHRoaXMuZmlsbDtcbiAgICB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgdGhpcy5iYXNlbGluZSA9IGFyZ3MuYmFzZWxpbmUgfHwgdGhpcy5iYXNlbGluZTtcbiAgICByZXR1cm4gTGluZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIExpbmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGJhc2VsaW5lLCBmaWxsLCBmb250LCBvcmlnaW4sIHN0cm9rZSwgdGV4dDtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmIChjb250ZXh0ICYmICh0ZXh0ID0gYXJncy50ZXh0KSkge1xuICAgICAgb3JpZ2luID0gYXJncy5vcmlnaW4gfHwgdGhpcy5vcmlnaW4gfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgZm9udCA9IGFyZ3MuZm9udCB8fCB0aGlzLmZvbnQ7XG4gICAgICBmaWxsID0gYXJncy5maWxsIHx8IHRoaXMuZmlsbDtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgYmFzZWxpbmUgPSBhcmdzLmJhc2VsaW5lIHx8IHRoaXMuYmFzZWxpbmUgfHwgJ3RvcCc7XG4gICAgICBpZiAoZmlsbCB8fCBzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5iYXNlbGluZSA9IGJhc2VsaW5lO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICAgIG9yaWdpbi54ID0gb3JpZ2luLnkgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGZvbnQpIHtcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udDtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCBvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuc3Ryb2tlVGV4dCh0ZXh0LCBvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTGluZTtcblxufSkocmVxdWlyZSgnLi4vbGliL3BlbicpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBTaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpXG59O1xuIiwidmFyIFNoYXBlLCBfLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbl8gPSBmdW5jdGlvbihvLCBwKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFNoYXBlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTaGFwZSgpIHtcbiAgICByZXR1cm4gU2hhcGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBTaGFwZS5wcm90b3R5cGUubWFwcGVyID0gZnVuY3Rpb24oZGF0YSwgY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICB2YXIgZmlsbCwgaGVpZ2h0LCBpbWFnZSwgcmVmLCByZXBlYXQsIHVybCwgd2lkdGgsIHgsIHk7XG4gICAgaWYgKChfKGRhdGEsICd3aWR0aCcpKSB8fCAoXyhkYXRhLCAnaGVpZ2h0JykpKSB7XG4gICAgICB3aWR0aCA9IChwYXJzZUZsb2F0KGRhdGFbJ3dpZHRoJ10pKSB8fCAwO1xuICAgICAgaGVpZ2h0ID0gKHBhcnNlRmxvYXQoZGF0YVsnaGVpZ2h0J10pKSB8fCAwO1xuICAgICAgY29udGV4dC5zaXplID0ge1xuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoKF8oZGF0YSwgJ3RvcCcpKSB8fCAoXyhkYXRhLCAnbGVmdCcpKSkge1xuICAgICAgeCA9IChwYXJzZUZsb2F0KGRhdGFbJ2xlZnQnXSkpIHx8IDA7XG4gICAgICB5ID0gKHBhcnNlRmxvYXQoZGF0YVsndG9wJ10pKSB8fCAwO1xuICAgICAgY29udGV4dC5vcmlnaW4gPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdiYWNrZ3JvdW5kJykpIHtcbiAgICAgIGNvbnRleHQuZmlsbCA9IGRhdGFbJ2JhY2tncm91bmQnXTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2ZpbGwnKSkge1xuICAgICAgY29udGV4dC5maWxsID0gZGF0YVsnZmlsbCddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnY29sb3InKSkge1xuICAgICAgY29udGV4dC5zdHJva2UgPSBkYXRhWydjb2xvciddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnc3Ryb2tlJykpIHtcbiAgICAgIGNvbnRleHQuc3Ryb2tlID0gZGF0YVsnc3Ryb2tlJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdsaW5lLXdpZHRoJykpIHtcbiAgICAgIGNvbnRleHQubGluZSAtICh3aWR0aCA9IChwYXJzZUZsb2F0KGRhdGFbJ2xpbmUtd2lkdGgnXSkpIHx8IDApO1xuICAgIH1cbiAgICBpZiAodXJsID0gKHJlZiA9IGNvbnRleHQuZmlsbCkgIT0gbnVsbCA/IHJlZi5tYXRjaCgvdXJsXFwoXFxzKihbXCInJ10/KVxccyooLispXFwxXFwpLykgOiB2b2lkIDApIHtcbiAgICAgIHVybCA9IHVybFsyXTtcbiAgICAgIGlmIChyZXBlYXQgPSBjb250ZXh0LmZpbGwubWF0Y2goLyhub3JlcGVhdHxyZXBlYXQteHxyZXBlYXQteSkvKSkge1xuICAgICAgICByZXBlYXQgPSByZXBlYXRbMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXBlYXQgPSBudWxsO1xuICAgICAgfVxuICAgICAgZmlsbCA9IG51bGw7XG4gICAgICAoaW1hZ2UgPSBuZXcgSW1hZ2UpLnNyYyA9IHVybDtcbiAgICAgIGltYWdlLm9ubG9hZCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29udGV4dC5maWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKS5jcmVhdGVQYXR0ZXJuKGltYWdlLCByZXBlYXQgfHwgJ3JlcGVhdCcpO1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayAhPSBudWxsID8gY2FsbGJhY2suY2FsbChfdGhpcywgbnVsbCwgY29udGV4dCkgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIHJldHVybiBpbWFnZS5vbmVycm9yID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICE9IG51bGwgPyBjYWxsYmFjay5jYWxsKF90aGlzLCBlLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sgIT0gbnVsbCA/IGNhbGxiYWNrLmNhbGwodGhpcywgbnVsbCwgY29udGV4dCkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTaGFwZTtcblxufSkocmVxdWlyZSgnLi4vbGliL3N0eWxlJykpO1xuIiwidmFyIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENoaWxkQ2xhc3MsIFBhcmVudENsYXNzZXMpIHtcbiAgdmFyIE1peGluQ2xhc3MsIFBhcmVudENsYXNzLCBpLCBrZXksIGxlbiwgcmVmLCB2YWx1ZTtcbiAgaWYgKFBhcmVudENsYXNzZXMgaW5zdGFuY2VvZiBBcnJheSAmJiBQYXJlbnRDbGFzc2VzLmxlbmd0aCkge1xuICAgIFBhcmVudENsYXNzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICAgIGV4dGVuZChQYXJlbnRDbGFzcywgc3VwZXJDbGFzcyk7XG5cbiAgICAgIGZ1bmN0aW9uIFBhcmVudENsYXNzKCkge1xuICAgICAgICB2YXIgTWl4aW5DbGFzcywgaSwgbGVuO1xuICAgICAgICBQYXJlbnRDbGFzcy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIE1peGluQ2xhc3MgPSBQYXJlbnRDbGFzc2VzW2ldO1xuICAgICAgICAgIE1peGluQ2xhc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUGFyZW50Q2xhc3M7XG5cbiAgICB9KShQYXJlbnRDbGFzc2VzLnNoaWZ0KCkpO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IFBhcmVudENsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIE1peGluQ2xhc3MgPSBQYXJlbnRDbGFzc2VzW2ldO1xuICAgICAgcmVmID0gTWl4aW5DbGFzcy5wcm90b3R5cGU7XG4gICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwocmVmLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICAgaWYgKGtleSAhPT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgIFBhcmVudENsYXNzLnByb3RvdHlwZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgUGFyZW50Q2xhc3MgPSBQYXJlbnRDbGFzc2VzO1xuICB9XG4gIHJldHVybiBleHRlbmQoQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3MpO1xufTtcbiJdfQ==
