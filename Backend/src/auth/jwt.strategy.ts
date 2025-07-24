import {  Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService){
        const secret = configService.get<string>('JWT_KEY')
        if(!secret){
            throw new Error('JWT_KEY not set in environment')
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    async validate(payload: {sub: string, email: string, role: string}){
        return {userId: payload.sub, email: payload.email, role: payload.role}
    }
}

