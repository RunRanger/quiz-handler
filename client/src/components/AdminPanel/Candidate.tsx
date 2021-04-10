import { State, useHookstate } from "@hookstate/core";
import { Badge, Button, makeStyles, Typography, withStyles } from "@material-ui/core";
import { useState } from "react";
import { ICandidate } from "../../models/candidate.interface";

const useStyle = (color: string, textColor?: string) => makeStyles({
    root: {
        backgroundColor: color,
        color: textColor ? textColor : "black",
        width: "150px",
        display: 'inline'
    },
    text: {
        paddingTop: "15px"
    },
});

const ColorBadge = withStyles(() => ({
    "colorPrimary": {
        backgroundColor: "green",
    },
    "colorSecondary": {
        backgroundColor: "red",
    },
}))(Badge);

const loadPoints = (name: string) => {
    const points = localStorage.getItem(name) as string;
    return parseInt(points, 10) || 0;
}

const Candidate = ({ candidate }: { candidate: State<ICandidate> }) => {
    const state = useHookstate(candidate);
    const classes = useStyle(state.color.get(), state.textColor.value)();
    const change = (p: number) => {
        localStorage.setItem(state.name.get(), p.toString());
        state.points.set(p);
    };
    const increase = () => change(state.points.get() + 1);
    const decrease = () => change(state.points.get() - 1);
    return (
        <ColorBadge badgeContent={""} color={candidate.active.get() ? "primary" : "secondary"}>
            <div>
                <Button variant="contained" className={classes.root} style={{ whiteSpace: 'pre-line' }} onClick={increase}>
                    <Typography variant="h6">{candidate.name.get()}</Typography>
                </Button >
                <Typography className={classes.text}>{state.points.get()}</Typography>
                <Button variant="contained" className={classes.root} style={{ whiteSpace: 'pre-line' }} onClick={decrease} />
                <div>

                </div>
            </div>
        </ColorBadge>
    );
}


export default Candidate;