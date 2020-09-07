//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import { inboundSuccess, inboundFailure } from "../Action/Action";

function* inboundRequest(action) {
    try {
        if (action.type === "INBOUND_REQUEST") {
            const { data = [] } = yield call(axios.get, 'http://localhost:8282/logi/purchase/warehousing.do');
            yield console.log(data);
            yield put(inboundSuccess(data));
        }
    } catch (e) {
        yield put(inboundFailure(e.message));
    }
}

export default function* warehouseSaga() {
    yield takeLatest(types.INBOUND_REQUEST, inboundRequest);
}

//**************************************** 2020.09.01 양지훈 수정 종료 ****************************************