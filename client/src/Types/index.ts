export interface MessageTypes {
  _id?: string 
  sender: UserType | null;
  receiver: UserType | null;
  content: string;
  // chatId: string;
  time: string;
}

export interface Notification {
  receiver: string,
  sender: string,
  count: number,
}

export interface UserType {
  _id: string
  userId: string,
  username: string,
  email: string,
  profile: string,
  messages: MessageTypes[],
  notifications: Notification[],
}
