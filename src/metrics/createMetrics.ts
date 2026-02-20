import { MetricRegistry } from "./MetricRegistry";
import { ConsoleMetricExporter } from "./ConsoleMetricExporter";
import { MetricExporter } from "./MetricRegistry";

export function createMetrics(options?: {
  exporter?: MetricExporter;
}) {
  return new MetricRegistry(
    options?.exporter ?? ConsoleMetricExporter
  );
}