import React from 'react';
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core";

const SlipButton = ({getSlipList , initalBtn , approvalBtn}) => {

    const classes = useStyles();  // 스타일 먹임

    return (
        <>
        <div className={classes.root} style={{ width: '26%', float: 'right' }}>
            <Button variant="contained" color="primary" onClick={getSlipList}>
                조회
            </Button>
            <Button variant="contained" color="primary" onClick={initalBtn}>
                그리드초기화
            </Button>
            <Button variant="contained" color="secondary" onClick={approvalBtn}>
                전표승인
            </Button>
        </div>
        </>
    );
};
const useStyles = makeStyles(theme => ({
root: {
    '& > *': {
        margin: theme.spacing(2),
    },
},
}));

export default SlipButton;