import { extractParamFromUrlHash } from '@/helpers/Extractors';
import {
	Body,
	Controller,
	Get,
	InternalServerErrorException,
	NotImplementedException,
	Param,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { User } from './DTO/User.dto';
import { UserMfaDTO } from './DTO/UserMfa.dto';
import { UserSignInDTO } from './DTO/UserSignIn.dto';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
	cookieJar;
	private riotSessionCached = false;
	constructor(
		private readonly userService: UserService,
		private readonly firestoreService: FirestoreService
	) {
		wrapper(axios);
		const _cookieJar = new CookieJar();
		this.cookieJar = _cookieJar;
	}

	@Post('addUser')
	async addUser(@Body() user: User) {
		try {
			await this.firestoreService.addUser(user);
			return { user, message: 'user created' };
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}

	@Get('getUser/:id')
	async getUser(@Param('id') id: string): Promise<User> {
		console.log(id);
		try {
			const user = await this.firestoreService.getUserById(id);
			return user;
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}

	@Post('entitlement')
	async test(): Promise<any> {
		const access_token = '';
		const entitlement_token = this.receiveRiotEntitlement(access_token);
		return entitlement_token;
	}

	@Post('signin')
	async loginUser(@Body() user: UserSignInDTO): Promise<any> {
		if (!this.riotSessionCached) {
			await this.receiveRiotSession();
		}
		const res = await this.userService.riotUserLogin(user, this.cookieJar);
		console.log(res);
		return res;
	}

	@Post('mfa')
	async multiFactorAuthentication(@Body() user: UserMfaDTO): Promise<any> {
		if (!this.riotSessionCached) {
			await this.receiveRiotSession();
		}
		const res = await this.userService.mfaSignIn(user, this.cookieJar);
		console.log(res);
		const hash = new URL(res.response.parameters.uri).hash;
		return extractParamFromUrlHash(hash, 'access_token');
	}

	private async receiveRiotSession() {
		await this.userService.getRiotSessionCookie(this.cookieJar);
		this.riotSessionCached = true;
	}

	private async receiveRiotEntitlement(access_token: string): Promise<string> {
		const entitlementToken = await this.userService.getRiotEntitlementToken(
			access_token
		);
		return entitlementToken;
	}

	private async saveUserInformation(user: User) {
		throw NotImplementedException;
	}
}