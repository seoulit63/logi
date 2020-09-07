//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import _ from 'lodash';

const initialState = {
    inbData: [],
    isInbOpen:false,
};

const warehouseReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.INBOUND_REQUEST:
            return _.update({ ...state }, 'isInbOpen', () => true)
        case types.INBOUND_SUCCESS:
            return _.update({ ...state }, 'inbData', () => action.payload.gridRowJson)
        case types.INBOUND_FAILURE:
        default:
            return state;
    }
};

export default warehouseReducer;
//**************************************** 2020.09.04 양지훈 수정 종료 ****************************************