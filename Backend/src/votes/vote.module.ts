import { Module } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Vote, VoteSchema } from "./vote.schema";
import { Poll, PollingSchema } from "src/pools/polls.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Vote.name, schema: VoteSchema},
            {name: Poll.name, schema: PollingSchema}
        ])
    ],
    controllers:[VoteController],
    providers: [VoteService]
})

export class VoteModule {}