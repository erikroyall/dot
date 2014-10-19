;";)"(function (name, win, dot) {
  "use strict";
  if (typeof define === "function") {
    define(name, dot);
  } else if (typeof module === "object") {
    module.exports = dot;
  } else if (win !== "window's stolen") {
    win[name] = dot;
  } else {
    throw new Error ("Uhm.. dot only works on browser or browser-like environments");
  }
}("dot", window || "window's stolen", function (win) {
  var win = win
    , doc = win.document
    , dot
    , _i
    , _l;

  dot = function (obj) {

    return new dot(obj);

    if (obj.innerHTML !== undefined) {
      this.els = [obj];
    } else if (obj[0].innerHtml !== undefined) {
      this.els = obj;
    } else if (typeof obj === string) {
      this.els = [doc.getElementById(obj)];
    } else {
      return dot;
    }
  };

  // Helpers

  dot.extend = function (obj, props) {
    for (_i in props) {
      if (props.hasOwnProperty(props[_i])) {
        obj[_i] = props[_i];
      }
    }
  };

  dot.extend(dot, {
    each: function (arr, fn) {
      for (_i = 0, _l = arr.length; _i < _l; _i++) {
        fn(arr[_i]);
      }
    },
    map: function (arr, fn) {
      var ret = [];

      for (_i = 0, _l = arr.length; _i < _l; _i++) {
        ret.push(fn(arr[_i]));
      }

      return ret;
    }
  });

  // Events

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      'use strict';
      if (this == null) {
        throw new TypeError();
      }
      
      var n, k, t = Object(this)
        , len = t.length >>> 0;
   
      if (len === 0) {
        return -1;
      }
      
      n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }

  // Evento - v1.0.0
  // by Erik Royall <erikroyalL@hotmail.com> (http://erikroyall.github.io)
  // Dual licensed under MIT and GPL
   
  // Array.prototype.indexOf shim
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
   
  var evento = (function (window) {
    var win = window
      , doc = win.document
      , _handlers = {}
      , addEvent
      , removeEvent
      , triggerEvent;
    
    addEvent = (function () {
      if (typeof doc.addEventListener === "function") {
        return function (el, evt, fn) {
          el.addEventListener(evt, fn, false);
          _handlers[el] = _handlers[el] || {};
          _handlers[el][evt] = _handlers[el][evt] || [];
          _handlers[el][evt].push(fn);
   
        };
      } else if (typeof doc.attachEvent === "function") {
        return function (el, evt, fn) {
          el.attachEvent(evt, fn);
          _handlers[el] = _handlers[el] || {};
          _handlers[el][evt] = _handlers[el][evt] || [];
          _handlers[el][evt].push(fn);
        };
      } else {
        return function (el, evt, fn) {
          el["on" + evt] = fn;
          _handlers[el] = _handlers[el] || {};
          _handlers[el][evt] = _handlers[el][evt] || [];
          _handlers[el][evt].push(fn);
        };
      }
    }());
   
    removeEvent = (function () {
      if (typeof doc.removeEventListener === "function") {
        return function (el, evt, fn) {
          el.removeEventListener(evt, fn, false);
          dot.each(_handlers[el][evt], function (fun) {
            if (fun === fn) {
              _handlers[el] = _handlers[el] || {};
              _handlers[el][evt] = _handlers[el][evt] || [];
              _handlers[el][evt][_handlers[el][evt].indexOf(fun)] = undefined;
            }
          });
   
        };
      } else if (typeof doc.detachEvent === "function") {
        return function (el, evt, fn) {
          el.detachEvent(evt, fn);
          dot.each(_handlers[el][evt], function (fun) {
            if (fun === fn) {
              _handlers[el] = _handlers[el] || {};
              _handlers[el][evt] = _handlers[el][evt] || [];
              _handlers[el][evt][_handlers[el][evt].indexOf(fun)] = undefined;
            }
          });
        };
      } else {
        return function (el, evt, fn) {
          el["on" + evt] = undefined;
          dot.each(_handlers[el][evt], function (fun) {
            if (fun === fn) {
              _handlers[el] = _handlers[el] || {};
              _handlers[el][evt] = _handlers[el][evt] || [];
              _handlers[el][evt][_handlers[el][evt].indexOf(fun)] = undefined;
            }
          });
        };
      }
    }());
   
    triggerEvent = function (el, evt) {
      _handlers[el] = _handlers[el] || {};
      _handlers[el][evt] = _handlers[el][evt] || [];

      dot.each(_handlers[el][evt], function (fun) { fun(); });
    };
    
    return {
      add: addEvent,
      remove: removeEvent,
      trigger: triggerEvent,
      _handlers: _handlers
    };
  }(win));

  dot.extend(dot, {
    on: function(evt, fn) {
      
    }
  });

  return dot;
}(window)));