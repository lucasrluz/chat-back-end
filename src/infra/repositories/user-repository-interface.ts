import { UserInterface } from '../../domain/user/interface/user-interface';

export interface UserRepositoryInterface {
  create(user: UserInterface): Promise<{ id: string }>;
  findById(id: string): Promise<{
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
  }>;
  findByUsername(username: string): Promise<{ id: string | undefined }>;
  findByEmail(email: string): Promise<{ id: string | undefined }>;
  updateUsername(userId: string, username: string): Promise<void>;
  updatePassword(userId: string, password: string): Promise<void>;
  deleteById(userId: string): Promise<void>;
}
