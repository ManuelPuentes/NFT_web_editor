export interface HealthCheckResponse {
  'node-version': string;
  cpu: NodeJS.CpuUsage;
  memory: NodeJS.MemoryUsage;
  pid: number;
  uptime: number;
}
