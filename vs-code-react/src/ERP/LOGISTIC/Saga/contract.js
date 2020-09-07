//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import { put, delay, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";

// 수주가능한 견적 조회
function* searchContractSaga(action) {
    const params = action.payload;
    try {
        // if문으로 searchCondition(일자검색 or 기간검색)을 구분해서 axios 처리하기;
        const { data } = yield call( () =>
            axios.get (
                "http://localhost:8282/logi/sales/searchEstimateInContractAvailable.do",
                { params: { 
                    startDate: params.startDate,
                    endDate: params.endDate,
                }}),
        );
        yield delay(500);
        // yield put(actions.selectDayAttdSuccess(data.DayAttdTO));
        yield put({
            type: types.GET_ESTIMATE_SUCCESS,
            payload: data.gridRowJson,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: types.GET_ESTIMATE_FAILURE,
            payload: err,
        });
    }  
};

// 수주유형분류
function* searchCodeSaga(action) {
    try {
        const { data } = yield call( () =>
            axios.get(
                'http://localhost:8282/logi/base/codeList.do',
                { params: { divisionCode: 'CT' }, },
            ),
        );
        yield delay(500);
        yield put({
            type: types.GET_CODE_SUCCESS,
            payload: data.detailCodeList,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: types.GET_CODE_FAILURE,
            payload: err.response,
        });
    }
};

// 수주등록
function* addContractSaga(action) {
    const params = action.payload;
    yield;
    try {
        const { data } = yield call(() =>
            axios.post(
                "http://localhost:8282/logi/sales/addNewContract.do",        
               { batchList: params.batchObj,
                            contractDate: params.contractDate,
                            personCodeInCharge: params.personCodeInCharge },
               { headers: { "Content-Type": "application/json" } },
            ),
        );
        yield delay(500);
        yield put({
            type: types.ADD_CONTRACT_SUCCESS,
            payload: data,
        });
    } catch (err) {
        console.error('ADD_CONTRACT_FAILURE_error:: ',err);
        yield put({
            type: types.ADD_CONTRACT_FAILURE,
            payload: err.response.data,
        });
    }
};

// 견적취소
function* delEstimateSaga(action) {
    const params = action.payload;
    yield;
    try {
        const { data } = yield call(() =>
            axios.get(
                "http://localhost:8282/logi/sales/cancelEstimate.do",        
                {params: { estimateNo: params.estimateNo,},},
                { headers: { "Content-Type": "application/json" } },
            ),
        );
        yield delay(500);
        yield put({
            type: types.DELETE_ESTIMATE_SUCCESS,
            payload: data.canceldEstimateNo,
        });
    } catch (err) {
        console.error('ADD_CONTRACT_FAILURE_error:: ',err);
        yield put({
            type: types.DELETE_ESTIMATE_FAILURE,
            payload: err,
        });
    }
};

export default function* contractSaga() {
    yield takeLatest(types.GET_ESTIMATE_REQUEST,searchContractSaga);
    yield takeLatest(types.GET_CODE_REQUEST,searchCodeSaga);
    yield takeLatest(types.ADD_CONTRACT_REQUEST,addContractSaga);
    yield takeLatest(types.DELETE_ESTIMATE_REQUEST,delEstimateSaga);
};

//**************************************** 2020.09.06 양지훈 수정 종료 ****************************************