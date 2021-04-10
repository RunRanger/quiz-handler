import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, MenuItem, Select } from "@material-ui/core"
import socket from "@src/Client";
import { useState } from "react"


const KickDialog = ({ open, handleClose, candidates }: { open: boolean, handleClose: () => void, candidates: string[] }) => {

  const [setted, setSetted] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSetted(event.target.value as string);
  }

  const handleKicK = () => {
    if (setted === "") return;
    socket.emit("kick", setted);
    handleClose();
  }

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Who to kick?</DialogTitle>
      <DialogContent>
        <Select
          value={setted}
          onChange={handleChange}
          input={<Input />}
        >
          <MenuItem value="" ><em>None</em></MenuItem>
          {candidates.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleKicK} color="primary">
          Kick
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default KickDialog;