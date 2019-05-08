export class Log {
  id: string;
  action: string;
  motorOn: boolean;
  cutOff: boolean;
  automate: boolean;
  tankFilled: number;
  waterHeight?: boolean;
  skipCutoff: boolean;
  websocket: boolean;
  createdAt: Date;
  updatedAt: Date;
}
