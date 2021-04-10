import { IDictionary } from "./models/types.interfaces";

export interface ICandidate {
  name: string,
  points: number,
  color: string,
  textColor?: string,
  active: boolean
}


const candidates: IDictionary<ICandidate> = {};

export const addCandidate = (name) => {
  if (candidates[name] && candidates[name].active && name !== "admin") return null;
  candidates[name] = {
    name: name,
    color: "#3497f9",
    textColor: "black",
    points: 0,
    active: true
  }
  console.log(name + " entered the Quiz")
  return candidates[name];
}



export default candidates;