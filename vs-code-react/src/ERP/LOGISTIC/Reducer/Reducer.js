import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import _ from 'lodash';

const initialState = {
    rowData: [],
    subRowData: [],
    deliveryData: [],
    logData: [],
    inbData: [],
    EstimaterowData: [],
    DialogData: [],
    CalendarowData: [],
    isOpen: false,
    isSubOpen: false,
    isDeliveryOpen: false,
    codeName: "",
    errorMessage: undefined,
    standardUnitPrice: 0
};

const LOGIReducer = (state = initialState, action) => {

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
        case types.WORK_ORDER_REQUEST:
            return _.update({ ...state }, 'isOpen', () => true)
        case types.WORK_ORDER_SUCCESS:
            return _.update({ ...state }, 'rowData', () => action.payload.result)
        case types.WORK_SITE_REQUEST:
            return _.update({ ...state }, 'isSubOpen', () => true)
        case types.WORK_SITE_SUCCESS:
            return _.update({ ...state }, 'subRowData', () => action.payload.detailCodeList)
        case types.INBOUND_REQUEST:
            return _.update({ ...state }, 'isInbOpen', () => true)
        case types.INBOUND_SUCCESS:
            return _.update({ ...state }, 'inbData', () => action.payload.gridRowJson)
        case types.ON_DELIVERY_REQUEST:
            return _.update({ ...state }, 'isDeliveryOpen', () => true)
        case types.ON_DELIVERY_SUCCESS:
            return _.update({ ...state }, 'deliveryData', () => action.payload.gridRowJson)
        case types.ACTUAL_ORDER_SUCCESS:
            return _.update({ ...state })
        case types.STOCK_LOG_REQUEST:
            return {
                ...state
            }
        case types.STOCK_LOG_SUCCESS:
            return _.update({ ...state }, 'logData', () => action.payload.gridRowJson)
        case types.WORK_ORDER_FAILURE:
        case types.WORK_SITE_FAILURE:
        case types.INBOUND_FAILURE:
        case types.ON_DELIVERY_FAILURE:
        case types.STOCK_LOG_FAILURE:
            return _.update({ ...state }, 'errorMessage', () => action.payload)
        case types.HIDE_DIALOG:
            return _.update({ ...state }, 'isOpen', () => false)
        case types.HIDE_SUB_DIALOG:
            return {
                ...state,
                isSubOpen: false,
                codeName: action.payload
            }
        case types.HIDE_ON_DELIVERY:
            return _.update({ ...state }, 'isDeliveryOpen', () => false)
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

export default LOGIReducer;
