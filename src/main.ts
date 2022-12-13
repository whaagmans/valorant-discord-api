import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init } from '@sentry/node';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	init({
		dsn: process.env.SENTRY_DSN,
	});

	const port = process.env.PORT || 3000;
	await app.listen(port);
}
bootstrap();
