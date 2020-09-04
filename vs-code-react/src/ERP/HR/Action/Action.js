import { createAction } from "redux-actions";
import * as types from "ERP/HR/ActionType/ActionType";

//액션 생성 함수

export const searchCode = createAction(types.SEARCH_CODE);
export const searchCompanyCode = createAction(types.SEARCH_COMPANY_CODE);
export const searchWorkPlaceCode = createAction(types.SEARCH_WORK_PLACE_CODE);

//========================= 재영 일근태 조회/기록 2020-08-27 시작======================//
export const selectDayAttdSuccess = createAction(types.SELECT_DAY_ATTD_SUCCESS);
export const selectDayAttdFailure = createAction(types.SELECT_DAY_ATTD_FAILURE);
export const insertDayAttdStart = createAction(types.INSERT_DAY_ATTD_START);
export const insertDayAttdSuccess = createAction(types.INSERT_DAY_ATTD_SUCCESS);
export const deleteDayAttdStart = createAction(types.DELETE_DAY_ATTD_START);
export const deleteDayAttdFailure = createAction(types.DELETE_DAY_ATTD_FAILURE);

//========================= 재영 일근태 조회/기록 2020-08-27 종료======================//

export const insertDayAttdFailure = createAction(types.INSERT_DAY_ATTD_FAILURE);
export const selectDayAttdStart = createAction(types.SELECT_DAY_ATTD_START);

//*************************  유주 담당  시작********************************** */
export const PositionListRequest = createAction(types.POSITION_LIST_REQUEST); //유주 직급리스트를 가지고 옴(완성)
export const PositionListSuccess = createAction(types.POSITION_LIST_SUCCESS);
export const PositionListFailure = createAction(types.POSITION_LIST_FAILURE);

export const EmpDetailedInfoRequest =createAction(types.EMPDETAILED_INFO_REQUEST); //유주 사원정보 상세조회(완성)
export const EmpDetailedInfoSuccess =createAction(types.EMPDETAILED_INFO_SUCCESS);
export const EmpDetailedInfoFailure =createAction(types.EMPDETAILED_INFO_FAILURE);


export const EmpUpdateRequest = createAction(types.EMP_UPDATE_REQUEST); // 유주 사원정보 수정(진행중)
export const EmpUpdateSuccess = createAction(types.EMP_UPDATE_SUCCESS);
export const EmpUpdateFailure = createAction(types.EMP_UPDATE_FAILURE);

//*********************************월근태 재영************************** */

export const searchMonthAttdMgtList = createAction(types.SEARCH_MONTH_ATTD_LIST_REQUEST);
export const updateMonthAttdMgtList = createAction(types.MONTH_ATTD_LIST_UPDATE);
export const updateMonthAttdSuccess = createAction(types.MONTH_ATTD_LIST_UPDATE_SEUCCESS);
export const monthAttdFailure = createAction(types.MONTH_ATTD_LIST_FAILURE);

//*********************************일근태 재영************************** */
export const SearchDayAttdListRequest = createAction(types.SEARCH_DAY_ATTD_LIST_REQUEST);
export const updateDayAttdList = createAction(types.DAY_ATTD_LIST_UPDATE);
export const updateDayAttdListSuccess = createAction(types.DAY_ATTD_LIST_UPDATE_SEUCCESS);

//************************* 결제승인관리 시작 _준서 *************************
export const searchAttdApplList = createAction(types.SEARCH_ATTD_APPL_REQUEST);
export const updateAttdApplList = createAction(types.UPDATE_ATTD_APPL_REQUEST);
export const searchAttdApplSuccess =createAction(types.SEARCH_ATTD_APPL_SUCCESS);
export const searchAttdApplFailure =createAction(types.SEARCH_ATTD_APPL_FAILURE);
export const updateAttdApplSuccess =createAction(types.UPDATE_ATTD_APPL_SUCCESS);
export const updateAttdApplFailure =createAction(types.UPDATE_ATTD_APPL_FAILURE);
//************************* 결제승인관리 종료 _준서 *************************



//*************************  유주 담당  종료 ********************************** */

//*************************  지원 담당  시작********************************** */
//월급여 마감 페이지에서 사용하는 마감가능 급여리스트 조회 함수
export const salaryListRequest = createAction(types.SALARY_LIST_REQUEST);
export const salaryListSuccess = createAction(types.SALARY_LIST_SUCCESS);
export const salaryListFailure = createAction(types.SALARY_LIST_FAILURE);

//월급여 마감 페이지에서 사용하는 마감 및 전표 발행함수
export const closeSalaryWithSlipRequest = createAction(
  types.CLOSE_SALARY_WITH_SLIP_REQUEST,
);
export const closeSalaryWithSlipSuccess = createAction(
  types.CLOSE_SALARY_WITH_SLIP_SUCCESS,
);
export const closeSalaryWithSlipFailure = createAction(
  types.CLOSE_SALARY_WITH_SLIP_FAILURE,
);

//*************************  지원 담당   종료********************************** */

//*************************외출 및 조퇴 신청 시작 _준서 _20.08.24 *************************
export const restAttdRequest = createAction(types.REST_ATTD_REQUEST);
export const restAttdSuccess =createAction(types.REST_ATTD_SUCCESS);
export const restAttdFailure =createAction(types.REST_ATTD_FAILURE);
//*************************외출 및 조퇴 신청 종료 _준서 _20.08.24 *************************

/*
export const searchCompanyCode = code => ({ type : types.SEARCH_COMPANY_CODE , code });
export const searchWorkPlaceCode = code => ({ type : types.SEARCH_WORK_PLACE_CODE , code });

*/
