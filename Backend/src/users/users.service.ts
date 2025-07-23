import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {User, UserDocument} from './user.schema';
import { Model } from "mongoose";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>,
    ) {}

    async createUser(name: string, email: string, password: string, role: string) : Promise<User> {
        const createUser = new this.userModel({name, email, password, role});
        return createUser.save();
    }

    async findByEmail(email: string) : Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec();
    }
}

