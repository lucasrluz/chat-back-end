import { error, success } from '../../../shared/response';

export function validateRoomId(roomId: string) {
  if (typeof roomId !== 'string') return error('RoomId must be a string');

  if (!roomId) return error('RoomId should not be empty');

  return success(roomId);
}
