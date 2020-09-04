import React from "react";
import Estimate from "./Estimate";
import { connect } from "react-redux";
import { searchEstimateCode } from "ERP/LOGISTIC/Action/Action";
import { withRouter } from "react-router-dom";

const EstimateContainer = props => {
  const { searchEstimateCode, EstimaterowData } = props;

  return (
    <div>
      <Estimate searchEstimateCode={searchEstimateCode} EstimaterowData={EstimaterowData} />
    </div>
  );
};

const mapStateToProps = state => {

  return {
    EstimaterowData: state.LOGIReducer.EstimaterowData,
  };
};
export default connect(mapStateToProps, { searchEstimateCode })(
  withRouter(EstimateContainer),
);
