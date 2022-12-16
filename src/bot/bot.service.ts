import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class BotService {
	async loginRiot(client): Promise<any> {
		const data = {
			client_id: 'play-valorant-web-prod',
			nonce: 1,
			redirect_uri: 'https://playvalorant.com/opt_in',
			response_type: 'token id_token',
			scope: 'account openid',
		};
		const api_url = 'https://auth.riotgames.com/api/v1/authorization';
		try {
			const response = await client
				.post(
					api_url,
					{
						client_id: 'play-valorant-web-prod',
						nonce: 1,
						redirect_uri: 'https://playvalorant.com/opt_in',
						response_type: 'token id_token',
						scope: 'account openid',
					},
					{
						headers: {
							'User-Agent': 'PostmanRuntime/7.30.0',
						},
					}
				)
				.then((data) => console.log(data.status))
				.catch((err) => {
					throw new InternalServerErrorException(err);
				});
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}
}
