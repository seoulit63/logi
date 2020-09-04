import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";

const EstimateDialog = (props) => {

    const { onClose, open, DialogData } = props;

    const handleListItemClick = code => {
        onClose({
            data: code.detailCodeName,
            division: 'EstimateDialog'
        })
    }
    return (
        <Dialog open={open} >
            <DialogTitle id="simple-dialog-title">거래처 </DialogTitle>
            <List>


                {DialogData && DialogData.map(code => (
                    <ListItem
                        button
                        onClick={() => handleListItemClick(code)}
                        key={code}
                    >
                        <ListItemText primary={code.detailCode} />
                        <ListItemText primary={code.detailCodeName} />
                    </ListItem>
                ))}

                <ListItem
                    autoFocus
                    button
                    onClick={() => handleListItemClick("addAccount")}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem>
            </List>
        </Dialog>
    );
}

export default EstimateDialog;

EstimateDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

};