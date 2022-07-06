/* eslint-disable @typescript-eslint/no-explicit-any */
import { Room } from '../../../../src/domain/room/room';
import {
  RoomWithEmptyName,
  RoomWithInvalidNameType,
  ValidRoom,
} from '../../../util/data/room-data';

describe('Room domain tests', () => {
  it('Should return new room', () => {
    const roomData = new ValidRoom();

    const roomOrError = Room.create(roomData.name);

    expect(roomOrError.isSuccess()).toEqual(true);
    expect(roomOrError.value).toEqual(roomData);
  });

  it('Should return error message', () => {
    const roomData = new RoomWithEmptyName();

    const roomOrError = Room.create(roomData.name);

    expect(roomOrError.isError()).toEqual(true);
    expect(roomOrError.value).toEqual('Name should not be empty');
  });

  it('Should return error message', () => {
    const roomData = new RoomWithInvalidNameType();

    const roomOrError = Room.create(roomData.name);

    expect(roomOrError.isError()).toEqual(true);
    expect(roomOrError.value).toEqual('Name must be a string');
  });
});
