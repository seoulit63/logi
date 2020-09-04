import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'

import WorkInstructions from 'ERP/LOGISTIC/Page/WorkInstruction/Presentational/WorkInstructions';

import { connect } from 'react-redux';
import { workOrderRequest } from 'ERP/LOGISTIC/Action/Action';



const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: 'http://localhost:8282/logi/production/' })
})

const WorkInstructionsContainer = ({ workOrderRequest }) => {

  const [ rowData, setRowData ] = useState(null);
  const [paramData, setParamData] = useState({ mrpNo: "" });

 const onRowSelected = event => {
    console.log(event);
    if (event.node.selected) {
      setParamData({
        mrpNo: event.data.mrpNo
      });
    }
  };

const [{ data = [], loading, error }, handleClick] =
  useAxios('/getWorkOrderableMrpList.do', {
    manual: true
  });

const handleRequest = () => {
  workOrderRequest(paramData);
}

useEffect( 
    () => setRowData(data.result)
    ,[data]
    );


 
return (
    <>
      <WorkInstructions
        onRowSelected={onRowSelected}
        handleClick={handleClick}
        handleRequest={handleRequest}
        rowData={rowData}
      />
    </>
);
};



export default connect(null, { workOrderRequest })(WorkInstructionsContainer);