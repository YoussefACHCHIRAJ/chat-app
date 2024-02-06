export interface MessageTypes {
  _id?: string 
  sender: UserType | null | string;
  receiver: UserType | null | string;
  isDeletedBySender?: boolean,
  isDeletedByReceiver?: boolean,
  content: string;
  time: string;
  chat?: string
}

export interface NotificationType {
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


export interface lastMessageType {
  friend: {_id: string, email: string};
  lastMessage: MessageTypes
}