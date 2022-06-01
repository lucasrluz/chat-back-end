export interface RoomRepositoryInterface {
  create(name: string): Promise<{ name: string }>;
}
