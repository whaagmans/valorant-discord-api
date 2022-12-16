import { Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
	cookieJar;
	constructor(private readonly botService: BotService) {
		wrapper(axios);
		const _cookieJar = new CookieJar();
		this.cookieJar = _cookieJar;
	}

	@Post()
	async loginUser(): Promise<any> {
		const res = await this.botService.loginRiot(this.cookieJar);
		console.log(res);
		return res;
	}
}
