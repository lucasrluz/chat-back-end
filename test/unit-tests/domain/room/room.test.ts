/* eslint-disable @typescript-eslint/no-explicit-any */
import { Room } from '../../../../src/domain/room/room';

describe('Room domain tests', () => {
  it('Should return new room', () => {
    const roomData = {
      name: 'a',
    };

    const roomOrError = Room.create(roomData.name);

    expect(roomOrError.isSuccess()).toEqual(true);
    expect(roomOrError.value).toEqual(roomData);
  });

  it('Should return error message', () => {
    const roomData = {
      name: '',
    };

    const roomOrError = Room.create(roomData.name);

    expect(roomOrError.isError()).toEqual(true);
    expect(roomOrError.value).toEqual('Name should not be empty');
  });

  it('Should return error message', () => {
    const name: any = true;

    const roomData = {
      name: name,
    };

    const roomOrError = Room.create(roomData.name);

    expect(roomOrError.isError()).toEqual(true);
    expect(roomOrError.value).toEqual('Name must be a string');
  });
});
