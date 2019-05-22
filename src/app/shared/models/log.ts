export class Log {
  id: string;
  action: string;
  motorOn: boolean;
  cutOff: boolean;
  automate: boolean;
  tankFilled: number;
  waterHeight?: boolean;
  quantity?: number;
  flowRate?: number;
  skipCutoff: boolean;
  updatedByDevice: boolean;
  websocket: boolean;
  createdAt: Date;
  updatedAt: Date;
}
