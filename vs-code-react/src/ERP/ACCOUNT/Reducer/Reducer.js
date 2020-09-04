import * as types from "../ActionType/ActionType";

const initialState = {
  isLoading: false,
  slipList: [],
  journalList: [],
  approvalSlipList: [],
  approvalJournalList: [],
  accountList: [],
  customerList: [],
  journalFormList: [],
  error: "",
  periodNo: "",
  journalDetailList: "",
  slipNo: "",
  cashJournalList: [], //********************************** 2020-08-24 정대현 추가 **********************************
  detailTrialBalanceList: [], //********************************** 2020-08-24 김진호 추가 **********************************
  gridRowJson: [], //********************************** 2020-08-24 조편백 추가 **********************************
  IncomeList: [], //********************************** 2020-08-31 조편백 추가 ********************************** 
};

const AccReducer = (state = initialState, action) => {
  switch (action.type) {
    // 기수번호 조회
    case types.SET_JOURNAL_NO_SUCCESS:
      return {
        ...state,
        journalDetailList: action.data,
      };
    case types.SET_JOURNAL_NO_FAILURE:
      return {
        ...state,
        journalDetailList: action.data,
      };
    case types.SEARCH_PERIOD_NO_SUCCESS:
      return {
        ...state,
        periodNo: action.data,
      };
    case types.SEARCH_PERIOD_NO_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 전표목록 조회
    case types.SEARCH_SLIP_SUCCESS:
      return {
        ...state,
        slipList: action.data,
      };
    case types.SEARCH_SLIP_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 분개목록 조회
    case types.SEARCH_JOURNAL_SUCCESS:
      return {
        ...state,
        journalList: action.data.journalList,
      };
    case types.SEARCH_JOURNAL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 계정과목 조회
    case types.SEARCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountList: action.data,
      };
    case types.SEARCH_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 거래처목록 조회
    case types.SEARCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerList: action.data,
      };
    case types.SEARCH_CUSTOMER_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 전표저장
    case types.ADD_SLIP_SUCCESS:
      return {
        ...state,
        slipNo: action.data.slipNo,
      };
    case types.ADD_SLIP_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    //전표승인 전표조회
    case types.SEARCH_AM_SLIP_SUCCESS:
      return {
        ...state,
        approvalSlipList: action.data,
      };
    case types.SEARCH_AM_SLIP_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //전표승인 분개조회
    case types.SEARCH_AM_JOURNAL_SUCCESS:
      return {
        ...state,
        approvalJournalList: action.data.journalList,
      };
    case types.SEARCH_AM_JOURNAL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    // 전표승인  (실패)
    case types.UPDATE_SLIP_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    // 분개장 조회
    case types.SEARCH_JOURNAL_FROM_SUCCESS:
      return {
        ...state,
        journalFormList: action.data,
      };
    case types.SEARCH_JOURNAL_FROM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //재무상태표 조회
    case types.SEARCH_FINANCIAL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.SEARCH_FINANCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        //data:action.data.financialList,
      };
    case types.SEARCH_FINANCIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    //합계잔액시산표 조회
    case types.SEARCH_TOTALTRIAL_REQUEST:
      return {
        ...state,
      };
    case types.SEARCH_TOTALTRIAL_SUCCESS:
      return {
        ...state,
        //data:action.data.financialList,
      };
    case types.SEARCH_TOTALTRIAL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //================================ 2020-08-24 손익계산서조회 조편백 ====================================
    case types.SEARCH_INCOME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.SEARCH_INCOME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        IncomeList: action.data.gridRowJson,
      };
    case types.SEARCH_INCOME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    //================================ 2020-08-24 손익계산서조회 끝 조편백 ====================================
    //********************************** 2020-08-24 정대현 추가 **********************************
    // 현금출납장 조회
    case types.SEARCH_CASHJOURNAL_SUCCESS:
      return {
        ...state,
        cashJournalList: action.data,
      };
    case types.SEARCH_CASHJOURNAL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //********************************** 2020-08-24 정대현 추가 여기까지**********************************
    //********************************** 2020-08-24 김진호 추가 **********************************
    //일(월)계표
    case types.SEARCH_DETAILTRIAL_SUCCESS:
      return {
        ...state,
        detailTrialBalanceList: action.data,
      };
    case types.SEARCH_DETAILTRIAL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //********************************** 2020-08-24 김진호 끝 **********************************
    //========================================= 2020-08-25 계정별원장 조편백  시작 =============================
    case types.SEARCH_ACCOUN_TINFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.SEARCH_ACCOUN_TINFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data.gridRowJson,
      };
    case types.SEARCH_ACCOUN_TINFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    //========================================= 2020-08-25 계정별원장 조편백  끝  ================================
      //========================================= 2020-09-01 거래처 관리 조편백  시작 =============================

    case types.BATCH_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //========================================= 2020-09-01 거래처 관리 조편백  끝  ================================
    default:
      return { ...state };
  }
};

export default AccReducer;
