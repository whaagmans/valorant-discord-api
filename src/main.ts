import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Handlers, init, Integrations } from '@sentry/node';
import { addExtensionMethods } from '@sentry/tracing';
import { AppModule } from './app.module';
import { SentryInterceptor } from './interceptors/SentryIntercepter';

function sentrySetup(app: INestApplication) {
	init({
		dsn: process.env.SENTRY_DSN,
		integrations: [new Integrations.Http({ tracing: true })],
		tracesSampleRate: 1.0,
	});
	app.useGlobalInterceptors(new SentryInterceptor());
	app.use(Handlers.errorHandler());
	app.use(Handlers.requestHandler());
	app.use(Handlers.tracingHandler());
	addExtensionMethods();
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	sentrySetup(app);

	const port = process.env.PORT || 3000;
	await app.listen(port);
}
bootstrap();
