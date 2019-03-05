var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = a : a(jQuery);
}(function (a) {
  function b(b) {
    var g = b || window.event,
        h = i.call(arguments, 1),
        j = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
      if (1 === g.deltaMode) {
        var q = a.data(this, "mousewheel-line-height");j *= q, m *= q, l *= q;
      } else if (2 === g.deltaMode) {
        var r = a.data(this, "mousewheel-page-height");j *= r, m *= r, l *= r;
      }if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
        var s = this.getBoundingClientRect();o = b.clientX - s.left, p = b.clientY - s.top;
      }return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h);
    }
  }function c() {
    f = null;
  }function d(a, b) {
    return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
  }var e,
      f,
      g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      i = Array.prototype.slice;if (a.event.fixHooks) for (var j = g.length; j;) {
    a.event.fixHooks[g[--j]] = a.event.mouseHooks;
  }var k = a.event.special.mousewheel = { version: "3.1.12", setup: function setup() {
      if (this.addEventListener) for (var c = h.length; c;) {
        this.addEventListener(h[--c], b, !1);
      } else this.onmousewheel = b;a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
    }, teardown: function teardown() {
      if (this.removeEventListener) for (var c = h.length; c;) {
        this.removeEventListener(h[--c], b, !1);
      } else this.onmousewheel = null;a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
    }, getLineHeight: function getLineHeight(b) {
      var c = a(b),
          d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
    }, getPageHeight: function getPageHeight(b) {
      return a(b).height();
    }, settings: { adjustOldDeltas: !0, normalizeOffset: !0 } };a.fn.extend({ mousewheel: function mousewheel(a) {
      return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
    }, unmousewheel: function unmousewheel(a) {
      return this.unbind("mousewheel", a);
    } });
});!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = a : a(jQuery);
}(function (a) {
  function b(b) {
    var g = b || window.event,
        h = i.call(arguments, 1),
        j = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
      if (1 === g.deltaMode) {
        var q = a.data(this, "mousewheel-line-height");j *= q, m *= q, l *= q;
      } else if (2 === g.deltaMode) {
        var r = a.data(this, "mousewheel-page-height");j *= r, m *= r, l *= r;
      }if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
        var s = this.getBoundingClientRect();o = b.clientX - s.left, p = b.clientY - s.top;
      }return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h);
    }
  }function c() {
    f = null;
  }function d(a, b) {
    return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
  }var e,
      f,
      g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      i = Array.prototype.slice;if (a.event.fixHooks) for (var j = g.length; j;) {
    a.event.fixHooks[g[--j]] = a.event.mouseHooks;
  }var k = a.event.special.mousewheel = { version: "3.1.12", setup: function setup() {
      if (this.addEventListener) for (var c = h.length; c;) {
        this.addEventListener(h[--c], b, !1);
      } else this.onmousewheel = b;a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
    }, teardown: function teardown() {
      if (this.removeEventListener) for (var c = h.length; c;) {
        this.removeEventListener(h[--c], b, !1);
      } else this.onmousewheel = null;a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
    }, getLineHeight: function getLineHeight(b) {
      var c = a(b),
          d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
    }, getPageHeight: function getPageHeight(b) {
      return a(b).height();
    }, settings: { adjustOldDeltas: !0, normalizeOffset: !0 } };a.fn.extend({ mousewheel: function mousewheel(a) {
      return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
    }, unmousewheel: function unmousewheel(a) {
      return this.unbind("mousewheel", a);
    } });
});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document);
}(function (e) {
  !function (t) {
    var o = "function" == typeof define && define.amd,
        a = "undefined" != typeof module && module.exports,
        n = "https:" == document.location.protocol ? "https:" : "http:",
        i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))), t();
  }(function () {
    var t,
        o = "mCustomScrollbar",
        a = "mCS",
        n = ".mCustomScrollbar",
        i = { setTop: 0, setLeft: 0, axis: "y", scrollbarPosition: "inside", scrollInertia: 950, autoDraggerLength: !0, alwaysShowScrollbar: 0, snapOffset: 0, mouseWheel: { enable: !0, scrollAmount: "auto", axis: "y", deltaFactor: "auto", disableOver: ["select", "option", "keygen", "datalist", "textarea"] }, scrollButtons: { scrollType: "stepless", scrollAmount: "auto" }, keyboard: { enable: !0, scrollType: "stepless", scrollAmount: "auto" }, contentTouchScroll: 25, documentTouchScroll: !0, advanced: { autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']", updateOnContentResize: !0, updateOnImageLoad: "auto", autoUpdateTimeout: 60 }, theme: "light", callbacks: { onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0 } },
        r = 0,
        l = {},
        s = window.attachEvent && !window.addEventListener ? 1 : 0,
        c = !1,
        d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
        u = { init: function init(t) {
        var t = e.extend(!0, {}, i, t),
            o = f.call(this);if (t.live) {
          var s = t.liveSelector || this.selector || n,
              c = e(s);if ("off" === t.live) return void m(s);l[s] = setTimeout(function () {
            c.mCustomScrollbar(t), "once" === t.live && c.length && m(s);
          }, 500);
        } else m(s);return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != _typeof(t.mouseWheel) && 1 == t.mouseWheel && (t.mouseWheel = { enable: !0, scrollAmount: "auto", axis: "y", preventDefault: !1, deltaFactor: "auto", normalizeDelta: !1, invert: !1 }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each(function () {
          var o = e(this);if (!o.data(a)) {
            o.data(a, { idx: ++r, opt: t, scrollRatio: { y: null, x: null }, overflowed: null, contentReset: { y: null, x: null }, bindEvents: !1, tweenRunning: !1, sequential: {}, langDir: o.css("direction"), cbOffsets: null, trigger: null, poll: { size: { o: 0, n: 0 }, img: { o: 0, n: 0 }, change: { o: 0, n: 0 } } });var n = o.data(a),
                i = n.opt,
                l = o.data("mcs-axis"),
                s = o.data("mcs-scrollbar-position"),
                c = o.data("mcs-theme");l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o);
          }
        });
      }, update: function update(t, o) {
        var n = t || f.call(this);return e(n).each(function () {
          var t = e(this);if (t.data(a)) {
            var n = t.data(a),
                i = n.opt,
                r = e("#mCSB_" + n.idx + "_container"),
                l = e("#mCSB_" + n.idx),
                s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];if (!r.length) return;n.tweenRunning && Q(t), o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), _.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)), n.overflowed = y.call(this), M.call(this), i.autoDraggerLength && S.call(this), b.call(this), T.call(this);var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];"x" !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (G(t, c[0].toString(), { dir: "y", dur: 0, overwrite: "none" }), n.contentReset.y = null) : (B.call(this), "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && G(t, c[1].toString(), { dir: "x", dur: 0, overwrite: "none" }))), "y" !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (G(t, c[1].toString(), { dir: "x", dur: 0, overwrite: "none" }), n.contentReset.x = null) : (B.call(this), "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && G(t, c[0].toString(), { dir: "y", dur: 0, overwrite: "none" }))), o && n && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), N.call(this);
          }
        });
      }, scrollTo: function scrollTo(t, o) {
        if ("undefined" != typeof t && null != t) {
          var n = f.call(this);return e(n).each(function () {
            var n = e(this);if (n.data(a)) {
              var i = n.data(a),
                  r = i.opt,
                  l = { trigger: "external", scrollInertia: r.scrollInertia, scrollEasing: "mcsEaseInOut", moveDragger: !1, timeout: 60, callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0 },
                  s = e.extend(!0, {}, l, o),
                  c = Y.call(this, t),
                  d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;c[0] = X.call(this, c[0], "y"), c[1] = X.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = ne() ? 0 : d, setTimeout(function () {
                null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", G(n, c[0].toString(), s)), null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", G(n, c[1].toString(), s));
              }, s.timeout);
            }
          });
        }
      }, stop: function stop() {
        var t = f.call(this);return e(t).each(function () {
          var t = e(this);t.data(a) && Q(t);
        });
      }, disable: function disable(t) {
        var o = f.call(this);return e(o).each(function () {
          var o = e(this);if (o.data(a)) {
            o.data(a);N.call(this, "remove"), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3]);
          }
        });
      }, destroy: function destroy() {
        var t = f.call(this);return e(t).each(function () {
          var n = e(this);if (n.data(a)) {
            var i = n.data(a),
                r = i.opt,
                l = e("#mCSB_" + i.idx),
                s = e("#mCSB_" + i.idx + "_container"),
                c = e(".mCSB_" + i.idx + "_scrollbar");r.live && m(r.liveSelector || e(t).selector), N.call(this, "remove"), k.call(this), B.call(this), n.removeData(a), $(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4]);
          }
        });
      } },
        f = function f() {
      return "object" != _typeof(e(this)) || e(this).length < 1 ? n : this;
    },
        h = function h(t) {
      var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
          a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
          n = ["minimal", "minimal-dark"],
          i = ["minimal", "minimal-dark"],
          r = ["minimal", "minimal-dark"];t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition;
    },
        m = function m(e) {
      l[e] && (clearTimeout(l[e]), $(l, e));
    },
        p = function p(e) {
      return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y";
    },
        g = function g(e) {
      return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless";
    },
        v = function v() {
      var t = e(this),
          n = t.data(a),
          i = n.opt,
          r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
          l = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
          s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
          c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
          u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
          f = i.autoHideScrollbar ? " " + d[6] : "",
          h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft, t.addClass(o + " _" + a + "_" + n.idx + f + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + n.langDir + "' /></div>");var m = e("#mCSB_" + n.idx),
          p = e("#mCSB_" + n.idx + "_container");"y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)), w.call(this);var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width());
    },
        x = function x(t) {
      var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function () {
        return e(this).outerWidth(!0);
      }).get())],
          a = t.parent().width();return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%";
    },
        _ = function _() {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx + "_container");if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
        i.css({ width: "auto", "min-width": 0, "overflow-x": "scroll" });var r = Math.ceil(i[0].scrollWidth);3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({ width: r, "min-width": "100%", "overflow-x": "inherit" }) : i.css({ "overflow-x": "inherit", position: "absolute" }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({ width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left), "min-width": "100%", position: "relative" }).unwrap();
      }
    },
        w = function w() {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e(".mCSB_" + o.idx + "_scrollbar:first"),
          r = oe(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "",
          l = ["<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />"],
          s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3]);
    },
        S = function S() {
      var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
          l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
          c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())],
          d = s && c[1] < c[0] ? c[0] : c[1],
          u = s && c[3] < c[2] ? c[2] : c[3];r[0].css({ height: d, "max-height": r[0].parent().height() - 10 }).find(".mCSB_dragger_bar").css({ "line-height": c[0] + "px" }), r[1].css({ width: u, "max-width": r[1].parent().width() - 10 });
    },
        b = function b() {
      var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
          l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
          s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];o.scrollRatio = { y: s[0], x: s[1] };
    },
        C = function C(e, t, o) {
      var a = o ? d[0] + "_expanded" : "",
          n = e.closest(".mCSB_scrollTools");"active" === t ? (e.toggleClass(d[0] + " " + a), n.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])));
    },
        y = function y() {
      var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = null == o.overflowed ? i.height() : i.outerHeight(!1),
          l = null == o.overflowed ? i.width() : i.outerWidth(!1),
          s = i[0].scrollHeight,
          c = i[0].scrollWidth;return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()];
    },
        B = function B() {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx),
          r = e("#mCSB_" + o.idx + "_container"),
          l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];if (Q(t), ("x" !== n.axis && !o.overflowed[0] || "y" === n.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), G(t, "_resetY")), "y" !== n.axis && !o.overflowed[1] || "x" === n.axis && o.overflowed[1]) {
        var s = dx = 0;"rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), G(t, "_resetX");
      }
    },
        T = function T() {
      function t() {
        r = setTimeout(function () {
          e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t();
        }, 100);
      }var o = e(this),
          n = o.data(a),
          i = n.opt;if (!n.bindEvents) {
        if (I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable) {
          var r;t();
        }P.call(this), U.call(this), i.advanced.autoScrollOnFocus && H.call(this), i.scrollButtons.enable && F.call(this), i.keyboard.enable && q.call(this), n.bindEvents = !0;
      }
    },
        k = function k() {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = ".mCSB_" + o.idx + "_scrollbar",
          l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"),
          s = e("#mCSB_" + o.idx + "_container");n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!A() || top.document)).unbind("." + i), l.each(function () {
        e(this).unbind("." + i);
      }), clearTimeout(t[0]._focusTimeout), $(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), $(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), $(s[0], "onCompleteTimeout"), o.bindEvents = !1);
    },
        M = function M(t) {
      var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = e("#mCSB_" + n.idx + "_container_wrapper"),
          l = r.length ? r : e("#mCSB_" + n.idx + "_container"),
          s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")],
          c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];"x" !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), "y" !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5]);
    },
        O = function O(t) {
      var o = t.type,
          a = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
          n = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];switch (o) {case "pointerdown":case "MSPointerDown":case "pointermove":case "MSPointerMove":case "pointerup":case "MSPointerUp":
          return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];case "touchstart":case "touchmove":case "touchend":
          var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
              r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];default:
          return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1];}
    },
        I = function I() {
      function t(e, t, a, n) {
        if (h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, o.attr("id") === f[1]) var i = "x",
            s = (o[0].offsetLeft - t + n) * l.scrollRatio.x;else var i = "y",
            s = (o[0].offsetTop - e + a) * l.scrollRatio.y;G(r, s.toString(), { dir: i, drag: !0 });
      }var o,
          n,
          i,
          r = e(this),
          l = r.data(a),
          d = l.opt,
          u = a + "_" + l.idx,
          f = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
          h = e("#mCSB_" + l.idx + "_container"),
          m = e("#" + f[0] + ",#" + f[1]),
          p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
          g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);m.bind("contextmenu." + u, function (e) {
        e.preventDefault();
      }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function (t) {
        if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
          c = !0, s && (document.onselectstart = function () {
            return !1;
          }), L.call(h, !1), Q(r), o = e(this);var a = o.offset(),
              l = O(t)[0] - a.top,
              u = O(t)[1] - a.left,
              f = o.height() + a.top,
              m = o.width() + a.left;f > l && l > 0 && m > u && u > 0 && (n = l, i = u), C(o, "active", d.autoExpandScrollbar);
        }
      }).bind("touchmove." + u, function (e) {
        e.stopImmediatePropagation(), e.preventDefault();var a = o.offset(),
            r = O(e)[0] - a.top,
            l = O(e)[1] - a.left;t(n, i, r, l);
      }), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function (e) {
        if (o) {
          var a = o.offset(),
              r = O(e)[0] - a.top,
              l = O(e)[1] - a.left;if (n === r && i === l) return;t(n, i, r, l);
        }
      }).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function () {
        o && (C(o, "active", d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), L.call(h, !0);
      });
    },
        D = function D() {
      function o(e) {
        if (!te(e) || c || O(e)[2]) return void (t = 0);t = 1, b = 0, C = 0, d = 1, y.removeClass("mCS_touch_action");var o = I.offset();u = O(e)[0] - o.top, f = O(e)[1] - o.left, z = [O(e)[0], O(e)[1]];
      }function n(e) {
        if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
          g = K();var t = M.offset(),
              o = O(e)[0] - t.top,
              a = O(e)[1] - t.left,
              n = "mcsLinearOut";if (E.push(o), W.push(a), z[2] = Math.abs(O(e)[0] - z[0]), z[3] = Math.abs(O(e)[1] - z[1]), B.overflowed[0]) var i = D[0].parent().height() - D[0].height(),
              r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || "yx" === T.axis);if (B.overflowed[1]) var l = D[1].parent().width() - D[1].width(),
              h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || "yx" === T.axis);r || h ? (U || e.preventDefault(), b = 1) : (C = 1, y.addClass("mCS_touch_action")), U && e.preventDefault(), w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null], I[0].idleTimer = 250, B.overflowed[0] && s(w[0], R, n, "y", "all", !0), B.overflowed[1] && s(w[1], R, n, "x", L, !0);
        }
      }function i(e) {
        if (!te(e) || c || O(e)[2]) return void (t = 0);t = 1, e.stopImmediatePropagation(), Q(y), p = K();var o = M.offset();h = O(e)[0] - o.top, m = O(e)[1] - o.left, E = [], W = [];
      }function r(e) {
        if (te(e) && !c && !O(e)[2]) {
          d = 0, e.stopImmediatePropagation(), b = 0, C = 0, v = K();var t = M.offset(),
              o = O(e)[0] - t.top,
              a = O(e)[1] - t.left;if (!(v - g > 30)) {
            _ = 1e3 / (v - p);var n = "mcsEaseOut",
                i = 2.5 > _,
                r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];x = i ? [o - r[0], a - r[1]] : [o - h, a - m];var u = [Math.abs(x[0]), Math.abs(x[1])];_ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null], S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];var y = parseInt(T.contentTouchScroll) || 0;w[0] = u[0] > y ? w[0] : 0, w[1] = u[1] > y ? w[1] : 0, B.overflowed[0] && s(w[0], S[0], n, "y", L, !1), B.overflowed[1] && s(w[1], S[1], n, "x", L, !1);
          }
        }
      }function l(e, t) {
        var o = [1.5 * t, 2 * t, t / 1.5, t / 2];return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3];
      }function s(e, t, o, a, n, i) {
        e && G(y, e.toString(), { dur: t, scrollEasing: o, dir: a, overwrite: n, drag: i });
      }var d,
          u,
          f,
          h,
          m,
          p,
          g,
          v,
          x,
          _,
          w,
          S,
          b,
          C,
          y = e(this),
          B = y.data(a),
          T = B.opt,
          k = a + "_" + B.idx,
          M = e("#mCSB_" + B.idx),
          I = e("#mCSB_" + B.idx + "_container"),
          D = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")],
          E = [],
          W = [],
          R = 0,
          L = "yx" === T.axis ? "none" : "all",
          z = [],
          P = I.find("iframe"),
          H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k],
          U = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;I.bind(H[0], function (e) {
        o(e);
      }).bind(H[1], function (e) {
        n(e);
      }), M.bind(H[0], function (e) {
        i(e);
      }).bind(H[2], function (e) {
        r(e);
      }), P.length && P.each(function () {
        e(this).bind("load", function () {
          A(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function (e) {
            o(e), i(e);
          }).bind(H[1], function (e) {
            n(e);
          }).bind(H[2], function (e) {
            r(e);
          });
        });
      });
    },
        E = function E() {
      function o() {
        return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0;
      }function n(e, t, o) {
        d.type = o && i ? "stepped" : "stepless", d.scrollAmount = 10, j(r, e, t, "mcsLinearOut", o ? 60 : null);
      }var i,
          r = e(this),
          l = r.data(a),
          s = l.opt,
          d = l.sequential,
          u = a + "_" + l.idx,
          f = e("#mCSB_" + l.idx + "_container"),
          h = f.parent();f.bind("mousedown." + u, function () {
        t || i || (i = 1, c = !0);
      }).add(document).bind("mousemove." + u, function (e) {
        if (!t && i && o()) {
          var a = f.offset(),
              r = O(e)[0] - a.top + f[0].offsetTop,
              c = O(e)[1] - a.left + f[0].offsetLeft;r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)), "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)));
        }
      }).bind("mouseup." + u + " dragend." + u, function () {
        t || (i && (i = 0, n("off", null)), c = !1);
      });
    },
        W = function W() {
      function t(t, a) {
        if (Q(o), !z(o, t.target)) {
          var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
              d = i.scrollInertia;if ("x" === i.axis || "x" === i.mouseWheel.axis) var u = "x",
              f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
              h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0],
              m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft),
              p = c[1][0].offsetLeft,
              g = c[1].parent().width() - c[1].width(),
              v = "y" === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;else var u = "y",
              f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
              h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0],
              m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop),
              p = c[0][0].offsetTop,
              g = c[0].parent().height() - c[0].height(),
              v = t.deltaY || a;"y" === u && !n.overflowed[0] || "x" === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), G(o, (m - v * h).toString(), { dir: u, dur: d }));
        }
      }if (e(this).data(a)) {
        var o = e(this),
            n = o.data(a),
            i = n.opt,
            r = a + "_" + n.idx,
            l = e("#mCSB_" + n.idx),
            c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
            d = e("#mCSB_" + n.idx + "_container").find("iframe");d.length && d.each(function () {
          e(this).bind("load", function () {
            A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function (e, o) {
              t(e, o);
            });
          });
        }), l.bind("mousewheel." + r, function (e, o) {
          t(e, o);
        });
      }
    },
        R = new Object(),
        A = function A(t) {
      var o = !1,
          a = !1,
          n = null;if (void 0 === t ? a = "#empty" : void 0 !== e(t).attr("id") && (a = e(t).attr("id")), a !== !1 && void 0 !== R[a]) return R[a];if (t) {
        try {
          var i = t.contentDocument || t.contentWindow.document;n = i.body.innerHTML;
        } catch (r) {}o = null !== n;
      } else {
        try {
          var i = top.document;n = i.body.innerHTML;
        } catch (r) {}o = null !== n;
      }return a !== !1 && (R[a] = o), o;
    },
        L = function L(e) {
      var t = this.find("iframe");if (t.length) {
        var o = e ? "auto" : "none";t.css("pointer-events", o);
      }
    },
        z = function z(t, o) {
      var n = o.nodeName.toLowerCase(),
          i = t.data(a).opt.mouseWheel.disableOver,
          r = ["select", "textarea"];return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"));
    },
        P = function P() {
      var t,
          o = e(this),
          n = o.data(a),
          i = a + "_" + n.idx,
          r = e("#mCSB_" + n.idx + "_container"),
          l = r.parent(),
          s = e(".mCSB_" + n.idx + "_scrollbar ." + d[12]);s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function (o) {
        c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1);
      }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function () {
        c = !1;
      }).bind("click." + i, function (a) {
        if (t && (t = 0, e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail"))) {
          Q(o);var i = e(this),
              s = i.find(".mCSB_dragger");if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
            if (!n.overflowed[1]) return;var c = "x",
                u = a.pageX > s.offset().left ? -1 : 1,
                f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width());
          } else {
            if (!n.overflowed[0]) return;var c = "y",
                u = a.pageY > s.offset().top ? -1 : 1,
                f = Math.abs(r[0].offsetTop) - u * (.9 * l.height());
          }G(o, f.toString(), { dir: c, scrollEasing: "mcsEaseInOut" });
        }
      });
    },
        H = function H() {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = e("#mCSB_" + o.idx + "_container"),
          l = r.parent();r.bind("focusin." + i, function () {
        var o = e(document.activeElement),
            a = r.find(".mCustomScrollBox").length,
            i = 0;o.is(n.advanced.autoScrollOnFocus) && (Q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = a ? (i + 17) * a : 0, t[0]._focusTimeout = setTimeout(function () {
          var e = [ae(o)[0], ae(o)[1]],
              a = [r[0].offsetTop, r[0].offsetLeft],
              s = [a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1), a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1)],
              c = "yx" !== n.axis || s[0] || s[1] ? "all" : "none";"x" === n.axis || s[0] || G(t, e[0].toString(), { dir: "y", scrollEasing: "mcsEaseInOut", overwrite: c, dur: i }), "y" === n.axis || s[1] || G(t, e[1].toString(), { dir: "x", scrollEasing: "mcsEaseInOut", overwrite: c, dur: i });
        }, t[0]._focusTimer));
      });
    },
        U = function U() {
      var t = e(this),
          o = t.data(a),
          n = a + "_" + o.idx,
          i = e("#mCSB_" + o.idx + "_container").parent();i.bind("scroll." + n, function () {
        0 === i.scrollTop() && 0 === i.scrollLeft() || e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden");
      });
    },
        F = function F() {
      var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = o.sequential,
          r = a + "_" + o.idx,
          l = ".mCSB_" + o.idx + "_scrollbar",
          s = e(l + ">a");s.bind("contextmenu." + r, function (e) {
        e.preventDefault();
      }).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function (a) {
        function r(e, o) {
          i.scrollAmount = n.scrollButtons.scrollAmount, j(t, e, o);
        }if (a.preventDefault(), ee(a)) {
          var l = e(this).attr("class");switch (i.type = n.scrollButtons.scrollType, a.type) {case "mousedown":case "touchstart":case "pointerdown":case "MSPointerDown":
              if ("stepped" === i.type) return;c = !0, o.tweenRunning = !1, r("on", l);break;case "mouseup":case "touchend":case "pointerup":case "MSPointerUp":case "mouseout":case "pointerout":case "MSPointerOut":
              if ("stepped" === i.type) return;c = !1, i.dir && r("off", l);break;case "click":
              if ("stepped" !== i.type || o.tweenRunning) return;r("on", l);}
        }
      });
    },
        q = function q() {
      function t(t) {
        function a(e, t) {
          r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && n.tweenRunning || j(o, e, t);
        }switch (t.type) {case "blur":
            n.tweenRunning && r.dir && a("off", null);break;case "keydown":case "keyup":
            var l = t.keyCode ? t.keyCode : t.which,
                s = "on";if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
              if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1]) return;"keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l));
            } else if (33 === l || 34 === l) {
              if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                Q(o);var f = 34 === l ? -1 : 1;if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                    m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());else var h = "y",
                    m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());G(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
              }
            } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
              if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                  m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;else var h = "y",
                  m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;G(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
            }}
      }var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = n.sequential,
          l = a + "_" + n.idx,
          s = e("#mCSB_" + n.idx),
          c = e("#mCSB_" + n.idx + "_container"),
          d = c.parent(),
          u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
          f = c.find("iframe"),
          h = ["blur." + l + " keydown." + l + " keyup." + l];f.length && f.each(function () {
        e(this).bind("load", function () {
          A(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
            t(e);
          });
        });
      }), s.attr("tabindex", "0").bind(h[0], function (e) {
        t(e);
      });
    },
        j = function j(t, o, n, i, r) {
      function l(e) {
        u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? "x" === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);var o = "stepped" !== f.type,
            a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60,
            n = e ? o ? 7.5 : 40 : 2.5,
            s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
            d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
            m = "x" === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n),
            v = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount),
            x = "auto" !== f.scrollAmount ? v : m,
            _ = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
            w = !!e;return e && 17 > a && (x = "x" === f.dir[0] ? s[1] : s[0]), G(t, x.toString(), { dir: f.dir[0], scrollEasing: _, dur: a, onComplete: w }), e ? void (f.dir = !1) : (clearTimeout(f.step), void (f.step = setTimeout(function () {
          l();
        }, a)));
      }function s() {
        clearTimeout(f.step), $(f, "step"), Q(t);
      }var c = t.data(a),
          u = c.opt,
          f = c.sequential,
          h = e("#mCSB_" + c.idx + "_container"),
          m = "stepped" === f.type,
          p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
          g = u.scrollInertia < 1 ? 17 : u.scrollInertia;switch (o) {case "on":
          if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1], Q(t), oe(n) && "stepped" === f.type) return;l(m);break;case "off":
          s(), (m || c.tweenRunning && f.dir) && l(!0);}
    },
        Y = function Y(t) {
      var o = e(this).data(a).opt,
          n = [];return "function" == typeof t && (t = t()), t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof n[0] && (n[0] = n[0]()), "function" == typeof n[1] && (n[1] = n[1]()), n;
    },
        X = function X(t, o) {
      if (null != t && "undefined" != typeof t) {
        var n = e(this),
            i = n.data(a),
            r = i.opt,
            l = e("#mCSB_" + i.idx + "_container"),
            s = l.parent(),
            c = typeof t === "undefined" ? "undefined" : _typeof(t);o || (o = "x" === r.axis ? "x" : "y");var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
            f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
            h = "x" === o ? "left" : "top";switch (c) {case "function":
            return t();case "object":
            var m = t.jquery ? t : e(t);if (!m.length) return;return "x" === o ? ae(m)[1] : ae(m)[0];case "string":case "number":
            if (oe(t)) return Math.abs(t);if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);if (-1 !== t.indexOf("-=")) return Math.abs(f - parseInt(t.split("-=")[1]));if (-1 !== t.indexOf("+=")) {
              var p = f + parseInt(t.split("+=")[1]);return p >= 0 ? 0 : Math.abs(p);
            }if (-1 !== t.indexOf("px") && oe(t.split("px")[0])) return Math.abs(t.split("px")[0]);if ("top" === t || "left" === t) return 0;if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));if ("first" === t || "last" === t) {
              var m = l.find(":" + t);return "x" === o ? ae(m)[1] : ae(m)[0];
            }return e(t).length ? "x" === o ? ae(e(t))[1] : ae(e(t))[0] : (l.css(h, t), void u.update.call(null, n[0]));}
      }
    },
        N = function N(t) {
      function o() {
        return clearTimeout(f[0].autoUpdate), 0 === l.parents("html").length ? void (l = null) : void (f[0].autoUpdate = setTimeout(function () {
          return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length, s.poll.img.n === s.poll.img.o) ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n, void f.find("img").each(function () {
            n(this);
          }));
        }, c.advanced.autoUpdateTimeout));
      }function n(t) {
        function o(e, t) {
          return function () {
            return t.apply(e, arguments);
          };
        }function a() {
          this.onload = null, e(t).addClass(d[2]), r(2);
        }if (e(t).hasClass(d[2])) return void r();var n = new Image();n.onload = o(n, a), n.src = t.src;
      }function i() {
        c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");var e = 0,
            t = f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function () {
          e += this.offsetHeight + this.offsetWidth;
        }), e;
      }function r(e) {
        clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e);
      }var l = e(this),
          s = l.data(a),
          c = s.opt,
          f = e("#mCSB_" + s.idx + "_container");return t ? (clearTimeout(f[0].autoUpdate), void $(f[0], "autoUpdate")) : void o();
    },
        V = function V(e, t, o) {
      return Math.round(e / t) * t - o;
    },
        Q = function Q(t) {
      var o = t.data(a),
          n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");n.each(function () {
        Z.call(this);
      });
    },
        G = function G(t, o, n) {
      function i(e) {
        return s && c.callbacks[e] && "function" == typeof c.callbacks[e];
      }function r() {
        return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w];
      }function l() {
        var e = [h[0].offsetTop, h[0].offsetLeft],
            o = [x[0].offsetTop, x[0].offsetLeft],
            a = [h.outerHeight(!1), h.outerWidth(!1)],
            i = [f.height(), f.width()];t[0].mcs = { content: h, top: e[0], left: e[1], draggerTop: o[0], draggerLeft: o[1], topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])), leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])), direction: n.dir };
      }var s = t.data(a),
          c = s.opt,
          d = { trigger: "internal", dir: "y", scrollEasing: "mcsEaseOut", drag: !1, dur: c.scrollInertia, overwrite: "all", callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0 },
          n = e.extend(d, n),
          u = [n.dur, n.drag ? 0 : n.dur],
          f = e("#mCSB_" + s.idx),
          h = e("#mCSB_" + s.idx + "_container"),
          m = h.parent(),
          p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
          g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];if (s.trigger = n.trigger, 0 === m.scrollTop() && 0 === m.scrollLeft() || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
        if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
          var v = c.snapAmount instanceof Array ? "x" === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;o = V(o, v, c.snapOffset);
        }switch (n.dir) {case "x":
            var x = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                _ = "left",
                w = h[0].offsetLeft,
                S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()],
                b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                y = p[1],
                B = g[1],
                T = y > 0 ? y / s.scrollRatio.x : 0,
                k = B > 0 ? B / s.scrollRatio.x : 0;break;case "y":
            var x = e("#mCSB_" + s.idx + "_dragger_vertical"),
                _ = "top",
                w = h[0].offsetTop,
                S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()],
                b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                y = p[0],
                B = g[0],
                T = y > 0 ? y / s.scrollRatio.y : 0,
                k = B > 0 ? B / s.scrollRatio.y : 0;}b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0], t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(h[0].onCompleteTimeout), J(x[0], _, Math.round(b[1]), u[1], n.scrollEasing), !s.tweenRunning && (0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0]) || J(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, { onStart: function onStart() {
            n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r());
          }, onUpdate: function onUpdate() {
            n.callbacks && n.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]));
          }, onComplete: function onComplete() {
            if (n.callbacks && n.onComplete) {
              "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);var e = h[0].idleTimer || 0;h[0].onCompleteTimeout = setTimeout(function () {
                i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, h[0].idleTimer = 0, C(x, "hide");
              }, e);
            }
          } });
      }
    },
        J = function J(e, t, o, a, n, i, r) {
      function l() {
        S.stop || (x || m.call(), x = K() - v, s(), x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1, S.time < x + 1 && (S.time = x + 1)), S.time < a ? S.id = h(l) : g.call());
      }function s() {
        a > 0 ? (S.currVal = u(S.time, _, b, a, n), w[t] = Math.round(S.currVal) + "px") : w[t] = o + "px", p.call();
      }function c() {
        f = 1e3 / 60, S.time = x + f, h = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
          return s(), setTimeout(e, .01);
        }, S.id = h(l);
      }function d() {
        null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), S.id = null);
      }function u(e, t, o, a, n) {
        switch (n) {case "linear":case "mcsLinear":
            return o * e / a + t;case "mcsLinearOut":
            return e /= a, e--, o * Math.sqrt(1 - e * e) + t;case "easeInOutSmooth":
            return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);case "easeInOutStrong":
            return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);case "easeInOut":case "mcsEaseInOut":
            return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);case "easeOutSmooth":
            return e /= a, e--, -o * (e * e * e * e - 1) + t;case "easeOutStrong":
            return o * (-Math.pow(2, -10 * e / a) + 1) + t;case "easeOut":case "mcsEaseOut":default:
            var i = (e /= a) * e,
                r = i * e;return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e);}
      }e._mTween || (e._mTween = { top: {}, left: {} });var f,
          h,
          r = r || {},
          m = r.onStart || function () {},
          p = r.onUpdate || function () {},
          g = r.onComplete || function () {},
          v = K(),
          x = 0,
          _ = e.offsetTop,
          w = e.style,
          S = e._mTween[t];"left" === t && (_ = e.offsetLeft);var b = o - _;S.stop = 0, "none" !== i && d(), c();
    },
        K = function K() {
      return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : new Date().getTime();
    },
        Z = function Z() {
      var e = this;e._mTween || (e._mTween = { top: {}, left: {} });for (var t = ["top", "left"], o = 0; o < t.length; o++) {
        var a = t[o];e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id), e._mTween[a].id = null, e._mTween[a].stop = 1);
      }
    },
        $ = function $(e, t) {
      try {
        delete e[t];
      } catch (o) {
        e[t] = null;
      }
    },
        ee = function ee(e) {
      return !(e.which && 1 !== e.which);
    },
        te = function te(e) {
      var t = e.originalEvent.pointerType;return !(t && "touch" !== t && 2 !== t);
    },
        oe = function oe(e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    },
        ae = function ae(e) {
      var t = e.parents(".mCSB_container");return [e.offset().top - t.offset().top, e.offset().left - t.offset().left];
    },
        ne = function ne() {
      function e() {
        var e = ["webkit", "moz", "ms", "o"];if ("hidden" in document) return "hidden";for (var t = 0; t < e.length; t++) {
          if (e[t] + "Hidden" in document) return e[t] + "Hidden";
        }return null;
      }var t = e();return t ? document[t] : !1;
    };e.fn[o] = function (t) {
      return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments);
    }, e[o] = function (t) {
      return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments);
    }, e[o].defaults = i, window[o] = !0, e(window).bind("load", function () {
      e(n)[o](), e.extend(e.expr[":"], { mcsInView: e.expr[":"].mcsInView || function (t) {
          var o,
              a,
              n = e(t),
              i = n.parents(".mCSB_container");if (i.length) return o = i.parent(), a = [i[0].offsetTop, i[0].offsetLeft], a[0] + ae(n)[0] >= 0 && a[0] + ae(n)[0] < o.height() - n.outerHeight(!1) && a[1] + ae(n)[1] >= 0 && a[1] + ae(n)[1] < o.width() - n.outerWidth(!1);
        }, mcsInSight: e.expr[":"].mcsInSight || function (t, o, a) {
          var n,
              i,
              r,
              l,
              s = e(t),
              c = s.parents(".mCSB_container"),
              d = "exact" === a[3] ? [[1, 0], [1, 0]] : [[.9, .1], [.6, .4]];if (c.length) return n = [s.outerHeight(!1), s.outerWidth(!1)], r = [c[0].offsetTop + ae(s)[0], c[0].offsetLeft + ae(s)[1]], i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], l = [n[0] < i[0] ? d[0] : d[1], n[1] < i[1] ? d[0] : d[1]], r[0] - i[0] * l[0][0] < 0 && r[0] + n[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + n[1] - i[1] * l[1][1] >= 0;
        }, mcsOverflow: e.expr[":"].mcsOverflow || function (t) {
          var o = e(t).data(a);if (o) return o.overflowed[0] || o.overflowed[1];
        } });
    });
  });
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var Slick = window.Slick || {};

    Slick = function () {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this,
                dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function customPaging(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.registerBreakpoints();
            _.init(true);
        }

        return Slick;
    }();

    Slick.prototype.activateADA = function () {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });
    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {

        var _ = this;

        if (typeof index === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || index >= _.slideCount) {
            return false;
        }

        _.unload();

        if (typeof index === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.animateHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function (targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }
        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -_.currentLeft;
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function step(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' + now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' + now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function complete() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });
            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function () {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }
            }
        }
    };

    Slick.prototype.getNavTarget = function () {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;
    };

    Slick.prototype.asNavFor = function (index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if (asNavFor !== null && (typeof asNavFor === 'undefined' ? 'undefined' : _typeof(asNavFor)) === 'object') {
            asNavFor.each(function () {
                var target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    };

    Slick.prototype.applyTransition = function (slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.autoPlay = function () {

        var _ = this;

        _.autoPlayClear();

        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        }
    };

    Slick.prototype.autoPlayClear = function () {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };

    Slick.prototype.autoPlayIterator = function () {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if (!_.paused && !_.interrupted && !_.focussed) {

            if (_.options.infinite === false) {

                if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
                    _.direction = 0;
                } else if (_.direction === 0) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1;
                    }
                }
            }

            _.slideHandler(slideTo);
        }
    };

    Slick.prototype.buildArrows = function () {

        var _ = this;

        if (_.options.arrows === true) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if (_.slideCount > _.options.slidesToShow) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                }
            } else {

                _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
                    'aria-disabled': 'true',
                    'tabindex': '-1'
                });
            }
        }
    };

    Slick.prototype.buildDots = function () {

        var _ = this,
            i,
            dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');
        }
    };

    Slick.prototype.buildOut = function () {

        var _ = this;

        _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }
    };

    Slick.prototype.buildRows = function () {

        var _ = this,
            a,
            b,
            c,
            newSlides,
            numOfSlides,
            originalSlides,
            slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if (_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children().css({
                'width': 100 / _.options.slidesPerRow + '%',
                'display': 'inline-block'
            });
        }
    };

    Slick.prototype.checkResponsive = function (initial, forceUpdate) {

        var _ = this,
            breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }
    };

    Slick.prototype.changeSlide = function (event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset,
            slideOffset,
            unevenOffset;

        // If target is a link, prevent default action.
        if ($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if (!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }
    };

    Slick.prototype.checkNavigable = function (index) {

        var _ = this,
            navigables,
            prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function () {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpSlideEvents = function () {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
    };

    Slick.prototype.cleanUpRows = function () {

        var _ = this,
            originalSlides;

        if (_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }
    };

    Slick.prototype.clickHandler = function (event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };

    Slick.prototype.destroy = function (refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.$prevArrow.length) {

            _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove();
            }
        }

        if (_.$nextArrow && _.$nextArrow.length) {

            _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove();
            }
        }

        if (_.$slides) {

            _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
                $(this).attr('style', $(this).data('originalStyling'));
            });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if (!refresh) {
            _.$slider.trigger('destroy', [_]);
        }
    };

    Slick.prototype.disableTransition = function (slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };

    Slick.prototype.fadeSlide = function (slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);
        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function () {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }
        }
    };

    Slick.prototype.fadeSlideOut = function (slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);
        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });
        }
    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.focusHandler = function () {

        var _ = this;

        // If any child element receives focus within the slider we need to pause the autoplay
        _.$slider.off('focus.slick blur.slick').on('focus.slick', '*', function (event) {
            var $sf = $(this);

            setTimeout(function () {
                if (_.options.pauseOnFocus) {
                    if ($sf.is(':focus')) {
                        _.focussed = true;
                        _.autoPlay();
                    }
                }
            }, 0);
        }).on('blur.slick', '*', function (event) {
            var $sf = $(this);

            // When a blur occurs on any elements within the slider we become unfocused
            if (_.options.pauseOnFocus) {
                _.focussed = false;
                _.autoPlay();
            }
        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {

        var _ = this;
        return _.currentSlide;
    };

    Slick.prototype.getDotCount = function () {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;
    };

    Slick.prototype.getLeft = function (slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                coef = -1;

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2;
                    }
                }
                verticalOffset = verticalHeight * _.options.slidesToShow * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                        verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
                    } else {
                        _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
                        verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
        } else {
            targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;
    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {

        var _ = this;

        return _.options[option];
    };

    Slick.prototype.getNavigableIndexes = function () {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;
    };

    Slick.prototype.getSlick = function () {

        return this;
    };

    Slick.prototype.getSlideCount = function () {

        var _ = this,
            slidesTraversed,
            swipedSlide,
            swipeTarget,
            centerOffset;

        centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
        swipeTarget = _.swipeLeft * -1 + centerOffset;

        if (_.options.swipeToSlide === true) {

            _.$slideTrack.find('.slick-slide').each(function (index, slide) {

                var slideOuterWidth, slideOffset, slideRightBoundary;
                slideOuterWidth = $(slide).outerWidth();
                slideOffset = slide.offsetLeft;
                if (_.options.centerMode !== true) {
                    slideOffset += slideOuterWidth / 2;
                }

                slideRightBoundary = slideOffset + slideOuterWidth;

                if (swipeTarget < slideRightBoundary) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;
        } else {
            return _.options.slidesToScroll;
        }
    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);
    };

    Slick.prototype.init = function (creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if (_.options.autoplay) {

            _.paused = false;
            _.autoPlay();
        }
    };

    Slick.prototype.initADA = function () {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
            return val >= 0 && val < _.slideCount;
        });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                    var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
                    if ($('#' + ariaButtonControl).length) {
                        $(this).attr({
                            'aria-describedby': ariaButtonControl
                        });
                    }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function (i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': i + 1 + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });
            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
                _.$slides.eq(i).attr({ 'tabindex': '0' });
            } else {
                _.$slides.eq(i).removeAttr('tabindex');
            }
        }

        _.activateADA();
    };

    Slick.prototype.initArrowEvents = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.off('click.slick').on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.off('click.slick').on('click.slick', {
                message: 'next'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }
    };

    Slick.prototype.initDotEvents = function () {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initSlideEvents = function () {

        var _ = this;

        if (_.options.pauseOnHover) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    Slick.prototype.initializeEvents = function () {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);
    };

    Slick.prototype.initUI = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();
        }
    };

    Slick.prototype.keyHandler = function (event) {

        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' : 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    };

    Slick.prototype.lazyLoad = function () {

        var _ = this,
            loadRange,
            cloneRange,
            rangeStart,
            rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function () {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {

                    image.animate({ opacity: 0 }, 100, function () {

                        if (imageSrcSet) {
                            image.attr('srcset', imageSrcSet);

                            if (imageSizes) {
                                image.attr('sizes', imageSizes);
                            }
                        }

                        image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
                            image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
                        });
                        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                    });
                };

                imageToLoad.onerror = function () {

                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                };

                imageToLoad.src = imageSource;
            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    };

    Slick.prototype.loadSlider = function () {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };

    Slick.prototype.next = Slick.prototype.slickNext = function () {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };

    Slick.prototype.orientationChange = function () {

        var _ = this;

        _.checkResponsive();
        _.setPosition();
    };

    Slick.prototype.pause = Slick.prototype.slickPause = function () {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;
    };

    Slick.prototype.play = Slick.prototype.slickPlay = function () {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;
    };

    Slick.prototype.postSlide = function (index) {

        var _ = this;

        if (!_.unslicked) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if (_.options.autoplay) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }
        }
    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function () {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };

    Slick.prototype.preventDefault = function (event) {

        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function (tryCount) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $('img[data-lazy]', _.$slider),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ($imgsToLoad.length) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function () {

                if (imageSrcSet) {
                    image.attr('srcset', imageSrcSet);

                    if (imageSizes) {
                        image.attr('sizes', imageSizes);
                    }
                }

                image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

                if (_.options.adaptiveHeight === true) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                _.progressiveLazyLoad();
            };

            imageToLoad.onerror = function () {

                if (tryCount < 3) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function () {
                        _.progressiveLazyLoad(tryCount + 1);
                    }, 500);
                } else {

                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                    _.progressiveLazyLoad();
                }
            };

            imageToLoad.src = imageSource;
        } else {

            _.$slider.trigger('allImagesLoaded', [_]);
        }
    };

    Slick.prototype.refresh = function (initializing) {

        var _ = this,
            currentSlide,
            lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if (!initializing) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);
        }
    };

    Slick.prototype.registerBreakpoints = function () {

        var _ = this,
            breakpoint,
            currentBreakpoint,
            l,
            responsiveSettings = _.options.responsive || null;

        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

            _.respondTo = _.options.respondTo || 'window';

            for (breakpoint in responsiveSettings) {

                l = _.breakpoints.length - 1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }

            _.breakpoints.sort(function (a, b) {
                return _.options.mobileFirst ? a - b : b - a;
            });
        }
    };

    Slick.prototype.reinit = function () {

        var _ = this;

        _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);
    };

    Slick.prototype.resize = function () {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) {
                    _.setPosition();
                }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {

        var _ = this;

        if (typeof index === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();
    };

    Slick.prototype.setCSS = function (position) {

        var _ = this,
            positionProps = {},
            x,
            y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }
    };

    Slick.prototype.setDimensions = function () {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: '0px ' + _.options.centerPadding
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: _.options.centerPadding + ' 0px'
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();

        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
    };

    Slick.prototype.setFade = function () {

        var _ = this,
            targetLeft;

        _.$slides.each(function (index, element) {
            targetLeft = _.slideWidth * index * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    };

    Slick.prototype.setHeight = function () {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }
    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this,
            l,
            item,
            option,
            value,
            refresh = false,
            type;

        if ($.type(arguments[0]) === 'object') {

            option = arguments[0];
            refresh = arguments[1];
            type = 'multiple';
        } else if ($.type(arguments[0]) === 'string') {

            option = arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

                type = 'responsive';
            } else if (typeof arguments[1] !== 'undefined') {

                type = 'single';
            }
        }

        if (type === 'single') {

            _.options[option] = value;
        } else if (type === 'multiple') {

            $.each(option, function (opt, val) {

                _.options[opt] = val;
            });
        } else if (type === 'responsive') {

            for (item in value) {

                if ($.type(_.options.responsive) !== 'array') {

                    _.options.responsive = [value[item]];
                } else {

                    l = _.options.responsive.length - 1;

                    // loop through the responsive object and splice out duplicates.
                    while (l >= 0) {

                        if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

                            _.options.responsive.splice(l, 1);
                        }

                        l--;
                    }

                    _.options.responsive.push(value[item]);
                }
            }
        }

        if (refresh) {

            _.unload();
            _.reinit();
        }
    };

    Slick.prototype.setPosition = function () {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);
    };

    Slick.prototype.setProps = function () {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (_.options.fade) {
            if (typeof _.options.zIndex === 'number') {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
    };

    Slick.prototype.setSlideClasses = function (index) {

        var _ = this,
            centerOffset,
            allSlides,
            indexOffset,
            remainder;

        allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

        _.$slides.eq(index).addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
                    _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
                }

                if (index === 0) {

                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
                } else if (index === _.slideCount - 1) {

                    allSlides.eq(_.options.slidesToShow).addClass('slick-center');
                }
            }

            _.$slides.eq(index).addClass('slick-center');
        } else {

            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {

                _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides.addClass('slick-active').attr('aria-hidden', 'false');
            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {

                    allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
                } else {

                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
                }
            }
        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function () {

        var _ = this,
            i,
            slideIndex,
            infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
                    $(this).attr('id', '');
                });
            }
        }
    };

    Slick.prototype.interrupt = function (toggle) {

        var _ = this;

        if (!toggle) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };

    Slick.prototype.selectHandler = function (event) {

        var _ = this;

        var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;
        }

        _.slideHandler(index);
    };

    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {

        var targetSlide,
            animSlide,
            oldSlide,
            slideLeft,
            targetLeft = null,
            _ = this,
            navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if (_.options.asNavFor) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide);
            }
        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function () {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };

    Slick.prototype.startLoad = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();
        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();
        }

        _.$slider.addClass('slick-loading');
    };

    Slick.prototype.swipeDirection = function () {

        var xDist,
            yDist,
            r,
            swipeAngle,
            _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if (swipeAngle <= 45 && swipeAngle >= 0) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle <= 360 && swipeAngle >= 315) {
            return _.options.rtl === false ? 'left' : 'right';
        }
        if (swipeAngle >= 135 && swipeAngle <= 225) {
            return _.options.rtl === false ? 'right' : 'left';
        }
        if (_.options.verticalSwiping === true) {
            if (swipeAngle >= 35 && swipeAngle <= 135) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';
    };

    Slick.prototype.swipeEnd = function (event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            direction = _.swipeDirection();

            switch (direction) {

                case 'left':
                case 'down':

                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:

            }

            if (direction != 'vertical') {

                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction]);
            }
        } else {

            if (_.touchObject.startX !== _.touchObject.curX) {

                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }
    };

    Slick.prototype.swipeHandler = function (event) {

        var _ = this;

        if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }
    };

    Slick.prototype.swipeMove = function (event) {

        var _ = this,
            edgeWasHit = false,
            curLeft,
            swipeDirection,
            swipeLength,
            positionOffset,
            touches,
            verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }

        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);
    };

    Slick.prototype.swipeStart = function (event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;
    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();
        }
    };

    Slick.prototype.unload = function () {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
    };

    Slick.prototype.unslick = function (fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();
    };

    Slick.prototype.updateArrows = function () {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            }
        }
    };

    Slick.prototype.updateDots = function () {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots.find('li').removeClass('slick-active').end();

            _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
        }
    };

    Slick.prototype.visibility = function () {

        var _ = this;

        if (_.options.autoplay) {

            if (document[_.hidden]) {

                _.interrupted = true;
            } else {

                _.interrupted = false;
            }
        }
    };

    $.fn.slick = function () {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function (e, t) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.EvEmitter = t();
}("undefined" != typeof window ? window : this, function () {
  function e() {}var t = e.prototype;return t.on = function (e, t) {
    if (e && t) {
      var i = this._events = this._events || {},
          n = i[e] = i[e] || [];return n.indexOf(t) == -1 && n.push(t), this;
    }
  }, t.once = function (e, t) {
    if (e && t) {
      this.on(e, t);var i = this._onceEvents = this._onceEvents || {},
          n = i[e] = i[e] || {};return n[t] = !0, this;
    }
  }, t.off = function (e, t) {
    var i = this._events && this._events[e];if (i && i.length) {
      var n = i.indexOf(t);return n != -1 && i.splice(n, 1), this;
    }
  }, t.emitEvent = function (e, t) {
    var i = this._events && this._events[e];if (i && i.length) {
      i = i.slice(0), t = t || [];for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];s && (this.off(e, r), delete n[r]), r.apply(this, t);
      }return this;
    }
  }, t.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, e;
}), function (e, t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
    return t(e, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter);
}("undefined" != typeof window ? window : this, function (e, t) {
  function i(e, t) {
    for (var i in t) {
      e[i] = t[i];
    }return e;
  }function n(e) {
    if (Array.isArray(e)) return e;var t = "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "number" == typeof e.length;return t ? d.call(e) : [e];
  }function o(e, t, r) {
    if (!(this instanceof o)) return new o(e, t, r);var s = e;return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred()), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e));
  }function r(e) {
    this.img = e;
  }function s(e, t) {
    this.url = e, this.element = t, this.img = new Image();
  }var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, o.prototype.addElementImages = function (e) {
    "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);var t = e.nodeType;if (t && u[t]) {
      for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var o = i[n];this.addImage(o);
      }if ("string" == typeof this.options.background) {
        var r = e.querySelectorAll(this.options.background);for (n = 0; n < r.length; n++) {
          var s = r[n];this.addElementBackgroundImages(s);
        }
      }
    }
  };var u = { 1: !0, 9: !0, 11: !0 };return o.prototype.addElementBackgroundImages = function (e) {
    var t = getComputedStyle(e);if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
      var o = n && n[2];o && this.addBackground(o, e), n = i.exec(t.backgroundImage);
    }
  }, o.prototype.addImage = function (e) {
    var t = new r(e);this.images.push(t);
  }, o.prototype.addBackground = function (e, t) {
    var i = new s(e, t);this.images.push(i);
  }, o.prototype.check = function () {
    function e(e, i, n) {
      setTimeout(function () {
        t.progress(e, i, n);
      });
    }var t = this;return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
      t.once("progress", e), t.check();
    }) : void this.complete();
  }, o.prototype.progress = function (e, t, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t);
  }, o.prototype.complete = function () {
    var e = this.hasAnyBroken ? "fail" : "done";if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var t = this.hasAnyBroken ? "reject" : "resolve";this.jqDeferred[t](this);
    }
  }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
    var e = this.getIsImageComplete();return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src));
  }, r.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, r.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]);
  }, r.prototype.handleEvent = function (e) {
    var t = "on" + e.type;this[t] && this[t](e);
  }, r.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, r.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, r.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;var e = this.getIsImageComplete();e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, s.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]);
  }, o.makeJQueryPlugin = function (t) {
    t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
      var i = new o(this, e, t);return i.jqDeferred.promise(h(this));
    });
  }, o.makeJQueryPlugin(), o;
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-objectfit-setclasses !*/
!function (e, n, t) {
  function r(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
  }function o() {
    var e, n, t, o, i, s, a;for (var l in C) {
      if (C.hasOwnProperty(l)) {
        if (e = [], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }for (o = r(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) {
          s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), h.push((o ? "" : "no-") + a.join("-"));
        }
      }
    }
  }function i(e) {
    var n = _.className,
        t = Modernizr._config.classPrefix || "";if (w && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");n = n.replace(r, "$1" + t + "js$2");
    }Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), w ? _.className.baseVal = n : _.className = n);
  }function s(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
      return n + t.toUpperCase();
    }).replace(/^-/, "");
  }function a(e, n) {
    return !!~("" + e).indexOf(n);
  }function l() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : w ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }function f(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }function u(e, n, t) {
    var o;for (var i in e) {
      if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, "function") ? f(o, t || n) : o);
    }return !1;
  }function p(n, t, r) {
    var o;if ("getComputedStyle" in e) {
      o = getComputedStyle.call(e, n, t);var i = e.console;if (null !== o) r && (o = o.getPropertyValue(r));else if (i) {
        var s = i.error ? "error" : "log";i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else o = !t && n.currentStyle && n.currentStyle[r];return o;
  }function c(e) {
    return e.replace(/([A-Z])/g, function (e, n) {
      return "-" + n.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function d() {
    var e = n.body;return e || (e = l(w ? "svg" : "body"), e.fake = !0), e;
  }function m(e, t, r, o) {
    var i,
        s,
        a,
        f,
        u = "modernizr",
        p = l("div"),
        c = d();if (parseInt(r, 10)) for (; r--;) {
      a = l("div"), a.id = o ? o[r] : u + (r + 1), p.appendChild(a);
    }return i = l("style"), i.type = "text/css", i.id = "s" + u, (c.fake ? c : p).appendChild(i), c.appendChild(p), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), p.id = u, c.fake && (c.style.background = "", c.style.overflow = "hidden", f = _.style.overflow, _.style.overflow = "hidden", _.appendChild(c)), s = t(p, e), c.fake ? (c.parentNode.removeChild(c), _.style.overflow = f, _.offsetHeight) : p.parentNode.removeChild(p), !!s;
  }function v(n, r) {
    var o = n.length;if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) {
        if (e.CSS.supports(c(n[o]), r)) return !0;
      }return !1;
    }if ("CSSSupportsRule" in e) {
      for (var i = []; o--;) {
        i.push("(" + c(n[o]) + ":" + r + ")");
      }return i = i.join(" or "), m("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == p(e, null, "position");
      });
    }return t;
  }function y(e, n, o, i) {
    function f() {
      p && (delete P.style, delete P.modElem);
    }if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
      var u = v(e, o);if (!r(u, "undefined")) return u;
    }for (var p, c, d, m, y, g = ["modernizr", "tspan", "samp"]; !P.style && g.length;) {
      p = !0, P.modElem = l(g.shift()), P.style = P.modElem.style;
    }for (d = e.length, c = 0; d > c; c++) {
      if (m = e[c], y = P.style[m], a(m, "-") && (m = s(m)), P.style[m] !== t) {
        if (i || r(o, "undefined")) return f(), "pfx" == n ? m : !0;try {
          P.style[m] = o;
        } catch (h) {}if (P.style[m] != y) return f(), "pfx" == n ? m : !0;
      }
    }return f(), !1;
  }function g(e, n, t, o, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + b.join(s + " ") + s).split(" ");return r(n, "string") || r(n, "undefined") ? y(a, n, o, i) : (a = (e + " " + j.join(s + " ") + s).split(" "), u(a, n, t));
  }var h = [],
      C = [],
      S = { _version: "3.6.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
      var t = this;setTimeout(function () {
        n(t[e]);
      }, 0);
    }, addTest: function addTest(e, n, t) {
      C.push({ name: e, fn: n, options: t });
    }, addAsyncTest: function addAsyncTest(e) {
      C.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = S, Modernizr = new Modernizr();var _ = n.documentElement,
      w = "svg" === _.nodeName.toLowerCase(),
      x = "Moz O ms Webkit",
      b = S._config.usePrefixes ? x.split(" ") : [];S._cssomPrefixes = b;var E = function E(n) {
    var r,
        o = prefixes.length,
        i = e.CSSRule;if ("undefined" == typeof i) return t;if (!n) return !1;if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + n;for (var s = 0; o > s; s++) {
      var a = prefixes[s],
          l = a.toUpperCase() + "_" + r;if (l in i) return "@-" + a.toLowerCase() + "-" + n;
    }return !1;
  };S.atRule = E;var j = S._config.usePrefixes ? x.toLowerCase().split(" ") : [];S._domPrefixes = j;var z = { elem: l("modernizr") };Modernizr._q.push(function () {
    delete z.elem;
  });var P = { style: z.elem.style };Modernizr._q.unshift(function () {
    delete P.style;
  }), S.testAllProps = g;var N = S.prefixed = function (e, n, t) {
    return 0 === e.indexOf("@") ? E(e) : (-1 != e.indexOf("-") && (e = s(e)), n ? g(e, n, t) : g(e, "pfx"));
  };Modernizr.addTest("objectfit", !!N("objectFit"), { aliases: ["object-fit"] }), o(), i(h), delete S.addTest, delete S.addAsyncTest;for (var T = 0; T < Modernizr._q.length; T++) {
    Modernizr._q[T]();
  }e.Modernizr = Modernizr;
}(window, document);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.AOS = t() : e.AOS = t();
}(this, function () {
  return function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;var i = n[o] = { exports: {}, id: o, loaded: !1 };return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
    }var n = {};return t.m = e, t.c = n, t.p = "dist/", t(0);
  }([function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }var i = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];for (var o in n) {
          Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
      }return e;
    },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        f = o(c),
        s = n(8),
        d = o(s),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = document.all && !window.atob,
        j = { offset: 120, delay: 0, easing: "ease", duration: 400, disable: !1, once: !1, startEvent: "DOMContentLoaded", throttleDelay: 99, debounceDelay: 50, disableMutationObserver: !1 },
        O = function O() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];if (e && (k = !0), k) return w = (0, y.default)(w, j), (0, b.default)(w, j.once), w;
    },
        _ = function _() {
      w = (0, h.default)(), O();
    },
        S = function S() {
      w.forEach(function (e, t) {
        e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay");
      });
    },
        z = function z(e) {
      return e === !0 || "mobile" === e && p.default.mobile() || "phone" === e && p.default.phone() || "tablet" === e && p.default.tablet() || "function" == typeof e && e() === !0;
    },
        A = function A(e) {
      return j = i(j, e), w = (0, h.default)(), z(j.disable) || x ? S() : (document.querySelector("body").setAttribute("data-aos-easing", j.easing), document.querySelector("body").setAttribute("data-aos-duration", j.duration), document.querySelector("body").setAttribute("data-aos-delay", j.delay), "DOMContentLoaded" === j.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? O(!0) : "load" === j.startEvent ? window.addEventListener(j.startEvent, function () {
        O(!0);
      }) : document.addEventListener(j.startEvent, function () {
        O(!0);
      }), window.addEventListener("resize", (0, f.default)(O, j.debounceDelay, !0)), window.addEventListener("orientationchange", (0, f.default)(O, j.debounceDelay, !0)), window.addEventListener("scroll", (0, u.default)(function () {
        (0, b.default)(w, j.once);
      }, j.throttleDelay)), j.disableMutationObserver || (0, d.default)("[data-aos]", _), w);
    };e.exports = { init: A, refresh: O, refreshHard: _ };
  }, function (e, t) {},,,,, function (e, t) {
    (function (t) {
      "use strict";
      function n(e, t, n) {
        function o(t) {
          var n = b,
              o = v;return b = v = void 0, k = t, g = e.apply(o, n);
        }function r(e) {
          return k = e, h = setTimeout(s, t), _ ? o(e) : g;
        }function a(e) {
          var n = e - w,
              o = e - k,
              i = t - n;return S ? j(i, y - o) : i;
        }function c(e) {
          var n = e - w,
              o = e - k;return void 0 === w || n >= t || n < 0 || S && o >= y;
        }function s() {
          var e = O();return c(e) ? d(e) : void (h = setTimeout(s, a(e)));
        }function d(e) {
          return h = void 0, z && b ? o(e) : (b = v = void 0, g);
        }function l() {
          void 0 !== h && clearTimeout(h), k = 0, b = w = v = h = void 0;
        }function p() {
          return void 0 === h ? g : d(O());
        }function m() {
          var e = O(),
              n = c(e);if (b = arguments, v = this, w = e, n) {
            if (void 0 === h) return r(w);if (S) return h = setTimeout(s, t), o(w);
          }return void 0 === h && (h = setTimeout(s, t)), g;
        }var b,
            v,
            y,
            g,
            h,
            w,
            k = 0,
            _ = !1,
            S = !1,
            z = !0;if ("function" != typeof e) throw new TypeError(f);return t = u(t) || 0, i(n) && (_ = !!n.leading, S = "maxWait" in n, y = S ? x(u(n.maxWait) || 0, t) : y, z = "trailing" in n ? !!n.trailing : z), m.cancel = l, m.flush = p, m;
      }function o(e, t, o) {
        var r = !0,
            a = !0;if ("function" != typeof e) throw new TypeError(f);return i(o) && (r = "leading" in o ? !!o.leading : r, a = "trailing" in o ? !!o.trailing : a), n(e, t, { leading: r, maxWait: t, trailing: a });
      }function i(e) {
        var t = "undefined" == typeof e ? "undefined" : c(e);return !!e && ("object" == t || "function" == t);
      }function r(e) {
        return !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e));
      }function a(e) {
        return "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) || r(e) && k.call(e) == d;
      }function u(e) {
        if ("number" == typeof e) return e;if (a(e)) return s;if (i(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;e = i(t) ? t + "" : t;
        }if ("string" != typeof e) return 0 === e ? e : +e;e = e.replace(l, "");var n = m.test(e);return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e;
      }var c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
      },
          f = "Expected a function",
          s = NaN,
          d = "[object Symbol]",
          l = /^\s+|\s+$/g,
          p = /^[-+]0x[0-9a-f]+$/i,
          m = /^0b[01]+$/i,
          b = /^0o[0-7]+$/i,
          v = parseInt,
          y = "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t && t.Object === Object && t,
          g = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self,
          h = y || g || Function("return this")(),
          w = Object.prototype,
          k = w.toString,
          x = Math.max,
          j = Math.min,
          O = function O() {
        return h.Date.now();
      };e.exports = o;
    }).call(t, function () {
      return this;
    }());
  }, function (e, t) {
    (function (t) {
      "use strict";
      function n(e, t, n) {
        function i(t) {
          var n = b,
              o = v;return b = v = void 0, O = t, g = e.apply(o, n);
        }function r(e) {
          return O = e, h = setTimeout(s, t), _ ? i(e) : g;
        }function u(e) {
          var n = e - w,
              o = e - O,
              i = t - n;return S ? x(i, y - o) : i;
        }function f(e) {
          var n = e - w,
              o = e - O;return void 0 === w || n >= t || n < 0 || S && o >= y;
        }function s() {
          var e = j();return f(e) ? d(e) : void (h = setTimeout(s, u(e)));
        }function d(e) {
          return h = void 0, z && b ? i(e) : (b = v = void 0, g);
        }function l() {
          void 0 !== h && clearTimeout(h), O = 0, b = w = v = h = void 0;
        }function p() {
          return void 0 === h ? g : d(j());
        }function m() {
          var e = j(),
              n = f(e);if (b = arguments, v = this, w = e, n) {
            if (void 0 === h) return r(w);if (S) return h = setTimeout(s, t), i(w);
          }return void 0 === h && (h = setTimeout(s, t)), g;
        }var b,
            v,
            y,
            g,
            h,
            w,
            O = 0,
            _ = !1,
            S = !1,
            z = !0;if ("function" != typeof e) throw new TypeError(c);return t = a(t) || 0, o(n) && (_ = !!n.leading, S = "maxWait" in n, y = S ? k(a(n.maxWait) || 0, t) : y, z = "trailing" in n ? !!n.trailing : z), m.cancel = l, m.flush = p, m;
      }function o(e) {
        var t = "undefined" == typeof e ? "undefined" : u(e);return !!e && ("object" == t || "function" == t);
      }function i(e) {
        return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e));
      }function r(e) {
        return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || i(e) && w.call(e) == s;
      }function a(e) {
        if ("number" == typeof e) return e;if (r(e)) return f;if (o(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;e = o(t) ? t + "" : t;
        }if ("string" != typeof e) return 0 === e ? e : +e;e = e.replace(d, "");var n = p.test(e);return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e;
      }var u = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
      },
          c = "Expected a function",
          f = NaN,
          s = "[object Symbol]",
          d = /^\s+|\s+$/g,
          l = /^[-+]0x[0-9a-f]+$/i,
          p = /^0b[01]+$/i,
          m = /^0o[0-7]+$/i,
          b = parseInt,
          v = "object" == ("undefined" == typeof t ? "undefined" : u(t)) && t && t.Object === Object && t,
          y = "object" == ("undefined" == typeof self ? "undefined" : u(self)) && self && self.Object === Object && self,
          g = v || y || Function("return this")(),
          h = Object.prototype,
          w = h.toString,
          k = Math.max,
          x = Math.min,
          j = function j() {
        return g.Date.now();
      };e.exports = n;
    }).call(t, function () {
      return this;
    }());
  }, function (e, t) {
    "use strict";
    function n(e, t) {
      var n = new r(o);a = t, n.observe(i.documentElement, { childList: !0, subtree: !0, removedNodes: !0 });
    }function o(e) {
      e && e.forEach(function (e) {
        var t = Array.prototype.slice.call(e.addedNodes),
            n = Array.prototype.slice.call(e.removedNodes),
            o = t.concat(n).filter(function (e) {
          return e.hasAttribute && e.hasAttribute("data-aos");
        }).length;o && a();
      });
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = window.document,
        r = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        a = function a() {};t.default = n;
  }, function (e, t) {
    "use strict";
    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function o() {
      return navigator.userAgent || navigator.vendor || window.opera || "";
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
        }
      }return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
      };
    }(),
        r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        f = function () {
      function e() {
        n(this, e);
      }return i(e, [{ key: "phone", value: function value() {
          var e = o();return !(!r.test(e) && !a.test(e.substr(0, 4)));
        } }, { key: "mobile", value: function value() {
          var e = o();return !(!u.test(e) && !c.test(e.substr(0, 4)));
        } }, { key: "tablet", value: function value() {
          return this.mobile() && !this.phone();
        } }]), e;
    }();t.default = new f();
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function n(e, t, _n) {
      var o = e.node.getAttribute("data-aos-once");t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof o && ("false" === o || !_n && "true" !== o) && e.node.classList.remove("aos-animate");
    },
        o = function o(e, t) {
      var o = window.pageYOffset,
          i = window.innerHeight;e.forEach(function (e, r) {
        n(e, i + o, t);
      });
    };t.default = o;
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(12),
        r = o(i),
        a = function a(e, t) {
      return e.forEach(function (e, n) {
        e.node.classList.add("aos-init"), e.position = (0, r.default)(e.node, t.offset);
      }), e;
    };t.default = a;
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(13),
        r = o(i),
        a = function a(e, t) {
      var n = 0,
          o = 0,
          i = window.innerHeight,
          a = { offset: e.getAttribute("data-aos-offset"), anchor: e.getAttribute("data-aos-anchor"), anchorPlacement: e.getAttribute("data-aos-anchor-placement") };switch (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)), a.anchor && document.querySelectorAll(a.anchor) && (e = document.querySelectorAll(a.anchor)[0]), n = (0, r.default)(e).top, a.anchorPlacement) {case "top-bottom":
          break;case "center-bottom":
          n += e.offsetHeight / 2;break;case "bottom-bottom":
          n += e.offsetHeight;break;case "top-center":
          n += i / 2;break;case "bottom-center":
          n += i / 2 + e.offsetHeight;break;case "center-center":
          n += i / 2 + e.offsetHeight / 2;break;case "top-top":
          n += i;break;case "bottom-top":
          n += e.offsetHeight + i;break;case "center-top":
          n += e.offsetHeight / 2 + i;}return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
    };t.default = a;
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function n(e) {
      for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) {
        t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
      }return { top: n, left: t };
    };t.default = n;
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function n(e) {
      return e = e || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e, function (e) {
        return { node: e };
      });
    };t.default = n;
  }]);
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Select2 4.0.6-rc.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 = function () {
    // Restore the Select2 AMD loader so it can be used
    // Needed mostly in the language files, where the loader is not inserted
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
      var S2 = jQuery.fn.select2.amd;
    }
    var S2;(function () {
      if (!S2 || !S2.requirejs) {
        if (!S2) {
          S2 = {};
        } else {
          require = S2;
        }
        /**
         * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
         * Released under MIT license, http://github.com/requirejs/almond/LICENSE
         */
        //Going sloppy to avoid 'use strict' string cost, but strict practices should
        //be followed.
        /*global setTimeout: false */

        var requirejs, require, define;
        (function (undef) {
          var main,
              _req,
              makeMap,
              handlers,
              defined = {},
              waiting = {},
              config = {},
              defining = {},
              hasOwn = Object.prototype.hasOwnProperty,
              aps = [].slice,
              jsSuffixRegExp = /\.js$/;

          function hasProp(obj, prop) {
            return hasOwn.call(obj, prop);
          }

          /**
           * Given a relative module name, like ./something, normalize it to
           * a real name that can be mapped to a path.
           * @param {String} name the relative name
           * @param {String} baseName a real name that the name arg is relative
           * to.
           * @returns {String} normalized name
           */
          function normalize(name, baseName) {
            var nameParts,
                nameSegment,
                mapValue,
                foundMap,
                lastIndex,
                foundI,
                foundStarMap,
                starI,
                i,
                j,
                part,
                normalizedBaseParts,
                baseParts = baseName && baseName.split("/"),
                map = config.map,
                starMap = map && map['*'] || {};

            //Adjust any relative paths.
            if (name) {
              name = name.split('/');
              lastIndex = name.length - 1;

              // If wanting node ID compatibility, strip .js from end
              // of IDs. Have to do this here, and not in nameToUrl
              // because node allows either .js or non .js to map
              // to same file.
              if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
              }

              // Starts with a '.' so need the baseName
              if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
              }

              //start trimDots
              for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                  name.splice(i, 1);
                  i -= 1;
                } else if (part === '..') {
                  // If at the start, or previous value is still ..,
                  // keep them so that when converted to a path it may
                  // still work when converted to a path, even though
                  // as an ID it is less than ideal. In larger point
                  // releases, may be better to just kick out an error.
                  if (i === 0 || i === 1 && name[2] === '..' || name[i - 1] === '..') {
                    continue;
                  } else if (i > 0) {
                    name.splice(i - 1, 2);
                    i -= 2;
                  }
                }
              }
              //end trimDots

              name = name.join('/');
            }

            //Apply map config if available.
            if ((baseParts || starMap) && map) {
              nameParts = name.split('/');

              for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                  //Find the longest baseName segment match in the config.
                  //So, do joins on the biggest to smallest lengths of baseParts.
                  for (j = baseParts.length; j > 0; j -= 1) {
                    mapValue = map[baseParts.slice(0, j).join('/')];

                    //baseName segment has  config, find if it has one for
                    //this name.
                    if (mapValue) {
                      mapValue = mapValue[nameSegment];
                      if (mapValue) {
                        //Match, update name to the new value.
                        foundMap = mapValue;
                        foundI = i;
                        break;
                      }
                    }
                  }
                }

                if (foundMap) {
                  break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                  foundStarMap = starMap[nameSegment];
                  starI = i;
                }
              }

              if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
              }

              if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
              }
            }

            return name;
          }

          function makeRequire(relName, forceSync) {
            return function () {
              //A version of a require function that passes a moduleName
              //value for items that may need to
              //look up paths relative to the moduleName
              var args = aps.call(arguments, 0);

              //If first arg is not require('string'), and there is only
              //one arg, it is the array form without a callback. Insert
              //a null so that the following concat is correct.
              if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
              }
              return _req.apply(undef, args.concat([relName, forceSync]));
            };
          }

          function makeNormalize(relName) {
            return function (name) {
              return normalize(name, relName);
            };
          }

          function makeLoad(depName) {
            return function (value) {
              defined[depName] = value;
            };
          }

          function callDep(name) {
            if (hasProp(waiting, name)) {
              var args = waiting[name];
              delete waiting[name];
              defining[name] = true;
              main.apply(undef, args);
            }

            if (!hasProp(defined, name) && !hasProp(defining, name)) {
              throw new Error('No ' + name);
            }
            return defined[name];
          }

          //Turns a plugin!resource to [plugin, resource]
          //with the plugin being undefined if the name
          //did not have a plugin prefix.
          function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
              prefix = name.substring(0, index);
              name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
          }

          //Creates a parts array for a relName where first part is plugin ID,
          //second part is resource ID. Assumes relName has already been normalized.
          function makeRelParts(relName) {
            return relName ? splitPrefix(relName) : [];
          }

          /**
           * Makes a name map, normalizing the name, and using a plugin
           * for normalization if necessary. Grabs a ref to plugin
           * too, as an optimization.
           */
          makeMap = function makeMap(name, relParts) {
            var plugin,
                parts = splitPrefix(name),
                prefix = parts[0],
                relResourceName = relParts[1];

            name = parts[1];

            if (prefix) {
              prefix = normalize(prefix, relResourceName);
              plugin = callDep(prefix);
            }

            //Normalize according
            if (prefix) {
              if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
              } else {
                name = normalize(name, relResourceName);
              }
            } else {
              name = normalize(name, relResourceName);
              parts = splitPrefix(name);
              prefix = parts[0];
              name = parts[1];
              if (prefix) {
                plugin = callDep(prefix);
              }
            }

            //Using ridiculous property names for space reasons
            return {
              f: prefix ? prefix + '!' + name : name, //fullName
              n: name,
              pr: prefix,
              p: plugin
            };
          };

          function makeConfig(name) {
            return function () {
              return config && config.config && config.config[name] || {};
            };
          }

          handlers = {
            require: function require(name) {
              return makeRequire(name);
            },
            exports: function exports(name) {
              var e = defined[name];
              if (typeof e !== 'undefined') {
                return e;
              } else {
                return defined[name] = {};
              }
            },
            module: function module(name) {
              return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
              };
            }
          };

          main = function main(name, deps, callback, relName) {
            var cjsModule,
                depName,
                ret,
                map,
                i,
                relParts,
                args = [],
                callbackType = typeof callback === 'undefined' ? 'undefined' : _typeof(callback),
                usingExports;

            //Use name if no relName
            relName = relName || name;
            relParts = makeRelParts(relName);

            //Call the callback to define the module, if necessary.
            if (callbackType === 'undefined' || callbackType === 'function') {
              //Pull out the defined dependencies and pass the ordered
              //values to the callback.
              //Default to [require, exports, module] if no deps
              deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
              for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                  args[i] = handlers.require(name);
                } else if (depName === "exports") {
                  //CommonJS module spec 1.1
                  args[i] = handlers.exports(name);
                  usingExports = true;
                } else if (depName === "module") {
                  //CommonJS module spec 1.1
                  cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                  args[i] = callDep(depName);
                } else if (map.p) {
                  map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                  args[i] = defined[depName];
                } else {
                  throw new Error(name + ' missing ' + depName);
                }
              }

              ret = callback ? callback.apply(defined[name], args) : undefined;

              if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                  defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                  //Use the return value from the function.
                  defined[name] = ret;
                }
              }
            } else if (name) {
              //May just be an object definition for the module. Only
              //worry about defining if have a module name.
              defined[name] = callback;
            }
          };

          requirejs = require = _req = function req(deps, callback, relName, forceSync, alt) {
            if (typeof deps === "string") {
              if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
              }
              //Just return the module wanted. In this scenario, the
              //deps arg is the module name, and second arg (if passed)
              //is just the relName.
              //Normalize module name, if it contains . or ..
              return callDep(makeMap(deps, makeRelParts(callback)).f);
            } else if (!deps.splice) {
              //deps is a config object, not an array.
              config = deps;
              if (config.deps) {
                _req(config.deps, config.callback);
              }
              if (!callback) {
                return;
              }

              if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
              } else {
                deps = undef;
              }
            }

            //Support require(['a'])
            callback = callback || function () {};

            //If relName is a function, it is an errback handler,
            //so remove it.
            if (typeof relName === 'function') {
              relName = forceSync;
              forceSync = alt;
            }

            //Simulate async callback;
            if (forceSync) {
              main(undef, deps, callback, relName);
            } else {
              //Using a non-zero value because of concern for what old browsers
              //do, and latest browsers "upgrade" to 4 if lower value is used:
              //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
              //If want a value immediately, use require('id') instead -- something
              //that works in almond on the global level, but not guaranteed and
              //unlikely to work in other AMD implementations.
              setTimeout(function () {
                main(undef, deps, callback, relName);
              }, 4);
            }

            return _req;
          };

          /**
           * Just drops the config on the floor, but returns req in case
           * the config return value is used.
           */
          _req.config = function (cfg) {
            return _req(cfg);
          };

          /**
           * Expose module registry for debugging and tooling
           */
          requirejs._defined = defined;

          define = function define(name, deps, callback) {
            if (typeof name !== 'string') {
              throw new Error('See almond README: incorrect module build, no module name');
            }

            //This module may not have dependencies
            if (!deps.splice) {
              //deps is not an array, so probably means
              //an object literal or factory function for
              //the value. Adjust args.
              callback = deps;
              deps = [];
            }

            if (!hasProp(defined, name) && !hasProp(waiting, name)) {
              waiting[name] = [name, deps, callback];
            }
          };

          define.amd = {
            jQuery: true
          };
        })();

        S2.requirejs = requirejs;S2.require = require;S2.define = define;
      }
    })();
    S2.define("almond", function () {});

    /* global jQuery:false, $:false */
    S2.define('jquery', [], function () {
      var _$ = jQuery || $;

      if (_$ == null && console && console.error) {
        console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');
      }

      return _$;
    });

    S2.define('select2/utils', ['jquery'], function ($) {
      var Utils = {};

      Utils.Extend = function (ChildClass, SuperClass) {
        var __hasProp = {}.hasOwnProperty;

        function BaseConstructor() {
          this.constructor = ChildClass;
        }

        for (var key in SuperClass) {
          if (__hasProp.call(SuperClass, key)) {
            ChildClass[key] = SuperClass[key];
          }
        }

        BaseConstructor.prototype = SuperClass.prototype;
        ChildClass.prototype = new BaseConstructor();
        ChildClass.__super__ = SuperClass.prototype;

        return ChildClass;
      };

      function getMethods(theClass) {
        var proto = theClass.prototype;

        var methods = [];

        for (var methodName in proto) {
          var m = proto[methodName];

          if (typeof m !== 'function') {
            continue;
          }

          if (methodName === 'constructor') {
            continue;
          }

          methods.push(methodName);
        }

        return methods;
      }

      Utils.Decorate = function (SuperClass, DecoratorClass) {
        var decoratedMethods = getMethods(DecoratorClass);
        var superMethods = getMethods(SuperClass);

        function DecoratedClass() {
          var unshift = Array.prototype.unshift;

          var argCount = DecoratorClass.prototype.constructor.length;

          var calledConstructor = SuperClass.prototype.constructor;

          if (argCount > 0) {
            unshift.call(arguments, SuperClass.prototype.constructor);

            calledConstructor = DecoratorClass.prototype.constructor;
          }

          calledConstructor.apply(this, arguments);
        }

        DecoratorClass.displayName = SuperClass.displayName;

        function ctr() {
          this.constructor = DecoratedClass;
        }

        DecoratedClass.prototype = new ctr();

        for (var m = 0; m < superMethods.length; m++) {
          var superMethod = superMethods[m];

          DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
        }

        var calledMethod = function calledMethod(methodName) {
          // Stub out the original method if it's not decorating an actual method
          var originalMethod = function originalMethod() {};

          if (methodName in DecoratedClass.prototype) {
            originalMethod = DecoratedClass.prototype[methodName];
          }

          var decoratedMethod = DecoratorClass.prototype[methodName];

          return function () {
            var unshift = Array.prototype.unshift;

            unshift.call(arguments, originalMethod);

            return decoratedMethod.apply(this, arguments);
          };
        };

        for (var d = 0; d < decoratedMethods.length; d++) {
          var decoratedMethod = decoratedMethods[d];

          DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
        }

        return DecoratedClass;
      };

      var Observable = function Observable() {
        this.listeners = {};
      };

      Observable.prototype.on = function (event, callback) {
        this.listeners = this.listeners || {};

        if (event in this.listeners) {
          this.listeners[event].push(callback);
        } else {
          this.listeners[event] = [callback];
        }
      };

      Observable.prototype.trigger = function (event) {
        var slice = Array.prototype.slice;
        var params = slice.call(arguments, 1);

        this.listeners = this.listeners || {};

        // Params should always come in as an array
        if (params == null) {
          params = [];
        }

        // If there are no arguments to the event, use a temporary object
        if (params.length === 0) {
          params.push({});
        }

        // Set the `_type` of the first object to the event
        params[0]._type = event;

        if (event in this.listeners) {
          this.invoke(this.listeners[event], slice.call(arguments, 1));
        }

        if ('*' in this.listeners) {
          this.invoke(this.listeners['*'], arguments);
        }
      };

      Observable.prototype.invoke = function (listeners, params) {
        for (var i = 0, len = listeners.length; i < len; i++) {
          listeners[i].apply(this, params);
        }
      };

      Utils.Observable = Observable;

      Utils.generateChars = function (length) {
        var chars = '';

        for (var i = 0; i < length; i++) {
          var randomChar = Math.floor(Math.random() * 36);
          chars += randomChar.toString(36);
        }

        return chars;
      };

      Utils.bind = function (func, context) {
        return function () {
          func.apply(context, arguments);
        };
      };

      Utils._convertData = function (data) {
        for (var originalKey in data) {
          var keys = originalKey.split('-');

          var dataLevel = data;

          if (keys.length === 1) {
            continue;
          }

          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];

            // Lowercase the first letter
            // By default, dash-separated becomes camelCase
            key = key.substring(0, 1).toLowerCase() + key.substring(1);

            if (!(key in dataLevel)) {
              dataLevel[key] = {};
            }

            if (k == keys.length - 1) {
              dataLevel[key] = data[originalKey];
            }

            dataLevel = dataLevel[key];
          }

          delete data[originalKey];
        }

        return data;
      };

      Utils.hasScroll = function (index, el) {
        // Adapted from the function created by @ShadowScripter
        // and adapted by @BillBarry on the Stack Exchange Code Review website.
        // The original code can be found at
        // http://codereview.stackexchange.com/q/13338
        // and was designed to be used with the Sizzle selector engine.

        var $el = $(el);
        var overflowX = el.style.overflowX;
        var overflowY = el.style.overflowY;

        //Check both x and y declarations
        if (overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')) {
          return false;
        }

        if (overflowX === 'scroll' || overflowY === 'scroll') {
          return true;
        }

        return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
      };

      Utils.escapeMarkup = function (markup) {
        var replaceMap = {
          '\\': '&#92;',
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#39;',
          '/': '&#47;'
        };

        // Do not try to escape the markup if it's not a string
        if (typeof markup !== 'string') {
          return markup;
        }

        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
          return replaceMap[match];
        });
      };

      // Append an array of jQuery nodes to a given element.
      Utils.appendMany = function ($element, $nodes) {
        // jQuery 1.7.x does not support $.fn.append() with an array
        // Fall back to a jQuery object collection using $.fn.add()
        if ($.fn.jquery.substr(0, 3) === '1.7') {
          var $jqNodes = $();

          $.map($nodes, function (node) {
            $jqNodes = $jqNodes.add(node);
          });

          $nodes = $jqNodes;
        }

        $element.append($nodes);
      };

      // Cache objects in Utils.__cache instead of $.data (see #4346)
      Utils.__cache = {};

      var id = 0;
      Utils.GetUniqueElementId = function (element) {
        // Get a unique element Id. If element has no id, 
        // creates a new unique number, stores it in the id 
        // attribute and returns the new id. 
        // If an id already exists, it simply returns it.

        var select2Id = element.getAttribute('data-select2-id');
        if (select2Id == null) {
          // If element has id, use it.
          if (element.id) {
            select2Id = element.id;
            element.setAttribute('data-select2-id', select2Id);
          } else {
            element.setAttribute('data-select2-id', ++id);
            select2Id = id.toString();
          }
        }
        return select2Id;
      };

      Utils.StoreData = function (element, name, value) {
        // Stores an item in the cache for a specified element.
        // name is the cache key.    
        var id = Utils.GetUniqueElementId(element);
        if (!Utils.__cache[id]) {
          Utils.__cache[id] = {};
        }

        Utils.__cache[id][name] = value;
      };

      Utils.GetData = function (element, name) {
        // Retrieves a value from the cache by its key (name)
        // name is optional. If no name specified, return 
        // all cache items for the specified element.
        // and for a specified element.
        var id = Utils.GetUniqueElementId(element);
        if (name) {
          if (Utils.__cache[id]) {
            return Utils.__cache[id][name] != null ? Utils.__cache[id][name] : $(element).data(name); // Fallback to HTML5 data attribs.
          }
          return $(element).data(name); // Fallback to HTML5 data attribs.
        } else {
          return Utils.__cache[id];
        }
      };

      Utils.RemoveData = function (element) {
        // Removes all cached items for a specified element.
        var id = Utils.GetUniqueElementId(element);
        if (Utils.__cache[id] != null) {
          delete Utils.__cache[id];
        }
      };

      return Utils;
    });

    S2.define('select2/results', ['jquery', './utils'], function ($, Utils) {
      function Results($element, options, dataAdapter) {
        this.$element = $element;
        this.data = dataAdapter;
        this.options = options;

        Results.__super__.constructor.call(this);
      }

      Utils.Extend(Results, Utils.Observable);

      Results.prototype.render = function () {
        var $results = $('<ul class="select2-results__options" role="tree"></ul>');

        if (this.options.get('multiple')) {
          $results.attr('aria-multiselectable', 'true');
        }

        this.$results = $results;

        return $results;
      };

      Results.prototype.clear = function () {
        this.$results.empty();
      };

      Results.prototype.displayMessage = function (params) {
        var escapeMarkup = this.options.get('escapeMarkup');

        this.clear();
        this.hideLoading();

        var $message = $('<li role="treeitem" aria-live="assertive"' + ' class="select2-results__option"></li>');

        var message = this.options.get('translations').get(params.message);

        $message.append(escapeMarkup(message(params.args)));

        $message[0].className += ' select2-results__message';

        this.$results.append($message);
      };

      Results.prototype.hideMessages = function () {
        this.$results.find('.select2-results__message').remove();
      };

      Results.prototype.append = function (data) {
        this.hideLoading();

        var $options = [];

        if (data.results == null || data.results.length === 0) {
          if (this.$results.children().length === 0) {
            this.trigger('results:message', {
              message: 'noResults'
            });
          }

          return;
        }

        data.results = this.sort(data.results);

        for (var d = 0; d < data.results.length; d++) {
          var item = data.results[d];

          var $option = this.option(item);

          $options.push($option);
        }

        this.$results.append($options);
      };

      Results.prototype.position = function ($results, $dropdown) {
        var $resultsContainer = $dropdown.find('.select2-results');
        $resultsContainer.append($results);
      };

      Results.prototype.sort = function (data) {
        var sorter = this.options.get('sorter');

        return sorter(data);
      };

      Results.prototype.highlightFirstItem = function () {
        var $options = this.$results.find('.select2-results__option[aria-selected]');

        var $selected = $options.filter('[aria-selected=true]');

        // Check if there are any selected options
        if ($selected.length > 0) {
          // If there are selected options, highlight the first
          $selected.first().trigger('mouseenter');
        } else {
          // If there are no selected options, highlight the first option
          // in the dropdown
          $options.first().trigger('mouseenter');
        }

        this.ensureHighlightVisible();
      };

      Results.prototype.setClasses = function () {
        var self = this;

        this.data.current(function (selected) {
          var selectedIds = $.map(selected, function (s) {
            return s.id.toString();
          });

          var $options = self.$results.find('.select2-results__option[aria-selected]');

          $options.each(function () {
            var $option = $(this);

            var item = Utils.GetData(this, 'data');

            // id needs to be converted to a string when comparing
            var id = '' + item.id;

            if (item.element != null && item.element.selected || item.element == null && $.inArray(id, selectedIds) > -1) {
              $option.attr('aria-selected', 'true');
            } else {
              $option.attr('aria-selected', 'false');
            }
          });
        });
      };

      Results.prototype.showLoading = function (params) {
        this.hideLoading();

        var loadingMore = this.options.get('translations').get('searching');

        var loading = {
          disabled: true,
          loading: true,
          text: loadingMore(params)
        };
        var $loading = this.option(loading);
        $loading.className += ' loading-results';

        this.$results.prepend($loading);
      };

      Results.prototype.hideLoading = function () {
        this.$results.find('.loading-results').remove();
      };

      Results.prototype.option = function (data) {
        var option = document.createElement('li');
        option.className = 'select2-results__option';

        var attrs = {
          'role': 'treeitem',
          'aria-selected': 'false'
        };

        if (data.disabled) {
          delete attrs['aria-selected'];
          attrs['aria-disabled'] = 'true';
        }

        if (data.id == null) {
          delete attrs['aria-selected'];
        }

        if (data._resultId != null) {
          option.id = data._resultId;
        }

        if (data.title) {
          option.title = data.title;
        }

        if (data.children) {
          attrs.role = 'group';
          attrs['aria-label'] = data.text;
          delete attrs['aria-selected'];
        }

        for (var attr in attrs) {
          var val = attrs[attr];

          option.setAttribute(attr, val);
        }

        if (data.children) {
          var $option = $(option);

          var label = document.createElement('strong');
          label.className = 'select2-results__group';

          var $label = $(label);
          this.template(data, label);

          var $children = [];

          for (var c = 0; c < data.children.length; c++) {
            var child = data.children[c];

            var $child = this.option(child);

            $children.push($child);
          }

          var $childrenContainer = $('<ul></ul>', {
            'class': 'select2-results__options select2-results__options--nested'
          });

          $childrenContainer.append($children);

          $option.append(label);
          $option.append($childrenContainer);
        } else {
          this.template(data, option);
        }

        Utils.StoreData(option, 'data', data);

        return option;
      };

      Results.prototype.bind = function (container, $container) {
        var self = this;

        var id = container.id + '-results';

        this.$results.attr('id', id);

        container.on('results:all', function (params) {
          self.clear();
          self.append(params.data);

          if (container.isOpen()) {
            self.setClasses();
            self.highlightFirstItem();
          }
        });

        container.on('results:append', function (params) {
          self.append(params.data);

          if (container.isOpen()) {
            self.setClasses();
          }
        });

        container.on('query', function (params) {
          self.hideMessages();
          self.showLoading(params);
        });

        container.on('select', function () {
          if (!container.isOpen()) {
            return;
          }

          self.setClasses();
          self.highlightFirstItem();
        });

        container.on('unselect', function () {
          if (!container.isOpen()) {
            return;
          }

          self.setClasses();
          self.highlightFirstItem();
        });

        container.on('open', function () {
          // When the dropdown is open, aria-expended="true"
          self.$results.attr('aria-expanded', 'true');
          self.$results.attr('aria-hidden', 'false');

          self.setClasses();
          self.ensureHighlightVisible();
        });

        container.on('close', function () {
          // When the dropdown is closed, aria-expended="false"
          self.$results.attr('aria-expanded', 'false');
          self.$results.attr('aria-hidden', 'true');
          self.$results.removeAttr('aria-activedescendant');
        });

        container.on('results:toggle', function () {
          var $highlighted = self.getHighlightedResults();

          if ($highlighted.length === 0) {
            return;
          }

          $highlighted.trigger('mouseup');
        });

        container.on('results:select', function () {
          var $highlighted = self.getHighlightedResults();

          if ($highlighted.length === 0) {
            return;
          }

          var data = Utils.GetData($highlighted[0], 'data');

          if ($highlighted.attr('aria-selected') == 'true') {
            self.trigger('close', {});
          } else {
            self.trigger('select', {
              data: data
            });
          }
        });

        container.on('results:previous', function () {
          var $highlighted = self.getHighlightedResults();

          var $options = self.$results.find('[aria-selected]');

          var currentIndex = $options.index($highlighted);

          // If we are already at te top, don't move further
          // If no options, currentIndex will be -1
          if (currentIndex <= 0) {
            return;
          }

          var nextIndex = currentIndex - 1;

          // If none are highlighted, highlight the first
          if ($highlighted.length === 0) {
            nextIndex = 0;
          }

          var $next = $options.eq(nextIndex);

          $next.trigger('mouseenter');

          var currentOffset = self.$results.offset().top;
          var nextTop = $next.offset().top;
          var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextTop - currentOffset < 0) {
            self.$results.scrollTop(nextOffset);
          }
        });

        container.on('results:next', function () {
          var $highlighted = self.getHighlightedResults();

          var $options = self.$results.find('[aria-selected]');

          var currentIndex = $options.index($highlighted);

          var nextIndex = currentIndex + 1;

          // If we are at the last option, stay there
          if (nextIndex >= $options.length) {
            return;
          }

          var $next = $options.eq(nextIndex);

          $next.trigger('mouseenter');

          var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
          var nextBottom = $next.offset().top + $next.outerHeight(false);
          var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextBottom > currentOffset) {
            self.$results.scrollTop(nextOffset);
          }
        });

        container.on('results:focus', function (params) {
          params.element.addClass('select2-results__option--highlighted');
        });

        container.on('results:message', function (params) {
          self.displayMessage(params);
        });

        if ($.fn.mousewheel) {
          this.$results.on('mousewheel', function (e) {
            var top = self.$results.scrollTop();

            var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

            var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
            var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

            if (isAtTop) {
              self.$results.scrollTop(0);

              e.preventDefault();
              e.stopPropagation();
            } else if (isAtBottom) {
              self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());

              e.preventDefault();
              e.stopPropagation();
            }
          });
        }

        this.$results.on('mouseup', '.select2-results__option[aria-selected]', function (evt) {
          var $this = $(this);

          var data = Utils.GetData(this, 'data');

          if ($this.attr('aria-selected') === 'true') {
            if (self.options.get('multiple')) {
              self.trigger('unselect', {
                originalEvent: evt,
                data: data
              });
            } else {
              self.trigger('close', {});
            }

            return;
          }

          self.trigger('select', {
            originalEvent: evt,
            data: data
          });
        });

        this.$results.on('mouseenter', '.select2-results__option[aria-selected]', function (evt) {
          var data = Utils.GetData(this, 'data');

          self.getHighlightedResults().removeClass('select2-results__option--highlighted');

          self.trigger('results:focus', {
            data: data,
            element: $(this)
          });
        });
      };

      Results.prototype.getHighlightedResults = function () {
        var $highlighted = this.$results.find('.select2-results__option--highlighted');

        return $highlighted;
      };

      Results.prototype.destroy = function () {
        this.$results.remove();
      };

      Results.prototype.ensureHighlightVisible = function () {
        var $highlighted = this.getHighlightedResults();

        if ($highlighted.length === 0) {
          return;
        }

        var $options = this.$results.find('[aria-selected]');

        var currentIndex = $options.index($highlighted);

        var currentOffset = this.$results.offset().top;
        var nextTop = $highlighted.offset().top;
        var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

        var offsetDelta = nextTop - currentOffset;
        nextOffset -= $highlighted.outerHeight(false) * 2;

        if (currentIndex <= 2) {
          this.$results.scrollTop(0);
        } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
          this.$results.scrollTop(nextOffset);
        }
      };

      Results.prototype.template = function (result, container) {
        var template = this.options.get('templateResult');
        var escapeMarkup = this.options.get('escapeMarkup');

        var content = template(result, container);

        if (content == null) {
          container.style.display = 'none';
        } else if (typeof content === 'string') {
          container.innerHTML = escapeMarkup(content);
        } else {
          $(container).append(content);
        }
      };

      return Results;
    });

    S2.define('select2/keys', [], function () {
      var KEYS = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
      };

      return KEYS;
    });

    S2.define('select2/selection/base', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function BaseSelection($element, options) {
        this.$element = $element;
        this.options = options;

        BaseSelection.__super__.constructor.call(this);
      }

      Utils.Extend(BaseSelection, Utils.Observable);

      BaseSelection.prototype.render = function () {
        var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + '</span>');

        this._tabindex = 0;

        if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
          this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
        } else if (this.$element.attr('tabindex') != null) {
          this._tabindex = this.$element.attr('tabindex');
        }

        $selection.attr('title', this.$element.attr('title'));
        $selection.attr('tabindex', this._tabindex);

        this.$selection = $selection;

        return $selection;
      };

      BaseSelection.prototype.bind = function (container, $container) {
        var self = this;

        var id = container.id + '-container';
        var resultsId = container.id + '-results';

        this.container = container;

        this.$selection.on('focus', function (evt) {
          self.trigger('focus', evt);
        });

        this.$selection.on('blur', function (evt) {
          self._handleBlur(evt);
        });

        this.$selection.on('keydown', function (evt) {
          self.trigger('keypress', evt);

          if (evt.which === KEYS.SPACE) {
            evt.preventDefault();
          }
        });

        container.on('results:focus', function (params) {
          self.$selection.attr('aria-activedescendant', params.data._resultId);
        });

        container.on('selection:update', function (params) {
          self.update(params.data);
        });

        container.on('open', function () {
          // When the dropdown is open, aria-expanded="true"
          self.$selection.attr('aria-expanded', 'true');
          self.$selection.attr('aria-owns', resultsId);

          self._attachCloseHandler(container);
        });

        container.on('close', function () {
          // When the dropdown is closed, aria-expanded="false"
          self.$selection.attr('aria-expanded', 'false');
          self.$selection.removeAttr('aria-activedescendant');
          self.$selection.removeAttr('aria-owns');

          self.$selection.focus();
          window.setTimeout(function () {
            self.$selection.focus();
          }, 0);

          self._detachCloseHandler(container);
        });

        container.on('enable', function () {
          self.$selection.attr('tabindex', self._tabindex);
        });

        container.on('disable', function () {
          self.$selection.attr('tabindex', '-1');
        });
      };

      BaseSelection.prototype._handleBlur = function (evt) {
        var self = this;

        // This needs to be delayed as the active element is the body when the tab
        // key is pressed, possibly along with others.
        window.setTimeout(function () {
          // Don't trigger `blur` if the focus is still in the selection
          if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
            return;
          }

          self.trigger('blur', evt);
        }, 1);
      };

      BaseSelection.prototype._attachCloseHandler = function (container) {
        var self = this;

        $(document.body).on('mousedown.select2.' + container.id, function (e) {
          var $target = $(e.target);

          var $select = $target.closest('.select2');

          var $all = $('.select2.select2-container--open');

          $all.each(function () {
            var $this = $(this);

            if (this == $select[0]) {
              return;
            }

            var $element = Utils.GetData(this, 'element');

            $element.select2('close');
          });
        });
      };

      BaseSelection.prototype._detachCloseHandler = function (container) {
        $(document.body).off('mousedown.select2.' + container.id);
      };

      BaseSelection.prototype.position = function ($selection, $container) {
        var $selectionContainer = $container.find('.selection');
        $selectionContainer.append($selection);
      };

      BaseSelection.prototype.destroy = function () {
        this._detachCloseHandler(this.container);
      };

      BaseSelection.prototype.update = function (data) {
        throw new Error('The `update` method must be defined in child classes.');
      };

      return BaseSelection;
    });

    S2.define('select2/selection/single', ['jquery', './base', '../utils', '../keys'], function ($, BaseSelection, Utils, KEYS) {
      function SingleSelection() {
        SingleSelection.__super__.constructor.apply(this, arguments);
      }

      Utils.Extend(SingleSelection, BaseSelection);

      SingleSelection.prototype.render = function () {
        var $selection = SingleSelection.__super__.render.call(this);

        $selection.addClass('select2-selection--single');

        $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');

        return $selection;
      };

      SingleSelection.prototype.bind = function (container, $container) {
        var self = this;

        SingleSelection.__super__.bind.apply(this, arguments);

        var id = container.id + '-container';

        this.$selection.find('.select2-selection__rendered').attr('id', id).attr('role', 'textbox').attr('aria-readonly', 'true');
        this.$selection.attr('aria-labelledby', id);

        this.$selection.on('mousedown', function (evt) {
          // Only respond to left clicks
          if (evt.which !== 1) {
            return;
          }

          self.trigger('toggle', {
            originalEvent: evt
          });
        });

        this.$selection.on('focus', function (evt) {
          // User focuses on the container
        });

        this.$selection.on('blur', function (evt) {
          // User exits the container
        });

        container.on('focus', function (evt) {
          if (!container.isOpen()) {
            self.$selection.focus();
          }
        });
      };

      SingleSelection.prototype.clear = function () {
        var $rendered = this.$selection.find('.select2-selection__rendered');
        $rendered.empty();
        $rendered.removeAttr('title'); // clear tooltip on empty
      };

      SingleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');

        return escapeMarkup(template(data, container));
      };

      SingleSelection.prototype.selectionContainer = function () {
        return $('<span></span>');
      };

      SingleSelection.prototype.update = function (data) {
        if (data.length === 0) {
          this.clear();
          return;
        }

        var selection = data[0];

        var $rendered = this.$selection.find('.select2-selection__rendered');
        var formatted = this.display(selection, $rendered);

        $rendered.empty().append(formatted);
        $rendered.attr('title', selection.title || selection.text);
      };

      return SingleSelection;
    });

    S2.define('select2/selection/multiple', ['jquery', './base', '../utils'], function ($, BaseSelection, Utils) {
      function MultipleSelection($element, options) {
        MultipleSelection.__super__.constructor.apply(this, arguments);
      }

      Utils.Extend(MultipleSelection, BaseSelection);

      MultipleSelection.prototype.render = function () {
        var $selection = MultipleSelection.__super__.render.call(this);

        $selection.addClass('select2-selection--multiple');

        $selection.html('<ul class="select2-selection__rendered"></ul>');

        return $selection;
      };

      MultipleSelection.prototype.bind = function (container, $container) {
        var self = this;

        MultipleSelection.__super__.bind.apply(this, arguments);

        this.$selection.on('click', function (evt) {
          self.trigger('toggle', {
            originalEvent: evt
          });
        });

        this.$selection.on('click', '.select2-selection__choice__remove', function (evt) {
          // Ignore the event if it is disabled
          if (self.options.get('disabled')) {
            return;
          }

          var $remove = $(this);
          var $selection = $remove.parent();

          var data = Utils.GetData($selection[0], 'data');

          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        });
      };

      MultipleSelection.prototype.clear = function () {
        var $rendered = this.$selection.find('.select2-selection__rendered');
        $rendered.empty();
        $rendered.removeAttr('title');
      };

      MultipleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');

        return escapeMarkup(template(data, container));
      };

      MultipleSelection.prototype.selectionContainer = function () {
        var $container = $('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + '&times;' + '</span>' + '</li>');

        return $container;
      };

      MultipleSelection.prototype.update = function (data) {
        this.clear();

        if (data.length === 0) {
          return;
        }

        var $selections = [];

        for (var d = 0; d < data.length; d++) {
          var selection = data[d];

          var $selection = this.selectionContainer();
          var formatted = this.display(selection, $selection);

          $selection.append(formatted);
          $selection.attr('title', selection.title || selection.text);

          Utils.StoreData($selection[0], 'data', selection);

          $selections.push($selection);
        }

        var $rendered = this.$selection.find('.select2-selection__rendered');

        Utils.appendMany($rendered, $selections);
      };

      return MultipleSelection;
    });

    S2.define('select2/selection/placeholder', ['../utils'], function (Utils) {
      function Placeholder(decorated, $element, options) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

        decorated.call(this, $element, options);
      }

      Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }

        return placeholder;
      };

      Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
        var $placeholder = this.selectionContainer();

        $placeholder.html(this.display(placeholder));
        $placeholder.addClass('select2-selection__placeholder').removeClass('select2-selection__choice');

        return $placeholder;
      };

      Placeholder.prototype.update = function (decorated, data) {
        var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
        var multipleSelections = data.length > 1;

        if (multipleSelections || singlePlaceholder) {
          return decorated.call(this, data);
        }

        this.clear();

        var $placeholder = this.createPlaceholder(this.placeholder);

        this.$selection.find('.select2-selection__rendered').append($placeholder);
      };

      return Placeholder;
    });

    S2.define('select2/selection/allowClear', ['jquery', '../keys', '../utils'], function ($, KEYS, Utils) {
      function AllowClear() {}

      AllowClear.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        if (this.placeholder == null) {
          if (this.options.get('debug') && window.console && console.error) {
            console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');
          }
        }

        this.$selection.on('mousedown', '.select2-selection__clear', function (evt) {
          self._handleClear(evt);
        });

        container.on('keypress', function (evt) {
          self._handleKeyboardClear(evt, container);
        });
      };

      AllowClear.prototype._handleClear = function (_, evt) {
        // Ignore the event if it is disabled
        if (this.options.get('disabled')) {
          return;
        }

        var $clear = this.$selection.find('.select2-selection__clear');

        // Ignore the event if nothing has been selected
        if ($clear.length === 0) {
          return;
        }

        evt.stopPropagation();

        var data = Utils.GetData($clear[0], 'data');

        var previousVal = this.$element.val();
        this.$element.val(this.placeholder.id);

        var unselectData = {
          data: data
        };
        this.trigger('clear', unselectData);
        if (unselectData.prevented) {
          this.$element.val(previousVal);
          return;
        }

        for (var d = 0; d < data.length; d++) {
          unselectData = {
            data: data[d]
          };

          // Trigger the `unselect` event, so people can prevent it from being
          // cleared.
          this.trigger('unselect', unselectData);

          // If the event was prevented, don't clear it out.
          if (unselectData.prevented) {
            this.$element.val(previousVal);
            return;
          }
        }

        this.$element.trigger('change');

        this.trigger('toggle', {});
      };

      AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
        if (container.isOpen()) {
          return;
        }

        if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
          this._handleClear(evt);
        }
      };

      AllowClear.prototype.update = function (decorated, data) {
        decorated.call(this, data);

        if (this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0) {
          return;
        }

        var $remove = $('<span class="select2-selection__clear">' + '&times;' + '</span>');
        Utils.StoreData($remove[0], 'data', data);

        this.$selection.find('.select2-selection__rendered').prepend($remove);
      };

      return AllowClear;
    });

    S2.define('select2/selection/search', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function Search(decorated, $element, options) {
        decorated.call(this, $element, options);
      }

      Search.prototype.render = function (decorated) {
        var $search = $('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" aria-autocomplete="list" />' + '</li>');

        this.$searchContainer = $search;
        this.$search = $search.find('input');

        var $rendered = decorated.call(this);

        this._transferTabIndex();

        return $rendered;
      };

      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('open', function () {
          self.$search.trigger('focus');
        });

        container.on('close', function () {
          self.$search.val('');
          self.$search.removeAttr('aria-activedescendant');
          self.$search.trigger('focus');
        });

        container.on('enable', function () {
          self.$search.prop('disabled', false);

          self._transferTabIndex();
        });

        container.on('disable', function () {
          self.$search.prop('disabled', true);
        });

        container.on('focus', function (evt) {
          self.$search.trigger('focus');
        });

        container.on('results:focus', function (params) {
          self.$search.attr('aria-activedescendant', params.id);
        });

        this.$selection.on('focusin', '.select2-search--inline', function (evt) {
          self.trigger('focus', evt);
        });

        this.$selection.on('focusout', '.select2-search--inline', function (evt) {
          self._handleBlur(evt);
        });

        this.$selection.on('keydown', '.select2-search--inline', function (evt) {
          evt.stopPropagation();

          self.trigger('keypress', evt);

          self._keyUpPrevented = evt.isDefaultPrevented();

          var key = evt.which;

          if (key === KEYS.BACKSPACE && self.$search.val() === '') {
            var $previousChoice = self.$searchContainer.prev('.select2-selection__choice');

            if ($previousChoice.length > 0) {
              var item = Utils.GetData($previousChoice[0], 'data');

              self.searchRemoveChoice(item);

              evt.preventDefault();
            }
          }
        });

        // Try to detect the IE version should the `documentMode` property that
        // is stored on the document. This is only implemented in IE and is
        // slightly cleaner than doing a user agent check.
        // This property is not available in Edge, but Edge also doesn't have
        // this bug.
        var msie = document.documentMode;
        var disableInputEvents = msie && msie <= 11;

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$selection.on('input.searchcheck', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents) {
            self.$selection.off('input.search input.searchcheck');
            return;
          }

          // Unbind the duplicated `keyup` event
          self.$selection.off('keyup.search');
        });

        this.$selection.on('keyup.search input.search', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents && evt.type === 'input') {
            self.$selection.off('input.search input.searchcheck');
            return;
          }

          var key = evt.which;

          // We can freely ignore events from modifier keys
          if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
            return;
          }

          // Tabbing will be handled during the `keydown` phase
          if (key == KEYS.TAB) {
            return;
          }

          self.handleSearch(evt);
        });
      };

      /**
       * This method will transfer the tabindex attribute from the rendered
       * selection to the search box. This allows for the search box to be used as
       * the primary focus instead of the selection container.
       *
       * @private
       */
      Search.prototype._transferTabIndex = function (decorated) {
        this.$search.attr('tabindex', this.$selection.attr('tabindex'));
        this.$selection.attr('tabindex', '-1');
      };

      Search.prototype.createPlaceholder = function (decorated, placeholder) {
        this.$search.attr('placeholder', placeholder.text);
      };

      Search.prototype.update = function (decorated, data) {
        var searchHadFocus = this.$search[0] == document.activeElement;

        this.$search.attr('placeholder', '');

        decorated.call(this, data);

        this.$selection.find('.select2-selection__rendered').append(this.$searchContainer);

        this.resizeSearch();
        if (searchHadFocus) {
          var isTagInput = this.$element.find('[data-select2-tag]').length;
          if (isTagInput) {
            // fix IE11 bug where tag input lost focus
            this.$element.focus();
          } else {
            this.$search.focus();
          }
        }
      };

      Search.prototype.handleSearch = function () {
        this.resizeSearch();

        if (!this._keyUpPrevented) {
          var input = this.$search.val();

          this.trigger('query', {
            term: input
          });
        }

        this._keyUpPrevented = false;
      };

      Search.prototype.searchRemoveChoice = function (decorated, item) {
        this.trigger('unselect', {
          data: item
        });

        this.$search.val(item.text);
        this.handleSearch();
      };

      Search.prototype.resizeSearch = function () {
        this.$search.css('width', '25px');

        var width = '';

        if (this.$search.attr('placeholder') !== '') {
          width = this.$selection.find('.select2-selection__rendered').innerWidth();
        } else {
          var minimumWidth = this.$search.val().length + 1;

          width = minimumWidth * 0.75 + 'em';
        }

        this.$search.css('width', width);
      };

      return Search;
    });

    S2.define('select2/selection/eventRelay', ['jquery'], function ($) {
      function EventRelay() {}

      EventRelay.prototype.bind = function (decorated, container, $container) {
        var self = this;
        var relayEvents = ['open', 'opening', 'close', 'closing', 'select', 'selecting', 'unselect', 'unselecting', 'clear', 'clearing'];

        var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting', 'clearing'];

        decorated.call(this, container, $container);

        container.on('*', function (name, params) {
          // Ignore events that should not be relayed
          if ($.inArray(name, relayEvents) === -1) {
            return;
          }

          // The parameters should always be an object
          params = params || {};

          // Generate the jQuery event for the Select2 event
          var evt = $.Event('select2:' + name, {
            params: params
          });

          self.$element.trigger(evt);

          // Only handle preventable events if it was one
          if ($.inArray(name, preventableEvents) === -1) {
            return;
          }

          params.prevented = evt.isDefaultPrevented();
        });
      };

      return EventRelay;
    });

    S2.define('select2/translation', ['jquery', 'require'], function ($, require) {
      function Translation(dict) {
        this.dict = dict || {};
      }

      Translation.prototype.all = function () {
        return this.dict;
      };

      Translation.prototype.get = function (key) {
        return this.dict[key];
      };

      Translation.prototype.extend = function (translation) {
        this.dict = $.extend({}, translation.all(), this.dict);
      };

      // Static functions

      Translation._cache = {};

      Translation.loadPath = function (path) {
        if (!(path in Translation._cache)) {
          var translations = require(path);

          Translation._cache[path] = translations;
        }

        return new Translation(Translation._cache[path]);
      };

      return Translation;
    });

    S2.define('select2/diacritics', [], function () {
      var diacritics = {
        '\u24B6': 'A',
        '\uFF21': 'A',
        '\xC0': 'A',
        '\xC1': 'A',
        '\xC2': 'A',
        '\u1EA6': 'A',
        '\u1EA4': 'A',
        '\u1EAA': 'A',
        '\u1EA8': 'A',
        '\xC3': 'A',
        '\u0100': 'A',
        '\u0102': 'A',
        '\u1EB0': 'A',
        '\u1EAE': 'A',
        '\u1EB4': 'A',
        '\u1EB2': 'A',
        '\u0226': 'A',
        '\u01E0': 'A',
        '\xC4': 'A',
        '\u01DE': 'A',
        '\u1EA2': 'A',
        '\xC5': 'A',
        '\u01FA': 'A',
        '\u01CD': 'A',
        '\u0200': 'A',
        '\u0202': 'A',
        '\u1EA0': 'A',
        '\u1EAC': 'A',
        '\u1EB6': 'A',
        '\u1E00': 'A',
        '\u0104': 'A',
        '\u023A': 'A',
        '\u2C6F': 'A',
        '\uA732': 'AA',
        '\xC6': 'AE',
        '\u01FC': 'AE',
        '\u01E2': 'AE',
        '\uA734': 'AO',
        '\uA736': 'AU',
        '\uA738': 'AV',
        '\uA73A': 'AV',
        '\uA73C': 'AY',
        '\u24B7': 'B',
        '\uFF22': 'B',
        '\u1E02': 'B',
        '\u1E04': 'B',
        '\u1E06': 'B',
        '\u0243': 'B',
        '\u0182': 'B',
        '\u0181': 'B',
        '\u24B8': 'C',
        '\uFF23': 'C',
        '\u0106': 'C',
        '\u0108': 'C',
        '\u010A': 'C',
        '\u010C': 'C',
        '\xC7': 'C',
        '\u1E08': 'C',
        '\u0187': 'C',
        '\u023B': 'C',
        '\uA73E': 'C',
        '\u24B9': 'D',
        '\uFF24': 'D',
        '\u1E0A': 'D',
        '\u010E': 'D',
        '\u1E0C': 'D',
        '\u1E10': 'D',
        '\u1E12': 'D',
        '\u1E0E': 'D',
        '\u0110': 'D',
        '\u018B': 'D',
        '\u018A': 'D',
        '\u0189': 'D',
        '\uA779': 'D',
        '\u01F1': 'DZ',
        '\u01C4': 'DZ',
        '\u01F2': 'Dz',
        '\u01C5': 'Dz',
        '\u24BA': 'E',
        '\uFF25': 'E',
        '\xC8': 'E',
        '\xC9': 'E',
        '\xCA': 'E',
        '\u1EC0': 'E',
        '\u1EBE': 'E',
        '\u1EC4': 'E',
        '\u1EC2': 'E',
        '\u1EBC': 'E',
        '\u0112': 'E',
        '\u1E14': 'E',
        '\u1E16': 'E',
        '\u0114': 'E',
        '\u0116': 'E',
        '\xCB': 'E',
        '\u1EBA': 'E',
        '\u011A': 'E',
        '\u0204': 'E',
        '\u0206': 'E',
        '\u1EB8': 'E',
        '\u1EC6': 'E',
        '\u0228': 'E',
        '\u1E1C': 'E',
        '\u0118': 'E',
        '\u1E18': 'E',
        '\u1E1A': 'E',
        '\u0190': 'E',
        '\u018E': 'E',
        '\u24BB': 'F',
        '\uFF26': 'F',
        '\u1E1E': 'F',
        '\u0191': 'F',
        '\uA77B': 'F',
        '\u24BC': 'G',
        '\uFF27': 'G',
        '\u01F4': 'G',
        '\u011C': 'G',
        '\u1E20': 'G',
        '\u011E': 'G',
        '\u0120': 'G',
        '\u01E6': 'G',
        '\u0122': 'G',
        '\u01E4': 'G',
        '\u0193': 'G',
        '\uA7A0': 'G',
        '\uA77D': 'G',
        '\uA77E': 'G',
        '\u24BD': 'H',
        '\uFF28': 'H',
        '\u0124': 'H',
        '\u1E22': 'H',
        '\u1E26': 'H',
        '\u021E': 'H',
        '\u1E24': 'H',
        '\u1E28': 'H',
        '\u1E2A': 'H',
        '\u0126': 'H',
        '\u2C67': 'H',
        '\u2C75': 'H',
        '\uA78D': 'H',
        '\u24BE': 'I',
        '\uFF29': 'I',
        '\xCC': 'I',
        '\xCD': 'I',
        '\xCE': 'I',
        '\u0128': 'I',
        '\u012A': 'I',
        '\u012C': 'I',
        '\u0130': 'I',
        '\xCF': 'I',
        '\u1E2E': 'I',
        '\u1EC8': 'I',
        '\u01CF': 'I',
        '\u0208': 'I',
        '\u020A': 'I',
        '\u1ECA': 'I',
        '\u012E': 'I',
        '\u1E2C': 'I',
        '\u0197': 'I',
        '\u24BF': 'J',
        '\uFF2A': 'J',
        '\u0134': 'J',
        '\u0248': 'J',
        '\u24C0': 'K',
        '\uFF2B': 'K',
        '\u1E30': 'K',
        '\u01E8': 'K',
        '\u1E32': 'K',
        '\u0136': 'K',
        '\u1E34': 'K',
        '\u0198': 'K',
        '\u2C69': 'K',
        '\uA740': 'K',
        '\uA742': 'K',
        '\uA744': 'K',
        '\uA7A2': 'K',
        '\u24C1': 'L',
        '\uFF2C': 'L',
        '\u013F': 'L',
        '\u0139': 'L',
        '\u013D': 'L',
        '\u1E36': 'L',
        '\u1E38': 'L',
        '\u013B': 'L',
        '\u1E3C': 'L',
        '\u1E3A': 'L',
        '\u0141': 'L',
        '\u023D': 'L',
        '\u2C62': 'L',
        '\u2C60': 'L',
        '\uA748': 'L',
        '\uA746': 'L',
        '\uA780': 'L',
        '\u01C7': 'LJ',
        '\u01C8': 'Lj',
        '\u24C2': 'M',
        '\uFF2D': 'M',
        '\u1E3E': 'M',
        '\u1E40': 'M',
        '\u1E42': 'M',
        '\u2C6E': 'M',
        '\u019C': 'M',
        '\u24C3': 'N',
        '\uFF2E': 'N',
        '\u01F8': 'N',
        '\u0143': 'N',
        '\xD1': 'N',
        '\u1E44': 'N',
        '\u0147': 'N',
        '\u1E46': 'N',
        '\u0145': 'N',
        '\u1E4A': 'N',
        '\u1E48': 'N',
        '\u0220': 'N',
        '\u019D': 'N',
        '\uA790': 'N',
        '\uA7A4': 'N',
        '\u01CA': 'NJ',
        '\u01CB': 'Nj',
        '\u24C4': 'O',
        '\uFF2F': 'O',
        '\xD2': 'O',
        '\xD3': 'O',
        '\xD4': 'O',
        '\u1ED2': 'O',
        '\u1ED0': 'O',
        '\u1ED6': 'O',
        '\u1ED4': 'O',
        '\xD5': 'O',
        '\u1E4C': 'O',
        '\u022C': 'O',
        '\u1E4E': 'O',
        '\u014C': 'O',
        '\u1E50': 'O',
        '\u1E52': 'O',
        '\u014E': 'O',
        '\u022E': 'O',
        '\u0230': 'O',
        '\xD6': 'O',
        '\u022A': 'O',
        '\u1ECE': 'O',
        '\u0150': 'O',
        '\u01D1': 'O',
        '\u020C': 'O',
        '\u020E': 'O',
        '\u01A0': 'O',
        '\u1EDC': 'O',
        '\u1EDA': 'O',
        '\u1EE0': 'O',
        '\u1EDE': 'O',
        '\u1EE2': 'O',
        '\u1ECC': 'O',
        '\u1ED8': 'O',
        '\u01EA': 'O',
        '\u01EC': 'O',
        '\xD8': 'O',
        '\u01FE': 'O',
        '\u0186': 'O',
        '\u019F': 'O',
        '\uA74A': 'O',
        '\uA74C': 'O',
        '\u01A2': 'OI',
        '\uA74E': 'OO',
        '\u0222': 'OU',
        '\u24C5': 'P',
        '\uFF30': 'P',
        '\u1E54': 'P',
        '\u1E56': 'P',
        '\u01A4': 'P',
        '\u2C63': 'P',
        '\uA750': 'P',
        '\uA752': 'P',
        '\uA754': 'P',
        '\u24C6': 'Q',
        '\uFF31': 'Q',
        '\uA756': 'Q',
        '\uA758': 'Q',
        '\u024A': 'Q',
        '\u24C7': 'R',
        '\uFF32': 'R',
        '\u0154': 'R',
        '\u1E58': 'R',
        '\u0158': 'R',
        '\u0210': 'R',
        '\u0212': 'R',
        '\u1E5A': 'R',
        '\u1E5C': 'R',
        '\u0156': 'R',
        '\u1E5E': 'R',
        '\u024C': 'R',
        '\u2C64': 'R',
        '\uA75A': 'R',
        '\uA7A6': 'R',
        '\uA782': 'R',
        '\u24C8': 'S',
        '\uFF33': 'S',
        '\u1E9E': 'S',
        '\u015A': 'S',
        '\u1E64': 'S',
        '\u015C': 'S',
        '\u1E60': 'S',
        '\u0160': 'S',
        '\u1E66': 'S',
        '\u1E62': 'S',
        '\u1E68': 'S',
        '\u0218': 'S',
        '\u015E': 'S',
        '\u2C7E': 'S',
        '\uA7A8': 'S',
        '\uA784': 'S',
        '\u24C9': 'T',
        '\uFF34': 'T',
        '\u1E6A': 'T',
        '\u0164': 'T',
        '\u1E6C': 'T',
        '\u021A': 'T',
        '\u0162': 'T',
        '\u1E70': 'T',
        '\u1E6E': 'T',
        '\u0166': 'T',
        '\u01AC': 'T',
        '\u01AE': 'T',
        '\u023E': 'T',
        '\uA786': 'T',
        '\uA728': 'TZ',
        '\u24CA': 'U',
        '\uFF35': 'U',
        '\xD9': 'U',
        '\xDA': 'U',
        '\xDB': 'U',
        '\u0168': 'U',
        '\u1E78': 'U',
        '\u016A': 'U',
        '\u1E7A': 'U',
        '\u016C': 'U',
        '\xDC': 'U',
        '\u01DB': 'U',
        '\u01D7': 'U',
        '\u01D5': 'U',
        '\u01D9': 'U',
        '\u1EE6': 'U',
        '\u016E': 'U',
        '\u0170': 'U',
        '\u01D3': 'U',
        '\u0214': 'U',
        '\u0216': 'U',
        '\u01AF': 'U',
        '\u1EEA': 'U',
        '\u1EE8': 'U',
        '\u1EEE': 'U',
        '\u1EEC': 'U',
        '\u1EF0': 'U',
        '\u1EE4': 'U',
        '\u1E72': 'U',
        '\u0172': 'U',
        '\u1E76': 'U',
        '\u1E74': 'U',
        '\u0244': 'U',
        '\u24CB': 'V',
        '\uFF36': 'V',
        '\u1E7C': 'V',
        '\u1E7E': 'V',
        '\u01B2': 'V',
        '\uA75E': 'V',
        '\u0245': 'V',
        '\uA760': 'VY',
        '\u24CC': 'W',
        '\uFF37': 'W',
        '\u1E80': 'W',
        '\u1E82': 'W',
        '\u0174': 'W',
        '\u1E86': 'W',
        '\u1E84': 'W',
        '\u1E88': 'W',
        '\u2C72': 'W',
        '\u24CD': 'X',
        '\uFF38': 'X',
        '\u1E8A': 'X',
        '\u1E8C': 'X',
        '\u24CE': 'Y',
        '\uFF39': 'Y',
        '\u1EF2': 'Y',
        '\xDD': 'Y',
        '\u0176': 'Y',
        '\u1EF8': 'Y',
        '\u0232': 'Y',
        '\u1E8E': 'Y',
        '\u0178': 'Y',
        '\u1EF6': 'Y',
        '\u1EF4': 'Y',
        '\u01B3': 'Y',
        '\u024E': 'Y',
        '\u1EFE': 'Y',
        '\u24CF': 'Z',
        '\uFF3A': 'Z',
        '\u0179': 'Z',
        '\u1E90': 'Z',
        '\u017B': 'Z',
        '\u017D': 'Z',
        '\u1E92': 'Z',
        '\u1E94': 'Z',
        '\u01B5': 'Z',
        '\u0224': 'Z',
        '\u2C7F': 'Z',
        '\u2C6B': 'Z',
        '\uA762': 'Z',
        '\u24D0': 'a',
        '\uFF41': 'a',
        '\u1E9A': 'a',
        '\xE0': 'a',
        '\xE1': 'a',
        '\xE2': 'a',
        '\u1EA7': 'a',
        '\u1EA5': 'a',
        '\u1EAB': 'a',
        '\u1EA9': 'a',
        '\xE3': 'a',
        '\u0101': 'a',
        '\u0103': 'a',
        '\u1EB1': 'a',
        '\u1EAF': 'a',
        '\u1EB5': 'a',
        '\u1EB3': 'a',
        '\u0227': 'a',
        '\u01E1': 'a',
        '\xE4': 'a',
        '\u01DF': 'a',
        '\u1EA3': 'a',
        '\xE5': 'a',
        '\u01FB': 'a',
        '\u01CE': 'a',
        '\u0201': 'a',
        '\u0203': 'a',
        '\u1EA1': 'a',
        '\u1EAD': 'a',
        '\u1EB7': 'a',
        '\u1E01': 'a',
        '\u0105': 'a',
        '\u2C65': 'a',
        '\u0250': 'a',
        '\uA733': 'aa',
        '\xE6': 'ae',
        '\u01FD': 'ae',
        '\u01E3': 'ae',
        '\uA735': 'ao',
        '\uA737': 'au',
        '\uA739': 'av',
        '\uA73B': 'av',
        '\uA73D': 'ay',
        '\u24D1': 'b',
        '\uFF42': 'b',
        '\u1E03': 'b',
        '\u1E05': 'b',
        '\u1E07': 'b',
        '\u0180': 'b',
        '\u0183': 'b',
        '\u0253': 'b',
        '\u24D2': 'c',
        '\uFF43': 'c',
        '\u0107': 'c',
        '\u0109': 'c',
        '\u010B': 'c',
        '\u010D': 'c',
        '\xE7': 'c',
        '\u1E09': 'c',
        '\u0188': 'c',
        '\u023C': 'c',
        '\uA73F': 'c',
        '\u2184': 'c',
        '\u24D3': 'd',
        '\uFF44': 'd',
        '\u1E0B': 'd',
        '\u010F': 'd',
        '\u1E0D': 'd',
        '\u1E11': 'd',
        '\u1E13': 'd',
        '\u1E0F': 'd',
        '\u0111': 'd',
        '\u018C': 'd',
        '\u0256': 'd',
        '\u0257': 'd',
        '\uA77A': 'd',
        '\u01F3': 'dz',
        '\u01C6': 'dz',
        '\u24D4': 'e',
        '\uFF45': 'e',
        '\xE8': 'e',
        '\xE9': 'e',
        '\xEA': 'e',
        '\u1EC1': 'e',
        '\u1EBF': 'e',
        '\u1EC5': 'e',
        '\u1EC3': 'e',
        '\u1EBD': 'e',
        '\u0113': 'e',
        '\u1E15': 'e',
        '\u1E17': 'e',
        '\u0115': 'e',
        '\u0117': 'e',
        '\xEB': 'e',
        '\u1EBB': 'e',
        '\u011B': 'e',
        '\u0205': 'e',
        '\u0207': 'e',
        '\u1EB9': 'e',
        '\u1EC7': 'e',
        '\u0229': 'e',
        '\u1E1D': 'e',
        '\u0119': 'e',
        '\u1E19': 'e',
        '\u1E1B': 'e',
        '\u0247': 'e',
        '\u025B': 'e',
        '\u01DD': 'e',
        '\u24D5': 'f',
        '\uFF46': 'f',
        '\u1E1F': 'f',
        '\u0192': 'f',
        '\uA77C': 'f',
        '\u24D6': 'g',
        '\uFF47': 'g',
        '\u01F5': 'g',
        '\u011D': 'g',
        '\u1E21': 'g',
        '\u011F': 'g',
        '\u0121': 'g',
        '\u01E7': 'g',
        '\u0123': 'g',
        '\u01E5': 'g',
        '\u0260': 'g',
        '\uA7A1': 'g',
        '\u1D79': 'g',
        '\uA77F': 'g',
        '\u24D7': 'h',
        '\uFF48': 'h',
        '\u0125': 'h',
        '\u1E23': 'h',
        '\u1E27': 'h',
        '\u021F': 'h',
        '\u1E25': 'h',
        '\u1E29': 'h',
        '\u1E2B': 'h',
        '\u1E96': 'h',
        '\u0127': 'h',
        '\u2C68': 'h',
        '\u2C76': 'h',
        '\u0265': 'h',
        '\u0195': 'hv',
        '\u24D8': 'i',
        '\uFF49': 'i',
        '\xEC': 'i',
        '\xED': 'i',
        '\xEE': 'i',
        '\u0129': 'i',
        '\u012B': 'i',
        '\u012D': 'i',
        '\xEF': 'i',
        '\u1E2F': 'i',
        '\u1EC9': 'i',
        '\u01D0': 'i',
        '\u0209': 'i',
        '\u020B': 'i',
        '\u1ECB': 'i',
        '\u012F': 'i',
        '\u1E2D': 'i',
        '\u0268': 'i',
        '\u0131': 'i',
        '\u24D9': 'j',
        '\uFF4A': 'j',
        '\u0135': 'j',
        '\u01F0': 'j',
        '\u0249': 'j',
        '\u24DA': 'k',
        '\uFF4B': 'k',
        '\u1E31': 'k',
        '\u01E9': 'k',
        '\u1E33': 'k',
        '\u0137': 'k',
        '\u1E35': 'k',
        '\u0199': 'k',
        '\u2C6A': 'k',
        '\uA741': 'k',
        '\uA743': 'k',
        '\uA745': 'k',
        '\uA7A3': 'k',
        '\u24DB': 'l',
        '\uFF4C': 'l',
        '\u0140': 'l',
        '\u013A': 'l',
        '\u013E': 'l',
        '\u1E37': 'l',
        '\u1E39': 'l',
        '\u013C': 'l',
        '\u1E3D': 'l',
        '\u1E3B': 'l',
        '\u017F': 'l',
        '\u0142': 'l',
        '\u019A': 'l',
        '\u026B': 'l',
        '\u2C61': 'l',
        '\uA749': 'l',
        '\uA781': 'l',
        '\uA747': 'l',
        '\u01C9': 'lj',
        '\u24DC': 'm',
        '\uFF4D': 'm',
        '\u1E3F': 'm',
        '\u1E41': 'm',
        '\u1E43': 'm',
        '\u0271': 'm',
        '\u026F': 'm',
        '\u24DD': 'n',
        '\uFF4E': 'n',
        '\u01F9': 'n',
        '\u0144': 'n',
        '\xF1': 'n',
        '\u1E45': 'n',
        '\u0148': 'n',
        '\u1E47': 'n',
        '\u0146': 'n',
        '\u1E4B': 'n',
        '\u1E49': 'n',
        '\u019E': 'n',
        '\u0272': 'n',
        '\u0149': 'n',
        '\uA791': 'n',
        '\uA7A5': 'n',
        '\u01CC': 'nj',
        '\u24DE': 'o',
        '\uFF4F': 'o',
        '\xF2': 'o',
        '\xF3': 'o',
        '\xF4': 'o',
        '\u1ED3': 'o',
        '\u1ED1': 'o',
        '\u1ED7': 'o',
        '\u1ED5': 'o',
        '\xF5': 'o',
        '\u1E4D': 'o',
        '\u022D': 'o',
        '\u1E4F': 'o',
        '\u014D': 'o',
        '\u1E51': 'o',
        '\u1E53': 'o',
        '\u014F': 'o',
        '\u022F': 'o',
        '\u0231': 'o',
        '\xF6': 'o',
        '\u022B': 'o',
        '\u1ECF': 'o',
        '\u0151': 'o',
        '\u01D2': 'o',
        '\u020D': 'o',
        '\u020F': 'o',
        '\u01A1': 'o',
        '\u1EDD': 'o',
        '\u1EDB': 'o',
        '\u1EE1': 'o',
        '\u1EDF': 'o',
        '\u1EE3': 'o',
        '\u1ECD': 'o',
        '\u1ED9': 'o',
        '\u01EB': 'o',
        '\u01ED': 'o',
        '\xF8': 'o',
        '\u01FF': 'o',
        '\u0254': 'o',
        '\uA74B': 'o',
        '\uA74D': 'o',
        '\u0275': 'o',
        '\u01A3': 'oi',
        '\u0223': 'ou',
        '\uA74F': 'oo',
        '\u24DF': 'p',
        '\uFF50': 'p',
        '\u1E55': 'p',
        '\u1E57': 'p',
        '\u01A5': 'p',
        '\u1D7D': 'p',
        '\uA751': 'p',
        '\uA753': 'p',
        '\uA755': 'p',
        '\u24E0': 'q',
        '\uFF51': 'q',
        '\u024B': 'q',
        '\uA757': 'q',
        '\uA759': 'q',
        '\u24E1': 'r',
        '\uFF52': 'r',
        '\u0155': 'r',
        '\u1E59': 'r',
        '\u0159': 'r',
        '\u0211': 'r',
        '\u0213': 'r',
        '\u1E5B': 'r',
        '\u1E5D': 'r',
        '\u0157': 'r',
        '\u1E5F': 'r',
        '\u024D': 'r',
        '\u027D': 'r',
        '\uA75B': 'r',
        '\uA7A7': 'r',
        '\uA783': 'r',
        '\u24E2': 's',
        '\uFF53': 's',
        '\xDF': 's',
        '\u015B': 's',
        '\u1E65': 's',
        '\u015D': 's',
        '\u1E61': 's',
        '\u0161': 's',
        '\u1E67': 's',
        '\u1E63': 's',
        '\u1E69': 's',
        '\u0219': 's',
        '\u015F': 's',
        '\u023F': 's',
        '\uA7A9': 's',
        '\uA785': 's',
        '\u1E9B': 's',
        '\u24E3': 't',
        '\uFF54': 't',
        '\u1E6B': 't',
        '\u1E97': 't',
        '\u0165': 't',
        '\u1E6D': 't',
        '\u021B': 't',
        '\u0163': 't',
        '\u1E71': 't',
        '\u1E6F': 't',
        '\u0167': 't',
        '\u01AD': 't',
        '\u0288': 't',
        '\u2C66': 't',
        '\uA787': 't',
        '\uA729': 'tz',
        '\u24E4': 'u',
        '\uFF55': 'u',
        '\xF9': 'u',
        '\xFA': 'u',
        '\xFB': 'u',
        '\u0169': 'u',
        '\u1E79': 'u',
        '\u016B': 'u',
        '\u1E7B': 'u',
        '\u016D': 'u',
        '\xFC': 'u',
        '\u01DC': 'u',
        '\u01D8': 'u',
        '\u01D6': 'u',
        '\u01DA': 'u',
        '\u1EE7': 'u',
        '\u016F': 'u',
        '\u0171': 'u',
        '\u01D4': 'u',
        '\u0215': 'u',
        '\u0217': 'u',
        '\u01B0': 'u',
        '\u1EEB': 'u',
        '\u1EE9': 'u',
        '\u1EEF': 'u',
        '\u1EED': 'u',
        '\u1EF1': 'u',
        '\u1EE5': 'u',
        '\u1E73': 'u',
        '\u0173': 'u',
        '\u1E77': 'u',
        '\u1E75': 'u',
        '\u0289': 'u',
        '\u24E5': 'v',
        '\uFF56': 'v',
        '\u1E7D': 'v',
        '\u1E7F': 'v',
        '\u028B': 'v',
        '\uA75F': 'v',
        '\u028C': 'v',
        '\uA761': 'vy',
        '\u24E6': 'w',
        '\uFF57': 'w',
        '\u1E81': 'w',
        '\u1E83': 'w',
        '\u0175': 'w',
        '\u1E87': 'w',
        '\u1E85': 'w',
        '\u1E98': 'w',
        '\u1E89': 'w',
        '\u2C73': 'w',
        '\u24E7': 'x',
        '\uFF58': 'x',
        '\u1E8B': 'x',
        '\u1E8D': 'x',
        '\u24E8': 'y',
        '\uFF59': 'y',
        '\u1EF3': 'y',
        '\xFD': 'y',
        '\u0177': 'y',
        '\u1EF9': 'y',
        '\u0233': 'y',
        '\u1E8F': 'y',
        '\xFF': 'y',
        '\u1EF7': 'y',
        '\u1E99': 'y',
        '\u1EF5': 'y',
        '\u01B4': 'y',
        '\u024F': 'y',
        '\u1EFF': 'y',
        '\u24E9': 'z',
        '\uFF5A': 'z',
        '\u017A': 'z',
        '\u1E91': 'z',
        '\u017C': 'z',
        '\u017E': 'z',
        '\u1E93': 'z',
        '\u1E95': 'z',
        '\u01B6': 'z',
        '\u0225': 'z',
        '\u0240': 'z',
        '\u2C6C': 'z',
        '\uA763': 'z',
        '\u0386': '\u0391',
        '\u0388': '\u0395',
        '\u0389': '\u0397',
        '\u038A': '\u0399',
        '\u03AA': '\u0399',
        '\u038C': '\u039F',
        '\u038E': '\u03A5',
        '\u03AB': '\u03A5',
        '\u038F': '\u03A9',
        '\u03AC': '\u03B1',
        '\u03AD': '\u03B5',
        '\u03AE': '\u03B7',
        '\u03AF': '\u03B9',
        '\u03CA': '\u03B9',
        '\u0390': '\u03B9',
        '\u03CC': '\u03BF',
        '\u03CD': '\u03C5',
        '\u03CB': '\u03C5',
        '\u03B0': '\u03C5',
        '\u03C9': '\u03C9',
        '\u03C2': '\u03C3'
      };

      return diacritics;
    });

    S2.define('select2/data/base', ['../utils'], function (Utils) {
      function BaseAdapter($element, options) {
        BaseAdapter.__super__.constructor.call(this);
      }

      Utils.Extend(BaseAdapter, Utils.Observable);

      BaseAdapter.prototype.current = function (callback) {
        throw new Error('The `current` method must be defined in child classes.');
      };

      BaseAdapter.prototype.query = function (params, callback) {
        throw new Error('The `query` method must be defined in child classes.');
      };

      BaseAdapter.prototype.bind = function (container, $container) {
        // Can be implemented in subclasses
      };

      BaseAdapter.prototype.destroy = function () {
        // Can be implemented in subclasses
      };

      BaseAdapter.prototype.generateResultId = function (container, data) {
        var id = container.id + '-result-';

        id += Utils.generateChars(4);

        if (data.id != null) {
          id += '-' + data.id.toString();
        } else {
          id += '-' + Utils.generateChars(4);
        }
        return id;
      };

      return BaseAdapter;
    });

    S2.define('select2/data/select', ['./base', '../utils', 'jquery'], function (BaseAdapter, Utils, $) {
      function SelectAdapter($element, options) {
        this.$element = $element;
        this.options = options;

        SelectAdapter.__super__.constructor.call(this);
      }

      Utils.Extend(SelectAdapter, BaseAdapter);

      SelectAdapter.prototype.current = function (callback) {
        var data = [];
        var self = this;

        this.$element.find(':selected').each(function () {
          var $option = $(this);

          var option = self.item($option);

          data.push(option);
        });

        callback(data);
      };

      SelectAdapter.prototype.select = function (data) {
        var self = this;

        data.selected = true;

        // If data.element is a DOM node, use it instead
        if ($(data.element).is('option')) {
          data.element.selected = true;

          this.$element.trigger('change');

          return;
        }

        if (this.$element.prop('multiple')) {
          this.current(function (currentData) {
            var val = [];

            data = [data];
            data.push.apply(data, currentData);

            for (var d = 0; d < data.length; d++) {
              var id = data[d].id;

              if ($.inArray(id, val) === -1) {
                val.push(id);
              }
            }

            self.$element.val(val);
            self.$element.trigger('change');
          });
        } else {
          var val = data.id;

          this.$element.val(val);
          this.$element.trigger('change');
        }
      };

      SelectAdapter.prototype.unselect = function (data) {
        var self = this;

        if (!this.$element.prop('multiple')) {
          return;
        }

        data.selected = false;

        if ($(data.element).is('option')) {
          data.element.selected = false;

          this.$element.trigger('change');

          return;
        }

        this.current(function (currentData) {
          var val = [];

          for (var d = 0; d < currentData.length; d++) {
            var id = currentData[d].id;

            if (id !== data.id && $.inArray(id, val) === -1) {
              val.push(id);
            }
          }

          self.$element.val(val);

          self.$element.trigger('change');
        });
      };

      SelectAdapter.prototype.bind = function (container, $container) {
        var self = this;

        this.container = container;

        container.on('select', function (params) {
          self.select(params.data);
        });

        container.on('unselect', function (params) {
          self.unselect(params.data);
        });
      };

      SelectAdapter.prototype.destroy = function () {
        // Remove anything added to child elements
        this.$element.find('*').each(function () {
          // Remove any custom data set by Select2
          Utils.RemoveData(this);
        });
      };

      SelectAdapter.prototype.query = function (params, callback) {
        var data = [];
        var self = this;

        var $options = this.$element.children();

        $options.each(function () {
          var $option = $(this);

          if (!$option.is('option') && !$option.is('optgroup')) {
            return;
          }

          var option = self.item($option);

          var matches = self.matches(params, option);

          if (matches !== null) {
            data.push(matches);
          }
        });

        callback({
          results: data
        });
      };

      SelectAdapter.prototype.addOptions = function ($options) {
        Utils.appendMany(this.$element, $options);
      };

      SelectAdapter.prototype.option = function (data) {
        var option;

        if (data.children) {
          option = document.createElement('optgroup');
          option.label = data.text;
        } else {
          option = document.createElement('option');

          if (option.textContent !== undefined) {
            option.textContent = data.text;
          } else {
            option.innerText = data.text;
          }
        }

        if (data.id !== undefined) {
          option.value = data.id;
        }

        if (data.disabled) {
          option.disabled = true;
        }

        if (data.selected) {
          option.selected = true;
        }

        if (data.title) {
          option.title = data.title;
        }

        var $option = $(option);

        var normalizedData = this._normalizeItem(data);
        normalizedData.element = option;

        // Override the option's data with the combined data
        Utils.StoreData(option, 'data', normalizedData);

        return $option;
      };

      SelectAdapter.prototype.item = function ($option) {
        var data = {};

        data = Utils.GetData($option[0], 'data');

        if (data != null) {
          return data;
        }

        if ($option.is('option')) {
          data = {
            id: $option.val(),
            text: $option.text(),
            disabled: $option.prop('disabled'),
            selected: $option.prop('selected'),
            title: $option.prop('title')
          };
        } else if ($option.is('optgroup')) {
          data = {
            text: $option.prop('label'),
            children: [],
            title: $option.prop('title')
          };

          var $children = $option.children('option');
          var children = [];

          for (var c = 0; c < $children.length; c++) {
            var $child = $($children[c]);

            var child = this.item($child);

            children.push(child);
          }

          data.children = children;
        }

        data = this._normalizeItem(data);
        data.element = $option[0];

        Utils.StoreData($option[0], 'data', data);

        return data;
      };

      SelectAdapter.prototype._normalizeItem = function (item) {
        if (item !== Object(item)) {
          item = {
            id: item,
            text: item
          };
        }

        item = $.extend({}, {
          text: ''
        }, item);

        var defaults = {
          selected: false,
          disabled: false
        };

        if (item.id != null) {
          item.id = item.id.toString();
        }

        if (item.text != null) {
          item.text = item.text.toString();
        }

        if (item._resultId == null && item.id && this.container != null) {
          item._resultId = this.generateResultId(this.container, item);
        }

        return $.extend({}, defaults, item);
      };

      SelectAdapter.prototype.matches = function (params, data) {
        var matcher = this.options.get('matcher');

        return matcher(params, data);
      };

      return SelectAdapter;
    });

    S2.define('select2/data/array', ['./select', '../utils', 'jquery'], function (SelectAdapter, Utils, $) {
      function ArrayAdapter($element, options) {
        var data = options.get('data') || [];

        ArrayAdapter.__super__.constructor.call(this, $element, options);

        this.addOptions(this.convertToOptions(data));
      }

      Utils.Extend(ArrayAdapter, SelectAdapter);

      ArrayAdapter.prototype.select = function (data) {
        var $option = this.$element.find('option').filter(function (i, elm) {
          return elm.value == data.id.toString();
        });

        if ($option.length === 0) {
          $option = this.option(data);

          this.addOptions($option);
        }

        ArrayAdapter.__super__.select.call(this, data);
      };

      ArrayAdapter.prototype.convertToOptions = function (data) {
        var self = this;

        var $existing = this.$element.find('option');
        var existingIds = $existing.map(function () {
          return self.item($(this)).id;
        }).get();

        var $options = [];

        // Filter out all items except for the one passed in the argument
        function onlyItem(item) {
          return function () {
            return $(this).val() == item.id;
          };
        }

        for (var d = 0; d < data.length; d++) {
          var item = this._normalizeItem(data[d]);

          // Skip items which were pre-loaded, only merge the data
          if ($.inArray(item.id, existingIds) >= 0) {
            var $existingOption = $existing.filter(onlyItem(item));

            var existingData = this.item($existingOption);
            var newData = $.extend(true, {}, item, existingData);

            var $newOption = this.option(newData);

            $existingOption.replaceWith($newOption);

            continue;
          }

          var $option = this.option(item);

          if (item.children) {
            var $children = this.convertToOptions(item.children);

            Utils.appendMany($option, $children);
          }

          $options.push($option);
        }

        return $options;
      };

      return ArrayAdapter;
    });

    S2.define('select2/data/ajax', ['./array', '../utils', 'jquery'], function (ArrayAdapter, Utils, $) {
      function AjaxAdapter($element, options) {
        this.ajaxOptions = this._applyDefaults(options.get('ajax'));

        if (this.ajaxOptions.processResults != null) {
          this.processResults = this.ajaxOptions.processResults;
        }

        AjaxAdapter.__super__.constructor.call(this, $element, options);
      }

      Utils.Extend(AjaxAdapter, ArrayAdapter);

      AjaxAdapter.prototype._applyDefaults = function (options) {
        var defaults = {
          data: function data(params) {
            return $.extend({}, params, {
              q: params.term
            });
          },
          transport: function transport(params, success, failure) {
            var $request = $.ajax(params);

            $request.then(success);
            $request.fail(failure);

            return $request;
          }
        };

        return $.extend({}, defaults, options, true);
      };

      AjaxAdapter.prototype.processResults = function (results) {
        return results;
      };

      AjaxAdapter.prototype.query = function (params, callback) {
        var matches = [];
        var self = this;

        if (this._request != null) {
          // JSONP requests cannot always be aborted
          if ($.isFunction(this._request.abort)) {
            this._request.abort();
          }

          this._request = null;
        }

        var options = $.extend({
          type: 'GET'
        }, this.ajaxOptions);

        if (typeof options.url === 'function') {
          options.url = options.url.call(this.$element, params);
        }

        if (typeof options.data === 'function') {
          options.data = options.data.call(this.$element, params);
        }

        function request() {
          var $request = options.transport(options, function (data) {
            var results = self.processResults(data, params);

            if (self.options.get('debug') && window.console && console.error) {
              // Check to make sure that the response included a `results` key.
              if (!results || !results.results || !$.isArray(results.results)) {
                console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');
              }
            }

            callback(results);
          }, function () {
            // Attempt to detect if a request was aborted
            // Only works if the transport exposes a status property
            if ('status' in $request && ($request.status === 0 || $request.status === '0')) {
              return;
            }

            self.trigger('results:message', {
              message: 'errorLoading'
            });
          });

          self._request = $request;
        }

        if (this.ajaxOptions.delay && params.term != null) {
          if (this._queryTimeout) {
            window.clearTimeout(this._queryTimeout);
          }

          this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
        } else {
          request();
        }
      };

      return AjaxAdapter;
    });

    S2.define('select2/data/tags', ['jquery'], function ($) {
      function Tags(decorated, $element, options) {
        var tags = options.get('tags');

        var createTag = options.get('createTag');

        if (createTag !== undefined) {
          this.createTag = createTag;
        }

        var insertTag = options.get('insertTag');

        if (insertTag !== undefined) {
          this.insertTag = insertTag;
        }

        decorated.call(this, $element, options);

        if ($.isArray(tags)) {
          for (var t = 0; t < tags.length; t++) {
            var tag = tags[t];
            var item = this._normalizeItem(tag);

            var $option = this.option(item);

            this.$element.append($option);
          }
        }
      }

      Tags.prototype.query = function (decorated, params, callback) {
        var self = this;

        this._removeOldTags();

        if (params.term == null || params.page != null) {
          decorated.call(this, params, callback);
          return;
        }

        function wrapper(obj, child) {
          var data = obj.results;

          for (var i = 0; i < data.length; i++) {
            var option = data[i];

            var checkChildren = option.children != null && !wrapper({
              results: option.children
            }, true);

            var optionText = (option.text || '').toUpperCase();
            var paramsTerm = (params.term || '').toUpperCase();

            var checkText = optionText === paramsTerm;

            if (checkText || checkChildren) {
              if (child) {
                return false;
              }

              obj.data = data;
              callback(obj);

              return;
            }
          }

          if (child) {
            return true;
          }

          var tag = self.createTag(params);

          if (tag != null) {
            var $option = self.option(tag);
            $option.attr('data-select2-tag', true);

            self.addOptions([$option]);

            self.insertTag(data, tag);
          }

          obj.results = data;

          callback(obj);
        }

        decorated.call(this, params, wrapper);
      };

      Tags.prototype.createTag = function (decorated, params) {
        var term = $.trim(params.term);

        if (term === '') {
          return null;
        }

        return {
          id: term,
          text: term
        };
      };

      Tags.prototype.insertTag = function (_, data, tag) {
        data.unshift(tag);
      };

      Tags.prototype._removeOldTags = function (_) {
        var tag = this._lastTag;

        var $options = this.$element.find('option[data-select2-tag]');

        $options.each(function () {
          if (this.selected) {
            return;
          }

          $(this).remove();
        });
      };

      return Tags;
    });

    S2.define('select2/data/tokenizer', ['jquery'], function ($) {
      function Tokenizer(decorated, $element, options) {
        var tokenizer = options.get('tokenizer');

        if (tokenizer !== undefined) {
          this.tokenizer = tokenizer;
        }

        decorated.call(this, $element, options);
      }

      Tokenizer.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);

        this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');
      };

      Tokenizer.prototype.query = function (decorated, params, callback) {
        var self = this;

        function createAndSelect(data) {
          // Normalize the data object so we can use it for checks
          var item = self._normalizeItem(data);

          // Check if the data object already exists as a tag
          // Select it if it doesn't
          var $existingOptions = self.$element.find('option').filter(function () {
            return $(this).val() === item.id;
          });

          // If an existing option wasn't found for it, create the option
          if (!$existingOptions.length) {
            var $option = self.option(item);
            $option.attr('data-select2-tag', true);

            self._removeOldTags();
            self.addOptions([$option]);
          }

          // Select the item, now that we know there is an option for it
          select(item);
        }

        function select(data) {
          self.trigger('select', {
            data: data
          });
        }

        params.term = params.term || '';

        var tokenData = this.tokenizer(params, this.options, createAndSelect);

        if (tokenData.term !== params.term) {
          // Replace the search term if we have the search box
          if (this.$search.length) {
            this.$search.val(tokenData.term);
            this.$search.focus();
          }

          params.term = tokenData.term;
        }

        decorated.call(this, params, callback);
      };

      Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
        var separators = options.get('tokenSeparators') || [];
        var term = params.term;
        var i = 0;

        var createTag = this.createTag || function (params) {
          return {
            id: params.term,
            text: params.term
          };
        };

        while (i < term.length) {
          var termChar = term[i];

          if ($.inArray(termChar, separators) === -1) {
            i++;

            continue;
          }

          var part = term.substr(0, i);
          var partParams = $.extend({}, params, {
            term: part
          });

          var data = createTag(partParams);

          if (data == null) {
            i++;
            continue;
          }

          callback(data);

          // Reset the term to not include the tokenized portion
          term = term.substr(i + 1) || '';
          i = 0;
        }

        return {
          term: term
        };
      };

      return Tokenizer;
    });

    S2.define('select2/data/minimumInputLength', [], function () {
      function MinimumInputLength(decorated, $e, options) {
        this.minimumInputLength = options.get('minimumInputLength');

        decorated.call(this, $e, options);
      }

      MinimumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';

        if (params.term.length < this.minimumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooShort',
            args: {
              minimum: this.minimumInputLength,
              input: params.term,
              params: params
            }
          });

          return;
        }

        decorated.call(this, params, callback);
      };

      return MinimumInputLength;
    });

    S2.define('select2/data/maximumInputLength', [], function () {
      function MaximumInputLength(decorated, $e, options) {
        this.maximumInputLength = options.get('maximumInputLength');

        decorated.call(this, $e, options);
      }

      MaximumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';

        if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooLong',
            args: {
              maximum: this.maximumInputLength,
              input: params.term,
              params: params
            }
          });

          return;
        }

        decorated.call(this, params, callback);
      };

      return MaximumInputLength;
    });

    S2.define('select2/data/maximumSelectionLength', [], function () {
      function MaximumSelectionLength(decorated, $e, options) {
        this.maximumSelectionLength = options.get('maximumSelectionLength');

        decorated.call(this, $e, options);
      }

      MaximumSelectionLength.prototype.query = function (decorated, params, callback) {
        var self = this;

        this.current(function (currentData) {
          var count = currentData != null ? currentData.length : 0;
          if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
            self.trigger('results:message', {
              message: 'maximumSelected',
              args: {
                maximum: self.maximumSelectionLength
              }
            });
            return;
          }
          decorated.call(self, params, callback);
        });
      };

      return MaximumSelectionLength;
    });

    S2.define('select2/dropdown', ['jquery', './utils'], function ($, Utils) {
      function Dropdown($element, options) {
        this.$element = $element;
        this.options = options;

        Dropdown.__super__.constructor.call(this);
      }

      Utils.Extend(Dropdown, Utils.Observable);

      Dropdown.prototype.render = function () {
        var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');

        $dropdown.attr('dir', this.options.get('dir'));

        this.$dropdown = $dropdown;

        return $dropdown;
      };

      Dropdown.prototype.bind = function () {
        // Should be implemented in subclasses
      };

      Dropdown.prototype.position = function ($dropdown, $container) {
        // Should be implmented in subclasses
      };

      Dropdown.prototype.destroy = function () {
        // Remove the dropdown from the DOM
        this.$dropdown.remove();
      };

      return Dropdown;
    });

    S2.define('select2/dropdown/search', ['jquery', '../utils'], function ($, Utils) {
      function Search() {}

      Search.prototype.render = function (decorated) {
        var $rendered = decorated.call(this);

        var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" />' + '</span>');

        this.$searchContainer = $search;
        this.$search = $search.find('input');

        $rendered.prepend($search);

        return $rendered;
      };

      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        this.$search.on('keydown', function (evt) {
          self.trigger('keypress', evt);

          self._keyUpPrevented = evt.isDefaultPrevented();
        });

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$search.on('input', function (evt) {
          // Unbind the duplicated `keyup` event
          $(this).off('keyup');
        });

        this.$search.on('keyup input', function (evt) {
          self.handleSearch(evt);
        });

        container.on('open', function () {
          self.$search.attr('tabindex', 0);

          self.$search.focus();

          window.setTimeout(function () {
            self.$search.focus();
          }, 0);
        });

        container.on('close', function () {
          self.$search.attr('tabindex', -1);

          self.$search.val('');
          self.$search.blur();
        });

        container.on('focus', function () {
          if (!container.isOpen()) {
            self.$search.focus();
          }
        });

        container.on('results:all', function (params) {
          if (params.query.term == null || params.query.term === '') {
            var showSearch = self.showSearch(params);

            if (showSearch) {
              self.$searchContainer.removeClass('select2-search--hide');
            } else {
              self.$searchContainer.addClass('select2-search--hide');
            }
          }
        });
      };

      Search.prototype.handleSearch = function (evt) {
        if (!this._keyUpPrevented) {
          var input = this.$search.val();

          this.trigger('query', {
            term: input
          });
        }

        this._keyUpPrevented = false;
      };

      Search.prototype.showSearch = function (_, params) {
        return true;
      };

      return Search;
    });

    S2.define('select2/dropdown/hidePlaceholder', [], function () {
      function HidePlaceholder(decorated, $element, options, dataAdapter) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

        decorated.call(this, $element, options, dataAdapter);
      }

      HidePlaceholder.prototype.append = function (decorated, data) {
        data.results = this.removePlaceholder(data.results);

        decorated.call(this, data);
      };

      HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }

        return placeholder;
      };

      HidePlaceholder.prototype.removePlaceholder = function (_, data) {
        var modifiedData = data.slice(0);

        for (var d = data.length - 1; d >= 0; d--) {
          var item = data[d];

          if (this.placeholder.id === item.id) {
            modifiedData.splice(d, 1);
          }
        }

        return modifiedData;
      };

      return HidePlaceholder;
    });

    S2.define('select2/dropdown/infiniteScroll', ['jquery'], function ($) {
      function InfiniteScroll(decorated, $element, options, dataAdapter) {
        this.lastParams = {};

        decorated.call(this, $element, options, dataAdapter);

        this.$loadingMore = this.createLoadingMore();
        this.loading = false;
      }

      InfiniteScroll.prototype.append = function (decorated, data) {
        this.$loadingMore.remove();
        this.loading = false;

        decorated.call(this, data);

        if (this.showLoadingMore(data)) {
          this.$results.append(this.$loadingMore);
        }
      };

      InfiniteScroll.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('query', function (params) {
          self.lastParams = params;
          self.loading = true;
        });

        container.on('query:append', function (params) {
          self.lastParams = params;
          self.loading = true;
        });

        this.$results.on('scroll', function () {
          var isLoadMoreVisible = $.contains(document.documentElement, self.$loadingMore[0]);

          if (self.loading || !isLoadMoreVisible) {
            return;
          }

          var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
          var loadingMoreOffset = self.$loadingMore.offset().top + self.$loadingMore.outerHeight(false);

          if (currentOffset + 50 >= loadingMoreOffset) {
            self.loadMore();
          }
        });
      };

      InfiniteScroll.prototype.loadMore = function () {
        this.loading = true;

        var params = $.extend({}, { page: 1 }, this.lastParams);

        params.page++;

        this.trigger('query:append', params);
      };

      InfiniteScroll.prototype.showLoadingMore = function (_, data) {
        return data.pagination && data.pagination.more;
      };

      InfiniteScroll.prototype.createLoadingMore = function () {
        var $option = $('<li ' + 'class="select2-results__option select2-results__option--load-more"' + 'role="treeitem" aria-disabled="true"></li>');

        var message = this.options.get('translations').get('loadingMore');

        $option.html(message(this.lastParams));

        return $option;
      };

      return InfiniteScroll;
    });

    S2.define('select2/dropdown/attachBody', ['jquery', '../utils'], function ($, Utils) {
      function AttachBody(decorated, $element, options) {
        this.$dropdownParent = options.get('dropdownParent') || $(document.body);

        decorated.call(this, $element, options);
      }

      AttachBody.prototype.bind = function (decorated, container, $container) {
        var self = this;

        var setupResultsEvents = false;

        decorated.call(this, container, $container);

        container.on('open', function () {
          self._showDropdown();
          self._attachPositioningHandler(container);

          if (!setupResultsEvents) {
            setupResultsEvents = true;

            container.on('results:all', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });

            container.on('results:append', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
          }
        });

        container.on('close', function () {
          self._hideDropdown();
          self._detachPositioningHandler(container);
        });

        this.$dropdownContainer.on('mousedown', function (evt) {
          evt.stopPropagation();
        });
      };

      AttachBody.prototype.destroy = function (decorated) {
        decorated.call(this);

        this.$dropdownContainer.remove();
      };

      AttachBody.prototype.position = function (decorated, $dropdown, $container) {
        // Clone all of the container classes
        $dropdown.attr('class', $container.attr('class'));

        $dropdown.removeClass('select2');
        $dropdown.addClass('select2-container--open');

        $dropdown.css({
          position: 'absolute',
          top: -999999
        });

        this.$container = $container;
      };

      AttachBody.prototype.render = function (decorated) {
        var $container = $('<span></span>');

        var $dropdown = decorated.call(this);
        $container.append($dropdown);

        this.$dropdownContainer = $container;

        return $container;
      };

      AttachBody.prototype._hideDropdown = function (decorated) {
        this.$dropdownContainer.detach();
      };

      AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
        var self = this;

        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;

        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.each(function () {
          Utils.StoreData(this, 'select2-scroll-position', {
            x: $(this).scrollLeft(),
            y: $(this).scrollTop()
          });
        });

        $watchers.on(scrollEvent, function (ev) {
          var position = Utils.GetData(this, 'select2-scroll-position');
          $(this).scrollTop(position.y);
        });

        $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent, function (e) {
          self._positionDropdown();
          self._resizeDropdown();
        });
      };

      AttachBody.prototype._detachPositioningHandler = function (decorated, container) {
        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;

        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.off(scrollEvent);

        $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
      };

      AttachBody.prototype._positionDropdown = function () {
        var $window = $(window);

        var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
        var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

        var newDirection = null;

        var offset = this.$container.offset();

        offset.bottom = offset.top + this.$container.outerHeight(false);

        var container = {
          height: this.$container.outerHeight(false)
        };

        container.top = offset.top;
        container.bottom = offset.top + container.height;

        var dropdown = {
          height: this.$dropdown.outerHeight(false)
        };

        var viewport = {
          top: $window.scrollTop(),
          bottom: $window.scrollTop() + $window.height()
        };

        var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
        var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;

        var css = {
          left: offset.left,
          top: container.bottom
        };

        // Determine what the parent element is to use for calciulating the offset
        var $offsetParent = this.$dropdownParent;

        // For statically positoned elements, we need to get the element
        // that is determining the offset
        if ($offsetParent.css('position') === 'static') {
          $offsetParent = $offsetParent.offsetParent();
        }

        var parentOffset = $offsetParent.offset();

        css.top -= parentOffset.top;
        css.left -= parentOffset.left;

        if (!isCurrentlyAbove && !isCurrentlyBelow) {
          newDirection = 'below';
        }

        if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
          newDirection = 'above';
        } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
          newDirection = 'below';
        }

        if (newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below') {
          css.top = container.top - parentOffset.top - dropdown.height;
        }

        if (newDirection != null) {
          this.$dropdown.removeClass('select2-dropdown--below select2-dropdown--above').addClass('select2-dropdown--' + newDirection);
          this.$container.removeClass('select2-container--below select2-container--above').addClass('select2-container--' + newDirection);
        }

        this.$dropdownContainer.css(css);
      };

      AttachBody.prototype._resizeDropdown = function () {
        var css = {
          width: this.$container.outerWidth(false) + 'px'
        };

        if (this.options.get('dropdownAutoWidth')) {
          css.minWidth = css.width;
          css.position = 'relative';
          css.width = 'auto';
        }

        this.$dropdown.css(css);
      };

      AttachBody.prototype._showDropdown = function (decorated) {
        this.$dropdownContainer.appendTo(this.$dropdownParent);

        this._positionDropdown();
        this._resizeDropdown();
      };

      return AttachBody;
    });

    S2.define('select2/dropdown/minimumResultsForSearch', [], function () {
      function countResults(data) {
        var count = 0;

        for (var d = 0; d < data.length; d++) {
          var item = data[d];

          if (item.children) {
            count += countResults(item.children);
          } else {
            count++;
          }
        }

        return count;
      }

      function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
        this.minimumResultsForSearch = options.get('minimumResultsForSearch');

        if (this.minimumResultsForSearch < 0) {
          this.minimumResultsForSearch = Infinity;
        }

        decorated.call(this, $element, options, dataAdapter);
      }

      MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
        if (countResults(params.data.results) < this.minimumResultsForSearch) {
          return false;
        }

        return decorated.call(this, params);
      };

      return MinimumResultsForSearch;
    });

    S2.define('select2/dropdown/selectOnClose', ['../utils'], function (Utils) {
      function SelectOnClose() {}

      SelectOnClose.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('close', function (params) {
          self._handleSelectOnClose(params);
        });
      };

      SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
        if (params && params.originalSelect2Event != null) {
          var event = params.originalSelect2Event;

          // Don't select an item if the close event was triggered from a select or
          // unselect event
          if (event._type === 'select' || event._type === 'unselect') {
            return;
          }
        }

        var $highlightedResults = this.getHighlightedResults();

        // Only select highlighted results
        if ($highlightedResults.length < 1) {
          return;
        }

        var data = Utils.GetData($highlightedResults[0], 'data');

        // Don't re-select already selected resulte
        if (data.element != null && data.element.selected || data.element == null && data.selected) {
          return;
        }

        this.trigger('select', {
          data: data
        });
      };

      return SelectOnClose;
    });

    S2.define('select2/dropdown/closeOnSelect', [], function () {
      function CloseOnSelect() {}

      CloseOnSelect.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('select', function (evt) {
          self._selectTriggered(evt);
        });

        container.on('unselect', function (evt) {
          self._selectTriggered(evt);
        });
      };

      CloseOnSelect.prototype._selectTriggered = function (_, evt) {
        var originalEvent = evt.originalEvent;

        // Don't close if the control key is being held
        if (originalEvent && originalEvent.ctrlKey) {
          return;
        }

        this.trigger('close', {
          originalEvent: originalEvent,
          originalSelect2Event: evt
        });
      };

      return CloseOnSelect;
    });

    S2.define('select2/i18n/en', [], function () {
      // English
      return {
        errorLoading: function errorLoading() {
          return 'The results could not be loaded.';
        },
        inputTooLong: function inputTooLong(args) {
          var overChars = args.input.length - args.maximum;

          var message = 'Please delete ' + overChars + ' character';

          if (overChars != 1) {
            message += 's';
          }

          return message;
        },
        inputTooShort: function inputTooShort(args) {
          var remainingChars = args.minimum - args.input.length;

          var message = 'Please enter ' + remainingChars + ' or more characters';

          return message;
        },
        loadingMore: function loadingMore() {
          return 'Loading more results…';
        },
        maximumSelected: function maximumSelected(args) {
          var message = 'You can only select ' + args.maximum + ' item';

          if (args.maximum != 1) {
            message += 's';
          }

          return message;
        },
        noResults: function noResults() {
          return 'No results found';
        },
        searching: function searching() {
          return 'Searching…';
        }
      };
    });

    S2.define('select2/defaults', ['jquery', 'require', './results', './selection/single', './selection/multiple', './selection/placeholder', './selection/allowClear', './selection/search', './selection/eventRelay', './utils', './translation', './diacritics', './data/select', './data/array', './data/ajax', './data/tags', './data/tokenizer', './data/minimumInputLength', './data/maximumInputLength', './data/maximumSelectionLength', './dropdown', './dropdown/search', './dropdown/hidePlaceholder', './dropdown/infiniteScroll', './dropdown/attachBody', './dropdown/minimumResultsForSearch', './dropdown/selectOnClose', './dropdown/closeOnSelect', './i18n/en'], function ($, require, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, EnglishTranslation) {
      function Defaults() {
        this.reset();
      }

      Defaults.prototype.apply = function (options) {
        options = $.extend(true, {}, this.defaults, options);

        if (options.dataAdapter == null) {
          if (options.ajax != null) {
            options.dataAdapter = AjaxData;
          } else if (options.data != null) {
            options.dataAdapter = ArrayData;
          } else {
            options.dataAdapter = SelectData;
          }

          if (options.minimumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
          }

          if (options.maximumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
          }

          if (options.maximumSelectionLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
          }

          if (options.tags) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
          }

          if (options.tokenSeparators != null || options.tokenizer != null) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
          }

          if (options.query != null) {
            var Query = require(options.amdBase + 'compat/query');

            options.dataAdapter = Utils.Decorate(options.dataAdapter, Query);
          }

          if (options.initSelection != null) {
            var InitSelection = require(options.amdBase + 'compat/initSelection');

            options.dataAdapter = Utils.Decorate(options.dataAdapter, InitSelection);
          }
        }

        if (options.resultsAdapter == null) {
          options.resultsAdapter = ResultsList;

          if (options.ajax != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
          }

          if (options.placeholder != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
          }

          if (options.selectOnClose) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
          }
        }

        if (options.dropdownAdapter == null) {
          if (options.multiple) {
            options.dropdownAdapter = Dropdown;
          } else {
            var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

            options.dropdownAdapter = SearchableDropdown;
          }

          if (options.minimumResultsForSearch !== 0) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
          }

          if (options.closeOnSelect) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
          }

          if (options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null) {
            var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
          }

          options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
        }

        if (options.selectionAdapter == null) {
          if (options.multiple) {
            options.selectionAdapter = MultipleSelection;
          } else {
            options.selectionAdapter = SingleSelection;
          }

          // Add the placeholder mixin if a placeholder was specified
          if (options.placeholder != null) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
          }

          if (options.allowClear) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
          }

          if (options.multiple) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
          }

          if (options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null) {
            var ContainerCSS = require(options.amdBase + 'compat/containerCss');

            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, ContainerCSS);
          }

          options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
        }

        if (typeof options.language === 'string') {
          // Check if the language is specified with a region
          if (options.language.indexOf('-') > 0) {
            // Extract the region information if it is included
            var languageParts = options.language.split('-');
            var baseLanguage = languageParts[0];

            options.language = [options.language, baseLanguage];
          } else {
            options.language = [options.language];
          }
        }

        if ($.isArray(options.language)) {
          var languages = new Translation();
          options.language.push('en');

          var languageNames = options.language;

          for (var l = 0; l < languageNames.length; l++) {
            var name = languageNames[l];
            var language = {};

            try {
              // Try to load it with the original name
              language = Translation.loadPath(name);
            } catch (e) {
              try {
                // If we couldn't load it, check if it wasn't the full path
                name = this.defaults.amdLanguageBase + name;
                language = Translation.loadPath(name);
              } catch (ex) {
                // The translation could not be loaded at all. Sometimes this is
                // because of a configuration problem, other times this can be
                // because of how Select2 helps load all possible translation files.
                if (options.debug && window.console && console.warn) {
                  console.warn('Select2: The language file for "' + name + '" could not be ' + 'automatically loaded. A fallback will be used instead.');
                }

                continue;
              }
            }

            languages.extend(language);
          }

          options.translations = languages;
        } else {
          var baseTranslation = Translation.loadPath(this.defaults.amdLanguageBase + 'en');
          var customTranslation = new Translation(options.language);

          customTranslation.extend(baseTranslation);

          options.translations = customTranslation;
        }

        return options;
      };

      Defaults.prototype.reset = function () {
        function stripDiacritics(text) {
          // Used 'uni range + named function' from http://jsperf.com/diacritics/18
          function match(a) {
            return DIACRITICS[a] || a;
          }

          return text.replace(/[^\u0000-\u007E]/g, match);
        }

        function matcher(params, data) {
          // Always return the object if there is nothing to compare
          if ($.trim(params.term) === '') {
            return data;
          }

          // Do a recursive check for options with children
          if (data.children && data.children.length > 0) {
            // Clone the data object if there are children
            // This is required as we modify the object to remove any non-matches
            var match = $.extend(true, {}, data);

            // Check each child of the option
            for (var c = data.children.length - 1; c >= 0; c--) {
              var child = data.children[c];

              var matches = matcher(params, child);

              // If there wasn't a match, remove the object in the array
              if (matches == null) {
                match.children.splice(c, 1);
              }
            }

            // If any children matched, return the new object
            if (match.children.length > 0) {
              return match;
            }

            // If there were no matching children, check just the plain object
            return matcher(params, match);
          }

          var original = stripDiacritics(data.text).toUpperCase();
          var term = stripDiacritics(params.term).toUpperCase();

          // Check if the text contains the term
          if (original.indexOf(term) > -1) {
            return data;
          }

          // If it doesn't contain the term, don't return anything
          return null;
        }

        this.defaults = {
          amdBase: './',
          amdLanguageBase: './i18n/',
          closeOnSelect: true,
          debug: false,
          dropdownAutoWidth: false,
          escapeMarkup: Utils.escapeMarkup,
          language: EnglishTranslation,
          matcher: matcher,
          minimumInputLength: 0,
          maximumInputLength: 0,
          maximumSelectionLength: 0,
          minimumResultsForSearch: 0,
          selectOnClose: false,
          sorter: function sorter(data) {
            return data;
          },
          templateResult: function templateResult(result) {
            return result.text;
          },
          templateSelection: function templateSelection(selection) {
            return selection.text;
          },
          theme: 'default',
          width: 'resolve'
        };
      };

      Defaults.prototype.set = function (key, value) {
        var camelKey = $.camelCase(key);

        var data = {};
        data[camelKey] = value;

        var convertedData = Utils._convertData(data);

        $.extend(true, this.defaults, convertedData);
      };

      var defaults = new Defaults();

      return defaults;
    });

    S2.define('select2/options', ['require', 'jquery', './defaults', './utils'], function (require, $, Defaults, Utils) {
      function Options(options, $element) {
        this.options = options;

        if ($element != null) {
          this.fromElement($element);
        }

        this.options = Defaults.apply(this.options);

        if ($element && $element.is('input')) {
          var InputCompat = require(this.get('amdBase') + 'compat/inputData');

          this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter, InputCompat);
        }
      }

      Options.prototype.fromElement = function ($e) {
        var excludedData = ['select2'];

        if (this.options.multiple == null) {
          this.options.multiple = $e.prop('multiple');
        }

        if (this.options.disabled == null) {
          this.options.disabled = $e.prop('disabled');
        }

        if (this.options.language == null) {
          if ($e.prop('lang')) {
            this.options.language = $e.prop('lang').toLowerCase();
          } else if ($e.closest('[lang]').prop('lang')) {
            this.options.language = $e.closest('[lang]').prop('lang');
          }
        }

        if (this.options.dir == null) {
          if ($e.prop('dir')) {
            this.options.dir = $e.prop('dir');
          } else if ($e.closest('[dir]').prop('dir')) {
            this.options.dir = $e.closest('[dir]').prop('dir');
          } else {
            this.options.dir = 'ltr';
          }
        }

        $e.prop('disabled', this.options.disabled);
        $e.prop('multiple', this.options.multiple);

        if (Utils.GetData($e[0], 'select2Tags')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');
          }

          Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
          Utils.StoreData($e[0], 'tags', true);
        }

        if (Utils.GetData($e[0], 'ajaxUrl')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');
          }

          $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
          Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
        }

        var dataset = {};

        // Prefer the element's `dataset` attribute if it exists
        // jQuery 1.x does not correctly handle data attributes with multiple dashes
        if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
          dataset = $.extend(true, {}, $e[0].dataset, Utils.GetData($e[0]));
        } else {
          dataset = Utils.GetData($e[0]);
        }

        var data = $.extend(true, {}, dataset);

        data = Utils._convertData(data);

        for (var key in data) {
          if ($.inArray(key, excludedData) > -1) {
            continue;
          }

          if ($.isPlainObject(this.options[key])) {
            $.extend(this.options[key], data[key]);
          } else {
            this.options[key] = data[key];
          }
        }

        return this;
      };

      Options.prototype.get = function (key) {
        return this.options[key];
      };

      Options.prototype.set = function (key, val) {
        this.options[key] = val;
      };

      return Options;
    });

    S2.define('select2/core', ['jquery', './options', './utils', './keys'], function ($, Options, Utils, KEYS) {
      var Select2 = function Select2($element, options) {
        if (Utils.GetData($element[0], 'select2') != null) {
          Utils.GetData($element[0], 'select2').destroy();
        }

        this.$element = $element;

        this.id = this._generateId($element);

        options = options || {};

        this.options = new Options(options, $element);

        Select2.__super__.constructor.call(this);

        // Set up the tabindex

        var tabindex = $element.attr('tabindex') || 0;
        Utils.StoreData($element[0], 'old-tabindex', tabindex);
        $element.attr('tabindex', '-1');

        // Set up containers and adapters

        var DataAdapter = this.options.get('dataAdapter');
        this.dataAdapter = new DataAdapter($element, this.options);

        var $container = this.render();

        this._placeContainer($container);

        var SelectionAdapter = this.options.get('selectionAdapter');
        this.selection = new SelectionAdapter($element, this.options);
        this.$selection = this.selection.render();

        this.selection.position(this.$selection, $container);

        var DropdownAdapter = this.options.get('dropdownAdapter');
        this.dropdown = new DropdownAdapter($element, this.options);
        this.$dropdown = this.dropdown.render();

        this.dropdown.position(this.$dropdown, $container);

        var ResultsAdapter = this.options.get('resultsAdapter');
        this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
        this.$results = this.results.render();

        this.results.position(this.$results, this.$dropdown);

        // Bind events

        var self = this;

        // Bind the container to all of the adapters
        this._bindAdapters();

        // Register any DOM event handlers
        this._registerDomEvents();

        // Register any internal event handlers
        this._registerDataEvents();
        this._registerSelectionEvents();
        this._registerDropdownEvents();
        this._registerResultsEvents();
        this._registerEvents();

        // Set the initial state
        this.dataAdapter.current(function (initialData) {
          self.trigger('selection:update', {
            data: initialData
          });
        });

        // Hide the original select
        $element.addClass('select2-hidden-accessible');
        $element.attr('aria-hidden', 'true');

        // Synchronize any monitored attributes
        this._syncAttributes();

        Utils.StoreData($element[0], 'select2', this);

        // Ensure backwards compatibility with $element.data('select2').
        $element.data('select2', this);
      };

      Utils.Extend(Select2, Utils.Observable);

      Select2.prototype._generateId = function ($element) {
        var id = '';

        if ($element.attr('id') != null) {
          id = $element.attr('id');
        } else if ($element.attr('name') != null) {
          id = $element.attr('name') + '-' + Utils.generateChars(2);
        } else {
          id = Utils.generateChars(4);
        }

        id = id.replace(/(:|\.|\[|\]|,)/g, '');
        id = 'select2-' + id;

        return id;
      };

      Select2.prototype._placeContainer = function ($container) {
        $container.insertAfter(this.$element);

        var width = this._resolveWidth(this.$element, this.options.get('width'));

        if (width != null) {
          $container.css('width', width);
        }
      };

      Select2.prototype._resolveWidth = function ($element, method) {
        var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

        if (method == 'resolve') {
          var styleWidth = this._resolveWidth($element, 'style');

          if (styleWidth != null) {
            return styleWidth;
          }

          return this._resolveWidth($element, 'element');
        }

        if (method == 'element') {
          var elementWidth = $element.outerWidth(false);

          if (elementWidth <= 0) {
            return 'auto';
          }

          return elementWidth + 'px';
        }

        if (method == 'style') {
          var style = $element.attr('style');

          if (typeof style !== 'string') {
            return null;
          }

          var attrs = style.split(';');

          for (var i = 0, l = attrs.length; i < l; i = i + 1) {
            var attr = attrs[i].replace(/\s/g, '');
            var matches = attr.match(WIDTH);

            if (matches !== null && matches.length >= 1) {
              return matches[1];
            }
          }

          return null;
        }

        return method;
      };

      Select2.prototype._bindAdapters = function () {
        this.dataAdapter.bind(this, this.$container);
        this.selection.bind(this, this.$container);

        this.dropdown.bind(this, this.$container);
        this.results.bind(this, this.$container);
      };

      Select2.prototype._registerDomEvents = function () {
        var self = this;

        this.$element.on('change.select2', function () {
          self.dataAdapter.current(function (data) {
            self.trigger('selection:update', {
              data: data
            });
          });
        });

        this.$element.on('focus.select2', function (evt) {
          self.trigger('focus', evt);
        });

        this._syncA = Utils.bind(this._syncAttributes, this);
        this._syncS = Utils.bind(this._syncSubtree, this);

        if (this.$element[0].attachEvent) {
          this.$element[0].attachEvent('onpropertychange', this._syncA);
        }

        var observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (observer != null) {
          this._observer = new observer(function (mutations) {
            $.each(mutations, self._syncA);
            $.each(mutations, self._syncS);
          });
          this._observer.observe(this.$element[0], {
            attributes: true,
            childList: true,
            subtree: false
          });
        } else if (this.$element[0].addEventListener) {
          this.$element[0].addEventListener('DOMAttrModified', self._syncA, false);
          this.$element[0].addEventListener('DOMNodeInserted', self._syncS, false);
          this.$element[0].addEventListener('DOMNodeRemoved', self._syncS, false);
        }
      };

      Select2.prototype._registerDataEvents = function () {
        var self = this;

        this.dataAdapter.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerSelectionEvents = function () {
        var self = this;
        var nonRelayEvents = ['toggle', 'focus'];

        this.selection.on('toggle', function () {
          self.toggleDropdown();
        });

        this.selection.on('focus', function (params) {
          self.focus(params);
        });

        this.selection.on('*', function (name, params) {
          if ($.inArray(name, nonRelayEvents) !== -1) {
            return;
          }

          self.trigger(name, params);
        });
      };

      Select2.prototype._registerDropdownEvents = function () {
        var self = this;

        this.dropdown.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerResultsEvents = function () {
        var self = this;

        this.results.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerEvents = function () {
        var self = this;

        this.on('open', function () {
          self.$container.addClass('select2-container--open');
        });

        this.on('close', function () {
          self.$container.removeClass('select2-container--open');
        });

        this.on('enable', function () {
          self.$container.removeClass('select2-container--disabled');
        });

        this.on('disable', function () {
          self.$container.addClass('select2-container--disabled');
        });

        this.on('blur', function () {
          self.$container.removeClass('select2-container--focus');
        });

        this.on('query', function (params) {
          if (!self.isOpen()) {
            self.trigger('open', {});
          }

          this.dataAdapter.query(params, function (data) {
            self.trigger('results:all', {
              data: data,
              query: params
            });
          });
        });

        this.on('query:append', function (params) {
          this.dataAdapter.query(params, function (data) {
            self.trigger('results:append', {
              data: data,
              query: params
            });
          });
        });

        this.on('keypress', function (evt) {
          var key = evt.which;

          if (self.isOpen()) {
            if (key === KEYS.ESC || key === KEYS.TAB || key === KEYS.UP && evt.altKey) {
              self.close();

              evt.preventDefault();
            } else if (key === KEYS.ENTER) {
              self.trigger('results:select', {});

              evt.preventDefault();
            } else if (key === KEYS.SPACE && evt.ctrlKey) {
              self.trigger('results:toggle', {});

              evt.preventDefault();
            } else if (key === KEYS.UP) {
              self.trigger('results:previous', {});

              evt.preventDefault();
            } else if (key === KEYS.DOWN) {
              self.trigger('results:next', {});

              evt.preventDefault();
            }
          } else {
            if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
              self.open();

              evt.preventDefault();
            }
          }
        });
      };

      Select2.prototype._syncAttributes = function () {
        this.options.set('disabled', this.$element.prop('disabled'));

        if (this.options.get('disabled')) {
          if (this.isOpen()) {
            this.close();
          }

          this.trigger('disable', {});
        } else {
          this.trigger('enable', {});
        }
      };

      Select2.prototype._syncSubtree = function (evt, mutations) {
        var changed = false;
        var self = this;

        // Ignore any mutation events raised for elements that aren't options or
        // optgroups. This handles the case when the select element is destroyed
        if (evt && evt.target && evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP') {
          return;
        }

        if (!mutations) {
          // If mutation events aren't supported, then we can only assume that the
          // change affected the selections
          changed = true;
        } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
          for (var n = 0; n < mutations.addedNodes.length; n++) {
            var node = mutations.addedNodes[n];

            if (node.selected) {
              changed = true;
            }
          }
        } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
          changed = true;
        }

        // Only re-pull the data if we think there is a change
        if (changed) {
          this.dataAdapter.current(function (currentData) {
            self.trigger('selection:update', {
              data: currentData
            });
          });
        }
      };

      /**
       * Override the trigger method to automatically trigger pre-events when
       * there are events that can be prevented.
       */
      Select2.prototype.trigger = function (name, args) {
        var actualTrigger = Select2.__super__.trigger;
        var preTriggerMap = {
          'open': 'opening',
          'close': 'closing',
          'select': 'selecting',
          'unselect': 'unselecting',
          'clear': 'clearing'
        };

        if (args === undefined) {
          args = {};
        }

        if (name in preTriggerMap) {
          var preTriggerName = preTriggerMap[name];
          var preTriggerArgs = {
            prevented: false,
            name: name,
            args: args
          };

          actualTrigger.call(this, preTriggerName, preTriggerArgs);

          if (preTriggerArgs.prevented) {
            args.prevented = true;

            return;
          }
        }

        actualTrigger.call(this, name, args);
      };

      Select2.prototype.toggleDropdown = function () {
        if (this.options.get('disabled')) {
          return;
        }

        if (this.isOpen()) {
          this.close();
        } else {
          this.open();
        }
      };

      Select2.prototype.open = function () {
        if (this.isOpen()) {
          return;
        }

        this.trigger('query', {});
      };

      Select2.prototype.close = function () {
        if (!this.isOpen()) {
          return;
        }

        this.trigger('close', {});
      };

      Select2.prototype.isOpen = function () {
        return this.$container.hasClass('select2-container--open');
      };

      Select2.prototype.hasFocus = function () {
        return this.$container.hasClass('select2-container--focus');
      };

      Select2.prototype.focus = function (data) {
        // No need to re-trigger focus events if we are already focused
        if (this.hasFocus()) {
          return;
        }

        this.$container.addClass('select2-container--focus');
        this.trigger('focus', {});
      };

      Select2.prototype.enable = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');
        }

        if (args == null || args.length === 0) {
          args = [true];
        }

        var disabled = !args[0];

        this.$element.prop('disabled', disabled);
      };

      Select2.prototype.data = function () {
        if (this.options.get('debug') && arguments.length > 0 && window.console && console.warn) {
          console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');
        }

        var data = [];

        this.dataAdapter.current(function (currentData) {
          data = currentData;
        });

        return data;
      };

      Select2.prototype.val = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');
        }

        if (args == null || args.length === 0) {
          return this.$element.val();
        }

        var newVal = args[0];

        if ($.isArray(newVal)) {
          newVal = $.map(newVal, function (obj) {
            return obj.toString();
          });
        }

        this.$element.val(newVal).trigger('change');
      };

      Select2.prototype.destroy = function () {
        this.$container.remove();

        if (this.$element[0].detachEvent) {
          this.$element[0].detachEvent('onpropertychange', this._syncA);
        }

        if (this._observer != null) {
          this._observer.disconnect();
          this._observer = null;
        } else if (this.$element[0].removeEventListener) {
          this.$element[0].removeEventListener('DOMAttrModified', this._syncA, false);
          this.$element[0].removeEventListener('DOMNodeInserted', this._syncS, false);
          this.$element[0].removeEventListener('DOMNodeRemoved', this._syncS, false);
        }

        this._syncA = null;
        this._syncS = null;

        this.$element.off('.select2');
        this.$element.attr('tabindex', Utils.GetData(this.$element[0], 'old-tabindex'));

        this.$element.removeClass('select2-hidden-accessible');
        this.$element.attr('aria-hidden', 'false');
        Utils.RemoveData(this.$element[0]);
        this.$element.removeData('select2');

        this.dataAdapter.destroy();
        this.selection.destroy();
        this.dropdown.destroy();
        this.results.destroy();

        this.dataAdapter = null;
        this.selection = null;
        this.dropdown = null;
        this.results = null;
      };

      Select2.prototype.render = function () {
        var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');

        $container.attr('dir', this.options.get('dir'));

        this.$container = $container;

        this.$container.addClass('select2-container--' + this.options.get('theme'));

        Utils.StoreData($container[0], 'element', this.$element);

        return $container;
      };

      return Select2;
    });

    S2.define('select2/compat/utils', ['jquery'], function ($) {
      function syncCssClasses($dest, $src, adapter) {
        var classes,
            replacements = [],
            adapted;

        classes = $.trim($dest.attr('class'));

        if (classes) {
          classes = '' + classes; // for IE which returns object

          $(classes.split(/\s+/)).each(function () {
            // Save all Select2 classes
            if (this.indexOf('select2-') === 0) {
              replacements.push(this);
            }
          });
        }

        classes = $.trim($src.attr('class'));

        if (classes) {
          classes = '' + classes; // for IE which returns object

          $(classes.split(/\s+/)).each(function () {
            // Only adapt non-Select2 classes
            if (this.indexOf('select2-') !== 0) {
              adapted = adapter(this);

              if (adapted != null) {
                replacements.push(adapted);
              }
            }
          });
        }

        $dest.attr('class', replacements.join(' '));
      }

      return {
        syncCssClasses: syncCssClasses
      };
    });

    S2.define('select2/compat/containerCss', ['jquery', './utils'], function ($, CompatUtils) {
      // No-op CSS adapter that discards all classes by default
      function _containerAdapter(clazz) {
        return null;
      }

      function ContainerCSS() {}

      ContainerCSS.prototype.render = function (decorated) {
        var $container = decorated.call(this);

        var containerCssClass = this.options.get('containerCssClass') || '';

        if ($.isFunction(containerCssClass)) {
          containerCssClass = containerCssClass(this.$element);
        }

        var containerCssAdapter = this.options.get('adaptContainerCssClass');
        containerCssAdapter = containerCssAdapter || _containerAdapter;

        if (containerCssClass.indexOf(':all:') !== -1) {
          containerCssClass = containerCssClass.replace(':all:', '');

          var _cssAdapter = containerCssAdapter;

          containerCssAdapter = function containerCssAdapter(clazz) {
            var adapted = _cssAdapter(clazz);

            if (adapted != null) {
              // Append the old one along with the adapted one
              return adapted + ' ' + clazz;
            }

            return clazz;
          };
        }

        var containerCss = this.options.get('containerCss') || {};

        if ($.isFunction(containerCss)) {
          containerCss = containerCss(this.$element);
        }

        CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

        $container.css(containerCss);
        $container.addClass(containerCssClass);

        return $container;
      };

      return ContainerCSS;
    });

    S2.define('select2/compat/dropdownCss', ['jquery', './utils'], function ($, CompatUtils) {
      // No-op CSS adapter that discards all classes by default
      function _dropdownAdapter(clazz) {
        return null;
      }

      function DropdownCSS() {}

      DropdownCSS.prototype.render = function (decorated) {
        var $dropdown = decorated.call(this);

        var dropdownCssClass = this.options.get('dropdownCssClass') || '';

        if ($.isFunction(dropdownCssClass)) {
          dropdownCssClass = dropdownCssClass(this.$element);
        }

        var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
        dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

        if (dropdownCssClass.indexOf(':all:') !== -1) {
          dropdownCssClass = dropdownCssClass.replace(':all:', '');

          var _cssAdapter = dropdownCssAdapter;

          dropdownCssAdapter = function dropdownCssAdapter(clazz) {
            var adapted = _cssAdapter(clazz);

            if (adapted != null) {
              // Append the old one along with the adapted one
              return adapted + ' ' + clazz;
            }

            return clazz;
          };
        }

        var dropdownCss = this.options.get('dropdownCss') || {};

        if ($.isFunction(dropdownCss)) {
          dropdownCss = dropdownCss(this.$element);
        }

        CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

        $dropdown.css(dropdownCss);
        $dropdown.addClass(dropdownCssClass);

        return $dropdown;
      };

      return DropdownCSS;
    });

    S2.define('select2/compat/initSelection', ['jquery'], function ($) {
      function InitSelection(decorated, $element, options) {
        if (options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `initSelection` option has been deprecated in favor' + ' of a custom data adapter that overrides the `current` method. ' + 'This method is now called multiple times instead of a single ' + 'time when the instance is initialized. Support will be removed ' + 'for the `initSelection` option in future versions of Select2');
        }

        this.initSelection = options.get('initSelection');
        this._isInitialized = false;

        decorated.call(this, $element, options);
      }

      InitSelection.prototype.current = function (decorated, callback) {
        var self = this;

        if (this._isInitialized) {
          decorated.call(this, callback);

          return;
        }

        this.initSelection.call(null, this.$element, function (data) {
          self._isInitialized = true;

          if (!$.isArray(data)) {
            data = [data];
          }

          callback(data);
        });
      };

      return InitSelection;
    });

    S2.define('select2/compat/inputData', ['jquery', '../utils'], function ($, Utils) {
      function InputData(decorated, $element, options) {
        this._currentData = [];
        this._valueSeparator = options.get('valueSeparator') || ',';

        if ($element.prop('type') === 'hidden') {
          if (options.get('debug') && console && console.warn) {
            console.warn('Select2: Using a hidden input with Select2 is no longer ' + 'supported and may stop working in the future. It is recommended ' + 'to use a `<select>` element instead.');
          }
        }

        decorated.call(this, $element, options);
      }

      InputData.prototype.current = function (_, callback) {
        function getSelected(data, selectedIds) {
          var selected = [];

          if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
            data.selected = true;
            selected.push(data);
          } else {
            data.selected = false;
          }

          if (data.children) {
            selected.push.apply(selected, getSelected(data.children, selectedIds));
          }

          return selected;
        }

        var selected = [];

        for (var d = 0; d < this._currentData.length; d++) {
          var data = this._currentData[d];

          selected.push.apply(selected, getSelected(data, this.$element.val().split(this._valueSeparator)));
        }

        callback(selected);
      };

      InputData.prototype.select = function (_, data) {
        if (!this.options.get('multiple')) {
          this.current(function (allData) {
            $.map(allData, function (data) {
              data.selected = false;
            });
          });

          this.$element.val(data.id);
          this.$element.trigger('change');
        } else {
          var value = this.$element.val();
          value += this._valueSeparator + data.id;

          this.$element.val(value);
          this.$element.trigger('change');
        }
      };

      InputData.prototype.unselect = function (_, data) {
        var self = this;

        data.selected = false;

        this.current(function (allData) {
          var values = [];

          for (var d = 0; d < allData.length; d++) {
            var item = allData[d];

            if (data.id == item.id) {
              continue;
            }

            values.push(item.id);
          }

          self.$element.val(values.join(self._valueSeparator));
          self.$element.trigger('change');
        });
      };

      InputData.prototype.query = function (_, params, callback) {
        var results = [];

        for (var d = 0; d < this._currentData.length; d++) {
          var data = this._currentData[d];

          var matches = this.matches(params, data);

          if (matches !== null) {
            results.push(matches);
          }
        }

        callback({
          results: results
        });
      };

      InputData.prototype.addOptions = function (_, $options) {
        var options = $.map($options, function ($option) {
          return Utils.GetData($option[0], 'data');
        });

        this._currentData.push.apply(this._currentData, options);
      };

      return InputData;
    });

    S2.define('select2/compat/matcher', ['jquery'], function ($) {
      function oldMatcher(matcher) {
        function wrappedMatcher(params, data) {
          var match = $.extend(true, {}, data);

          if (params.term == null || $.trim(params.term) === '') {
            return match;
          }

          if (data.children) {
            for (var c = data.children.length - 1; c >= 0; c--) {
              var child = data.children[c];

              // Check if the child object matches
              // The old matcher returned a boolean true or false
              var doesMatch = matcher(params.term, child.text, child);

              // If the child didn't match, pop it off
              if (!doesMatch) {
                match.children.splice(c, 1);
              }
            }

            if (match.children.length > 0) {
              return match;
            }
          }

          if (matcher(params.term, data.text, data)) {
            return match;
          }

          return null;
        }

        return wrappedMatcher;
      }

      return oldMatcher;
    });

    S2.define('select2/compat/query', [], function () {
      function Query(decorated, $element, options) {
        if (options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `query` option has been deprecated in favor of a ' + 'custom data adapter that overrides the `query` method. Support ' + 'will be removed for the `query` option in future versions of ' + 'Select2.');
        }

        decorated.call(this, $element, options);
      }

      Query.prototype.query = function (_, params, callback) {
        params.callback = callback;

        var query = this.options.get('query');

        query.call(null, params);
      };

      return Query;
    });

    S2.define('select2/dropdown/attachContainer', [], function () {
      function AttachContainer(decorated, $element, options) {
        decorated.call(this, $element, options);
      }

      AttachContainer.prototype.position = function (decorated, $dropdown, $container) {
        var $dropdownContainer = $container.find('.dropdown-wrapper');
        $dropdownContainer.append($dropdown);

        $dropdown.addClass('select2-dropdown--below');
        $container.addClass('select2-container--below');
      };

      return AttachContainer;
    });

    S2.define('select2/dropdown/stopPropagation', [], function () {
      function StopPropagation() {}

      StopPropagation.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);

        var stoppedEvents = ['blur', 'change', 'click', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'search', 'touchend', 'touchstart'];

        this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
          evt.stopPropagation();
        });
      };

      return StopPropagation;
    });

    S2.define('select2/selection/stopPropagation', [], function () {
      function StopPropagation() {}

      StopPropagation.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);

        var stoppedEvents = ['blur', 'change', 'click', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup', 'search', 'touchend', 'touchstart'];

        this.$selection.on(stoppedEvents.join(' '), function (evt) {
          evt.stopPropagation();
        });
      };

      return StopPropagation;
    });

    /*!
     * jQuery Mousewheel 3.1.13
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     */

    (function (factory) {
      if (typeof S2.define === 'function' && S2.define.amd) {
        // AMD. Register as an anonymous module.
        S2.define('jquery-mousewheel', ['jquery'], factory);
      } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
      } else {
        // Browser globals
        factory(jQuery);
      }
    })(function ($) {

      var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
          toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
          slice = Array.prototype.slice,
          nullLowestDeltaTimeout,
          lowestDelta;

      if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
          $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
      }

      var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function setup() {
          if (this.addEventListener) {
            for (var i = toBind.length; i;) {
              this.addEventListener(toBind[--i], handler, false);
            }
          } else {
            this.onmousewheel = handler;
          }
          // Store the line height and page height for this particular element
          $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
          $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function teardown() {
          if (this.removeEventListener) {
            for (var i = toBind.length; i;) {
              this.removeEventListener(toBind[--i], handler, false);
            }
          } else {
            this.onmousewheel = null;
          }
          // Clean up the data we added to the element
          $.removeData(this, 'mousewheel-line-height');
          $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function getLineHeight(elem) {
          var $elem = $(elem),
              $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
          if (!$parent.length) {
            $parent = $('body');
          }
          return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function getPageHeight(elem) {
          return $(elem).height();
        },

        settings: {
          adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
          normalizeOffset: true // calls getBoundingClientRect for each event
        }
      };

      $.fn.extend({
        mousewheel: function mousewheel(fn) {
          return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function unmousewheel(fn) {
          return this.unbind('mousewheel', fn);
        }
      });

      function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail' in orgEvent) {
          deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta' in orgEvent) {
          deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
          deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
          deltaX = orgEvent.wheelDeltaX * -1;
        }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
          deltaX = deltaY * -1;
          deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
          deltaY = orgEvent.deltaY * -1;
          delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
          deltaX = orgEvent.deltaX;
          if (deltaY === 0) {
            delta = deltaX * -1;
          }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) {
          return;
        }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
          var lineHeight = $.data(this, 'mousewheel-line-height');
          delta *= lineHeight;
          deltaY *= lineHeight;
          deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
          var pageHeight = $.data(this, 'mousewheel-page-height');
          delta *= pageHeight;
          deltaY *= pageHeight;
          deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
          lowestDelta = absDelta;

          // Adjust older deltas if necessary
          if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            lowestDelta /= 40;
          }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
          // Divide all the things by 40!
          delta /= 40;
          deltaX /= 40;
          deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
          var boundingRect = this.getBoundingClientRect();
          offsetX = event.clientX - boundingRect.left;
          offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) {
          clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
      }

      function nullLowestDelta() {
        lowestDelta = null;
      }

      function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
      }
    });

    S2.define('jquery.select2', ['jquery', 'jquery-mousewheel', './select2/core', './select2/defaults', './select2/utils'], function ($, _, Select2, Defaults, Utils) {
      if ($.fn.select2 == null) {
        // All methods that should return the element
        var thisMethods = ['open', 'close', 'destroy'];

        $.fn.select2 = function (options) {
          options = options || {};

          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            this.each(function () {
              var instanceOptions = $.extend(true, {}, options);

              var instance = new Select2($(this), instanceOptions);
            });

            return this;
          } else if (typeof options === 'string') {
            var ret;
            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function () {
              var instance = Utils.GetData(this, 'select2');

              if (instance == null && window.console && console.error) {
                console.error('The select2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');
              }

              ret = instance[options].apply(instance, args);
            });

            // Check if we should be returning `this`
            if ($.inArray(options, thisMethods) > -1) {
              return this;
            }

            return ret;
          } else {
            throw new Error('Invalid arguments for Select2: ' + options);
          }
        };
      }

      if ($.fn.select2.defaults == null) {
        $.fn.select2.defaults = Defaults;
      }

      return Select2;
    });

    // Return the AMD loader configuration so it can be used outside of this file
    return {
      define: S2.define,
      require: S2.require
    };
  }();

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

"object" == (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) && function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : e.Plyr = t();
}(this, function () {
  "use strict";
  function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }function n(e, n, i) {
    return n && t(e.prototype, n), i && t(e, i), e;
  }function i(e, t, n) {
    return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
  }function a(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      var n = [],
          i = !0,
          a = !1,
          s = void 0;try {
        for (var o, r = e[Symbol.iterator](); !(i = (o = r.next()).done) && (n.push(o.value), !t || n.length !== t); i = !0) {}
      } catch (e) {
        a = !0, s = e;
      } finally {
        try {
          i || null == r.return || r.return();
        } finally {
          if (a) throw s;
        }
      }return n;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }function s(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = new Array(e.length); t < e.length; t++) {
          n[t] = e[t];
        }return n;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }var o = { addCSS: !0, thumbWidth: 15, watch: !0 };var r = function r(e) {
    return null != e ? e.constructor : null;
  },
      l = function l(e, t) {
    return Boolean(e && t && e instanceof t);
  },
      c = function c(e) {
    return null == e;
  },
      u = function u(e) {
    return r(e) === Object;
  },
      d = function d(e) {
    return r(e) === String;
  },
      h = function h(e) {
    return Array.isArray(e);
  },
      m = function m(e) {
    return l(e, NodeList);
  },
      p = { nullOrUndefined: c, object: u, number: function number(e) {
      return r(e) === Number && !Number.isNaN(e);
    }, string: d, boolean: function boolean(e) {
      return r(e) === Boolean;
    }, function: function _function(e) {
      return r(e) === Function;
    }, array: h, nodeList: m, element: function element(e) {
      return l(e, Element);
    }, event: function event(e) {
      return l(e, Event);
    }, empty: function empty(e) {
      return c(e) || (d(e) || h(e) || m(e)) && !e.length || u(e) && !Object.keys(e).length;
    } };function f(e, t) {
    if (t < 1) {
      var n = (i = "".concat(t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)) ? Math.max(0, (i[1] ? i[1].length : 0) - (i[2] ? +i[2] : 0)) : 0;return parseFloat(e.toFixed(n));
    }var i;return Math.round(e / t) * t;
  }var g = function () {
    function t(n, i) {
      e(this, t), p.element(n) ? this.element = n : p.string(n) && (this.element = document.querySelector(n)), p.element(this.element) && p.empty(this.element.rangeTouch) && (this.config = Object.assign({}, o, i), this.init());
    }return n(t, [{ key: "init", value: function value() {
        t.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
      } }, { key: "destroy", value: function value() {
        t.enabled && (this.listeners(!1), this.element.rangeTouch = null);
      } }, { key: "listeners", value: function value(e) {
        var t = this,
            n = e ? "addEventListener" : "removeEventListener";["touchstart", "touchmove", "touchend"].forEach(function (e) {
          t.element[n](e, function (e) {
            return t.set(e);
          }, !1);
        });
      } }, { key: "get", value: function value(e) {
        if (!t.enabled || !p.event(e)) return null;var n,
            i = e.target,
            a = e.changedTouches[0],
            s = parseFloat(i.getAttribute("min")) || 0,
            o = parseFloat(i.getAttribute("max")) || 100,
            r = parseFloat(i.getAttribute("step")) || 1,
            l = o - s,
            c = i.getBoundingClientRect(),
            u = 100 / c.width * (this.config.thumbWidth / 2) / 100;return (n = 100 / c.width * (a.clientX - c.left)) < 0 ? n = 0 : n > 100 && (n = 100), n < 50 ? n -= (100 - 2 * n) * u : n > 50 && (n += 2 * (n - 50) * u), s + f(l * (n / 100), r);
      } }, { key: "set", value: function value(e) {
        t.enabled && p.event(e) && !e.target.disabled && (e.preventDefault(), e.target.value = this.get(e), function (e, t) {
          if (e && t) {
            var n = new Event(t);e.dispatchEvent(n);
          }
        }(e.target, "touchend" === e.type ? "change" : "input"));
      } }], [{ key: "setup", value: function value(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = null;if (p.empty(e) || p.string(e) ? i = Array.from(document.querySelectorAll(p.string(e) ? e : 'input[type="range"]')) : p.element(e) ? i = [e] : p.nodeList(e) ? i = Array.from(e) : p.array(e) && (i = e.filter(p.element)), p.empty(i)) return null;var a = Object.assign({}, o, n);p.string(e) && a.watch && new MutationObserver(function (n) {
          Array.from(n).forEach(function (n) {
            Array.from(n.addedNodes).forEach(function (n) {
              if (p.element(n) && function () {
                return Array.from(document.querySelectorAll(i)).includes(this);
              }.call(n, i = e)) {
                var i;new t(n, a);
              }
            });
          });
        }).observe(document.body, { childList: !0, subtree: !0 });return i.map(function (e) {
          return new t(e, n);
        });
      } }, { key: "enabled", get: function get() {
        return "ontouchstart" in document.documentElement;
      } }]), t;
  }(),
      y = function y(e) {
    return null != e ? e.constructor : null;
  },
      v = function v(e, t) {
    return Boolean(e && t && e instanceof t);
  },
      b = function b(e) {
    return null == e;
  },
      k = function k(e) {
    return y(e) === Object;
  },
      w = function w(e) {
    return y(e) === String;
  },
      T = function T(e) {
    return Array.isArray(e);
  },
      C = function C(e) {
    return v(e, NodeList);
  },
      A = function A(e) {
    return b(e) || (w(e) || T(e) || C(e)) && !e.length || k(e) && !Object.keys(e).length;
  },
      E = { nullOrUndefined: b, object: k, number: function number(e) {
      return y(e) === Number && !Number.isNaN(e);
    }, string: w, boolean: function boolean(e) {
      return y(e) === Boolean;
    }, function: function _function(e) {
      return y(e) === Function;
    }, array: T, weakMap: function weakMap(e) {
      return v(e, WeakMap);
    }, nodeList: C, element: function element(e) {
      return v(e, Element);
    }, textNode: function textNode(e) {
      return y(e) === Text;
    }, event: function event(e) {
      return v(e, Event);
    }, keyboardEvent: function keyboardEvent(e) {
      return v(e, KeyboardEvent);
    }, cue: function cue(e) {
      return v(e, window.TextTrackCue) || v(e, window.VTTCue);
    }, track: function track(e) {
      return v(e, TextTrack) || !b(e) && w(e.kind);
    }, promise: function promise(e) {
      return v(e, Promise);
    }, url: function url(e) {
      if (v(e, window.URL)) return !0;if (!w(e)) return !1;var t = e;e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));try {
        return !A(new URL(t).hostname);
      } catch (e) {
        return !1;
      }
    }, empty: A },
      S = function () {
    var e = !1;try {
      var t = Object.defineProperty({}, "passive", { get: function get() {
          return e = !0, null;
        } });window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
    } catch (e) {}return e;
  }();function P(e, t, n) {
    var i = this,
        a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        s = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
        o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];if (e && "addEventListener" in e && !E.empty(t) && E.function(n)) {
      var r = t.split(" "),
          l = o;S && (l = { passive: s, capture: o }), r.forEach(function (t) {
        i && i.eventListeners && a && i.eventListeners.push({ element: e, type: t, callback: n, options: l }), e[a ? "addEventListener" : "removeEventListener"](t, n, l);
      });
    }
  }function N(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 ? arguments[2] : void 0,
        i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];P.call(this, e, t, n, !0, i, a);
  }function M(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 ? arguments[2] : void 0,
        i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];P.call(this, e, t, n, !1, i, a);
  }function x(e) {
    var t = this,
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        i = arguments.length > 2 ? arguments[2] : void 0,
        a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];P.call(this, e, n, function o() {
      M(e, n, o, a, s);for (var r = arguments.length, l = new Array(r), c = 0; c < r; c++) {
        l[c] = arguments[c];
      }i.apply(t, l);
    }, !0, a, s);
  }function I(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};if (E.element(e) && !E.empty(t)) {
      var a = new CustomEvent(t, { bubbles: n, detail: Object.assign({}, i, { plyr: this }) });e.dispatchEvent(a);
    }
  }function L(e, t) {
    var n = e.length ? e : [e];Array.from(n).reverse().forEach(function (e, n) {
      var i = n > 0 ? t.cloneNode(!0) : t,
          a = e.parentNode,
          s = e.nextSibling;i.appendChild(e), s ? a.insertBefore(i, s) : a.appendChild(i);
    });
  }function _(e, t) {
    E.element(e) && !E.empty(t) && Object.entries(t).filter(function (e) {
      var t = a(e, 2)[1];return !E.nullOrUndefined(t);
    }).forEach(function (t) {
      var n = a(t, 2),
          i = n[0],
          s = n[1];return e.setAttribute(i, s);
    });
  }function O(e, t, n) {
    var i = document.createElement(e);return E.object(t) && _(i, t), E.string(n) && (i.innerText = n), i;
  }function j(e, t, n, i) {
    E.element(t) && t.appendChild(O(e, n, i));
  }function q(e) {
    E.nodeList(e) || E.array(e) ? Array.from(e).forEach(q) : E.element(e) && E.element(e.parentNode) && e.parentNode.removeChild(e);
  }function D(e) {
    if (E.element(e)) for (var t = e.childNodes.length; t > 0;) {
      e.removeChild(e.lastChild), t -= 1;
    }
  }function F(e, t) {
    return E.element(t) && E.element(t.parentNode) && E.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
  }function H(e, t) {
    if (!E.string(e) || E.empty(e)) return {};var n = {},
        i = t;return e.split(",").forEach(function (e) {
      var t = e.trim(),
          a = t.replace(".", ""),
          s = t.replace(/[[\]]/g, "").split("="),
          o = s[0],
          r = s.length > 1 ? s[1].replace(/["']/g, "") : "";switch (t.charAt(0)) {case ".":
          E.object(i) && E.string(i.class) && (i.class += " ".concat(a)), n.class = a;break;case "#":
          n.id = t.replace("#", "");break;case "[":
          n[o] = r;}
    }), n;
  }function R(e, t) {
    if (E.element(e)) {
      var n = t;E.boolean(n) || (n = !e.hidden), n ? e.setAttribute("hidden", "") : e.removeAttribute("hidden");
    }
  }function B(e, t, n) {
    if (E.nodeList(e)) return Array.from(e).map(function (e) {
      return B(e, t, n);
    });if (E.element(e)) {
      var i = "toggle";return void 0 !== n && (i = n ? "add" : "remove"), e.classList[i](t), e.classList.contains(t);
    }return !1;
  }function V(e, t) {
    return E.element(e) && e.classList.contains(t);
  }function U(e, t) {
    return function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }.call(e, t);
  }function z(e) {
    return this.elements.container.querySelectorAll(e);
  }function W(e) {
    return this.elements.container.querySelector(e);
  }function K() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];E.element(e) && (e.focus({ preventScroll: !0 }), t && B(e, this.config.classNames.tabFocus));
  }var Y,
      Q,
      X,
      J = (Y = document.createElement("span"), Q = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }, X = Object.keys(Q).find(function (e) {
    return void 0 !== Y.style[e];
  }), !!E.string(X) && Q[X]);function $(e) {
    setTimeout(function () {
      try {
        R(e, !0), e.offsetHeight, R(e, !1);
      } catch (e) {}
    }, 0);
  }var G,
      Z = { isIE: !!document.documentMode, isEdge: window.navigator.userAgent.includes("Edge"), isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent), isIPhone: /(iPhone|iPod)/gi.test(navigator.platform), isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform) },
      ee = { "audio/ogg": "vorbis", "audio/wav": "1", "video/webm": "vp8, vorbis", "video/mp4": "avc1.42E01E, mp4a.40.2", "video/ogg": "theora" },
      te = { audio: "canPlayType" in document.createElement("audio"), video: "canPlayType" in document.createElement("video"), check: function check(e, t, n) {
      var i = Z.isIPhone && n && te.playsinline,
          a = te[e] || "html5" !== t;return { api: a, ui: a && te.rangeInput && ("video" !== e || !Z.isIPhone || i) };
    }, pip: !(Z.isIPhone || !E.function(O("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || O("video").disablePictureInPicture)), airplay: E.function(window.WebKitPlaybackTargetAvailabilityEvent), playsinline: "playsInline" in document.createElement("video"), mime: function mime(e) {
      if (E.empty(e)) return !1;var t = a(e.split("/"), 1)[0],
          n = e;if (!this.isHTML5 || t !== this.type) return !1;Object.keys(ee).includes(n) && (n += '; codecs="'.concat(ee[e], '"'));try {
        return Boolean(n && this.media.canPlayType(n).replace(/no/, ""));
      } catch (e) {
        return !1;
      }
    }, textTracks: "textTracks" in document.createElement("video"), rangeInput: (G = document.createElement("input"), G.type = "range", "range" === G.type), touch: "ontouchstart" in document.documentElement, transitions: !1 !== J, reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches },
      ne = { getSources: function getSources() {
      var e = this;return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(function (t) {
        var n = t.getAttribute("type");return !!E.empty(n) || te.mime.call(e, n);
      }) : [];
    }, getQualityOptions: function getQualityOptions() {
      return ne.getSources.call(this).map(function (e) {
        return Number(e.getAttribute("size"));
      }).filter(Boolean);
    }, extend: function extend() {
      if (this.isHTML5) {
        var e = this;Object.defineProperty(e.media, "quality", { get: function get() {
            var t = ne.getSources.call(e).find(function (t) {
              return t.getAttribute("src") === e.source;
            });return t && Number(t.getAttribute("size"));
          }, set: function set(t) {
            var n = ne.getSources.call(e).find(function (e) {
              return Number(e.getAttribute("size")) === t;
            });if (n) {
              var i = e.media,
                  a = i.currentTime,
                  s = i.paused,
                  o = i.preload,
                  r = i.readyState;e.media.src = n.getAttribute("src"), ("none" !== o || r) && (e.once("loadedmetadata", function () {
                e.currentTime = a, s || e.play();
              }), e.media.load()), I.call(e, e.media, "qualitychange", !1, { quality: t });
            }
          } });
      }
    }, cancelRequests: function cancelRequests() {
      this.isHTML5 && (q(ne.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
    } };function ie(e) {
    return E.array(e) ? e.filter(function (t, n) {
      return e.indexOf(t) === n;
    }) : e;
  }function ae(e, t) {
    return t.split(".").reduce(function (e, t) {
      return e && e[t];
    }, e);
  }function se() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) {
      n[a - 1] = arguments[a];
    }if (!n.length) return e;var s = n.shift();return E.object(s) ? (Object.keys(s).forEach(function (t) {
      E.object(s[t]) ? (Object.keys(e).includes(t) || Object.assign(e, i({}, t, {})), se(e[t], s[t])) : Object.assign(e, i({}, t, s[t]));
    }), se.apply(void 0, [e].concat(n))) : e;
  }function oe(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {
      n[i - 1] = arguments[i];
    }return E.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function (e, t) {
      return n[t].toString();
    });
  }function re() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"), "g"), n.toString());
  }function le() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/\w\S*/g, function (e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
    });
  }function ce() {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();return (e = function () {
      var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();return e = re(e, "-", " "), e = re(e, "_", " "), re(e = le(e), " ", "");
    }(e)).charAt(0).toLowerCase() + e.slice(1);
  }function ue(e) {
    var t = document.createElement("div");return t.appendChild(e), t.innerHTML;
  }var de = { pip: "PIP", airplay: "AirPlay", html5: "HTML5", vimeo: "Vimeo", youtube: "YouTube" },
      he = function he() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};if (E.empty(e) || E.empty(t)) return "";var n = ae(t.i18n, e);if (E.empty(n)) return Object.keys(de).includes(e) ? de[e] : "";var i = { "{seektime}": t.seekTime, "{title}": t.title };return Object.entries(i).forEach(function (e) {
      var t = a(e, 2),
          i = t[0],
          s = t[1];n = re(n, i, s);
    }), n;
  },
      me = function () {
    function t(n) {
      e(this, t), this.enabled = n.config.storage.enabled, this.key = n.config.storage.key;
    }return n(t, [{ key: "get", value: function value(e) {
        if (!t.supported || !this.enabled) return null;var n = window.localStorage.getItem(this.key);if (E.empty(n)) return null;var i = JSON.parse(n);return E.string(e) && e.length ? i[e] : i;
      } }, { key: "set", value: function value(e) {
        if (t.supported && this.enabled && E.object(e)) {
          var n = this.get();E.empty(n) && (n = {}), se(n, e), window.localStorage.setItem(this.key, JSON.stringify(n));
        }
      } }], [{ key: "supported", get: function get() {
        try {
          if (!("localStorage" in window)) return !1;return window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0;
        } catch (e) {
          return !1;
        }
      } }]), t;
  }();function pe(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";return new Promise(function (n, i) {
      try {
        var a = new XMLHttpRequest();if (!("withCredentials" in a)) return;a.addEventListener("load", function () {
          if ("text" === t) try {
            n(JSON.parse(a.responseText));
          } catch (e) {
            n(a.responseText);
          } else n(a.response);
        }), a.addEventListener("error", function () {
          throw new Error(a.status);
        }), a.open("GET", e, !0), a.responseType = t, a.send();
      } catch (e) {
        i(e);
      }
    });
  }function fe(e, t) {
    if (E.string(e)) {
      var n = E.string(t),
          i = function i() {
        return null !== document.getElementById(t);
      },
          a = function a(e, t) {
        e.innerHTML = t, n && i() || document.body.insertAdjacentElement("afterbegin", e);
      };if (!n || !i()) {
        var s = me.supported,
            o = document.createElement("div");if (o.setAttribute("hidden", ""), n && o.setAttribute("id", t), s) {
          var r = window.localStorage.getItem("".concat("cache", "-").concat(t));if (null !== r) {
            var l = JSON.parse(r);a(o, l.content);
          }
        }pe(e).then(function (e) {
          E.empty(e) || (s && window.localStorage.setItem("".concat("cache", "-").concat(t), JSON.stringify({ content: e })), a(o, e));
        }).catch(function () {});
      }
    }
  }var ge = function ge(e) {
    return Math.trunc(e / 60 / 60 % 60, 10);
  },
      ye = function ye(e) {
    return Math.trunc(e / 60 % 60, 10);
  },
      ve = function ve(e) {
    return Math.trunc(e % 60, 10);
  };function be() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];if (!E.number(e)) return be(null, t, n);var i = function i(e) {
      return "0".concat(e).slice(-2);
    },
        a = ge(e),
        s = ye(e),
        o = ve(e);return a = t || a > 0 ? "".concat(a, ":") : "", "".concat(n && e > 0 ? "-" : "").concat(a).concat(i(s), ":").concat(i(o));
  }var ke = { getIconUrl: function getIconUrl() {
      var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || Z.isIE && !window.svg4everybody;return { url: this.config.iconUrl, cors: e };
    }, findElements: function findElements() {
      try {
        return this.elements.controls = W.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = { play: z.call(this, this.config.selectors.buttons.play), pause: W.call(this, this.config.selectors.buttons.pause), restart: W.call(this, this.config.selectors.buttons.restart), rewind: W.call(this, this.config.selectors.buttons.rewind), fastForward: W.call(this, this.config.selectors.buttons.fastForward), mute: W.call(this, this.config.selectors.buttons.mute), pip: W.call(this, this.config.selectors.buttons.pip), airplay: W.call(this, this.config.selectors.buttons.airplay), settings: W.call(this, this.config.selectors.buttons.settings), captions: W.call(this, this.config.selectors.buttons.captions), fullscreen: W.call(this, this.config.selectors.buttons.fullscreen) }, this.elements.progress = W.call(this, this.config.selectors.progress), this.elements.inputs = { seek: W.call(this, this.config.selectors.inputs.seek), volume: W.call(this, this.config.selectors.inputs.volume) }, this.elements.display = { buffer: W.call(this, this.config.selectors.display.buffer), currentTime: W.call(this, this.config.selectors.display.currentTime), duration: W.call(this, this.config.selectors.display.duration) }, E.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0;
      } catch (e) {
        return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
      }
    }, createIcon: function createIcon(e, t) {
      var n = ke.getIconUrl.call(this),
          i = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix),
          a = document.createElementNS("http://www.w3.org/2000/svg", "svg");_(a, se(t, { role: "presentation", focusable: "false" }));var s = document.createElementNS("http://www.w3.org/2000/svg", "use"),
          o = "".concat(i, "-").concat(e);return "href" in s && s.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), s.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), a.appendChild(s), a;
    }, createLabel: function createLabel(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = he(e, this.config);return O("span", Object.assign({}, t, { class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ") }), n);
    }, createBadge: function createBadge(e) {
      if (E.empty(e)) return null;var t = O("span", { class: this.config.classNames.menu.value });return t.appendChild(O("span", { class: this.config.classNames.menu.badge }, e)), t;
    }, createButton: function createButton(e, t) {
      var n = Object.assign({}, t),
          i = ce(e),
          a = { element: "button", toggle: !1, label: null, icon: null, labelPressed: null, iconPressed: null };switch (["element", "icon", "label"].forEach(function (e) {
        Object.keys(n).includes(e) && (a[e] = n[e], delete n[e]);
      }), "button" !== a.element || Object.keys(n).includes("type") || (n.type = "button"), Object.keys(n).includes("class") ? n.class.includes(this.config.classNames.control) || (n.class += " ".concat(this.config.classNames.control)) : n.class = this.config.classNames.control, e) {case "play":
          a.toggle = !0, a.label = "play", a.labelPressed = "pause", a.icon = "play", a.iconPressed = "pause";break;case "mute":
          a.toggle = !0, a.label = "mute", a.labelPressed = "unmute", a.icon = "volume", a.iconPressed = "muted";break;case "captions":
          a.toggle = !0, a.label = "enableCaptions", a.labelPressed = "disableCaptions", a.icon = "captions-off", a.iconPressed = "captions-on";break;case "fullscreen":
          a.toggle = !0, a.label = "enterFullscreen", a.labelPressed = "exitFullscreen", a.icon = "enter-fullscreen", a.iconPressed = "exit-fullscreen";break;case "play-large":
          n.class += " ".concat(this.config.classNames.control, "--overlaid"), i = "play", a.label = "play", a.icon = "play";break;default:
          E.empty(a.label) && (a.label = i), E.empty(a.icon) && (a.icon = e);}var s = O(a.element);return a.toggle ? (s.appendChild(ke.createIcon.call(this, a.iconPressed, { class: "icon--pressed" })), s.appendChild(ke.createIcon.call(this, a.icon, { class: "icon--not-pressed" })), s.appendChild(ke.createLabel.call(this, a.labelPressed, { class: "label--pressed" })), s.appendChild(ke.createLabel.call(this, a.label, { class: "label--not-pressed" }))) : (s.appendChild(ke.createIcon.call(this, a.icon)), s.appendChild(ke.createLabel.call(this, a.label))), se(n, H(this.config.selectors.buttons[i], n)), _(s, n), "play" === i ? (E.array(this.elements.buttons[i]) || (this.elements.buttons[i] = []), this.elements.buttons[i].push(s)) : this.elements.buttons[i] = s, s;
    }, createRange: function createRange(e, t) {
      var n = O("input", se(H(this.config.selectors.inputs[e]), { type: "range", min: 0, max: 100, step: .01, value: 0, autocomplete: "off", role: "slider", "aria-label": he(e, this.config), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": 0 }, t));return this.elements.inputs[e] = n, ke.updateRangeFill.call(this, n), g.setup(n), n;
    }, createProgress: function createProgress(e, t) {
      var n = O("progress", se(H(this.config.selectors.display[e]), { min: 0, max: 100, value: 0, role: "progressbar", "aria-hidden": !0 }, t));if ("volume" !== e) {
        n.appendChild(O("span", null, "0"));var i = { played: "played", buffer: "buffered" }[e],
            a = i ? he(i, this.config) : "";n.innerText = "% ".concat(a.toLowerCase());
      }return this.elements.display[e] = n, n;
    }, createTime: function createTime(e) {
      var t = H(this.config.selectors.display[e]),
          n = O("div", se(t, { class: "".concat(this.config.classNames.display.time, " ").concat(t.class ? t.class : "").trim(), "aria-label": he(e, this.config) }), "00:00");return this.elements.display[e] = n, n;
    }, bindMenuItemShortcuts: function bindMenuItemShortcuts(e, t) {
      var n = this;N(e, "keydown keyup", function (i) {
        if ([32, 38, 39, 40].includes(i.which) && (i.preventDefault(), i.stopPropagation(), "keydown" !== i.type)) {
          var a,
              s = U(e, '[role="menuitemradio"]');if (!s && [32, 39].includes(i.which)) ke.showMenuPanel.call(n, t, !0);else 32 !== i.which && (40 === i.which || s && 39 === i.which ? (a = e.nextElementSibling, E.element(a) || (a = e.parentNode.firstElementChild)) : (a = e.previousElementSibling, E.element(a) || (a = e.parentNode.lastElementChild)), K.call(n, a, !0));
        }
      }, !1), N(e, "keyup", function (e) {
        13 === e.which && ke.focusFirstMenuItem.call(n, null, !0);
      });
    }, createMenuItem: function createMenuItem(e) {
      var t = this,
          n = e.value,
          i = e.list,
          a = e.type,
          s = e.title,
          o = e.badge,
          r = void 0 === o ? null : o,
          l = e.checked,
          c = void 0 !== l && l,
          u = H(this.config.selectors.inputs[a]),
          d = O("button", se(u, { type: "button", role: "menuitemradio", class: "".concat(this.config.classNames.control, " ").concat(u.class ? u.class : "").trim(), "aria-checked": c, value: n })),
          h = O("span");h.innerHTML = s, E.element(r) && h.appendChild(r), d.appendChild(h), Object.defineProperty(d, "checked", { enumerable: !0, get: function get() {
          return "true" === d.getAttribute("aria-checked");
        }, set: function set(e) {
          e && Array.from(d.parentNode.children).filter(function (e) {
            return U(e, '[role="menuitemradio"]');
          }).forEach(function (e) {
            return e.setAttribute("aria-checked", "false");
          }), d.setAttribute("aria-checked", e ? "true" : "false");
        } }), this.listeners.bind(d, "click keyup", function (e) {
        if (!E.keyboardEvent(e) || 32 === e.which) {
          switch (e.preventDefault(), e.stopPropagation(), d.checked = !0, a) {case "language":
              t.currentTrack = Number(n);break;case "quality":
              t.quality = n;break;case "speed":
              t.speed = parseFloat(n);}ke.showMenuPanel.call(t, "home", E.keyboardEvent(e));
        }
      }, a, !1), ke.bindMenuItemShortcuts.call(this, d, a), i.appendChild(d);
    }, formatTime: function formatTime() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];return E.number(e) ? be(e, ge(this.duration) > 0, t) : e;
    }, updateTimeDisplay: function updateTimeDisplay() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];E.element(e) && E.number(t) && (e.innerText = ke.formatTime(t, n));
    }, updateVolume: function updateVolume() {
      this.supported.ui && (E.element(this.elements.inputs.volume) && ke.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), E.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
    }, setRange: function setRange(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;E.element(e) && (e.value = t, ke.updateRangeFill.call(this, e));
    }, updateProgress: function updateProgress(e) {
      var t = this;if (this.supported.ui && E.event(e)) {
        var n,
            i,
            a = 0;if (e) switch (e.type) {case "timeupdate":case "seeking":case "seeked":
            n = this.currentTime, i = this.duration, a = 0 === n || 0 === i || Number.isNaN(n) || Number.isNaN(i) ? 0 : (n / i * 100).toFixed(2), "timeupdate" === e.type && ke.setRange.call(this, this.elements.inputs.seek, a);break;case "playing":case "progress":
            !function (e, n) {
              var i = E.number(n) ? n : 0,
                  a = E.element(e) ? e : t.elements.display.buffer;if (E.element(a)) {
                a.value = i;var s = a.getElementsByTagName("span")[0];E.element(s) && (s.childNodes[0].nodeValue = i);
              }
            }(this.elements.display.buffer, 100 * this.buffered);}
      }
    }, updateRangeFill: function updateRangeFill(e) {
      var t = E.event(e) ? e.target : e;if (E.element(t) && "range" === t.getAttribute("type")) {
        if (U(t, this.config.selectors.inputs.seek)) {
          t.setAttribute("aria-valuenow", this.currentTime);var n = ke.formatTime(this.currentTime),
              i = ke.formatTime(this.duration),
              a = he("seekLabel", this.config);t.setAttribute("aria-valuetext", a.replace("{currentTime}", n).replace("{duration}", i));
        } else if (U(t, this.config.selectors.inputs.volume)) {
          var s = 100 * t.value;t.setAttribute("aria-valuenow", s), t.setAttribute("aria-valuetext", "".concat(s.toFixed(1), "%"));
        } else t.setAttribute("aria-valuenow", t.value);Z.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"));
      }
    }, updateSeekTooltip: function updateSeekTooltip(e) {
      var t = this;if (this.config.tooltips.seek && E.element(this.elements.inputs.seek) && E.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
        var n = 0,
            i = this.elements.progress.getBoundingClientRect(),
            a = "".concat(this.config.classNames.tooltip, "--visible"),
            s = function s(e) {
          B(t.elements.display.seekTooltip, a, e);
        };if (this.touch) s(!1);else {
          if (E.event(e)) n = 100 / i.width * (e.pageX - i.left);else {
            if (!V(this.elements.display.seekTooltip, a)) return;n = parseFloat(this.elements.display.seekTooltip.style.left, 10);
          }n < 0 ? n = 0 : n > 100 && (n = 100), ke.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * n), this.elements.display.seekTooltip.style.left = "".concat(n, "%"), E.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && s("mouseenter" === e.type);
        }
      }
    }, timeUpdate: function timeUpdate(e) {
      var t = !E.element(this.elements.display.duration) && this.config.invertTime;ke.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || ke.updateProgress.call(this, e);
    }, durationUpdate: function durationUpdate() {
      if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
        if (this.duration >= Math.pow(2, 32)) return R(this.elements.display.currentTime, !0), void R(this.elements.progress, !0);E.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);var e = E.element(this.elements.display.duration);!e && this.config.displayDuration && this.paused && ke.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && ke.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), ke.updateSeekTooltip.call(this);
      }
    }, toggleMenuButton: function toggleMenuButton(e, t) {
      R(this.elements.settings.buttons[e], !t);
    }, updateSetting: function updateSetting(e, t, n) {
      var i = this.elements.settings.panels[e],
          a = null,
          s = t;if ("captions" === e) a = this.currentTrack;else {
        if (a = E.empty(n) ? this[e] : n, E.empty(a) && (a = this.config[e].default), !E.empty(this.options[e]) && !this.options[e].includes(a)) return void this.debug.warn("Unsupported value of '".concat(a, "' for ").concat(e));if (!this.config[e].options.includes(a)) return void this.debug.warn("Disabled value of '".concat(a, "' for ").concat(e));
      }if (E.element(s) || (s = i && i.querySelector('[role="menu"]')), E.element(s)) {
        this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = ke.getLabel.call(this, e, a);var o = s && s.querySelector('[value="'.concat(a, '"]'));E.element(o) && (o.checked = !0);
      }
    }, getLabel: function getLabel(e, t) {
      switch (e) {case "speed":
          return 1 === t ? he("normal", this.config) : "".concat(t, "&times;");case "quality":
          if (E.number(t)) {
            var n = he("qualityLabel.".concat(t), this.config);return n.length ? n : "".concat(t, "p");
          }return le(t);case "captions":
          return Ce.getLabel.call(this);default:
          return null;}
    }, setQualityMenu: function setQualityMenu(e) {
      var t = this;if (E.element(this.elements.settings.panels.quality)) {
        var n = this.elements.settings.panels.quality.querySelector('[role="menu"]');E.array(e) && (this.options.quality = ie(e).filter(function (e) {
          return t.config.quality.options.includes(e);
        }));var i = !E.empty(this.options.quality) && this.options.quality.length > 1;if (ke.toggleMenuButton.call(this, "quality", i), D(n), ke.checkMenu.call(this), i) {
          var a = function a(e) {
            var n = he("qualityBadge.".concat(e), t.config);return n.length ? ke.createBadge.call(t, n) : null;
          };this.options.quality.sort(function (e, n) {
            var i = t.config.quality.options;return i.indexOf(e) > i.indexOf(n) ? 1 : -1;
          }).forEach(function (e) {
            ke.createMenuItem.call(t, { value: e, list: n, type: "quality", title: ke.getLabel.call(t, "quality", e), badge: a(e) });
          }), ke.updateSetting.call(this, "quality", n);
        }
      }
    }, setCaptionsMenu: function setCaptionsMenu() {
      var e = this;if (E.element(this.elements.settings.panels.captions)) {
        var t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
            n = Ce.getTracks.call(this),
            i = Boolean(n.length);if (ke.toggleMenuButton.call(this, "captions", i), D(t), ke.checkMenu.call(this), i) {
          var a = n.map(function (n, i) {
            return { value: i, checked: e.captions.toggled && e.currentTrack === i, title: Ce.getLabel.call(e, n), badge: n.language && ke.createBadge.call(e, n.language.toUpperCase()), list: t, type: "language" };
          });a.unshift({ value: -1, checked: !this.captions.toggled, title: he("disabled", this.config), list: t, type: "language" }), a.forEach(ke.createMenuItem.bind(this)), ke.updateSetting.call(this, "captions", t);
        }
      }
    }, setSpeedMenu: function setSpeedMenu(e) {
      var t = this;if (E.element(this.elements.settings.panels.speed)) {
        var n = this.elements.settings.panels.speed.querySelector('[role="menu"]');E.array(e) ? this.options.speed = e : (this.isHTML5 || this.isVimeo) && (this.options.speed = [.5, .75, 1, 1.25, 1.5, 1.75, 2]), this.options.speed = this.options.speed.filter(function (e) {
          return t.config.speed.options.includes(e);
        });var i = !E.empty(this.options.speed) && this.options.speed.length > 1;ke.toggleMenuButton.call(this, "speed", i), D(n), ke.checkMenu.call(this), i && (this.options.speed.forEach(function (e) {
          ke.createMenuItem.call(t, { value: e, list: n, type: "speed", title: ke.getLabel.call(t, "speed", e) });
        }), ke.updateSetting.call(this, "speed", n));
      }
    }, checkMenu: function checkMenu() {
      var e = this.elements.settings.buttons,
          t = !E.empty(e) && Object.values(e).some(function (e) {
        return !e.hidden;
      });R(this.elements.settings.menu, !t);
    }, focusFirstMenuItem: function focusFirstMenuItem(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (!this.elements.settings.popup.hidden) {
        var n = e;E.element(n) || (n = Object.values(this.elements.settings.panels).find(function (e) {
          return !e.hidden;
        }));var i = n.querySelector('[role^="menuitem"]');K.call(this, i, t);
      }
    }, toggleMenu: function toggleMenu(e) {
      var t = this.elements.settings.popup,
          n = this.elements.buttons.settings;if (E.element(t) && E.element(n)) {
        var i = t.hidden,
            a = i;if (E.boolean(e)) a = e;else if (E.keyboardEvent(e) && 27 === e.which) a = !1;else if (E.event(e)) {
          var s = t.contains(e.target);if (s || !s && e.target !== n && a) return;
        }n.setAttribute("aria-expanded", a), R(t, !a), B(this.elements.container, this.config.classNames.menu.open, a), a && E.keyboardEvent(e) ? ke.focusFirstMenuItem.call(this, null, !0) : a || i || K.call(this, n, E.keyboardEvent(e));
      }
    }, getMenuSize: function getMenuSize(e) {
      var t = e.cloneNode(!0);t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);var n = t.scrollWidth,
          i = t.scrollHeight;return q(t), { width: n, height: i };
    }, showMenuPanel: function showMenuPanel() {
      var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          i = document.getElementById("plyr-settings-".concat(this.id, "-").concat(t));if (E.element(i)) {
        var a = i.parentNode,
            s = Array.from(a.children).find(function (e) {
          return !e.hidden;
        });if (te.transitions && !te.reducedMotion) {
          a.style.width = "".concat(s.scrollWidth, "px"), a.style.height = "".concat(s.scrollHeight, "px");var o = ke.getMenuSize.call(this, i);N.call(this, a, J, function t(n) {
            n.target === a && ["width", "height"].includes(n.propertyName) && (a.style.width = "", a.style.height = "", M.call(e, a, J, t));
          }), a.style.width = "".concat(o.width, "px"), a.style.height = "".concat(o.height, "px");
        }R(s, !0), R(i, !1), ke.focusFirstMenuItem.call(this, i, n);
      }
    }, setDownloadLink: function setDownloadLink() {
      var e = this.elements.buttons.download;E.element(e) && e.setAttribute("href", this.download);
    }, create: function create(e) {
      var t = this,
          n = O("div", H(this.config.selectors.controls.wrapper));if (this.config.controls.includes("restart") && n.appendChild(ke.createButton.call(this, "restart")), this.config.controls.includes("rewind") && n.appendChild(ke.createButton.call(this, "rewind")), this.config.controls.includes("play") && n.appendChild(ke.createButton.call(this, "play")), this.config.controls.includes("fast-forward") && n.appendChild(ke.createButton.call(this, "fast-forward")), this.config.controls.includes("progress")) {
        var i = O("div", H(this.config.selectors.progress));if (i.appendChild(ke.createRange.call(this, "seek", { id: "plyr-seek-".concat(e.id) })), i.appendChild(ke.createProgress.call(this, "buffer")), this.config.tooltips.seek) {
          var a = O("span", { class: this.config.classNames.tooltip }, "00:00");i.appendChild(a), this.elements.display.seekTooltip = a;
        }this.elements.progress = i, n.appendChild(this.elements.progress);
      }if (this.config.controls.includes("current-time") && n.appendChild(ke.createTime.call(this, "currentTime")), this.config.controls.includes("duration") && n.appendChild(ke.createTime.call(this, "duration")), this.config.controls.includes("mute") || this.config.controls.includes("volume")) {
        var s = O("div", { class: "plyr__volume" });if (this.config.controls.includes("mute") && s.appendChild(ke.createButton.call(this, "mute")), this.config.controls.includes("volume")) {
          var o = { max: 1, step: .05, value: this.config.volume };s.appendChild(ke.createRange.call(this, "volume", se(o, { id: "plyr-volume-".concat(e.id) }))), this.elements.volume = s;
        }n.appendChild(s);
      }if (this.config.controls.includes("captions") && n.appendChild(ke.createButton.call(this, "captions")), this.config.controls.includes("settings") && !E.empty(this.config.settings)) {
        var r = O("div", { class: "plyr__menu", hidden: "" });r.appendChild(ke.createButton.call(this, "settings", { "aria-haspopup": !0, "aria-controls": "plyr-settings-".concat(e.id), "aria-expanded": !1 }));var l = O("div", { class: "plyr__menu__container", id: "plyr-settings-".concat(e.id), hidden: "" }),
            c = O("div"),
            u = O("div", { id: "plyr-settings-".concat(e.id, "-home") }),
            d = O("div", { role: "menu" });u.appendChild(d), c.appendChild(u), this.elements.settings.panels.home = u, this.config.settings.forEach(function (n) {
          var i = O("button", se(H(t.config.selectors.buttons.settings), { type: "button", class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"), role: "menuitem", "aria-haspopup": !0, hidden: "" }));ke.bindMenuItemShortcuts.call(t, i, n), N(i, "click", function () {
            ke.showMenuPanel.call(t, n, !1);
          });var a = O("span", null, he(n, t.config)),
              s = O("span", { class: t.config.classNames.menu.value });s.innerHTML = e[n], a.appendChild(s), i.appendChild(a), d.appendChild(i);var o = O("div", { id: "plyr-settings-".concat(e.id, "-").concat(n), hidden: "" }),
              r = O("button", { type: "button", class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back") });r.appendChild(O("span", { "aria-hidden": !0 }, he(n, t.config))), r.appendChild(O("span", { class: t.config.classNames.hidden }, he("menuBack", t.config))), N(o, "keydown", function (e) {
            37 === e.which && (e.preventDefault(), e.stopPropagation(), ke.showMenuPanel.call(t, "home", !0));
          }, !1), N(r, "click", function () {
            ke.showMenuPanel.call(t, "home", !1);
          }), o.appendChild(r), o.appendChild(O("div", { role: "menu" })), c.appendChild(o), t.elements.settings.buttons[n] = i, t.elements.settings.panels[n] = o;
        }), l.appendChild(c), r.appendChild(l), n.appendChild(r), this.elements.settings.popup = l, this.elements.settings.menu = r;
      }if (this.config.controls.includes("pip") && te.pip && n.appendChild(ke.createButton.call(this, "pip")), this.config.controls.includes("airplay") && te.airplay && n.appendChild(ke.createButton.call(this, "airplay")), this.config.controls.includes("download")) {
        var h = { element: "a", href: this.download, target: "_blank" },
            m = this.config.urls.download;!E.url(m) && this.isEmbed && se(h, { icon: "logo-".concat(this.provider), label: this.provider }), n.appendChild(ke.createButton.call(this, "download", h));
      }return this.config.controls.includes("fullscreen") && n.appendChild(ke.createButton.call(this, "fullscreen")), this.config.controls.includes("play-large") && this.elements.container.appendChild(ke.createButton.call(this, "play-large")), this.elements.controls = n, this.isHTML5 && ke.setQualityMenu.call(this, ne.getQualityOptions.call(this)), ke.setSpeedMenu.call(this), n;
    }, inject: function inject() {
      var e = this;if (this.config.loadSprite) {
        var t = ke.getIconUrl.call(this);t.cors && fe(t.url, "sprite-plyr");
      }this.id = Math.floor(1e4 * Math.random());var n = null;this.elements.controls = null;var i = { id: this.id, seektime: this.config.seekTime, title: this.config.title },
          s = !0;E.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, i)), this.config.controls || (this.config.controls = []), E.element(this.config.controls) || E.string(this.config.controls) ? n = this.config.controls : (n = ke.create.call(this, { id: this.id, seektime: this.config.seekTime, speed: this.speed, quality: this.quality, captions: Ce.getLabel.call(this) }), s = !1);var o,
          r = function r(e) {
        var t = e;return Object.entries(i).forEach(function (e) {
          var n = a(e, 2),
              i = n[0],
              s = n[1];t = re(t, "{".concat(i, "}"), s);
        }), t;
      };if (s && (E.string(this.config.controls) ? n = r(n) : E.element(n) && (n.innerHTML = r(n.innerHTML))), E.string(this.config.selectors.controls.container) && (o = document.querySelector(this.config.selectors.controls.container)), E.element(o) || (o = this.elements.container), o[E.element(n) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", n), E.element(this.elements.controls) || ke.findElements.call(this), !E.empty(this.elements.buttons)) {
        var l = function l(t) {
          var n = e.config.classNames.controlPressed;Object.defineProperty(t, "pressed", { enumerable: !0, get: function get() {
              return V(t, n);
            }, set: function set() {
              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];B(t, n, e);
            } });
        };Object.values(this.elements.buttons).filter(Boolean).forEach(function (e) {
          E.array(e) || E.nodeList(e) ? Array.from(e).filter(Boolean).forEach(l) : l(e);
        });
      }if (Z.isEdge && $(o), this.config.tooltips.controls) {
        var c = this.config,
            u = c.classNames,
            d = c.selectors,
            h = "".concat(d.controls.wrapper, " ").concat(d.labels, " .").concat(u.hidden),
            m = z.call(this, h);Array.from(m).forEach(function (t) {
          B(t, e.config.classNames.hidden, !1), B(t, e.config.classNames.tooltip, !0);
        });
      }
    } };function we(e) {
    var t = e;if (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) {
      var n = document.createElement("a");n.href = t, t = n.href;
    }try {
      return new URL(t);
    } catch (e) {
      return null;
    }
  }function Te(e) {
    var t = new URLSearchParams();return E.object(e) && Object.entries(e).forEach(function (e) {
      var n = a(e, 2),
          i = n[0],
          s = n[1];t.set(i, s);
    }), t;
  }var Ce = { setup: function setup() {
      if (this.supported.ui) if (!this.isVideo || this.isYouTube || this.isHTML5 && !te.textTracks) E.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && ke.setCaptionsMenu.call(this);else {
        var e, t;if (E.element(this.elements.captions) || (this.elements.captions = O("div", H(this.config.selectors.captions)), e = this.elements.captions, t = this.elements.wrapper, E.element(e) && E.element(t) && t.parentNode.insertBefore(e, t.nextSibling)), Z.isIE && window.URL) {
          var n = this.media.querySelectorAll("track");Array.from(n).forEach(function (e) {
            var t = e.getAttribute("src"),
                n = we(t);null !== n && n.hostname !== window.location.href.hostname && ["http:", "https:"].includes(n.protocol) && pe(t, "blob").then(function (t) {
              e.setAttribute("src", window.URL.createObjectURL(t));
            }).catch(function () {
              q(e);
            });
          });
        }var i = ie((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function (e) {
          return e.split("-")[0];
        })),
            s = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();if ("auto" === s) s = a(i, 1)[0];var o = this.storage.get("captions");if (E.boolean(o) || (o = this.config.captions.active), Object.assign(this.captions, { toggled: !1, active: o, language: s, languages: i }), this.isHTML5) {
          var r = this.config.captions.update ? "addtrack removetrack" : "removetrack";N.call(this, this.media.textTracks, r, Ce.update.bind(this));
        }setTimeout(Ce.update.bind(this), 0);
      }
    }, update: function update() {
      var e = this,
          t = Ce.getTracks.call(this, !0),
          n = this.captions,
          i = n.active,
          a = n.language,
          s = n.meta,
          o = n.currentTrackNode,
          r = Boolean(t.find(function (e) {
        return e.language === a;
      }));this.isHTML5 && this.isVideo && t.filter(function (e) {
        return !s.get(e);
      }).forEach(function (t) {
        e.debug.log("Track added", t), s.set(t, { default: "showing" === t.mode }), t.mode = "hidden", N.call(e, t, "cuechange", function () {
          return Ce.updateCues.call(e);
        });
      }), (r && this.language !== a || !t.includes(o)) && (Ce.setLanguage.call(this, a), Ce.toggle.call(this, i && r)), B(this.elements.container, this.config.classNames.captions.enabled, !E.empty(t)), (this.config.controls || []).includes("settings") && this.config.settings.includes("captions") && ke.setCaptionsMenu.call(this);
    }, toggle: function toggle(e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];if (this.supported.ui) {
        var n = this.captions.toggled,
            i = this.config.classNames.captions.active,
            a = E.nullOrUndefined(e) ? !n : e;if (a !== n) {
          if (t || (this.captions.active = a, this.storage.set({ captions: a })), !this.language && a && !t) {
            var o = Ce.getTracks.call(this),
                r = Ce.findTrack.call(this, [this.captions.language].concat(s(this.captions.languages)), !0);return this.captions.language = r.language, void Ce.set.call(this, o.indexOf(r));
          }this.elements.buttons.captions && (this.elements.buttons.captions.pressed = a), B(this.elements.container, i, a), this.captions.toggled = a, ke.updateSetting.call(this, "captions"), I.call(this, this.media, a ? "captionsenabled" : "captionsdisabled");
        }
      }
    }, set: function set(e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
          n = Ce.getTracks.call(this);if (-1 !== e) {
        if (E.number(e)) {
          if (e in n) {
            if (this.captions.currentTrack !== e) {
              this.captions.currentTrack = e;var i = n[e],
                  a = (i || {}).language;this.captions.currentTrackNode = i, ke.updateSetting.call(this, "captions"), t || (this.captions.language = a, this.storage.set({ language: a })), this.isVimeo && this.embed.enableTextTrack(a), I.call(this, this.media, "languagechange");
            }Ce.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Ce.updateCues.call(this);
          } else this.debug.warn("Track not found", e);
        } else this.debug.warn("Invalid caption argument", e);
      } else Ce.toggle.call(this, !1, t);
    }, setLanguage: function setLanguage(e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];if (E.string(e)) {
        var n = e.toLowerCase();this.captions.language = n;var i = Ce.getTracks.call(this),
            a = Ce.findTrack.call(this, [n]);Ce.set.call(this, i.indexOf(a), t);
      } else this.debug.warn("Invalid language argument", e);
    }, getTracks: function getTracks() {
      var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];return Array.from((this.media || {}).textTracks || []).filter(function (n) {
        return !e.isHTML5 || t || e.captions.meta.has(n);
      }).filter(function (e) {
        return ["captions", "subtitles"].includes(e.kind);
      });
    }, findTrack: function findTrack(e) {
      var t,
          n = this,
          i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          a = Ce.getTracks.call(this),
          s = function s(e) {
        return Number((n.captions.meta.get(e) || {}).default);
      },
          o = Array.from(a).sort(function (e, t) {
        return s(t) - s(e);
      });return e.every(function (e) {
        return !(t = o.find(function (t) {
          return t.language === e;
        }));
      }), t || (i ? o[0] : void 0);
    }, getCurrentTrack: function getCurrentTrack() {
      return Ce.getTracks.call(this)[this.currentTrack];
    }, getLabel: function getLabel(e) {
      var t = e;return !E.track(t) && te.textTracks && this.captions.toggled && (t = Ce.getCurrentTrack.call(this)), E.track(t) ? E.empty(t.label) ? E.empty(t.language) ? he("enabled", this.config) : e.language.toUpperCase() : t.label : he("disabled", this.config);
    }, updateCues: function updateCues(e) {
      if (this.supported.ui) if (E.element(this.elements.captions)) {
        if (E.nullOrUndefined(e) || Array.isArray(e)) {
          var t = e;if (!t) {
            var n = Ce.getCurrentTrack.call(this);t = Array.from((n || {}).activeCues || []).map(function (e) {
              return e.getCueAsHTML();
            }).map(ue);
          }var i = t.map(function (e) {
            return e.trim();
          }).join("\n");if (i !== this.elements.captions.innerHTML) {
            D(this.elements.captions);var a = O("span", H(this.config.selectors.caption));a.innerHTML = i, this.elements.captions.appendChild(a), I.call(this, this.media, "cuechange");
          }
        } else this.debug.warn("updateCues: Invalid input", e);
      } else this.debug.warn("No captions element to render to");
    } },
      Ae = { enabled: !0, title: "", debug: !1, autoplay: !1, autopause: !0, playsinline: !0, seekTime: 10, volume: 1, muted: !1, duration: null, displayDuration: !0, invertTime: !0, toggleInvert: !0, ratio: "16:9", clickToPlay: !0, hideControls: !0, resetOnEnd: !1, disableContextMenu: !0, loadSprite: !0, iconPrefix: "plyr", iconUrl: "https://cdn.plyr.io/3.5.2/plyr.svg", blankVideo: "https://cdn.plyr.io/static/blank.mp4", quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }, loop: { active: !1 }, speed: { selected: 1, options: [.5, .75, 1, 1.25, 1.5, 1.75, 2] }, keyboard: { focused: !0, global: !1 }, tooltips: { controls: !1, seek: !0 }, captions: { active: !1, language: "auto", update: !1 }, fullscreen: { enabled: !0, fallback: !0, iosNative: !1 }, storage: { enabled: !0, key: "plyr" }, controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"], settings: ["captions", "quality", "speed"], i18n: { restart: "Restart", rewind: "Rewind {seektime}s", play: "Play", pause: "Pause", fastForward: "Forward {seektime}s", seek: "Seek", seekLabel: "{currentTime} of {duration}", played: "Played", buffered: "Buffered", currentTime: "Current time", duration: "Duration", volume: "Volume", mute: "Mute", unmute: "Unmute", enableCaptions: "Enable captions", disableCaptions: "Disable captions", download: "Download", enterFullscreen: "Enter fullscreen", exitFullscreen: "Exit fullscreen", frameTitle: "Player for {title}", captions: "Captions", settings: "Settings", menuBack: "Go back to previous menu", speed: "Speed", normal: "Normal", quality: "Quality", loop: "Loop", start: "Start", end: "End", all: "All", reset: "Reset", disabled: "Disabled", enabled: "Enabled", advertisement: "Ad", qualityBadge: { 2160: "4K", 1440: "HD", 1080: "HD", 720: "HD", 576: "SD", 480: "SD" } }, urls: { download: null, vimeo: { sdk: "https://player.vimeo.com/api/player.js", iframe: "https://player.vimeo.com/video/{0}?{1}", api: "https://vimeo.com/api/v2/video/{0}.json" }, youtube: { sdk: "https://www.youtube.com/iframe_api", api: "https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet" }, googleIMA: { sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js" } }, listeners: { seek: null, play: null, pause: null, restart: null, rewind: null, fastForward: null, mute: null, volume: null, captions: null, download: null, fullscreen: null, pip: null, airplay: null, speed: null, quality: null, loop: null, language: null }, events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"], selectors: { editable: "input, textarea, select, [contenteditable]", container: ".plyr", controls: { container: null, wrapper: ".plyr__controls" }, labels: "[data-plyr]", buttons: { play: '[data-plyr="play"]', pause: '[data-plyr="pause"]', restart: '[data-plyr="restart"]', rewind: '[data-plyr="rewind"]', fastForward: '[data-plyr="fast-forward"]', mute: '[data-plyr="mute"]', captions: '[data-plyr="captions"]', download: '[data-plyr="download"]', fullscreen: '[data-plyr="fullscreen"]', pip: '[data-plyr="pip"]', airplay: '[data-plyr="airplay"]', settings: '[data-plyr="settings"]', loop: '[data-plyr="loop"]' }, inputs: { seek: '[data-plyr="seek"]', volume: '[data-plyr="volume"]', speed: '[data-plyr="speed"]', language: '[data-plyr="language"]', quality: '[data-plyr="quality"]' }, display: { currentTime: ".plyr__time--current", duration: ".plyr__time--duration", buffer: ".plyr__progress__buffer", loop: ".plyr__progress__loop", volume: ".plyr__volume--display" }, progress: ".plyr__progress", captions: ".plyr__captions", caption: ".plyr__caption", menu: { quality: ".js-plyr__menu__list--quality" } }, classNames: { type: "plyr--{0}", provider: "plyr--{0}", video: "plyr__video-wrapper", embed: "plyr__video-embed", embedContainer: "plyr__video-embed__container", poster: "plyr__poster", posterEnabled: "plyr__poster-enabled", ads: "plyr__ads", control: "plyr__control", controlPressed: "plyr__control--pressed", playing: "plyr--playing", paused: "plyr--paused", stopped: "plyr--stopped", loading: "plyr--loading", hover: "plyr--hover", tooltip: "plyr__tooltip", cues: "plyr__cues", hidden: "plyr__sr-only", hideControls: "plyr--hide-controls", isIos: "plyr--is-ios", isTouch: "plyr--is-touch", uiSupported: "plyr--full-ui", noTransition: "plyr--no-transition", display: { time: "plyr__time" }, menu: { value: "plyr__menu__value", badge: "plyr__badge", open: "plyr--menu-open" }, captions: { enabled: "plyr--captions-enabled", active: "plyr--captions-active" }, fullscreen: { enabled: "plyr--fullscreen-enabled", fallback: "plyr--fullscreen-fallback" }, pip: { supported: "plyr--pip-supported", active: "plyr--pip-active" }, airplay: { supported: "plyr--airplay-supported", active: "plyr--airplay-active" }, tabFocus: "plyr__tab-focus", previewThumbnails: { thumbContainer: "plyr__preview-thumb", thumbContainerShown: "plyr__preview-thumb--is-shown", imageContainer: "plyr__preview-thumb__image-container", timeContainer: "plyr__preview-thumb__time-container", scrubbingContainer: "plyr__preview-scrubbing", scrubbingContainerShown: "plyr__preview-scrubbing--is-shown" } }, attributes: { embed: { provider: "data-plyr-provider", id: "data-plyr-embed-id" } }, keys: { google: null }, ads: { enabled: !1, publisherId: "", tagUrl: "" }, previewThumbnails: { enabled: !1, src: "" }, vimeo: { byline: !1, portrait: !1, title: !1, speed: !0, transparent: !1 }, youtube: { noCookie: !1, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 } },
      Ee = "picture-in-picture",
      Se = "inline",
      Pe = { html5: "html5", youtube: "youtube", vimeo: "vimeo" },
      Ne = { audio: "audio", video: "video" };var Me = function Me() {},
      xe = function () {
    function t() {
      var n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];e(this, t), this.enabled = window.console && n, this.enabled && this.log("Debugging enabled");
    }return n(t, [{ key: "log", get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.log, console) : Me;
      } }, { key: "warn", get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.warn, console) : Me;
      } }, { key: "error", get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.error, console) : Me;
      } }]), t;
  }();function Ie() {
    if (this.enabled) {
      var e = this.player.elements.buttons.fullscreen;E.element(e) && (e.pressed = this.active), I.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0), Z.isIos || function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (E.element(e)) {
          var n = z.call(this, "button:not(:disabled), input:not(:disabled), [tabindex]"),
              i = n[0],
              a = n[n.length - 1];P.call(this, this.elements.container, "keydown", function (e) {
            if ("Tab" === e.key && 9 === e.keyCode) {
              var t = document.activeElement;t !== a || e.shiftKey ? t === i && e.shiftKey && (a.focus(), e.preventDefault()) : (i.focus(), e.preventDefault());
            }
          }, t, !1);
        }
      }.call(this.player, this.target, this.active);
    }
  }function Le() {
    var e = this,
        t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];if (t ? this.scrollPosition = { x: window.scrollX || 0, y: window.scrollY || 0 } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = t ? "hidden" : "", B(this.target, this.player.config.classNames.fullscreen.fallback, t), Z.isIos) {
      var n = document.head.querySelector('meta[name="viewport"]'),
          i = "viewport-fit=cover";n || (n = document.createElement("meta")).setAttribute("name", "viewport");var a = E.string(n.content) && n.content.includes(i);t ? (this.cleanupViewport = !a, a || (n.content += ",".concat(i))) : this.cleanupViewport && (n.content = n.content.split(",").filter(function (e) {
        return e.trim() !== i;
      }).join(",")), setTimeout(function () {
        return $(e.target);
      }, 100);
    }Ie.call(this);
  }var _e = function () {
    function t(n) {
      var i = this;e(this, t), this.player = n, this.prefix = t.prefix, this.property = t.property, this.scrollPosition = { x: 0, y: 0 }, this.forceFallback = "force" === n.config.fullscreen.fallback, N.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function () {
        Ie.call(i);
      }), N.call(this.player, this.player.elements.container, "dblclick", function (e) {
        E.element(i.player.elements.controls) && i.player.elements.controls.contains(e.target) || i.toggle();
      }), this.update();
    }return n(t, [{ key: "update", value: function value() {
        var e;this.enabled ? (e = this.forceFallback ? "Fallback (forced)" : t.native ? "Native" : "Fallback", this.player.debug.log("".concat(e, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled");B(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
      } }, { key: "enter", value: function value() {
        this.enabled && (Z.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !t.native || this.forceFallback ? Le.call(this, !0) : this.prefix ? E.empty(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen());
      } }, { key: "exit", value: function value() {
        if (this.enabled) if (Z.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), this.player.play();else if (!t.native || this.forceFallback) Le.call(this, !1);else if (this.prefix) {
          if (!E.empty(this.prefix)) {
            var e = "moz" === this.prefix ? "Cancel" : "Exit";document["".concat(this.prefix).concat(e).concat(this.property)]();
          }
        } else (document.cancelFullScreen || document.exitFullscreen).call(document);
      } }, { key: "toggle", value: function value() {
        this.active ? this.exit() : this.enter();
      } }, { key: "usingNative", get: function get() {
        return t.native && !this.forceFallback;
      } }, { key: "enabled", get: function get() {
        return (t.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
      } }, { key: "active", get: function get() {
        return !!this.enabled && (!t.native || this.forceFallback ? V(this.target, this.player.config.classNames.fullscreen.fallback) : (this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement) === this.target);
      } }, { key: "target", get: function get() {
        return Z.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container;
      } }], [{ key: "native", get: function get() {
        return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
      } }, { key: "prefix", get: function get() {
        if (E.function(document.exitFullscreen)) return "";var e = "";return ["webkit", "moz", "ms"].some(function (t) {
          return !(!E.function(document["".concat(t, "ExitFullscreen")]) && !E.function(document["".concat(t, "CancelFullScreen")])) && (e = t, !0);
        }), e;
      } }, { key: "property", get: function get() {
        return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
      } }]), t;
  }();function Oe(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;return new Promise(function (n, i) {
      var a = new Image(),
          s = function s() {
        delete a.onload, delete a.onerror, (a.naturalWidth >= t ? n : i)(a);
      };Object.assign(a, { onload: s, onerror: s, src: e });
    });
  }var je = { addStyleHook: function addStyleHook() {
      B(this.elements.container, this.config.selectors.container.replace(".", ""), !0), B(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    }, toggleNativeControls: function toggleNativeControls() {
      arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
    }, build: function build() {
      var e = this;if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void je.toggleNativeControls.call(this, !0);E.element(this.elements.controls) || (ke.inject.call(this), this.listeners.controls()), je.toggleNativeControls.call(this), this.isHTML5 && Ce.setup.call(this), this.volume = null, this.muted = null, this.speed = null, this.loop = null, this.quality = null, ke.updateVolume.call(this), ke.timeUpdate.call(this), je.checkPlaying.call(this), B(this.elements.container, this.config.classNames.pip.supported, te.pip && this.isHTML5 && this.isVideo), B(this.elements.container, this.config.classNames.airplay.supported, te.airplay && this.isHTML5), B(this.elements.container, this.config.classNames.isIos, Z.isIos), B(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function () {
        I.call(e, e.media, "ready");
      }, 0), je.setTitle.call(this), this.poster && je.setPoster.call(this, this.poster, !1).catch(function () {}), this.config.duration && ke.durationUpdate.call(this);
    }, setTitle: function setTitle() {
      var e = he("play", this.config);if (E.string(this.config.title) && !E.empty(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function (t) {
        t.setAttribute("aria-label", e);
      }), this.isEmbed) {
        var t = W.call(this, "iframe");if (!E.element(t)) return;var n = E.empty(this.config.title) ? "video" : this.config.title,
            i = he("frameTitle", this.config);t.setAttribute("title", i.replace("{title}", n));
      }
    }, togglePoster: function togglePoster(e) {
      B(this.elements.container, this.config.classNames.posterEnabled, e);
    }, setPoster: function setPoster(e) {
      var t = this;return arguments.length > 1 && void 0 !== arguments[1] && !arguments[1] || !this.poster ? (this.media.setAttribute("poster", e), function () {
        var e = this;return new Promise(function (t) {
          return e.ready ? setTimeout(t, 0) : N.call(e, e.elements.container, "ready", t);
        }).then(function () {});
      }.call(this).then(function () {
        return Oe(e);
      }).catch(function (n) {
        throw e === t.poster && je.togglePoster.call(t, !1), n;
      }).then(function () {
        if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster");
      }).then(function () {
        return Object.assign(t.elements.poster.style, { backgroundImage: "url('".concat(e, "')"), backgroundSize: "" }), je.togglePoster.call(t, !0), e;
      })) : Promise.reject(new Error("Poster already set"));
    }, checkPlaying: function checkPlaying(e) {
      var t = this;B(this.elements.container, this.config.classNames.playing, this.playing), B(this.elements.container, this.config.classNames.paused, this.paused), B(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function (e) {
        e.pressed = t.playing;
      }), E.event(e) && "timeupdate" === e.type || je.toggleControls.call(this);
    }, checkLoading: function checkLoading(e) {
      var t = this;this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function () {
        B(t.elements.container, t.config.classNames.loading, t.loading), je.toggleControls.call(t);
      }, this.loading ? 250 : 0);
    }, toggleControls: function toggleControls(e) {
      var t = this.elements.controls;if (t && this.config.hideControls) {
        var n = this.touch && this.lastSeekTime + 2e3 > Date.now();this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || n));
      }
    } };function qe(e) {
    var t = e;E.string(t) || E.nullOrUndefined(this.embed) || (t = this.embed.ratio), E.string(t) || (t = this.config.ratio);var n = a(t.split(":").map(Number), 2),
        i = 100 / n[0] * n[1];if (this.elements.wrapper.style.paddingBottom = "".concat(i, "%"), this.isVimeo && this.supported.ui) {
      var s = (240 - i) / 4.8;this.media.style.transform = "translateY(-".concat(s, "%)");
    }return { padding: i, ratio: t };
  }var De = function () {
    function t(n) {
      e(this, t), this.player = n, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
    }return n(t, [{ key: "handleKey", value: function value(e) {
        var t = this.player,
            n = t.elements,
            i = e.keyCode ? e.keyCode : e.which,
            a = "keydown" === e.type,
            s = a && i === this.lastKey;if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && E.number(i)) {
          if (a) {
            var o = document.activeElement;if (E.element(o)) {
              var r = t.config.selectors.editable;if (o !== n.inputs.seek && U(o, r)) return;if (32 === e.which && U(o, 'button, [role^="menuitem"]')) return;
            }switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) {case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
                s || (t.currentTime = t.duration / 10 * (i - 48));break;case 32:case 75:
                s || t.togglePlay();break;case 38:
                t.increaseVolume(.1);break;case 40:
                t.decreaseVolume(.1);break;case 77:
                s || (t.muted = !t.muted);break;case 39:
                t.forward();break;case 37:
                t.rewind();break;case 70:
                t.fullscreen.toggle();break;case 67:
                s || t.toggleCaptions();break;case 76:
                t.loop = !t.loop;}27 === i && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = i;
          } else this.lastKey = null;
        }
      } }, { key: "toggleMenu", value: function value(e) {
        ke.toggleMenu.call(this.player, e);
      } }, { key: "firstTouch", value: function value() {
        var e = this.player,
            t = e.elements;e.touch = !0, B(t.container, e.config.classNames.isTouch, !0);
      } }, { key: "setTabFocus", value: function value(e) {
        var t = this.player,
            n = t.elements;if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) {
          "keydown" === e.type && (this.lastKeyDown = e.timeStamp);var i,
              a = e.timeStamp - this.lastKeyDown <= 20;if ("focus" !== e.type || a) i = t.config.classNames.tabFocus, B(z.call(t, ".".concat(i)), i, !1), this.focusTimer = setTimeout(function () {
            var e = document.activeElement;n.container.contains(e) && B(document.activeElement, t.config.classNames.tabFocus, !0);
          }, 10);
        }
      } }, { key: "global", value: function value() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = this.player;t.config.keyboard.global && P.call(t, window, "keydown keyup", this.handleKey, e, !1), P.call(t, document.body, "click", this.toggleMenu, e), x.call(t, document.body, "touchstart", this.firstTouch), P.call(t, document.body, "keydown focus blur", this.setTabFocus, e, !1, !0);
      } }, { key: "container", value: function value() {
        var e = this.player,
            t = e.config,
            n = e.elements,
            i = e.timers;!t.keyboard.global && t.keyboard.focused && N.call(e, n.container, "keydown keyup", this.handleKey, !1), N.call(e, n.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function (t) {
          var a = n.controls;a && "enterfullscreen" === t.type && (a.pressed = !1, a.hover = !1);var s = 0;["touchstart", "touchmove", "mousemove"].includes(t.type) && (je.toggleControls.call(e, !0), s = e.touch ? 3e3 : 2e3), clearTimeout(i.controls), i.controls = setTimeout(function () {
            return je.toggleControls.call(e, !1);
          }, s);
        });var s = function s(t) {
          if (!t) return qe.call(e);var i = n.container.getBoundingClientRect(),
              a = i.width,
              s = i.height;return qe.call(e, "".concat(a, ":").concat(s));
        },
            o = function o() {
          window.clearTimeout(i.resized), i.resized = window.setTimeout(s, 50);
        };N.call(e, n.container, "enterfullscreen exitfullscreen", function (t) {
          var i = e.fullscreen,
              r = i.target,
              l = i.usingNative;if (e.isEmbed && r === n.container) {
            var c = "enterfullscreen" === t.type,
                u = s(c);u.padding;!function (t, n, i) {
              if (e.isVimeo) {
                var s = e.elements.wrapper.firstChild,
                    o = a(t.split(":").map(Number), 2)[1],
                    r = a(e.embed.ratio.split(":").map(Number), 2),
                    l = r[0],
                    c = r[1];s.style.maxWidth = i ? "".concat(o / c * l, "px") : null, s.style.margin = i ? "0 auto" : null;
              }
            }(u.ratio, 0, c), l || (c ? N.call(e, window, "resize", o) : M.call(e, window, "resize", o));
          }
        });
      } }, { key: "media", value: function value() {
        var e = this,
            t = this.player,
            n = t.elements;if (N.call(t, t.media, "timeupdate seeking seeked", function (e) {
          return ke.timeUpdate.call(t, e);
        }), N.call(t, t.media, "durationchange loadeddata loadedmetadata", function (e) {
          return ke.durationUpdate.call(t, e);
        }), N.call(t, t.media, "canplay loadeddata", function () {
          R(n.volume, !t.hasAudio), R(n.buttons.mute, !t.hasAudio);
        }), N.call(t, t.media, "ended", function () {
          t.isHTML5 && t.isVideo && t.config.resetOnEnd && t.restart();
        }), N.call(t, t.media, "progress playing seeking seeked", function (e) {
          return ke.updateProgress.call(t, e);
        }), N.call(t, t.media, "volumechange", function (e) {
          return ke.updateVolume.call(t, e);
        }), N.call(t, t.media, "playing play pause ended emptied timeupdate", function (e) {
          return je.checkPlaying.call(t, e);
        }), N.call(t, t.media, "waiting canplay seeked playing", function (e) {
          return je.checkLoading.call(t, e);
        }), t.supported.ui && t.config.clickToPlay && !t.isAudio) {
          var i = W.call(t, ".".concat(t.config.classNames.video));if (!E.element(i)) return;N.call(t, n.container, "click", function (a) {
            ([n.container, i].includes(a.target) || i.contains(a.target)) && (t.touch && t.config.hideControls || (t.ended ? (e.proxy(a, t.restart, "restart"), e.proxy(a, t.play, "play")) : e.proxy(a, t.togglePlay, "play")));
          });
        }t.supported.ui && t.config.disableContextMenu && N.call(t, n.wrapper, "contextmenu", function (e) {
          e.preventDefault();
        }, !1), N.call(t, t.media, "volumechange", function () {
          t.storage.set({ volume: t.volume, muted: t.muted });
        }), N.call(t, t.media, "ratechange", function () {
          ke.updateSetting.call(t, "speed"), t.storage.set({ speed: t.speed });
        }), N.call(t, t.media, "qualitychange", function (e) {
          ke.updateSetting.call(t, "quality", null, e.detail.quality);
        }), N.call(t, t.media, "ready qualitychange", function () {
          ke.setDownloadLink.call(t);
        });var a = t.config.events.concat(["keyup", "keydown"]).join(" ");N.call(t, t.media, a, function (e) {
          var i = e.detail,
              a = void 0 === i ? {} : i;"error" === e.type && (a = t.media.error), I.call(t, n.container, e.type, !0, a);
        });
      } }, { key: "proxy", value: function value(e, t, n) {
        var i = this.player,
            a = i.config.listeners[n],
            s = !0;E.function(a) && (s = a.call(i, e)), s && E.function(t) && t.call(i, e);
      } }, { key: "bind", value: function value(e, t, n, i) {
        var a = this,
            s = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
            o = this.player,
            r = o.config.listeners[i],
            l = E.function(r);N.call(o, e, t, function (e) {
          return a.proxy(e, n, i);
        }, s && !l);
      } }, { key: "controls", value: function value() {
        var e = this,
            t = this.player,
            n = t.elements,
            i = Z.isIE ? "change" : "input";if (n.buttons.play && Array.from(n.buttons.play).forEach(function (n) {
          e.bind(n, "click", t.togglePlay, "play");
        }), this.bind(n.buttons.restart, "click", t.restart, "restart"), this.bind(n.buttons.rewind, "click", t.rewind, "rewind"), this.bind(n.buttons.fastForward, "click", t.forward, "fastForward"), this.bind(n.buttons.mute, "click", function () {
          t.muted = !t.muted;
        }, "mute"), this.bind(n.buttons.captions, "click", function () {
          return t.toggleCaptions();
        }), this.bind(n.buttons.download, "click", function () {
          I.call(t, t.media, "download");
        }, "download"), this.bind(n.buttons.fullscreen, "click", function () {
          t.fullscreen.toggle();
        }, "fullscreen"), this.bind(n.buttons.pip, "click", function () {
          t.pip = "toggle";
        }, "pip"), this.bind(n.buttons.airplay, "click", t.airplay, "airplay"), this.bind(n.buttons.settings, "click", function (e) {
          e.stopPropagation(), ke.toggleMenu.call(t, e);
        }), this.bind(n.buttons.settings, "keyup", function (e) {
          var n = e.which;[13, 32].includes(n) && (13 !== n ? (e.preventDefault(), e.stopPropagation(), ke.toggleMenu.call(t, e)) : ke.focusFirstMenuItem.call(t, null, !0));
        }, null, !1), this.bind(n.settings.menu, "keydown", function (e) {
          27 === e.which && ke.toggleMenu.call(t, e);
        }), this.bind(n.inputs.seek, "mousedown mousemove", function (e) {
          var t = n.progress.getBoundingClientRect(),
              i = 100 / t.width * (e.pageX - t.left);e.currentTarget.setAttribute("seek-value", i);
        }), this.bind(n.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function (e) {
          var n = e.currentTarget,
              i = e.keyCode ? e.keyCode : e.which;if (!E.keyboardEvent(e) || 39 === i || 37 === i) {
            t.lastSeekTime = Date.now();var a = n.hasAttribute("play-on-seeked"),
                s = ["mouseup", "touchend", "keyup"].includes(e.type);a && s ? (n.removeAttribute("play-on-seeked"), t.play()) : !s && t.playing && (n.setAttribute("play-on-seeked", ""), t.pause());
          }
        }), Z.isIos) {
          var s = z.call(t, 'input[type="range"]');Array.from(s).forEach(function (t) {
            return e.bind(t, i, function (e) {
              return $(e.target);
            });
          });
        }this.bind(n.inputs.seek, i, function (e) {
          var n = e.currentTarget,
              i = n.getAttribute("seek-value");E.empty(i) && (i = n.value), n.removeAttribute("seek-value"), t.currentTime = i / n.max * t.duration;
        }, "seek"), this.bind(n.progress, "mouseenter mouseleave mousemove", function (e) {
          return ke.updateSeekTooltip.call(t, e);
        }), this.bind(n.progress, "mousemove touchmove", function (e) {
          var n = t.previewThumbnails;n && n.loaded && n.startMove(e);
        }), this.bind(n.progress, "mouseleave click", function () {
          var e = t.previewThumbnails;e && e.loaded && e.endMove(!1, !0);
        }), this.bind(n.progress, "mousedown touchstart", function (e) {
          var n = t.previewThumbnails;n && n.loaded && n.startScrubbing(e);
        }), this.bind(n.progress, "mouseup touchend", function (e) {
          var n = t.previewThumbnails;n && n.loaded && n.endScrubbing(e);
        }), Z.isWebkit && Array.from(z.call(t, 'input[type="range"]')).forEach(function (n) {
          e.bind(n, "input", function (e) {
            return ke.updateRangeFill.call(t, e.target);
          });
        }), t.config.toggleInvert && !E.element(n.display.duration) && this.bind(n.display.currentTime, "click", function () {
          0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, ke.timeUpdate.call(t));
        }), this.bind(n.inputs.volume, i, function (e) {
          t.volume = e.target.value;
        }, "volume"), this.bind(n.controls, "mouseenter mouseleave", function (e) {
          n.controls.hover = !t.touch && "mouseenter" === e.type;
        }), this.bind(n.controls, "mousedown mouseup touchstart touchend touchcancel", function (e) {
          n.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
        }), this.bind(n.controls, "focusin", function () {
          var n = t.config,
              i = t.elements,
              a = t.timers;B(i.controls, n.classNames.noTransition, !0), je.toggleControls.call(t, !0), setTimeout(function () {
            B(i.controls, n.classNames.noTransition, !1);
          }, 0);var s = e.touch ? 3e3 : 4e3;clearTimeout(a.controls), a.controls = setTimeout(function () {
            return je.toggleControls.call(t, !1);
          }, s);
        }), this.bind(n.inputs.volume, "wheel", function (e) {
          var n = e.webkitDirectionInvertedFromDevice,
              i = a([e.deltaX, -e.deltaY].map(function (e) {
            return n ? -e : e;
          }), 2),
              s = i[0],
              o = i[1],
              r = Math.sign(Math.abs(s) > Math.abs(o) ? s : o);t.increaseVolume(r / 50);var l = t.media.volume;(1 === r && l < 1 || -1 === r && l > 0) && e.preventDefault();
        }, "volume", !1);
      } }]), t;
  }();"undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;var Fe,
      He = (function (e, t) {
    e.exports = function () {
      var e = function e() {},
          t = {},
          n = {},
          i = {};function a(e, t) {
        if (e) {
          var a = i[e];if (n[e] = t, a) for (; a.length;) {
            a[0](e, t), a.splice(0, 1);
          }
        }
      }function s(t, n) {
        t.call && (t = { success: t }), n.length ? (t.error || e)(n) : (t.success || e)(t);
      }function o(t, n, i, a) {
        var s,
            r,
            l = document,
            c = i.async,
            u = (i.numRetries || 0) + 1,
            d = i.before || e,
            h = t.replace(/^(css|img)!/, "");a = a || 0, /(^css!|\.css$)/.test(t) ? (s = !0, (r = l.createElement("link")).rel = "stylesheet", r.href = h) : /(^img!|\.(png|gif|jpg|svg)$)/.test(t) ? (r = l.createElement("img")).src = h : ((r = l.createElement("script")).src = t, r.async = void 0 === c || c), r.onload = r.onerror = r.onbeforeload = function (e) {
          var l = e.type[0];if (s && "hideFocus" in r) try {
            r.sheet.cssText.length || (l = "e");
          } catch (e) {
            18 != e.code && (l = "e");
          }if ("e" == l && (a += 1) < u) return o(t, n, i, a);n(t, l, e.defaultPrevented);
        }, !1 !== d(t, r) && l.head.appendChild(r);
      }function r(e, n, i) {
        var r, l;if (n && n.trim && (r = n), l = (r ? i : n) || {}, r) {
          if (r in t) throw "LoadJS";t[r] = !0;
        }!function (e, t, n) {
          var i,
              a,
              s = (e = e.push ? e : [e]).length,
              r = s,
              l = [];for (i = function i(e, n, _i) {
            if ("e" == n && l.push(e), "b" == n) {
              if (!_i) return;l.push(e);
            }--s || t(l);
          }, a = 0; a < r; a++) {
            o(e[a], i, n);
          }
        }(e, function (e) {
          s(l, e), a(r, e);
        }, l);
      }return r.ready = function (e, t) {
        return function (e, t) {
          e = e.push ? e : [e];var a,
              s,
              o,
              r = [],
              l = e.length,
              c = l;for (a = function a(e, n) {
            n.length && r.push(e), --c || t(r);
          }; l--;) {
            s = e[l], (o = n[s]) ? a(s, o) : (i[s] = i[s] || []).push(a);
          }
        }(e, function (e) {
          s(t, e);
        }), r;
      }, r.done = function (e) {
        a(e, []);
      }, r.reset = function () {
        t = {}, n = {}, i = {};
      }, r.isDefined = function (e) {
        return e in t;
      }, r;
    }();
  }(Fe = { exports: {} }, Fe.exports), Fe.exports);function Re(e) {
    return new Promise(function (t, n) {
      He(e, { success: t, error: n });
    });
  }function Be(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, I.call(this, this.media, e ? "play" : "pause"));
  }var Ve = { setup: function setup() {
      var e = this;B(this.elements.wrapper, this.config.classNames.embed, !0), qe.call(this), E.object(window.Vimeo) ? Ve.ready.call(this) : Re(this.config.urls.vimeo.sdk).then(function () {
        Ve.ready.call(e);
      }).catch(function (t) {
        e.debug.warn("Vimeo API failed to load", t);
      });
    }, ready: function ready() {
      var e = this,
          t = this,
          n = t.config.vimeo,
          i = Te(se({}, { loop: t.config.loop.active, autoplay: t.autoplay, muted: t.muted, gesture: "media", playsinline: !this.config.fullscreen.iosNative }, n)),
          s = t.media.getAttribute("src");E.empty(s) && (s = t.media.getAttribute(t.config.attributes.embed.id));var o,
          r = (o = s, E.empty(o) ? null : E.number(Number(o)) ? o : o.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : o),
          l = O("iframe"),
          c = oe(t.config.urls.vimeo.iframe, r, i);l.setAttribute("src", c), l.setAttribute("allowfullscreen", ""), l.setAttribute("allowtransparency", ""), l.setAttribute("allow", "autoplay");var u = O("div", { poster: t.poster, class: t.config.classNames.embedContainer });u.appendChild(l), t.media = F(u, t.media), pe(oe(t.config.urls.vimeo.api, r), "json").then(function (e) {
        if (!E.empty(e)) {
          var n = new URL(e[0].thumbnail_large);n.pathname = "".concat(n.pathname.split("_")[0], ".jpg"), je.setPoster.call(t, n.href).catch(function () {});
        }
      }), t.embed = new window.Vimeo.Player(l, { autopause: t.config.autopause, muted: t.muted }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function () {
        return Be.call(t, !0), t.embed.play();
      }, t.media.pause = function () {
        return Be.call(t, !1), t.embed.pause();
      }, t.media.stop = function () {
        t.pause(), t.currentTime = 0;
      };var d = t.media.currentTime;Object.defineProperty(t.media, "currentTime", { get: function get() {
          return d;
        }, set: function set(e) {
          var n = t.embed,
              i = t.media,
              a = t.paused,
              s = t.volume,
              o = a && !n.hasPlayed;i.seeking = !0, I.call(t, i, "seeking"), Promise.resolve(o && n.setVolume(0)).then(function () {
            return n.setCurrentTime(e);
          }).then(function () {
            return o && n.pause();
          }).then(function () {
            return o && n.setVolume(s);
          }).catch(function () {});
        } });var h = t.config.speed.selected;Object.defineProperty(t.media, "playbackRate", { get: function get() {
          return h;
        }, set: function set(e) {
          t.embed.setPlaybackRate(e).then(function () {
            h = e, I.call(t, t.media, "ratechange");
          }).catch(function (e) {
            "Error" === e.name && ke.setSpeedMenu.call(t, []);
          });
        } });var m = t.config.volume;Object.defineProperty(t.media, "volume", { get: function get() {
          return m;
        }, set: function set(e) {
          t.embed.setVolume(e).then(function () {
            m = e, I.call(t, t.media, "volumechange");
          });
        } });var p = t.config.muted;Object.defineProperty(t.media, "muted", { get: function get() {
          return p;
        }, set: function set(e) {
          var n = !!E.boolean(e) && e;t.embed.setVolume(n ? 0 : t.config.volume).then(function () {
            p = n, I.call(t, t.media, "volumechange");
          });
        } });var f,
          g = t.config.loop;Object.defineProperty(t.media, "loop", { get: function get() {
          return g;
        }, set: function set(e) {
          var n = E.boolean(e) ? e : t.config.loop.active;t.embed.setLoop(n).then(function () {
            g = n;
          });
        } }), t.embed.getVideoUrl().then(function (e) {
        f = e, ke.setDownloadLink.call(t);
      }).catch(function (t) {
        e.debug.warn(t);
      }), Object.defineProperty(t.media, "currentSrc", { get: function get() {
          return f;
        } }), Object.defineProperty(t.media, "ended", { get: function get() {
          return t.currentTime === t.duration;
        } }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function (n) {
        var i = a(n, 2),
            s = i[0],
            o = i[1];t.embed.ratio = "".concat(s, ":").concat(o), qe.call(e, t.embed.ratio);
      }), t.embed.setAutopause(t.config.autopause).then(function (e) {
        t.config.autopause = e;
      }), t.embed.getVideoTitle().then(function (n) {
        t.config.title = n, je.setTitle.call(e);
      }), t.embed.getCurrentTime().then(function (e) {
        d = e, I.call(t, t.media, "timeupdate");
      }), t.embed.getDuration().then(function (e) {
        t.media.duration = e, I.call(t, t.media, "durationchange");
      }), t.embed.getTextTracks().then(function (e) {
        t.media.textTracks = e, Ce.setup.call(t);
      }), t.embed.on("cuechange", function (e) {
        var n = e.cues,
            i = (void 0 === n ? [] : n).map(function (e) {
          return t = e.text, n = document.createDocumentFragment(), i = document.createElement("div"), n.appendChild(i), i.innerHTML = t, n.firstChild.innerText;var t, n, i;
        });Ce.updateCues.call(t, i);
      }), t.embed.on("loaded", function () {
        (t.embed.getPaused().then(function (e) {
          Be.call(t, !e), e || I.call(t, t.media, "playing");
        }), E.element(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1);
      }), t.embed.on("play", function () {
        Be.call(t, !0), I.call(t, t.media, "playing");
      }), t.embed.on("pause", function () {
        Be.call(t, !1);
      }), t.embed.on("timeupdate", function (e) {
        t.media.seeking = !1, d = e.seconds, I.call(t, t.media, "timeupdate");
      }), t.embed.on("progress", function (e) {
        t.media.buffered = e.percent, I.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && I.call(t, t.media, "canplaythrough"), t.embed.getDuration().then(function (e) {
          e !== t.media.duration && (t.media.duration = e, I.call(t, t.media, "durationchange"));
        });
      }), t.embed.on("seeked", function () {
        t.media.seeking = !1, I.call(t, t.media, "seeked");
      }), t.embed.on("ended", function () {
        t.media.paused = !0, I.call(t, t.media, "ended");
      }), t.embed.on("error", function (e) {
        t.media.error = e, I.call(t, t.media, "error");
      }), setTimeout(function () {
        return je.build.call(t);
      }, 0);
    } };function Ue(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, I.call(this, this.media, e ? "play" : "pause"));
  }var ze,
      We = { setup: function setup() {
      var e = this;B(this.elements.wrapper, this.config.classNames.embed, !0), qe.call(this), E.object(window.YT) && E.function(window.YT.Player) ? We.ready.call(this) : (Re(this.config.urls.youtube.sdk).catch(function (t) {
        e.debug.warn("YouTube API failed to load", t);
      }), window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [], window.onYouTubeReadyCallbacks.push(function () {
        We.ready.call(e);
      }), window.onYouTubeIframeAPIReady = function () {
        window.onYouTubeReadyCallbacks.forEach(function (e) {
          e();
        });
      });
    }, getTitle: function getTitle(e) {
      var t = this;if (E.function(this.embed.getVideoData)) {
        var n = this.embed.getVideoData().title;if (E.empty(n)) return this.config.title = n, void je.setTitle.call(this);
      }var i = this.config.keys.google;E.string(i) && !E.empty(i) && pe(oe(this.config.urls.youtube.api, e, i)).then(function (e) {
        E.object(e) && (t.config.title = e.items[0].snippet.title, je.setTitle.call(t));
      }).catch(function () {});
    }, ready: function ready() {
      var e = this,
          t = e.media.getAttribute("id");if (E.empty(t) || !t.startsWith("youtube-")) {
        var n = e.media.getAttribute("src");E.empty(n) && (n = e.media.getAttribute(this.config.attributes.embed.id));var i,
            a,
            s = (i = n, E.empty(i) ? null : i.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : i),
            o = (a = e.provider, "".concat(a, "-").concat(Math.floor(1e4 * Math.random()))),
            r = O("div", { id: o, poster: e.poster });e.media = F(r, e.media);var l = function l(e) {
          return "https://img.youtube.com/vi/".concat(s, "/").concat(e, "default.jpg");
        };Oe(l("maxres"), 121).catch(function () {
          return Oe(l("sd"), 121);
        }).catch(function () {
          return Oe(l("hq"));
        }).then(function (t) {
          return je.setPoster.call(e, t.src);
        }).then(function (t) {
          t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
        }).catch(function () {});var c = e.config.youtube;e.embed = new window.YT.Player(o, { videoId: s, host: c.noCookie ? "https://www.youtube-nocookie.com" : void 0, playerVars: se({}, { autoplay: e.config.autoplay ? 1 : 0, hl: e.config.hl, controls: e.supported.ui ? 0 : 1, disablekb: 1, playsinline: e.config.fullscreen.iosNative ? 0 : 1, cc_load_policy: e.captions.active ? 1 : 0, cc_lang_pref: e.config.captions.language, widget_referrer: window ? window.location.href : null }, c), events: { onError: function onError(t) {
              if (!e.media.error) {
                var n = t.data,
                    i = { 2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.", 5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.", 100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.", 101: "The owner of the requested video does not allow it to be played in embedded players.", 150: "The owner of the requested video does not allow it to be played in embedded players." }[n] || "An unknown error occured";e.media.error = { code: n, message: i }, I.call(e, e.media, "error");
              }
            }, onPlaybackRateChange: function onPlaybackRateChange(t) {
              var n = t.target;e.media.playbackRate = n.getPlaybackRate(), I.call(e, e.media, "ratechange");
            }, onReady: function onReady(t) {
              if (!E.function(e.media.play)) {
                var n = t.target;We.getTitle.call(e, s), e.media.play = function () {
                  Ue.call(e, !0), n.playVideo();
                }, e.media.pause = function () {
                  Ue.call(e, !1), n.pauseVideo();
                }, e.media.stop = function () {
                  n.stopVideo();
                }, e.media.duration = n.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", { get: function get() {
                    return Number(n.getCurrentTime());
                  }, set: function set(t) {
                    e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, I.call(e, e.media, "seeking"), n.seekTo(t);
                  } }), Object.defineProperty(e.media, "playbackRate", { get: function get() {
                    return n.getPlaybackRate();
                  }, set: function set(e) {
                    n.setPlaybackRate(e);
                  } });var i = e.config.volume;Object.defineProperty(e.media, "volume", { get: function get() {
                    return i;
                  }, set: function set(t) {
                    i = t, n.setVolume(100 * i), I.call(e, e.media, "volumechange");
                  } });var a = e.config.muted;Object.defineProperty(e.media, "muted", { get: function get() {
                    return a;
                  }, set: function set(t) {
                    var i = E.boolean(t) ? t : a;a = i, n[i ? "mute" : "unMute"](), I.call(e, e.media, "volumechange");
                  } }), Object.defineProperty(e.media, "currentSrc", { get: function get() {
                    return n.getVideoUrl();
                  } }), Object.defineProperty(e.media, "ended", { get: function get() {
                    return e.currentTime === e.duration;
                  } }), e.options.speed = n.getAvailablePlaybackRates(), e.supported.ui && e.media.setAttribute("tabindex", -1), I.call(e, e.media, "timeupdate"), I.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function () {
                  e.media.buffered = n.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && I.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), I.call(e, e.media, "canplaythrough"));
                }, 200), setTimeout(function () {
                  return je.build.call(e);
                }, 50);
              }
            }, onStateChange: function onStateChange(t) {
              var n = t.target;switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(t.data) && (e.media.seeking = !1, I.call(e, e.media, "seeked")), t.data) {case -1:
                  I.call(e, e.media, "timeupdate"), e.media.buffered = n.getVideoLoadedFraction(), I.call(e, e.media, "progress");break;case 0:
                  Ue.call(e, !1), e.media.loop ? (n.stopVideo(), n.playVideo()) : I.call(e, e.media, "ended");break;case 1:
                  e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (Ue.call(e, !0), I.call(e, e.media, "playing"), e.timers.playing = setInterval(function () {
                    I.call(e, e.media, "timeupdate");
                  }, 50), e.media.duration !== n.getDuration() && (e.media.duration = n.getDuration(), I.call(e, e.media, "durationchange")));break;case 2:
                  e.muted || e.embed.unMute(), Ue.call(e, !1);}I.call(e, e.elements.container, "statechange", !1, { code: t.data });
            } } });
      }
    } },
      Ke = { setup: function setup() {
      this.media ? (B(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), B(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && B(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = O("div", { class: this.config.classNames.video }), L(this.media, this.elements.wrapper), this.elements.poster = O("div", { class: this.config.classNames.poster }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? ne.extend.call(this) : this.isYouTube ? We.setup.call(this) : this.isVimeo && Ve.setup.call(this)) : this.debug.warn("No media element found!");
    } },
      Ye = function () {
    function t(n) {
      var i = this;e(this, t), this.player = n, this.config = n.config.ads, this.playing = !1, this.initialized = !1, this.elements = { container: null, displayContainer: null }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function (e, t) {
        i.on("loaded", e), i.on("error", t);
      }), this.load();
    }return n(t, [{ key: "load", value: function value() {
        var e = this;this.enabled && (E.object(window.google) && E.object(window.google.ima) ? this.ready() : Re(this.player.config.urls.googleIMA.sdk).then(function () {
          e.ready();
        }).catch(function () {
          e.trigger("error", new Error("Google IMA SDK failed to load"));
        }));
      } }, { key: "ready", value: function value() {
        var e = this;this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function () {
          e.clearSafetyTimer("onAdsManagerLoaded()");
        }), this.listeners(), this.setupIMA();
      } }, { key: "setupIMA", value: function value() {
        this.elements.container = O("div", { class: this.player.config.classNames.ads }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.requestAds();
      } }, { key: "requestAds", value: function value() {
        var e = this,
            t = this.player.elements.container;try {
          this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (t) {
            return e.onAdsManagerLoaded(t);
          }, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (t) {
            return e.onAdError(t);
          }, !1);var n = new google.ima.AdsRequest();n.adTagUrl = this.tagUrl, n.linearAdSlotWidth = t.offsetWidth, n.linearAdSlotHeight = t.offsetHeight, n.nonLinearAdSlotWidth = t.offsetWidth, n.nonLinearAdSlotHeight = t.offsetHeight, n.forceNonLinearFullSlot = !1, n.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(n);
        } catch (e) {
          this.onAdError(e);
        }
      } }, { key: "pollCountdown", value: function value() {
        var e = this;if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");this.countdownTimer = setInterval(function () {
          var t = be(Math.max(e.manager.getRemainingTime(), 0)),
              n = "".concat(he("advertisement", e.player.config), " - ").concat(t);e.elements.container.setAttribute("data-badge-text", n);
        }, 100);
      } }, { key: "onAdsManagerLoaded", value: function value(e) {
        var t = this;if (this.enabled) {
          var n = new google.ima.AdsRenderingSettings();n.restoreCustomPlaybackStateOnAdBreakComplete = !0, n.enablePreloading = !0, this.manager = e.getAdsManager(this.player, n), this.cuePoints = this.manager.getCuePoints(), this.manager.setVolume(this.player.volume), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
            return t.onAdError(e);
          }), Object.keys(google.ima.AdEvent.Type).forEach(function (e) {
            t.manager.addEventListener(google.ima.AdEvent.Type[e], function (e) {
              return t.onAdEvent(e);
            });
          }), this.trigger("loaded");
        }
      } }, { key: "addCuePoints", value: function value() {
        var e = this;E.empty(this.cuePoints) || this.cuePoints.forEach(function (t) {
          if (0 !== t && -1 !== t && t < e.player.duration) {
            var n = e.player.elements.progress;if (E.element(n)) {
              var i = 100 / e.player.duration * t,
                  a = O("span", { class: e.player.config.classNames.cues });a.style.left = "".concat(i.toString(), "%"), n.appendChild(a);
            }
          }
        });
      } }, { key: "onAdEvent", value: function value(e) {
        var t = this,
            n = this.player.elements.container,
            i = e.getAd(),
            a = e.getAdData(),
            s = function s(e) {
          var n = "ads".concat(e.replace(/_/g, "").toLowerCase());I.call(t.player, t.player.media, n);
        };switch (e.type) {case google.ima.AdEvent.Type.LOADED:
            this.trigger("loaded"), s(e.type), this.pollCountdown(!0), i.isLinear() || (i.width = n.offsetWidth, i.height = n.offsetHeight);break;case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            s(e.type), this.loadAds();break;case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            s(e.type), this.pauseContent();break;case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            s(e.type), this.pollCountdown(), this.resumeContent();break;case google.ima.AdEvent.Type.STARTED:case google.ima.AdEvent.Type.MIDPOINT:case google.ima.AdEvent.Type.COMPLETE:case google.ima.AdEvent.Type.IMPRESSION:case google.ima.AdEvent.Type.CLICK:
            s(e.type);break;case google.ima.AdEvent.Type.LOG:
            a.adError && this.player.debug.warn("Non-fatal ad error: ".concat(a.adError.getMessage()));}
      } }, { key: "onAdError", value: function value(e) {
        this.cancel(), this.player.debug.warn("Ads error", e);
      } }, { key: "listeners", value: function value() {
        var e,
            t = this,
            n = this.player.elements.container;this.player.on("canplay", function () {
          t.addCuePoints();
        }), this.player.on("ended", function () {
          t.loader.contentComplete();
        }), this.player.on("timeupdate", function () {
          e = t.player.currentTime;
        }), this.player.on("seeked", function () {
          var n = t.player.currentTime;E.empty(t.cuePoints) || t.cuePoints.forEach(function (i, a) {
            e < i && i < n && (t.manager.discardAdBreak(), t.cuePoints.splice(a, 1));
          });
        }), window.addEventListener("resize", function () {
          t.manager && t.manager.resize(n.offsetWidth, n.offsetHeight, google.ima.ViewMode.NORMAL);
        });
      } }, { key: "play", value: function value() {
        var e = this,
            t = this.player.elements.container;this.managerPromise || this.resumeContent(), this.managerPromise.then(function () {
          e.elements.displayContainer.initialize();try {
            e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0;
          } catch (t) {
            e.onAdError(t);
          }
        }).catch(function () {});
      } }, { key: "resumeContent", value: function value() {
        this.elements.container.style.zIndex = "", this.playing = !1, this.player.media.play();
      } }, { key: "pauseContent", value: function value() {
        this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause();
      } }, { key: "cancel", value: function value() {
        this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
      } }, { key: "loadAds", value: function value() {
        var e = this;this.managerPromise.then(function () {
          e.manager && e.manager.destroy(), e.managerPromise = new Promise(function (t) {
            e.on("loaded", t), e.player.debug.log(e.manager);
          }), e.requestAds();
        }).catch(function () {});
      } }, { key: "trigger", value: function value(e) {
        for (var t = this, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) {
          i[a - 1] = arguments[a];
        }var s = this.events[e];E.array(s) && s.forEach(function (e) {
          E.function(e) && e.apply(t, i);
        });
      } }, { key: "on", value: function value(e, t) {
        return E.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this;
      } }, { key: "startSafetyTimer", value: function value(e, t) {
        var n = this;this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout(function () {
          n.cancel(), n.clearSafetyTimer("startSafetyTimer()");
        }, e);
      } }, { key: "clearSafetyTimer", value: function value(e) {
        E.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null);
      } }, { key: "enabled", get: function get() {
        var e = this.config;return this.player.isHTML5 && this.player.isVideo && e.enabled && (!E.empty(e.publisherId) || E.url(e.tagUrl));
      } }, { key: "tagUrl", get: function get() {
        var e = this.config;if (E.url(e.tagUrl)) return e.tagUrl;var t = { AV_PUBLISHERID: "58c25bb0073ef448b1087ad6", AV_CHANNELID: "5a0458dc28a06145e4519d21", AV_URL: window.location.hostname, cb: Date.now(), AV_WIDTH: 640, AV_HEIGHT: 480, AV_CDIM2: this.publisherId };return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(Te(t));
      } }]), t;
  }(),
      Qe = function () {
    function t(n) {
      e(this, t), this.player = n, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = { thumb: {}, scrubbing: {} }, this.load();
    }return n(t, [{ key: "load", value: function value() {
        var e = this;this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(function () {
          e.render(), e.determineContainerAutoSizing(), e.loaded = !0;
        });
      } }, { key: "getThumbnails", value: function value() {
        var e = this;return new Promise(function (t) {
          var n = e.player.config.previewThumbnails.src;if (E.empty(n)) throw new Error("Missing previewThumbnails.src config attribute");var i = (E.string(n) ? [n] : n).map(function (t) {
            return e.getThumbnail(t);
          });Promise.all(i).then(function () {
            e.thumbnails.sort(function (e, t) {
              return e.height - t.height;
            }), e.player.debug.log("Preview thumbnails", e.thumbnails), t();
          });
        });
      } }, { key: "getThumbnail", value: function value(e) {
        var t = this;return new Promise(function (n) {
          pe(e).then(function (i) {
            var s,
                o,
                r = { frames: (s = i, o = [], s.split(/\r\n\r\n|\n\n|\r\r/).forEach(function (e) {
                var t = {};e.split(/\r\n|\n|\r/).forEach(function (e) {
                  if (E.number(t.startTime)) {
                    if (!E.empty(e.trim()) && E.empty(t.text)) {
                      var n = e.trim().split("#xywh="),
                          i = a(n, 1);if (t.text = i[0], n[1]) {
                        var s = a(n[1].split(","), 4);t.x = s[0], t.y = s[1], t.w = s[2], t.h = s[3];
                      }
                    }
                  } else {
                    var o = e.match(/([0-9]{2}):([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2}):([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);o && (t.startTime = 60 * Number(o[1]) * 60 + 60 * Number(o[2]) + Number(o[3]) + Number("0.".concat(o[4])), t.endTime = 60 * Number(o[6]) * 60 + 60 * Number(o[7]) + Number(o[8]) + Number("0.".concat(o[9])));
                  }
                }), t.text && o.push(t);
              }), o), height: null, urlPrefix: "" };r.frames[0].text.startsWith("/") || (r.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));var l = new Image();l.onload = function () {
              r.height = l.naturalHeight, r.width = l.naturalWidth, t.thumbnails.push(r), n();
            }, l.src = r.urlPrefix + r.frames[0].text;
          });
        });
      } }, { key: "startMove", value: function value(e) {
        if (this.loaded && E.event(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
          if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);else {
            var t = this.player.elements.progress.getBoundingClientRect(),
                n = 100 / t.width * (e.pageX - t.left);this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = be(this.seekTime);
          }this.showImageAtCurrentTime();
        }
      } }, { key: "endMove", value: function value() {
        this.toggleThumbContainer(!1, !0);
      } }, { key: "startScrubbing", value: function value(e) {
        !1 !== e.button && 0 !== e.button || (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()));
      } }, { key: "endScrubbing", value: function value() {
        var e = this;this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : x.call(this.player, this.player.media, "timeupdate", function () {
          e.mouseDown || e.toggleScrubbingContainer(!1);
        });
      } }, { key: "listeners", value: function value() {
        var e = this;this.player.on("play", function () {
          e.toggleThumbContainer(!1, !0);
        }), this.player.on("seeked", function () {
          e.toggleThumbContainer(!1);
        }), this.player.on("timeupdate", function () {
          e.lastTime = e.player.media.currentTime;
        });
      } }, { key: "render", value: function value() {
        this.elements.thumb.container = O("div", { class: this.player.config.classNames.previewThumbnails.thumbContainer }), this.elements.thumb.imageContainer = O("div", { class: this.player.config.classNames.previewThumbnails.imageContainer }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);var e = O("div", { class: this.player.config.classNames.previewThumbnails.timeContainer });this.elements.thumb.time = O("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = O("div", { class: this.player.config.classNames.previewThumbnails.scrubbingContainer }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
      } }, { key: "showImageAtCurrentTime", value: function value() {
        var e = this;this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();var t = this.thumbnails[0].frames.findIndex(function (t) {
          return e.seekTime >= t.startTime && e.seekTime <= t.endTime;
        }),
            n = t >= 0,
            i = 0;this.mouseDown || this.toggleThumbContainer(n), n && (this.thumbnails.forEach(function (n, a) {
          e.loadedImages.includes(n.frames[t].text) && (i = a);
        }), t !== this.showingThumb && (this.showingThumb = t, this.loadImage(i)));
      } }, { key: "loadImage", value: function value() {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            n = this.showingThumb,
            i = this.thumbnails[t],
            a = i.urlPrefix,
            s = i.frames[n],
            o = i.frames[n].text,
            r = a + o;if (this.currentImageElement && this.currentImageElement.dataset.filename === o) this.showImage(this.currentImageElement, s, t, n, o, !1), this.currentImageElement.dataset.index = n, this.removeOldImages(this.currentImageElement);else {
          this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);var l = new Image();l.src = r, l.dataset.index = n, l.dataset.filename = o, this.showingThumbFilename = o, this.player.debug.log("Loading image: ".concat(r)), l.onload = function () {
            return e.showImage(l, s, t, n, o, !0);
          }, this.loadingImage = l, this.removeOldImages(l);
        }
      } }, { key: "showImage", value: function value(e, t, n, i, a) {
        var s = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];this.player.debug.log("Showing thumb: ".concat(a, ". num: ").concat(i, ". qual: ").concat(n, ". newimg: ").concat(s)), this.setImageSizeAndOffset(e, t), s && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(a) || this.loadedImages.push(a)), this.preloadNearby(i, !0).then(this.preloadNearby(i, !1)).then(this.getHigherQuality(n, e, t, a));
      } }, { key: "removeOldImages", value: function value(e) {
        var t = this;Array.from(this.currentImageContainer.children).forEach(function (n) {
          if ("img" === n.tagName.toLowerCase()) {
            var i = t.usingSprites ? 500 : 1e3;if (n.dataset.index !== e.dataset.index && !n.dataset.deleting) {
              n.dataset.deleting = !0;var a = t.currentImageContainer;setTimeout(function () {
                a.removeChild(n), t.player.debug.log("Removing thumb: ".concat(n.dataset.filename));
              }, i);
            }
          }
        });
      } }, { key: "preloadNearby", value: function value(e) {
        var t = this,
            n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];return new Promise(function (i) {
          setTimeout(function () {
            var a = t.thumbnails[0].frames[e].text;if (t.showingThumbFilename === a) {
              var s;s = n ? t.thumbnails[0].frames.slice(e) : t.thumbnails[0].frames.slice(0, e).reverse();var o = !1;s.forEach(function (e) {
                var n = e.text;if (n !== a && !t.loadedImages.includes(n)) {
                  o = !0, t.player.debug.log("Preloading thumb filename: ".concat(n));var s = t.thumbnails[0].urlPrefix + n,
                      r = new Image();r.src = s, r.onload = function () {
                    t.player.debug.log("Preloaded thumb filename: ".concat(n)), t.loadedImages.includes(n) || t.loadedImages.push(n), i();
                  };
                }
              }), o || i();
            }
          }, 300);
        });
      } }, { key: "getHigherQuality", value: function value(e, t, n, i) {
        var a = this;if (e < this.thumbnails.length - 1) {
          var s = t.naturalHeight;this.usingSprites && (s = n.h), s < this.thumbContainerHeight && setTimeout(function () {
            a.showingThumbFilename === i && (a.player.debug.log("Showing higher quality thumb for: ".concat(i)), a.loadImage(e + 1));
          }, 300);
        }
      } }, { key: "toggleThumbContainer", value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = this.player.config.classNames.previewThumbnails.thumbContainerShown;this.elements.thumb.container.classList.toggle(n, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null);
      } }, { key: "toggleScrubbingContainer", value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null);
      } }, { key: "determineContainerAutoSizing", value: function value() {
        this.elements.thumb.imageContainer.clientHeight > 20 && (this.sizeSpecifiedInCSS = !0);
      } }, { key: "setThumbContainerSizeAndPos", value: function value() {
        if (!this.sizeSpecifiedInCSS) {
          var e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(e, "px");
        }this.setThumbContainerPos();
      } }, { key: "setThumbContainerPos", value: function value() {
        var e = this.player.elements.progress.getBoundingClientRect(),
            t = this.player.elements.container.getBoundingClientRect(),
            n = this.elements.thumb.container,
            i = t.left - e.left + 10,
            a = t.right - e.left - n.clientWidth - 10,
            s = this.mousePosX - e.left - n.clientWidth / 2;s < i && (s = i), s > a && (s = a), n.style.left = "".concat(s, "px");
      } }, { key: "setScrubbingContainerSize", value: function value() {
        this.elements.scrubbing.container.style.width = "".concat(this.player.media.clientWidth, "px"), this.elements.scrubbing.container.style.height = "".concat(this.player.media.clientWidth / this.thumbAspectRatio, "px");
      } }, { key: "setImageSizeAndOffset", value: function value(e, t) {
        if (this.usingSprites) {
          var n = this.thumbContainerHeight / t.h;e.style.height = "".concat(Math.floor(e.naturalHeight * n), "px"), e.style.width = "".concat(Math.floor(e.naturalWidth * n), "px"), e.style.left = "-".concat(t.x * n, "px"), e.style.top = "-".concat(t.y * n, "px");
        }
      } }, { key: "enabled", get: function get() {
        return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
      } }, { key: "currentImageContainer", get: function get() {
        return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
      } }, { key: "usingSprites", get: function get() {
        return Object.keys(this.thumbnails[0].frames[0]).includes("w");
      } }, { key: "thumbAspectRatio", get: function get() {
        return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
      } }, { key: "thumbContainerHeight", get: function get() {
        return this.mouseDown ? Math.floor(this.player.media.clientWidth / this.thumbAspectRatio) : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
      } }, { key: "currentImageElement", get: function get() {
        return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
      }, set: function set(e) {
        this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
      } }]), t;
  }(),
      Xe = { insertElements: function insertElements(e, t) {
      var n = this;E.string(t) ? j(e, this.media, { src: t }) : E.array(t) && t.forEach(function (t) {
        j(e, n.media, t);
      });
    }, change: function change(e) {
      var t = this;ae(e, "sources.length") ? (ne.cancelRequests.call(this), this.destroy.call(this, function () {
        t.options.quality = [], q(t.media), t.media = null, E.element(t.elements.container) && t.elements.container.removeAttribute("class");var n = e.sources,
            i = e.type,
            s = a(n, 1)[0],
            o = s.provider,
            r = void 0 === o ? Pe.html5 : o,
            l = s.src,
            c = "html5" === r ? i : "div",
            u = "html5" === r ? {} : { src: l };Object.assign(t, { provider: r, type: i, supported: te.check(i, r, t.config.playsinline), media: O(c, u) }), t.elements.container.appendChild(t.media), E.boolean(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), E.empty(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), je.addStyleHook.call(t), t.isHTML5 && Xe.insertElements.call(t, "source", n), t.config.title = e.title, Ke.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && Xe.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && je.build.call(t), t.isHTML5 && t.media.load(), t.previewThumbnails && t.previewThumbnails.load(), t.fullscreen.update();
      }, !0)) : this.debug.warn("Invalid source format");
    } },
      Je = function () {
    function t(n, i) {
      var a = this;if (e(this, t), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = te.touch, this.media = n, E.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || E.nodeList(this.media) || E.array(this.media)) && (this.media = this.media[0]), this.config = se({}, Ae, t.defaults, i || {}, function () {
        try {
          return JSON.parse(a.media.getAttribute("data-plyr-config"));
        } catch (e) {
          return {};
        }
      }()), this.elements = { container: null, captions: null, buttons: {}, display: {}, progress: {}, inputs: {}, settings: { popup: null, menu: null, panels: {}, buttons: {} } }, this.captions = { active: null, currentTrack: -1, meta: new WeakMap() }, this.fullscreen = { active: !1 }, this.options = { speed: [], quality: [] }, this.debug = new xe(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", te), !E.nullOrUndefined(this.media) && E.element(this.media)) {
        if (this.media.plyr) this.debug.warn("Target already setup");else if (this.config.enabled) {
          if (te.check().api) {
            var s = this.media.cloneNode(!0);s.autoplay = !1, this.elements.original = s;var o = this.media.tagName.toLowerCase(),
                r = null,
                l = null;switch (o) {case "div":
                if (r = this.media.querySelector("iframe"), E.element(r)) {
                  if (l = we(r.getAttribute("src")), this.provider = function (e) {
                    return (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? Pe.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? Pe.vimeo : null
                    );
                  }(l.toString()), this.elements.container = this.media, this.media = r, this.elements.container.className = "", l.search.length) {
                    var c = ["1", "true"];c.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), c.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = c.includes(l.searchParams.get("playsinline")), this.config.youtube.hl = l.searchParams.get("hl")) : this.config.playsinline = !0;
                  }
                } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);if (E.empty(this.provider) || !Object.keys(Pe).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");this.type = Ne.video;break;case "video":case "audio":
                this.type = o, this.provider = Pe.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);break;default:
                return void this.debug.error("Setup failed: unsupported type");}this.supported = te.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new De(this), this.storage = new me(this), this.media.plyr = this, E.element(this.elements.container) || (this.elements.container = O("div", { tabindex: 0 }), L(this.media, this.elements.container)), je.addStyleHook.call(this), Ke.setup.call(this), this.config.debug && N.call(this, this.elements.container, this.config.events.join(" "), function (e) {
              a.debug.log("event: ".concat(e.type));
            }), (this.isHTML5 || this.isEmbed && !this.supported.ui) && je.build.call(this), this.listeners.container(), this.listeners.global(), this.fullscreen = new _e(this), this.config.ads.enabled && (this.ads = new Ye(this)), this.config.autoplay && this.play(), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new Qe(this))) : this.debug.error("Setup failed: no support");
          } else this.debug.error("Setup failed: no support");
        } else this.debug.error("Setup failed: disabled by config");
      } else this.debug.error("Setup failed: no suitable element passed");
    }return n(t, [{ key: "play", value: function value() {
        var e = this;return E.function(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(function () {
          return e.ads.play();
        }).catch(function () {
          return e.media.play();
        }), this.media.play()) : null;
      } }, { key: "pause", value: function value() {
        this.playing && E.function(this.media.pause) && this.media.pause();
      } }, { key: "togglePlay", value: function value(e) {
        (E.boolean(e) ? e : !this.playing) ? this.play() : this.pause();
      } }, { key: "stop", value: function value() {
        this.isHTML5 ? (this.pause(), this.restart()) : E.function(this.media.stop) && this.media.stop();
      } }, { key: "restart", value: function value() {
        this.currentTime = 0;
      } }, { key: "rewind", value: function value(e) {
        this.currentTime = this.currentTime - (E.number(e) ? e : this.config.seekTime);
      } }, { key: "forward", value: function value(e) {
        this.currentTime = this.currentTime + (E.number(e) ? e : this.config.seekTime);
      } }, { key: "increaseVolume", value: function value(e) {
        var t = this.media.muted ? 0 : this.volume;this.volume = t + (E.number(e) ? e : 0);
      } }, { key: "decreaseVolume", value: function value(e) {
        this.increaseVolume(-e);
      } }, { key: "toggleCaptions", value: function value(e) {
        Ce.toggle.call(this, e, !1);
      } }, { key: "airplay", value: function value() {
        te.airplay && this.media.webkitShowPlaybackTargetPicker();
      } }, { key: "toggleControls", value: function value(e) {
        if (this.supported.ui && !this.isAudio) {
          var t = V(this.elements.container, this.config.classNames.hideControls),
              n = void 0 === e ? void 0 : !e,
              i = B(this.elements.container, this.config.classNames.hideControls, n);if (i && this.config.controls.includes("settings") && !E.empty(this.config.settings) && ke.toggleMenu.call(this, !1), i !== t) {
            var a = i ? "controlshidden" : "controlsshown";I.call(this, this.media, a);
          }return !i;
        }return !1;
      } }, { key: "on", value: function value(e, t) {
        N.call(this, this.elements.container, e, t);
      } }, { key: "once", value: function value(e, t) {
        x.call(this, this.elements.container, e, t);
      } }, { key: "off", value: function value(e, t) {
        M(this.elements.container, e, t);
      } }, { key: "destroy", value: function value(e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (this.ready) {
          var i = function i() {
            document.body.style.overflow = "", t.embed = null, n ? (Object.keys(t.elements).length && (q(t.elements.buttons.play), q(t.elements.captions), q(t.elements.controls), q(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), E.function(e) && e()) : (function () {
              this && this.eventListeners && (this.eventListeners.forEach(function (e) {
                var t = e.element,
                    n = e.type,
                    i = e.callback,
                    a = e.options;t.removeEventListener(n, i, a);
              }), this.eventListeners = []);
            }.call(t), F(t.elements.original, t.elements.container), I.call(t, t.elements.original, "destroyed", !0), E.function(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function () {
              t.elements = null, t.media = null;
            }, 200));
          };this.stop(), this.isHTML5 ? (clearTimeout(this.timers.loading), je.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && E.function(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200));
        }
      } }, { key: "supports", value: function value(e) {
        return te.mime.call(this, e);
      } }, { key: "isHTML5", get: function get() {
        return Boolean(this.provider === Pe.html5);
      } }, { key: "isEmbed", get: function get() {
        return Boolean(this.isYouTube || this.isVimeo);
      } }, { key: "isYouTube", get: function get() {
        return Boolean(this.provider === Pe.youtube);
      } }, { key: "isVimeo", get: function get() {
        return Boolean(this.provider === Pe.vimeo);
      } }, { key: "isVideo", get: function get() {
        return Boolean(this.type === Ne.video);
      } }, { key: "isAudio", get: function get() {
        return Boolean(this.type === Ne.audio);
      } }, { key: "playing", get: function get() {
        return Boolean(this.ready && !this.paused && !this.ended);
      } }, { key: "paused", get: function get() {
        return Boolean(this.media.paused);
      } }, { key: "stopped", get: function get() {
        return Boolean(this.paused && 0 === this.currentTime);
      } }, { key: "ended", get: function get() {
        return Boolean(this.media.ended);
      } }, { key: "currentTime", set: function set(e) {
        if (this.duration) {
          var t = E.number(e) && e > 0;this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
        }
      }, get: function get() {
        return Number(this.media.currentTime);
      } }, { key: "buffered", get: function get() {
        var e = this.media.buffered;return E.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
      } }, { key: "seeking", get: function get() {
        return Boolean(this.media.seeking);
      } }, { key: "duration", get: function get() {
        var e = parseFloat(this.config.duration),
            t = (this.media || {}).duration,
            n = E.number(t) && t !== 1 / 0 ? t : 0;return e || n;
      } }, { key: "volume", set: function set(e) {
        var t = e;E.string(t) && (t = Number(t)), E.number(t) || (t = this.storage.get("volume")), E.number(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !E.empty(e) && this.muted && t > 0 && (this.muted = !1);
      }, get: function get() {
        return Number(this.media.volume);
      } }, { key: "muted", set: function set(e) {
        var t = e;E.boolean(t) || (t = this.storage.get("muted")), E.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
      }, get: function get() {
        return Boolean(this.media.muted);
      } }, { key: "hasAudio", get: function get() {
        return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
      } }, { key: "speed", set: function set(e) {
        var t = null;E.number(e) && (t = e), E.number(t) || (t = this.storage.get("speed")), E.number(t) || (t = this.config.speed.selected), t < .1 && (t = .1), t > 2 && (t = 2), this.config.speed.options.includes(t) ? (this.config.speed.selected = t, this.media.playbackRate = t) : this.debug.warn("Unsupported speed (".concat(t, ")"));
      }, get: function get() {
        return Number(this.media.playbackRate);
      } }, { key: "quality", set: function set(e) {
        var t = this.config.quality,
            n = this.options.quality;if (n.length) {
          var i = [!E.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(E.number),
              a = !0;if (!n.includes(i)) {
            var s = function (e, t) {
              return E.array(e) && e.length ? e.reduce(function (e, n) {
                return Math.abs(n - t) < Math.abs(e - t) ? n : e;
              }) : null;
            }(n, i);this.debug.warn("Unsupported quality option: ".concat(i, ", using ").concat(s, " instead")), i = s, a = !1;
          }t.selected = i, this.media.quality = i, a && this.storage.set({ quality: i });
        }
      }, get: function get() {
        return this.media.quality;
      } }, { key: "loop", set: function set(e) {
        var t = E.boolean(e) ? e : this.config.loop.active;this.config.loop.active = t, this.media.loop = t;
      }, get: function get() {
        return Boolean(this.media.loop);
      } }, { key: "source", set: function set(e) {
        Xe.change.call(this, e);
      }, get: function get() {
        return this.media.currentSrc;
      } }, { key: "download", get: function get() {
        var e = this.config.urls.download;return E.url(e) ? e : this.source;
      } }, { key: "poster", set: function set(e) {
        this.isVideo ? je.setPoster.call(this, e, !1).catch(function () {}) : this.debug.warn("Poster can only be set for video");
      }, get: function get() {
        return this.isVideo ? this.media.getAttribute("poster") : null;
      } }, { key: "autoplay", set: function set(e) {
        var t = E.boolean(e) ? e : this.config.autoplay;this.config.autoplay = t;
      }, get: function get() {
        return Boolean(this.config.autoplay);
      } }, { key: "currentTrack", set: function set(e) {
        Ce.set.call(this, e, !1);
      }, get: function get() {
        var e = this.captions,
            t = e.toggled,
            n = e.currentTrack;return t ? n : -1;
      } }, { key: "language", set: function set(e) {
        Ce.setLanguage.call(this, e, !1);
      }, get: function get() {
        return (Ce.getCurrentTrack.call(this) || {}).language;
      } }, { key: "pip", set: function set(e) {
        if (te.pip) {
          var t = E.boolean(e) ? e : !this.pip;E.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Ee : Se), E.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
        }
      }, get: function get() {
        return te.pip ? E.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Ee : null;
      } }], [{ key: "supported", value: function value(e, t, n) {
        return te.check(e, t, n);
      } }, { key: "loadSprite", value: function value(e, t) {
        return fe(e, t);
      } }, { key: "setup", value: function value(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = null;return E.string(e) ? i = Array.from(document.querySelectorAll(e)) : E.nodeList(e) ? i = Array.from(e) : E.array(e) && (i = e.filter(E.element)), E.empty(i) ? null : i.map(function (e) {
          return new t(e, n);
        });
      } }]), t;
  }();return Je.defaults = (ze = Ae, JSON.parse(JSON.stringify(ze))), Je;
});
//# sourceMappingURL=plyr.min.js.map
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isRTL = $('html').attr('dir') == "rtl" ? true : false,
    winWidth = viewport().width,
    winHeight = viewport().height,
    headerHeight = $('.c-main-header').outerHeight(),
    footerHeight = $('.c-main-footer').outerHeight(),
    bodyHeight,
    bodyTopPos,
    isIE = detectIE(),
    scrollHeight = 0,
    isMobil,
    movieListAnimating = false;

mobilecheck();
// loadPlayMovies();
charLimitInit();
ChangeToSvg();
setOnTopClass();
initSlick();
headerSpace();
adjustContentList2();
removeLoaderInMob();
onlyPortrait();

$(function () {
	locMapInit();
	winDimensions();
	heightMediaQuery();
	ChangeToSvg();
	footerLogosCarousel(true);
	headerAdjust();
	movieListSetHTML();
	movieList();
	layerTabsAdjustment();
	tabs();
	js2LayerTabs();
	activeHashTab();
	sideNav();
	animWrapHeight();
	bindPopupEve();
	setOnTopClass();
	customSelectBox();
	filterSearch();
	scrollTo();
	bgMobImg();
	movieListSty1AutoCloseEvent();
	customScrollInit();
	addingAOSData();
	initSelect2();
	// mainNavClicksForMap();
	calcScrollHeightDOM();
	heightMediaQuery();
	adjustContentList2();
	navDropDownHeight();

	$('.c-loader').fadeOut('slow', function () {
		if (winWidth > 1024) {
			AOS.init({
				once: true,
				offset: 0
			});
		}
	});
});

//On Window Load
$(window).on('load', function () {
	// calcBodyarea();
	footerLogosCarousel(true);
	setTimeout(function () {
		// addVideoPlugin();
		AOS.refresh();
		fixMobileCarouselWrongDisplay();
		movieListSetDropDownPos();
		calcScrollHeightDOM();
		heightMediaQuery();
	}, 200);
	navDropDownHeight();
});

//On Window Resize
var resizeTimer;
$(window).on('resize orientationchange', function () {
	onlyPortrait();
	setTimeout(function () {
		onlyPortrait();
	}, 250);
	if (winWidth != viewport().width) {
		mobilecheck();
		winDimensions();
		heightMediaQuery();
		setOnTopClass();
		// calcBodyarea();
		headerSpace();
		animWrapHeight();
		bgMobImg();
		adjustContentList2();
		removeLoaderInMob();

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			winDimensions();
			animWrapHeight();
			heightMediaQuery();
			movieListSetHTML();
			calcScrollHeightDOM();
		}, 250);
		movieListCarousel();
		calcScrollHeightDOM();
		navDropDownHeight();
	}
});

function onlyPortrait() {
	// console.log('winWidth: ', winWidth);
	// console.log('winHeight: ', winHeight);
	// console.log('isMobile: ', isMobile);
	// console.log('winWidth < 768: ', winWidth < 768);
	if (winWidth > winHeight && isMobile) {
		// console.log('Showing Message lol');
		$('.c-landscape-msg').show();
	} else {
		$('.c-landscape-msg').hide();
		// console.log('Not going to show message.');
	}
}

function calcScrollHeightDOM() {
	var body = document.body,
	    html = document.documentElement;

	scrollHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

$(window).on('scroll', function () {
	var currentScroll = $(window).scrollTop();
	if (currentScroll + winHeight >= scrollHeight) {
		console.log(currentScroll + winHeight >= scrollHeight);
		refreshAOS('refresh');
	}
});

//On Scroll
$(window).on('scroll', function () {
	setOnTopClass();
});

//Escape Functionality
$(document).keyup(function (e) {
	if (e.keyCode == 27) {
		$('html').removeClass('side-nav-is-open');
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select input[type="text"]').blur();

		closePopup();

		movieListSty1Close();
	}
});

//CLick on body
// $(document).on('click touchstart', function (e) {
/*if ($(e.target).closest('.js-langSelector').length === 0) {
	$('.js-langSelector').find('ul').removeClass('active');
}*/
// });

function customScrollInit() {
	if (winWidth > 1024) {
		$(".js-custom-scroll").mCustomScrollbar({
			theme: "minimal-dark"
		});
		$('.js-custom-scroll-hoz').mCustomScrollbar({
			axis: "x",
			theme: "minimal-dark"
		});
	}
}

function setOnTopClass() {
	if ($(window).scrollTop() === 0) {
		$('html').removeClass('not-at-top');
	} else {
		$('html').addClass('not-at-top');
	}
}
function viewport() {
	var e = window,
	    a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width: e[a + 'Width'], height: e[a + 'Height'] };
}
function winDimensions() {
	winWidth = viewport().width, winHeight = viewport().height, headerHeight = $('.c-main-header').outerHeight(), footerHeight = $('.c-main-footer').outerHeight();
}
function ChangeToSvg() {
	$('img.js-inline-svg').each(function () {
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			var $svg = $(data).find('svg');
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' insvg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}
			$img.replaceWith($svg);
		}, 'xml');
	});
}
function loadPath() {
	var currentLoc = window.location.pathname.split('/')[1];
	$('.secondary-nav a[href="' + currentLoc + '"]').addClass('active');
}
function actionsOnClick() {
	$('.js-langSelector').on('click', function (e) {
		e.preventDefault();
		$(this).find('ul').toggleClass('active');
	});
}
function calcBodyarea() {
	bodyHeight = winHeight - headerHeight - footerHeight;
	$('.js-page-body').css('min-height', bodyHeight);
}

function initSlick() {

	$('.js-banner-1a').slick({
		arrows: true,
		fade: true,
		asNavFor: '.js-banner-1b'
	});

	// for places where txt will act as bullets like food page.
	var banner1bDots = true;
	if ($('.carousel-txt-controls').get(0)) {
		banner1bDots = false;
	}

	$('.js-banner-1b').slick({
		arrows: false,
		dots: banner1bDots,
		asNavFor: '.js-banner-1a'
	});

	if ($('.js-banner-1-txt-controls').get(0)) {
		$('.js-banner-1b').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$('.js-banner-1-txt-controls li').removeClass('is--active');
			$('.js-banner-1-txt-controls li:nth-child(' + (nextSlide + 1) + ')').addClass('is--active');
		});
		$('.js-banner-1-txt-controls a').click(function (e) {
			e.preventDefault();
			var thisIndex = $(this).parent().index();
			$('.js-banner-1b').slick('slickGoTo', thisIndex);
		});
	}

	$('.js-banner-2').slick({
		arrows: true
	});

	$('.js-offer-carousel').slick({
		slidesToShow: 4,
		arrows: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				focusOnSelect: true,
				slidesToShow: 1
			}
		}]
	});
	$('.js-offer-carousel-1').slick({
		slidesToShow: 5,
		arrows: false,
		responsive: [{
			breakpoint: 1023,
			settings: {
				focusOnSelect: true,
				slidesToShow: 3
			}
		}, {
			breakpoint: 768,
			settings: {
				focusOnSelect: true,
				slidesToShow: 1
			}
		}]
	});

	// Main Carousel
	$('.js-main-carousel-thumb .item img').each(function () {
		var imgUrl = $(this).attr('src');
		imgUrl = "url(" + imgUrl.replace(/\\/g, "/") + ")";
		$(this).closest('.img').attr('style', 'background-image: ' + imgUrl + ';');
		$(this).closest('.item').find('.img-reflection').attr('style', 'background-image: ' + imgUrl + ';');
	});
	$('.js-main-carousel').slick({
		arrows: false,
		infinite: true,
		fade: true,
		speed: 600,
		// autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.js-main-carousel-thumb'
	});
	$('.js-main-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		swipeToSlide: true,
		touchThreshold: 7,
		speed: 600,
		infinite: false,
		asNavFor: '.js-main-carousel',
		focusOnSelect: true,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				touchThreshold: 6
			}
		}, {
			breakpoint: 920,
			settings: {
				slidesToShow: 4,
				touchThreshold: 5
			}
		}]
	});
	$('.js-main-carousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (nextSlide == 0 || nextSlide == slick.slideCount - 1) {
			$('.js-main-carousel-thumb').slick('slickGoTo', nextSlide);
		}
	});

	$('.js-nav-carousel').slick({
		dots: true,
		arrows: true
	});
	$('.js-tile-inner-carousel').each(function () {
		var imgSelector = $(this).closest('.c-content-tiles').find('.js-content-bg-img-carousel');
		if (imgSelector.get(0)) {
			$(this).slick({
				dots: true,
				arrows: false,
				asNavFor: imgSelector
			});
			$(imgSelector).slick({
				dots: false,
				arrows: false,
				fade: true,
				asNavFor: $(this)
			});
		} else {
			$(this).slick({
				dots: true,
				arrows: false
			});
		}
	});

	// EXP Carousel

	$('.js-exp-carousel').on('init', function (slick) {
		$(slick.currentTarget).find('.slick-current video')[0].play();
	});
	$('.js-exp-carousel').slick({
		arrows: false,
		fade: true,
		asNavFor: '.js-exp-carousel-thumb',
		infinite: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				fade: false,
				infinite: true
			}
		}]
	});
	$('.js-exp-carousel-thumb').slick({
		arrows: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		swipeToSlide: true,
		touchThreshold: 6,
		asNavFor: '.js-exp-carousel',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				touchThreshold: 2,
				slidesToScroll: 1,
				infinite: true,
				focusOnSelect: true,
				swipeToSlide: true
			}
		}]
	});

	$('.js-exp-carousel').on('beforeChange', function (slick, currentSlide, nextSlide) {
		$(slick.currentTarget).find('.slick-current video')[0].pause();
	});

	$('.js-exp-carousel').on('afterChange', function (slick, currentSlide) {
		$(slick.currentTarget).find('.slick-current video')[0].play();
	});

	$('.js-exp-carousel-thumb .item').click(function (e) {
		e.preventDefault();
		var thisIndex = $(this).closest('.slick-slide').attr('data-slick-index');
		$('.js-exp-carousel').slick('slickGoTo', thisIndex);
	});

	/*if (isRTL) {} else {
     var bannerPrev = '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="assets/img/icons/angle-left.svg" alt="caret-left" class="toSvg js-inline-svg svgWhite" /></button>'
     var bannerNext = '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="assets/img/icons/angle-right.svg" alt="caret-right" class="toSvg js-inline-svg svgWhite" /></button>'
 }
 $('.js-eventsCarousel').slick({
 	autoplay: false,
 	slidesToShow: 1,
 	slidesToScroll: 1,
 	dots: false,
 	arrows: true,
 	fade: false,
 	infinite: true,
 	centerMode: true,
 	centerPadding: '0',
 	rtl: isRTL,
 	appendArrows: '.eventsCarouselNav',
 	prevArrow: bannerPrev,
 	nextArrow: bannerNext,
 });
 $('.js-captionSlider').slick({
 	autoplay: false,
 	slidesToShow: 1,
 	slidesToScroll: 1,
 	dots: false,
 	arrows: false,
 	fade: true,
 	draggable: false,
 	infinite: false,
 	rtl: isRTL,
 	asNavFor: '.js-figureSlider, .js-figureCaptionSlider',
 });
 $('.js-figureSlider').slick({
 	autoplay: false,
 	slidesToShow: 1,
 	slidesToScroll: 1,
 	dots: false,
 	arrows: true,
 	fade: false,
 	infinite: false,
 	rtl: isRTL,
 	appendArrows: '.homeCarouselNav',
 	prevArrow: bannerPrev,
 	nextArrow: bannerNext,
 	asNavFor: '.js-captionSlider, .js-figureCaptionSlider',
 });
 $('.js-figureCaptionSlider').slick({
 	autoplay: false,
 	slidesToShow: 1,
 	slidesToScroll: 1,
 	dots: false,
 	arrows: false,
 	fade: false,
 	draggable: false,
 	infinite: false,
 	rtl: isRTL,
 	asNavFor: '.js-captionSlider, .js-figureSlider',
 });*/

	$('.js-date-time').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 7,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 5,
				dots: false
			}
		}, {
			breakpoint: 767,
			settings: {
				arrows: false,
				slidesToShow: 5
			}
		}]
	});

	$('.js-date-time').on('init', function (slick) {
		$('.js-date-time .dboxelement').eq(0).addClass('active');
	});

	$('.time-itemss').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: false
			}
		}]
	});
	if (winWidth < 767) {
		$('.js-mob-center-slider').slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: true
		});
		$('.js-mob-center-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$('.js-mob-center-slider [data-slick-index="' + nextSlide + '"] a').trigger('click');
		});
	}

	$('.js-exp-carousel-2').slick({
		arrows: false,
		focusOnSelect: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 6,
		touchThreshold: 6,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				swipeToSlide: true,
				touchThreshold: 5
			}
		}]
	});

	$('.js-exp-carousel-2-test').slick({
		arrows: false,
		focusOnSelect: true,
		swipeToSlide: true,
		infinite: true,
		slidesToShow: 6,
		touchThreshold: 6,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				swipeToSlide: true,
				touchThreshold: 5
			}
		}]
	});
}

function headerAdjust() {
	$('.js-header-links ul ul').closest('li').addClass('has--sub-nav');
}

function initSelect2() {
	$('.js-select2').select2({
		// minimumResultsForSearch: Infinity
	});
}

function movieList() {
	if (winWidth >= 768 && !$('.js-movie-list').hasClass('js-movie-list--sty-1') || $('.js-movie-list').hasClass('js-movie-list--sty-1')) {
		$('.js-movie-list .movie-item .item-wrap').click(function (e) {
			e.preventDefault();

			if ($(e.target).closest('.js-close-movie-list-detail').length || movieListAnimating) {
				return;
			}

			movieListAnimating = true;

			var _self = this;
			$(this).closest('.js-movie-list').removeClass('panel--closed');
			$(this).closest('.js-movie-list').addClass('has--open-panel');
			if (!$(this).closest('.js-movie-list').hasClass('js-movie-list--not-open')) {

				if (!$(this).closest('.list-wrap').next().find('.item-details').get(0) && $(this).closest('.js-movie-list').find('.movie-details .item-details').get(0)) {

					var openOnOtherRowDetail = $(this).closest('.js-movie-list').find('.movie-details .item-details');

					openOnOtherRowDetail.parent().slideUp();

					setTimeout(function () {
						openOnOtherRowDetail.closest('.movie-details').prev().find('.movie-item').removeClass('is--active');
						openOnOtherRowDetail.remove();
						slideDownMovieDetails(_self);
					}, 400);
				} else {
					slideDownMovieDetails(_self);
				}
			}
		});
	}
}

function slideDownMovieDetails(thisSelf) {
	// if(winWidth >=768 || $(thisSelf).closest('.js-movie-list').hasClass('js-movie-list--sty-1')){
	$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
	$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();

	var detailsHTML = $(thisSelf).parent().find('.item-details')[0].outerHTML;
	$(thisSelf).closest('.movie-item').addClass('is--active');
	$(thisSelf).closest('.list-wrap').next().append(detailsHTML);
	$(thisSelf).closest('.list-wrap').next().slideDown();
	$(thisSelf).closest('.list-wrap').next().find('.popup--event-binded').removeClass('popup--event-binded');
	bindPopupEve();

	var thisVideo = $(thisSelf).closest('.list-wrap').next().find('video');
	if (thisVideo.get(0)) {
		thisVideo[0].play();
	}

	setInView($(thisSelf).closest('.list-wrap').next().find('.item-details')[0]);

	movieListAnimating = false;

	$('.js-movie-list .movie-details .js-close-movie-list-detail, .js-movie-list .list-wrap .js-close-movie-list-detail:not(.js-close-applied)').click(function (e) {
		e.preventDefault();

		$(this).addClass('js-close-applied');

		if (movieListAnimating) {
			return;
		}

		movieListAnimating = true;

		if ($(this).closest('.movie-details').get(0)) {
			$(this).closest('.movie-details').slideUp();
		} else {
			$(this).closest('.list-row').find('.movie-details').slideUp();
		}

		$(this).closest('.js-movie-list').removeClass('has--open-panel');

		setTimeout(function () {
			$(thisSelf).closest('.js-movie-list').find('.movie-item').removeClass('is--active');
			$(thisSelf).closest('.js-movie-list').find('.movie-details .item-details').remove();
			$(thisSelf).closest('.js-movie-list.js-movie-list--sty-1').addClass('panel--closed');
			movieListAnimating = false;
		}, 400);
	});
	// }
}
function setInView(el) {

	var top = el.offsetTop;
	var height = el.offsetHeight + 20;

	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}

	var a = top;
	var b = height;
	var d = a + b;
	var e = window.innerHeight + window.pageYOffset;
	var c = d - e;
	var scroll = window.pageYOffset - c;

	if (e < d) {
		$('html, body').stop().animate({
			scrollTop: a + b - window.innerHeight
		}, 500);
	}
}

function createMovieListMobileSlider() {
	$('.js-movie-list').each(function () {
		var movieListInfinite = false;
		if ($(' > *', this).length > 3) {
			movieListInfinite = true;
		}
		$(this).slick({
			arrows: false,
			focusOnSelect: true,
			swipeToSlide: true,
			infinite: movieListInfinite
		});
	});
}

function movieListSetHTML() {
	var itemsPerRow = 1;
	if (winWidth < 1024) {
		itemsPerRow = 4;
	} else {
		itemsPerRow = 6;
	}

	if ($('.js-movie-list').hasClass('js-movie-list--sty-1')) {
		itemsPerRow = 4;
		if (winWidth < 1500) {
			itemsPerRow = 3;
		}
		if (winWidth < 920) {
			itemsPerRow = 2;
		}
		if (winWidth < 768) {
			itemsPerRow = 1;
		}
	}

	// $('.js-movie-list').each(function () {
	if ($('.js-movie-list').hasClass('slick-initialized')) {
		$('.js-movie-list').slick('unslick');
		if (winWidth >= 768) {
			movieList();
		} else {
			createMovieListMobileSlider();
		}
	}
	// });

	// Normalize First
	$('.js-movie-list .movie-item.is--active').removeClass('is--active');
	if ($('.js-movie-list .list-wrap').get(0)) {
		$('.js-movie-list').each(function () {
			$('.list-wrap .movie-item .is--active', this).removeClass('is--active');
			$('.list-wrap .movie-item', this).appendTo($(this));
			$('.list-wrap', this).remove();
			$('.list-row', this).remove();
			$('.movie-details', this).remove();
		});
	}

	$('.js-movie-list .is--last-item').removeClass('is--last-item');
	$('.js-movie-list .is--first-item').removeClass('is--first-item');

	if (winWidth >= 768 || $('.js-movie-list').hasClass('js-movie-list--sty-1')) {
		// Set HTML
		$('.js-movie-list').each(function () {
			var i = 1;
			while ($('> .movie-item', this).length) {
				$('> .movie-item:lt(' + itemsPerRow + ')', this).wrapAll('<div class="list-wrap list-wrap-page list-wrap-page--' + i + '" />');
				i++;
			}

			if ($(this).hasClass('js-movie-list--sty-1')) {
				$('.list-wrap', this).each(function (i) {
					$(this).wrap('<div class="list-row"/>');
				});
			}
			$('.list-wrap', this).after('<div class="movie-details"></div>');

			if (!$('.u-loader', this).get(0)) {
				$(this).append('<div class="u-loader"></div>');
			}
		});
		$('.js-movie-list .movie-item:last-child .item-details').addClass('is--last-item');
		$('.js-movie-list .movie-item:first-child .item-details').addClass('is--first-item');
	}
	movieListSetDropDownPos();
}

function tabs() {
	$('.js-tab-link').click(function (e) {
		e.preventDefault();
		var tabName = $(this).attr('data-tab-name');

		// Mobile FAQ Layout, keep track of scroll possition.
		if (winWidth < 767 && $(this).closest('.layer-2-links').get(0)) {
			var openTabHeight = $('.is-tab[data-tab-name="' + tabName + '"].is--active').height();
			var scrollPosition = $(window).scrollTop();
			var scrollToPos = scrollPosition - openTabHeight;
		}

		$('.js-tab-link[data-tab-name="' + tabName + '"]').removeClass('is--active');
		var linkParent = $('.js-tab-link[data-tab-name="' + tabName + '"]').parent();
		$(this).addClass('is--active');

		if (linkParent.is('li')) {
			linkParent.removeClass('is--active');
			$(this).parent().addClass('is--active');
		}

		$('.is-tab[data-tab-name="' + tabName + '"]').removeClass('is--active');
		var target = $(this).attr('href');

		if (history.pushState) {
			history.pushState(null, null, target);
		} else {
			location.hash = target;
		}

		$(target).addClass('is--active');

		if ($(target).find('.js-movie-list').get(0)) {
			movieListCarousel();
		}

		// Maps
		if ($(this).closest('.c-selection-banner').get(0)) {
			setMarkerTo($(this).index());
		}

		if (winWidth < 767 && $(this).hasClass('js-tab--mob-accord')) {
			$('.is-tab[data-tab-name="' + tabName + '"]').stop().slideUp();
			$(target).stop().slideDown();

			$("html,body").stop().animate({
				scrollTop: scrollToPos
			}, 400);
		}

		var self = this;
		setTimeout(function () {
			AOS.refresh();

			var filterHeight = 0;
			if (winWidth < 768 && $('.c-movie-filters').get(0)) {
				filterHeight = $('.c-movie-filters').height();
			}

			if (!(winWidth < 768 && $(self).closest('.c-movies-list').get(0) || winWidth < 768 && $(self).closest('.c-2-layer-content').get(0))) {

				// For FAQ Page 2 layer tabs.
				if ($(self).closest('.layer-2-links').get(0)) {
					self = $('.layer-1-links a')[0];
				}

				var topScroll = $(self).offset().top;
				var elemTopSpace = parseInt($(self).css('margin-top'));
				var scrollPos = topScroll - elemTopSpace - headerHeight - filterHeight;

				if ($(self).closest('.c-selection-banner').get(0)) {
					topScroll = $('.c-maps-sec').offset().top;
					elemTopSpace = parseInt($('.c-maps-sec').css('margin-top'));
					scrollPos = topScroll - elemTopSpace - headerHeight - filterHeight;
				}

				$('html, body').stop().animate({
					scrollTop: scrollPos
				}, 500);
			}
		}, 200);
	});

	// First tab shown in mobile if its suppose to be accordian.
	if (winWidth < 767 && $('.js-tab--mob-accord').get(0)) {
		var tabMobAccName = [];
		$('.js-tab--mob-accord').each(function () {
			var thisTabName = $(this).attr('data-tab-name');
			if (!tabMobAccName.includes(thisTabName)) {
				tabMobAccName.push(thisTabName);
				var thisTarget = $(this).attr('href');
				$(thisTarget).eq(0).css('display', 'block');
			}
		});
	}
}

function js2LayerTabs() {
	$('.js-2-layer-tabs .layer-1-links a').click(function (e) {
		$(this).closest('.js-2-layer-tabs').addClass('is--active');
	});
	$('.js-2lt-back').click(function (e) {
		e.preventDefault();
		$(this).closest('.js-2-layer-tabs').removeClass('is--active');
		var thisTab = $(this).closest('.is-tab');

		setTimeout(function () {
			thisTab.removeClass('is--active');
		}, 350);
	});

	if (winWidth < 768 && $('.js-2lt-back').get(0)) {
		$('.js-2lt-back').closest('.is-tab').removeClass('is--active');
	}
}

function layerTabsAdjustment() {
	if ($('.layer-2-links').get(0) && winWidth < 768) {
		$('.layer-2-content').each(function () {
			var thisContent = this;
			$('.is-tab', this).each(function (i) {
				var links = $(thisContent).closest('.is-tab').find('.layer-2-links > ul > li:nth-child(' + (i + 1) + ')');
				$(this).appendTo(links);
			});
		});
	}
}

function sideNav() {
	$('.js-open-side-nav').click(function (e) {
		e.preventDefault();
		setBodyTopOffset();
		$('html').addClass('side-nav-is-open');
	});
	$('.js-close-side-nav').click(function (e) {
		e.preventDefault();
		$('html').removeClass('side-nav-is-open');
		setBodyToNormal();
	});
}

function selectAllEvent() {
	$('.js-select-all:not(.has-select-all-event)').click(function () {
		if ($(this).find('input').is(":checked")) {
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop("checked", false);
		} else {
			$(this).closest('.js-custom-select').find('input[type="checkbox"]').prop("checked", true);
		}
	});
	$('.js-select-all').addClass('has-select-all-event');
}

function customSelectBox() {
	/*$('.js-custom-select .js-field').on('focus', function() {
 	$(this).closest('.js-custom-select').addClass('is--active');
 	$(this).closest('.js-custom-select').addClass('is--active-now');
 	$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
 	$('.js-custom-select.is--active-now').removeClass('is--active-now');
 	
        if(winWidth > 1024){
 	  $(this).closest('.js-custom-select').find('.field-dropdown .js-field').val('').focus();
        }
 	$('html').addClass('filter-open');
 });*/
	// $('.js-custom-select .js-field').on('blur', function() {
	// $(this).closest('.js-custom-select').removeClass('is--active');
	// });

	$('.js-custom-select').each(function (i) {
		hideOnClickOutside($(this));
	});

	selectOutsideClickEvent();

	selectAllEvent();

	// for mobile
	$('.js-custom-select .field').click(function (e) {
		var self = this;
		$(this).closest('.js-custom-select').addClass('is--active');
		$(this).closest('.js-custom-select').addClass('is--active-now');
		$('.js-custom-select:not(.is--active-now)').removeClass('is--active');
		$('.js-custom-select:not(.is--active-now) .field-dropdown .scroll').slideUp();
		$('.js-custom-select.is--active-now').removeClass('is--active-now');

		$(this).closest('.js-custom-select').find('.field-dropdown .scroll').slideDown();

		if (winWidth < 768) {
			setBodyTopOffset();
		}
		$('html').addClass('filter-open');
	});

	$('.js-close-filter-m').click(function (e) {
		e.preventDefault();
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select').find('.field-dropdown .scroll').slideUp();
		$('html').removeClass('filter-open');
		setBodyToNormal();
	});

	$('.js-filter-search').click(function (e) {
		$('.js-custom-select').removeClass('is--active');
		$('.js-custom-select').find('.field-dropdown .scroll').slideUp();
		$('html').removeClass('filter-open');
		setBodyToNormal();
	});

	$(document).on('click', '.js-close-custom-select', function (e) {
		e.preventDefault();
		var thisSelect = $(this).closest('.js-custom-select');
		thisSelect.find('input[type="text"]').blur();
		thisSelect.find('.field-dropdown .scroll').slideUp(function () {
			thisSelect.removeClass('is--active');
		});
	});
}
function setBodyTopOffset() {
	if (winWidth < 768) {
		bodyTopPos = $(window).scrollTop();
		$('body').css('top', -bodyTopPos);
	}
}
function setBodyToNormal() {
	window.scrollTo(0, bodyTopPos);
}

function hideOnClickOutside(selector) {
	if (selector.hasClass('js-custom-select')) {
		$('.js-custom-select input[type="text"]').blur();
	}
}

function selectOutsideClickEvent() {

	var outsideClickListener = function outsideClickListener(event) {
		if (winWidth >= 768) {
			if (!$(event.target).closest('.js-custom-select').length) {
				$('.js-custom-select.is--active').find('.field-dropdown .scroll').slideUp(function () {
					$('.js-custom-select.is--active').removeClass('is--active');
				});
				// removeClickListener();
			}
		}
	};

	/*const removeClickListener = () => {
   document.removeEventListener('click', outsideClickListener)
 }*/
	document.addEventListener('click', outsideClickListener);
}

function scrollCustomSelect() {
	if (winWidth < 768) {
		$('.js-custom-select').each(function () {

			if ($(this).find('.scroll-area .item').length > 3 && !$(this).find('.js-custom-select--scroll-up').get(0)) {
				$(this).find('.scroll-area').after('<a href="#" class="scroll-up-arrow is--deactive js-custom-select--scroll-up"></a> <a href="#" class="scroll-down-arrow js-custom-select--scroll-down"></a>');

				$(this).find('.js-custom-select--scroll-down').click(function (e) {
					e.preventDefault();
					var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({ scrollTop: currentScrollPos + itemHeight + 'px' }, 200);
				});

				$(this).find('.js-custom-select--scroll-up').click(function (e) {
					e.preventDefault();
					var itemHeight = $(this).closest('.js-custom-select').find('.scroll-area .item').height();

					var scrollArea = $(this).closest('.js-custom-select').find('.scroll-area');
					var currentScrollPos = scrollArea.scrollTop();
					scrollArea.stop().animate({ scrollTop: currentScrollPos - itemHeight + 'px' }, 200);
				});

				$(this).find('.scroll-area').scroll(function () {
					scrollAreaScrolled(this);
				});
			}
		});
	}
}

function scrollAreaScrolled(scrollAreaRef) {
	var thisHeight = $(scrollAreaRef).height();
	var thisScrollHeight = scrollAreaRef.scrollHeight;
	var thisScrollPos = $(scrollAreaRef).scrollTop();
	var thisParent = $(scrollAreaRef).closest('.js-custom-select');
	var thisUpArrow = thisParent.find('.js-custom-select--scroll-up');
	var thisDownArrow = thisParent.find('.js-custom-select--scroll-down');

	if (thisScrollPos == 0) {
		thisUpArrow.addClass('is--deactive');
	} else {
		thisUpArrow.removeClass('is--deactive');
	}

	if (thisScrollPos + thisHeight >= thisScrollHeight) {
		thisDownArrow.addClass('is--deactive');
	} else {
		thisDownArrow.removeClass('is--deactive');
	}
}

$.fn.hasScrollBar = function () {
	return this.get(0).scrollHeight > this.height();
};

$(document).ready(function (e) {
	scrollCustomSelect();
	toSVG();
});

function movieListRemoveCarousel() {
	if ($('.js-movie-list').hasClass('slick-initialized')) {
		$('.js-movie-list:not(.js-movie-list--sty-1)').slick('unslick');
	}
}
function movieListStartCarousel() {
	$('.js-movie-list').each(function () {
		if (viewport().width < 768 && !$(this).hasClass('js-movie-list--sty-1')) {
			$('.js-movie-list .movie-item:nth-child(10) ~ .movie-item').remove();
			var movieListInfinite = false;
			if ($('.js-movie-list > *').length > 2) {
				movieListInfinite = true;
			}
			$(this).slick({
				arrows: false,
				focusOnSelect: true,
				swipeToSlide: true,
				infinite: movieListInfinite
			});
		}
	});
}
function movieListCarousel() {
	movieListRemoveCarousel();
	movieListStartCarousel();
}
var jsMovieCarouselTimmer;
function fixMobileCarouselWrongDisplay() {
	setTimeout(function () {
		$('.js-movie-list').each(function () {
			if (viewport().width < 768 && !$(this).hasClass('js-movie-list--sty-1')) {
				jsMovieCarouselTimmer = setInterval(function () {
					if (!$(this).hasClass('slick-initialized')) {
						$(' .movie-item:nth-child(10) ~ .movie-item', this).remove();
						var movieListInfinite = false;
						if ($(' > *', this).length > 2) {
							movieListInfinite = true;
						}
						$(this).slick({
							arrows: false,
							focusOnSelect: true,
							swipeToSlide: true,
							infinite: movieListInfinite
						});
					}
				}, 1000);
			}
		});
	}, 1000);
}

function toSVG() {
	$('img.svg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}

			// Replace image with new SVG
			$img.replaceWith($svg);
		}, 'xml');
	});
}

$('.js-footer-logos-carousel').imagesLoaded(function () {
	footerLogosCarousel();
});

function footerLogosCarousel(checking) {
	if (checking && $('.js-footer-logos-carousel').hasClass('slick-initialized')) {
		return;
	}

	if ($('.js-footer-logos-carousel').hasClass('slick-initialized')) {
		$('.js-footer-logos-carousel').slick('unslick');
	}

	$('.js-footer-logos-carousel').slick({
		arrows: false,
		dots: false,
		infinite: true,
		focusOnSelect: true,
		slidesToScroll: 1,
		swipeToSlide: true,
		touchThreshold: 4,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 3,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				touchThreshold: 1
			}
		}]
	});
}

function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

var isChrome = false,
    isSafari = false;
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
	if (ua.indexOf('chrome') > -1) {
		isChrome = true;
		$('html').addClass('is--chrome');
	} else {
		isSafari = true;
		$('html').addClass('is--safari');
	}
}

if (isIE) {
	$('html').addClass('is--ie');
	$('html').addClass('is--ie-' + isIE);

	$('[src*=reel-logo]').attr('src', 'assets/img/brand/logo.png');

	if ($('.c-main-banner').get(0)) {
		var itemHeight = $('.c-main-banner .item-inner').height();
		$('.c-main-banner .item-inner .txt').each(function () {
			$(this).wrapAll('<div class="item-inner-wrap"></div>');
		});

		$('.c-main-banner .item-inner .item-inner-wrap').height(itemHeight);
	}
}

function addingAOSData() {
	// if(winWidth > 1024 && isIE == false){
	// 	// Left
	// 	$('.movieheader .txt .movie-poster-detail').attr('data-aos', 'fade-left');
	// 	// Right
	// 	$('.movieheader .txt .movie-poster, .popular-heading, .logo img').attr('data-aos', 'fade-right');
	// 	// Down
	//     $('.c-main-header').attr('data-aos', 'fade-down');
	//     // Up
	//     $('.c-tabs .action, .c-banner-1 .bgimg-sec, .c-banner-1 .txt-sec .carousel, .c-content-block .img-txt-block .txt > *, .c-content-block .img-txt-block .img, .c-content-block h1, .c-offers .action, .c-offers .offers-list, .c-offers .heading-sec, .c-content-tiles, .movieheader, .c-whats-popular .sec-title, .tileview-movies-list, .c-show-list-page, .c-show-list-page .d-box-wrap, .c-show-list-page > .o-container:first-child, .list-main-action, .c-exp-views .carousel .item:first-child .txt, .c-main-footer, .c-main-footer > .o-container > .row > *, .c-exp-views, .c-movie-filters, .c-movies-list .list-tabs, .c-main-banner, .c-main-banner .main-carousel-thumb').attr('data-aos', 'fade-up');

	// 	$('.c-banner-1 .txt-sec .carousel').attr('data-aos-delay', 100);

	// 	$('.c-list-1 .list-wrap').each(function () {
	// 		$(this).find('.init-part').each(function (i) {
	// 	    	$(this).attr('data-aos', 'fade-up');
	// 	    	$(this).attr('data-aos-delay', (50*i));
	// 		});
	// 	});

	// 	$('.c-content-tiles').each(function(){
	// 		$('.txt-block > *',this).each(function (i) {
	// 	    	$(this).attr('data-aos', 'fade-up');
	// 	    	$(this).attr('data-aos-delay', (50*i));
	// 		});
	// 	});

	//     $('.c-exp-views .carousel-thumb .slick-slide').each(function (i) {
	//     	$(this).attr('data-aos', 'fade-right');
	//     	$(this).attr('data-aos-delay', (50*i));
	//     });
	// 	$('.popular-heading').attr('data-aos-delay', 300);
	// 	$('.movieheader .txt .movie-poster-detail, .movieheader .txt .movie-poster, .popular-heading').attr('data-aos-delay', 300);

	// 	$('.c-movies-list .list-wrap').each(function () {
	// 		$(this).find('.movie-item').each(function (i) {
	// 	    	$(this).attr('data-aos', 'fade-up');
	// 	    	$(this).attr('data-aos-delay', (50*i));
	// 		});
	// 	});

	// 	AOS.refresh();
	// }
}

function refreshAOS(aosFunc) {
	if (winWidth > 1024 && isIE == false) {
		if (aosFunc == 'init') {
			AOS.init({
				once: true,
				offset: 0
			});
		}
		if (aosFunc == 'refresh') {
			AOS.refresh();
		}
	}
}

function headerSpace() {
	var filterSpace = 0;
	if (winWidth < 768) {
		filterSpace = 66;
		if (winHeight <= 650) {
			filterSpace = 58;
		}
	}

	if (!$('.c-movie-filters').get(0)) {
		filterSpace = 0;
	}
	var headerHeight = $('.c-main-header').height();
	// if(headerHeight < 20){
	headerHeight = 85;
	if (winWidth <= 1800) {
		headerHeight = 83;
		if (winWidth <= 1600) {
			headerHeight = 82;
			if (winWidth <= 767) {
				headerHeight = 67;
				if (winHeight <= 650) {
					headerHeight = 57;
				}
			}
		}
	}
	// }

	$('.header-space').css('height', headerHeight + filterSpace);
}
ChangeToSvg();
function ChangeToSvg() {
	jQuery('img.tosvg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		jQuery.get(imgURL, function (data) {
			var $svg = jQuery(data).find('svg');
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' insvg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}
			$img.replaceWith($svg);
		}, 'xml');
	});
}

var popupTarget;
function openPopup(target, videoLink) {
	popupTarget = target;

	if (videoLink) {
		if (isIE == false) {
			// Destroy Plyr if there.
			/*var thisId = $(target).find('[data-video-instance]').attr('data-video-instance');
   if(players[thisId]){
   	players[thisId].destroy();
   }*/
			$(target).find('.has--plyr').removeClass('has--plyr');
		}

		$(target).find('.js-video source').attr('src', videoLink);
		var thisVideoTag = $(target).find('.js-video')[0].outerHTML;
		var parentRef = $(target).find('.js-video').parent();
		$(target).find('.js-video').remove();
		parentRef.append(thisVideoTag);

		if (isIE == false) {
			jsVideo();
		}
	}

	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function () {
		$(popupTarget).addClass('active');
		$(popupTarget).closest('.c-popup').addClass('popup--open');
		if ($(popupTarget).find('.plyr').length) {
			var videoInstance = $(popupTarget).find('.plyr').attr('data-video-instance');
			players[videoInstance].play();
		} else {
			$(popupTarget).find('.js-video')[0].play();
		}
	}, 10);

	$('html').addClass('popup-is-active');
	$(target).show();
	$(target).closest('.c-popup').show();
	setTimeout(function () {
		$(target).addClass('active');
		$(target).closest('.c-popup').addClass('popup--open');

		// Play Video
		if (winWidth > 1024 && $(target).find('.plyr').length) {
			var videoInstance = $(target).find('.js-video').attr('data-video-instance');
			if (players[videoInstance]) {
				players[videoInstance].play();
			}
		} else if ($(target).find('.js-video').length) {
			// $('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}
	}, 10);
}

function closePopup() {
	if ($('.c-popup .active').length) {
		// Pause Video In Popup
		if (winWidth > 1024 && $('.c-popup .active .plyr').length) {
			var videoInstance = $('.c-popup .active .plyr').attr('data-video-instance');
			if (players[videoInstance]) {
				players[videoInstance].pause();
			}
		} else if ($('.c-popup .active .js-video').length) {
			$('.c-popup .active .js-video')[0].pause();
			// $('.popup.active iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		}

		// Close Popup
		$('.c-popup .active').removeClass('active');
		$('.c-popup').removeClass('popup--open');
		setTimeout(function () {
			$('.c-popup .popup').hide();
			$('.c-popup').hide();
			$('html').removeClass('popup-is-active');
		}, 310);
	}
}

function addVideoPlugin() {
	if (winWidth > 1024 && $('.js-video').get(0) && isIE == false) {
		var plyrScriptElement = document.createElement("script");
		plyrScriptElement.setAttribute('src', 'assets/js/plyr.min.js');

		plyrScriptElement.setAttribute('async', 'true');
		document.body.appendChild(plyrScriptElement);
	} else {
		jsVideoDirect();
	}
}

var players = [];
var playersIndex = 0;
function jsVideo() {
	// Custom player
	if ($('.js-video:not(.has--plyr)').length) {
		$('.js-video:not(.has--plyr)').each(function (i) {
			$(this).addClass('has--plyr');
			var thisParent = $(this).parent();
			if (players[playersIndex]) {
				players[playersIndex] = new Plyr(this, {
					playsinline: true
				});
			}
			thisParent.find('.plyr').attr('data-video-instance', playersIndex);
			playersIndex++;
		});
	}
}

function jsVideoDirect() {
	/*if($('.js-video').length){
 	$('.js-video').each(function(i) {
 		$(this).attr('data-video-instance', i);
 		var videoId = $(this).attr('data-plyr-embed-id');
 		$(this).html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+videoId+'?rel=0&playsinline=1&enablejsapi=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
 	});
 }*/
}

function bindPopupEve() {
	// Popup Open
	$('.js-popup-link:not(.popup--event-binded)').click(function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		var videoLink = $(this).attr('data-video');
		openPopup(target, videoLink);
	}).addClass('popup--event-binded');

	// Popup Close
	$('.js-close-popup:not(.js-close-event-binded)').click(function (e) {
		e.preventDefault();
		closePopup();
	}).addClass('js-close-event-binded');
}

function animWrapHeight() {
	$('.anim-wrap').css('height', 'auto');
	$('.anim-wrap').removeClass('anim-wrap--ready');

	$('.anim-wrap').each(function () {
		$(this).css('height', $(this).height()).addClass('anim-wrap--ready');
	});
}

function filterSearch() {

	$('.js-custom-select .field-dropdown .js-field:not(.has--filter-func)').keyup(function () {
		var input, filter, ul, li, a, i, txtValue, selectAllElem;
		input = this;
		filter = input.value.toUpperCase();
		selectAllElem = $(input).closest('.field-dropdown').find('.js-select-all');
		selectAllInput = $(input).closest('.field-dropdown').find('.js-select-all > input');

		// Hide select all element when typing.
		if ($(input).val().length === 0) {
			selectAllElem.show();
		} else {
			selectAllElem.hide();
		}

		// Unselect "Select All" if selected all is active
		if (selectAllInput[0].checked) {
			selectAllElem.trigger('click');
		}

		ul = $(this).closest('.js-custom-select').find('.field-dropdown .scroll-area')[0];
		li = ul.getElementsByClassName("item");
		for (i = 0; i < li.length; i++) {
			a = li[i];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}

			scrollAreaScrolled($(this).closest('.js-custom-select').find('.scroll-area')[0]);
		}

		typedInFilterSearch($(this).closest('.field-dropdown'));
	});
	$('.js-custom-select .field-dropdown .js-field').addClass('has--filter-func');
}

function scrollTo() {
	$('[data-scrollto]').click(function (e) {
		e.preventDefault();
		var target = '#' + $(this).attr('data-scrollto');
		$('html, body').stop().animate({
			scrollTop: $(target).offset().top - $('.header-space').height()
		}, 500);
	});
}

function bgMobImg() {
	var sufixSelector = '-mob';
	if (winWidth >= 768) {
		sufixSelector = '';
	}
	$('[data-bgimg' + sufixSelector + ']').each(function () {
		$(this).css('backgroundImage', 'url(' + $(this).attr('data-bgimg' + sufixSelector) + ')');
	});
}

function activeHashTab() {
	var winHashVal = window.location.hash.substr(1);
	if (winHashVal) {
		$('.js-tab-link[href="#' + winHashVal + '"]').click();
	}
}

// Close Movie List Sty 1
function movieListSty1Close() {
	$('.js-movie-list.js-movie-list--sty-1 .movie-details').slideUp();
	$('.js-movie-list.js-movie-list--sty-1').removeClass('has--open-panel');

	setTimeout(function () {
		$('.js-movie-list.js-movie-list--sty-1').find('.movie-item').removeClass('is--active');
		$('.js-movie-list.js-movie-list--sty-1').find('.movie-details .item-details').remove();
		$('.js-movie-list.js-movie-list--sty-1').addClass('panel--closed');
	}, 400);
}

function movieListSty1AutoCloseEvent() {
	if ($('.js-movie-list--sty-1').get(0)) {
		$('body').click(function (event) {
			var $target = $(event.target);
			if ($target.parents('.movie-item').length == 0 && $target.parents('.item-details').length == 0) {
				movieListSty1Close();
			}
		});
	}
}
function movieListSetDropDownPos() {
	if ($('.js-movie-list--sty-1').get(0)) {
		var imgHeight = $('.js-movie-list--sty-1 .list-wrap .movie-item .img').height();
		$('.js-movie-list--sty-1 .movie-details').css('top', imgHeight);
	}
}

function clickedMovieEvent() {
	$('[data-link-to]:not("has--event-link-to")').click(function (e) {
		e.preventDefault();
		var toUrl = $(this).attr('has--event-link-to');
		if (winWidth >= 768) {
			window.location = toUrl;
		} else {}
	});
}

var locMap;
var markersRef = [];
var markerImage;
var markerImageActive;

function initMap() {
	// Styles
	var styledMapType = new google.maps.StyledMapType([{
		"elementType": "geometry",
		"stylers": [{
			"color": "#f5f5f5"
		}]
	}, {
		"elementType": "labels.icon",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#414141"
		}]
	}, {
		"elementType": "labels.text.stroke",
		"stylers": [{
			"color": "#f5f5f5"
		}, {
			"visibility": "off"
		}]
	}, {
		"featureType": "administrative.land_parcel",
		"elementType": "labels",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#bdbdbd"
		}]
	}, {
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [{
			"color": "#eeeeee"
		}]
	}, {
		"featureType": "poi",
		"elementType": "labels.text",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#757575"
		}]
	}, {
		"featureType": "poi.business",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [{
			"color": "#e5e5e5"
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#9e9e9e"
		}]
	}, {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{
			"color": "#ffffff"
		}]
	}, {
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "road.arterial",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#757575"
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [{
			"color": "#dadada"
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#616161"
		}]
	}, {
		"featureType": "road.local",
		"elementType": "labels",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#9e9e9e"
		}]
	}, {
		"featureType": "transit",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [{
			"color": "#e5e5e5"
		}]
	}, {
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [{
			"color": "#eeeeee"
		}]
	}, {
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [{
			"color": "#e0e5e9"
		}]
	}, {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#9e9e9e"
		}]
	}], { name: 'Styled Map' });

	// Marker Image
	markerImage = new google.maps.MarkerImage('http://theprojectstagingserver.com/reelcinemas/website1.2/v3/assets/img/locations/loc-marker.png', new google.maps.Size(101, 101), new google.maps.Point(0, 0), new google.maps.Point(50, 50));

	// Marker Image Active
	markerImageActive = new google.maps.MarkerImage('http://theprojectstagingserver.com/reelcinemas/website1.2/v3/assets/img/locations/loc-marker--selected.png', new google.maps.Size(101, 101), new google.maps.Point(0, 0), new google.maps.Point(50, 50));

	// Initiate Map
	var hideDefaultUi = false;
	var activeLinkIndex = $('.c-selection-banner .selectors a.is--active').index();

	if (winWidth < 768) {
		hideDefaultUi = true;
	}

	locMap = new google.maps.Map($('.js-loc-map')[0], {
		center: markers[activeLinkIndex].position,
		zoom: 16,
		disableDefaultUI: hideDefaultUi,
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
		}
	});

	// Map Style
	locMap.mapTypes.set('styled_map', styledMapType);
	locMap.setMapTypeId('styled_map');

	// Adding Marker
	var markerImgType = markerImage;
	for (var i = 0; i < markers.length; i++) {

		if (i == activeLinkIndex) {
			markerImgType = markerImageActive;
		} else {
			markerImgType = markerImage;
		}

		markersRef[i] = new google.maps.Marker({
			position: markers[i].position,
			icon: markerImgType,
			map: locMap,
			selfId: i
		});
		markersRef[i].addListener('click', function (e) {
			var index = this.selfId;
			$('.c-selection-banner .selectors a').eq(index).trigger('click');
		});
	}
}

var prevActiveMarkerIndex = 0;
function setMarkerTo(targetIndex) {
	if ((typeof google === 'undefined' ? 'undefined' : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
		// Remove Active State from Previous Marker
		markersRef[prevActiveMarkerIndex].setIcon(markerImage);

		// Set Active State on New Marker
		markersRef[targetIndex].setIcon(markerImageActive);
		prevActiveMarkerIndex = targetIndex;

		locMap.setCenter(markersRef[targetIndex].position);
	} else {
		var locTargetIndex = targetIndex;
		setTimeout(function () {
			setMarkerTo(locTargetIndex);
		}, 200);
	}
}

function locMapInit() {
	if ($('.js-loc-map').get(0)) {
		$('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhXFH3diOrb9h_znP9ndacEZ0FGfDSwas&callback=initMap" async defer></script>');
	}
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function value(valueToFind, fromIndex) {

			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			// 1. Let O be ? ToObject(this value).
			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n ≥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			function sameValueZero(x, y) {
				return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
			}

			// 7. Repeat, while k < len
			while (k < len) {
				// a. Let elementK be the result of ? Get(O, ! ToString(k)).
				// b. If SameValueZero(valueToFind, elementK) is true, return true.
				if (sameValueZero(o[k], valueToFind)) {
					return true;
				}
				// c. Increase k by 1. 
				k++;
			}

			// 8. Return false
			return false;
		}
	});
}

var keepScroll = false;
keepScroll = document.body.scrollTop;

$(window).on('click', function () {
	keepScroll;
});

function mainNavClicksForMap() {
	if ($('.c-maps-sec').get(0)) {
		$('.header-links a').click(function (e) {
			var newHash = $(this).attr('href').split('#')[1];
			if (newHash) {
				newHash = '#' + newHash;
				var tabDiv = $('.js-tab-link[href="' + newHash + '"]');
				if (tabDiv.get(0)) {
					e.preventDefault();
					if (history.pushState) {
						history.pushState(null, null, newHash);
					} else {
						location.hash = newHash;
					}
					tabDiv.trigger('click');
				}
			}
		});
	}
}

// ========================================
// Validations

// Validate Gift Card

function isNumberKey(evt) {
	var charCode = evt.which ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
	return true;
}

var cardNumber = '';
$('.js-gift-card #gift-card-number').on('input', function (e) {
	if (cardNumber != $(this).val() || $(this).val() == '') {
		removeGiftCardMsg();
	}
	cardNumber = $(this).val();
});

$('.js-dummy-input-result').click(function (e) {
	e.preventDefault();
	var randVal = Math.floor(Math.random() * 2) + 1;

	if (randVal == 1 || $('#gift-card-number').val() == '') {
		errorGiftCard();
	} else {
		successGiftCard();
	}
});

function removeGiftCardMsg() {
	$('.js-gift-card .msg').hide();
}

function errorGiftCard() {
	removeGiftCardMsg();
	$('.js-gift-card .msg--error').show();
}

function successGiftCard(amount) {
	removeGiftCardMsg();
	$('.js-gift-card .msg').hide();
	$('.js-gift-card .msg--success').show();
	if (amount) {
		$('.js-gift-card .msg--success strong').html(amount);
	} else {
		$('.js-gift-card .msg--success strong').html('XXXX');
	}
}

// Validate Email Address

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

var KITValue = '';
$('#email-keep-in-touch').on('input', function (e) {
	if (KITValue != $(this).val() || $(this).val() == '') {
		removeKITMsg();
	}
	KITValue = $(this).val();
});

$('.js-get-email .js-dummy-result').click(function (e) {
	e.preventDefault();
	var status = validateKIT();

	if (status) {
		successKIT();
	}
});

function validateKIT() {
	if (isEmail($('#email-keep-in-touch').val())) {
		return true;
	} else {
		errorKIT();
		return false;
	}
}

function removeKITMsg() {
	$('.js-get-email .msg').hide();
}

function errorKIT() {
	removeKITMsg();
	$('.js-get-email .msg--error').show();
}

function successKIT() {
	removeKITMsg();
	$('.js-get-email .msg').hide();
	$('.js-get-email .msg--success').show();
}

var heightMediaJumps = [1800, 1600, 1200, 820, 800, 780, 760, 750, 740, 720, 700, 675, 670, 660, 650, 610, 600, 590, 585, 580, 575, 570, 550, 520, 500, 400];
function heightMediaQuery() {
	var winHeightScope = winHeight;

	if (winWidth < 768) {
		winHeightScope = viewport().height;
	}

	$("html").removeClass(function (index, className) {
		return (className.match(/(^|\s)hl-\S+/g) || []).join(' ');
	});

	$("html").removeClass(function (index, className) {
		return (className.match(/(^|\s)hg-\S+/g) || []).join(' ');
	});

	for (var i = 0; i <= heightMediaJumps.length; i++) {
		if (winHeightScope <= heightMediaJumps[i]) {
			$('html').addClass('hl-' + heightMediaJumps[i]);
		}
		if (winHeightScope >= heightMediaJumps[i]) {
			$('html').addClass('hg-' + heightMediaJumps[i]);
		}
	}

	// Adjust Height CSS

	var minHeightSelctor1 = $('.height-cover--solid, .c-maps-sec .map-wrap, .c-maps-sec .txt-wrap, .height-cover, .c-exp-highlight > .o-container, .c-banner-1, .c-banner-1 .bgimg-sec .item, .c-banner-2');
	var heightSelector2 = $('.height-cover--tabs--solid, .c-2-layer-content .layer-1-content .this-row');

	minHeightSelctor1.css('min-height', winHeight - 85);

	if (winWidth <= 1800) {
		minHeightSelctor1.css('min-height', winHeight - 83);
	}
	if (winWidth <= 1600) {
		minHeightSelctor1.css('min-height', winHeight - 82);
	}
	if (winWidth <= 1023) {
		$('.c-maps-sec .txt-wrap').css('min-height', 0);
	}
	if (winWidth >= 768) {
		heightSelector2.css('height', winHeight - 168);
		if (winWidth <= 1800) {
			heightSelector2.css('height', winHeight - 83);
		}
		if (winWidth <= 1600) {
			heightSelector2.css('height', winHeight - 82);
		}
	}
	if (winWidth <= 767) {
		calcFAQHeight();
		minHeightSelctor1.css('min-height', winHeight - 67);
		$('.c-maps-sec .txt-wrap').css('min-height', 0);
		// heightSelector2.css('height', winHeight - 67);
		$('.c-side-nav .nav > *:first-child').css('margin-top', winHeight * 0.03);
		$('.c-side-nav .nav > *:last-child').css('margin-bottom', winHeight * 0.06 - 93);
		$('.c-side-nav .nav').css('height', winHeight - ($('.c-main-header').height() + 120));
		$('.c-side-nav .c-social').css('padding-top', winHeight * 0.03);
		$('.c-side-nav .c-social').css('margin-bottom', winHeight * 0.03);
		$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight - 80);
		$('.c-movie-filters .c-select-box .field-dropdown').css('height', winHeight - 118);
		$('.c-movies-list').css('min-height', winHeight - 133);
		$('.c-movies-list .list-tabs').css('margin-top', winHeight * 0.04);
		$('.c-movies-list .list-tabs').css('margin-bottom', winHeight * 0.04);
		$('.c-exp-views').css('height', winHeight - 133);
		$('.c-content-tiles .wrap-col').css('padding-top', winHeight * 0.5 - 66);
		$('.c-content-tiles .wrap-col').css('min-height', winHeight - 66);

		if (winHeight <= 750) {
			$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight - 82);
			$('.c-content-tiles .wrap-col').css('padding-top', winHeight * 0.5 - 100);
			$('.c-content-tiles .wrap-col').css('min-height', winHeight - 100);
		}
		if (winHeight <= 720) {
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight * 0.30);
		}
		if (winHeight <= 675) {
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight * 0.295);
		}
		if (winHeight <= 650) {
			minHeightSelctor1.css('min-height', winHeight - 57);
			// heightSelector2.css('height', winHeight - 57);
			$('.c-movies-list').css('min-height', winHeight - 115);
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight * 0.29);
			$('.c-exp-views').css('height', winHeight - 115);
			$('.c-content-tiles .wrap-col').css('padding-top', winHeight * 0.5 - 58);
			$('.c-content-tiles .wrap-col').css('min-height', winHeight - 58);
		}
		if (winHeight <= 610) {
			$('.c-movies-list .list-tabs').css('margin-top', winHeight * 0.03);
			$('.c-movies-list .list-tabs').css('margin-bottom', winHeight * 0.03);
		}
		if (winHeight <= 590) {
			// $('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight*0.26);
		}
		if (winHeight <= 585) {
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight * 0.26);
		}
		if (winHeight <= 550) {
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight * 0.28);
		}
		if (winHeight <= 520) {
			$('.c-movies-list .movie-lsit-wrap .movie-item .img').css('width', winHeight * 0.24);
		}
	} else {
		$('.c-main-banner .main-carousel .item .item-inner').css('height', '');
	}

	if (winWidth >= 1025) {
		if (winHeight <= 660) {
			$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight - 80);
		}
		if (winHeight <= 575) {
			$('.c-main-banner .main-carousel .item .item-inner').css('height', winHeight - 140);
		}
	}
}

function calcFAQHeight() {
	if ($('.c-2-layer-content').get(0)) {
		$('.c-2-layer-content').addClass('is--calculating');
		var links1 = $('.c-2-layer-content .layer-1-links');
		links1.height('auto');
		links1.height(links1.height());
		$('.c-2-layer-content').removeClass('is--calculating');
		setTimeout(function () {
			$('.c-2-layer-content').addClass('has--transition');
		}, 250);
	}
}

function charLimitInit() {
	$('[data-charlim]').each(function () {
		if (!$(this).hasClass('js-char-limited')) {
			var totalLimit = parseInt($(this).attr('data-charlim')),
			    thisHtml = $(this).html(),
			    wordsList = thisHtml.split(' '),
			    charCount = 0,
			    trimmedText = '';

			for (i = 0; i < wordsList.length; i++) {
				charCount += wordsList[i].length + 1;
				if (charCount < totalLimit) {
					trimmedText += wordsList[i] + ' ';
				} else {
					trimmedText += '...';
					break;
				}
			}
			$(this).html(trimmedText);
			$(this).addClass('js-char-limited');
		}
	});
}

function adjustContentList2() {
	$('.c-list-2').each(function () {
		var totalMaxLines = 8,
		    headingMaxLines = 4,
		    paraMaxLines = 4;

		$(this).find('.pad').each(function (i) {
			var thisHeading = $(this).find('h1').eq(0),
			    thisHeadingHtml,
			    thisPara = $(this).find('p').eq(0),
			    thisParaHtml,
			    extrParaLines = 0;

			if (!thisHeading[0].hasAttribute('data-content')) {
				thisHeadingHtml = thisHeading.html();
				thisParaHtml = thisPara.html();
				thisHeading.attr('data-content', thisHeadingHtml);
				thisPara.attr('data-content', thisParaHtml);
			} else {
				thisHeadingHtml = thisHeading.attr('data-content');
				thisHeading.html(thisHeadingHtml);
				thisParaHtml = thisPara.attr('data-content');
				thisPara.html(thisParaHtml);
			}

			/*var headingLH = parseInt(thisHeading.css('lineHeight').split('px')[0]),
   	headingHeight = thisHeading.outerHeight(),
   	headingLines = headingHeight / headingLH;*/

			var headingLines = calcNumberOfLines(thisHeading);

			// Number of lines Exceed for heading.
			if (headingLines > headingMaxLines) {
				// Reduce Heading Lines.
				var headingWordsList = thisHeadingHtml.split(' ');
				var newHtml = '',
				    newHtmlTemp = '';
				for (var i = 0; i < headingWordsList.length; i++) {
					newHtmlTemp += headingWordsList[i] + ' ';
					thisHeading.html(newHtmlTemp + ' ...');
					if (calcNumberOfLines(thisHeading) > headingMaxLines) {
						thisHeading.html(newHtml + ' ...');
						break;
					}
					newHtml += headingWordsList[i] + ' ';
				}
			} else if (headingLines < headingMaxLines) {
				var headingMissingLines = headingMaxLines - headingLines,
				    headingLineHeight = parseInt(thisHeading.css('lineHeight').split('px')[0]),
				    extraSpacePx = headingMissingLines * headingLineHeight,
				    paraLineHeight = parseInt(thisHeading.css('lineHeight').split('px')[0]);
				extrParaLines = extraSpacePx / paraLineHeight;
			}

			// Paragraph
			var paraLines = calcNumberOfLines(thisPara),
			    thisParaMaxLines = paraMaxLines + extrParaLines;

			if (paraLines > thisParaMaxLines) {
				// Reduce Heading Lines.
				var paraWordsList = thisParaHtml.split(' ');
				var newHtml = '',
				    newHtmlTemp = '';
				for (var i = 0; i < paraWordsList.length; i++) {
					newHtmlTemp += paraWordsList[i] + ' ';
					thisPara.html(newHtmlTemp + ' ...');
					if (calcNumberOfLines(thisPara) > thisParaMaxLines) {
						thisPara.html(newHtml + ' ...');
						break;
					}
					newHtml += paraWordsList[i] + ' ';
				}
			}
		});
	});
}
function calcNumberOfLines(target) {
	var lineHeight = parseInt(target.css('lineHeight').split('px')[0]),
	    targetHeight = target.outerHeight(),
	    numberOfLines = targetHeight / lineHeight;
	return numberOfLines;
}

function mobilecheck() {
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	isMobile = check;
}

var navDropDownHeightFirstRun = false;
function navDropDownHeight() {
	bodyHeight = winHeight - headerHeight - 40;
	$('.c-main-header .header-links > ul > li > ul').css('maxHeight', bodyHeight);
	if (navDropDownHeightFirstRun == false && winWidth > 1024) {
		navDropDownHeightFirstRun = true;
		$('.c-main-header .header-links > ul > li > ul').mCustomScrollbar({
			axis: "y",
			theme: "minimal-dark"
		});
	}
}

function removeLoaderInMob() {
	if (winWidth < 768) {
		$('.js-movie-list .u-loader').remove();
	}
}