export interface Message {
  message: string;
  desc: string;
}

export interface SafeUser {
  id: number;
  username: string;
  access_level: number;
}
