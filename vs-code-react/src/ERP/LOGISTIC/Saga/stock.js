//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import { stockLogSuccess, stockLogFailure } from "../Action/Action";

function* stockLogRequest(action) {
    try {
        if (action.type === "STOCK_LOG_REQUEST") {
            const { data = [] } = yield call(axios.post, 'http://localhost:8282/logi/purchase/searchStockLogList.do', null, {
                params: action.payload
            });
            yield console.log(data);
            yield put(stockLogSuccess(data));
        }
    } catch (e) {
        yield put(stockLogFailure(e.message));
    }
}

export default function* stockSaga() {
    yield takeLatest(types.STOCK_LOG_REQUEST, stockLogRequest);
}

//**************************************** 2020.09.01 양지훈 수정 종료 ****************************************