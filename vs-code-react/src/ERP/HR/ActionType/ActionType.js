export const SEARCH_CODE = "src/ERP/HR/Saga/Saga/SEARCH_CODE_SAGA";
export const SEARCH_COMPANY_CODE =
  "src/ERP/HR/Saga/Saga/SEARCH_COMPANY_CODE_SAGA";
export const SEARCH_WORK_PLACE_CODE =
  "src/ERP/HR/Saga/Saga/SEARCH_WORK_PLACE_CODE_SAGA";

//*************************  유주 담당  시작********************************** */
export const POSITION_LIST_REQUEST = "src/ERP/HR/Saga/Saga/POSITION_LIST_REQUEST";
export const POSITION_LIST_SUCCESS = "src/ERP/HR/Saga/Saga/POSITION_LIST_SUCCESS";
export const POSITION_LIST_FAILURE = "src/ERP/HR/Saga/Saga/POSITION_LIST_FAILURE";
  
export const EMPDETAILED_INFO_REQUEST = "src/ERP/HR/Saga/Saga/EMPDETAILED_INFO_REQUEST";
export const EMPDETAILED_INFO_SUCCESS = "src/ERP/HR/Saga/Saga/EMPDETAILED_INFO_SUCCESS";
export const EMPDETAILED_INFO_FAILURE = "src/ERP/HR/Saga/Saga/EMPDETAILED_INFO_FAILURE";


export const EMP_UPDATE_REQUEST = "src/ERP/HR/Saga/Saga/EMP_UPDATE_REQUEST";
export const EMP_UPDATE_SUCCESS = "src/ERP/HR/Saga/Saga/EMP_UPDATE_SUCCESS";
export const EMP_UPDATE_FAILURE = "src/ERP/HR/Saga/Saga/EMP_UPDATE_FAILURE";


//*************************  유주 담당  종료********************************** */

//*****************************재영 월근태 관리*****************************/
export const SEARCH_MONTH_ATTD_LIST_REQUEST = "src/ERP/HR/Saga/Saga/SEARCH_MONTH_ATTD_LIST_REQUEST";
export const SEARCH_MONTH_ATTD_LIST_SUCCESS = "src/ERP/HR/Saga/Saga/SEARCH_MONTH_ATTD_LIST_SUCCESS";
export const MONTH_ATTD_LIST_UPDATE = "src/ERP/HR/Saga/Saga/MONTH_ATTD_LIST_UPDATE";
export const MONTH_ATTD_LIST_UPDATE_SEUCCESS = "src/ERP/HR/Saga/Saga/MONTH_ATTD_LIST_UPDATE_SEUCCESS";
export const MONTH_ATTD_LIST_FAILURE= "src/ERP/HR/Saga/Saga/MONTH_ATTD_LIST_FAILURE";

//***************************** 재영 일근태관리 ***************************/
export const DAY_ATTD_LIST_UPDATE = "src/EMP/HR/Saga/Saga/DAY_ATTD_LIST_UPDATE"
export const DAY_ATTD_LIST_UPDATE_SEUCCESS = "src/EMP/HR/Saga/Saga/DAY_ATTD_LIST_UPDATE_SEUCCESS"


//*************************  지원 담당  시작********************************** */

export const SALARY_LIST_REQUEST = "src/ERP/HR/Saga/SAGA/SALARY_LIST_REQUEST";
export const SALARY_LIST_SUCCESS = "src/ERP/HR/Saga/SAGA/SALARY_LIST_SUCCESS";
export const SALARY_LIST_FAILURE = "src/ERP/HR/Saga/SAGA/SALARY_LIST_FAILURE";

export const CLOSE_SALARY_WITH_SLIP_REQUEST =
  "src/ERP/HR/Saga/SAGA/CLOSE_SALARY_WITH_SLIP_REQUEST";
export const CLOSE_SALARY_WITH_SLIP_SUCCESS =
  "src/ERP/HR/Saga/SAGA/CLOSE_SALARY_WITH_SLIP_SUCCESS";
export const CLOSE_SALARY_WITH_SLIP_FAILURE =
  "src/ERP/HR/Saga/SAGA/CLOSE_SALARY_WITH_SLIP_FAILURE";
//*************************  지원 담당  종료********************************** */

//==================일근태 관리 인봉 ==============================시작 ==============================
export const SEARCH_DAY_ATTD_LIST_REQUEST =
  "src/ERP/HR/Saga/Saga/SEARCH_DAY_ATTD_LIST_REQUEST"; //일근태관리 이름+날짜+N상태만 검색 하인봉
export const SEARCH_DAY_ATTD_LIST_SUCCESS =
  "src/ERP/HR/Saga/Saga/SEARCH_DAY_ATTD_LIST_SUCCESS"; //일근태관리 이름+날짜+N상태만 검색 하인봉
export const SEARCH_DAY_ATTD_LIST_FAILURE =
  "src/ERP/HR/Saga/Saga/SEARCH_DAY_ATTD_LIST_FAILURE"; //일근태관리 이름+날짜+N상태만 검색 하인봉

export const SEARCH_DAY_ATTD_LIST_All =
  "src/ERP/HR/Saga/Saga/SEARCH_DAY_ATTD_LIST_All"; //일근태관리 날짜~날짜 사이 모두 검색 하인봉
export const SEARCH_DAY_ATTD_LIST_All_SUCCESS =
  "src/ERP/HR/Saga/Saga/SEARCH_DAY_ATTD_LIST_All_SUCCESS"; // 일근태관리 날짜~날짜 사이 모두 검색 하인봉
export const SEARCH_DAY_ATTD_LIST_All_FAILURE =
  "src/ERP/HR/Saga/Saga/SEARCH_DAY_ATTD_LIST_All_FAILURE"; //일근태관리 날짜~날짜 사이 모두 검색 하인봉

export const DAY_ATTD_DEADLINE_REGISTER =
  "src/ERP/HR/Saga/Saga/DAY_ATTD_DEADLINE_REGISTER"; //일근태관리 마감 날짜~날짜 사이 모두 검색 하인봉
export const DAY_ATTD_DEADLINE_REGISTER_SUCCESS =
  "src/ERP/HR/Saga/Saga/DAY_ATTD_DEADLINE_REGISTER_SUCCESS"; //일근태관리  마감 날짜~날짜 사이 모두 검색 하인봉
export const DAY_ATTD_DEADLINE_REGISTER_FAILURE =
  "src/ERP/HR/Saga/Saga/DAY_ATTD_DEADLINE_REGISTER_FAILURE"; //일근태관리 마감 날짜~날짜 사이 모두 검색 하인봉

  export const DAY_ATTD_DEADLINE_CANCEL =
  "src/ERP/HR/Saga/Saga/DAY_ATTD_DEADLINE_CANCEL"; //일근태관리 마감취소 날짜~날짜 사이 모두 검색 하인봉

  export const SEARCH_RESTATTENDANCE_TYPE =
  "src/ERP/HR/Saga/Saga/SEARCH_RESTATTENDANCE_TYPE"; //근태외관리 근태외구분 정보 가져오기
//==================일근태 관리  인봉==============================끝=============================

//============================== 사원 등록 성훈 시작===============================================//
// 부서번호 호출
export const SEARCH_DIVISION_CODE_REQUEST =
  "src/ERP/HR/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST";
export const SEARCH_DIVISION_CODE_SUCCESS =
  "src/ERP/HR/Saga/Saga/SEARCH_DIVISION_CODE_SUCCESS";
export const SEARCH_DIVISION_CODE_FAILURE =
  "src/ERP/HR/Saga/Saga/SEARCH_DIVISION_CODE_FAILURE";

//사원 추가
export const EMP_REGISTER_REQUEST = "src/ERP/HR/Saga/Saga/EMP_REGISTER_REQUEST";
export const EMP_REGISTER_SUCCESS = "src/ERP/HR/Saga/Saga/EMP_REGISTER_SUCCESS";
export const EMP_REGISTER_FAILURE = "src/ERP/HR/Saga/Saga/EMP_REGISTER_FAILURE";


//============================== 사원 등록 성훈 종료===============================================//


//============================== 일근태 기록/조회 재영 시작 20.08.27===============================================//
export const INSERT_DAY_ATTD_START =
  "src/ERP/HR/Saga/Saga/INSERT_DAY_ATTD_START";
export const INSERT_DAY_ATTD_SUCCESS =
  "src/ERP/HR/Saga/Saga/INSERT_DAY_ATTD_SUCCESS";
export const INSERT_DAY_ATTD_FAILURE =
  "src/ERP/HR/Saga/Saga/INSERT_DAY_ATTD_FAILURE";
export const SELECT_DAY_ATTD_START =
  "src/ERP/HR/Saga/Saga/SELECT_DAY_ATTD_START";
export const SELECT_DAY_ATTD_SUCCESS =
  "src/ERP/HR/Saga/Saga/SELECT_DAY_ATTD_SUCCESS";
export const SELECT_DAY_ATTD_FAILURE =
  "src/ERP/HR/Saga/Saga/SELECT_DAY_ATTD_FAILURE";  
export const DELETE_DAY_ATTD_START =
  "src/ERP/HR/Saga/Saga/DELETE_DAY_ATTD_START";
export const DELETE_DAY_ATTD_FAILURE =
  "src/ERP/HR/Saga/Saga/DELETE_DAY_ATTD_FAILURE";

//============================== 일근태 기록/조회 재영 종료 20.08.27===============================================//

//*************************외출 및 조퇴 신청 시작 _준서 _20.08.24 *************************
export const REST_ATTD_REQUEST = "src/ERP/HR/Saga/Saga/REST_ATTD_REQUEST";
export const REST_ATTD_SUCCESS = "src/ERP/HR/Saga/Saga/REST_ATTD_SUCCESS";
export const REST_ATTD_FAILURE = "src/ERP/HR/Saga/Saga/REST_ATTD_FAILURE";
//*************************외출 및 조퇴 신청 종료 _준서 _20.08.24 *************************

//************************* 결제승인관리 시작 _준서 *************************
export const SEARCH_ATTD_APPL_REQUEST = "src/ERP/HR/Saga/Saga/SEARCH_ATTD_APPL_REQUEST";
export const UPDATE_ATTD_APPL_REQUEST = "src/ERP/HR/Saga/Saga/UPDATE_ATTD_APPL_REQUEST";
export const SEARCH_ATTD_APPL_SUCCESS = "src/ERP/HR/Saga/Saga/SEARCH_ATTD_APPL_SUCCESS";
export const SEARCH_ATTD_APPL_FAILURE = "src/ERP/HR/Saga/Saga/SEARCH_ATTD_APPL_FAILURE";
export const UPDATE_ATTD_APPL_SUCCESS = "src/ERP/HR/Saga/Saga/UPDATE_ATTD_APPL_SUCCESS";
export const UPDATE_ATTD_APPL_FAILURE = "src/ERP/HR/Saga/Saga/UPDATE_ATTD_APPL_FAILURE";
//************************* 결제승인관리 종료 _준서 *************************