import React from "react";
import { TextField } from "@material-ui/core";

const Calendar = props => {
    const dateHandler = props.dateHandler;

    return(
        <>
            <div style={{ marginBottom: '10px', width:'220px', display:"inline-block", }}>
                <fieldset>
                    <legend>
                        <strong>수주 가능한 견적 검색 조건</strong>
                    </legend>   
                    <label>
                        <input
                            type="radio"
                            name="searchDateCondition"
                            value="searchByDate"
                            onChange={dateHandler}
                        />일자검색
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="searchDateCondition"
                            value="searchByPeriod"
                            onChange={dateHandler}
                        />기간검색
                    </label>
                </fieldset>
            </div>
            &nbsp;
            <div style={{ marginBottom: '10px', width:'380px', display:"inline-block", }}>
                <TextField
                    type="date"
                    name="startDate"
                    variant="outlined"
                    label="시작일"
                    color="secondary"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    // defaultValue={startDate}
                    onChange={dateHandler}
                />
                 &nbsp;<TextField
                    type="date"
                    name="endDate"
                    variant="outlined"
                    label="종료일"
                    color="secondary"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    // defaultValue={endDate}
                    onChange={dateHandler}
                />
            </div>
        </>
    );
};
export default Calendar;