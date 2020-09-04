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

const ItemDialog = (props) => {


    const { onClose, open, itemRowData } = props;
    const handleListItemClick = code => {
        onClose({
            data: {
                codeData: code.detailCode,
                codeNameData: code.detailCodeName
            },
            division: 'ItemDialog'
        })
    }
    return (
        <Dialog open={open} >
            <DialogTitle id="simple-dialog-title">거래처 </DialogTitle>
            <List>


                {itemRowData && itemRowData.map(code => (
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

export default ItemDialog;

ItemDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

};