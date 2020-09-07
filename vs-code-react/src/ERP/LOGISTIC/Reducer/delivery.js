//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import _ from 'lodash';

const initialState = {
    deliveryData: [],
    isDeliveryOpen: false,
};

const deliveryReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.ON_DELIVERY_REQUEST:
            return _.update({ ...state }, 'isDeliveryOpen', () => true)
        case types.ON_DELIVERY_SUCCESS:
            return _.update({ ...state }, 'deliveryData', () => action.payload.gridRowJson)
        case types.ON_DELIVERY_FAILURE:
        case types.HIDE_ON_DELIVERY:
            return _.update({ ...state }, 'isDeliveryOpen', () => false)
        default:
            return state;
    }
};

export default deliveryReducer;
//**************************************** 2020.09.04 양지훈 수정 종료 ****************************************