import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './spp.controller';
import { AuthModule } from './auth/auth.module';
import { PollsModule } from './pools/polls.module';
import { VoteModule } from './votes/vote.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI') || '',
      }),
    }),
    AuthModule,
    PollsModule,
    VoteModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
