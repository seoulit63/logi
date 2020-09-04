import React from 'react';


import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const WISubDialog = ({ isSubOpen, setIsSubOpen, handleClose }) => {


    return (
        <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={isSubOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"작업 지시"}</DialogTitle>
        <DialogContent>
            "작업을 지시하겠습니까?"
        </DialogContent>
        <DialogActions>
          <Button onClick color="primary">
           지시
          </Button>
          <Button onClick={handleClose} color="primary">
           취소
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default WISubDialog