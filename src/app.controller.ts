import { SentryInterceptor } from './sentry/intercepter';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
