'use strict';

// src/metrics/MetricRegistry.ts
var MetricRegistry = class {
  constructor(exporter) {
    this.exporter = exporter;
  }
  counter(name, value = 1, labels) {
    this.exporter({
      type: "counter",
      name,
      value,
      labels
    });
  }
  gauge(name, value, labels) {
    this.exporter({
      type: "gauge",
      name,
      value,
      labels
    });
  }
  timing(name, durationMs, labels) {
    this.exporter({
      type: "timing",
      name,
      durationMs,
      labels
    });
  }
  async measure(name, fn, labels) {
    var _a, _b, _c, _d;
    const start = (_b = (_a = performance.now) == null ? void 0 : _a.call(performance)) != null ? _b : Date.now();
    try {
      return await fn();
    } finally {
      const end = (_d = (_c = performance.now) == null ? void 0 : _c.call(performance)) != null ? _d : Date.now();
      this.timing(name, end - start, labels);
    }
  }
};

// src/metrics/ConsoleMetricExporter.ts
var ConsoleMetricExporter = (metric) => {
  console.log("METRIC:", JSON.stringify(metric));
};

// src/metrics/createMetrics.ts
function createMetrics(options) {
  var _a;
  return new MetricRegistry(
    (_a = options == null ? void 0 : options.exporter) != null ? _a : ConsoleMetricExporter
  );
}

exports.ConsoleMetricExporter = ConsoleMetricExporter;
exports.MetricRegistry = MetricRegistry;
exports.createMetrics = createMetrics;
//# sourceMappingURL=metrics.js.map
//# sourceMappingURL=metrics.js.map