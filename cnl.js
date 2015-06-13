(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.cnl = require('./index');

},{"./index":2}],2:[function(require,module,exports){
module.exports = {
  lib: require('./lib/index')
};

},{"./lib/index":8}],3:[function(require,module,exports){
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

},{"./event":6,"./shape":10,"./style":11,"extends__":12}],5:[function(require,module,exports){
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

},{"./event":6,"./evented":7,"./style":11,"extends__":12}],6:[function(require,module,exports){
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

},{"./base":3,"extends__":12}],7:[function(require,module,exports){
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

},{"./event":6,"./node":9,"extends__":12}],8:[function(require,module,exports){
module.exports = {
  Base: require('./base'),
  Event: require('./event'),
  Node: require('./node'),
  Element: require('./element'),
  Evented: require('./evented'),
  Style: require('./style'),
  Shape: require('./shape'),
  Component: require('./component')
};

},{"./base":3,"./component":4,"./element":5,"./event":6,"./evented":7,"./node":9,"./shape":10,"./style":11}],9:[function(require,module,exports){
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

},{"./base":3,"extends__":12}],10:[function(require,module,exports){
var Event, Shape,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('./event');

module.exports = Shape = (function(superClass) {
  extend(Shape, superClass);

  function Shape() {
    Shape.__super__.constructor.apply(this, arguments);
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

},{"./element":5,"./event":6,"extends__":12}],11:[function(require,module,exports){
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
    this.mapper = args.mapper || this.mapper;
    this.data = args.data || {};
  }

  Style.prototype.load = function(json, callback) {
    if (json) {
      mapper(json, this.data, callback);
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

},{"./base":3,"extends__":12}],12:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9pbmRleC5qcyIsImJ1aWxkL2xpYi9iYXNlLmpzIiwiYnVpbGQvbGliL2NvbXBvbmVudC5qcyIsImJ1aWxkL2xpYi9lbGVtZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50LmpzIiwiYnVpbGQvbGliL2V2ZW50ZWQuanMiLCJidWlsZC9saWIvaW5kZXguanMiLCJidWlsZC9saWIvbm9kZS5qcyIsImJ1aWxkL2xpYi9zaGFwZS5qcyIsImJ1aWxkL2xpYi9zdHlsZS5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmRzX18vZGlzdC9leHRlbmRzX18uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5jbmwgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGliOiByZXF1aXJlKCcuL2xpYi9pbmRleCcpXG59O1xuIiwidmFyIEJhc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQmFzZSgpIHt9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKCk7XG4iLCJ2YXIgQ29tcG9uZW50LCBFdmVudCwgU3R5bGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuU3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlJyk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDb21wb25lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIENvbXBvbmVudChhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBDb21wb25lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tb3VzZW1vdmVMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMubW91c2Vkb3duTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tb3VzZXVwTGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfVxuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vkb3duTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2V1cExpc3RlbmVyID0gZnVuY3Rpb24oKSB7fTtcblxuICByZXR1cm4gQ29tcG9uZW50O1xuXG59KShyZXF1aXJlKCcuL3NoYXBlJykpO1xuIiwidmFyIEVsZW1lbnQsIEV2ZW50LCBTdHlsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5TdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGUnKTtcblxuRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFbGVtZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbGVtZW50KGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIEVsZW1lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5fc3R5bGUgPSBhcmdzLnN0eWxlIHx8IHRoaXMuX3N0eWxlO1xuICAgIHRoaXMuX3N0YXRlID0gYXJncy5zdGF0ZSB8fCB0aGlzLl9zdGF0ZTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3N0YXRlJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMuc3RhdGVMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignc3R5bGUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5zdHlsZUxpc3RlbmVyKGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdyZW5kZXInLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5yZW5kZXJMaXN0ZW5lcihlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9XG5cbiAgRWxlbWVudC5wcm90b3R5cGUuc3RhdGVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge307XG5cbiAgRWxlbWVudC5wcm90b3R5cGUuc3R5bGVMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge307XG5cbiAgRWxlbWVudC5wcm90b3R5cGUucmVuZGVyTGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLnN0YXRlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlID0gdGhpcy5fc3RhdGU7XG4gICAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgICB0eXBlOiAnc3RhdGUnLFxuICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgb2xkOiBzdGF0ZVxuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUuc3R5bGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBzdHlsZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgc3R5bGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgIHRoaXMuX3N0eWxlID0gdmFsdWU7XG4gICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgIHR5cGU6ICdzdHlsZScsXG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBvbGQ6IHN0eWxlXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdHlsZTtcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdGhpcy5icm9hZGNhc3RFdmVudChuZXcgRXZlbnQoe1xuICAgICAgdHlwZTogJ3JlbmRlcicsXG4gICAgICB0YXJnZXQ6IHRoaXNcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEVsZW1lbnQ7XG5cbn0pKHJlcXVpcmUoJy4vZXZlbnRlZCcpKTtcbiIsInZhciBFdmVudCxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEV2ZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFdmVudChhcmdzLCBjYWxsYmFjaykge1xuICAgIHZhciBkYXRlLCBwZXJmO1xuICAgIGlmIChhcmdzID09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgRXZlbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgYXJncyA9IHtcbiAgICAgICAgdHlwZTogYXJnc1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKChhcmd1bWVudHMubGVuZ3RoIDwgMikgJiYgdHlwZW9mIGFyZ3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gYXJncztcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy50eXBlID0gYXJncy50eXBlLCB0aGlzLnBoYXNlID0gYXJncy5waGFzZSwgdGhpcy5jYW5jZWxhYmxlID0gYXJncy5jYW5jZWxhYmxlLCB0aGlzLmJ1YmJsZXMgPSBhcmdzLmJ1YmJsZXMsIHRoaXMuc291cmNlID0gYXJncy5zb3VyY2UsIHRoaXMudGFyZ2V0ID0gYXJncy50YXJnZXQsIHRoaXMuYnViYmxpbmcgPSBhcmdzLmJ1YmJsaW5nLCB0aGlzLnNpbmtpbmcgPSBhcmdzLnNpbmtpbmcsIHRoaXMuc3RhcnRlZCA9IGFyZ3Muc3RhcnRlZCwgdGhpcy5zdG9wcGVkID0gYXJncy5zdG9wcGVkLCB0aGlzLmNhbmNlbGVkID0gYXJncy5jYW5jZWxlZCwgdGhpcy5hYm9ydGVkID0gYXJncy5hYm9ydGVkLCB0aGlzLmRvbmUgPSBhcmdzLmRvbmU7XG4gICAgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgcGVyZiA9ICh0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwgPyBwZXJmb3JtYW5jZS5ub3coKSA6IHZvaWQgMCkgfHwgMDtcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjayB8fCBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHRoaXMudGltZXN0YW1wID0gMTAwMCAqIGRhdGUgKyBNYXRoLmZsb29yKDEwMDAgKiAocGVyZiAtIE1hdGguZmxvb3IocGVyZikpKTtcbiAgfVxuXG4gIEV2ZW50LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNhbmNlbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudDtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIEV2ZW50LCBFdmVudGVkLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ZWQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRXZlbnRlZCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnRlZCgpIHtcbiAgICBFdmVudGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMubGlzdGVuZXJzID0gW3t9LCB7fV07XG4gIH1cblxuICBFdmVudGVkLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgYmFzZSwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxpc3RlbmVycyA9ICgoYmFzZSA9IHRoaXMubGlzdGVuZXJzW2NhcHR1cmUgPT09IHRydWUgPyAxIDogMF0pW3R5cGVdIHx8IChiYXNlW3R5cGVdID0gW10pKTtcbiAgICAgIGlmICgtMSA9PT0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpKSB7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIGlkeCwgbGlzdGVuZXJzLCByZWY7XG4gICAgaWYgKGNhcHR1cmUgPT0gbnVsbCkge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAodHlwZSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tjYXB0dXJlID09PSB0cnVlID8gMSA6IDBdW3R5cGVdKSB7XG4gICAgICAgIGlmICgtMSAhPT0gKGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSkpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGksIGxlbiwgbGlzdGVuZXIsIGxpc3RlbmVycywgcGhhc2UsIHR5cGU7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRXZlbnQgJiYgKHR5cGUgPSBldmVudC50eXBlKSAmJiAhZXZlbnQuYWJvcnRlZCkge1xuICAgICAgcGhhc2UgPSBldmVudC5waGFzZTtcbiAgICAgIGlmIChwaGFzZSA+IDAgJiYgcGhhc2UgPCAzICYmIChsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1syIC0gcGhhc2VdW3R5cGVdKSkge1xuICAgICAgICBldmVudC5zdGFydCgpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgICAgICBpZiAoZXZlbnQuc3RvcHBlZCB8fCBldmVudC5hYm9ydGVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudCwgdGFyZ2V0KSB7XG4gICAgdmFyIGNoaWxkLCBpLCBsZW4sIHBoYXNlLCByZWYsIHJlZjEsIHR5cGU7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRXZlbnQgJiYgKHR5cGUgPSBldmVudC50eXBlKSkge1xuICAgICAgaWYgKCEoZXZlbnQuYWJvcnRlZCB8fCBldmVudC5kb25lIHx8IGV2ZW50LnBoYXNlID09PSAzKSkge1xuICAgICAgICBldmVudC5zdGFydCgpO1xuICAgICAgICBldmVudC5zb3VyY2UgfHwgKGV2ZW50LnNvdXJjZSA9IHRoaXMpO1xuICAgICAgICBldmVudC50YXJnZXQgfHwgKGV2ZW50LnRhcmdldCA9IHRhcmdldCk7XG4gICAgICAgIHBoYXNlID0gKGV2ZW50LnBoYXNlIHx8IChldmVudC5waGFzZSA9IDEpKTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgIHJlZiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHJlZltpXTtcbiAgICAgICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMSAmJiAhZXZlbnQuYWJvcnRlZCkge1xuICAgICAgICAgICAgICBjaGlsZC5icm9hZGNhc3RFdmVudChldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlID09PSAyKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSB0aGlzKSB7XG4gICAgICAgICAgaWYgKCEoZXZlbnQuY2FuY2VsZWQgfHwgZXZlbnQuYWJvcnRlZCB8fCBldmVudC5kb25lIHx8IGV2ZW50LnBoYXNlID09PSAzKSkge1xuICAgICAgICAgICAgaWYgKChyZWYxID0gZXZlbnQuY2FsbGJhY2spICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmVmMS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucGhhc2UgPSAzO1xuICAgICAgICAgIGV2ZW50LmZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudGVkO1xuXG59KShyZXF1aXJlKCcuL25vZGUnKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmFzZTogcmVxdWlyZSgnLi9iYXNlJyksXG4gIEV2ZW50OiByZXF1aXJlKCcuL2V2ZW50JyksXG4gIE5vZGU6IHJlcXVpcmUoJy4vbm9kZScpLFxuICBFbGVtZW50OiByZXF1aXJlKCcuL2VsZW1lbnQnKSxcbiAgRXZlbnRlZDogcmVxdWlyZSgnLi9ldmVudGVkJyksXG4gIFN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gIFNoYXBlOiByZXF1aXJlKCcuL3NoYXBlJyksXG4gIENvbXBvbmVudDogcmVxdWlyZSgnLi9jb21wb25lbnQnKVxufTtcbiIsInZhciBOb2RlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChOb2RlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBOb2RlKGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PSBudWxsKSB7XG4gICAgICBhcmdzID0ge307XG4gICAgfVxuICAgIE5vZGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGFyZ3MuY2hpbGRyZW4gfHwgW107XG4gICAgdGhpcy5wYXJlbnQgPSBhcmdzLnBhcmVudCB8fCBudWxsO1xuICB9XG5cbiAgTm9kZS5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciBwYXJlbnQ7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTm9kZSAmJiAtMSA9PT0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSkge1xuICAgICAgaWYgKHBhcmVudCA9IGNoaWxkLnBhcmVudCkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgfVxuICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIE5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgaWR4O1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUgJiYgLTEgIT09IChpZHggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpKSkge1xuICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBOb2RlO1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJ2YXIgRXZlbnQsIFNoYXBlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFNoYXBlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTaGFwZSgpIHtcbiAgICBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYXcnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5kcmF3TGlzdGVuZXIoZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfVxuXG4gIFNoYXBlLnByb3RvdHlwZS5kcmF3TGlzdGVuZXIgPSBmdW5jdGlvbigpIHt9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgIHR5cGU6ICdkcmF3JyxcbiAgICAgIHRhcmdldDogdGhpc1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gU2hhcGU7XG5cbn0pKHJlcXVpcmUoJy4vZWxlbWVudCcpKTtcbiIsInZhciBTdHlsZSxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBzbGljZSA9IFtdLnNsaWNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFN0eWxlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBTdHlsZShhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xuICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICBTdHlsZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLm1hcHBlciA9IGFyZ3MubWFwcGVyIHx8IHRoaXMubWFwcGVyO1xuICAgIHRoaXMuZGF0YSA9IGFyZ3MuZGF0YSB8fCB7fTtcbiAgfVxuXG4gIFN0eWxlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oanNvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoanNvbikge1xuICAgICAgbWFwcGVyKGpzb24sIHRoaXMuZGF0YSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTdHlsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIGtleSwga2V5cywgbGVuLCBsZW5ndGgsIHJlc3VsdDtcbiAgICBrZXlzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKCEobGVuZ3RoID0ga2V5cy5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgIH1cbiAgICByZXN1bHQgPSBbXTtcbiAgICBpZiAobGVuZ3RoID09PSAxICYmIGtleXNbMF0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAga2V5cyA9IGtleXNbMF07XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAodGhpcy5kYXRhW2tleV0gIT0gbnVsbCkge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLmRhdGFba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAocmVzdWx0Lmxlbmd0aCA9PT0gMSA/IHJlc3VsdFswXSA6IHJlc3VsdCk7XG4gIH07XG5cbiAgU3R5bGUucHJvdG90eXBlLm1hcHBlciA9IGZ1bmN0aW9uKGRhdGEsIGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH07XG5cbiAgcmV0dXJuIFN0eWxlO1xuXG59KShyZXF1aXJlKCcuL2Jhc2UnKSk7XG4iLCJ2YXIgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3Nlcykge1xuICB2YXIgTWl4aW5DbGFzcywgUGFyZW50Q2xhc3MsIGksIGtleSwgbGVuLCByZWYsIHZhbHVlO1xuICBpZiAoUGFyZW50Q2xhc3NlcyBpbnN0YW5jZW9mIEFycmF5ICYmIFBhcmVudENsYXNzZXMubGVuZ3RoKSB7XG4gICAgUGFyZW50Q2xhc3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgICAgZXh0ZW5kKFBhcmVudENsYXNzLCBzdXBlckNsYXNzKTtcblxuICAgICAgZnVuY3Rpb24gUGFyZW50Q2xhc3MoKSB7XG4gICAgICAgIHZhciBNaXhpbkNsYXNzLCBpLCBsZW47XG4gICAgICAgIFBhcmVudENsYXNzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBQYXJlbnRDbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICAgICAgTWl4aW5DbGFzcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQYXJlbnRDbGFzcztcblxuICAgIH0pKFBhcmVudENsYXNzZXMuc2hpZnQoKSk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gUGFyZW50Q2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgTWl4aW5DbGFzcyA9IFBhcmVudENsYXNzZXNbaV07XG4gICAgICByZWYgPSBNaXhpbkNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICBpZiAoa2V5ICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgUGFyZW50Q2xhc3MucHJvdG90eXBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBQYXJlbnRDbGFzcyA9IFBhcmVudENsYXNzZXM7XG4gIH1cbiAgcmV0dXJuIGV4dGVuZChDaGlsZENsYXNzLCBQYXJlbnRDbGFzcyk7XG59O1xuIl19
