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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9pbmRleC5qcyIsImJ1aWxkL2xpYi9iYXNlLmpzIiwiYnVpbGQvbGliL2NvbXBvbmVudC5qcyIsImJ1aWxkL2xpYi9lbGVtZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50ZWQuanMiLCJidWlsZC9saWIvaW5kZXguanMiLCJidWlsZC9saWIvbm9kZS5qcyIsImJ1aWxkL2xpYi9wZW4uanMiLCJidWlsZC9saWIvc2hhcGUuanMiLCJidWlsZC9saWIvc3R5bGUuanMiLCJidWlsZC9wZW4vaW5kZXguanMiLCJidWlsZC9wZW4vbGluZS5qcyIsImJ1aWxkL3Blbi9yZWN0YW5nbGUuanMiLCJidWlsZC9wZW4vdGV4dC5qcyIsImJ1aWxkL3N0eWxlL2luZGV4LmpzIiwiYnVpbGQvc3R5bGUvc2hhcGUuanMiLCJub2RlX21vZHVsZXMvZXh0ZW5kc19fL2Rpc3QvZXh0ZW5kc19fLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LmNubCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBsaWI6IHJlcXVpcmUoJy4vbGliL2luZGV4JyksXG4gIHBlbjogcmVxdWlyZSgnLi9wZW4vaW5kZXgnKSxcbiAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUvaW5kZXgnKVxufTtcbiIsInZhciBCYXNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEJhc2UoKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfX19ydW50aW1lJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHt9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gQmFzZTtcblxufSkoKTtcbiIsInZhciBDb21wb25lbnQsIEV2ZW50LFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDb21wb25lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIENvbXBvbmVudChhcmdzKSB7XG4gICAgdmFyIGZuLCBpLCBqLCBsZW4sIGxlbjEsIG5hbWUsIHJlZiwgcmVmMTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIENvbXBvbmVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZWYgPSBbJ2dyYWInLCAncmVsZWFzZScsICdkcmFnJ107XG4gICAgZm4gPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIF90aGlzLmFkZExpc3RlbmVyKG5hbWUsIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHJlZjE7XG4gICAgICAgICAgaWYgKCEoKHJlZjEgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjFbbmFtZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWYxO1xuICAgICAgICAgIGlmICghKChyZWYxID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYxW25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIGZhbHNlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBuYW1lID0gcmVmW2ldO1xuICAgICAgZm4obmFtZSk7XG4gICAgfVxuICAgIHJlZjEgPSBbJ2dyYWInLCAncmVsZWFzZScsICdkcmFnJ107XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBuYW1lID0gcmVmMVtqXTtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIobmFtZSwgdGhpc1tuYW1lICsgXCJDYXB0dXJlTGlzdGVuZXJcIl0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciAkLCBpLCBsZW4sIG5hbWUsIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcmVmNCwgem9uZXM7XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5tb3VzZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICQgPSB0aGlzLl9fX3J1bnRpbWU7XG4gICAgaWYgKCQuZ3JhYikge1xuICAgICAgdGhpcy5zdGF0ZSA9ICdhY3RpdmUnO1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudCgkLmRyYWdFdmVudCA9IG5ldyBFdmVudCh7XG4gICAgICAgIHR5cGU6ICdkcmFnJ1xuICAgICAgfSwge1xuICAgICAgICB4OiBldmVudC54LFxuICAgICAgICB5OiBldmVudC55LFxuICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgIG9mZnNldFg6IGV2ZW50LnggLSAoKChyZWYgPSAkLmRyYWdFdmVudCkgIT0gbnVsbCA/IHJlZi54IDogdm9pZCAwKSB8fCAoKHJlZjEgPSAkLmdyYWJFdmVudCkgIT0gbnVsbCA/IHJlZjEueCA6IHZvaWQgMCkgfHwgMCksXG4gICAgICAgIG9mZnNldFk6IGV2ZW50LnkgLSAoKChyZWYyID0gJC5kcmFnRXZlbnQpICE9IG51bGwgPyByZWYyLnkgOiB2b2lkIDApIHx8ICgocmVmMyA9ICQuZ3JhYkV2ZW50KSAhPSBudWxsID8gcmVmMy55IDogdm9pZCAwKSB8fCAwKVxuICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgICAgIGlmICh6b25lcyA9IHRoaXMuem9uZXMpIHtcbiAgICAgICAgcmVmNCA9IFsnaG92ZXInLCAnbm9ybWFsJ107XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZjQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBuYW1lID0gcmVmNFtpXTtcbiAgICAgICAgICBpZiAoIXpvbmVzW25hbWVdKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IG5hbWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyICQ7XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5tb3VzZWRvd25MaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICgkID0gdGhpcy5fX19ydW50aW1lKS5ncmFiID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQoJC5ncmFiRXZlbnQgPSBuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZ3JhYidcbiAgICAgIH0sIHtcbiAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgeTogZXZlbnQueSxcbiAgICAgICAgdGFyZ2V0OiB0aGlzXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2V1cExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgJDtcbiAgICBDb21wb25lbnQuX19zdXBlcl9fLm1vdXNldXBMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICgkID0gdGhpcy5fX19ydW50aW1lKS5ncmFiID0gZmFsc2U7XG4gICAgdGhpcy5icm9hZGNhc3RFdmVudCgkLmdyYWJFdmVudCA9IG5ldyBFdmVudCh7XG4gICAgICB0eXBlOiAncmVsZWFzZSdcbiAgICB9LCB7XG4gICAgICB4OiBldmVudC54LFxuICAgICAgeTogZXZlbnQueSxcbiAgICAgIHRhcmdldDogdGhpc1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLmRyYWdDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5kcmFnRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLmdyYWJDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5ncmFiRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLnJlbGVhc2VDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5yZWxlYXNlRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLmRyYWdMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZ3JhYkxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5yZWxlYXNlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gQ29tcG9uZW50O1xuXG59KShyZXF1aXJlKCcuL3NoYXBlJykpO1xuIiwidmFyIEVsZW1lbnQsIEV2ZW50LCBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbmxvY2FsaXplRXZlbnRDb29yZGluYXRlcyA9IGZ1bmN0aW9uKGV2ZW50LCBvcmlnaW4pIHtcbiAgZXZlbnQubG9jYWxYID0gKGV2ZW50LmxvY2FsWCAhPSBudWxsID8gZXZlbnQubG9jYWxYIDogZXZlbnQueCkgLSAoKG9yaWdpbiAhPSBudWxsID8gb3JpZ2luLnggOiB2b2lkIDApIHx8IDApO1xuICByZXR1cm4gZXZlbnQubG9jYWxZID0gKGV2ZW50LmxvY2FsWSAhPSBudWxsID8gZXZlbnQubG9jYWxZIDogZXZlbnQueSkgLSAoKG9yaWdpbiAhPSBudWxsID8gb3JpZ2luLnkgOiB2b2lkIDApIHx8IDApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEVsZW1lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEVsZW1lbnQoYXJncykge1xuICAgIHZhciBmbiwgaSwgaiwgaywga2V5LCBsZW4sIGxlbjEsIGxlbjIsIG5hbWUsIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcmVmNCwgdmFsdWU7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBFbGVtZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJlZiA9IFsnb3JpZ2luJywgJ3NpemUnLCAnc3RhdGUnLCAnc3R5bGUnXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IHJlZltpXTtcbiAgICAgIGlmIChhcmdzW2tleV0pIHtcbiAgICAgICAgdGhpc1trZXldID0gYXJnc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZWYxID0gYXJncy5zdHlsZXM7XG4gICAgZm9yIChrZXkgaW4gcmVmMSkge1xuICAgICAgdmFsdWUgPSByZWYxW2tleV07XG4gICAgICAodGhpcy5zdHlsZXMgfHwgKHRoaXMuc3R5bGVzID0ge30pKSAmJiAodGhpcy5zdHlsZXNba2V5XSA9IHZhbHVlKTtcbiAgICB9XG4gICAgcmVmMiA9IGFyZ3Muc3RhdGVzO1xuICAgIGZvciAoa2V5IGluIHJlZjIpIHtcbiAgICAgIHZhbHVlID0gcmVmMltrZXldO1xuICAgICAgKHRoaXMuc3RhdGVzIHx8ICh0aGlzLnN0YXRlcyA9IHt9KSkgJiYgKHRoaXMuc3RhdGVzW2tleV0gPSB2YWx1ZSk7XG4gICAgfVxuICAgIHJlZjMgPSBbJ21vdXNlbW92ZScsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICd1cGRhdGUnLCAncmVuZGVyJ107XG4gICAgZm4gPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIF90aGlzLmFkZExpc3RlbmVyKG5hbWUsIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHJlZjQ7XG4gICAgICAgICAgaWYgKCEoKHJlZjQgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjRbbmFtZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWY0O1xuICAgICAgICAgIGlmICghKChyZWY0ID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWY0W25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIGZhbHNlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBuYW1lID0gcmVmM1tqXTtcbiAgICAgIGZuKG5hbWUpO1xuICAgIH1cbiAgICByZWY0ID0gWydtb3VzZW1vdmUnLCAnbW91c2Vkb3duJywgJ21vdXNldXAnXTtcbiAgICBmb3IgKGsgPSAwLCBsZW4yID0gcmVmNC5sZW5ndGg7IGsgPCBsZW4yOyBrKyspIHtcbiAgICAgIG5hbWUgPSByZWY0W2tdO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCB0aGlzW25hbWUgKyBcIkNhcHR1cmVMaXN0ZW5lclwiXSwgdHJ1ZSk7XG4gICAgICB0aGlzLmFkZExpc3RlbmVyKG5hbWUsIHRoaXNbbmFtZSArIFwiTGlzdGVuZXJcIl0sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5tb3VzZW1vdmVFdmVudCA9IGV2ZW50O1xuICAgIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyhldmVudCwgdGhpcy5vcmlnaW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNlZG93bkNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fX19ydW50aW1lLm1vdXNlZG93bkV2ZW50ID0gZXZlbnQ7XG4gICAgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50LCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2V1cENhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fX19ydW50aW1lLm1vdXNldXBFdmVudCA9IGV2ZW50O1xuICAgIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyhldmVudCwgdGhpcy5vcmlnaW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNlZG93bkxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2V1cExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2Vtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgdmFyIHJlZjtcbiAgICBpZiAoKHJlZiA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmLnVwZGF0ZSA6IHZvaWQgMCkge1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAndXBkYXRlJyxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICB2YXIgY2hpbGQsIGNoaWxkcmVuLCBpLCBsZW4sIHJlZjtcbiAgICBpZiAoKHJlZiA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmLnJlbmRlciA6IHZvaWQgMCkge1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAncmVuZGVyJyxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgIGNoaWxkLnJlbmRlcihjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEVsZW1lbnQ7XG5cbn0pKHJlcXVpcmUoJy4vZXZlbnRlZCcpKTtcbiIsInZhciBFdmVudCxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEV2ZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFdmVudChhcmdzLCBjYWxsYmFjaykge1xuICAgIHZhciBkYXRlLCBrZXksIHBlcmYsIHZhbHVlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgYXJncyA9IHtcbiAgICAgICAgdHlwZTogYXJnc1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKChhcmd1bWVudHMubGVuZ3RoIDwgMikgJiYgdHlwZW9mIGFyZ3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBhcmdzO1xuICAgICAgICBhcmdzID0ge307XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIGFyZ3MpIHtcbiAgICAgIHZhbHVlID0gYXJnc1trZXldO1xuICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayAmJiAhdGhpcy5jYWxsYmFjaykge1xuICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBpZiAoIWFyZ3MuaGFzT3duUHJvcGVydHkoJ3RpbWVzdGFtcCcpKSB7XG4gICAgICBkYXRlID0gRGF0ZS5ub3coKTtcbiAgICAgIHBlcmYgPSAodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsID8gcGVyZm9ybWFuY2Uubm93KCkgOiB2b2lkIDApIHx8IDA7XG4gICAgICB0aGlzLnRpbWVzdGFtcCA9IDEwMDAgKiBkYXRlICsgTWF0aC5mbG9vcigxMDAwICogKHBlcmYgLSBNYXRoLmZsb29yKHBlcmYpKSk7XG4gICAgfVxuICB9XG5cbiAgRXZlbnQucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLnN0YXJ0ZWQgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLnN0b3BwZWQgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuY2FuY2VsZWQgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5hYm9ydGVkID0gdHJ1ZSkgJiYgdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbmUgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudDtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIEV2ZW50LCBFdmVudGVkLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ZWQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRXZlbnRlZCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnRlZChhcmdzKSB7XG4gICAgdmFyIGtleSwgcmVmLCB2YWx1ZTtcbiAgICBFdmVudGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJlZiA9IGFyZ3MgIT0gbnVsbCA/IGFyZ3MuZXZlbnRzIDogdm9pZCAwO1xuICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICh0aGlzLmV2ZW50cyB8fCAodGhpcy5ldmVudHMgPSB7fSkpICYmICh0aGlzLmV2ZW50c1trZXldID0gdmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmxpc3RlbmVycyA9IFt7fSwge31dO1xuICB9XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgIHZhciBiYXNlLCBsaXN0ZW5lcnMsIHJlZjtcbiAgICBpZiAoY2FwdHVyZSA9PSBudWxsKSB7XG4gICAgICBjYXB0dXJlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZWYgPSB0eXBlLCB0eXBlID0gcmVmLnR5cGUsIGxpc3RlbmVyID0gcmVmLmxpc3RlbmVyLCBjYXB0dXJlID0gcmVmLmNhcHR1cmU7XG4gICAgfVxuICAgIGlmICh0eXBlICYmIHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGlzdGVuZXJzID0gKChiYXNlID0gdGhpcy5saXN0ZW5lcnNbY2FwdHVyZSA9PT0gdHJ1ZSA/IDEgOiAwXSlbdHlwZV0gfHwgKGJhc2VbdHlwZV0gPSBbXSkpO1xuICAgICAgaWYgKC0xID09PSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikpIHtcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIGlkeCwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tjYXB0dXJlID09PSB0cnVlID8gMSA6IDBdW3R5cGVdKSB7XG4gICAgICAgIGlmICgtMSAhPT0gKGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSkpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbGlzdGVuZXIsIGxpc3RlbmVycywgcGhhc2UsIHR5cGU7XG4gICAgaWYgKCh0eXBlID0gZXZlbnQgIT0gbnVsbCA/IGV2ZW50LnR5cGUgOiB2b2lkIDApICYmICFldmVudC5hYm9ydGVkKSB7XG4gICAgICBwaGFzZSA9IGV2ZW50LnBoYXNlO1xuICAgICAgaWYgKHBoYXNlID4gMCAmJiBwaGFzZSA8IDMgJiYgKGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzWzIgLSBwaGFzZV1bdHlwZV0pKSB7XG4gICAgICAgIGV2ZW50LnN0YXJ0KCk7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgICAgIGlmIChldmVudC5zdG9wcGVkIHx8IGV2ZW50LmFib3J0ZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5icm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQpIHtcbiAgICB2YXIgY2hpbGQsIGksIGxlbiwgcGhhc2UsIHJlZiwgcmVmMSwgdHlwZTtcbiAgICBpZiAodHlwZSA9IGV2ZW50ICE9IG51bGwgPyBldmVudC50eXBlIDogdm9pZCAwKSB7XG4gICAgICBpZiAoIShldmVudC5hYm9ydGVkIHx8IGV2ZW50LmRvbmUgfHwgZXZlbnQucGhhc2UgPT09IDMpKSB7XG4gICAgICAgIGV2ZW50LnN0YXJ0KCk7XG4gICAgICAgIGV2ZW50LnNvdXJjZSB8fCAoZXZlbnQuc291cmNlID0gdGhpcyk7XG4gICAgICAgIGV2ZW50LnRhcmdldCB8fCAoZXZlbnQudGFyZ2V0ID0gdGFyZ2V0KTtcbiAgICAgICAgcGhhc2UgPSAoZXZlbnQucGhhc2UgfHwgKGV2ZW50LnBoYXNlID0gMSkpO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XG4gICAgICAgICAgZXZlbnQucGhhc2UgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJlZiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgY2hpbGQgPSByZWZbaV07XG4gICAgICAgICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMSAmJiAhZXZlbnQuYWJvcnRlZCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmJyb2FkY2FzdEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XG4gICAgICAgICAgZXZlbnQucGhhc2UgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMikge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gdGhpcykge1xuICAgICAgICAgIGlmICghKGV2ZW50LmNhbmNlbGVkIHx8IGV2ZW50LmFib3J0ZWQgfHwgZXZlbnQuZG9uZSB8fCBldmVudC5waGFzZSA9PT0gMykpIHtcbiAgICAgICAgICAgIGlmICgocmVmMSA9IGV2ZW50LmNhbGxiYWNrKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHJlZjEuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMztcbiAgICAgICAgICBldmVudC5maW5pc2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gRXZlbnRlZDtcblxufSkocmVxdWlyZSgnLi9ub2RlJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJhc2U6IHJlcXVpcmUoJy4vYmFzZScpLFxuICBFdmVudDogcmVxdWlyZSgnLi9ldmVudCcpLFxuICBOb2RlOiByZXF1aXJlKCcuL25vZGUnKSxcbiAgRWxlbWVudDogcmVxdWlyZSgnLi9lbGVtZW50JyksXG4gIEV2ZW50ZWQ6IHJlcXVpcmUoJy4vZXZlbnRlZCcpLFxuICBTdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICBTaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpLFxuICBDb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50JyksXG4gIFBlbjogcmVxdWlyZSgnLi9wZW4nKVxufTtcbiIsInZhciBOb2RlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChOb2RlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBOb2RlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIE5vZGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgYXJncy5jaGlsZHJlbiAmJiAodGhpcy5jaGlsZHJlbiA9IGFyZ3MuY2hpbGRyZW4pO1xuICAgIGFyZ3MucGFyZW50ICYmICh0aGlzLnBhcmVudCA9IGFyZ3MucGFyZW50KTtcbiAgfVxuXG4gIE5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgcmVmO1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUgJiYgKHRoaXMuY2hpbGRyZW4gfHwgKHRoaXMuY2hpbGRyZW4gPSBbXSkpKSB7XG4gICAgICBpZiAoLTEgPT09IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkpIHtcbiAgICAgICAgaWYgKChyZWYgPSBjaGlsZC5wYXJlbnQpICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlZi5yZW1vdmVDaGlsZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZWYucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIGlkeDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlICYmIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGlmICgtMSAhPT0gKGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkpKSB7XG4gICAgICAgIGRlbGV0ZSBjaGlsZC5wYXJlbnQ7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2hpbGRyZW47XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBOb2RlO1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJ2YXIgUGVuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBlbiA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGVuKCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgcmV0dXJuIChyZWYgPSBfdGhpcy5kcmF3KSAhPSBudWxsID8gcmVmLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgfVxuXG4gIHJldHVybiBQZW47XG5cbn0pKCk7XG4iLCJ2YXIgRXZlbnQsIFNoYXBlLCBmaW5kUG9pbnRab25lcyxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxuZmluZFBvaW50Wm9uZXMgPSBmdW5jdGlvbih4LCB5LCB6b25lcykge1xuICB2YXIgJCwgbmFtZSwgcmVzdWx0O1xuICByZXN1bHQgPSB7fTtcbiAgZm9yIChuYW1lIGluIHpvbmVzKSB7XG4gICAgJCA9IHpvbmVzW25hbWVdO1xuICAgIGlmICgoJFswXSA8PSB4ICYmIHggPD0gKCRbMF0gKyAkWzJdKSkgJiYgKCRbMV0gPD0geSAmJiB5IDw9ICgkWzFdICsgJFszXSkpKSB7XG4gICAgICByZXN1bHRbbmFtZV0gPSAkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChTaGFwZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gU2hhcGUoYXJncykge1xuICAgIHZhciBmbiwgaSwga2V5LCBsZW4sIG5hbWUsIHJlZiwgcmVmMSwgdmFsdWU7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZWYgPSBhcmdzLnpvbmVzO1xuICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICh0aGlzLnpvbmVzIHx8ICh0aGlzLnpvbmVzID0ge30pKSAmJiAodGhpcy56b25lc1trZXldID0gdmFsdWUpO1xuICAgIH1cbiAgICByZWYxID0gWydkcmF3J107XG4gICAgZm4gPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIF90aGlzLmFkZExpc3RlbmVyKG5hbWUsIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHJlZjI7XG4gICAgICAgICAgaWYgKCEoKHJlZjIgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjJbbmFtZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWYyO1xuICAgICAgICAgIGlmICghKChyZWYyID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYyW25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIGZhbHNlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmMS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbmFtZSA9IHJlZjFbaV07XG4gICAgICBmbihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBTaGFwZS5wcm90b3R5cGUubW91c2Vtb3ZlQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSwgbGVuLCBuYW1lLCByZWYsIHN0YXRlLCB6b25lcztcbiAgICBTaGFwZS5fX3N1cGVyX18ubW91c2Vtb3ZlQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHpvbmVzID0gZmluZFBvaW50Wm9uZXMoZXZlbnQubG9jYWxYLCBldmVudC5sb2NhbFksIHRoaXMuem9uZXMpKSB7XG4gICAgICBldmVudC56b25lcyA9IHpvbmVzO1xuICAgICAgcmVmID0gWydhY3RpdmUnLCAnaG92ZXInLCAnbm9ybWFsJ107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IHJlZltpXTtcbiAgICAgICAgaWYgKCF6b25lc1tuYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBudWxsKSkge1xuICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGFwZS5wcm90b3R5cGUubW91c2Vkb3duQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSwgbGVuLCBuYW1lLCByZWYsIHN0YXRlLCB6b25lcztcbiAgICBTaGFwZS5fX3N1cGVyX18ubW91c2Vkb3duQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHpvbmVzID0gZmluZFBvaW50Wm9uZXMoZXZlbnQubG9jYWxYLCBldmVudC5sb2NhbFksIHRoaXMuem9uZXMpKSB7XG4gICAgICBldmVudC56b25lcyA9IHpvbmVzO1xuICAgICAgcmVmID0gWydhY3RpdmUnLCAnaG92ZXInLCAnbm9ybWFsJ107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IHJlZltpXTtcbiAgICAgICAgaWYgKCF6b25lc1tuYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBudWxsKSkge1xuICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGFwZS5wcm90b3R5cGUubW91c2V1cENhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbmFtZSwgcmVmLCBzdGF0ZSwgem9uZXM7XG4gICAgU2hhcGUuX19zdXBlcl9fLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoem9uZXMgPSBmaW5kUG9pbnRab25lcyhldmVudC5sb2NhbFgsIGV2ZW50LmxvY2FsWSwgdGhpcy56b25lcykpIHtcbiAgICAgIGV2ZW50LnpvbmVzID0gem9uZXM7XG4gICAgICByZWYgPSBbJ2FjdGl2ZScsICdob3ZlcicsICdub3JtYWwnXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBuYW1lID0gcmVmW2ldO1xuICAgICAgICBpZiAoIXpvbmVzW25hbWVdKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBuYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5zdGF0ZSA9IHN0YXRlIHx8IG51bGwpKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciByZWY7XG4gICAgaWYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi5kcmF3IDogdm9pZCAwKSB7XG4gICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgIHR5cGU6ICdkcmF3JyxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBTaGFwZTtcblxufSkocmVxdWlyZSgnLi9lbGVtZW50JykpO1xuIiwidmFyIFN0eWxlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU3R5bGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFN0eWxlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIFN0eWxlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhcmdzLm1hcHBlcikge1xuICAgICAgdGhpcy5tYXBwZXIgPSBhcmdzLm1hcHBlcjtcbiAgICB9XG4gICAgdGhpcy5kYXRhID0gYXJncy5kYXRhIHx8IHt9O1xuICB9XG5cbiAgU3R5bGUucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbihqc29uLCBjYWxsYmFjaykge1xuICAgIGlmIChqc29uKSB7XG4gICAgICB0aGlzLm1hcHBlcihqc29uLCB0aGlzLmRhdGEsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU3R5bGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCBrZXksIGtleXMsIGxlbiwgbGVuZ3RoLCByZXN1bHQ7XG4gICAga2V5cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmICghKGxlbmd0aCA9IGtleXMubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG4gICAgcmVzdWx0ID0gW107XG4gICAgaWYgKGxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGtleXMgPSBrZXlzWzBdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBrZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKHRoaXMuZGF0YVtrZXldICE9IG51bGwpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5kYXRhW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEgPyByZXN1bHRbMF0gOiByZXN1bHQpO1xuICB9O1xuXG4gIFN0eWxlLnByb3RvdHlwZS5tYXBwZXIgPSBmdW5jdGlvbihkYXRhLCBjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9O1xuXG4gIHJldHVybiBTdHlsZTtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlY3RhbmdsZTogcmVxdWlyZSgnLi9yZWN0YW5nbGUnKSxcbiAgTGluZTogcmVxdWlyZSgnLi9saW5lJyksXG4gIFRleHQ6IHJlcXVpcmUoJy4vdGV4dCcpXG59O1xuIiwidmFyIExpbmUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExpbmUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExpbmUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IGFyZ3Muc3RhcnQgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuZW5kID0gYXJncy5lbmQgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UsIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGg7XG4gICAgdGhpcy5maWxsID0gYXJncy5maWxsLCB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgTGluZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgZW5kLCBsaW5lV2lkdGgsIHN0YXJ0LCBzdHJva2U7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgc3RhcnQgPSBhcmdzLnN0YXJ0IHx8IHRoaXMuc3RhcnQgfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgZW5kID0gYXJncy5lbmQgfHwgdGhpcy5lbmQgfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBsaW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICAgIGlmIChsaW5lV2lkdGggJSAyKSB7XG4gICAgICAgIHN0YXJ0LnggKz0gMC41O1xuICAgICAgICBzdGFydC55ICs9IDAuNTtcbiAgICAgICAgZW5kLnggKz0gMC41O1xuICAgICAgICBlbmQueSArPSAwLjU7XG4gICAgICB9XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB9XG4gICAgICBjb250ZXh0Lm1vdmVUbyhzdGFydC54LCBzdGFydC55KTtcbiAgICAgIGNvbnRleHQubGluZVRvKGVuZC54LCBlbmQueSk7XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2U7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGV4dC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIExpbmU7XG5cbn0pKHJlcXVpcmUoJy4uL2xpYi9wZW4nKSk7XG4iLCJ2YXIgUmVjdGFuZ2xlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFJlY3RhbmdsZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gUmVjdGFuZ2xlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuc2l6ZSA9IGFyZ3Muc2l6ZSB8fCB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMFxuICAgIH07XG4gICAgdGhpcy5vcmlnaW4gPSBhcmdzLm9yaWdpbjtcbiAgICB0aGlzLmZpbGwgPSBhcmdzLmZpbGwsIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UsIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGg7XG4gICAgcmV0dXJuIFJlY3RhbmdsZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFJlY3RhbmdsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgZmlsbCwgbGluZVdpZHRoLCBvcmlnaW4sIHNpemUsIHN0cm9rZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBvcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBzaXplID0gYXJncy5zaXplIHx8IHRoaXMuc2l6ZSB8fCB7XG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgIH07XG4gICAgICBmaWxsID0gYXJncy5maWxsIHx8IHRoaXMuZmlsbDtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgbGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgICBpZiAobGluZVdpZHRoICUgMikge1xuICAgICAgICBvcmlnaW4ueCArPSAwLjU7XG4gICAgICAgIG9yaWdpbi55ICs9IDAuNTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgICBvcmlnaW4ueCA9IG9yaWdpbi55ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIHx8IHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KG9yaWdpbi54LCBvcmlnaW4ueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KG9yaWdpbi54LCBvcmlnaW4ueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gUmVjdGFuZ2xlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwidmFyIExpbmUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExpbmUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExpbmUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5vcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5mb250ID0gYXJncy5mb250IHx8IHRoaXMuZm9udDtcbiAgICB0aGlzLmZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICB0aGlzLmJhc2VsaW5lID0gYXJncy5iYXNlbGluZSB8fCB0aGlzLmJhc2VsaW5lO1xuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgTGluZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYmFzZWxpbmUsIGZpbGwsIGZvbnQsIG9yaWdpbiwgc3Ryb2tlLCB0ZXh0O1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQgJiYgKHRleHQgPSBhcmdzLnRleHQpKSB7XG4gICAgICBvcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBmb250ID0gYXJncy5mb250IHx8IHRoaXMuZm9udDtcbiAgICAgIGZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBiYXNlbGluZSA9IGFyZ3MuYmFzZWxpbmUgfHwgdGhpcy5iYXNlbGluZSB8fCAndG9wJztcbiAgICAgIGlmIChmaWxsIHx8IHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJhc2VsaW5lID0gYmFzZWxpbmU7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3JpZ2luLngsIG9yaWdpbi55KTtcbiAgICAgICAgb3JpZ2luLnggPSBvcmlnaW4ueSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoZm9udCkge1xuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250O1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICB9XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICByZXR1cm4gY29udGV4dC5zdHJva2VUZXh0KHRleHQsIG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMaW5lO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNoYXBlOiByZXF1aXJlKCcuL3NoYXBlJylcbn07XG4iLCJ2YXIgU2hhcGUsIF8sXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXyA9IGZ1bmN0aW9uKG8sIHApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU2hhcGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFNoYXBlKCkge1xuICAgIHJldHVybiBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFNoYXBlLnByb3RvdHlwZS5tYXBwZXIgPSBmdW5jdGlvbihkYXRhLCBjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIHZhciBmaWxsLCBoZWlnaHQsIGltYWdlLCByZWYsIHJlcGVhdCwgdXJsLCB3aWR0aCwgeCwgeTtcbiAgICBpZiAoKF8oZGF0YSwgJ3dpZHRoJykpIHx8IChfKGRhdGEsICdoZWlnaHQnKSkpIHtcbiAgICAgIHdpZHRoID0gKHBhcnNlRmxvYXQoZGF0YVsnd2lkdGgnXSkpIHx8IDA7XG4gICAgICBoZWlnaHQgPSAocGFyc2VGbG9hdChkYXRhWydoZWlnaHQnXSkpIHx8IDA7XG4gICAgICBjb250ZXh0LnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgoXyhkYXRhLCAndG9wJykpIHx8IChfKGRhdGEsICdsZWZ0JykpKSB7XG4gICAgICB4ID0gKHBhcnNlRmxvYXQoZGF0YVsnbGVmdCddKSkgfHwgMDtcbiAgICAgIHkgPSAocGFyc2VGbG9hdChkYXRhWyd0b3AnXSkpIHx8IDA7XG4gICAgICBjb250ZXh0Lm9yaWdpbiA9IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2JhY2tncm91bmQnKSkge1xuICAgICAgY29udGV4dC5maWxsID0gZGF0YVsnYmFja2dyb3VuZCddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnZmlsbCcpKSB7XG4gICAgICBjb250ZXh0LmZpbGwgPSBkYXRhWydmaWxsJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdjb2xvcicpKSB7XG4gICAgICBjb250ZXh0LnN0cm9rZSA9IGRhdGFbJ2NvbG9yJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdzdHJva2UnKSkge1xuICAgICAgY29udGV4dC5zdHJva2UgPSBkYXRhWydzdHJva2UnXTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2xpbmUtd2lkdGgnKSkge1xuICAgICAgY29udGV4dC5saW5lIC0gKHdpZHRoID0gKHBhcnNlRmxvYXQoZGF0YVsnbGluZS13aWR0aCddKSkgfHwgMCk7XG4gICAgfVxuICAgIGlmICh1cmwgPSAocmVmID0gY29udGV4dC5maWxsKSAhPSBudWxsID8gcmVmLm1hdGNoKC91cmxcXChcXHMqKFtcIicnXT8pXFxzKiguKylcXDFcXCkvKSA6IHZvaWQgMCkge1xuICAgICAgdXJsID0gdXJsWzJdO1xuICAgICAgaWYgKHJlcGVhdCA9IGNvbnRleHQuZmlsbC5tYXRjaCgvKG5vcmVwZWF0fHJlcGVhdC14fHJlcGVhdC15KS8pKSB7XG4gICAgICAgIHJlcGVhdCA9IHJlcGVhdFsxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGVhdCA9IG51bGw7XG4gICAgICB9XG4gICAgICBmaWxsID0gbnVsbDtcbiAgICAgIChpbWFnZSA9IG5ldyBJbWFnZSkuc3JjID0gdXJsO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb250ZXh0LmZpbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLmNyZWF0ZVBhdHRlcm4oaW1hZ2UsIHJlcGVhdCB8fCAncmVwZWF0Jyk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICE9IG51bGwgPyBjYWxsYmFjay5jYWxsKF90aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgcmV0dXJuIGltYWdlLm9uZXJyb3IgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgIT0gbnVsbCA/IGNhbGxiYWNrLmNhbGwoX3RoaXMsIGUsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayAhPSBudWxsID8gY2FsbGJhY2suY2FsbCh0aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNoYXBlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvc3R5bGUnKSk7XG4iLCJ2YXIgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3Nlcykge1xuICB2YXIgTWl4aW5DbGFzcywgUGFyZW50Q2xhc3MsIGksIGtleSwgbGVuLCByZWYsIHZhbHVlO1xuICBpZiAoUGFyZW50Q2xhc3NlcyBpbnN0YW5jZW9mIEFycmF5ICYmIFBhcmVudENsYXNzZXMubGVuZ3RoKSB7XG4gICAgUGFyZW50Q2xhc3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgICAgZXh0ZW5kKFBhcmVudENsYXNzLCBzdXBlckNsYXNzKTtcblxuICAgICAgZnVuY3Rpb24gUGFyZW50Q2xhc3MoKSB7XG4gICAgICAgIHZhciBNaXhpbkNsYXNzLCBpLCBsZW47XG4gICAgICAgIFBhcmVudENsYXNzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBQYXJlbnRDbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICAgICAgTWl4aW5DbGFzcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQYXJlbnRDbGFzcztcblxuICAgIH0pKFBhcmVudENsYXNzZXMuc2hpZnQoKSk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICByZWYgPSBNaXhpbkNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICBpZiAoa2V5ICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgUGFyZW50Q2xhc3MucHJvdG90eXBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBQYXJlbnRDbGFzcyA9IFBhcmVudENsYXNzZXM7XG4gIH1cbiAgcmV0dXJuIGV4dGVuZChDaGlsZENsYXNzLCBQYXJlbnRDbGFzcyk7XG59O1xuIl19
