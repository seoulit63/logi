import React from 'react';
import DayAttdManage from './DayAttdManage';
import { connect } from 'react-redux';
import { SearchDayAttdListRequest, updateDayAttdList } from 'ERP/HR/Action/Action';
import { withRouter } from "react-router-dom";

//======================재영 일근태관리 컨테이너======================//

const DayAttdManagerContainer = (props) => {
    const { dayAttdMgtList, SearchDayAttdListRequest, updateDayAttdList, errorCode, errorMsg }=props;

    const searchDayAttd= (searchDate) => {
        SearchDayAttdListRequest({ cday:searchDate });
    }
    return(
        <div>
        <DayAttdManage 
            searchDayAttd={searchDayAttd}
            updateDayAttdList={updateDayAttdList}
            dayAttdMgtList={dayAttdMgtList}  
            errorCode={errorCode}
            errorMsg={errorMsg}
        />
        </div>
    )

}

const mapStateToProps=(state) =>{
    return{
        errorCode: state.HrReducer.errorCode,
        errorMsg: state.HrReducer.errorMsg,
        dayAttdMgtList: state.HrReducer.dayAttdMgtList,
    };
}

export default connect(mapStateToProps,{SearchDayAttdListRequest, updateDayAttdList })(withRouter(DayAttdManagerContainer));