export interface RoomParticipantRepositoryInterface {
  create(
    roomId: string,
    userId: string,
  ): Promise<{ roomId: string; userId: string }>;

  findByRoomParticipantIdAndRoomId(
    roomParticipantId: string,
    roomId: string,
  ): Promise<{ roomId: string | undefined; userId: string | undefined }>;

  deleteByRoomParticipantId(roomParticipantId: string): Promise<void>;
}
