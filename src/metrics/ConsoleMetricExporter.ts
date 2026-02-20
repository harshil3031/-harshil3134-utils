import { Metric } from "./MetricTypes";

export const ConsoleMetricExporter = (metric: Metric) => {
  console.log("METRIC:", JSON.stringify(metric));
};