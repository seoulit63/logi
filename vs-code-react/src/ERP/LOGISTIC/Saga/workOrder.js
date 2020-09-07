//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import {
    workOrderSuccess,
    workOrderFailure,
    workSiteSuccess,
    workSiteFailure,
    actualOrderSuccess,
    actualOrderFailure
} from "../Action/Action";


function* workOrderRequest(action) {
    try {
        if (action.type === "WORK_ORDER_REQUEST") {
            const { data = [] } = yield call(axios.post, 'http://localhost:8282/logi/production/showWorkOrderDialog.do', null, {
                params: action.payload
            });
            // post 요청시 무조건 3번 째 인자에 params 객체가 들어가야 한다는 거 잊지말자 //
            yield console.log(data);
            yield put(workOrderSuccess(data));
        }
    } catch (e) {
        yield put(workOrderFailure(e.message));
    }
}

function* workSiteRequest(action) {
    try {
        if (action.type === "WORK_SITE_REQUEST") {
            const { data = [] } = yield axios.get('http://localhost:8282/logi/base/codeList.do', {
                params: action.payload
            });
            yield console.log(data);
            yield put(workSiteSuccess(data));
        }
    } catch (e) {
        yield put(workSiteFailure(e.message));
    }
}

function* orderRequest(action) {
    try {
        yield call(axios.get, 'http://localhost:8282/logi/production/workOrder.do', {
            params: action.payload
        });
        yield put(actualOrderSuccess());
    } catch (e) {
        yield put(actualOrderFailure(e.message));
    }
}

export default function* workOrderSaga() {
    yield takeLatest(types.WORK_ORDER_REQUEST, workOrderRequest);
    yield takeLatest(types.WORK_SITE_REQUEST, workSiteRequest);
    yield takeLatest(types.ACTUAL_ORDER_REQUEST, orderRequest);
}

//**************************************** 2020.09.01 양지훈 수정 종료 ****************************************