/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomMessage } from '../../../../src/domain/room-message/room-message';
import { currentDate } from '../../../../src/domain/room-message/util/current-date';
import {
  RoomMessageWithEmptyContent,
  RoomMessageWithEmptyRoomId,
  RoomMessageWithEmptyUserId,
  RoomMessageWithInvalidContentType,
  RoomMessageWithInvalidRoomIdType,
  RoomMessageWithInvalidUserIdType,
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

  describe('User id tests', () => {
    it('Should return error message', () => {
      const roomMessageData = new RoomMessageWithEmptyUserId();

      const roomMessageOrError = RoomMessage.create(
        roomMessageData.content,
        roomMessageData.userId,
        roomMessageData.roomId,
      );

      expect(roomMessageOrError.isError()).toEqual(true);
      expect(roomMessageOrError.value).toEqual('UserId should not be empty');
    });

    it('Should return error message', () => {
      const roomMessageData = new RoomMessageWithInvalidUserIdType();

      const roomMessageOrError = RoomMessage.create(
        roomMessageData.content,
        roomMessageData.userId,
        roomMessageData.roomId,
      );

      expect(roomMessageOrError.isError()).toEqual(true);
      expect(roomMessageOrError.value).toEqual('UserId must be a string');
    });
  });

  describe('Room id tests', () => {
    it('Should return error message', () => {
      const roomMessageData = new RoomMessageWithEmptyRoomId();

      const roomMessageOrError = RoomMessage.create(
        roomMessageData.content,
        roomMessageData.userId,
        roomMessageData.roomId,
      );

      expect(roomMessageOrError.isError()).toEqual(true);
      expect(roomMessageOrError.value).toEqual('RoomId should not be empty');
    });

    it('Should return error message', () => {
      const roomMessageData = new RoomMessageWithInvalidRoomIdType();

      const roomMessageOrError = RoomMessage.create(
        roomMessageData.content,
        roomMessageData.userId,
        roomMessageData.roomId,
      );

      expect(roomMessageOrError.isError()).toEqual(true);
      expect(roomMessageOrError.value).toEqual('RoomId must be a string');
    });
  });
});
