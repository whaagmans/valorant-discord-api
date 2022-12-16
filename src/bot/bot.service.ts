import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CookieJar } from 'tough-cookie';

@Injectable()
export class BotService {
	async loginRiot(cookieJar: CookieJar): Promise<any> {
		const data = {
			client_id: 'play-valorant-web-prod',
			nonce: 1,
			redirect_uri: 'https://playvalorant.com/opt_in',
			response_type: 'token id_token',
			scope: 'account openid',
		};
		const api_url = 'https://auth.riotgames.com/api/v1/authorization';

		const response = await axios
			.post(api_url, data, {
				headers: {
					'User-Agent': 'PostmanRuntime/7.30.0',
				},
				jar: cookieJar,
				withCredentials: true,
			})
			.catch((err) => {
				throw new InternalServerErrorException(err);
			});
		console.log(response);

		return await response.data;
	}
}
