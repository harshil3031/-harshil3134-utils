export interface SpanContext {
  traceId: string;
  spanId: string;
}

export interface Span {
  name: string;
  startTime: number;
  endTime?: number | undefined;
  attributes?: Record<string, unknown> | undefined;
  context: SpanContext;
  end: () => void;
}