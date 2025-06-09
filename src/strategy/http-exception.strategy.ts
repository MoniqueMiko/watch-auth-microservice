import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HttpExceptionStrategy {
  async responseHelper(statusCode, message) {
    if (statusCode === 400) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message,
      };
    }

    if (statusCode === 401) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: message,
      };
    }

    if (statusCode === 404) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: message,
      };
    }

    if (statusCode === 500) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message,
      };
    }

    if (statusCode === 201) {
      return {
        status: HttpStatus.CREATED,
        message: message,
      };
    }

    if (statusCode === 200) {
      return {
        status: HttpStatus.OK,
        message: message,
      };
    }
  }
}
