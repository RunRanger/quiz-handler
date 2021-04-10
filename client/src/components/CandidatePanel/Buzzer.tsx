import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buzzer: {
    padding: theme.spacing(10),
    backgroundColor: "red",
    borderRadius: 180,
    boxShadow: "10px 5px 5px rgba(0,0,0,0.5)"
  }
}));

const Buzzer = ({ onClick }: { onClick: () => void }) => {
  const classes = useStyles();

  return (
    <Button className={classes.buzzer} variant="contained" onClick={onClick} />
  )
}

export default Buzzer;