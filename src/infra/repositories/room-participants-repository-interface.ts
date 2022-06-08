export interface RoomParticipantsRepositoryInterface {
  create(
    roomId: string,
    userId: string,
  ): Promise<{ roomId: string; userId: string }>;

  findByRoomId(roomId: string): Promise<{ roomId: string; userId: string }>;
}
