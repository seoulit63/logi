// 기 초 정 보 관 리 =========================================================================================================================

// 물 류 정 보 관 리 =========================================================================================================================

// 영 업 관 리 =========================================================================================================================
export { default as Estimate } from "ERP/LOGISTIC/Page/Estimate/EstimateContainer"; // 견적관리 -> 견적조회 및 수정
export { default as EstimateRegister } from 'ERP/LOGISTIC/Page/Estimate/EstimateRegisterContainer';   // 견적관리 -> 견적조회 및 수정
//******************** 2020.09.04 63기 양지훈 수정 시작 ********************
export { default as Contract } from "ERP/LOGISTIC/Page/Contract/ContractContainer"; // 수주관리
//******************** 2020.09.04 63기 양지훈 수정 종료 ********************
export { default as Delivery } from "ERP/LOGISTIC/Page/Delivery/Delivery"; // 납품관리 ->

// 자 재 구 매 관 리 =========================================================================================================================
export { default as OrderRegister } from "ERP/LOGISTIC/Page/purchase/orderRegister/OrderRegisterContainer"; // 발주 및 재고처리	/app/logi/purchase/order
export { default as StockManagement } from "ERP/LOGISTIC/Page/purchase/StockManagement/StockManagement"; // 재고 관리
export { default as Bom } from "ERP/LOGISTIC/Page/Bom/Bom"; // 자재명세관리(BOM) 2020-09-03 정대현  

// 생 산 관 리 =========================================================================================================================
export { default as MpsRegister } from "ERP/LOGISTIC/Page/mps/MpsRegister"; // MPS
export { default as WorkInstruction } from "ERP/LOGISTIC/Page/WorkInstruction/WorkInstruction"; // 작업지시
/***********************************63기 김태윤 Mrp수정********************************************/
export { default as MrpResisterAndGather } from "ERP/LOGISTIC/Page/Mrp/MrpResisterAndGather"; // Mrp
/*******************************************************************************/

