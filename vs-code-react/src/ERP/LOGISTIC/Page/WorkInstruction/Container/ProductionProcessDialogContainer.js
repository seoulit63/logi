import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; 

import { hideSubDialog } from 'ERP/LOGISTIC/Action/Action';
import ProductionProcessDialog from 'ERP/LOGISTIC/Page/WorkInstruction/Presentational/ProductionProcessDialog';
import { selectSubRowData, selectOpenSubDialog } from '../../../Selector/Selector';

      
const ProductionProcessDialogContainer = ({ isSubOpen, subRowData, hideSubDialog }) => {


const onRowSelected = event => {
  console.log(event);
  if (event.node.selected) {
   hideSubDialog(event.data.detailCodeName)
  }
};

const handleClose = event => {
  hideSubDialog("");
}

  return (
    <ProductionProcessDialog
        onRowSelected={onRowSelected}
        isSubOpen={isSubOpen}
        subRowData={subRowData}
        handleClose={handleClose}
    />
  );
}

const mapStateToProps = createStructuredSelector({
    subRowData: selectSubRowData,
    isSubOpen: selectOpenSubDialog
  })




export default connect(mapStateToProps,{ hideSubDialog })(ProductionProcessDialogContainer);