import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/auth/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';
import { SessionToken } from '../../entity/auth/session.entity';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(SessionToken) private sessionTokenRepo: Repository<SessionToken>
    ) { }
    async login(loginDTO: LoginDTO) {
        const user = await this.userRepo.findOne({
            where: { username: loginDTO.username },
        });

        if (!user || !(await argon2.verify(user.passwordHash, loginDTO.password))) {
            throw new UnauthorizedException();
        }

        // User gefunden und Passwort richtig => SessionToken ausstellen

        const token = randomBytes(32).toString('base64url');

        const tokenHash = createHash('sha256')
            .update(token)
            .digest('hex');

        const expiresAt = new Date(Date.now() + 1000 * 60 * 24 * 30)
        const tokenEntry = this.sessionTokenRepo.create(
            {
                tokenHash: tokenHash,
                expiresAt: expiresAt,
                user: user
            }
        )
        await this.sessionTokenRepo.save(tokenEntry);
        return { token, expiresAt }
    }

    async register(username: string, password: string) {

        const passwordHash = await argon2.hash(password, {
            type: argon2.argon2id,
        });

        const user = this.userRepo.create({
            username: username,
            passwordHash: passwordHash,
        });

        await this.userRepo.save(user);
    }

    async registerEnvUser() {
        const adminPW = this.configService.get('ADMIN_PW')

        const adminUser = await this.userRepo.findOne(
            {
                where: {
                    username: "admin"
                }
            }
        )

        if (adminUser && await argon2.verify(adminUser?.passwordHash || "", adminPW)) {
            // Fall A: Es gibt admin benutzer schon und passwort nicht geänder
            return
        } else if (adminUser) {
            // Fall B: Es gibt einen AdminUser, passwort wurde aber geändert
            this.userRepo.remove(adminUser)
        }
        // Fall C (und B): neuen AdminUser anlegen

        this.register("admin", adminPW)
    }

    async validateCookie(cookie: string) {
        const cookietokenHash = createHash('sha256')
            .update(cookie)

            .digest('hex');
        const token =  await this.sessionTokenRepo.findOne({
            where: {
                tokenHash: cookietokenHash
            },
            relations: {
                user: true
            }
        })

        if (!token){
            throw new UnauthorizedException()
        }
        if(new Date() > token.expiresAt){
            throw new UnauthorizedException("token expired")
        }
        console.log("erfolg")
        return token.user
    }
}
