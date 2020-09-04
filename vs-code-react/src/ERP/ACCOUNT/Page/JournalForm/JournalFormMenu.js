import React from 'react';
import { TextField } from "@material-ui/core";

const JournalFormMenu = ({ date, setDate, setGrid }) => {
    const onChange = event => {
        setDate({
            ...date,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <React.Fragment>
            <h1>분개장</h1>
            <fieldset>
                <legend> [ 검색조건 ] </legend>
                <TextField name="startDate" type={"date"} onChange={onChange} />
                <TextField name="endDate" type={"date"} onChange={onChange} />
            </fieldset>
        </React.Fragment>
    );
};

export default JournalFormMenu;