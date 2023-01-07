import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';

@Module({
	imports: [ConfigModule.forRoot(), BotModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
