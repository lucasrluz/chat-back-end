import { PrismaRoomRepository } from '../../../src/infra/external/prisma/repositories/prisma-room-repository';
import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';

describe('Create room use case tests', () => {
  const roomRepository = new PrismaRoomRepository();
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  it('Should return new room', async () => {
    const roomData = {
      name: 'a',
    };

    const response = await createRoomUseCase.perform(roomData.name);

    expect(response.isSuccess()).toEqual(true);
    expect(response.value).toEqual(roomData);
  });
});
