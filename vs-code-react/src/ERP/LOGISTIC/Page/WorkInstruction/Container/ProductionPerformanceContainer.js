import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'

import ProductionPerformance from 'ERP/LOGISTIC/Page/WorkInstruction/Presentational/ProductionPerformance';



const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: 'http://localhost:8282/logi/production/' })
})


const ProductionPerformanceContainer = () => {

  const [rowData, setRowData] = useState(null);
  
  const [{ data = [], loading, error }, handleClick] =
  useAxios('/getProductionPerformanceInfoList.do', {
    manual: true
  });


  useEffect( 
    () => {
      console.log(data)
      setRowData(data.gridRowJson)}
    ,[data]
    );
    //2번 실행되는거 막기 //

return (
    <>
        <ProductionPerformance
          handleClick={handleClick}
          rowData={rowData}  
        />
    </>
);
};

export default ProductionPerformanceContainer