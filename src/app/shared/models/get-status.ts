export class GetStatus {
  id: string;
  identifier: string;
  motor: string;
  automate: boolean;
  skipCutoff: boolean;
  cutOff: boolean;
  cutOffAt: Date;
  tankFilled: number;
  waterHeight: number;
  websocket: string;
  flowRate: number;
  quantity: number;
  updatedByDevice: boolean;
  devLogs: boolean;
  createdAt: Date;
  updatedAt: Date;
}
