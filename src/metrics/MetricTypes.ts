export type MetricLabels = Record<string, string | number>;

export interface CounterMetric {
  type: "counter";
  name: string;
  value: number;
  labels?: MetricLabels | undefined;
}

export interface GaugeMetric {
  type: "gauge";
  name: string;
  value: number;
  labels?: MetricLabels | undefined;
}

export interface TimingMetric {
  type: "timing";
  name: string;
  durationMs: number;
  labels?: MetricLabels | undefined;
}

export type Metric = CounterMetric | GaugeMetric | TimingMetric;