import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { captureException } from '@sentry/node';
import { Observable, tap } from 'rxjs';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			tap(null, (exception) => {
				captureException(exception);
			})
		);
	}
}
