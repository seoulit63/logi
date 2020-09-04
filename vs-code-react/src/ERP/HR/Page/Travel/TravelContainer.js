import React from "react";
import Travel from "./Travel";
import { connect } from "react-redux";
import { restAttdRequest } from "ERP/HR/Action/Action";
import { withRouter } from "react-router-dom";

//*************************초과근무 신청 =시작= 유찬 _20.08.31 *************************
const TravelContainer = props => {
  const { status, errorCode, errorMsg } = props;

  return (
    <div>
      <Travel
      status={status}
      errorCode={errorCode}
      errorMsg={errorMsg}
      />
    </div>
  );
};

const mapStateToProps = state => {

  return {
    status: state.restAttdReducer.status,
    errorCode: state.restAttdReducer.errorCode,
    errorMsg: state.restAttdReducer.errorMsg,
  };
};
export default connect(mapStateToProps, { restAttdRequest })(
  withRouter(TravelContainer)
);

//*************************초과근무 신청 =시작= 유찬 _20.08.31 *************************