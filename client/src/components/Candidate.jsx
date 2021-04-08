import { Button, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";

const useStyle = (color, textColor) => makeStyles({
    root: {
        backgroundColor: color,
        color: textColor,
        width: "150px",
        display: 'inline'
    },
    text: {
        paddingTop: "15px"
    }
});

const loadPoints = (name) => {
    const points = localStorage.getItem(name);
    return parseInt(points, 10) || 0;
}

const Candidate = ({ name, points: p, color, textColor }) => {
    const classes = useStyle(color, textColor)();
    const [points, setPoints] = useState(loadPoints(name));
    const change = (p) => {
        localStorage.setItem(name, p);
        setPoints(p);
    };
    const increase = () => change(points + 1);
    const decrease = () => change(points - 1);
    return (
        <div>
            <Button rows={2} variant="contained" className={classes.root} style={{ whiteSpace: 'pre-line' }} onClick={increase}>
                <Typography variant="h6">{name}</Typography>
            </Button >
            <Typography className={classes.text}>{points}</Typography>
            <Button variant="contained" className={classes.root} style={{ whiteSpace: 'pre-line' }} onClick={decrease} />
        </div>
    );
}


export default Candidate;