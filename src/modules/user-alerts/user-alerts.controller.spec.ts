import { Test, TestingModule } from '@nestjs/testing';
import { UserAlertsController } from './user-alerts.controller';
import { UserAlertsService } from './user-alerts.service';

describe('UserAlertsController', () => {
  let controller: UserAlertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAlertsController],
      providers: [UserAlertsService],
    }).compile();

    controller = module.get<UserAlertsController>(UserAlertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
