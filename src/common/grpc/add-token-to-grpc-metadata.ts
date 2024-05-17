import { Metadata } from '@grpc/grpc-js';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const extractTokenFromHttpRequestAndAddToGrpcMetadata = (
  request: Request,
): Metadata => {
  const metadata: Metadata = new Metadata();

  const token = request.headers.authorization;

  if (!token) {
    throw new UnauthorizedException({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Không có token!',
    });
  }

  metadata.add('authorization', token);
  return metadata;
};
