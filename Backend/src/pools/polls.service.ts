import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from './polls.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(Poll.name) private pollModel: Model<PollDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createPoll(
    title: string,
    options: string[],
    isPrivate: boolean,
    allowedUser: Types.ObjectId[],
    expiryTime: Date,
    createdBy: Types.ObjectId,
  ) {
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
    console.log('pollsId', pollId);
    return this.pollModel.findByIdAndDelete(pollId);
  }

  async findPublicActivePolls() {
    return await this.pollModel
      .find({
        isPrivate: false,
      })
      .exec();
  }

  async findPrivatePollForUser(userId: Types.ObjectId) {
    const objectId = new Types.ObjectId(userId);
    const response = await this.pollModel
      .find({
        isPrivate: true,
        allowedUser: { $in: [objectId] },
      })
      .exec();
    return response;
  }

  async findPollyById(pollId: string) {
    return this.pollModel.findById(pollId);
  }

  async findUserIdsByEmails(email: string[]): Promise<Types.ObjectId[]> {
    const users = await this.userModel
      .find({ email: { $in: email } })
      .select('_id');
    return users.map((user) => user._id as Types.ObjectId);
  }
}
