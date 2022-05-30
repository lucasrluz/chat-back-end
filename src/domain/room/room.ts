import { error, success } from '../../shared/response';
import { validateName } from './validateName';

export class Room {
  public name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string) {
    const successOrError = validateName(name);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Room(name));
  }
}
