// src/misc/generateUUID.ts
function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}

// src/observability/tracing/Tracer.ts
var Tracer = class {
  constructor(exporter) {
    this.exporter = exporter;
  }
  startSpan(name, attributes) {
    const span = {
      name,
      startTime: Date.now(),
      attributes,
      context: {
        traceId: generateUUID(),
        spanId: generateUUID()
      },
      end: () => {
        span.endTime = Date.now();
        this.exporter(span);
      }
    };
    return span;
  }
  async trace(name, fn, attributes) {
    const span = this.startSpan(name, attributes);
    try {
      return await fn();
    } finally {
      span.end();
    }
  }
};

// src/observability/opentelemetry/OTelMetricExporter.ts
function createOTelMetricExporter(otelMeter) {
  return (metric) => {
    if (metric.type === "counter") {
      const counter = otelMeter.createCounter(metric.name);
      counter.add(metric.value, metric.labels);
    }
    if (metric.type === "gauge") {
      const gauge = otelMeter.createUpDownCounter(metric.name);
      gauge.add(metric.value, metric.labels);
    }
    if (metric.type === "timing") {
      const histogram = otelMeter.createHistogram(metric.name);
      histogram.record(metric.durationMs, metric.labels);
    }
  };
}

// src/observability/opentelemetry/OTelTracerBridge.ts
function createOTelSpanExporter(otelTracer) {
  return (span) => {
    const otelSpan = otelTracer.startSpan(span.name);
    if (span.attributes) {
      for (const key in span.attributes) {
        otelSpan.setAttribute(key, span.attributes[key]);
      }
    }
    otelSpan.end();
  };
}

export { Tracer, createOTelMetricExporter, createOTelSpanExporter };
//# sourceMappingURL=observability.js.map
//# sourceMappingURL=observability.js.map