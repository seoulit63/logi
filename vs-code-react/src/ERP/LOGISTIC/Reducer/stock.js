//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import _ from 'lodash';


const initialState = {
    logData: [],
    errorMessage: undefined,
};

const stockReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.STOCK_LOG_REQUEST:
            return {
                ...state
            }
        case types.STOCK_LOG_SUCCESS:
            return _.update({ ...state }, 'logData', () => action.payload.gridRowJson)
        case types.STOCK_LOG_FAILURE:
            return _.update({ ...state }, 'errorMessage', () => action.payload)
        default:
            return state;
    }
};

export default stockReducer;
//**************************************** 2020.09.04 양지훈 수정 종료 ****************************************