import { SentryInterceptor } from './sentry/intercepter';
import {
	BadRequestException,
	Controller,
	Get,
	InternalServerErrorException,
	UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		throw new InternalServerErrorException();
		return this.appService.getHello();
	}
}
