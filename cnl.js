(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.cnl = require('./index');

},{"./index":4}],2:[function(require,module,exports){
var Component, Event,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

Event = require('ecl/dist/event');

module.exports = Component = (function(superClass) {
  extend(Component, superClass);

  function Component() {
    var fn, i, j, len, len1, ref, ref1, type;
    Component.__super__.constructor.apply(this, arguments);
    ref = ['grab', 'release', 'drag'];
    fn = (function(_this) {
      return function(type) {
        _this.addListener({
          type: type,
          capture: true,
          listener: function(event) {
            var ref1;
            if (!((ref1 = this.events) != null ? ref1[type] : void 0)) {
              return event.cancel().stop();
            }
          }
        });
        return _this.addListener({
          type: type,
          capture: false,
          listener: function(event) {
            var ref1;
            if (!((ref1 = this.events) != null ? ref1[type] : void 0)) {
              return event.cancel().stop();
            }
          }
        });
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      type = ref[i];
      fn(type);
    }
    ref1 = ['grab', 'release', 'drag'];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      type = ref1[j];
      this.addListener(type, this[type + "CaptureListener"], true);
      this.addListener(type, this[type + "Listener"], false);
    }
  }

  Component.prototype.mousemoveCaptureListener = function(event) {
    var $, ref, ref1, ref2, ref3, ref4, regions;
    Component.__super__.mousemoveCaptureListener.apply(this, arguments);
    if (event) {
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
      } else if (regions = event.regions) {
        this.state = (regions.hover ? 'hover' : regions.normal ? 'normal' : void 0);
      }
    }
    return this;
  };

  Component.prototype.mousedownCaptureListener = function(event) {
    var i, len, name, ref, regions, state;
    Component.__super__.mousedownCaptureListener.apply(this, arguments);
    if (event && (regions = event.regions)) {
      ref = ['active', 'hover', 'normal'];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        if (!regions[name]) {
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

  Component.prototype.mouseupCaptureListener = function(event) {
    var $, i, len, name, ref, ref1, regions, state;
    Component.__super__.mouseupCaptureListener.apply(this, arguments);
    if (event) {
      $ = this.___runtime;
      if (regions = event.regions) {
        ref = ['active', 'hover', 'normal'];
        for (i = 0, len = ref.length; i < len; i++) {
          name = ref[i];
          if (!regions[name]) {
            continue;
          }
          state = name;
          break;
        }
      }
      if ((this.state = state || null)) {
        event.target = this;
      }
      if ($.grab) {
        $.grab = false;
        if ((ref1 = this.events) != null ? ref1.release : void 0) {
          this.broadcastEvent($.releaseEvent = new Event({
            type: 'release',
            x: event.x,
            y: event.y
          }));
        }
      }
    }
    return this;
  };

  Component.prototype.mousedownListener = function(event) {
    var $, ref;
    Component.__super__.mousedownListener.apply(this, arguments);
    if (event) {
      if ((this.state === 'active') && ((ref = this.events) != null ? ref.grab : void 0)) {
        ($ = this.___runtime).grab = true;
        $.dragEvent = null;
        this.broadcastEvent(new Event({
          type: 'grab',
          x: event.x,
          y: event.y
        }));
      }
    }
    return this;
  };

  Component.prototype.dragCaptureListener = function(event) {
    if (event) {
      this.___runtime.dragEvent = event;
      this.localizeEventCoordinates(event);
    }
    return this;
  };

  Component.prototype.grabCaptureListener = function(event) {
    if (event) {
      this.___runtime.grabEvent = event;
      this.localizeEventCoordinates(event);
    }
    return this;
  };

  Component.prototype.releaseCaptureListener = function(event) {
    if (event) {
      this.___runtime.releaseEvent = event;
      this.localizeEventCoordinates(event);
    }
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

},{"./shape":5,"ecl/dist/event":7,"extends__":10}],3:[function(require,module,exports){
var Element,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Element = (function(superClass) {
  extend(Element, superClass);

  function Element() {
    var fn, i, j, len, len1, ref, ref1, type;
    Element.__super__.constructor.apply(this, arguments);
    if (this.origin) {
      this.origin = {
        x: this.origin.x || 0,
        y: this.origin.y || 0
      };
    }
    ref = ['mousemove', 'mousedown', 'mouseup'];
    fn = (function(_this) {
      return function(type) {
        _this.addListener({
          type: type,
          capture: true,
          listener: function(event) {
            var ref1;
            if (!((ref1 = this.events) != null ? ref1[type] : void 0)) {
              return event.cancel().stop();
            }
          }
        });
        return _this.addListener({
          type: type,
          capture: false,
          listener: function(event) {
            var ref1;
            if (!((ref1 = this.events) != null ? ref1[type] : void 0)) {
              return event.cancel().stop();
            }
          }
        });
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      type = ref[i];
      fn(type);
    }
    ref1 = ['mousemove', 'mousedown', 'mouseup'];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      type = ref1[j];
      this.addListener(type, this[type + "CaptureListener"], true);
      this.addListener(type, this[type + "Listener"], false);
    }
  }

  Element.prototype.localizeEventCoordinates = function(event) {
    var ref, ref1, x, y;
    if (event) {
      x = (event.localX != null ? event.localX : event.x);
      event.localX = x - (((ref = this.origin) != null ? ref.x : void 0) || 0);
      y = (event.localY != null ? event.localY : event.y);
      event.localY = y - (((ref1 = this.origin) != null ? ref1.y : void 0) || 0);
    }
    return this;
  };

  Element.prototype.mousemoveCaptureListener = function(event) {
    if (event) {
      this.___runtime.mousemoveEvent = event;
      this.localizeEventCoordinates(event);
    }
    return this;
  };

  Element.prototype.mousedownCaptureListener = function(event) {
    if (event) {
      this.___runtime.mousedownEvent = event;
      this.localizeEventCoordinates(event);
    }
    return this;
  };

  Element.prototype.mouseupCaptureListener = function(event) {
    if (event) {
      this.___runtime.mouseupEvent = event;
      this.localizeEventCoordinates(event);
    }
    return this;
  };

  Element.prototype.mousemoveListener = function() {
    return this;
  };

  Element.prototype.mousedownListener = function() {
    return this;
  };

  Element.prototype.mouseupListener = function() {
    return this;
  };

  return Element;

})(require('ecl/dist/evented'));

},{"ecl/dist/evented":8,"extends__":10}],4:[function(require,module,exports){
module.exports = {
  Element: require('./element'),
  Shape: require('./shape'),
  Component: require('./component')
};

},{"./component":2,"./element":3,"./shape":5}],5:[function(require,module,exports){
var Shape,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Shape = (function(superClass) {
  extend(Shape, superClass);

  function Shape() {
    var name, region, regions;
    Shape.__super__.constructor.apply(this, arguments);
    if (regions = this.regions) {
      this.regions = {};
      for (name in regions) {
        region = regions[name];
        this.regions[name] = region;
      }
    }
  }

  Shape.prototype.draw = function() {
    return this;
  };

  Shape.prototype.getEventRegions = function(event) {
    var $, name, ref, result, x, y;
    result = null;
    if (event && ((x = event.localX) != null) && ((y = event.localY) != null)) {
      ref = this.regions;
      for (name in ref) {
        $ = ref[name];
        if (($[0] <= x && x <= ($[0] + $[2])) && ($[1] <= y && y <= ($[1] + $[3]))) {
          result || (result = {});
          result[name] = $;
        }
      }
    }
    return result;
  };

  Shape.prototype.mousemoveCaptureListener = function(event) {
    Shape.__super__.mousemoveCaptureListener.apply(this, arguments);
    if (event) {
      if (event.regions = this.getEventRegions(event)) {
        event.target = this;
      }
    }
    return this;
  };

  Shape.prototype.mousedownCaptureListener = function(event) {
    Shape.__super__.mousedownCaptureListener.apply(this, arguments);
    if (event) {
      if (event.regions = this.getEventRegions(event)) {
        event.target = this;
      }
    }
    return this;
  };

  Shape.prototype.mouseupCaptureListener = function(event) {
    Shape.__super__.mouseupCaptureListener.apply(this, arguments);
    if (event) {
      if (event.regions = this.getEventRegions(event)) {
        event.target = this;
      }
    }
    return this;
  };

  return Shape;

})(require('./element'));

},{"./element":3,"extends__":10}],6:[function(require,module,exports){
var Base,
  hasProp = {}.hasOwnProperty;

module.exports = Base = (function() {
  function Base(args) {
    var key, value;
    for (key in args) {
      if (!hasProp.call(args, key)) continue;
      value = args[key];
      this[key] = value;
    }
    Object.defineProperty(this, '___runtime', {
      enumerable: false,
      writable: false,
      configurable: false,
      value: (args != null ? args.___runtime : void 0) || {}
    });
  }

  return Base;

})();

},{}],7:[function(require,module,exports){
var Event,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Event = (function(superClass) {
  extend(Event, superClass);

  function Event(type, callback) {
    var args, date, perf;
    args = (typeof type === 'string' ? {
      type: type
    } : type || {});
    if (typeof callback === 'function') {
      args.callback = callback;
    }
    Event.__super__.constructor.call(this, args);
    if (this.timestamp === true) {
      date = Date.now();
      perf = (typeof performance !== "undefined" && performance !== null ? performance.now() : void 0) || 0;
      this.timestamp = 1000 * date + Math.floor(1000 * (perf - Math.floor(perf)));
    }
  }

  Event.prototype.cancel = function() {
    this.___runtime.cancel = true;
    return this;
  };

  Event.prototype.stop = function() {
    this.___runtime.stop = true;
    return this;
  };

  Event.prototype.abort = function() {
    this.aborted = true;
    return this;
  };

  return Event;

})(require('./base'));

},{"./base":6,"extends__":10}],8:[function(require,module,exports){
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

  Evented.prototype.addListener = function(type, listener, capture) {
    var listeners, ref, ref1, ref2;
    if (capture == null) {
      capture = false;
    }
    if (typeof type === 'object') {
      ref = type, type = ref.type, listener = ref.listener, capture = ref.capture;
    }
    if (((ref1 = this.events) != null ? ref1[type] : void 0) && typeof listener === 'function') {
      listeners = ((ref2 = this.listeners[capture ? 1 : 0]) != null ? ref2[type] || (ref2[type] = []) : void 0);
      if (-1 === listeners.indexOf(listener)) {
        listeners.push(listener);
      }
    }
    return this;
  };

  Evented.prototype.removeListener = function(type, listener, capture) {
    var idx, listeners, ref, ref1;
    if (capture == null) {
      capture = false;
    }
    if (type instanceof Object) {
      ref = type, type = ref.type, listener = ref.listener, capture = ref.capture;
    }
    if (type && typeof listener === 'function') {
      if (listeners = (ref1 = this.listeners[capture ? 1 : 0]) != null ? ref1[type] : void 0) {
        if (-1 !== (idx = listeners.indexOf(listener))) {
          listeners.splice(idx, 1);
        }
      }
    }
    return this;
  };

  Evented.prototype.dispatchEvent = function(event) {
    var i, len, listener, listeners, phase, ref, ref1, type;
    if (!((event != null ? event.aborted : void 0) || (event != null ? event.canceled : void 0))) {
      if ((type = event != null ? event.type : void 0) && this.events[type]) {
        phase = event.phase;
        if (((3 > phase && phase > 0)) && (listeners = (ref = this.listeners) != null ? ref[2 - phase][type] : void 0)) {
          for (i = 0, len = listeners.length; i < len; i++) {
            listener = listeners[i];
            if (((ref1 = event.___runtime) != null ? ref1.canceled : void 0) || event.aborted) {
              break;
            }
            listener.call(this, event);
          }
        }
      }
    }
    return this;
  };

  Evented.prototype.broadcastEvent = function(event, target) {
    var base, child, i, len, phase, ref, ref1, type;
    if ((type = event != null ? event.type : void 0) && (event.phase || 0) < 3) {
      if (!(event.aborted || event.___runtime.stopped)) {
        (base = event.___runtime).source || (base.source = this);
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
              if (!(event.aborted || event.___runtime.canceled)) {
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
        if (event.___runtime.source === this && event.phase < 4) {
          if ((ref1 = event.callback) != null) {
            if (typeof ref1.call === "function") {
              ref1.call(this, event);
            }
          }
          event.phase = 4;
        }
      }
    }
    return this;
  };

  return Evented;

})(require('./node'));

},{"./event":7,"./node":9,"extends__":10}],9:[function(require,module,exports){
var Node,
  extend = require("extends__"),
  hasProp = {}.hasOwnProperty;

module.exports = Node = (function(superClass) {
  extend(Node, superClass);

  function Node() {
    Node.__super__.constructor.apply(this, arguments);
  }

  Node.prototype.appendChild = function(child) {
    var ref;
    if (child !== this) {
      this.children || (this.children = []);
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
    var idx, ref;
    if (((ref = this.children) != null ? ref.length : void 0) && -1 !== (idx = this.children.indexOf(child))) {
      delete child.parent;
      this.children.splice(idx, 1);
      if (this.children.length === 0) {
        delete this.children;
      }
    }
    return this;
  };

  return Node;

})(require('./base'));

},{"./base":6,"extends__":10}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jbmwuanMiLCJidWlsZC9jb21wb25lbnQuanMiLCJidWlsZC9lbGVtZW50LmpzIiwiYnVpbGQvaW5kZXguanMiLCJidWlsZC9zaGFwZS5qcyIsIm5vZGVfbW9kdWxlcy9lY2wvZGlzdC9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL2VjbC9kaXN0L2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2VjbC9kaXN0L2V2ZW50ZWQuanMiLCJub2RlX21vZHVsZXMvZWNsL2Rpc3Qvbm9kZS5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmRzX18vZGlzdC9leHRlbmRzX18uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ3aW5kb3cuY25sID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuIiwidmFyIENvbXBvbmVudCwgRXZlbnQsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuRXZlbnQgPSByZXF1aXJlKCdlY2wvZGlzdC9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDb21wb25lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgICB2YXIgZm4sIGksIGosIGxlbiwgbGVuMSwgcmVmLCByZWYxLCB0eXBlO1xuICAgIENvbXBvbmVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZWYgPSBbJ2dyYWInLCAncmVsZWFzZScsICdkcmFnJ107XG4gICAgZm4gPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIF90aGlzLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICAgICAgbGlzdGVuZXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgcmVmMTtcbiAgICAgICAgICAgIGlmICghKChyZWYxID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYxW3R5cGVdIDogdm9pZCAwKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZXZlbnQuY2FuY2VsKCkuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfdGhpcy5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICBjYXB0dXJlOiBmYWxzZSxcbiAgICAgICAgICBsaXN0ZW5lcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciByZWYxO1xuICAgICAgICAgICAgaWYgKCEoKHJlZjEgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjFbdHlwZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICAgIHJldHVybiBldmVudC5jYW5jZWwoKS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0eXBlID0gcmVmW2ldO1xuICAgICAgZm4odHlwZSk7XG4gICAgfVxuICAgIHJlZjEgPSBbJ2dyYWInLCAncmVsZWFzZScsICdkcmFnJ107XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICB0eXBlID0gcmVmMVtqXTtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIodHlwZSwgdGhpc1t0eXBlICsgXCJDYXB0dXJlTGlzdGVuZXJcIl0sIHRydWUpO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0eXBlLCB0aGlzW3R5cGUgKyBcIkxpc3RlbmVyXCJdLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciAkLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHJlZ2lvbnM7XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgICQgPSB0aGlzLl9fX3J1bnRpbWU7XG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgICAgIGlmICgkLmdyYWIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdhY3RpdmUnO1xuICAgICAgICBpZiAoKHJlZiA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmLmRyYWcgOiB2b2lkIDApIHtcbiAgICAgICAgICB0aGlzLmJyb2FkY2FzdEV2ZW50KG5ldyBFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiAnZHJhZycsXG4gICAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgICAgeTogZXZlbnQueSxcbiAgICAgICAgICAgIG9mZnNldFg6IGV2ZW50LnggLSAoKChyZWYxID0gJC5kcmFnRXZlbnQpICE9IG51bGwgPyByZWYxLnggOiB2b2lkIDApIHx8ICgocmVmMiA9ICQuZ3JhYkV2ZW50KSAhPSBudWxsID8gcmVmMi54IDogdm9pZCAwKSB8fCAwKSxcbiAgICAgICAgICAgIG9mZnNldFk6IGV2ZW50LnkgLSAoKChyZWYzID0gJC5kcmFnRXZlbnQpICE9IG51bGwgPyByZWYzLnkgOiB2b2lkIDApIHx8ICgocmVmNCA9ICQuZ3JhYkV2ZW50KSAhPSBudWxsID8gcmVmNC55IDogdm9pZCAwKSB8fCAwKVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyZWdpb25zID0gZXZlbnQucmVnaW9ucykge1xuICAgICAgICB0aGlzLnN0YXRlID0gKHJlZ2lvbnMuaG92ZXIgPyAnaG92ZXInIDogcmVnaW9ucy5ub3JtYWwgPyAnbm9ybWFsJyA6IHZvaWQgMCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUubW91c2Vkb3duQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSwgbGVuLCBuYW1lLCByZWYsIHJlZ2lvbnMsIHN0YXRlO1xuICAgIENvbXBvbmVudC5fX3N1cGVyX18ubW91c2Vkb3duQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGV2ZW50ICYmIChyZWdpb25zID0gZXZlbnQucmVnaW9ucykpIHtcbiAgICAgIHJlZiA9IFsnYWN0aXZlJywgJ2hvdmVyJywgJ25vcm1hbCddO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSByZWZbaV07XG4gICAgICAgIGlmICghcmVnaW9uc1tuYW1lXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBudWxsKSkge1xuICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNldXBDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciAkLCBpLCBsZW4sIG5hbWUsIHJlZiwgcmVmMSwgcmVnaW9ucywgc3RhdGU7XG4gICAgQ29tcG9uZW50Ll9fc3VwZXJfXy5tb3VzZXVwQ2FwdHVyZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICAkID0gdGhpcy5fX19ydW50aW1lO1xuICAgICAgaWYgKHJlZ2lvbnMgPSBldmVudC5yZWdpb25zKSB7XG4gICAgICAgIHJlZiA9IFsnYWN0aXZlJywgJ2hvdmVyJywgJ25vcm1hbCddO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBuYW1lID0gcmVmW2ldO1xuICAgICAgICAgIGlmICghcmVnaW9uc1tuYW1lXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0gbmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLnN0YXRlID0gc3RhdGUgfHwgbnVsbCkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgIH1cbiAgICAgIGlmICgkLmdyYWIpIHtcbiAgICAgICAgJC5ncmFiID0gZmFsc2U7XG4gICAgICAgIGlmICgocmVmMSA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmMS5yZWxlYXNlIDogdm9pZCAwKSB7XG4gICAgICAgICAgdGhpcy5icm9hZGNhc3RFdmVudCgkLnJlbGVhc2VFdmVudCA9IG5ldyBFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiAncmVsZWFzZScsXG4gICAgICAgICAgICB4OiBldmVudC54LFxuICAgICAgICAgICAgeTogZXZlbnQueVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLm1vdXNlZG93bkxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgJCwgcmVmO1xuICAgIENvbXBvbmVudC5fX3N1cGVyX18ubW91c2Vkb3duTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmICgodGhpcy5zdGF0ZSA9PT0gJ2FjdGl2ZScpICYmICgocmVmID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYuZ3JhYiA6IHZvaWQgMCkpIHtcbiAgICAgICAgKCQgPSB0aGlzLl9fX3J1bnRpbWUpLmdyYWIgPSB0cnVlO1xuICAgICAgICAkLmRyYWdFdmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0RXZlbnQobmV3IEV2ZW50KHtcbiAgICAgICAgICB0eXBlOiAnZ3JhYicsXG4gICAgICAgICAgeDogZXZlbnQueCxcbiAgICAgICAgICB5OiBldmVudC55XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5kcmFnQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuX19fcnVudGltZS5kcmFnRXZlbnQgPSBldmVudDtcbiAgICAgIHRoaXMubG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5ncmFiQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuX19fcnVudGltZS5ncmFiRXZlbnQgPSBldmVudDtcbiAgICAgIHRoaXMubG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5yZWxlYXNlQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuX19fcnVudGltZS5yZWxlYXNlRXZlbnQgPSBldmVudDtcbiAgICAgIHRoaXMubG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5kcmFnTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDb21wb25lbnQucHJvdG90eXBlLmdyYWJMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUucmVsZWFzZUxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIENvbXBvbmVudDtcblxufSkocmVxdWlyZSgnLi9zaGFwZScpKTtcbiIsInZhciBFbGVtZW50LFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFbGVtZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbGVtZW50KCkge1xuICAgIHZhciBmbiwgaSwgaiwgbGVuLCBsZW4xLCByZWYsIHJlZjEsIHR5cGU7XG4gICAgRWxlbWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodGhpcy5vcmlnaW4pIHtcbiAgICAgIHRoaXMub3JpZ2luID0ge1xuICAgICAgICB4OiB0aGlzLm9yaWdpbi54IHx8IDAsXG4gICAgICAgIHk6IHRoaXMub3JpZ2luLnkgfHwgMFxuICAgICAgfTtcbiAgICB9XG4gICAgcmVmID0gWydtb3VzZW1vdmUnLCAnbW91c2Vkb3duJywgJ21vdXNldXAnXTtcbiAgICBmbiA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgX3RoaXMuYWRkTGlzdGVuZXIoe1xuICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgY2FwdHVyZTogdHJ1ZSxcbiAgICAgICAgICBsaXN0ZW5lcjogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciByZWYxO1xuICAgICAgICAgICAgaWYgKCEoKHJlZjEgPSB0aGlzLmV2ZW50cykgIT0gbnVsbCA/IHJlZjFbdHlwZV0gOiB2b2lkIDApKSB7XG4gICAgICAgICAgICAgIHJldHVybiBldmVudC5jYW5jZWwoKS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF90aGlzLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgIGNhcHR1cmU6IGZhbHNlLFxuICAgICAgICAgIGxpc3RlbmVyOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIHJlZjE7XG4gICAgICAgICAgICBpZiAoISgocmVmMSA9IHRoaXMuZXZlbnRzKSAhPSBudWxsID8gcmVmMVt0eXBlXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmNhbmNlbCgpLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHR5cGUgPSByZWZbaV07XG4gICAgICBmbih0eXBlKTtcbiAgICB9XG4gICAgcmVmMSA9IFsnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJ107XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICB0eXBlID0gcmVmMVtqXTtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXIodHlwZSwgdGhpc1t0eXBlICsgXCJDYXB0dXJlTGlzdGVuZXJcIl0sIHRydWUpO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0eXBlLCB0aGlzW3R5cGUgKyBcIkxpc3RlbmVyXCJdLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubG9jYWxpemVFdmVudENvb3JkaW5hdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgcmVmLCByZWYxLCB4LCB5O1xuICAgIGlmIChldmVudCkge1xuICAgICAgeCA9IChldmVudC5sb2NhbFggIT0gbnVsbCA/IGV2ZW50LmxvY2FsWCA6IGV2ZW50LngpO1xuICAgICAgZXZlbnQubG9jYWxYID0geCAtICgoKHJlZiA9IHRoaXMub3JpZ2luKSAhPSBudWxsID8gcmVmLnggOiB2b2lkIDApIHx8IDApO1xuICAgICAgeSA9IChldmVudC5sb2NhbFkgIT0gbnVsbCA/IGV2ZW50LmxvY2FsWSA6IGV2ZW50LnkpO1xuICAgICAgZXZlbnQubG9jYWxZID0geSAtICgoKHJlZjEgPSB0aGlzLm9yaWdpbikgIT0gbnVsbCA/IHJlZjEueSA6IHZvaWQgMCkgfHwgMCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNlbW92ZUNhcHR1cmVMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICB0aGlzLl9fX3J1bnRpbWUubW91c2Vtb3ZlRXZlbnQgPSBldmVudDtcbiAgICAgIHRoaXMubG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2Vkb3duQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuX19fcnVudGltZS5tb3VzZWRvd25FdmVudCA9IGV2ZW50O1xuICAgICAgdGhpcy5sb2NhbGl6ZUV2ZW50Q29vcmRpbmF0ZXMoZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZXVwQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuX19fcnVudGltZS5tb3VzZXVwRXZlbnQgPSBldmVudDtcbiAgICAgIHRoaXMubG9jYWxpemVFdmVudENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUubW91c2Vtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFbGVtZW50LnByb3RvdHlwZS5tb3VzZWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEVsZW1lbnQucHJvdG90eXBlLm1vdXNldXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFbGVtZW50O1xuXG59KShyZXF1aXJlKCdlY2wvZGlzdC9ldmVudGVkJykpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEVsZW1lbnQ6IHJlcXVpcmUoJy4vZWxlbWVudCcpLFxuICBTaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpLFxuICBDb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50Jylcbn07XG4iLCJ2YXIgU2hhcGUsXG4gIGV4dGVuZCA9IHJlcXVpcmUoXCJleHRlbmRzX19cIiksXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGFwZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChTaGFwZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gU2hhcGUoKSB7XG4gICAgdmFyIG5hbWUsIHJlZ2lvbiwgcmVnaW9ucztcbiAgICBTaGFwZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAocmVnaW9ucyA9IHRoaXMucmVnaW9ucykge1xuICAgICAgdGhpcy5yZWdpb25zID0ge307XG4gICAgICBmb3IgKG5hbWUgaW4gcmVnaW9ucykge1xuICAgICAgICByZWdpb24gPSByZWdpb25zW25hbWVdO1xuICAgICAgICB0aGlzLnJlZ2lvbnNbbmFtZV0gPSByZWdpb247XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgU2hhcGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGFwZS5wcm90b3R5cGUuZ2V0RXZlbnRSZWdpb25zID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgJCwgbmFtZSwgcmVmLCByZXN1bHQsIHgsIHk7XG4gICAgcmVzdWx0ID0gbnVsbDtcbiAgICBpZiAoZXZlbnQgJiYgKCh4ID0gZXZlbnQubG9jYWxYKSAhPSBudWxsKSAmJiAoKHkgPSBldmVudC5sb2NhbFkpICE9IG51bGwpKSB7XG4gICAgICByZWYgPSB0aGlzLnJlZ2lvbnM7XG4gICAgICBmb3IgKG5hbWUgaW4gcmVmKSB7XG4gICAgICAgICQgPSByZWZbbmFtZV07XG4gICAgICAgIGlmICgoJFswXSA8PSB4ICYmIHggPD0gKCRbMF0gKyAkWzJdKSkgJiYgKCRbMV0gPD0geSAmJiB5IDw9ICgkWzFdICsgJFszXSkpKSB7XG4gICAgICAgICAgcmVzdWx0IHx8IChyZXN1bHQgPSB7fSk7XG4gICAgICAgICAgcmVzdWx0W25hbWVdID0gJDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIFNoYXBlLl9fc3VwZXJfXy5tb3VzZW1vdmVDYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5yZWdpb25zID0gdGhpcy5nZXRFdmVudFJlZ2lvbnMoZXZlbnQpKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5tb3VzZWRvd25DYXB0dXJlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIFNoYXBlLl9fc3VwZXJfXy5tb3VzZWRvd25DYXB0dXJlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5yZWdpb25zID0gdGhpcy5nZXRFdmVudFJlZ2lvbnMoZXZlbnQpKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFNoYXBlLnByb3RvdHlwZS5tb3VzZXVwQ2FwdHVyZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBTaGFwZS5fX3N1cGVyX18ubW91c2V1cENhcHR1cmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnJlZ2lvbnMgPSB0aGlzLmdldEV2ZW50UmVnaW9ucyhldmVudCkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIFNoYXBlO1xuXG59KShyZXF1aXJlKCcuL2VsZW1lbnQnKSk7XG4iLCJ2YXIgQmFzZSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEJhc2UoYXJncykge1xuICAgIHZhciBrZXksIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGFyZ3MpIHtcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGFyZ3MsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgdmFsdWUgPSBhcmdzW2tleV07XG4gICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfX19ydW50aW1lJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IChhcmdzICE9IG51bGwgPyBhcmdzLl9fX3J1bnRpbWUgOiB2b2lkIDApIHx8IHt9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gQmFzZTtcblxufSkoKTtcbiIsInZhciBFdmVudCxcbiAgZXh0ZW5kID0gcmVxdWlyZShcImV4dGVuZHNfX1wiKSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEV2ZW50LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFdmVudCh0eXBlLCBjYWxsYmFjaykge1xuICAgIHZhciBhcmdzLCBkYXRlLCBwZXJmO1xuICAgIGFyZ3MgPSAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8ge1xuICAgICAgdHlwZTogdHlwZVxuICAgIH0gOiB0eXBlIHx8IHt9KTtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhcmdzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIEV2ZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgIGlmICh0aGlzLnRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgICBwZXJmID0gKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCA/IHBlcmZvcm1hbmNlLm5vdygpIDogdm9pZCAwKSB8fCAwO1xuICAgICAgdGhpcy50aW1lc3RhbXAgPSAxMDAwICogZGF0ZSArIE1hdGguZmxvb3IoMTAwMCAqIChwZXJmIC0gTWF0aC5mbG9vcihwZXJmKSkpO1xuICAgIH1cbiAgfVxuXG4gIEV2ZW50LnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9fX3J1bnRpbWUuY2FuY2VsID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX19fcnVudGltZS5zdG9wID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBFdmVudDtcblxufSkocmVxdWlyZSgnLi9iYXNlJykpO1xuIiwidmFyIEV2ZW50LCBFdmVudGVkLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50ZWQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRXZlbnRlZCwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gRXZlbnRlZCgpIHtcbiAgICBFdmVudGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMubGlzdGVuZXJzID0gW3t9LCB7fV07XG4gIH1cblxuICBFdmVudGVkLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIGxpc3RlbmVycywgcmVmLCByZWYxLCByZWYyO1xuICAgIGlmIChjYXB0dXJlID09IG51bGwpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVmID0gdHlwZSwgdHlwZSA9IHJlZi50eXBlLCBsaXN0ZW5lciA9IHJlZi5saXN0ZW5lciwgY2FwdHVyZSA9IHJlZi5jYXB0dXJlO1xuICAgIH1cbiAgICBpZiAoKChyZWYxID0gdGhpcy5ldmVudHMpICE9IG51bGwgPyByZWYxW3R5cGVdIDogdm9pZCAwKSAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxpc3RlbmVycyA9ICgocmVmMiA9IHRoaXMubGlzdGVuZXJzW2NhcHR1cmUgPyAxIDogMF0pICE9IG51bGwgPyByZWYyW3R5cGVdIHx8IChyZWYyW3R5cGVdID0gW10pIDogdm9pZCAwKTtcbiAgICAgIGlmICgtMSA9PT0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpKSB7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgIHZhciBpZHgsIGxpc3RlbmVycywgcmVmLCByZWYxO1xuICAgIGlmIChjYXB0dXJlID09IG51bGwpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHJlZiA9IHR5cGUsIHR5cGUgPSByZWYudHlwZSwgbGlzdGVuZXIgPSByZWYubGlzdGVuZXIsIGNhcHR1cmUgPSByZWYuY2FwdHVyZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgJiYgdHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAobGlzdGVuZXJzID0gKHJlZjEgPSB0aGlzLmxpc3RlbmVyc1tjYXB0dXJlID8gMSA6IDBdKSAhPSBudWxsID8gcmVmMVt0eXBlXSA6IHZvaWQgMCkge1xuICAgICAgICBpZiAoLTEgIT09IChpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikpKSB7XG4gICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50ZWQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpLCBsZW4sIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIHBoYXNlLCByZWYsIHJlZjEsIHR5cGU7XG4gICAgaWYgKCEoKGV2ZW50ICE9IG51bGwgPyBldmVudC5hYm9ydGVkIDogdm9pZCAwKSB8fCAoZXZlbnQgIT0gbnVsbCA/IGV2ZW50LmNhbmNlbGVkIDogdm9pZCAwKSkpIHtcbiAgICAgIGlmICgodHlwZSA9IGV2ZW50ICE9IG51bGwgPyBldmVudC50eXBlIDogdm9pZCAwKSAmJiB0aGlzLmV2ZW50c1t0eXBlXSkge1xuICAgICAgICBwaGFzZSA9IGV2ZW50LnBoYXNlO1xuICAgICAgICBpZiAoKCgzID4gcGhhc2UgJiYgcGhhc2UgPiAwKSkgJiYgKGxpc3RlbmVycyA9IChyZWYgPSB0aGlzLmxpc3RlbmVycykgIT0gbnVsbCA/IHJlZlsyIC0gcGhhc2VdW3R5cGVdIDogdm9pZCAwKSkge1xuICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICAgICAgICBpZiAoKChyZWYxID0gZXZlbnQuX19fcnVudGltZSkgIT0gbnVsbCA/IHJlZjEuY2FuY2VsZWQgOiB2b2lkIDApIHx8IGV2ZW50LmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRlZC5wcm90b3R5cGUuYnJvYWRjYXN0RXZlbnQgPSBmdW5jdGlvbihldmVudCwgdGFyZ2V0KSB7XG4gICAgdmFyIGJhc2UsIGNoaWxkLCBpLCBsZW4sIHBoYXNlLCByZWYsIHJlZjEsIHR5cGU7XG4gICAgaWYgKCh0eXBlID0gZXZlbnQgIT0gbnVsbCA/IGV2ZW50LnR5cGUgOiB2b2lkIDApICYmIChldmVudC5waGFzZSB8fCAwKSA8IDMpIHtcbiAgICAgIGlmICghKGV2ZW50LmFib3J0ZWQgfHwgZXZlbnQuX19fcnVudGltZS5zdG9wcGVkKSkge1xuICAgICAgICAoYmFzZSA9IGV2ZW50Ll9fX3J1bnRpbWUpLnNvdXJjZSB8fCAoYmFzZS5zb3VyY2UgPSB0aGlzKTtcbiAgICAgICAgcGhhc2UgPSAoZXZlbnQucGhhc2UgfHwgKGV2ZW50LnBoYXNlID0gMSkpO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKSB7XG4gICAgICAgICAgZXZlbnQucGhhc2UgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5waGFzZSA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJlZiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgY2hpbGQgPSByZWZbaV07XG4gICAgICAgICAgICAgIGlmICghKGV2ZW50LmFib3J0ZWQgfHwgZXZlbnQuX19fcnVudGltZS5jYW5jZWxlZCkpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5icm9hZGNhc3RFdmVudChldmVudCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykge1xuICAgICAgICAgIGV2ZW50LnBoYXNlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucGhhc2UgPT09IDIpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5fX19ydW50aW1lLnNvdXJjZSA9PT0gdGhpcyAmJiBldmVudC5waGFzZSA8IDQpIHtcbiAgICAgICAgICBpZiAoKHJlZjEgPSBldmVudC5jYWxsYmFjaykgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZWYxLmNhbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICByZWYxLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudC5waGFzZSA9IDQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50ZWQ7XG5cbn0pKHJlcXVpcmUoJy4vbm9kZScpKTtcbiIsInZhciBOb2RlLFxuICBleHRlbmQgPSByZXF1aXJlKFwiZXh0ZW5kc19fXCIpLFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChOb2RlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBOb2RlKCkge1xuICAgIE5vZGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBOb2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHJlZjtcbiAgICBpZiAoY2hpbGQgIT09IHRoaXMpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4gfHwgKHRoaXMuY2hpbGRyZW4gPSBbXSk7XG4gICAgICBpZiAoLTEgPT09IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkpIHtcbiAgICAgICAgaWYgKChyZWYgPSBjaGlsZC5wYXJlbnQpICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlZi5yZW1vdmVDaGlsZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZWYucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIGlkeCwgcmVmO1xuICAgIGlmICgoKHJlZiA9IHRoaXMuY2hpbGRyZW4pICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwKSAmJiAtMSAhPT0gKGlkeCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkpKSB7XG4gICAgICBkZWxldGUgY2hpbGQucGFyZW50O1xuICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgdGhpcy5jaGlsZHJlbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIE5vZGU7XG5cbn0pKHJlcXVpcmUoJy4vYmFzZScpKTtcbiIsInZhciBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDaGlsZENsYXNzLCBQYXJlbnRDbGFzc2VzKSB7XG4gIHZhciBNaXhpbkNsYXNzLCBQYXJlbnRDbGFzcywgaSwga2V5LCBsZW4sIHJlZiwgdmFsdWU7XG4gIGlmIChQYXJlbnRDbGFzc2VzIGluc3RhbmNlb2YgQXJyYXkgJiYgUGFyZW50Q2xhc3Nlcy5sZW5ndGgpIHtcbiAgICBQYXJlbnRDbGFzcyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgICBleHRlbmQoUGFyZW50Q2xhc3MsIHN1cGVyQ2xhc3MpO1xuXG4gICAgICBmdW5jdGlvbiBQYXJlbnRDbGFzcygpIHtcbiAgICAgICAgdmFyIE1peGluQ2xhc3MsIGksIGxlbjtcbiAgICAgICAgUGFyZW50Q2xhc3MuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IFBhcmVudENsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBNaXhpbkNsYXNzID0gUGFyZW50Q2xhc3Nlc1tpXTtcbiAgICAgICAgICBNaXhpbkNsYXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFBhcmVudENsYXNzO1xuXG4gICAgfSkoUGFyZW50Q2xhc3Nlcy5zaGlmdCgpKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBQYXJlbnRDbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBNaXhpbkNsYXNzID0gUGFyZW50Q2xhc3Nlc1tpXTtcbiAgICAgIHJlZiA9IE1peGluQ2xhc3MucHJvdG90eXBlO1xuICAgICAgZm9yIChrZXkgaW4gcmVmKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZiwga2V5KSkgY29udGludWU7XG4gICAgICAgIHZhbHVlID0gcmVmW2tleV07XG4gICAgICAgIGlmIChrZXkgIT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICBQYXJlbnRDbGFzcy5wcm90b3R5cGVba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFBhcmVudENsYXNzID0gUGFyZW50Q2xhc3NlcztcbiAgfVxuICByZXR1cm4gZXh0ZW5kKENoaWxkQ2xhc3MsIFBhcmVudENsYXNzKTtcbn07XG4iXX0=
