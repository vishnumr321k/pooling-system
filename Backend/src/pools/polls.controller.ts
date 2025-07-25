import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { PollService } from './polls.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/roles.decorator';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Request } from 'express';
import { title } from 'process';
import { use } from 'passport';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Post('create')
  async create(@Body() dto: CreatePollDto, @Req() req: Request) {
    console.log('Endha mone... ene vilicho.')
    const user = req.user as any;
console.log('user:', user);
    return this.pollService.createPoll(
      dto.title,
      dto.options,
      dto.isPrivate,
      dto.allowedUsers ?? [],
      new Date(dto.expiryTime),
      user.userId,
    );
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdatePollDto) {
    return this.pollService.updatePoll(id, dto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.pollService.deletePoll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('public')
  async getPublic() {
    return this.pollService.findPublicActivePolls();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPollById(@Param('id') id:string){
    return this.pollService.findPollyById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  async getPrivate(@Req() req: Request) {
    const user = req.user as any;
    return this.pollService.findPrivatePollForUser(user.userId);
  }
}
