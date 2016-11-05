export interface INodes {
  hostname: string;
  ip: string;
  status: 'inactive'|'pending'|'success';
  startLogLines: string;
  startLogLastMessageTime: string;
}