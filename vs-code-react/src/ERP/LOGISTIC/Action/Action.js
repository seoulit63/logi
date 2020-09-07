import { createAction } from "redux-actions";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";
//**************************************** 2020.09.03 양지훈 수정 시작 ****************************************
//description:  견적 주석위치 변경
//              ContractAction 추가

// 견적
export const searchEstimateCode = createAction(types.SEARCH_ESTIMATE_CODE);
export const searchEstimate = createAction(types.SEARCH_ESTIMATE);
export const searchEstimateDetail = createAction(types.SEARCH_ESTIMATE_DETAIL);
export const dialogData = createAction(types.DIALOGDATA_SAGA);
export const dialogDataSuccess = createAction(types.DIALOGDATA_SUCCESS);
export const dialogDataFailure = createAction(types.DIALOGDATA_FAILURE);
export const calendarData = createAction(types.CALENDAR_REDUCER);
export const calendarDataSuccess = createAction(types.CALENDAR_SUCCESS);
export const calendarDataFailure = createAction(types.CALENDAR_FAILURE);
export const amoutpriceData = createAction(types.AMOUNT_REDUCER);
export const amoutpriceDataSuccess = createAction(types.AMOUNT_SUCCESS);
export const amoutpriceDataFailure = createAction(types.AMOUNT_FAILURE);

//******************** 수주 ********************

// 수주등록 - 수주유형분류 - 모달창
export const searchCodeReqAction = createAction(types.GET_CODE_REQUEST);
export const searchCodeSuccAction = createAction(types.GET_CODE_SUCCESS);
export const searchCodeFailAction = createAction(types.GET_CODE_FAILURE);

//수주등록 - 수주가능한견적
export const searchEsReqAction = createAction(types.GET_ESTIMATE_REQUEST);
export const searchEsSuccAction = createAction(types.GET_ESTIMATE_SUCCESS);
export const searchEsFailAction = createAction(types.GET_ESTIMATE_FAILURE);
export const searchEsUpdateAction = createAction(types.GET_ESTIMATE_UPDATE);
// export const searchEsAction = data => ({ type: GET_ESTIMATE_REQUEST, data}); -->
export const searchEsDetailReqAction = createAction(types.GET_ESTIMATE_DETAIL_REQUEST);
export const searchEsDetailSuccAction = createAction(types.GET_ESTIMATE_DETAIL_SUCCESS);
export const searchEsDetailFailAction = createAction(types.GET_ESTIMATE_DETAIL_FAILURE);

// 수주등록 - 수주등록 버튼
export const addContractAction = createAction(types.ADD_CONTRACT_REQUEST);
// 수주등록 - 견적취소버튼
export const delEstimateAction = createAction(types.DELETE_ESTIMATE_REQUEST);

//**************************************** 2020.09.03 양지훈 수정 종료 ****************************************

// 작업 지시 
export const workOrderRequest = createAction(types.WORK_ORDER_REQUEST);
export const workOrderSuccess = createAction(types.WORK_ORDER_SUCCESS);
export const workOrderFailure = createAction(types.WORK_ORDER_FAILURE);
export const workSiteRequest = createAction(types.WORK_SITE_REQUEST);
export const workSiteSuccess = createAction(types.WORK_SITE_SUCCESS);
export const workSiteFailure = createAction(types.WORK_SITE_FAILURE);
export const onDeliveryRequest = createAction(types.ON_DELIVERY_REQUEST);
export const onDeliverySuccess = createAction(types.ON_DELIVERY_SUCCESS);
export const onDeliveryFailure = createAction(types.ON_DELIVERY_FAILURE);
export const stockLogRequest = createAction(types.STOCK_LOG_REQUEST);
export const stockLogSuccess = createAction(types.STOCK_LOG_SUCCESS);
export const stockLogFailure = createAction(types.STOCK_LOG_FAILURE);
export const inboundRequest = createAction(types.INBOUND_REQUEST);
export const inboundSuccess = createAction(types.INBOUND_SUCCESS);
export const inboundFailure = createAction(types.INBOUND_FAILURE);
export const actualOrderRequest = createAction(types.ACTUAL_ORDER_REQUEST);
export const actualOrderSuccess = createAction(types.ACTUAL_ORDER_SUCCESS);
export const actualOrderFailure = createAction(types.ACTUAL_ORDER_FAILURE);

export const hideDialog = createAction(types.HIDE_DIALOG);
export const hideSubDialog = createAction(types.HIDE_SUB_DIALOG);
export const hideOnDelivery = createAction(types.HIDE_ON_DELIVERY);
