import { UserInterface } from '../../domain/user/interface/user-interface';

export interface UserRepositoryInterface {
  create(user: UserInterface): Promise<{ id: string }>;
  findByUsername(username: string): Promise<{ id: string | undefined }>;
  findByEmail(email: string): Promise<{ id: string | undefined }>;
}
