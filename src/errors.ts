/** 클라이언트가 잘못 보낸 요청. 실제 장애(500)와 구분해 Sentry 로도 보내지 않는다. */
export class ClientError extends Error {
  constructor(message: string, readonly status: number = 400) {
    super(message);
    this.name = 'ClientError';
  }
}
