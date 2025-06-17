
import { IsString } from 'class-validator';

export class XAuthCallbackDto {
    @IsString()
    code: string;

    @IsString()
    state: string;

    @IsString()
    redirect_url: string;
}