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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9oZWxwZXIvZmluZC1wb2ludC16b25lcy5qcyIsImJ1aWxkL2hlbHBlci9sb2NhbGl6ZS1ldmVudC1jb29yZGluYXRlcy5qcyIsImJ1aWxkL2luZGV4LmpzIiwiYnVpbGQvbGliL2Jhc2UuanMiLCJidWlsZC9saWIvY29tcG9uZW50LmpzIiwiYnVpbGQvbGliL2VsZW1lbnQuanMiLCJidWlsZC9saWIvZXZlbnQuanMiLCJidWlsZC9saWIvZXZlbnRlZC5qcyIsImJ1aWxkL2xpYi9pbmRleC5qcyIsImJ1aWxkL2xpYi9ub2RlLmpzIiwiYnVpbGQvbGliL3Blbi5qcyIsImJ1aWxkL2xpYi9zaGFwZS5qcyIsImJ1aWxkL2xpYi9zdHlsZS5qcyIsImJ1aWxkL3Blbi9pbmRleC5qcyIsImJ1aWxkL3Blbi9saW5lLmpzIiwiYnVpbGQvcGVuL3JlY3RhbmdsZS5qcyIsImJ1aWxkL3Blbi90ZXh0LmpzIiwiYnVpbGQvc3R5bGUvaW5kZXguanMiLCJidWlsZC9zdHlsZS9zaGFwZS5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmRzX18vZGlzdC9leHRlbmRzX18uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ3aW5kb3cuY25sID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih4LCB5LCB6b25lcykge1xuICB2YXIgJCwgbmFtZSwgcmVzdWx0O1xuICByZXN1bHQgPSB7fTtcbiAgZm9yIChuYW1lIGluIHpvbmVzKSB7XG4gICAgJCA9IHpvbmVzW25hbWVdO1xuICAgIGlmICgoJFswXSA8PSB4ICYmIHggPD0gKCRbMF0gKyAkWzJdKSkgJiYgKCRbMV0gPD0geSAmJiB5IDw9ICgkWzFdICsgJFszXSkpKSB7XG4gICAgICByZXN1bHRbbmFtZV0gPSAkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXZlbnQsIG9yaWdpbikge1xuICBldmVudC5sb2NhbFggPSAoZXZlbnQubG9jYWxYICE9IG51bGwgPyBldmVudC5sb2NhbFggOiBldmVudC54KSAtICgob3JpZ2luICE9IG51bGwgPyBvcmlnaW4ueCA6IHZvaWQgMCkgfHwgMCk7XG4gIHJldHVybiBldmVudC5sb2NhbFkgPSAoZXZlbnQubG9jYWxZICE9IG51bGwgPyBldmVudC5sb2NhbFkgOiBldmVudC55KSAtICgob3JpZ2luICE9IG51bGwgPyBvcmlnaW4ueSA6IHZvaWQgMCkgfHwgMCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxpYjogcmVxdWlyZSgnLi9saWIvaW5kZXgnKSxcbiAgcGVuOiByZXF1aXJlKCcuL3Blbi9pbmRleCcpLFxuICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZS9pbmRleCcpXG59O1xuIiwidmFyIEJhc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19fX3J1bnRpbWUnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZToge31cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBCYXNlO1xuXG59KSgpO1xuIiwidmFyIENvbXBvbmVudCwgRXZlbnQsIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKTtcblxubG9jYWxpemVFdmVudENvb3JkaW5hdGVzID0gcmVxdWlyZSgnLi4vaGVscGVyL2xvY2FsaXplLWV2ZW50LWNvb3JkaW5hdGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENvbXBvbmVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29tcG9uZW50KGFyZ3MpIHtcbiAgICB2YXIgZm4sIGksIGosIGxlbiwgbGVuMSwgbmFtZSwgcmVmLCByZWYxO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJlZiA9IFsnZ3JhYicsICdyZWxlYXNlJywgJ2RyYWcnXTtcbiAgICBmbiA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmMTtcbiAgICAgICAgICBpZiAoISgocmVmMSA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmMVtuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIF90aGlzLmFkZExpc3RlbmVyKG5hbWUsIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHJlZjE7XG4gICAgICAgICAgaWYgKCEoKHJlZjEgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjFbbmFtZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgZmFsc2UpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG5hbWUgPSByZWZbaV07XG4gICAgICBmbihuYW1lKTtcbiAgICB9XG4gICAgcmVmMSA9IFsnZ3JhYicsICdyZWxlYXNlJywgJ2RyYWcnXTtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG5hbWUgPSByZWYxW2pdO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCB0aGlzW25hbWUgKyBcIkNhcHR1cmVMaXN0ZW5lclwiXSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciAkLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHpvbmVzO1xuICAgIENvbXBvbmVudC5fX3N1cGVyX18ubW91c2Vtb3ZlQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgJCA9IHRoaXMuX19fcnVudGltZTtcbiAgICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgICBpZiAoJC5ncmFiKSB7XG4gICAgICB0aGlzLnN0YXRlID0gJ2FjdGl2ZSc7XG4gICAgICBpZiAoKHJlZiA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmLmRyYWcgOiB2b2lkIDApIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICAgIHR5cGU6ICdkcmFnJyxcbiAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgIHk6IGV2ZW50LnksXG4gICAgICAgICAgb2Zmc2V0WDogZXZlbnQueCAtICgoKHJlZjEgPSAkLmRyYWdFdmVudCkgIT0gbnVsbCA/IHJlZjEueCA6IHZvaWQgMCkgfHwgKChyZWYyID0gJC5ncmFiRXZlbnQpICE9IG51bGwgPyByZWYyLnggOiB2b2lkIDApIHx8IDApLFxuICAgICAgICAgIG9mZnNldFk6IGV2ZW50LnkgLSAoKChyZWYzID0gJC5kcmFnRXZlbnQpICE9IG51bGwgPyByZWYzLnkgOiB2b2lkIDApIHx8ICgocmVmNCA9ICQuZ3JhYkV2ZW50KSAhPSBudWxsID8gcmVmNC55IDogdm9pZCAwKSB8fCAwKVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh6b25lcyA9IGV2ZW50LnpvbmVzKSB7XG4gICAgICB0aGlzLnN0YXRlID0gKHpvbmVzLmhvdmVyID8gJ2hvdmVyJyA6IHpvbmVzLm5vcm1hbCA/ICdub3JtYWwnIDogdm9pZCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZXVwQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgJCwgcmVmLCB6b25lcztcbiAgICBDb21wb25lbnQuX19zdXBlcl9fLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAkID0gdGhpcy5fX19ydW50aW1lO1xuICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuICAgIGlmICgkLmdyYWIpIHtcbiAgICAgICQuZ3JhYiA9IGZhbHNlO1xuICAgICAgaWYgKChyZWYgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZi5yZWxlYXNlIDogdm9pZCAwKSB7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQoJC5yZWxlYXNlRXZlbnQgPSBuZXcgRXZlbnQoe1xuICAgICAgICAgIHR5cGU6ICdyZWxlYXNlJyxcbiAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgIHk6IGV2ZW50LnlcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoem9uZXMgPSBldmVudC56b25lcykge1xuICAgICAgdGhpcy5zdGF0ZSA9ICh6b25lcy5ob3ZlciA/ICdob3ZlcicgOiB6b25lcy5ub3JtYWwgPyAnbm9ybWFsJyA6IHZvaWQgMCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vkb3duTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciAkLCByZWY7XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5tb3VzZWRvd25MaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICgodGhpcy5zdGF0ZSA9PT0gJ2FjdGl2ZScpICYmICgocmVmID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYuZ3JhYiA6IHZvaWQgMCkpIHtcbiAgICAgICgkID0gdGhpcy5fX19ydW50aW1lKS5ncmFiID0gdHJ1ZTtcbiAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ2dyYWInLFxuICAgICAgICB4OiBldmVudC54LFxuICAgICAgICB5OiBldmVudC55XG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZHJhZ0NhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fX19ydW50aW1lLmRyYWdFdmVudCA9IGV2ZW50O1xuICAgIGxvY2FsaXplRXZlbnRDb29yZGluYXRlcyhldmVudCwgdGhpcy5vcmlnaW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZ3JhYkNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fX19ydW50aW1lLmdyYWJFdmVudCA9IGV2ZW50O1xuICAgIHJldHVybjtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLnJlbGVhc2VDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX19fcnVudGltZS5yZWxlYXNlRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLmRyYWdMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZ3JhYkxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5yZWxlYXNlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gQ29tcG9uZW50O1xuXG59KShyZXF1aXJlKCcuL3NoYXBlJykpO1xuIiwidmFyIEVsZW1lbnQsIEV2ZW50LCBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbmxvY2FsaXplRXZlbnRDb29yZGluYXRlcyA9IHJlcXVpcmUoJy4uL2hlbHBlci9sb2NhbGl6ZS1ldmVudC1jb29yZGluYXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRWxlbWVudCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRWxlbWVudChhcmdzKSB7XG4gICAgdmFyIGZuLCBpLCBqLCBrLCBrZXksIGxlbiwgbGVuMSwgbGVuMiwgbmFtZSwgcmVmLCByZWYxLCByZWYyLCByZWYzLCByZWY0LCB2YWx1ZTtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIEVsZW1lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmVmID0gWydvcmlnaW4nLCAnc2l6ZScsICdzdGF0ZScsICdzdHlsZSddO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0gcmVmW2ldO1xuICAgICAgaWYgKGFyZ3Nba2V5XSkge1xuICAgICAgICB0aGlzW2tleV0gPSBhcmdzW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJlZjEgPSBhcmdzLnN0eWxlcztcbiAgICBmb3IgKGtleSBpbiByZWYxKSB7XG4gICAgICB2YWx1ZSA9IHJlZjFba2V5XTtcbiAgICAgICh0aGlzLnN0eWxlcyB8fCAodGhpcy5zdHlsZXMgPSB7fSkpICYmICh0aGlzLnN0eWxlc1trZXldID0gdmFsdWUpO1xuICAgIH1cbiAgICByZWYyID0gYXJncy5zdGF0ZXM7XG4gICAgZm9yIChrZXkgaW4gcmVmMikge1xuICAgICAgdmFsdWUgPSByZWYyW2tleV07XG4gICAgICAodGhpcy5zdGF0ZXMgfHwgKHRoaXMuc3RhdGVzID0ge30pKSAmJiAodGhpcy5zdGF0ZXNba2V5XSA9IHZhbHVlKTtcbiAgICB9XG4gICAgcmVmMyA9IFsnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ3VwZGF0ZScsICdyZW5kZXInXTtcbiAgICBmbiA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgX3RoaXMuYWRkTGlzdGVuZXIobmFtZSwgKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgcmVmNDtcbiAgICAgICAgICBpZiAoISgocmVmNCA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmNFtuYW1lXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIF90aGlzLmFkZExpc3RlbmVyKG5hbWUsIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHJlZjQ7XG4gICAgICAgICAgaWYgKCEoKHJlZjQgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjRbbmFtZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgZmFsc2UpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmMy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG5hbWUgPSByZWYzW2pdO1xuICAgICAgZm4obmFtZSk7XG4gICAgfVxuICAgIHJlZjQgPSBbJ21vdXNlbW92ZScsICdtb3VzZWRvd24nLCAnbW91c2V1cCddO1xuICAgIGZvciAoayA9IDAsIGxlbjIgPSByZWY0Lmxlbmd0aDsgayA8IGxlbjI7IGsrKykge1xuICAgICAgbmFtZSA9IHJlZjRba107XG4gICAgICB0aGlzLmFkZExpc3RlbmVyKG5hbWUsIHRoaXNbbmFtZSArIFwiQ2FwdHVyZUxpc3RlbmVyXCJdLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIobmFtZSwgdGhpc1tuYW1lICsgXCJMaXN0ZW5lclwiXSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNlbW92ZUNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fX19ydW50aW1lLm1vdXNlbW92ZUV2ZW50ID0gZXZlbnQ7XG4gICAgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50LCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2Vkb3duQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUubW91c2Vkb3duRXZlbnQgPSBldmVudDtcbiAgICBsb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQsIHRoaXMub3JpZ2luKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZXVwQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUubW91c2V1cEV2ZW50ID0gZXZlbnQ7XG4gICAgbG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50LCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2Vkb3duTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZXVwTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICB2YXIgcmVmO1xuICAgIGlmICgocmVmID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYudXBkYXRlIDogdm9pZCAwKSB7XG4gICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgIHR5cGU6ICd1cGRhdGUnLFxuICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciBjaGlsZCwgY2hpbGRyZW4sIGksIGxlbiwgcmVmO1xuICAgIGlmICgocmVmID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYucmVuZGVyIDogdm9pZCAwKSB7XG4gICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgIHR5cGU6ICdyZW5kZXInLFxuICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgY2hpbGQucmVuZGVyKGNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gRWxlbWVudDtcblxufSkocmVxdWlyZSgnLi9ldmVudGVkJykpO1xuIiwidmFyIEV2ZW50LFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRXZlbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEV2ZW50KGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGRhdGUsIGtleSwgcGVyZiwgdmFsdWU7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcmdzID0ge1xuICAgICAgICB0eXBlOiBhcmdzXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSAmJiB0eXBlb2YgYXJncyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBhcmdzO1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBhcmdzKSB7XG4gICAgICB2YWx1ZSA9IGFyZ3Nba2V5XTtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgJiYgIXRoaXMuY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgaWYgKChhcmdzLnRpbWVzdGFtcCA9PT0gdHJ1ZSkgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkoJ3RpbWVzdGFtcCcpKSB7XG4gICAgICBkYXRlID0gRGF0ZS5ub3coKTtcbiAgICAgIHBlcmYgPSAodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsID8gcGVyZm9ybWFuY2Uubm93KCkgOiB2b2lkIDApIHx8IDA7XG4gICAgICB0aGlzLnRpbWVzdGFtcCA9IDEwMDAgKiBkYXRlICsgTWF0aC5mbG9vcigxMDAwICogKHBlcmYgLSBNYXRoLmZsb29yKHBlcmYpKSk7XG4gICAgfVxuICB9XG5cbiAgRXZlbnQucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLnN0YXJ0ZWQgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLnN0b3BwZWQgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuY2FuY2VsZWQgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5hYm9ydGVkID0gdHJ1ZSkgJiYgdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLmRvbmUgPSB0cnVlKSAmJiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudDtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIEV2ZW50LCBFdmVudGVkLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ZWQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRXZlbnRlZCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnRlZChhcmdzKSB7XG4gICAgdmFyIGtleSwgcmVmLCB2YWx1ZTtcbiAgICBFdmVudGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuZXZlbnRzIHx8ICh0aGlzLmV2ZW50cyA9IHt9KTtcbiAgICByZWYgPSBhcmdzICE9IG51bGwgPyBhcmdzLmV2ZW50cyA6IHZvaWQgMDtcbiAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgIHZhbHVlID0gcmVmW2tleV07XG4gICAgICB0aGlzLmV2ZW50c1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHRoaXMubGlzdGVuZXJzID0gW3t9LCB7fV07XG4gIH1cblxuICBFdmVudGVkLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIGJhc2UsIGxpc3RlbmVycywgcmVmO1xuICAgIGlmIChjYXB0dXJlID09IG51bGwpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHJlZiA9IHR5cGUsIHR5cGUgPSByZWYudHlwZSwgbGlzdGVuZXIgPSByZWYubGlzdGVuZXIsIGNhcHR1cmUgPSByZWYuY2FwdHVyZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZXZlbnRzW3R5cGVdICYmIHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGlzdGVuZXJzID0gKChiYXNlID0gdGhpcy5saXN0ZW5lcnNbY2FwdHVyZSA9PT0gdHJ1ZSA/IDEgOiAwXSlbdHlwZV0gfHwgKGJhc2VbdHlwZV0gPSBbXSkpO1xuICAgICAgaWYgKC0xID09PSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikpIHtcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIGlkeCwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tjYXB0dXJlID09PSB0cnVlID8gMSA6IDBdW3R5cGVdKSB7XG4gICAgICAgIGlmICgtMSAhPT0gKGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSkpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbGlzdGVuZXIsIGxpc3RlbmVycywgcGhhc2UsIHR5cGU7XG4gICAgaWYgKCh0eXBlID0gZXZlbnQgIT0gbnVsbCA/IGV2ZW50LnR5cGUgOiB2b2lkIDApICYmIHRoaXMuZXZlbnRzW3R5cGVdICYmICFldmVudC5hYm9ydGVkKSB7XG4gICAgICBwaGFzZSA9IGV2ZW50LnBoYXNlO1xuICAgICAgaWYgKHBoYXNlID4gMCAmJiBwaGFzZSA8IDMgJiYgKGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzWzIgLSBwaGFzZV1bdHlwZV0pKSB7XG4gICAgICAgIGV2ZW50LnN0YXJ0KCk7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgICAgIGlmIChldmVudC5zdG9wcGVkIHx8IGV2ZW50LmFib3J0ZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudGVkLnByb3RvdHlwZS5icm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGNoaWxkLCBpLCBsZW4sIHBoYXNlLCByZWYsIHJlZjEsIHR5cGU7XG4gICAgaWYgKHR5cGUgPSBldmVudCAhPSBudWxsID8gZXZlbnQudHlwZSA6IHZvaWQgMCkge1xuICAgICAgaWYgKCEoZXZlbnQuYWJvcnRlZCB8fCBldmVudC5kb25lIHx8IGV2ZW50LnBoYXNlID09PSAzKSkge1xuICAgICAgICBldmVudC5zdGFydCgpO1xuICAgICAgICBldmVudC5zb3VyY2UgfHwgKGV2ZW50LnNvdXJjZSA9IHRoaXMpO1xuICAgICAgICBwaGFzZSA9IChldmVudC5waGFzZSB8fCAoZXZlbnQucGhhc2UgPSAxKSk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpIHtcbiAgICAgICAgICBldmVudC5waGFzZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcmVmID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICBjaGlsZCA9IHJlZltpXTtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50LnBoYXNlID09PSAxICYmICFldmVudC5hYm9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuYnJvYWRjYXN0RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpIHtcbiAgICAgICAgICBldmVudC5waGFzZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlID09PSAyKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSB0aGlzKSB7XG4gICAgICAgICAgaWYgKCEoZXZlbnQuY2FuY2VsZWQgfHwgZXZlbnQuYWJvcnRlZCB8fCBldmVudC5kb25lIHx8IGV2ZW50LnBoYXNlID09PSAzKSkge1xuICAgICAgICAgICAgaWYgKChyZWYxID0gZXZlbnQuY2FsbGJhY2spICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWYxLmNhbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJlZjEuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucGhhc2UgPSAzO1xuICAgICAgICAgIGV2ZW50LmZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudGVkO1xuXG59KShyZXF1aXJlKCcuL25vZGUnKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmFzZTogcmVxdWlyZSgnLi9iYXNlJyksXG4gIEV2ZW50OiByZXF1aXJlKCcuL2V2ZW50JyksXG4gIE5vZGU6IHJlcXVpcmUoJy4vbm9kZScpLFxuICBFdmVudGVkOiByZXF1aXJlKCcuL2V2ZW50ZWQnKSxcbiAgRWxlbWVudDogcmVxdWlyZSgnLi9lbGVtZW50JyksXG4gIFNoYXBlOiByZXF1aXJlKCcuL3NoYXBlJyksXG4gIENvbXBvbmVudDogcmVxdWlyZSgnLi9jb21wb25lbnQnKSxcbiAgUGVuOiByZXF1aXJlKCcuL3BlbicpLFxuICBTdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpXG59O1xuIiwidmFyIE5vZGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKE5vZGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIE5vZGUoYXJncykge1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgTm9kZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBhcmdzLmNoaWxkcmVuICYmICh0aGlzLmNoaWxkcmVuID0gYXJncy5jaGlsZHJlbik7XG4gICAgYXJncy5wYXJlbnQgJiYgKHRoaXMucGFyZW50ID0gYXJncy5wYXJlbnQpO1xuICB9XG5cbiAgTm9kZS5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciByZWY7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSAmJiAodGhpcy5jaGlsZHJlbiB8fCAodGhpcy5jaGlsZHJlbiA9IFtdKSkpIHtcbiAgICAgIGlmICgtMSA9PT0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSkge1xuICAgICAgICBpZiAoKHJlZiA9IGNoaWxkLnBhcmVudCkgIT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVmLnJlbW92ZUNoaWxkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJlZi5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgaWR4O1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUgJiYgdGhpcy5jaGlsZHJlbikge1xuICAgICAgaWYgKC0xICE9PSAoaWR4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSkpIHtcbiAgICAgICAgZGVsZXRlIGNoaWxkLnBhcmVudDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgdGhpcy5jaGlsZHJlbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIE5vZGU7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsInZhciBQZW4sXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBQZW4gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoUGVuLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBQZW4oKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVmO1xuICAgICAgICByZXR1cm4gKHJlZiA9IF90aGlzLmRyYXcpICE9IG51bGwgPyByZWYuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cykgOiB2b2lkIDA7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICB9XG5cbiAgcmV0dXJuIFBlbjtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIEV2ZW50LCBTaGFwZSwgZmluZFBvaW50Wm9uZXMsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbmZpbmRQb2ludFpvbmVzID0gcmVxdWlyZSgnLi4vaGVscGVyL2ZpbmQtcG9pbnQtem9uZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChTaGFwZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gU2hhcGUoYXJncykge1xuICAgIHZhciBmbiwgaSwga2V5LCBsZW4sIG5hbWUsIHJlZiwgcmVmMSwgdmFsdWU7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZWYgPSBhcmdzLnpvbmVzO1xuICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICh0aGlzLnpvbmVzIHx8ICh0aGlzLnpvbmVzID0ge30pKSAmJiAodGhpcy56b25lc1trZXldID0gdmFsdWUpO1xuICAgIH1cbiAgICByZWYxID0gWydkcmF3J107XG4gICAgZm4gPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIF90aGlzLmFkZExpc3RlbmVyKG5hbWUsIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHJlZjI7XG4gICAgICAgICAgaWYgKCEoKHJlZjIgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjJbbmFtZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBfdGhpcy5hZGRMaXN0ZW5lcihuYW1lLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciByZWYyO1xuICAgICAgICAgIGlmICghKChyZWYyID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYyW25hbWVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksIGZhbHNlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmMS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbmFtZSA9IHJlZjFbaV07XG4gICAgICBmbihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBTaGFwZS5wcm90b3R5cGUubW91c2Vtb3ZlQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSwgbGVuLCBuYW1lLCByZWYsIHN0YXRlLCB6b25lcztcbiAgICBTaGFwZS5fX3N1cGVyX18ubW91c2Vtb3ZlQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCh6b25lcyA9IGZpbmRQb2ludFpvbmVzKGV2ZW50LmxvY2FsWCwgZXZlbnQubG9jYWxZLCB0aGlzLnpvbmVzKSkpIHtcbiAgICAgIGV2ZW50LnpvbmVzID0gem9uZXM7XG4gICAgICByZWYgPSBbJ2FjdGl2ZScsICdob3ZlcicsICdub3JtYWwnXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBuYW1lID0gcmVmW2ldO1xuICAgICAgICBpZiAoIXpvbmVzW25hbWVdKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBuYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5zdGF0ZSA9IHN0YXRlIHx8IG51bGwpKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5tb3VzZWRvd25DYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpLCBsZW4sIG5hbWUsIHJlZiwgc3RhdGUsIHpvbmVzO1xuICAgIFNoYXBlLl9fc3VwZXJfXy5tb3VzZWRvd25DYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoKHpvbmVzID0gZmluZFBvaW50Wm9uZXMoZXZlbnQubG9jYWxYLCBldmVudC5sb2NhbFksIHRoaXMuem9uZXMpKSkge1xuICAgICAgZXZlbnQuem9uZXMgPSB6b25lcztcbiAgICAgIHJlZiA9IFsnYWN0aXZlJywgJ2hvdmVyJywgJ25vcm1hbCddO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSByZWZbaV07XG4gICAgICAgIGlmICghem9uZXNbbmFtZV0pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IG5hbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLnN0YXRlID0gc3RhdGUgfHwgbnVsbCkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2hhcGUucHJvdG90eXBlLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpLCBsZW4sIG5hbWUsIHJlZiwgc3RhdGUsIHpvbmVzO1xuICAgIFNoYXBlLl9fc3VwZXJfXy5tb3VzZXVwQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHpvbmVzID0gZmluZFBvaW50Wm9uZXMoZXZlbnQubG9jYWxYLCBldmVudC5sb2NhbFksIHRoaXMuem9uZXMpKSB7XG4gICAgICBldmVudC56b25lcyA9IHpvbmVzO1xuICAgICAgcmVmID0gWydhY3RpdmUnLCAnaG92ZXInLCAnbm9ybWFsJ107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IHJlZltpXTtcbiAgICAgICAgaWYgKCF6b25lc1tuYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBudWxsKSkge1xuICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGFwZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgcmVmO1xuICAgIGlmICgocmVmID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYuZHJhdyA6IHZvaWQgMCkge1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZHJhdycsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgYXJnczogYXJnc1xuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gU2hhcGU7XG5cbn0pKHJlcXVpcmUoJy4vZWxlbWVudCcpKTtcbiIsInZhciBTdHlsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBzbGljZSA9IFtdLnNsaWNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFN0eWxlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTdHlsZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBTdHlsZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYXJncy5tYXBwZXIpIHtcbiAgICAgIHRoaXMubWFwcGVyID0gYXJncy5tYXBwZXI7XG4gICAgfVxuICAgIHRoaXMuZGF0YSA9IGFyZ3MuZGF0YSB8fCB7fTtcbiAgfVxuXG4gIFN0eWxlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oanNvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoanNvbikge1xuICAgICAgdGhpcy5tYXBwZXIoanNvbiwgdGhpcy5kYXRhLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFN0eWxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSwga2V5LCBrZXlzLCBsZW4sIGxlbmd0aCwgcmVzdWx0O1xuICAgIGtleXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoIShsZW5ndGggPSBrZXlzLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuICAgIHJlc3VsdCA9IFtdO1xuICAgIGlmIChsZW5ndGggPT09IDEgJiYga2V5c1swXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBrZXlzID0ga2V5c1swXTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbGVuID0ga2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICh0aGlzLmRhdGFba2V5XSAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZGF0YVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID09PSAxID8gcmVzdWx0WzBdIDogcmVzdWx0KTtcbiAgfTtcblxuICBTdHlsZS5wcm90b3R5cGUubWFwcGVyID0gZnVuY3Rpb24oZGF0YSwgY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfTtcblxuICByZXR1cm4gU3R5bGU7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSZWN0YW5nbGU6IHJlcXVpcmUoJy4vcmVjdGFuZ2xlJyksXG4gIExpbmU6IHJlcXVpcmUoJy4vbGluZScpLFxuICBUZXh0OiByZXF1aXJlKCcuL3RleHQnKVxufTtcbiIsInZhciBMaW5lLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChMaW5lLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBMaW5lKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBhcmdzLnN0YXJ0IHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmVuZCA9IGFyZ3MuZW5kIHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHRoaXMuZmlsbCA9IGFyZ3MuZmlsbCwgdGhpcy5zdHJva2UgPSBhcmdzLnN0cm9rZSwgdGhpcy5saW5lV2lkdGggPSBhcmdzLmxpbmVXaWR0aDtcbiAgICByZXR1cm4gTGluZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIExpbmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGVuZCwgbGluZVdpZHRoLCBzdGFydCwgc3Ryb2tlO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHN0YXJ0ID0gYXJncy5zdGFydCB8fCB0aGlzLnN0YXJ0IHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIGVuZCA9IGFyZ3MuZW5kIHx8IHRoaXMuZW5kIHx8IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgbGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgICBpZiAobGluZVdpZHRoICUgMikge1xuICAgICAgICBzdGFydC54ICs9IDAuNTtcbiAgICAgICAgc3RhcnQueSArPSAwLjU7XG4gICAgICAgIGVuZC54ICs9IDAuNTtcbiAgICAgICAgZW5kLnkgKz0gMC41O1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgfVxuICAgICAgY29udGV4dC5tb3ZlVG8oc3RhcnQueCwgc3RhcnQueSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlO1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMaW5lO1xuXG59KShyZXF1aXJlKCcuLi9saWIvcGVuJykpO1xuIiwidmFyIFJlY3RhbmdsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChSZWN0YW5nbGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFJlY3RhbmdsZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnNpemUgPSBhcmdzLnNpemUgfHwge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHRoaXMub3JpZ2luID0gYXJncy5vcmlnaW47XG4gICAgdGhpcy5maWxsID0gYXJncy5maWxsLCB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlLCB0aGlzLmxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoO1xuICAgIHJldHVybiBSZWN0YW5nbGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBSZWN0YW5nbGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGZpbGwsIGxpbmVXaWR0aCwgb3JpZ2luLCBzaXplLCBzdHJva2U7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgb3JpZ2luID0gYXJncy5vcmlnaW4gfHwgdGhpcy5vcmlnaW4gfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgc2l6ZSA9IGFyZ3Muc2l6ZSB8fCB0aGlzLnNpemUgfHwge1xuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwXG4gICAgICB9O1xuICAgICAgZmlsbCA9IGFyZ3MuZmlsbCB8fCB0aGlzLmZpbGw7XG4gICAgICBzdHJva2UgPSBhcmdzLnN0cm9rZSB8fCB0aGlzLnN0cm9rZTtcbiAgICAgIGxpbmVXaWR0aCA9IGFyZ3MubGluZVdpZHRoIHx8IHRoaXMubGluZVdpZHRoO1xuICAgICAgaWYgKGxpbmVXaWR0aCAlIDIpIHtcbiAgICAgICAgb3JpZ2luLnggKz0gMC41O1xuICAgICAgICBvcmlnaW4ueSArPSAwLjU7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUob3JpZ2luLngsIG9yaWdpbi55KTtcbiAgICAgICAgb3JpZ2luLnggPSBvcmlnaW4ueSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoZmlsbCB8fCBzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChvcmlnaW4ueCwgb3JpZ2luLnksIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZTtcbiAgICAgICAgaWYgKGxpbmVXaWR0aCkge1xuICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdChvcmlnaW4ueCwgb3JpZ2luLnksIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFJlY3RhbmdsZTtcblxufSkocmVxdWlyZSgnLi4vbGliL3BlbicpKTtcbiIsInZhciBUZXh0LFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChUZXh0LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBUZXh0KGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIHRoaXMub3JpZ2luID0gYXJncy5vcmlnaW4gfHwgdGhpcy5vcmlnaW4gfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuZm9udCA9IGFyZ3MuZm9udCB8fCB0aGlzLmZvbnQ7XG4gICAgdGhpcy5maWxsID0gYXJncy5maWxsIHx8IHRoaXMuZmlsbDtcbiAgICB0aGlzLnN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgIHRoaXMubGluZVdpZHRoID0gYXJncy5saW5lV2lkdGggfHwgdGhpcy5saW5lV2lkdGg7XG4gICAgdGhpcy5iYXNlbGluZSA9IGFyZ3MuYmFzZWxpbmUgfHwgdGhpcy5iYXNlbGluZTtcbiAgICByZXR1cm4gVGV4dC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFRleHQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGJhc2VsaW5lLCBmaWxsLCBmb250LCBvcmlnaW4sIHN0cm9rZSwgdGV4dDtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIGlmIChjb250ZXh0ICYmICh0ZXh0ID0gYXJncy50ZXh0KSkge1xuICAgICAgb3JpZ2luID0gYXJncy5vcmlnaW4gfHwgdGhpcy5vcmlnaW4gfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgZm9udCA9IGFyZ3MuZm9udCB8fCB0aGlzLmZvbnQ7XG4gICAgICBmaWxsID0gYXJncy5maWxsIHx8IHRoaXMuZmlsbDtcbiAgICAgIHN0cm9rZSA9IGFyZ3Muc3Ryb2tlIHx8IHRoaXMuc3Ryb2tlO1xuICAgICAgYmFzZWxpbmUgPSBhcmdzLmJhc2VsaW5lIHx8IHRoaXMuYmFzZWxpbmUgfHwgJ3RvcCc7XG4gICAgICBpZiAoZmlsbCB8fCBzdHJva2UpIHtcbiAgICAgICAgY29udGV4dC5iYXNlbGluZSA9IGJhc2VsaW5lO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGwgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKG9yaWdpbi54LCBvcmlnaW4ueSk7XG4gICAgICAgIG9yaWdpbi54ID0gb3JpZ2luLnkgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGZvbnQpIHtcbiAgICAgICAgY29udGV4dC5mb250ID0gZm9udDtcbiAgICAgIH1cbiAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbDtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCBvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgfVxuICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICBpZiAobGluZVdpZHRoKSB7XG4gICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuc3Ryb2tlVGV4dCh0ZXh0LCBvcmlnaW4ueCwgb3JpZ2luLnkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gVGV4dDtcblxufSkocmVxdWlyZSgnLi4vbGliL3BlbicpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBTaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpXG59O1xuIiwidmFyIFNoYXBlLCBfLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbl8gPSBmdW5jdGlvbihvLCBwKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFNoYXBlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTaGFwZSgpIHtcbiAgICByZXR1cm4gU2hhcGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBTaGFwZS5wcm90b3R5cGUubWFwcGVyID0gZnVuY3Rpb24oZGF0YSwgY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICB2YXIgZmlsbCwgaGVpZ2h0LCBpbWFnZSwgcmVmLCByZXBlYXQsIHVybCwgd2lkdGgsIHgsIHk7XG4gICAgaWYgKChfKGRhdGEsICd3aWR0aCcpKSB8fCAoXyhkYXRhLCAnaGVpZ2h0JykpKSB7XG4gICAgICB3aWR0aCA9IChwYXJzZUZsb2F0KGRhdGFbJ3dpZHRoJ10pKSB8fCAwO1xuICAgICAgaGVpZ2h0ID0gKHBhcnNlRmxvYXQoZGF0YVsnaGVpZ2h0J10pKSB8fCAwO1xuICAgICAgY29udGV4dC5zaXplID0ge1xuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoKF8oZGF0YSwgJ3RvcCcpKSB8fCAoXyhkYXRhLCAnbGVmdCcpKSkge1xuICAgICAgeCA9IChwYXJzZUZsb2F0KGRhdGFbJ2xlZnQnXSkpIHx8IDA7XG4gICAgICB5ID0gKHBhcnNlRmxvYXQoZGF0YVsndG9wJ10pKSB8fCAwO1xuICAgICAgY29udGV4dC5vcmlnaW4gPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdiYWNrZ3JvdW5kJykpIHtcbiAgICAgIGNvbnRleHQuZmlsbCA9IGRhdGFbJ2JhY2tncm91bmQnXTtcbiAgICB9XG4gICAgaWYgKF8oZGF0YSwgJ2ZpbGwnKSkge1xuICAgICAgY29udGV4dC5maWxsID0gZGF0YVsnZmlsbCddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnY29sb3InKSkge1xuICAgICAgY29udGV4dC5zdHJva2UgPSBkYXRhWydjb2xvciddO1xuICAgIH1cbiAgICBpZiAoXyhkYXRhLCAnc3Ryb2tlJykpIHtcbiAgICAgIGNvbnRleHQuc3Ryb2tlID0gZGF0YVsnc3Ryb2tlJ107XG4gICAgfVxuICAgIGlmIChfKGRhdGEsICdsaW5lLXdpZHRoJykpIHtcbiAgICAgIGNvbnRleHQubGluZSAtICh3aWR0aCA9IChwYXJzZUZsb2F0KGRhdGFbJ2xpbmUtd2lkdGgnXSkpIHx8IDApO1xuICAgIH1cbiAgICBpZiAodXJsID0gKHJlZiA9IGNvbnRleHQuZmlsbCkgIT0gbnVsbCA/IHJlZi5tYXRjaCgvdXJsXFwoXFxzKihbXCInJ10/KVxccyooLispXFwxXFwpLykgOiB2b2lkIDApIHtcbiAgICAgIHVybCA9IHVybFsyXTtcbiAgICAgIGlmIChyZXBlYXQgPSBjb250ZXh0LmZpbGwubWF0Y2goLyhub3JlcGVhdHxyZXBlYXQteHxyZXBlYXQteSkvKSkge1xuICAgICAgICByZXBlYXQgPSByZXBlYXRbMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXBlYXQgPSBudWxsO1xuICAgICAgfVxuICAgICAgZmlsbCA9IG51bGw7XG4gICAgICAoaW1hZ2UgPSBuZXcgSW1hZ2UpLnNyYyA9IHVybDtcbiAgICAgIGltYWdlLm9ubG9hZCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29udGV4dC5maWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKS5jcmVhdGVQYXR0ZXJuKGltYWdlLCByZXBlYXQgfHwgJ3JlcGVhdCcpO1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayAhPSBudWxsID8gY2FsbGJhY2suY2FsbChfdGhpcywgbnVsbCwgY29udGV4dCkgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIHJldHVybiBpbWFnZS5vbmVycm9yID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICE9IG51bGwgPyBjYWxsYmFjay5jYWxsKF90aGlzLCBlLCBjb250ZXh0KSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sgIT0gbnVsbCA/IGNhbGxiYWNrLmNhbGwodGhpcywgbnVsbCwgY29udGV4dCkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTaGFwZTtcblxufSkocmVxdWlyZSgnLi4vbGliL3N0eWxlJykpO1xuIiwidmFyIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENoaWxkQ2xhc3MsIFBhcmVudENsYXNzZXMpIHtcbiAgdmFyIE1peGluQ2xhc3MsIFBhcmVudENsYXNzLCBpLCBrZXksIGxlbiwgcmVmLCB2YWx1ZTtcbiAgaWYgKFBhcmVudENsYXNzZXMgaW5zdGFuY2VvZiBBcnJheSAmJiBQYXJlbnRDbGFzc2VzLmxlbmd0aCkge1xuICAgIFBhcmVudENsYXNzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICAgIGV4dGVuZChQYXJlbnRDbGFzcywgc3VwZXJDbGFzcyk7XG5cbiAgICAgIGZ1bmN0aW9uIFBhcmVudENsYXNzKCkge1xuICAgICAgICB2YXIgTWl4aW5DbGFzcywgaSwgbGVuO1xuICAgICAgICBQYXJlbnRDbGFzcy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIE1peGluQ2xhc3MgPSBQYXJlbnRDbGFzc2VzW2ldO1xuICAgICAgICAgIE1peGluQ2xhc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUGFyZW50Q2xhc3M7XG5cbiAgICB9KShQYXJlbnRDbGFzc2VzLnNoaWZ0KCkpO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IFBhcmVudENsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIE1peGluQ2xhc3MgPSBQYXJlbnRDbGFzc2VzW2ldO1xuICAgICAgcmVmID0gTWl4aW5DbGFzcy5wcm90b3R5cGU7XG4gICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwocmVmLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICAgaWYgKGtleSAhPT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgIFBhcmVudENsYXNzLnByb3RvdHlwZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgUGFyZW50Q2xhc3MgPSBQYXJlbnRDbGFzc2VzO1xuICB9XG4gIHJldHVybiBleHRlbmQoQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3MpO1xufTtcbiJdfQ==
