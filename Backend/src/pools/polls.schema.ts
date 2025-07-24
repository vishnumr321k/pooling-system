import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types } from "mongoose";


export type PollDocument = Poll & Document;


@Schema({timestamps: true})
export class Poll{
    @Prop({required: true})
    title: string;

    @Prop({required: true, type: [String]})
    options: string[];

    @Prop({default: false})
    isPrivate: boolean;

    @Prop({type:[Types.ObjectId], ref: 'User'})
    allowedUser: Types.ObjectId[];

    @Prop({required: true})
    expiryTime: Date;

    @Prop({type:[Types.ObjectId], ref: 'User', required: true})
    createdBy: Types.ObjectId;

}

export const PollingSchema = SchemaFactory.createForClass(Poll);