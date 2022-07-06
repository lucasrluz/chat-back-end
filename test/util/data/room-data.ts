/* eslint-disable @typescript-eslint/no-explicit-any */

export class ValidRoom {
  public name = 'validName';
}

export class RoomWithEmptyName {
  public name = '';
}

export class RoomWithInvalidNameType {
  public name: any = true;
}
