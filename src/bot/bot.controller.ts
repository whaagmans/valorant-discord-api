import { Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
	client: any;
	constructor(private readonly botService: BotService) {
		const jar = new CookieJar();
		const _client = wrapper(axios.create({ jar }));
		this.client = _client;
	}

	@Post()
	async loginUser(): Promise<string> {
		return await this.botService.loginRiot(this.client);
	}
}
