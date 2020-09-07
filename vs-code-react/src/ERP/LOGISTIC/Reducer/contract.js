//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import * as types from "ERP/LOGISTIC/ActionType/ActionType";

// init state
export const initialState = {
    modalCodeList:[],   // 수주유형분류 모달창 데이터
    registerableEstimateList:[], // 수주가능견적 리스트
    registerableEstimateDetailList:[], // 수주가능견적상세 리스트
    loadRegisterableEstimateLoading: false, // 등록가능견적 조회중
    loadRegisterableEstimateDone: false,    // 등록가능견적 조회완료
    loadRegisterableEstimateError: null,    // 등록가능견적 조회실패
    loadRegisterableEstimateDetailLoading: false, // 등록가능견적상세 조회중
    loadRegisterableEstimateDetailDone: false,    // 등록가능견적상세 조회완료
    loadRegisterableEstimateDetailError: null,    // 등록가능견적상세 조회실패
    loadCodeLoading: false, // 모달창 데이터 조회중
    loadCodeDone: false,    // 모달창 데이터 조회완료
    loadCodeError: null,    // 모달창 데이터 조회실패
    addContractLoading:false,   // 수주등록 로딩중
    addContractDone:false,      // 수주등록 완료
    addContractError:null,     // 수주등록 실패
    removeEstimateLoading: false, // 견적취소 조회중
    removeEstimateDone: false,    // 견적취소 조회완료
    removeEstimateError: null,    // 견적취소 조회실패
};

// Reducer
const ctReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.GET_ESTIMATE_REQUEST:
            return ({
                ...state,
                loadRegisterableEstimateLoading: true,
                loadRegisterableEstimateDone:    false,
                loadRegisterableEstimateError:   null,
            })
        case types.GET_ESTIMATE_SUCCESS:
            // 견적 상세 데이터 여러개의 배열로 되어 있는 것 하나로 재조합하여 그리드에 뿌리기
            let esDetailRows=[];
            action.payload.map( arr =>
                arr.estimateDetailTOList.map( arr2 =>
                    esDetailRows.push(arr2)
                )
            );
            return ({
                ...state,
                loadRegisterableEstimateLoading: false,
                loadRegisterableEstimateDone:    true,
                registerableEstimateList:        action.payload,
                registerableEstimateDetailList:  esDetailRows,
            })
        case types.GET_ESTIMATE_FAILURE:
            return ({
                ...state,
                loadRegisterableEstimateLoading: false,
                loadRegisterableEstimateError:   action.error,
            })
        case types.GET_ESTIMATE_UPDATE:
            // 견적번호끼리 같은 것 업데이트하기
            const updateRows=state.registerableEstimateList.map(row =>
                row.estimateNo === action.payload.estimateNo ? {
                    ...row,
                    contractType:action.payload.detailCode,
                } : row
            );
            return({
                ...state,
                registerableEstimateList: updateRows,
            });
        case types.GET_ESTIMATE_DETAIL_REQUEST:
        case types.GET_ESTIMATE_DETAIL_SUCCESS:
            return({
            })
        case types.GET_ESTIMATE_DETAIL_FAILURE:
            return({
                ...state,
                loadRegisterableEstimateDetailLoading: false,
                loadRegisterableEstimateDetailError:   action.error,
            })
        // ********** 수주 유형 분류 **********
        case types.GET_CODE_REQUEST:
            return({
                ...state,
                loadCodeLoading: true,
                loadCodeDone:    false,
                loadCodeError:   null,
            })
        case types.GET_CODE_SUCCESS:
            return({
                ...state,
                loadCodeLoading: false,
                loadCodeDone:    true,
                modalCodeList:   action.payload,
            })
        case types.GET_CODE_FAILURE:
            return({
                ...state,
                loadCodeLoading: false,
                loadCodeError:   action.error,
            })
        // ********** 수주 등록 **********
        case types.ADD_CONTRACT_REQUEST:
            return({
                ...state,
                addContractLoading:true,
                addContractDone:false,
                addContractError:null,
            })
        case types.ADD_CONTRACT_SUCCESS:
            const resultMsg = "< 수주 등록 내역 >   \r\n"  +
                            "새로운 수주번호 : " + action.payload.contractNo + "\r\n" +
                            "수주 등록된 견적번호 : " + action.payload.estimateNo  + "\r\n" +
                            "위와 같이 작업이 처리되었습니다";
            alert(resultMsg);
            return({
                ...state,
                addContractLoading:false,
                addContractDone:true,
                registerableEstimateList:[],
                registerableEstimateDetailList:[],
            })
        case types.ADD_CONTRACT_FAILURE:
            return({
                ...state,
                addContractLoading:false,
                addContractError:action,
            })
        // ********** 견적 취소 **********
        case types.DELETE_ESTIMATE_REQUEST:
            return({
                ...state,
                removeEstimateLoading:true,
                removeEstimateDone:false,
                removeEstimateError:null,
            })
        case types.DELETE_ESTIMATE_SUCCESS:
            const resultMsg2 = "견적번호: " + action.payload + "\r\n 더이상 조회 안돼요.";
            alert(resultMsg2);
            return({
                ...state,
                removeEstimateLoading:false,
                removeEstimateDone:true,
                registerableEstimateList:[],
                registerableEstimateDetailList:[],
            })
        case types.DELETE_ESTIMATE_FAILURE:
            return({
                ...state,
                removeEstimateLoading:false,
                removeEstimateError:action,
            })
        default:
            return state;
    };
};
export default ctReducer;
//**************************************** 2020.09.06 양지훈 수정 종료 ****************************************

//********************* 혹시몰라서 남겨놓은 states *********************
// searchCondition:'', //수주 가능한 견적 검색 조건
// startDate:'',   // 시작일
// endDate:'', // 종료일
// contractType:'',   // 수주유형분류
// contractRequester:'',   // 수주요청자
// description:'', // 비고
// estimateGridApi: [], //견적 그리드 api
// rowData: [], //견적 행 데이터
// rowDetailData: [], // 견적 상세 행 데이터
// selectedData: [], //클릭한 row데이터
// selectedDetailData: [], // 클릭한 row의 상세 데이터
// selected: false, // 선택 여부
// contractUrl: "http://localhost:8282/logi/logistics/sales/addNewContract", //수주 등록 url
// batchlist: [],
// estimateList: [],

//********************* 제로초 style states *********************
// mainPosts: [],
// imagePaths: [],
// hasMorePosts: true,
// loadPostsLoading: false,
// loadPostsDone: false,
// loadPostsError: null,
// addPostLoading: false,
// addPostDone: false,
// addPostError: null,
// removePostLoading: false,
// removePostDone: false,
// removePostError: null,
// addCommentLoading: false,
// addCommentDone: false,
// addCommentError: null,