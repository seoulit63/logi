//********************************** 2020-08-24 정대현 추가 **********************************
import React from 'react';
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core";

const SearchButton = ({getCashJournalList}) => {

    const classes = useStyles();  // 스타일 먹임

    return (
        <>
        <div className={classes.root} style={{ width: '26%', float: 'left' }}>
            <Button variant="contained" color="primary" onClick={getCashJournalList}>
                조회
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

export default SearchButton;