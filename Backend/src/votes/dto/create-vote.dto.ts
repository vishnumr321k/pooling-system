import { IsNotEmpty } from 'class-validator';

export class createVoteDto {
  @IsNotEmpty()
  pollId: string;

  @IsNotEmpty()
  selectedOption: string;
}
