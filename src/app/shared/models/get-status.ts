export class GetStatus {
  id: string;
  identifier: string;
  motor: string;
  automate: boolean;
  skipCutoff: boolean;
  cutOff: boolean;
  tankFilled: number;
  waterHeight: number;
  websocket: string;
  updatedByDevice: boolean;
  createdAt: Date;
  updatedAt: Date;
}
