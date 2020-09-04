import React from "react";
// import EstimateRegister from "./EstimateRegister";
import EsRegister from "./EsRegister";
// import EstimateRegisterDetail from "./EstimateRegisterDetail";
import { connect } from "react-redux";

import { dialogData } from "ERP/LOGISTIC/Action/Action";
import { amoutpriceData } from "ERP/LOGISTIC/Action/Action";
import { withRouter } from "react-router-dom";


const EstimateRegisterContainer = props => {

    const { dialogData, DialogData, amoutpriceData, standardUnitPrice } = props;
    return (
        <div>
{/* /////////////////////////////////////////////// 2020.08.24 양지훈 수정 //////////////////////////////////////////*/}

            <EsRegister />
            {/* <EstimateRegister dialogData={dialogData} DialogData={DialogData} /> */}
            {/* <EstimateRegisterDetail dialogData={dialogData} itemRowData={DialogData} amoutpriceData={amoutpriceData} standardUnitPrice={standardUnitPrice} /> */}

{/* /////////////////////////////////////////////// 2020.08.24 양지훈 수정 //////////////////////////////////////////*/}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        DialogData: state.LOGIReducer.DialogData,
        standardUnitPrice: state.LOGIReducer.standardUnitPrice,
    };
};
export default connect(mapStateToProps, { dialogData, amoutpriceData })(
    withRouter(EstimateRegisterContainer),
);
