import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthCheckResponse } from '../interfaces/health-check-response.interface';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('execute', () => {
    let response: HealthCheckResponse & HealthCheckResult;

    beforeAll(async () => {
      response = await healthController.execute();
    });

    it('Expect to get health status', () => {
      expect(typeof response).toBe('object');
    });
  });
});
