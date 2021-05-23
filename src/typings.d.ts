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
  size?: string;
  type?: string;
  cache?: any;
}

declare enum ESignalType {
  INITIATE_VIDEO_CALL = 'initiate_video_call',
  AGREE_TO_VIDEO_CALL = 'agree_to_video_call',
  REJECT_VIDEO_CALL = 'reject_video_call',
  USER_OFFLINE = 'user_offline',
  NOT_ANSWERED = 'not_answered',
  SYNC_ICECANDIDATE = 'sync_icecandidate',
  PREPARE_TO_RECEIVE_VIDEO_STREAM = 'prepare_to_receive_video_stream',
  STOP_SEND_PREPARE = 'stop_send_prepare_to_receive_video_stream',
  HANG_UP = 'hang_up',
}

declare interface ISignal {
  type: ESignalType;
  payload: Pick<IMessage, 'fromId' | 'toId'>;
}
