(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.cnl = require('./index');

},{"./index":4}],2:[function(require,module,exports){
module.exports = function(x, y, zones) {
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

},{}],3:[function(require,module,exports){
module.exports = function(event, origin) {
  event.localX = (event.localX != null ? event.localX : event.x) - ((origin != null ? origin.x : void 0) || 0);
  return event.localY = (event.localY != null ? event.localY : event.y) - ((origin != null ? origin.y : void 0) || 0);
};

},{}],4:[function(require,module,exports){
module.exports = {
  lib: require('./lib/index'),
  pen: require('./pen/index'),
  style: require('./style/index')
};

},{"./lib/index":10,"./pen/index":15,"./style/index":19}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var Component, Event, localizeEventCoordinates,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

localizeEventCoordinates = require('../helper/localize-event-coordinates');

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

  Component.prototype.mousemoveCaptureListener = function(event) {
    var $, ref, ref1, ref2, ref3, ref4, zones;
    Component.__super__.mousemoveCaptureListener.apply(this, arguments);
    $ = this.___runtime;
    this.state = null;
    if ($.grab) {
      this.state = 'active';
      if ((ref = this.events) != null ? ref.drag : void 0) {
        this.broadcastEvent(new Event({
          type: 'drag',
          x: event.x,
          y: event.y,
          offsetX: event.x - (((ref1 = $.dragEvent) != null ? ref1.x : void 0) || ((ref2 = $.grabEvent) != null ? ref2.x : void 0) || 0),
          offsetY: event.y - (((ref3 = $.dragEvent) != null ? ref3.y : void 0) || ((ref4 = $.grabEvent) != null ? ref4.y : void 0) || 0)
        }));
      }
    } else if (zones = event.zones) {
      this.state = (zones.hover ? 'hover' : zones.normal ? 'normal' : void 0);
    }
    return this;
  };

  Component.prototype.mouseupCaptureListener = function(event) {
    var $, ref, zones;
    Component.__super__.mouseupCaptureListener.apply(this, arguments);
    $ = this.___runtime;
    this.state = null;
    if ($.grab) {
      $.grab = false;
      if ((ref = this.events) != null ? ref.release : void 0) {
        this.broadcastEvent($.releaseEvent = new Event({
          type: 'release',
          x: event.x,
          y: event.y
        }));
      }
    }
    if (zones = event.zones) {
      this.state = (zones.hover ? 'hover' : zones.normal ? 'normal' : void 0);
    }
    return this;
  };

  Component.prototype.mousedownListener = function(event) {
    var $, ref;
    Component.__super__.mousedownListener.apply(this, arguments);
    if ((this.state === 'active') && ((ref = this.events) != null ? ref.grab : void 0)) {
      ($ = this.___runtime).grab = true;
      $.dragEvent = null;
      this.broadcastEvent(new Event({
        type: 'grab',
        x: event.x,
        y: event.y
      }));
    }
    return this;
  };

  Component.prototype.dragCaptureListener = function(event) {
    this.___runtime.dragEvent = event;
    localizeEventCoordinates(event, this.origin);
    return this;
  };

  Component.prototype.grabCaptureListener = function(event) {
    this.___runtime.grabEvent = event;
    return;
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

},{"../helper/localize-event-coordinates":3,"./event":8,"./shape":13,"extends__":21}],7:[function(require,module,exports){
var Element, Event, localizeEventCoordinates,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

localizeEventCoordinates = require('../helper/localize-event-coordinates');

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

},{"../helper/localize-event-coordinates":3,"./event":8,"./evented":9,"extends__":21}],8:[function(require,module,exports){
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
    } else if ((arguments.length < 2) && typeof args === 'function') {
      callback = args;
      args = {};
    }
    for (key in args) {
      value = args[key];
      this[key] = value;
    }
    if (callback && !this.callback) {
      this.callback = callback;
    }
    if ((args.timestamp === true) || !args.hasOwnProperty('timestamp')) {
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

},{"./base":5,"extends__":21}],9:[function(require,module,exports){
var Event, Evented,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

module.exports = Evented = (function(superClass) {
  extend(Evented, superClass);

  function Evented(args) {
    var key, ref, value;
    Evented.__super__.constructor.apply(this, arguments);
    this.events || (this.events = {});
    ref = args != null ? args.events : void 0;
    for (key in ref) {
      value = ref[key];
      this.events[key] = value;
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
    if (this.events[type] && typeof listener === 'function') {
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
    if ((type = event != null ? event.type : void 0) && this.events[type] && !event.aborted) {
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

  Evented.prototype.broadcastEvent = function(event) {
    var child, i, len, phase, ref, ref1, type;
    if (type = event != null ? event.type : void 0) {
      if (!(event.aborted || event.done || event.phase === 3)) {
        event.start();
        event.source || (event.source = this);
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

},{"./event":8,"./node":11,"extends__":21}],10:[function(require,module,exports){
module.exports = {
  Base: require('./base'),
  Event: require('./event'),
  Node: require('./node'),
  Evented: require('./evented'),
  Element: require('./element'),
  Shape: require('./shape'),
  Component: require('./component'),
  Pen: require('./pen'),
  Style: require('./style')
};

},{"./base":5,"./component":6,"./element":7,"./event":8,"./evented":9,"./node":11,"./pen":12,"./shape":13,"./style":14}],11:[function(require,module,exports){
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

},{"./base":5,"extends__":21}],12:[function(require,module,exports){
var Pen,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Pen = (function(superClass) {
  extend(Pen, superClass);

  function Pen() {
    return (function(_this) {
      return function() {
        var ref;
        return (ref = _this.draw) != null ? ref.apply(_this, arguments) : void 0;
      };
    })(this);
  }

  return Pen;

})(require('./base'));

},{"./base":5,"extends__":21}],13:[function(require,module,exports){
var Event, Shape, findPointZones,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

findPointZones = require('../helper/find-point-zones');

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
    if ((zones = findPointZones(event.localX, event.localY, this.zones))) {
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
    if ((zones = findPointZones(event.localX, event.localY, this.zones))) {
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

},{"../helper/find-point-zones":2,"./element":7,"./event":8,"extends__":21}],14:[function(require,module,exports){
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

},{"./base":5,"extends__":21}],15:[function(require,module,exports){
module.exports = {
  Rectangle: require('./rectangle'),
  Line: require('./line'),
  Text: require('./text')
};

},{"./line":16,"./rectangle":17,"./text":18}],16:[function(require,module,exports){
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

},{"../lib/pen":12,"extends__":21}],17:[function(require,module,exports){
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

},{"../lib/pen":12,"extends__":21}],18:[function(require,module,exports){
var Text,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Text = (function(superClass) {
  extend(Text, superClass);

  function Text(args) {
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
    return Text.__super__.constructor.apply(this, arguments);
  }

  Text.prototype.draw = function(context, args) {
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

  return Text;

})(require('../lib/pen'));

},{"../lib/pen":12,"extends__":21}],19:[function(require,module,exports){
module.exports = {
  Shape: require('./shape')
};

},{"./shape":20}],20:[function(require,module,exports){
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

},{"../lib/style":14,"extends__":21}],21:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9oZWxwZXIvZmluZC1wb2ludC16b25lcy5qcyIsImJ1aWxkL2hlbHBlci9sb2NhbGl6ZS1ldmVudC1jb29yZGluYXRlcy5qcyIsImJ1aWxkL2luZGV4LmpzIiwiYnVpbGQvbGliL2Jhc2UuanMiLCJidWlsZC9saWIvY29tcG9uZW50LmpzIiwiYnVpbGQvbGliL2VsZW1lbnQuanMiLCJidWlsZC9saWIvZXZlbnQuanMiLCJidWlsZC9saWIvZXZlbnRlZC5qcyIsImJ1aWxkL2xpYi9pbmRleC5qcyIsImJ1aWxkL2xpYi9ub2RlLmpzIiwiYnVpbGQvbGliL3Blbi5qcyIsImJ1aWxkL2xpYi9zaGFwZS5qcyIsImJ1aWxkL2xpYi9zdHlsZS5qcyIsImJ1aWxkL3Blbi9pbmRleC5qcyIsImJ1aWxkL3Blbi9saW5lLmpzIiwiYnVpbGQvcGVuL3JlY3RhbmdsZS5qcyIsImJ1aWxkL3Blbi90ZXh0LmpzIiwiYnVpbGQvc3R5bGUvaW5kZXguanMiLCJidWlsZC9zdHlsZS9zaGFwZS5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmRzX18vZGlzdC9leHRlbmRzX18uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5jbmwgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHgsIHksIHpvbmVzKSB7XG4gIHZhciAkLCBuYW1lLCByZXN1bHQ7XG4gIHJlc3VsdCA9IHt9O1xuICBmb3IgKG5hbWUgaW4gem9uZXMpIHtcbiAgICAkID0gem9uZXNbbmFtZV07XG4gICAgaWYgKCgkWzBdIDw9IHggJiYgeCA8PSAoJFswXSArICRbMl0pKSAmJiAoJFsxXSA8PSB5ICYmIHkgPD0gKCRbMV0gKyAkWzNdKSkpIHtcbiAgICAgIHJlc3VsdFtuYW1lXSA9ICQ7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihldmVudCwgb3JpZ2luKSB7XG4gIGV2ZW50LmxvY2FsWCA9IChldmVudC5sb2NhbFggIT0gbnVsbCA/IGV2ZW50LmxvY2FsWCA6IGV2ZW50LngpIC0gKChvcmlnaW4gIT0gbnVsbCA/IG9yaWdpbi54IDogdm9pZCAwKSB8fCAwKTtcbiAgcmV0dXJuIGV2ZW50LmxvY2FsWSA9IChldmVudC5sb2NhbFkgIT0gbnVsbCA/IGV2ZW50LmxvY2FsWSA6IGV2ZW50LnkpIC0gKChvcmlnaW4gIT0gbnVsbCA/IG9yaWdpbi55IDogdm9pZCAwKSB8fCAwKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGliOiByZXF1aXJlKCcuL2xpYi9pbmRleCcpLFxuICBwZW46IHJlcXVpcmUoJy4vcGVuL2luZGV4JyksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlL2luZGV4Jylcbn07XG4iLCJ2YXIgQmFzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX19fcnVudGltZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB7fVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKCk7XG4iLCJ2YXIgQ29tcG9uZW50LCBFdmVudCwgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5sb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMgPSByZXF1aXJlKCcuLi9oZWxwZXIvbG9jYWxpemUtZXZlbnQtY29vcmRpbmF0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQ29tcG9uZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDb21wb25lbnQoYXJncykge1xuICAgIHZhciBmbiwgaSwgaiwgbGVuLCBsZW4xLCBuYW1lLCByZWYsIHJlZjE7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBDb21wb25lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmVmID0gWydncmFiJywgJ3JlbGVhc2UnLCAnZHJhZyddO1xuICAgIGZuID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWYxO1xuICAgICAgICAgIGlmICghKChyZWYxID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYxW25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIHRydWUpO1xuICAgICAgICByZXR1cm4gX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmMTtcbiAgICAgICAgICBpZiAoISgocmVmMSA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmMVtuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCBmYWxzZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbmFtZSA9IHJlZltpXTtcbiAgICAgIGZuKG5hbWUpO1xuICAgIH1cbiAgICByZWYxID0gWydncmFiJywgJ3JlbGVhc2UnLCAnZHJhZyddO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYxLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbmFtZSA9IHJlZjFbal07XG4gICAgICB0aGlzLmFkZExpc3RlbmVyKG5hbWUsIHRoaXNbbmFtZSArIFwiQ2FwdHVyZUxpc3RlbmVyXCJdLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNlbW92ZUNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyICQsIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcmVmNCwgem9uZXM7XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAkID0gdGhpcy5fX19ydW50aW1lO1xuICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuICAgIGlmICgkLmdyYWIpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSAnYWN0aXZlJztcbiAgICAgIGlmICgocmVmID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYuZHJhZyA6IHZvaWQgMCkge1xuICAgICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgICAgdHlwZTogJ2RyYWcnLFxuICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgeTogZXZlbnQueSxcbiAgICAgICAgICBvZmZzZXRYOiBldmVudC54IC0gKCgocmVmMSA9ICQuZHJhZ0V2ZW50KSAhPSBudWxsID8gcmVmMS54IDogdm9pZCAwKSB8fCAoKHJlZjIgPSAkLmdyYWJFdmVudCkgIT0gbnVsbCA/IHJlZjIueCA6IHZvaWQgMCkgfHwgMCksXG4gICAgICAgICAgb2Zmc2V0WTogZXZlbnQueSAtICgoKHJlZjMgPSAkLmRyYWdFdmVudCkgIT0gbnVsbCA/IHJlZjMueSA6IHZvaWQgMCkgfHwgKChyZWY0ID0gJC5ncmFiRXZlbnQpICE9IG51bGwgPyByZWY0LnkgOiB2b2lkIDApIHx8IDApXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHpvbmVzID0gZXZlbnQuem9uZXMpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSAoem9uZXMuaG92ZXIgPyAnaG92ZXInIDogem9uZXMubm9ybWFsID8gJ25vcm1hbCcgOiB2b2lkIDApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciAkLCByZWYsIHpvbmVzO1xuICAgIENvbXBvbmVudC5fX3N1cGVyX18ubW91c2V1cENhcHR1cmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICQgPSB0aGlzLl9fX3J1bnRpbWU7XG4gICAgdGhpcy5zdGF0ZSA9IG51bGw7XG4gICAgaWYgKCQuZ3JhYikge1xuICAgICAgJC5ncmFiID0gZmFsc2U7XG4gICAgICBpZiAoKHJlZiA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmLnJlbGVhc2UgOiB2b2lkIDApIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RFdmVudCgkLnJlbGVhc2VFdmVudCA9IG5ldyBFdmVudCh7XG4gICAgICAgICAgdHlwZTogJ3JlbGVhc2UnLFxuICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgeTogZXZlbnQueVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh6b25lcyA9IGV2ZW50LnpvbmVzKSB7XG4gICAgICB0aGlzLnN0YXRlID0gKHpvbmVzLmhvdmVyID8gJ2hvdmVyJyA6IHpvbmVzLm5vcm1hbCA/ICdub3JtYWwnIDogdm9pZCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyICQsIHJlZjtcbiAgICBDb21wb25lbnQuX19zdXBlcl9fLm1vdXNlZG93bkxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCh0aGlzLnN0YXRlID09PSAnYWN0aXZlJykgJiYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi5ncmFiIDogdm9pZCAwKSkge1xuICAgICAgKCQgPSB0aGlzLl9fX3J1bnRpbWUpLmdyYWIgPSB0cnVlO1xuICAgICAgJC5kcmFnRXZlbnQgPSBudWxsO1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZ3JhYicsXG4gICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgIHk6IGV2ZW50LnlcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5kcmFnQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUuZHJhZ0V2ZW50ID0gZXZlbnQ7XG4gICAgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50LCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5ncmFiQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUuZ3JhYkV2ZW50ID0gZXZlbnQ7XG4gICAgcmV0dXJuO1xuICAgIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyhldmVudCwgdGhpcy5vcmlnaW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUucmVsZWFzZUNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fX19ydW50aW1lLnJlbGVhc2VFdmVudCA9IGV2ZW50O1xuICAgIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyhldmVudCwgdGhpcy5vcmlnaW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZHJhZ0xpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5ncmFiTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLnJlbGVhc2VMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBDb21wb25lbnQ7XG5cbn0pKHJlcXVpcmUoJy4vc2hhcGUnKSk7XG4iLCJ2YXIgRWxlbWVudCwgRXZlbnQsIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubG9jYWxpemVFdmVudENvb3JkaW5hdGVzID0gcmVxdWlyZSgnLi4vaGVscGVyL2xvY2FsaXplLWV2ZW50LWNvb3JkaW5hdGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFbGVtZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbGVtZW50KGFyZ3MpIHtcbiAgICB2YXIgZm4sIGksIGosIGssIGtleSwgbGVuLCBsZW4xLCBsZW4yLCBuYW1lLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHZhbHVlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgRWxlbWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZWYgPSBbJ29yaWdpbicsICdzaXplJywgJ3N0YXRlJywgJ3N0eWxlJ107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSByZWZbaV07XG4gICAgICBpZiAoYXJnc1trZXldKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IGFyZ3Nba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVmMSA9IGFyZ3Muc3R5bGVzO1xuICAgIGZvciAoa2V5IGluIHJlZjEpIHtcbiAgICAgIHZhbHVlID0gcmVmMVtrZXldO1xuICAgICAgKHRoaXMuc3R5bGVzIHx8ICh0aGlzLnN0eWxlcyA9IHt9KSkgJiYgKHRoaXMuc3R5bGVzW2tleV0gPSB2YWx1ZSk7XG4gICAgfVxuICAgIHJlZjIgPSBhcmdzLnN0YXRlcztcbiAgICBmb3IgKGtleSBpbiByZWYyKSB7XG4gICAgICB2YWx1ZSA9IHJlZjJba2V5XTtcbiAgICAgICh0aGlzLnN0YXRlcyB8fCAodGhpcy5zdGF0ZXMgPSB7fSkpICYmICh0aGlzLnN0YXRlc1trZXldID0gdmFsdWUpO1xuICAgIH1cbiAgICByZWYzID0gWydtb3VzZW1vdmUnLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAndXBkYXRlJywgJ3JlbmRlciddO1xuICAgIGZuID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWY0O1xuICAgICAgICAgIGlmICghKChyZWY0ID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWY0W25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIHRydWUpO1xuICAgICAgICByZXR1cm4gX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmNDtcbiAgICAgICAgICBpZiAoISgocmVmNCA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmNFtuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCBmYWxzZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbmFtZSA9IHJlZjNbal07XG4gICAgICBmbihuYW1lKTtcbiAgICB9XG4gICAgcmVmNCA9IFsnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJ107XG4gICAgZm9yIChrID0gMCwgbGVuMiA9IHJlZjQubGVuZ3RoOyBrIDwgbGVuMjsgaysrKSB7XG4gICAgICBuYW1lID0gcmVmNFtrXTtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIobmFtZSwgdGhpc1tuYW1lICsgXCJDYXB0dXJlTGlzdGVuZXJcIl0sIHRydWUpO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCB0aGlzW25hbWUgKyBcIkxpc3RlbmVyXCJdLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2Vtb3ZlQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUubW91c2Vtb3ZlRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZWRvd25DYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5tb3VzZWRvd25FdmVudCA9IGV2ZW50O1xuICAgIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyhldmVudCwgdGhpcy5vcmlnaW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5tb3VzZXVwRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNldXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oYXJncykge1xuICAgIHZhciByZWY7XG4gICAgaWYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi51cGRhdGUgOiB2b2lkIDApIHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ3VwZGF0ZScsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgYXJnczogYXJnc1xuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgdmFyIGNoaWxkLCBjaGlsZHJlbiwgaSwgbGVuLCByZWY7XG4gICAgaWYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi5yZW5kZXIgOiB2b2lkIDApIHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ3JlbmRlcicsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgYXJnczogYXJnc1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBjaGlsZC5yZW5kZXIoY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFbGVtZW50O1xuXG59KShyZXF1aXJlKCcuL2V2ZW50ZWQnKSk7XG4iLCJ2YXIgRXZlbnQsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFdmVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnQoYXJncywgY2FsbGJhY2spIHtcbiAgICB2YXIgZGF0ZSwga2V5LCBwZXJmLCB2YWx1ZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZ3MgPSB7XG4gICAgICAgIHR5cGU6IGFyZ3NcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpICYmIHR5cGVvZiBhcmdzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGFyZ3M7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGZvciAoa2V5IGluIGFyZ3MpIHtcbiAgICAgIHZhbHVlID0gYXJnc1trZXldO1xuICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayAmJiAhdGhpcy5jYWxsYmFjaykge1xuICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBpZiAoKGFyZ3MudGltZXN0YW1wID09PSB0cnVlKSB8fCAhYXJncy5oYXNPd25Qcm9wZXJ0eSgndGltZXN0YW1wJykpIHtcbiAgICAgIGRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgcGVyZiA9ICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwgPyBwZXJmb3JtYW5jZS5ub3coKSA6IHZvaWQgMCkgfHwgMDtcbiAgICAgIHRoaXMudGltZXN0YW1wID0gMTAwMCAqIGRhdGUgKyBNYXRoLmZsb29yKDEwMDAgKiAocGVyZiAtIE1hdGguZmxvb3IocGVyZikpKTtcbiAgICB9XG4gIH1cblxuICBFdmVudC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuc3RhcnRlZCA9IHRydWUpICYmIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuc3RvcHBlZCA9IHRydWUpICYmIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5jYW5jZWxlZCA9IHRydWUpICYmIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLmFib3J0ZWQgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuZG9uZSA9IHRydWUpICYmIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50O1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJ2YXIgRXZlbnQsIEV2ZW50ZWQsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRlZCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFdmVudGVkLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFdmVudGVkKGFyZ3MpIHtcbiAgICB2YXIga2V5LCByZWYsIHZhbHVlO1xuICAgIEV2ZW50ZWQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5ldmVudHMgfHwgKHRoaXMuZXZlbnRzID0ge30pO1xuICAgIHJlZiA9IGFyZ3MgIT0gbnVsbCA/IGFyZ3MuZXZlbnRzIDogdm9pZCAwO1xuICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgIHRoaXMuZXZlbnRzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbe30sIHt9XTtcbiAgfVxuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgYmFzZSwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodGhpcy5ldmVudHNbdHlwZV0gJiYgdHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsaXN0ZW5lcnMgPSAoKGJhc2UgPSB0aGlzLmxpc3RlbmVyc1tjYXB0dXJlID09PSB0cnVlID8gMSA6IDBdKVt0eXBlXSB8fCAoYmFzZVt0eXBlXSA9IFtdKSk7XG4gICAgICBpZiAoLTEgPT09IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSkge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50ZWQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgaWR4LCBsaXN0ZW5lcnMsIHJlZjtcbiAgICBpZiAoY2FwdHVyZSA9PSBudWxsKSB7XG4gICAgICBjYXB0dXJlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZWYgPSB0eXBlLCB0eXBlID0gcmVmLnR5cGUsIGxpc3RlbmVyID0gcmVmLmxpc3RlbmVyLCBjYXB0dXJlID0gcmVmLmNhcHR1cmU7XG4gICAgfVxuICAgIGlmICh0eXBlICYmIHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2NhcHR1cmUgPT09IHRydWUgPyAxIDogMF1bdHlwZV0pIHtcbiAgICAgICAgaWYgKC0xICE9PSAoaWR4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpKSkge1xuICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSwgbGVuLCBsaXN0ZW5lciwgbGlzdGVuZXJzLCBwaGFzZSwgdHlwZTtcbiAgICBpZiAoKHR5cGUgPSBldmVudCAhPSBudWxsID8gZXZlbnQudHlwZSA6IHZvaWQgMCkgJiYgdGhpcy5ldmVudHNbdHlwZV0gJiYgIWV2ZW50LmFib3J0ZWQpIHtcbiAgICAgIHBoYXNlID0gZXZlbnQucGhhc2U7XG4gICAgICBpZiAocGhhc2UgPiAwICYmIHBoYXNlIDwgMyAmJiAobGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbMiAtIHBoYXNlXVt0eXBlXSkpIHtcbiAgICAgICAgZXZlbnQuc3RhcnQoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICAgICAgaWYgKGV2ZW50LnN0b3BwZWQgfHwgZXZlbnQuYWJvcnRlZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmJyb2FkY2FzdEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgY2hpbGQsIGksIGxlbiwgcGhhc2UsIHJlZiwgcmVmMSwgdHlwZTtcbiAgICBpZiAodHlwZSA9IGV2ZW50ICE9IG51bGwgPyBldmVudC50eXBlIDogdm9pZCAwKSB7XG4gICAgICBpZiAoIShldmVudC5hYm9ydGVkIHx8IGV2ZW50LmRvbmUgfHwgZXZlbnQucGhhc2UgPT09IDMpKSB7XG4gICAgICAgIGV2ZW50LnN0YXJ0KCk7XG4gICAgICAgIGV2ZW50LnNvdXJjZSB8fCAoZXZlbnQuc291cmNlID0gdGhpcyk7XG4gICAgICAgIHBoYXNlID0gKGV2ZW50LnBoYXNlIHx8IChldmVudC5waGFzZSA9IDEpKTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZWYgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDEgJiYgIWV2ZW50LmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5icm9hZGNhc3RFdmVudChldmVudCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDIpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IHRoaXMpIHtcbiAgICAgICAgICBpZiAoIShldmVudC5jYW5jZWxlZCB8fCBldmVudC5hYm9ydGVkIHx8IGV2ZW50LmRvbmUgfHwgZXZlbnQucGhhc2UgPT09IDMpKSB7XG4gICAgICAgICAgICBpZiAoKHJlZjEgPSBldmVudC5jYWxsYmFjaykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlZjEuY2FsbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVmMS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudC5waGFzZSA9IDM7XG4gICAgICAgICAgZXZlbnQuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50ZWQ7XG5cbn0pKHJlcXVpcmUoJy4vbm9kZScpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBCYXNlOiByZXF1aXJlKCcuL2Jhc2UnKSxcbiAgRXZlbnQ6IHJlcXVpcmUoJy4vZXZlbnQnKSxcbiAgTm9kZTogcmVxdWlyZSgnLi9ub2RlJyksXG4gIEV2ZW50ZWQ6IHJlcXVpcmUoJy4vZXZlbnRlZCcpLFxuICBFbGVtZW50OiByZXF1aXJlKCcuL2VsZW1lbnQnKSxcbiAgU2hhcGU6IHJlcXVpcmUoJy4vc2hhcGUnKSxcbiAgQ29tcG9uZW50OiByZXF1aXJlKCcuL2NvbXBvbmVudCcpLFxuICBQZW46IHJlcXVpcmUoJy4vcGVuJyksXG4gIFN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJylcbn07XG4iLCJ2YXIgTm9kZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTm9kZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTm9kZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBOb2RlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGFyZ3MuY2hpbGRyZW4gJiYgKHRoaXMuY2hpbGRyZW4gPSBhcmdzLmNoaWxkcmVuKTtcbiAgICBhcmdzLnBhcmVudCAmJiAodGhpcy5wYXJlbnQgPSBhcmdzLnBhcmVudCk7XG4gIH1cblxuICBOb2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHJlZjtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlICYmICh0aGlzLmNoaWxkcmVuIHx8ICh0aGlzLmNoaWxkcmVuID0gW10pKSkge1xuICAgICAgaWYgKC0xID09PSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSB7XG4gICAgICAgIGlmICgocmVmID0gY2hpbGQucGFyZW50KSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZWYucmVtb3ZlQ2hpbGQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmVmLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciBpZHg7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSAmJiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoLTEgIT09IChpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSkge1xuICAgICAgICBkZWxldGUgY2hpbGQucGFyZW50O1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNoaWxkcmVuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gTm9kZTtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIFBlbixcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBlbiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChQZW4sIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFBlbigpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHJldHVybiAocmVmID0gX3RoaXMuZHJhdykgIT0gbnVsbCA/IHJlZi5hcHBseShfdGhpcywgYXJndW1lbnRzKSA6IHZvaWQgMDtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gIH1cblxuICByZXR1cm4gUGVuO1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJ2YXIgRXZlbnQsIFNoYXBlLCBmaW5kUG9pbnRab25lcyxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxuZmluZFBvaW50Wm9uZXMgPSByZXF1aXJlKCcuLi9oZWxwZXIvZmluZC1wb2ludC16b25lcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFNoYXBlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTaGFwZShhcmdzKSB7XG4gICAgdmFyIGZuLCBpLCBrZXksIGxlbiwgbmFtZSwgcmVmLCByZWYxLCB2YWx1ZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIFNoYXBlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJlZiA9IGFyZ3Muem9uZXM7XG4gICAgZm9yIChrZXkgaW4gcmVmKSB7XG4gICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgKHRoaXMuem9uZXMgfHwgKHRoaXMuem9uZXMgPSB7fSkpICYmICh0aGlzLnpvbmVzW2tleV0gPSB2YWx1ZSk7XG4gICAgfVxuICAgIHJlZjEgPSBbJ2RyYXcnXTtcbiAgICBmbiA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmMjtcbiAgICAgICAgICBpZiAoISgocmVmMiA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmMltuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIF90aGlzLmFkZExpc3RlbmVyKG5hbWUsIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHJlZjI7XG4gICAgICAgICAgaWYgKCEoKHJlZjIgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjJbbmFtZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgZmFsc2UpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBuYW1lID0gcmVmMVtpXTtcbiAgICAgIGZuKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIFNoYXBlLnByb3RvdHlwZS5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpLCBsZW4sIG5hbWUsIHJlZiwgc3RhdGUsIHpvbmVzO1xuICAgIFNoYXBlLl9fc3VwZXJfXy5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoKHpvbmVzID0gZmluZFBvaW50Wm9uZXMoZXZlbnQubG9jYWxYLCBldmVudC5sb2NhbFksIHRoaXMuem9uZXMpKSkge1xuICAgICAgZXZlbnQuem9uZXMgPSB6b25lcztcbiAgICAgIHJlZiA9IFsnYWN0aXZlJywgJ2hvdmVyJywgJ25vcm1hbCddO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSByZWZbaV07XG4gICAgICAgIGlmICghem9uZXNbbmFtZV0pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IG5hbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLnN0YXRlID0gc3RhdGUgfHwgbnVsbCkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2hhcGUucHJvdG90eXBlLm1vdXNlZG93bkNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbmFtZSwgcmVmLCBzdGF0ZSwgem9uZXM7XG4gICAgU2hhcGUuX19zdXBlcl9fLm1vdXNlZG93bkNhcHR1cmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICgoem9uZXMgPSBmaW5kUG9pbnRab25lcyhldmVudC5sb2NhbFgsIGV2ZW50LmxvY2FsWSwgdGhpcy56b25lcykpKSB7XG4gICAgICBldmVudC56b25lcyA9IHpvbmVzO1xuICAgICAgcmVmID0gWydhY3RpdmUnLCAnaG92ZXInLCAnbm9ybWFsJ107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IHJlZltpXTtcbiAgICAgICAgaWYgKCF6b25lc1tuYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBudWxsKSkge1xuICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGFwZS5wcm90b3R5cGUubW91c2V1cENhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbmFtZSwgcmVmLCBzdGF0ZSwgem9uZXM7XG4gICAgU2hhcGUuX19zdXBlcl9fLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoem9uZXMgPSBmaW5kUG9pbnRab25lcyhldmVudC5sb2NhbFgsIGV2ZW50LmxvY2FsWSwgdGhpcy56b25lcykpIHtcbiAgICAgIGV2ZW50LnpvbmVzID0gem9uZXM7XG4gICAgICByZWYgPSBbJ2FjdGl2ZScsICdob3ZlcicsICdub3JtYWwnXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBuYW1lID0gcmVmW2ldO1xuICAgICAgICBpZiAoIXpvbmVzW25hbWVdKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBuYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5zdGF0ZSA9IHN0YXRlIHx8IG51bGwpKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciByZWY7XG4gICAgaWYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi5kcmF3IDogdm9pZCAwKSB7XG4gICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgIHR5cGU6ICdkcmF3JyxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBTaGFwZTtcblxufSkocmVxdWlyZSgnLi9lbGVtZW50JykpO1xuIiwidmFyIFN0eWxlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU3R5bGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFN0eWxlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIFN0eWxlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhcmdzLm1hcHBlcikge1xuICAgICAgdGhpcy5tYXBwZXIgPSBhcmdzLm1hcHBlcjtcbiAgICB9XG4gICAgdGhpcy5kYXRhID0gYXJncy5kYXRhIHx8IHt9O1xuICB9XG5cbiAgU3R5bGUucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbihqc29uLCBjYWxsYmFjaykge1xuICAgIGlmIChqc29uKSB7XG4gICAgICB0aGlzLm1hcHBlcihqc29uLCB0aGlzLmRhdGEsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU3R5bGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCBrZXksIGtleXMsIGxlbiwgbGVuZ3RoLCByZXN1bHQ7XG4gICAga2V5cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmICghKGxlbmd0aCA9IGtleXMubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG4gICAgcmVzdWx0ID0gW107XG4gICAgaWYgKGxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGtleXMgPSBrZXlzWzBdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBrZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKHRoaXMuZGF0YVtrZXldICE9IG51bGwpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5kYXRhW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEgPyByZXN1bHRbMF0gOiByZXN1bHQpO1xuICB9O1xuXG4gIFN0eWxlLnByb3RvdHlwZS5tYXBwZXIgPSBmdW5jdGlvbihkYXRhLCBjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9O1xuXG4gIHJldHVybiBTdHlsZTtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlY3RhbmdsZTogcmVxdWlyZSgnLi9yZWN0YW5nbGUnKSxcbiAgTGluZTogcmVxdWlyZSgnLi9saW5lJyksXG4gIFRleHQ6IHJlcXVpcmUoJy4vdGV4dCcpXG59O1xuIiwidmFyIExpbmUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExpbmUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExpbmUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IGFyZ3Muc3RhcnQgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuZW5kID0gYXJncy5lbmQgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UsIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGg7XG4gICAgdGhpcy5maWxsID0gYXJncy5maWxsLCB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHJldHVybiBMaW5lLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgTGluZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgZW5kLCBsaW5lV2lkdGgsIHN0YXJ0LCBzdHJva2U7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgc3RhcnQgPSBhcmdzLnN0YXJ0IHx8IHRoaXMuc3RhcnQgfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgZW5kID0gYXJncy5lbmQgfHwgdGhpcy5lbmQgfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBsaW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICAgIGlmIChsaW5lV2lkdGggJSAyKSB7XG4gICAgICAgIHN0YXJ0LnggKz0gMC41O1xuICAgICAgICBzdGFydC55ICs9IDAuNTtcbiAgICAgICAgZW5kLnggKz0gMC41O1xuICAgICAgICBlbmQueSArPSAwLjU7XG4gICAgICB9XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB9XG4gICAgICBjb250ZXh0Lm1vdmVUbyhzdGFydC54LCBzdGFydC55KTtcbiAgICAgIGNvbnRleHQubGluZVRvKGVuZC54LCBlbmQueSk7XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2U7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGV4dC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIExpbmU7XG5cbn0pKHJlcXVpcmUoJy4uL2xpYi9wZW4nKSk7XG4iLCJ2YXIgUmVjdGFuZ2xlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFJlY3RhbmdsZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gUmVjdGFuZ2xlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuc2l6ZSA9IGFyZ3Muc2l6ZSB8fCB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMFxuICAgIH07XG4gICAgdGhpcy5vcmlnaW4gPSBhcmdzLm9yaWdpbjtcbiAgICB0aGlzLmZpbGwgPSBhcmdzLmZpbGwsIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UsIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGg7XG4gICAgcmV0dXJuIFJlY3RhbmdsZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFJlY3RhbmdsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgZmlsbCwgbGluZVdpZHRoLCBvcmlnaW4sIHNpemUsIHN0cm9rZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBvcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBzaXplID0gYXJncy5zaXplIHx8IHRoaXMuc2l6ZSB8fCB7XG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgIH07XG4gICAgICBmaWxsID0gYXJncy5maWxsIHx8IHRoaXMuZmlsbDtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgbGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgICBpZiAobGluZVdpZHRoICUgMikge1xuICAgICAgICBvcmlnaW4ueCArPSAwLjU7XG4gICAgICAgIG9yaWdpbi55ICs9IDAuNTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgICBvcmlnaW4ueCA9IG9yaWdpbi55ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIHx8IHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KG9yaWdpbi54LCBvcmlnaW4ueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KG9yaWdpbi54LCBvcmlnaW4ueSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gUmVjdGFuZ2xlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwidmFyIFRleHQsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFRleHQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFRleHQoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5vcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5mb250ID0gYXJncy5mb250IHx8IHRoaXMuZm9udDtcbiAgICB0aGlzLmZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgIHRoaXMuc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aCB8fCB0aGlzLmxpbmVXaWR0aDtcbiAgICB0aGlzLmJhc2VsaW5lID0gYXJncy5iYXNlbGluZSB8fCB0aGlzLmJhc2VsaW5lO1xuICAgIHJldHVybiBUZXh0Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgVGV4dC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYmFzZWxpbmUsIGZpbGwsIGZvbnQsIG9yaWdpbiwgc3Ryb2tlLCB0ZXh0O1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQgJiYgKHRleHQgPSBhcmdzLnRleHQpKSB7XG4gICAgICBvcmlnaW4gPSBhcmdzLm9yaWdpbiB8fCB0aGlzLm9yaWdpbiB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICBmb250ID0gYXJncy5mb250IHx8IHRoaXMuZm9udDtcbiAgICAgIGZpbGwgPSBhcmdzLmZpbGwgfHwgdGhpcy5maWxsO1xuICAgICAgc3Ryb2tlID0gYXJncy5zdHJva2UgfHwgdGhpcy5zdHJva2U7XG4gICAgICBiYXNlbGluZSA9IGFyZ3MuYmFzZWxpbmUgfHwgdGhpcy5iYXNlbGluZSB8fCAndG9wJztcbiAgICAgIGlmIChmaWxsIHx8IHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJhc2VsaW5lID0gYmFzZWxpbmU7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3JpZ2luLngsIG9yaWdpbi55KTtcbiAgICAgICAgb3JpZ2luLnggPSBvcmlnaW4ueSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoZm9udCkge1xuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250O1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICB9XG4gICAgICBpZiAoc3Ryb2tlKSB7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICByZXR1cm4gY29udGV4dC5zdHJva2VUZXh0KHRleHQsIG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBUZXh0O1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNoYXBlOiByZXF1aXJlKCcuL3NoYXBlJylcbn07XG4iLCJ2YXIgU2hhcGUsIF8sXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXyA9IGZ1bmN0aW9uKG8sIHApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoU2hhcGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFNoYXBlKCkge1xuICAgIHJldHVybiBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFNoYXBlLnByb3RvdHlwZS5tYXBwZXIgPSBmdW5jdGlvbihkYXRhLCBjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIHZhciBmaWxsLCBoZWlnaHQsIGltYWdlLCByZWYsIHJlcGVhdCwgdXJsLCB3aWR0aCwgeCwgeTtcbiAgICBpZiAoKF8oZGF0YSwgJ3dpZHRoJykpIHx8IChfKGRhdGEsICdoZWlnaHQnKSkpIHtcbiAgICAgIHdpZHRoID0gKHBhcnNlRmxvYXQoZGF0YVsnd2lkdGgnXSkpIHx8IDA7XG4gICAgICBoZWlnaHQgPSAocGFyc2VGbG9hdChkYXRhWydoZWlnaHQnXSkpIHx8IDA7XG4gICAgICBjb250ZXh0LnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgoXyhkYXRhLCAndG9wJykpIHx8IChfKGRhdGEsICdsZWZ0JykpKSB7XG4gICAgICB4ID0gKHBhcnNlRmxvYXQoZGF0YVsnbGVmdCddKSkgfHwgMDtcbiAgICAgIHkgPSAocGFyc2VGbG9hdChkYXRhWyd0b3AnXSkpIHx8IDA7XG4gICAgICBjb250ZXh0Lm9yaWdpbiA9IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2JhY2tncm91bmQnKSkge1xuICAgICAgY29udGV4dC5maWxsID0gZGF0YVsnYmFja2dyb3VuZCddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnZmlsbCcpKSB7XG4gICAgICBjb250ZXh0LmZpbGwgPSBkYXRhWydmaWxsJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdjb2xvcicpKSB7XG4gICAgICBjb250ZXh0LnN0cm9rZSA9IGRhdGFbJ2NvbG9yJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdzdHJva2UnKSkge1xuICAgICAgY29udGV4dC5zdHJva2UgPSBkYXRhWydzdHJva2UnXTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2xpbmUtd2lkdGgnKSkge1xuICAgICAgY29udGV4dC5saW5lIC0gKHdpZHRoID0gKHBhcnNlRmxvYXQoZGF0YVsnbGluZS13aWR0aCddKSkgfHwgMCk7XG4gICAgfVxuICAgIGlmICh1cmwgPSAocmVmID0gY29udGV4dC5maWxsKSAhPSBudWxsID8gcmVmLm1hdGNoKC91cmxcXChcXHMqKFtcIicnXT8pXFxzKiguKylcXDFcXCkvKSA6IHZvaWQgMCkge1xuICAgICAgdXJsID0gdXJsWzJdO1xuICAgICAgaWYgKHJlcGVhdCA9IGNvbnRleHQuZmlsbC5tYXRjaCgvKG5vcmVwZWF0fHJlcGVhdC14fHJlcGVhdC15KS8pKSB7XG4gICAgICAgIHJlcGVhdCA9IHJlcGVhdFsxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGVhdCA9IG51bGw7XG4gICAgICB9XG4gICAgICBmaWxsID0gbnVsbDtcbiAgICAgIChpbWFnZSA9IG5ldyBJbWFnZSkuc3JjID0gdXJsO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb250ZXh0LmZpbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLmNyZWF0ZVBhdHRlcm4oaW1hZ2UsIHJlcGVhdCB8fCAncmVwZWF0Jyk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICE9IG51bGwgPyBjYWxsYmFjay5jYWxsKF90aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgcmV0dXJuIGltYWdlLm9uZXJyb3IgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgIT0gbnVsbCA/IGNhbGxiYWNrLmNhbGwoX3RoaXMsIGUsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayAhPSBudWxsID8gY2FsbGJhY2suY2FsbCh0aGlzLCBudWxsLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNoYXBlO1xuXG59KShyZXF1aXJlKCcuLi9saWIvc3R5bGUnKSk7XG4iLCJ2YXIgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3Nlcykge1xuICB2YXIgTWl4aW5DbGFzcywgUGFyZW50Q2xhc3MsIGksIGtleSwgbGVuLCByZWYsIHZhbHVlO1xuICBpZiAoUGFyZW50Q2xhc3NlcyBpbnN0YW5jZW9mIEFycmF5ICYmIFBhcmVudENsYXNzZXMubGVuZ3RoKSB7XG4gICAgUGFyZW50Q2xhc3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgICAgZXh0ZW5kKFBhcmVudENsYXNzLCBzdXBlckNsYXNzKTtcblxuICAgICAgZnVuY3Rpb24gUGFyZW50Q2xhc3MoKSB7XG4gICAgICAgIHZhciBNaXhpbkNsYXNzLCBpLCBsZW47XG4gICAgICAgIFBhcmVudENsYXNzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBQYXJlbnRDbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICAgICAgTWl4aW5DbGFzcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQYXJlbnRDbGFzcztcblxuICAgIH0pKFBhcmVudENsYXNzZXMuc2hpZnQoKSk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICByZWYgPSBNaXhpbkNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICBpZiAoa2V5ICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgUGFyZW50Q2xhc3MucHJvdG90eXBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBQYXJlbnRDbGFzcyA9IFBhcmVudENsYXNzZXM7XG4gIH1cbiAgcmV0dXJuIGV4dGVuZChDaGlsZENsYXNzLCBQYXJlbnRDbGFzcyk7XG59O1xuIl19
