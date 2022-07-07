/* eslint-disable @typescript-eslint/no-explicit-any */

export class ValidRoomMessage {
  content = 'validContent';
  userId = 'validUserId';
  roomId = 'validRoomId';
}

const validRoomMessage = new ValidRoomMessage();

export class RoomMessageWithEmptyContent {
  content = '';
  userId = validRoomMessage.userId;
  roomId = validRoomMessage.roomId;
}

export class RoomMessageWithInvalidContentType {
  content: any = true;
  userId = validRoomMessage.userId;
  roomId = validRoomMessage.roomId;
}

export class RoomMessageWithEmptyUserId {
  content = validRoomMessage.content;
  userId = '';
  roomId = validRoomMessage.roomId;
}

export class RoomMessageWithInvalidUserIdType {
  content = validRoomMessage.content;
  userId: any = true;
  roomId = validRoomMessage.roomId;
}

export class RoomMessageWithEmptyRoomId {
  content = validRoomMessage.content;
  userId = validRoomMessage.userId;
  roomId = '';
}

export class RoomMessageWithInvalidRoomIdType {
  content = validRoomMessage.content;
  userId = validRoomMessage.roomId;
  roomId: any = true;
}
