//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import _ from 'lodash';

const initialState = {
    rowData: [],
    subRowData: [],
    isOpen: false,
    isSubOpen: false,
};

const workOrderReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.WORK_ORDER_REQUEST:
            return _.update({ ...state }, 'isOpen', () => true)
        case types.WORK_ORDER_SUCCESS:
            return _.update({ ...state }, 'rowData', () => action.payload.result)
        case types.WORK_SITE_REQUEST:
            return _.update({ ...state }, 'isSubOpen', () => true)
        case types.WORK_SITE_SUCCESS:
            return _.update({ ...state }, 'subRowData', () => action.payload.detailCodeList)
        case types.ACTUAL_ORDER_SUCCESS:
            return _.update({ ...state })
        case types.WORK_ORDER_FAILURE:
        case types.WORK_SITE_FAILURE:
        default:
            return state;
    }
};

export default workOrderReducer;
//**************************************** 2020.09.04 양지훈 수정 종료 ****************************************