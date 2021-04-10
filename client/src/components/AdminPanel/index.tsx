import { useEffect } from "react";
import { createState, useState } from '@hookstate/core';
import { Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Candidate from "./Candidate";
import { ICandidate } from "@src/models/candidate.interface";
import { IDictionary } from "@src/models/types.interface";
import socket from "@src/Client";
import KickDialog from "./KickDialog";

const useStyles = makeStyles(() => ({
    container: {
        width: "80vw",
        height: "100vh",
        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
    },
    control: {
        width: 200,
        position: "absolute",
        bottom: 0,
        left: "calc(50% - 100px)"
    },
    candidateItem: {
        marginTop: 50
    },
    buzzered: {
        position: "relative",
        height: "20%",
        overflowY: "auto",
        padding: "10px",
        backgroundColor: "rgb(0 0 0 / 19%)",
        width: "60%",
        boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)"
    },
    placeholder: {
        height: "100px"
    },
    buzzerBtn: {
        position: "absolute",
        bottom: 0,
        width: 200,
        left: "calc(50% - 100px)"
    }
}));


const globalState = createState<IDictionary<ICandidate>>({});

const Candidates = () => {
    const classes = useStyles();
    const success = useState(false);
    const buzzerList = useState<string[]>([])
    const candidates = useState(globalState);
    const kickDialogOpen = useState(false);

    useEffect(() => {
        socket.emit("admin");
        socket.on("admin", (c: IDictionary<ICandidate> | null) => {
            if (c === null) return;
            candidates.set(JSON.parse(JSON.stringify(c)));
            success.set(true);
        });

        socket.on("register", (candidate: ICandidate) => {
            candidates[candidate.name].set(candidate);
        });
        socket.on("update", (c: IDictionary<ICandidate>) => {
            candidates.set(JSON.parse(JSON.stringify(c)));
        });
        socket.on("status", ({ status, name }: { status: boolean, name: string }) => {
            candidates[name].active.set(status);
        });
        socket.on("buzzer", (buzzered: string[]) => {
            buzzerList.set(buzzered);
        });
        return () => {
            socket.off("admin");
            socket.off("register");
            socket.off("update");
            socket.off("status");
        };
    }, []);

    return (
        <>
            { success.value ?
                <div className={classes.container}>
                    <div className={classes.placeholder} />
                    <Grid container justify="center" spacing={0} style={{ flexGrow: 1 }}>
                        {candidates.keys.map((name, i) => (
                            <Grid key={i} item xs={2} className={classes.candidateItem}>
                                <Candidate key={i} candidate={candidates[name]} />
                            </Grid>
                        ))}
                    </Grid>
                    <div className={classes.buzzered}>
                        {
                            buzzerList.map((b, i) => (
                                <Typography variant="h5">{`${i + 1}. ${b.value}`}</Typography>
                            ))
                        }
                        <Button className={classes.buzzerBtn} onClick={() => { socket.emit("resetBuzzer") }}>Reset Buzzer</Button>
                    </div>
                    <div className={classes.placeholder} />
                    <div className={classes.control}>
                        <Button onClick={() => localStorage.clear()}>clear</Button>
                        <Button onClick={() => kickDialogOpen.set(true)}>Kick</Button>
                    </div>
                </div>


                :
                <Typography>"There's already a Quizmaster"</Typography>
            }

            <KickDialog open={kickDialogOpen.value} handleClose={() => kickDialogOpen.set(false)} candidates={candidates.keys as string[]} />
        </>
    )
}

export default Candidates;