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
