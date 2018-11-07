import { channel } from "./channel";

export class OnMessage {

    constructor(public eventType : string){
        this.type = eventType;
    }

    type : string;
    timestamp : Date;
    args : string[];
    asterisk_id : string;
    channel : channel
    application : string;


}