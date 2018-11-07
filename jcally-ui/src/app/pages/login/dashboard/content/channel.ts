import { caller } from "./caller";
import { connected } from "./connected";
import { dialplan } from "./dialplan";

export class channel {
     id : string;
     name : string;
     state : string;
     caller : caller;
     connected : connected;
     accountcode : string;
     dialplan : dialplan;
     creationtime : Date;
     language : string;
}