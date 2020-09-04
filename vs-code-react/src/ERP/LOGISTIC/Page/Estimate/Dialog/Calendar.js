import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { FormControl, TextField, Button } from "@material-ui/core";


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600]
    }
});
const Calendar = (props) => {

    const [calendarDate, setCalenderDate] = useState(new Date().toDateString());
    const { onClose, open } = props;
    const classes = useStyles();
    const onChange = event => {
        console.log("DateClick 유효일자 :", event.target.value);
        setCalenderDate({ [event.target.name]: event.target.value });
    }
    const onClick = () => {
        onClose({
            data: calendarDate,
            division: 'CalendarDialog'
        });
    }
    return (
        <Dialog open={open} >

            <List>
                <FormControl style={{ minWidth: "450px" }}>
                    <form className={classes.container} noValidate>

                        <TextField name="estimateDate" label="유효일자" type={"date"} onChange={onChange} />
                        <Button onClick={onClick}>확인</Button>

                    </form>


                </FormControl>

            </List>
        </Dialog>
    );

}
export default Calendar;

Calendar.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

};