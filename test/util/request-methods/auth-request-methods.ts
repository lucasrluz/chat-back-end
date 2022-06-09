import request from 'supertest';
import { app } from '../../../src/infra/external/express/app';
interface LoginData {
  username: string;
  password: string;
}

export async function loginRequestMethod(loginData: LoginData) {
  return await request(app).post('/login').send(loginData);
}
