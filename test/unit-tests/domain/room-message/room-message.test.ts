/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomMessage } from '../../../../src/domain/room-message/room-message';
import { currentDate } from '../../../../src/domain/room-message/util/current-date';
import {
  RoomMessageWithEmptyContent,
  RoomMessageWithInvalidContentType,
  ValidRoomMessage,
} from '../../../util/data/room-message-data';

describe('Room message tests', () => {
  it('Should return room message', async () => {
    const roomMessageData = new ValidRoomMessage();

    const roomMessageOrError = RoomMessage.create(
      roomMessageData.content,
      roomMessageData.userId,
      roomMessageData.roomId,
    );

    expect(roomMessageOrError.isSuccess()).toEqual(true);
    expect(roomMessageOrError.value).toEqual({
      content: roomMessageData.content,
      date: currentDate(),
      userId: roomMessageData.userId,
      roomId: roomMessageData.roomId,
    });
  });

  describe('Content tests', () => {
    it('Should return error message', async () => {
      const roomMessageData = new RoomMessageWithEmptyContent();

      const roomMessageOrError = RoomMessage.create(
        roomMessageData.content,
        roomMessageData.userId,
        roomMessageData.roomId,
      );

      expect(roomMessageOrError.isError()).toEqual(true);
      expect(roomMessageOrError.value).toEqual('Content should not be empty');
    });

    it('Should return error message', async () => {
      const roomMessageData = new RoomMessageWithInvalidContentType();

      const roomMessageOrError = RoomMessage.create(
        roomMessageData.content,
        roomMessageData.userId,
        roomMessageData.roomId,
      );

      expect(roomMessageOrError.isError()).toEqual(true);
      expect(roomMessageOrError.value).toEqual('Content must be a string');
    });
  });
});
