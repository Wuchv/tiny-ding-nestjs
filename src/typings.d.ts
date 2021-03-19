interface IResponse<T> {
  statusCode: number;
  message: string;
  payload?: T;
}

type ServiceReturn<T> = Promise<[string | Record<string, unknown>, T]>;

type SafeObject = Record<string, unknown>;

declare enum EMsgType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
}

declare interface IMessage {
  msgId: string;
  cid: string;
  from: string;
  to: string;
  sender: string;
  avatarUrl: string;
  msgType: EMsgType;
  content: string;
  timestamp: number;
}
