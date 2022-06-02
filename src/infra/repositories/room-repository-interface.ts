export interface RoomRepositoryInterface {
  create(name: string): Promise<{ roomId: string; name: string }>;
}
