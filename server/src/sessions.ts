import { Socket } from "socket.io";
import { ICandidate } from "./candidates";
import { IDictionary } from "./models/types.interfaces";

interface ISession {
  id: string,
  client: Socket,
  candidate: ICandidate | null
}



const sessions: IDictionary<ISession> = {};


export default sessions;