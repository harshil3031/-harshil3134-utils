import { generateUUID } from "../../misc/generateUUID";
import { Span } from "./SpanTypes";

export type SpanExporter = (span: Span) => void;

export class Tracer {
  private exporter: SpanExporter;

  constructor(exporter: SpanExporter) {
    this.exporter = exporter;
  }

  startSpan(name: string, attributes?: Record<string, unknown>): Span {
    const span: Span = {
      name,
      startTime: Date.now(),
      attributes,
      context: {
        traceId: generateUUID(),
        spanId: generateUUID(),
      },
      end: () => {
        span.endTime = Date.now();
        this.exporter(span);
      },
    };

    return span;
  }

  async trace<T>(
    name: string,
    fn: () => Promise<T>,
    attributes?: Record<string, unknown>
  ): Promise<T> {
    const span = this.startSpan(name, attributes);

    try {
      return await fn();
    } finally {
      span.end();
    }
  }
}