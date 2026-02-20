import type { Span } from "../tracing/SpanTypes";

export function createOTelSpanExporter(otelTracer: any) {
  return (span: Span) => {
    const otelSpan = otelTracer.startSpan(span.name);

    if (span.attributes) {
      for (const key in span.attributes) {
        otelSpan.setAttribute(key, span.attributes[key]);
      }
    }

    otelSpan.end();
  };
}