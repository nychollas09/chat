import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshTokenPreProcessorInterceptor implements NestInterceptor {
  private DEFAULT_AUTH_PATH = '/auth/token';
  private DEFAULT_GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    if (this.DEFAULT_AUTH_PATH === request.url) {
    }

    return next.handle();
  }
}
