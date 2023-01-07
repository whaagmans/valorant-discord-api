import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { BotService } from './bot.service';
import { UserMfaDTO } from './DTO/UserMfa.dto';
import { UserSignInDTO } from './DTO/UserSignIn.dto';

@Controller('bot')
export class BotController {
	cookieJar;
	private riotSessionCached = false;
	constructor(private readonly botService: BotService) {
		wrapper(axios);
		const _cookieJar = new CookieJar();
		this.cookieJar = _cookieJar;
	}
	@Post()
	async test(): Promise<any> {
		const res = await this.botService.getRiotSessionCookie(this.cookieJar);
		console.log(res);
		return res;
	}

	@Post('signin')
	async loginUser(@Body() user: UserSignInDTO): Promise<any> {
		if (!this.riotSessionCached) {
			receiveRiotSession();
		}
		const res = await this.botService.riotUserLogin(user, this.cookieJar);
		console.log(res);
		return res;
	}

	@Post('mfa')
	async multiFactorAuthentication(@Body() user: UserMfaDTO): Promise<any> {
		if (!this.riotSessionCached) {
			receiveRiotSession();
		}
		const res = await this.botService.mfaSignIn(user, this.cookieJar);
		console.log(res);
		return res;
	}
}

async function receiveRiotSession() {
	await this.botService.getRiotSessionCookie(this.cookieJar);
	this.riotSessionCached = true;
}
