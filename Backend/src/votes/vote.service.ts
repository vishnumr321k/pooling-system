import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vote, VoteDocument } from './vote.schema';
import { Poll, PollDocument } from 'src/pools/polls.schema';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote.name) private voteModel: Model<VoteDocument>,
    @InjectModel(Poll.name) private pollModel: Model<PollDocument>,
  ) {}

  async vote(pollId: string, userId: string, selectedOption: string) {
    const poll = await this.pollModel.findById(pollId);
    if (!poll) {
      throw new NotFoundException('The Poll not find...🥲');
    }

    if (poll.expiryTime.getTime() < Date.now()) {
      throw new BadRequestException('Poll has expired...🥲');
    }
    console.log('selectOption:', selectedOption);
    if (!poll.options.includes(selectedOption)) {
      throw new BadRequestException('You Selected option is invalid...🥲');
    }
    console.log('pollId:', pollId);
    console.log('userId:', userId);
    console.log('selectedOption:', selectedOption);
    const existingVote = await this.voteModel.findOne({ pollId, userId });
    console.log('existingVote:', existingVote);
    if (existingVote) {
      throw new BadRequestException('You already voted in this poll...😶‍🌫️');
    }

    const vote = new this.voteModel({ pollId, userId, selectedOption });
    return vote.save();
  }

  async getResult(pollId: string) {
    const votes = await this.voteModel.find({ pollId });

    const result = {};
    votes.forEach((vote) => {
      result[vote.selectedOption] = (result[vote.selectedOption] || 0) + 1;
    });

    return result;
  }

  async hasUserVoted(pollId: string, userId: string) {
    const vote = await this.voteModel.findOne({ pollId, userId });
    return { hasVoted: !!vote }; // returns { hasVoted: true } or { hasVoted: false }
  }
}
