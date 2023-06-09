import { UserSettings } from './auth-user';

export interface PostCheckPhone {
  idInstance: string | undefined;
  apiTokenInstance: string;
  phoneNumber: string;
}

export interface NewContactPhone {
  phoneNumber: string;
}

export interface CreateGroup {
  idInstance: string | undefined;
  apiTokenInstance: string;
  phoneNumber: string;
  userSettings: UserSettings;
}

export interface extendedText {
  participant: string;
  stanzaId: string;
  text:string;
}

export interface HistoryMessage {
  type: string;
  timestamp: number;
  idMessage: string;
  typeMessage: string;
  chatId: string;
  senderId: string;
  senderName: string;
  textMessage?: string;
  downloadUrl?: string;
  caption?: string;
  extendedTextMessage?:extendedText;
}
