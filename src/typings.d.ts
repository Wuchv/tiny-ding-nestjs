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
  fromId: string;
  toId: string;
  sender: string;
  avatarUrl: string;
  msgType: EMsgType;
  content: string;
  attachment?: IAttachment;
  timestamp: number;
}

declare interface IAttachment {
  url: string;
  name?: string;
  size?: string | number;
  type?: string;
  cache?: any;
}
