import { SentryInterceptor } from './sentry/intercepter';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init } from '@sentry/node';

function sentrySetup(app: INestApplication) {
	init({
		dsn: process.env.SENTRY_DSN,
	});
	app.useGlobalInterceptors(new SentryInterceptor());
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	sentrySetup(app);

	const port = process.env.PORT || 3000;
	await app.listen(port);
}
bootstrap();
