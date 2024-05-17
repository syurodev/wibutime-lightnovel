import { Metadata } from '@grpc/grpc-js';

export const getTokenFromGrpcMetadata = (metadata: Metadata): string | null => {
  const token = metadata.get('authorization')[0];
  return token.toString();
};
