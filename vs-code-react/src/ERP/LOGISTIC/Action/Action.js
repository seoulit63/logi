import { createAction } from "redux-actions";
import * as types from "ERP/LOGISTIC/ActionType/ActionType";

export const searchEstimateCode = createAction(types.SEARCH_ESTIMATE_CODE);
export const searchEstimate = createAction(types.SEARCH_ESTIMATE);
export const searchEstimateDetail = createAction(types.SEARCH_ESTIMATE_DETAIL);


//견적
export const dialogData = createAction(types.DIALOGDATA_SAGA);
export const dialogDataSuccess = createAction(types.DIALOGDATA_SUCCESS);
export const dialogDataFailure = createAction(types.DIALOGDATA_FAILURE);
export const calendarData = createAction(types.CALENDAR_REDUCER);
export const calendarDataSuccess = createAction(types.CALENDAR_SUCCESS);
export const calendarDataFailure = createAction(types.CALENDAR_FAILURE);
export const amoutpriceData = createAction(types.AMOUNT_REDUCER);
export const amoutpriceDataSuccess = createAction(types.AMOUNT_SUCCESS);
export const amoutpriceDataFailure = createAction(types.AMOUNT_FAILURE);

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