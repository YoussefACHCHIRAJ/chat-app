export interface MessageTypes {
  id?: string
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  content: string;
  time: Date;
}
export interface userType {
  id: string;
  fullName: string;
  email: string;
  profile: string;
}
