import { Socket, io } from "socket.io-client";

export default class LovenseController {
    connected: boolean = false;
    online: boolean = false;
    qr: string = '';
    active: boolean = false;
    cli: any = null; // Type can't be determined from Python code
    chat: any = null; // Type can't be determined from Python code
    last_ts: { [key: string]: number } = {};
    cur_king: string = "";
    cur_level: number = 0;

    async connect() {

        this.cli.connect();
    }

  }
  