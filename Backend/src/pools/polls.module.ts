import { Module } from '@nestjs/common';
import { PollService } from './polls.service';
import { PollsController } from './polls.controller';
import { Poll, PollingSchema } from './polls.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Poll.name, schema: PollingSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PollsController],
  providers: [PollService],
})
export class PollsModule {}
