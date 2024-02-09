export interface MessageTypes<userType> {
  _id?: string 
  sender: userType;
  receiver: userType;
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
  messages: MessageTypes<UserType | null>[],
  notifications: Notification[],
}


export interface lastMessageType {
  friend: {_id: string, email: string};
  lastMessage: MessageTypes<string>
}