import React, { useState } from 'react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useInput from "util/useInput";
import {makeStyles,
        TextField,
        FormControlLabel,
        Radio,
        RadioGroup,
        Button,
} from "@material-ui/core";
import SearchItemCodeDialog from './SearchItemCodeDialog';
import Axios from 'axios';

const DeployMenu = ({deployCondition, itemCode }) => {

    const [openItemCodeDialog, setOpenItemCodeDialog] = useState(false); //다이알로그 기본값 false 하면 안보임
    const [divisionCode, setDivisionCode] = useState(''); //다이알로그 기본값 false 하면 안보임
    const [data, setData] = useState(null);  
    const getItemCode = useInput(""); //util에 있음 공통함수라고생각하면됨 ( 가져다쓰는거임 )
    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        root: {
            '& > *': {
                margin: theme.spacing(2),
            },
        }
    }));

    const onDivisionChange = (e) =>{
        setDivisionCode(e.currentTarget.value);
    };
    const onConditionChange = (e) =>{
        
        deployCondition(e.currentTarget.value);
    }

    //검색버튼을 누르면 다이알로그가 열린다
    const handleClickOpen = () => {
        if(divisionCode==''||divisionCode==undefined){
            alert("품목분류를 먼저 선택해주세요");
            return;
        }
        try {
              const response = async () => {
                await Axios.get(
                  'http://localhost:8282/logi/base/codeList.do', {
                    params : {
                      divisionCode: divisionCode
                    }
                  }
              );
              console.log("11");
              setData(response.data);}
        } catch (error) {
            console.log(error);
        }
        setOpenItemCodeDialog(true);
    };
    console.log(data);
    const handleClose = value => {
        setOpenItemCodeDialog(false);
        if (value.data === undefined) return;
        getItemCode.setValue(value);
      };
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <RadioGroup
                    row
                    aria-label="itemCode"
                    onChange={onDivisionChange}
                >
                    <fieldset className={classes.text}>
                        <legend>
                            <strong>품목분류</strong>
                        </legend>
                        <FormControlLabel
                            value="IT-CI"
                            control={<Radio />}
                            label="완제품"
                        />
                        <FormControlLabel
                            value="IT-SI"
                            control={<Radio />}
                            label="반제품"
                        />
                        <FormControlLabel
                            value="IT-MA"
                            control={<Radio />}
                            label="원재료"
                        />
                    </fieldset>
                </RadioGroup>
                <RadioGroup
                    row
                    aria-label="condition"
                    onChange={onConditionChange}
                >
                    <fieldset className={classes.text}>
                        <legend>
                            <strong>BOM검색조건</strong>
                        </legend>
                        <FormControlLabel
                            value="forward"
                            control={<Radio />}
                            label="정전개"
                        />
                        <FormControlLabel
                            value="reverse"
                            control={<Radio />}
                            label="역전개"
                        />
                    </fieldset>
                </RadioGroup>
                <TextField
                    id="itemCode"
                    InputProps={{
                        endAdornment: (
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => handleClickOpen()}
                                value="itemCode"
                            >
                                검색
                            </Button>
                        ),
                    }}
                    margin="normal"
                    placeholder="품목코드검색"
                    disabled={true}
                    value={getItemCode.value}
                />
                <SearchItemCodeDialog data={data} open={openItemCodeDialog} close={handleClose} />
            </div>
        </>
    );
};


export default DeployMenu;