import { error, success } from '../../shared/response';
import { validateRoomId } from '../room-participant/validate/validateRoomId';
import { validateUserId } from '../room-participant/validate/validateUserId';
import { currentDate } from './util/current-date';
import { validateContent } from './validate/validate-content';

export class RoomMessage {
  public content: string;
  public date: string;
  public userId: string;
  public roomId: string;

  private constructor(content: string, userId: string, roomId: string) {
    this.content = content;
    this.date = currentDate();
    this.userId = userId;
    this.roomId = roomId;
  }

  public static create(content: string, userId: string, roomId: string) {
    const contentOrError = validateContent(content);
    const userIdOrError = validateUserId(userId);
    const roomIdOrError = validateRoomId(roomId);

    if (contentOrError.isError()) return error(contentOrError.value);
    if (userIdOrError.isError()) return error(userIdOrError.value);
    if (roomIdOrError.isError()) return error(roomIdOrError.value);

    return success(new RoomMessage(content, userId, roomId));
  }
}
