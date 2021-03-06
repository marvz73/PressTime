! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["angular", "chart.js"], t) : "object" == typeof exports ? module.exports = t(require("angular"), require("chart.js")) : t(angular, Chart)
}(function(t, e) {
    "use strict";

    function n() {
        var n = {},
            r = {
                Chart: e,
                getOptions: function(e) {
                    var r = e && n[e] || {};
                    return t.extend({}, n, r)
                }
            };
        this.setOptions = function(e, r) {
            return r ? (n[e] = t.extend(n[e] || {}, r), void 0) : (r = e, n = t.extend(n, r), void 0)
        }, this.$get = function() {
            return r
        }
    }

    function r(n, r) {
        function o(t, e) {
            return t && e && t.length && e.length ? Array.isArray(t[0]) ? t.length === e.length && t.every(function(t, n) {
                return t.length === e[n].length
            }) : e.reduce(i, 0) > 0 ? t.length === e.length : !1 : !1
        }

        function i(t, e) {
            return t + e
        }

        function c(t, e, n) {
            return function(r) {
                var a = e.getPointsAtEvent || e.getBarsAtEvent || e.getSegmentsAtEvent;
                if (a) {
                    var o = a.call(e, r);
                    t[n](o, r), t.$apply()
                }
            }
        }

        function l(r, a) {
            for (var o = t.copy(a.colours || n.getOptions(r).colours || e.defaults.global.colours); o.length < a.data.length;) o.push(a.getColour());
            return o.map(u)
        }

        function u(t) {
            return "object" == typeof t && null !== t ? t : "string" == typeof t && "#" === t[0] ? f(g(t.substr(1))) : s()
        }

        function s() {
            var t = [h(0, 255), h(0, 255), h(0, 255)];
            return f(t)
        }

        function f(t) {
            return {
                fillColor: d(t, .2),
                strokeColor: d(t, 1),
                pointColor: d(t, 1),
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: d(t, .8)
            }
        }

        function h(t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        }

        function d(t, e) {
            return a ? "rgb(" + t.join(",") + ")" : "rgba(" + t.concat(e).join(",") + ")"
        }

        function g(t) {
            var e = parseInt(t, 16),
                n = e >> 16 & 255,
                r = e >> 8 & 255,
                a = 255 & e;
            return [n, r, a]
        }

        function p(e, n, r, a) {
            return {
                labels: e,
                datasets: n.map(function(e, n) {

                    return t.extend({}, a[n], {
                        label: r[n],
                        data: e
                    })
                })
            }
        }

        function v(e, n, r) {
            return e.map(function(e, a) {
                return t.extend({}, r[a], {
                    label: e,
                    value: n[a],
                    color: r[a].strokeColor,
                    highlight: r[a].pointHighlightStroke
                })
            })
        }

        function y(t, e) {
            var n = t.parent(),
                r = n.find("chart-legend"),
                a = "<chart-legend>" + e.generateLegend() + "</chart-legend>";
            r.length ? r.replaceWith(a) : n.append(a)
        }

        function C(t, e, n, r) {
            Array.isArray(n.data[0]) ? t.datasets.forEach(function(t, n) {
                (t.points || t.bars).forEach(function(t, r) {
                    t.value = e[n][r]
                })
            }) : t.segments.forEach(function(t, n) {
                t.value = e[n]
            }), t.update(), n.$emit("update", t), n.legend && "false" !== n.legend && y(r, t)
        }

        function m(t) {
            return !t || Array.isArray(t) && !t.length || "object" == typeof t && !Object.keys(t).length
        }

        function b(r, a) {
            var o = t.extend({}, e.defaults.global, n.getOptions(r), a.options);
            return o.responsive
        }
        return function(e) {
            return {
                restrict: "CA",
                scope: {
                    data: "=",
                    labels: "=",
                    options: "=",
                    series: "=",
                    colours: "=?",
                    getColour: "=?",
                    chartType: "=",
                    legend: "@",
                    click: "=",
                    hover: "="
                },
                link: function(i, u) {
                    function f(n, r) {
                        if (!m(n) && !t.equals(n, r)) {
                            var a = e || i.chartType;
                            a && (d && d.destroy(), h(a))
                        }
                    }

                    function h(e) {
                        if (b(e, i) && 0 === u[0].clientHeight && 0 === g.clientHeight) return r(function() {
                            h(e)
                        }, 50);
                        if (i.data && i.data.length) {
                            i.getColour = "function" == typeof i.getColour ? i.getColour : s, i.colours = l(e, i);
                            var a = u[0],
                                o = a.getContext("2d"),
                                f = Array.isArray(i.data[0]) ? p(i.labels, i.data, i.series || [], i.colours) : v(i.labels, i.data, i.colours),
                                C = t.extend({}, n.getOptions(e), i.options);
                            d = new n.Chart(o)[e](f, C), i.$emit("create", d), ["hover", "click"].forEach(function(t) {
                                i[t] && (a["click" === t ? "onclick" : "onmousemove"] = c(i, d, t))
                            }), i.legend && "false" !== i.legend && y(u, d)
                        }
                    }
                    var d, g = document.createElement("div");
                    g.className = "chart-container", u.replaceWith(g), g.appendChild(u[0]), a && window.G_vmlCanvasManager.initElement(u[0]), i.$watch("data", function(t, n) {
                        if (t && t.length && (!Array.isArray(t[0]) || t[0].length)) {
                            var r = e || i.chartType;
                            if (r) {
                                if (d) {
                                    if (o(t, n)) return C(d, t, i, u);
                                    d.destroy()
                                }
                                h(r)
                            }
                        }
                    }, !0), i.$watch("series", f, !0), i.$watch("labels", f, !0), i.$watch("options", f, !0), i.$watch("colours", f, !0), i.$watch("chartType", function(e, n) {
                        m(e) || t.equals(e, n) || (d && d.destroy(), h(e))
                    }), i.$on("$destroy", function() {
                        d && d.destroy()
                    })
                }
            }
        }
    }
    e.defaults.global.responsive = !0, e.defaults.global.multiTooltipTemplate = "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>", e.defaults.global.colours = ["#97BBCD", "#DCDCDC", "#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"];
    var a = "object" == typeof window.G_vmlCanvasManager && null !== window.G_vmlCanvasManager && "function" == typeof window.G_vmlCanvasManager.initElement;
    a && (e.defaults.global.animation = !1), t.module("chart.js", []).provider("ChartJs", n).factory("ChartJsFactory", ["ChartJs", "$timeout", r]).directive("chartBase", ["ChartJsFactory", function(t) {
        return new t
    }]).directive("chartLine", ["ChartJsFactory", function(t) {
        return new t("Line")
    }]).directive("chartBar", ["ChartJsFactory", function(t) {
        return new t("Bar")
    }]).directive("chartRadar", ["ChartJsFactory", function(t) {
        return new t("Radar")
    }]).directive("chartDoughnut", ["ChartJsFactory", function(t) {
        return new t("Doughnut")
    }]).directive("chartPie", ["ChartJsFactory", function(t) {
        return new t("Pie")
    }]).directive("chartPolarArea", ["ChartJsFactory", function(t) {
        return new t("PolarArea")
    }])
});
//# sourceMappingURL=angular-chart.min.js.map