import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

export type VoteDocument = Vote & Document;

@Schema({timestamps: true})
export class Vote{
    @Prop({type: Types.ObjectId, ref: 'Poll', required: true})
    pollId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    userId: Types.ObjectId;

    @Prop({required: true})
    selectedOption: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);