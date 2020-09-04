import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'

import InstructionStatus from 'ERP/LOGISTIC/Page/WorkInstruction/Presentational/InstructionStatus';

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: 'http://localhost:8282/logi/production/' })
})


const InstructionStatusContainer = () => {

  const [ rowData, setRowData ] = useState(null);

  const [{ data = [], loading, error }, handleClick] =
  useAxios('/showWorkOrderInfoList.do', {
    manual: true
  });

  useEffect(
    () => {
      console.log(data);
      setRowData(data.gridRowJson)}
    ,[data]
    );



return (
    <>
      <InstructionStatus
        rowData={rowData}
        handleClick={handleClick}
      />
    </>
);
};

export default InstructionStatusContainer