import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { makeUseAxios } from 'axios-hooks'
import WISubDialog from 'ERP/LOGISTIC/Page/WorkInstruction/Presentational/WISubDialog';


const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: 'http://localhost:8282/logi/production/' })
  })



const WISubDialogContainer = ({ setIsSubOpen }) => {

    // const [{ data = [], loading, error }, handleInstruction] = useAxios({
    //     url: '/WorkOrder.do',
    //     //params: workPlaceCode, productionProcess,
    //     method: 'POST'
    // });



    // const handleInstruction = () => {
    //     setIsSubOpen(false);
    // }

    const handleClose = () => {
        setIsSubOpen(false);
    }

    return (
       <>
        <WISubDialog
            handleClose={handleClose}
        />
       </>
    )
}

export default WISubDialogContainer;