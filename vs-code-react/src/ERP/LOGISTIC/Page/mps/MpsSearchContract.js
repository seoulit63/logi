import React, { useState } from 'react';
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import logiApi from 'Api/logiApi';

const MpsSearchContract = ({ gridData, setGridData }) => {


    const [date, setDate] = useState({
        title: "기간조회",
        fromDate: '0',
        toDate: '0'
    });
    const { title, fromDate, toDate } = date;
    const { getUrl } = gridData;
    const onChange = (event) => {
        setDate(
            {
                ...date,
                [event.target.name]: event.target.value
            }
        );
    };

    console.log(getUrl);
    const selectData = async event => {
        const response = await logiApi.get(getUrl, {
            params: {
                startDate: fromDate,
                endDate: toDate
            }
        });
        setGridData({


        });
    };

    return (
        <React.Fragment>

            <span align="center" width="1000" hight="300">
                <fieldset>
                    <legend>  [ {title} ] </legend>
                    <TextField
                        name="fromDate"
                        type={"date"}
                        onChange={onChange}
                    />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
                        name="toDate"
                        type={"date"}
                        onChange={onChange}
                    />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
                        style={{
                            color: '#ecf0f1',
                            backgroundColor: '#4b4b4b'
                        }}
                        variant={"outlined"}
                        color={"primary"}
                        onClick={selectData}
                    > 조회
        </Button>
                </fieldset>
            </span>
        </React.Fragment>
    );
}

export default MpsSearchContract;