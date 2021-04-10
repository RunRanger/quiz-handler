import { useState } from "@hookstate/core";
import { Container, makeStyles, Typography } from "@material-ui/core";
import socket from "@src/Client";
import { ICandidate } from "@src/models/candidate.interface";
import { useEffect } from "react";
import Buzzer from "./Buzzer";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    height: "100vh",
    display: 'flex',
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  buzzered: {
    height: "20%",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "rgb(0 0 0 / 19%)",
    width: "60%",
    boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)"
  }
}));

const BuzzerPage = ({ candidate }: { candidate: ICandidate }) => {
  const classes = useStyles();
  const buzzerList = useState<string[]>([]);
  useEffect(() => {

    socket.on("buzzer", (list: string[]) => {
      console.log(list);
      buzzerList.set(JSON.parse(JSON.stringify(list)));
    })
  }, []);

  const onBuzzer = () => {
    socket.emit("buzzer", candidate.name);
    console.log(buzzerList)
  }



  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h3" component="h3">{candidate.name}</Typography>
        <Typography variant="h3" component="h3">{candidate.points}</Typography>
      </div>
      <Buzzer onClick={onBuzzer} />
      <div className={classes.buzzered}>
        <Typography variant="h4">Buzzer</Typography>
        {
          buzzerList.map((b, i) => (
            <Typography variant="h5">{`${i + 1}. ${b.value}`}</Typography>
          ))
        }
      </div>
    </div>
  )
}
export default BuzzerPage;