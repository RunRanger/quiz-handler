import { Button, Container, makeStyles, TextField, Typography } from "@material-ui/core"
import socket from "@src/Client";
import { ICandidate } from "@src/models/candidate.interface";
import { useEffect, useState } from "react";


const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: 'flex',
    justifyContent: "center",
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(4),
    },
    width: 200,
    display: 'flex',
    justifyContent: "center",
    flexDirection: "column"
  }
}));

const Registration = ({ setCandidate }:
  {
    setCandidate: (candidate: ICandidate) => void
  }) => {

  const classes = useStyles();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("register", (candidate: ICandidate | null) => {
      if (!candidate)
        setError("Name already used");
      setCandidate(candidate!);
    });
  }, []);

  const onChange = (e) => { setName(e.currentTarget.value); setError(""); }
  const onSubmit = () => socket.emit("register", name);

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
        <TextField required label="Name" value={name} onChange={onChange} />
        <Button variant="contained" color="primary" disableElevation onClick={onSubmit}>
          Submit
        </Button>
        <Typography>{error}</Typography>
      </form>
    </Container>
  );
}





export default Registration;