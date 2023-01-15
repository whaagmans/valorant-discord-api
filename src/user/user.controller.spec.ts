import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreService } from './firestore.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService, FirestoreService],
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
