import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { hideOnDelivery,inboundRequest } from 'ERP/LOGISTIC/Action/Action';
import InboundDialog from 'ERP/LOGISTIC/Page/purchase/StockManagement/Presentational/InboundDialog';
import { selectDeliveryData, selectDeliveryOpen } from 'ERP/LOGISTIC/Selector/Selector';



const InboundDialogContainer = (props) => {

    const { isDeliveryOpen, deliveryData, hideOnDelivery, inboundRequest } = props;

    // 작업지시는 session 이용 //
    return (
          <>
            <InboundDialog
              deliveryData={deliveryData} 
              isDeliveryOpen={isDeliveryOpen}
              hideOnDelivery={hideOnDelivery}
              inboundRequest={inboundRequest}
            />
          </>
    )
};


const mapStateToProps = createStructuredSelector({
    deliveryData: selectDeliveryData,
    isDeliveryOpen: selectDeliveryOpen
})




export default connect(mapStateToProps, { hideOnDelivery, inboundRequest })(InboundDialogContainer);