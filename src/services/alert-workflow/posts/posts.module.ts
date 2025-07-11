import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TwitterIntegrationModule } from '@/integrations/social-media/twitter/twitter.module';

@Module({
    imports: [TwitterIntegrationModule],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule { }