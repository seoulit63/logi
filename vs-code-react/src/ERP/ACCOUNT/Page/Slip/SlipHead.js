import React, {useState} from 'react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import {makeStyles,
        InputLabel,
        Select,
        MenuItem,
        FormControl,
        TextField,
} from "@material-ui/core";


const SlipHead = ({headInfo,headChange}) => {
    
    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }));

    const { startDate, endDate, slipStatus } = headInfo;
    // 시작날짜, 끝날짜, 유형 값을 headInfo가 가지고 있음. 비구조 할당으로 사용가능.

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <>
            <div align="left" className={classes.root}>
                <TextField
                    name="startDate"
                    type={"date"}
                    defaultValue={startDate}  //defaultValue : 초기값.
                    onChange={headChange}   // onChange : 값이 변경되면 콜백이 발생.
                />
                <TextField
                    name="endDate"
                    type={"date"}
                    defaultValue={endDate}
                    onChange={headChange}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="demo-controlled-open-select">
                        유형
                    </InputLabel>
                    <Select
                        name="slipStatus"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={slipStatus}
                        onChange={headChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="미결">미결</MenuItem>
                        <MenuItem value="승인">승인</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    );
};

export default SlipHead;