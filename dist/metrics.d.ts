import { M as Metric, a as MetricLabels } from './MetricTypes-CZ2Z0Dqq.js';
export { C as CounterMetric, G as GaugeMetric, T as TimingMetric } from './MetricTypes-CZ2Z0Dqq.js';

type MetricExporter = (metric: Metric) => void;
declare class MetricRegistry {
    private exporter;
    constructor(exporter: MetricExporter);
    counter(name: string, value?: number, labels?: MetricLabels): void;
    gauge(name: string, value: number, labels?: MetricLabels): void;
    timing(name: string, durationMs: number, labels?: MetricLabels): void;
    measure<T>(name: string, fn: () => Promise<T>, labels?: MetricLabels): Promise<T>;
}

declare function createMetrics(options?: {
    exporter?: MetricExporter;
}): MetricRegistry;

declare const ConsoleMetricExporter: (metric: Metric) => void;

export { ConsoleMetricExporter, Metric, type MetricExporter, MetricLabels, MetricRegistry, createMetrics };
