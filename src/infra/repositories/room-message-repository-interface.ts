interface RoomMessageData {
  content: string;
  userId: string;
  roomId: string;
}

export interface RoomMessageRepositoryInterface {
  create(roomMessageData: RoomMessageData): Promise<{ roomMessageId: string }>;
}
