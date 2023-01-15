import { RiotAuthResponse, RiotEntitlementResponse } from '@/types/Auth';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { UserMfaDTO } from './DTO/UserMfa.dto';
import { UserSignInDTO } from './DTO/UserSignIn.dto';

@Injectable()
export class UserService {
	private readonly api_url = 'https://auth.riotgames.com/api/v1/authorization';

	async getRiotSessionCookie(cookieJar: CookieJar): Promise<any> {
		const data = {
			client_id: 'play-valorant-web-prod',
			nonce: 1,
			redirect_uri: 'https://playvalorant.com/opt_in',
			response_type: 'token id_token',
			scope: 'account openid',
		};

		const response = await axios
			.post(this.api_url, data, {
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

		return await cookieJar;
	}

	async riotUserLogin(user: UserSignInDTO, cookieJar: CookieJar): Promise<any> {
		const data = {
			type: user.type,
			username: user.username,
			password: user.password,
			remember: user.remember,
		};
		const response = await axios
			.put(this.api_url, data, {
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
		console.log(cookieJar);

		return await response.data;
	}

	async mfaSignIn(
		user: UserMfaDTO,
		cookieJar: CookieJar
	): Promise<RiotAuthResponse> {
		const data = {
			type: user.type,
			rememberDevice: user.rememberDevice,
			code: user.code,
		};

		const response = await axios
			.put(this.api_url, data, {
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

	async getRiotEntitlementToken(access_token: string): Promise<string> {
		const res = await axios.post<RiotEntitlementResponse>(
			'https://entitlements.auth.riotgames.com/api/token/v1',
			{},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);
		return res.data.entitlements_token;
	}
}
