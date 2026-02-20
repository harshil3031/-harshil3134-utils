type MetricLabels = Record<string, string | number>;
interface CounterMetric {
    type: "counter";
    name: string;
    value: number;
    labels?: MetricLabels | undefined;
}
interface GaugeMetric {
    type: "gauge";
    name: string;
    value: number;
    labels?: MetricLabels | undefined;
}
interface TimingMetric {
    type: "timing";
    name: string;
    durationMs: number;
    labels?: MetricLabels | undefined;
}
type Metric = CounterMetric | GaugeMetric | TimingMetric;

export type { CounterMetric as C, GaugeMetric as G, Metric as M, TimingMetric as T, MetricLabels as a };
