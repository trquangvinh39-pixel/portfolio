// Biểu đồ SVG nhỏ, không cần thư viện: cột, đường, cột chồng.
window.PF = window.PF || {};

(function () {
  var NS = 'http://www.w3.org/2000/svg';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  // Giá trị đỉnh trục tròn, chia 4 vạch đẹp (1, 1.2, 1.6, 2, 3, 4, 6, 8 × 10^n)
  function niceMax(v) {
    if (v <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    var m = v / p, steps = [1, 1.2, 1.6, 2, 3, 4, 6, 8, 10];
    for (var i = 0; i < steps.length; i++) if (m <= steps[i] + 1e-9) return steps[i] * p;
    return 10 * p;
  }

  function frame(o) {
    var w = o.w || 640, h = o.h || 260, pad = Object.assign({ t: 14, r: 12, b: 30, l: 48 }, o.pad || {});
    return { w: w, h: h, pad: pad, iw: w - pad.l - pad.r, ih: h - pad.t - pad.b };
  }

  function yAxis(f, min, max, fmt, ticks) {
    var s = '';
    ticks = ticks || 4;
    for (var i = 0; i <= ticks; i++) {
      var v = min + (max - min) * i / ticks;
      var y = f.pad.t + f.ih - (v - min) / (max - min) * f.ih;
      s += '<line class="gl" x1="' + f.pad.l + '" x2="' + (f.w - f.pad.r) + '" y1="' + y + '" y2="' + y + '"/>';
      s += '<text x="' + (f.pad.l - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + esc(fmt(v)) + '</text>';
    }
    return s;
  }

  // data: [{label, value, color?, title?}]
  function bars(o) {
    var f = frame(o), d = o.data, fmt = o.fmt || String;
    var vals = d.map(function (x) { return x.value; });
    var max = niceMax(Math.max.apply(null, vals.concat([o.minMax || 0])));
    var bw = f.iw / d.length, gap = Math.min(bw * .28, 10);
    var s = '<svg class="chart" viewBox="0 0 ' + f.w + ' ' + f.h + '" role="img" aria-label="' + esc(o.aria || '') + '">';
    s += yAxis(f, 0, max, fmt);
    var every = Math.ceil(d.length / (o.maxLabels || 16));
    d.forEach(function (x, i) {
      var bh = Math.max(0, x.value / max * f.ih), X = f.pad.l + i * bw + gap / 2, Y = f.pad.t + f.ih - bh;
      s += '<rect x="' + X + '" y="' + Y + '" width="' + Math.max(1, bw - gap) + '" height="' + bh + '" rx="' + Math.min(4, (bw - gap) / 3) + '" fill="' + (x.color || 'var(--accent)') + '"><title>' + esc(x.title || (x.label + ': ' + fmt(x.value))) + '</title></rect>';
      if (i % every === 0) s += '<text x="' + (X + (bw - gap) / 2) + '" y="' + (f.h - f.pad.b + 16) + '" text-anchor="middle">' + esc(x.label) + '</text>';
    });
    if (o.refLine != null) {
      var ry = f.pad.t + f.ih - o.refLine / max * f.ih;
      s += '<line x1="' + f.pad.l + '" x2="' + (f.w - f.pad.r) + '" y1="' + ry + '" y2="' + ry + '" stroke="var(--amber)" stroke-width="2" stroke-dasharray="6 4"/>';
      if (o.refLabel) s += '<text x="' + (f.w - f.pad.r) + '" y="' + (ry - 6) + '" text-anchor="end" style="fill:var(--amber)">' + esc(o.refLabel) + '</text>';
    }
    s += '<line class="ax" x1="' + f.pad.l + '" x2="' + (f.w - f.pad.r) + '" y1="' + (f.pad.t + f.ih) + '" y2="' + (f.pad.t + f.ih) + '"/>';
    return s + '</svg>';
  }

  // series: [{name, color, values:[number], dash?, area?, step?}], labels: [string]
  function lines(o) {
    var f = frame(o), fmt = o.fmt || String, labels = o.labels;
    var all = [];
    o.series.forEach(function (sr) { all = all.concat(sr.values); });
    var min = o.min != null ? o.min : Math.min(0, Math.min.apply(null, all));
    var max = niceMax(Math.max.apply(null, all.concat([o.minMax || 0])));
    if (min < 0) min = -niceMax(-min);
    var n = labels.length;
    function X(i) { return f.pad.l + (n === 1 ? f.iw / 2 : i / (n - 1) * f.iw); }
    function Y(v) { return f.pad.t + f.ih - (v - min) / (max - min) * f.ih; }
    var s = '<svg class="chart" viewBox="0 0 ' + f.w + ' ' + f.h + '" role="img" aria-label="' + esc(o.aria || '') + '">';
    s += yAxis(f, min, max, fmt);
    if (min < 0) s += '<line x1="' + f.pad.l + '" x2="' + (f.w - f.pad.r) + '" y1="' + Y(0) + '" y2="' + Y(0) + '" stroke="var(--muted)" stroke-width="1"/>';
    var every = Math.ceil(n / (o.maxLabels || 12));
    labels.forEach(function (l, i) {
      if (i % every === 0 || i === n - 1) s += '<text x="' + X(i) + '" y="' + (f.h - f.pad.b + 16) + '" text-anchor="middle">' + esc(l) + '</text>';
    });
    if (o.marker != null) {
      s += '<line x1="' + X(o.marker) + '" x2="' + X(o.marker) + '" y1="' + f.pad.t + '" y2="' + (f.pad.t + f.ih) + '" stroke="var(--amber)" stroke-width="1.5" stroke-dasharray="4 4"/>';
      if (o.markerLabel) s += '<text x="' + (X(o.marker) + 6) + '" y="' + (f.pad.t + 12) + '" style="fill:var(--amber)">' + esc(o.markerLabel) + '</text>';
    }
    o.series.forEach(function (sr) {
      var pts = '';
      sr.values.forEach(function (v, i) {
        if (sr.step && i > 0) pts += X(i) + ',' + Y(sr.values[i - 1]) + ' ';
        pts += X(i) + ',' + Y(v) + ' ';
      });
      if (sr.area) s += '<polygon points="' + X(0) + ',' + Y(Math.max(min, 0)) + ' ' + pts + X(n - 1) + ',' + Y(Math.max(min, 0)) + '" fill="' + sr.color + '" opacity=".14"/>';
      s += '<polyline points="' + pts + '" fill="none" stroke="' + sr.color + '" stroke-width="' + (sr.width || 2.5) + '" stroke-linejoin="round"' + (sr.dash ? ' stroke-dasharray="' + sr.dash + '"' : '') + '/>';
      if (sr.dots) sr.values.forEach(function (v, i) {
        s += '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="3.5" fill="' + sr.color + '"><title>' + esc(labels[i] + ' · ' + sr.name + ': ' + fmt(v)) + '</title></circle>';
      });
    });
    return s + '</svg>';
  }

  function legend(items) {
    return '<div class="legend">' + items.map(function (x) {
      return '<span><i style="background:' + x.color + '"></i>' + esc(x.name) + '</span>';
    }).join('') + '</div>';
  }

  PF.chart = { bars: bars, lines: lines, legend: legend, esc: esc, niceMax: niceMax, NS: NS };
})();
