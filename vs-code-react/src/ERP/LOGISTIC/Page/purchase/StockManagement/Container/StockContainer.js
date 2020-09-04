import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'

import { onDeliveryRequest } from 'ERP/LOGISTIC/Action/Action';

import Stock from 'ERP/LOGISTIC/Page/purchase/StockManagement/Presentational/Stock';


const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: 'http://localhost:8282/logi/purchase/' })
  })

const StockContainer = (props) => {

const { onDeliveryRequest } = props;

const [ rowData, setRowData ] = useState(null);
const [ today, setToday ] = useState(null);


let now = new Date();   

let year = now.getFullYear(); // 년도
let month = now.getMonth() + 1;  // 월
let date = now.getDate();  // 날짜

let day = `${year}-${month}-${date}`

const handleDate = () => {
      setToday(day);
      console.log(day);
    }

const [{ data = [], loading, error }, handleClick] =
    useAxios('/searchStockList.do', {
      manual: true
    });

useEffect(
        () => setRowData(data.gridRowJson)
        ,[data]
        );
    

    return (
            <>
                <Stock
                    onDeliveryRequest={onDeliveryRequest}
                    handleClick={handleClick}
                    handleDate={handleDate}
                    rowData={rowData}
                    today={today}
                />
            </>
    )

}

export default connect(null, { onDeliveryRequest })(StockContainer);