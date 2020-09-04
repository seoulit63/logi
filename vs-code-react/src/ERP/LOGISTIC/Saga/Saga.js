import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
import * as actions from "ERP/LOGISTIC/Action/Action";
import { searchEstimate, dialogDataSuccess } from "ERP/LOGISTIC/Action/Action";
import { amoutpriceDataFailure, amoutpriceDataSuccess, customerNameFailure, workOrderSuccess, workOrderFailure, workSiteSuccess, workSiteFailure, onDeliverySuccess, onDeliveryFailure, stockLogSuccess, inboundSuccess, inboundFailure, stockLogFailure, actualOrderSuccess, actualOrderFailure } from "../Action/Action";
import { dialogDataFailure } from "../Action/Action";
function* EstimateSaga(action) {
    try {

        if (action.payload.type === "searchEstimateData") {
            const { data } = yield axios.get(
                "http://localhost:8282/logi/sales/searchEstimate.do",
                {
                    params: {
                        startDate: action.payload.startDate,
                        endDate: action.payload.endDate,
                        dateSearchCondition: action.payload.dateSearchCondition,
                    },
                },
            );
            yield put(searchEstimate(data.gridRowJson));
        }
        else if (action.payload.type === "searchEstimateDetail") {
            const { data } = yield axios.get(
                "http://localhost:8282/basicInfo/***********************",
            );
            yield put(actions.searchEstimateDetail(data.gridRowJson));

        }
        else if (action.payload.type === "addEstimate") {

        }
    } catch (error) {
        action.payload.history.put("/error");
    }
}



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
//다이얼로그 공통단
function* DialogSaga(action) {
    try {
        const { data } = yield axios.get(
            "http://localhost:8282/logi/base/codeList.do",
            {
                params: {
                    divisionCode: action.payload.divisionCode,
                },
            },
        );
        yield put(dialogDataSuccess(data));
    } catch (error) {
        console.log(error)
        yield put(dialogDataFailure(error));
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

function* amountPriceRequest(action) {
    try {
        const { data } = yield axios.get('http://localhost:8282/logi/logisticsInfo/getStandardUnitPrice.do', {
            params: { itemCode: action.payload }
        });
        yield put(amoutpriceDataSuccess(data.gridRowJson));
    } catch (e) {
        yield put(amoutpriceDataFailure(e.message));
    }
}


export default function* LogiSaga() {
    yield takeEvery(types.SEARCH_ESTIMATE_CODE, EstimateSaga);
    yield takeLatest(types.ON_DELIVERY_REQUEST, deliveryRequest);
    yield takeLatest(types.INBOUND_REQUEST, inboundRequest);
    yield takeLatest(types.STOCK_LOG_REQUEST, stockLogRequest);
    yield takeLatest(types.WORK_ORDER_REQUEST, workOrderRequest);
    yield takeLatest(types.WORK_SITE_REQUEST, workSiteRequest);
    yield takeLatest(types.ACTUAL_ORDER_REQUEST, orderRequest);
    yield takeLatest(types.AMOUNT_REDUCER, amountPriceRequest);
    yield takeEvery(types.DIALOGDATA_SAGA, DialogSaga);
}
