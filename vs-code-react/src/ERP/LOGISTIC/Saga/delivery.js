//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import { onDeliverySuccess, onDeliveryFailure } from "../Action/Action";

function* deliveryRequest(action) {
    try {
        if (action.type === "ON_DELIVERY_REQUEST") {
            const { data = [] } = yield axios.get('http://localhost:8282/logi/purchase/searchOrderInfoListOnDelivery.do');
            yield console.log(data);
            yield put(onDeliverySuccess(data));
        }
    } catch (e) {
        yield put(onDeliveryFailure(e.message));
    }
}

export default function* deliverySaga() {
    yield takeLatest(types.ON_DELIVERY_REQUEST, deliveryRequest);
}

//**************************************** 2020.09.01 양지훈 수정 종료 ****************************************