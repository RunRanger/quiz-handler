import { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import Candidate from "../components/Candidate";

const Candidates = () => {

    const candidates = [
        { name: "Ivo", points: 0, color: "#3497f9" },
        { name: "Katha", points: 0, color: "#f43131" },
        { name: "Manu", points: 0, color: "#fffa55" },
        { name: "Sven", points: 0, color: "#a3ff55" },
        // { name: "Jan", points: 0, color: "#c386ff" },
        //  { name: "Manu", points: 0, color: "#c386ff" },
        //  { name: "Manu2", points: 0, color: "#86faff" },

    ]

    return (
        <Grid container justify="center" spacing={5} style={{ flexGrow: 1, margin: "10px" }}>
            {candidates.map(c => <Grid item xs={2}><Candidate key={c.name} name={c.name} color={c.color} points={c.points} textColor={c.textColor} /></Grid>)}
        </Grid>
    )
}

export default Candidates;