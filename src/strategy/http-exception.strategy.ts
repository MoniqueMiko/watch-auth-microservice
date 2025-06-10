import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HttpExceptionStrategy {
  async responseHelper(statusCode: number, message: any) {
    const statusMap = {
      200: HttpStatus.OK,
      201: HttpStatus.CREATED,
      400: HttpStatus.BAD_REQUEST,
      401: HttpStatus.UNAUTHORIZED,
      404: HttpStatus.NOT_FOUND,
      500: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    return {
      status: statusMap[statusCode] || HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    };
  }
}