import { Module } from "@nestjs/common";
import { PollService } from "./polls.service";
import { PollsController } from "./polls.controller";
import { Poll, PollingSchema } from "./polls.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[MongooseModule.forFeature([{name: Poll.name, schema: PollingSchema}])],
    controllers:[PollsController],
    providers:[PollService]
})

export class PollsModule {}