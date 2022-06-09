import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';

export interface UserData {
  username: string;
  email: string;
  password: string;
}

export async function createUserRequestMethod(userData: UserData) {
  return await request(app).post('/user').send(userData);
}
