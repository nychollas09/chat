import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionResponse } from 'src/shared/domain/interface/http-exception-response.interface';

@Catch()
export class AllExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    if (exception instanceof HttpException) {
      this.handleHttpException(request, response, exception);
    }

    const exceptionStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(exceptionStatus).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date(),
      path: request.url,
      message: exception['message'],
      error: 'Internal server error',
    });
  }

  private handleHttpException(
    request: Request,
    response: Response,
    exception: HttpException,
  ): void {
    const exceptionStatus = exception.getStatus();
    const { message, error } = exception.getResponse() as HttpExceptionResponse;
    response.status(exceptionStatus).json({
      statusCode: exceptionStatus,
      timestamp: new Date(),
      path: request.url,
      message,
      error,
    });
  }
}
