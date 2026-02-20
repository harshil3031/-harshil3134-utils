import { M as Metric } from './MetricTypes-CZ2Z0Dqq.js';

interface SpanContext {
    traceId: string;
    spanId: string;
}
interface Span {
    name: string;
    startTime: number;
    endTime?: number | undefined;
    attributes?: Record<string, unknown> | undefined;
    context: SpanContext;
    end: () => void;
}

type SpanExporter = (span: Span) => void;
declare class Tracer {
    private exporter;
    constructor(exporter: SpanExporter);
    startSpan(name: string, attributes?: Record<string, unknown>): Span;
    trace<T>(name: string, fn: () => Promise<T>, attributes?: Record<string, unknown>): Promise<T>;
}

declare function createOTelMetricExporter(otelMeter: any): (metric: Metric) => void;

declare function createOTelSpanExporter(otelTracer: any): (span: Span) => void;

export { type Span, type SpanContext, type SpanExporter, Tracer, createOTelMetricExporter, createOTelSpanExporter };
