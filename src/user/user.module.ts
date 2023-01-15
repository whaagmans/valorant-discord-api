import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService, FirestoreService],
})
export class UserModule {}
