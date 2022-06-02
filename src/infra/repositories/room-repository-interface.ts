export interface RoomRepositoryInterface {
  create(name: string): Promise<{ roomId: string; name: string }>;
  edit(roomId: string, name: string): Promise<{ name: string }>;
}
