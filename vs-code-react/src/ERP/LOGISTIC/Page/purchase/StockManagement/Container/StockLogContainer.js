import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import {stockLogRequest} from 'ERP/LOGISTIC/Action/Action';
import StockLog from 'ERP/LOGISTIC/Page/purchase/StockManagement/Presentational/StockLog';
import moment from 'moment';
import { selectStockLog } from 'ERP/LOGISTIC/Selector/Selector';




const StockLogContainer = (props) => {

    const { stockLogRequest, logData } = props;

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleStartDate = (event) => {
       
      setStartDate(event.target.value);
    };

    const handleEndDate = (event) => {
    
      setEndDate(event.target.value);
    };

    const paramData = {
            startDate: moment(startDate).format('yyyy-MM-DD'),
            endDate: moment(endDate).format('yyyy-MM-DD')
        }

    const handleClick = () => {
        stockLogRequest(paramData);
    };


    return (
            <>
                <StockLog
                    stockLogRequest={stockLogRequest}
                    logData={logData}
                    handleClick={handleClick}
                    handleStartDate={handleStartDate}
                    handleEndDate={handleEndDate}
                    startDate={startDate}
                    endDate={endDate}
                />
            </>
    )

}

const mapStateToProps = createStructuredSelector({
    logData: selectStockLog
})

export default  connect(mapStateToProps, { stockLogRequest })(StockLogContainer);