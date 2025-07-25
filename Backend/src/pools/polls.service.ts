import {
  Injectable,
  ForbiddenException,
  NotAcceptableException,
  Type,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from './polls.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PollService {
  constructor(@InjectModel(Poll.name) private pollModel: Model<PollDocument>) {}

  async createPoll(
    title: string,
    options: string[],
    isPrivate: boolean,
    allowedUser: Types.ObjectId[],
    expiryTime: Date,
    createdBy: Types.ObjectId,
  ) {
    // if (new Date(expiryTime).getTime() - Date.now() > 2 * 60 * 60 * 100) {
    //   throw new ForbiddenException(
    //     'poll duration canot visible more than 2 hours',
    //   );
    // }

    const poll = new this.pollModel({
      title,
      options,
      isPrivate,
      allowedUser,
      expiryTime,
      createdBy,
    });
    return poll.save();
  }

  async updatePoll(pollId: string, updateData: Partial<Poll>) {
    
    const poll = await this.pollModel.findById(pollId);
    
    if (!poll) {
      throw new NotAcceptableException('Poll not found');
    }

    if (poll.expiryTime.getTime() < Date.now()) {
      throw new NotAcceptableException('Cannot edit expired poll');
    }
    
    Object.assign(poll, updateData);
   
    return poll.save();
  }

  async deletePoll(pollId: string) {
    console.log('pollsId', pollId)
    return this.pollModel.findByIdAndDelete(pollId);
  }

  async findPublicActivePolls() {
    return this.pollModel.find({
      isPrivate: false,
      expiryTime: { $gt: new Date() },
    });
  }

  async findPrivatePollForUser(userId: Types.ObjectId) {
    return this.pollModel.find({
      isPrivate: true,
      allowedUser: userId,
      expiryTime: { $gt: new Date() },
    });
  }

  async findPollyById(pollId: string){
    return this.pollModel.findById(pollId);
  }
}
