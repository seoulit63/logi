//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import _ from 'lodash';

const initialState = {
    EstimaterowData: [],
    DialogData: [],
    CalendarowData: [],
    isOpen: false,
    isSubOpen: false,
    codeName: "",
    standardUnitPrice: 0
};

const estimateReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_ESTIMATE:
            return {
                ...state,
                EstimaterowData: action.payload,
                isLoading: true
            };
        case types.CALENDAR_REDUCER:
            return {
                ...state,
            };
        case types.CALENDAR_SUCCESS:
            return {
                ...state,
                CalendarowData: action.payload,
            };
        case types.CALENDAR_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case types.DIALOGDATA_SAGA:
            return {
                ...state,
            };
        case types.DIALOGDATA_SUCCESS:
            return {
                ...state,
                DialogData: action.payload.detailCodeList,
            };
        case types.DIALOGDATA_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case types.HIDE_DIALOG:
            return _.update({ ...state }, 'isOpen', () => false)
        case types.HIDE_SUB_DIALOG:
            return {
                ...state,
                isSubOpen: false,
                codeName: action.payload
            }
        case types.AMOUNT_SUCCESS:
            return {
                ...state,
                standardUnitPrice: action.payload
            }
        case types.AMOUNT_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default estimateReducer;

//**************************************** 2020.09.04 양지훈 수정 종료 ****************************************