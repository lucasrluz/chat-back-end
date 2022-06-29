/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomMessage } from '../../../../src/domain/room-message/room-message';
import { currentDate } from '../../../../src/domain/room-message/util/current-date';

describe('Room message tests', () => {
  it('Should return room message', async () => {
    const roomMessageData = {
      content: 'a',
      userId: 'userId',
      roomId: 'roomId',
    };

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
      const roomMessageData = {
        content: '',
        userId: 'userId',
        roomId: 'roomId',
      };

      const roomMessageOrError = RoomMessage.create(
        roomMessageData.content,
        roomMessageData.userId,
        roomMessageData.roomId,
      );

      expect(roomMessageOrError.isError()).toEqual(true);
      expect(roomMessageOrError.value).toEqual('Content should not be empty');
    });

    it('Should return error message', async () => {
      const content: any = true;

      const roomMessageData = {
        content: content,
        userId: 'userId',
        roomId: 'roomId',
      };

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
