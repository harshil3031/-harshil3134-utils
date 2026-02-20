import { Metric, MetricLabels } from "./MetricTypes";

export type MetricExporter = (metric: Metric) => void;

export class MetricRegistry {
  private exporter: MetricExporter;

  constructor(exporter: MetricExporter) {
    this.exporter = exporter;
  }

  counter(name: string, value = 1, labels?: MetricLabels) {
    this.exporter({
      type: "counter",
      name,
      value,
      labels,
    });
  }

  gauge(name: string, value: number, labels?: MetricLabels) {
    this.exporter({
      type: "gauge",
      name,
      value,
      labels,
    });
  }

  timing(name: string, durationMs: number, labels?: MetricLabels) {
    this.exporter({
      type: "timing",
      name,
      durationMs,
      labels,
    });
  }

  async measure<T>(
    name: string,
    fn: () => Promise<T>,
    labels?: MetricLabels
  ): Promise<T> {
    const start = performance.now?.() ?? Date.now();

    try {
      return await fn();
    } finally {
      const end = performance.now?.() ?? Date.now();
      this.timing(name, end - start, labels);
    }
  }
}