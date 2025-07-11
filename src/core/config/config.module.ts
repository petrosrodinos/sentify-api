import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';


@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`],
            ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),

    ],
    exports: [NestConfigModule],
})
export class ConfigModule { }
