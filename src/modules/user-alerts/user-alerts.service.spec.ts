import { Test, TestingModule } from '@nestjs/testing';
import { UserAlertsService } from './user-alerts.service';

describe('UserAlertsService', () => {
  let service: UserAlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAlertsService],
    }).compile();

    service = module.get<UserAlertsService>(UserAlertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
