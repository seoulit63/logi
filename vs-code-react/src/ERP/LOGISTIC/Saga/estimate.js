//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "../ActionType/ActionType";
import { searchEstimateDetail, searchEstimate, amoutpriceDataFailure, amoutpriceDataSuccess, } from "../Action/Action";

function* EstimateSaga1(action) {
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
            yield put(searchEstimateDetail(data.gridRowJson));

        }
        else if (action.payload.type === "addEstimate") {

        }
    } catch (error) {
        action.payload.history.put("/error");
    }
}

// 단가
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

export default function* estimateSaga() {
    yield takeEvery(types.SEARCH_ESTIMATE_CODE, EstimateSaga1);
    yield takeLatest(types.AMOUNT_REDUCER, amountPriceRequest);
}

//**************************************** 2020.09.01 양지훈 수정 종료 ****************************************