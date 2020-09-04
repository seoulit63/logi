import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { blue } from '@material-ui/core/colors';


const BalanceDialog = (props) => {

    // 여긴 뒷단과 연결 안되어있고 대차(debis)를 로컬로 가지고 있음.
    const debits = ['차변', '대변'];
    const useStyles = makeStyles({
        avatar: {
            backgroundColor: blue[100],
            color: blue[600],
        },
    });

    const classes = useStyles();
    const { onClose, open } = props;


    const handleListItemClick = value => {
        onClose({
            data : value,  // 대차 값을 가지고 감.
            division: 'balanceDialog'
        });
    };
    const close = () => {
        onClose({
            division: 'balanceDialog'
        });
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" onClose={()=>close()} open={open} >
            <DialogTitle id="simple-dialog-title">대차구분 선택</DialogTitle>
            <List>
                {debits.map(debit => (
                    <ListItem button onClick={() => handleListItemClick(debit)} key={debit}>
                        {/* handleListItemClick : 선택한 대차임. */}
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <CompareArrows />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={debit} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

BalanceDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default BalanceDialog; 