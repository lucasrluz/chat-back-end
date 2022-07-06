/* eslint-disable @typescript-eslint/no-explicit-any */

import { RoomParticipant } from '../../../../src/domain/room-participant/room-participant';
import {
  RoomParticipantWithEmptyRoomId,
  RoomParticipantWithEmptyUserId,
  RoomParticipantWithInvalidRoomIdType,
  RoomParticipantWithInvalidUserIdType,
  ValidRoomParticipant,
} from '../../../util/data/room-participant-data';

describe('Room participant domain tests', () => {
  it('Should create room participants', () => {
    const roomParticipantData = new ValidRoomParticipant();

    const roomParticipantOrError = RoomParticipant.create(
      roomParticipantData.roomId,
      roomParticipantData.userId,
    );

    expect(roomParticipantOrError.isSuccess()).toEqual(true);
    expect(roomParticipantOrError.value).toEqual(roomParticipantData);
  });

  describe('RoomId tests', () => {
    it('Should return error message for creating roomId', () => {
      const roomParticipantData = new RoomParticipantWithEmptyRoomId();

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
      const roomParticipantData = new RoomParticipantWithInvalidRoomIdType();

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
      const roomParticipantData = new RoomParticipantWithEmptyUserId();

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
      const roomParticipantData = new RoomParticipantWithInvalidUserIdType();

      const roomParticipantOrError = RoomParticipant.create(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

      expect(roomParticipantOrError.isError()).toEqual(true);
      expect(roomParticipantOrError.value).toEqual('UserId must be a string');
    });
  });
});
