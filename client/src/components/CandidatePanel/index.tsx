import { Typography } from "@material-ui/core";
import socket from "@src/Client";
import { ICandidate } from "@src/models/candidate.interface";
import { useEffect, useState } from "react";
import Buzzer from "./Buzzer";
import BuzzerPage from "./BuzzerPage";
import Registration from "./Registration";


const CandidatePanel = () => {
  const [candidate, setCandidate] = useState<ICandidate | null>(null);
  const [disconnected, setDisconnected] = useState(false);

  useEffect(() => {
    socket.on("disconnect", () => {
      setDisconnected(true);
    })
  }, [])

  return disconnected ?
    <Typography> You got kicked, restart website </Typography> :
    candidate ?
      <BuzzerPage candidate={candidate} /> :
      <Registration setCandidate={setCandidate} />

}

export default CandidatePanel;