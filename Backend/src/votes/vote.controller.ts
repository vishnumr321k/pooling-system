import { Controller, Param, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { createVoteDto } from "./dto/create-vote.dto";
import {Request} from 'express';


@Controller('vote')
@UseGuards(JwtAuthGuard)
export class  VoteController{
    constructor(
        private readonly voteService: VoteService
    ){}

    @Post()
    async Vote(@Body() dto: createVoteDto, @Req() req: Request){
        const user = req.user as any;
        console.log('dto.pollId:', dto.pollId);
        console.log('dto.selectedOption:', dto.selectedOption);
        return this.voteService.vote(dto.pollId, user.userId, dto.selectedOption);
    }

    @Get('result/:pollId')
    async getResult(@Param('pollId') pollId: string){
        return this.voteService.getResult(pollId);
    }
}