import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import useInput from 'util/useInput';
import {

    makeStyles, DialogActions,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: { margin: 15 }
}));

const EstimateDialog = (props) => {
    const { onClose, open, itemCode, amoutpriceData, standardUnitPrice } = props;

    const [price, setPrice] = useState('');

    const amount = useInput('');
    const sum = useInput('');
    const classes = useStyles();

    useEffect(() => {
        if (itemCode === undefined) return;
        async function getStandardUnitPrice() {
            await amoutpriceData(itemCode);
        }
        getStandardUnitPrice();
    }, [itemCode])



    const onSumChange = (e) => {
        amount.setValue(e.target.value);
        console.log("e.target.value)e.target.value", e.target.value)
        sum.setValue(e.target.value * standardUnitPrice);
    }

    const handleListItemClick = () => {
        onClose({
            data: { estimateAmount: amount.value, sumPriceOfEstimate: sum.value },
            division: 'EstimateDialog'
        })
    }
    return (
        <Dialog open={open} >
            <DialogTitle id="simple-dialog-title">견적단가 책정 </DialogTitle>
            <div> {"수량 : "}
                <input className={classes.root} onChange={(e) => onSumChange(e)} /></div>
            <div> {"단가 : "}
                <input className={classes.root} value={standardUnitPrice} /></div>
            <div> {"합계액 :"}
                <input className={classes.root} value={sum.value} /></div>
            <DialogActions> <Button onClick={() => handleListItemClick()} color="primary">확인</Button> </DialogActions>
        </Dialog>
    );
}

export default EstimateDialog;

EstimateDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

};