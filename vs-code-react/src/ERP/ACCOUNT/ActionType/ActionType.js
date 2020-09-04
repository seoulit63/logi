//일반 전표
//***************** 2020-08-28 정대현 추가 *****************
export const SET_JOURNAL_NO_REQUEST =  
  "SET_JOURNAL_NO_REQUEST-Saga";
export const SET_JOURNAL_NO_SUCCESS =  
  "SET_JOURNAL_NO_SUCCESS-Reducer";
  export const SET_JOURNAL_NO_FAILURE =
  "SEARCH_PERIOD_NO_FAILURE-Reducer";
//***************** 2020-08-28 정대현 추가 여기까지*****************
//기수번호
export const SEARCH_PERIOD_NO_REQUEST =
  "SEARCH_PERIOD_NO_REQUEST-Saga";
export const SEARCH_PERIOD_NO_SUCCESS =
  "SEARCH_PERIOD_NO_SUCCESS-Reducer";
export const SEARCH_PERIOD_NO_FAILURE =
  "SEARCH_PERIOD_NO_FAILURE-Reducer";
//전표조회
export const SEARCH_SLIP_REQUEST =
  "SEARCH_SLIP_REQUEST-Saga";
export const SEARCH_SLIP_SUCCESS =
  "SEARCH_SLIP_SUCCESS-Reducer";
export const SEARCH_SLIP_FAILURE =
  "SEARCH_SLIP_FAILURE-Reducer";
//분개조회
export const SEARCH_JOURNAL_REQUEST =
  "SEARCH_JOURNAL_REQUEST-Saga";
export const SEARCH_JOURNAL_SUCCESS =
  "SEARCH_JOURNAL_SUCCESS-Reducer";
export const SEARCH_JOURNAL_FAILURE =
  "SEARCH_JOURNAL_FAILURE-Reducer";
//분개 다이얼로그
//계정과목 조회
export const SEARCH_ACCOUNT_REQUEST =
  "SEARCH_ACCOUNT_REQUEST-Saga";
export const SEARCH_ACCOUNT_SUCCESS =
  "SEARCH_ACCOUNT_SUCCESS-Reducer";
export const SEARCH_ACCOUNT_FAILURE =
  "SEARCH_ACCOUNT_FAILURE-Reducer";
  //거래처 조회
export const SEARCH_CUSTOMER_REQUEST =
  "SEARCH_CUSTOMER_REQUEST-Saga";
export const SEARCH_CUSTOMER_SUCCESS =
  "SEARCH_CUSTOMER_SUCCESS-Reducer";
export const SEARCH_CUSTOMER_FAILURE =
  "SEARCH_CUSTOMER_FAILURE-Reducer";
//전표저장
export const ADD_SLIP_REQUEST =
  "ADD_SLIP_REQUEST-Saga";
export const ADD_SLIP_SUCCESS =
  "ADD_SLIP_SUCCESS-Reducer";
export const ADD_SLIP_FAILURE =
  "ADD_SLIP_FAILURE-Reducer";

//전표승인
//전표승인조회(전표)
export const SEARCH_AM_SLIP_REQUEST =
  "SEARCH_AM_SLIP_REQUEST-Saga";
export const SEARCH_AM_SLIP_SUCCESS =
  "SEARCH_AM_SLIP_SUCCESS-Reducer";
export const SEARCH_AM_SLIP_FAILURE =
  "SEARCH_AM_SLIP_FAILURE-Reducer";
//전표승인조회(분개)
export const SEARCH_AM_JOURNAL_REQUEST =
  "SEARCH_AM_JOURNAL_REQUEST-Saga";
export const SEARCH_AM_JOURNAL_SUCCESS =
  "SEARCH_AM_JOURNAL_SUCCESS-Reducer";
export const SEARCH_AM_JOURNAL_FAILURE =
  "SEARCH_AM_JOURNAL_FAILURE-Reducer";
//승인저장
export const UPDATE_SLIP_REQUEST =
  "UPDATE_SLIP_REQUEST-Saga";
export const UPDATE_SLIP_FAILURE =
  "UPDATE_SLIP_FAILURE-Reducer";

//분개장조회
export const SEARCH_FINANCIAL_REQUEST =
  "SEARCH_FINANCIAL_REQUEST-Saga";
export const SEARCH_FINANCIAL_SUCCESS =
  "SEARCH_FINANCIAL_SUCCESS-Reducer";
export const SEARCH_FINANCIAL_FAILURE =
  "SEARCH_FINANCIAL_FAILURE-Reducer";

//재무상태표 조회
export const SEARCH_JOURNAL_FROM_REQUEST =
  "SEARCH_JOURNAL_FROM_REQUEST-Saga";
export const SEARCH_JOURNAL_FROM_SUCCESS =
  "SEARCH_JOURNAL_FROM_SUCCESS-Reducer";
export const SEARCH_JOURNAL_FROM_FAILURE =
  "SEARCH_JOURNAL_FROM_FAILURE-Reducer";

//합계잔액시산표 조회
export const SEARCH_TOTALTRIAL_REQUEST =
  "SEARCH_TOTALTRIAL_REQUEST-Saga";
export const SEARCH_TOTALTRIAL_SUCCESS =
  "SEARCH_TOTALTRIAL_SUCCESS-Reducer";
export const SEARCH_TOTALTRIAL_FAILURE =
  "SEARCH_TOTALTRIAL_FAILURE-Reducer";

//********************************** 2020-08-24 조편백 추가 **********************************
//손익계산서 조회
export const SEARCH_INCOME_REQUEST = "SEARCH_INCOME_REQUEST_SAGA";
export const SEARCH_INCOME_SUCCESS = "SEARCH_INCOME_SUCCESS_SAGA";
export const SEARCH_INCOME_FAILURE = "SEARCH_INCOME_FAILURE_SAGA";
//********************************** 2020-08-24 조편백 끝 **********************************

//********************************** 2020-08-24 정대현 추가 **********************************
//현금출납장조회
export const SEARCH_CASHJOURNAL_REQUEST =
  "SEARCH_CASHJOURNAL_REQUEST-Saga";
export const SEARCH_CASHJOURNAL_SUCCESS =
  "SEARCH_CASHJOURNAL_SUCCESS-Reducer";
export const SEARCH_CASHJOURNAL_FAILURE =
  "SEARCH_CASHJOURNAL_FAILURE-Reducer";

//********************************** 2020-08-24 정대현 추가 여기까지 ***************************

//********************************** 2020-08-24 김진호 추가 **********************************
//일(월)계표
export const SEARCH_DETAILTRIAL_REQUEST =
  "SEARCH_DETAILTRIAL_REQUEST-Saga";
export const SEARCH_DETAILTRIAL_SUCCESS =
  "SEARCH_DETAILTRIAL_SUCCESS-Reducer";
export const SEARCH_DETAILTRIAL_FAILURE =
  "SEARCH_DETAILTRIAL_FAILURE-Reducer";
//********************************** 2020-08-24 김진호 끝 **********************************
//========================================= 2020-08-25 계정별원장 조편백  시작 ==============================================
export const SEARCH_ACCOUN_TINFO_REQUEST = "SEARCH_ACCOUN_TINFO_REQUEST_SAGA";
export const SEARCH_ACCOUN_TINFO_SUCCESS = "SEARCH_ACCOUN_TINFO_SUCCESS_REDUCER";
export const SEARCH_ACCOUN_TINFO_FAILURE = "SEARCH_ACCOUN_TINFO_FAILURE_REDUCER";
//========================================= 2020-08-25 계정별원장 조편백  끝 ==============================================

//========================================= 2020-09-01 거래처 관리 조편백  시작 ==============================================

export const BATCH_ACCOUNT_REQUEST = "BATCH_ACCOUNT_REQUEST";
export const BATCH_ACCOUNT_FAILURE = "BATCH_ACCOUNT_FAILURE";

//========================================= 2020-09-01 거래처 관리 조편백  끝 ==============================================


