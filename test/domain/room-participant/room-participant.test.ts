/* eslint-disable @typescript-eslint/no-explicit-any */

import { RoomParticipant } from '../../../src/domain/room-participant/room-participant';

describe('Room participant domain tests', () => {
  it('Should create room participants', () => {
    const roomParticipantData = {
      roomId: 'roomId',
      userId: 'userId',
    };

    const roomParticipantOrError = RoomParticipant.create(
      roomParticipantData.roomId,
      roomParticipantData.userId,
    );

    expect(roomParticipantOrError.isSuccess()).toEqual(true);
    expect(roomParticipantOrError.value).toEqual(roomParticipantData);
  });

  describe('RoomId tests', () => {
    it('Should return error message for creating roomId', () => {
      const roomParticipantData = {
        roomId: '',
        userId: 'userId',
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual(
        'RoomId should not be empty',
      );
    });

    it('Should return error message for creating roomId', () => {
      const roomId: any = true;

      const roomParticipantData = {
        roomId: roomId,
        userId: 'userId',
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('RoomId must be a string');
    });

    it('Should return error message for creating roomId', () => {
      const roomId: any = false;

      const roomParticipantData = {
        roomId: roomId,
        userId: 'userId',
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('RoomId must be a string');
    });

    it('Should return error message for creating roomId', () => {
      const roomId: any = null;

      const roomParticipantData = {
        roomId: roomId,
        userId: 'userId',
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('RoomId must be a string');
    });

    it('Should return error message for creating roomId', () => {
      const roomId: any = 0;

      const roomParticipantData = {
        roomId: roomId,
        userId: 'userId',
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('RoomId must be a string');
    });

    it('Should return error message for creating roomId', () => {
      const roomId: any = { value: 'roomId' };

      const roomParticipantData = {
        roomId: roomId,
        userId: 'userId',
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('RoomId must be a string');
    });
  });

  describe('UserId tests', () => {
    it('Should return error message for creating userId', () => {
      const roomParticipantData = {
        roomId: 'roomId',
        userId: '',
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual(
        'UserId should not be empty',
      );
    });

    it('Should return error message for creating userId', () => {
      const userId: any = true;

      const roomParticipantData = {
        roomId: 'roomId',
        userId: userId,
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('UserId must be a string');
    });

    it('Should return error message for creating userId', () => {
      const userId: any = false;

      const roomParticipantData = {
        roomId: 'roomId',
        userId: userId,
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('UserId must be a string');
    });

    it('Should return error message for creating userId', () => {
      const userId: any = null;

      const roomParticipantData = {
        roomId: 'roomId',
        userId: userId,
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('UserId must be a string');
    });

    it('Should return error message for creating userId', () => {
      const userId: any = 0;

      const roomParticipantData = {
        roomId: 'roomId',
        userId: userId,
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('UserId must be a string');
    });

    it('Should return error message for creating userId', () => {
      const userId: any = { value: 'userId' };

      const roomParticipantData = {
        roomId: 'roomId',
        userId: userId,
      };

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('UserId must be a string');
    });
  });
});
