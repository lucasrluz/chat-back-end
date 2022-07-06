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
