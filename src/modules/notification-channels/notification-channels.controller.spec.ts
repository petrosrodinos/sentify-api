import { Test, TestingModule } from '@nestjs/testing';
import { NotificationChannelsController } from './notification-channels.controller';
import { NotificationChannelsService } from './notification-channels.service';

describe('NotificationChannelsController', () => {
  let controller: NotificationChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationChannelsController],
      providers: [NotificationChannelsService],
    }).compile();

    controller = module.get<NotificationChannelsController>(NotificationChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
