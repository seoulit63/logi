import React from "react";
import EmpDetailed from "../EmpDetailed/EmpDetailed";
import { connect } from "react-redux";
import { PositionListRequest } from "ERP/HR/Action/Action";
import { EmpDetailedInfoRequest } from "ERP/HR/Action/Action";
import {  EmpUpdateRequest } from "ERP/HR/Action/Action";


const EmpDetailedContainer = props => {
  const { PositionListRequest,EmpDetailedInfoRequest, EmpUpdateRequest, 
    positionList, empDetailedInfo, company, workPlace } = props;


  /* console.log("company", company);
  console.log("workplace", workPlace);
  console.log("positionList", positionList);
  console.log("empDetailedInfo", empDetailedInfo);
  console.log("selectedValueRequest", selectedValueRequest); */


  return (
    <div>
      <EmpDetailed
        PositionListRequest={PositionListRequest}
        EmpDetailedInfoRequest ={EmpDetailedInfoRequest}
        EmpUpdateRequest={ EmpUpdateRequest}
        companyCode={company}
        workPlaceCode={workPlace}
        positionList={positionList}
        empDetailedInfo={empDetailedInfo}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    status: state.HrReducer.status,
    errorCode: state.HrReducer.errorCode,
    errorMsg: state.HrReducer.errorMsg,
    company: state.HrReducer.company,
    workPlace: state.HrReducer.workPlace,
    positionList: state.HrReducer.positionList,
    empDetailedInfo: state.HrReducer.empDetailedInfo,

  };
};

export default connect(mapStateToProps, { PositionListRequest ,EmpDetailedInfoRequest,  EmpUpdateRequest })(EmpDetailedContainer);
