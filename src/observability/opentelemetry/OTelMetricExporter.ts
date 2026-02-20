import type { Metric } from "../../metrics/MetricTypes";

export function createOTelMetricExporter(otelMeter: any) {
  return (metric: Metric) => {
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