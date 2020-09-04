import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { hideDialog, workSiteRequest, actualOrderRequest } from 'ERP/LOGISTIC/Action/Action';
import WorkInstructionDialog from 'ERP/LOGISTIC/Page/WorkInstruction/Presentational/WorkInstructionDialog';
import { selectRowData, selectOpenDialog, selectCodeName } from '../../../Selector/Selector';



const WorkInstructionDialogContainer = (props) => {

    const { isOpen, subRowData, hideDialog, workSiteRequest, actualOrderRequest, codeName } = props;

            console.log(props)

    const [ paramData ] = useState({ divisionCode: "PP" });
    const [ today, setToday ] = useState(null);

    let now = new Date();   

    let year = now.getFullYear(); // 년도
    let month = now.getMonth() + 1;  // 월
    let date = now.getDate();  // 날짜

    let day = `${year}-${month}-${date}`

    const handleDate = () => {
          setToday(day);
          console.log(day);
        }
    
    const handleRequest = () => {
       workSiteRequest(paramData)
    }

    const handleActualRequest = () => {
        actualOrderRequest()
    }

    // 작업지시는 session 이용 //
    return (
        <WorkInstructionDialog
            handleDate={handleDate}
            handleRequest={handleRequest}
            handleActualRequest={handleActualRequest}
            subRowData={subRowData}
            isOpen={isOpen}
            codeName={codeName}
            hideDialog={hideDialog}
            today={today}
         />
    )
};


const mapStateToProps = createStructuredSelector({
      subRowData: selectRowData,
      isOpen: selectOpenDialog,
      codeName: selectCodeName
    })
  





export default connect(mapStateToProps, {workSiteRequest, actualOrderRequest, hideDialog})(WorkInstructionDialogContainer);