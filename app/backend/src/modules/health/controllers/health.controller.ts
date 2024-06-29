import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

import { HealthCheckResponse } from '../interfaces/health-check-response.interface';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  @Version(VERSION_NEUTRAL)
  async execute(): Promise<HealthCheckResponse & HealthCheckResult> {
    const result = await this.health.check([]);
    return {
      'node-version': process.version,
      cpu: process.cpuUsage(),
      memory: process.memoryUsage(),
      pid: process.pid,
      uptime: process.uptime(),
      ...result,
    };
  }
}
