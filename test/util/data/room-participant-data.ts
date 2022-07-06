/* eslint-disable @typescript-eslint/no-explicit-any */

export class ValidRoomParticipant {
  public roomId = 'validRoomId';
  public userId = 'validUserId';
}

const validRoomParticipant = new ValidRoomParticipant();

// Invalid room id

export class RoomParticipantWithEmptyRoomId {
  public roomId = '';
  public userId = validRoomParticipant.userId;
}

export class RoomParticipantWithInvalidRoomIdType {
  public roomId: any = true;
  public userId = validRoomParticipant.userId;
}

// Invalid user id

export class RoomParticipantWithEmptyUserId {
  public roomId = validRoomParticipant.roomId;
  public userId = '';
}

export class RoomParticipantWithInvalidUserIdType {
  public roomId = validRoomParticipant.roomId;
  public userId: any = true;
}
