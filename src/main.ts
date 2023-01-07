import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

function swaggerSetup(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Valorant Bot API')
		.setDescription('API to retrieve data from Valorant for a Discord bot')
		.setVersion('1.0')
		.addTag('valorant')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Configuration to integrate sentry into the project.
	sentrySetup(app);

	// Configuration to integrate OpenAPI swagger into the project.
	swaggerSetup(app);

	const port = process.env.PORT || 3000;
	await app.listen(port);
}
bootstrap();
