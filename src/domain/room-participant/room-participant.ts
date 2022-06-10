import { error, success } from '../../shared/response';
import { validateRoomId } from './validate/validateRoomId';
import { validateUserId } from './validate/validateUserId';

export class RoomParticipant {
  public roomId: string;
  public userId: string;

  private constructor(roomId: string, userId: string) {
    this.roomId = roomId;
    this.userId = userId;
  }

  public static create(roomId: string, userId: string) {
    const roomIdOrError = validateRoomId(roomId);
    const userIdOrError = validateUserId(userId);

    if (roomIdOrError.isError()) return error(roomIdOrError.value);
    if (userIdOrError.isError()) return error(userIdOrError.value);

    return success(new RoomParticipant(roomId, userId));
  }
}
