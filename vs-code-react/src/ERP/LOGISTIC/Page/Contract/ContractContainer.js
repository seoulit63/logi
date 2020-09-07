//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import React, { useState, useCallback } from "react";
import CtRegister from "./CtRegister";
import { Typography } from "@material-ui/core";
import Calendar from "./Calendar";
import { useSelector, useDispatch } from "react-redux";
import { searchEsReqAction, searchCodeReqAction, 
          searchEsUpdateAction, addContractAction, delEstimateAction } from "../../Action/Action";
import LogiModal from "./LogiModal";

// components 취합하는 역할
const ContractContainer = ({data}) => {
  // Calendar props
  const [inputs, setInputs] = useState({
    searchCondition:'', //수주 가능한 견적 검색 조건
    startDate:'',   // 시작일
    endDate:'', // 종료일
  });
  const { searchCondition, startDate, endDate } = inputs;

  // Calendar.js -> 수주 가능한 견적 검색조건, 시작일, 종료일 값 변경
  const dateHandler = useCallback(e => {
    const name  = e.target.name;
    const value = e.target.value;
    const process = name === 'searchDateCondition' ?
        {...inputs, searchCondition: value} : (
            name === 'startDate' ? {...inputs, startDate: value} : (
                name === 'endDate' ? {...inputs, endDate: value} : {...inputs}
                ))
    setInputs(process);
  }, [inputs]);

  // state setter getter by reducer & saga
  const dispatch = useDispatch();
  const { registerableEstimateList,
          registerableEstimateDetailList,
          modalCodeList,
  } = useSelector(state => state.LOGIReducer.contract);

  // CtRegister.js->수주가능한견적조회
  const contractCandidateSearchButton = () => {
    dispatch(searchEsReqAction({ searchCondition, startDate, endDate }));
  };

  // 선택한 수주가능견적 행의 견적번호
  const [estimateNo, setEstimateNo] = useState('');
  // 수주유형분류 모달 그리드 열기/닫기
  const [isOpenModal,setIsOpenModal] = useState(false);
  // 견적행 클릭할 때, 그 행의 견적상세만 담을 변수
  const [estimateDetailRows, setEstimateDetailRows] = useState([]);

  // CtRegister.js->수주가능견적Grid - 수주유형분류 click - LogiModal.js open
  const handleGridCell = e => {
    // 선택한 행의 번호
    setEstimateNo(e.data.estimateNo);
    // 클릭한 견적상세만 보기 filter
    setEstimateDetailRows(
      registerableEstimateDetailList.filter(detailRow =>
        detailRow.estimateNo === e.data.estimateNo
      )
    );

    const colName= e.colDef.field;
    if (colName === 'contractType') {
      setIsOpenModal(true);
      // 수주유형분류 axios
      dispatch(searchCodeReqAction());
    };
  };

  // LogiModal.js -> 닫기 버튼 or 모달 바깥 클릭 - close
  const closeEsDialog = () => {
    setIsOpenModal(false);
  };

  // LogiModal.js -> cell click -> CtRegister.js - 수주유형분류 셀에 값 넣기
  const handleClose = e => {
    setIsOpenModal(false);
    // 거래처 data를 가져왔을 때;
    if(e.data.divisionCodeNo === "CT"){
      dispatch(searchEsUpdateAction({detailCode:e.data.detailCode, estimateNo: estimateNo}));
    }
  };

  // 오늘 날짜
  let now = new Date(); //오늘 날짜 만들기
  let year = now.getFullYear();
  let month = leadingZeros(now.getMonth() + 1, 2);
  let date = leadingZeros(now.getDate(), 2);
  let today = year + "-" + month + "-" + date;

  function leadingZeros(n, digits) {
    //숫자앞에 0붙여주는 함수
    let zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  }

  // CtRegister.js -> 수주등록
  const sessionId = sessionStorage.getItem('empCodeInfo_token');
  const addContract = () => {
    // Object.keys(data).map(k => data[k])
    const confirmMsg = '수주일자:: ' + today + '\r\n' +
      '견적번호:: ' +  estimateNo + '\r\n' +
      '견적상세:: [' + estimateDetailRows.length + '] 건을 수주 등록합니다. \r\n' +
      '계속 진행하실꺼에요?';
    if(window.confirm(confirmMsg)){
      let batchObj=registerableEstimateList.filter( row =>
        row.estimateNo === estimateNo
      );
      batchObj = batchObj[0];
      batchObj.contractDetailTOList=estimateDetailRows;
      // 데이터 삭제하는 이유는 TO에 없는 값들이기 때문; 이것들 때문에 데이터 전송이 제대로 안됨;
      delete batchObj.errorCode
      delete batchObj.errorMsg
      delete batchObj.chk
      delete batchObj.estimateDetailTOList
      for(let i=0; i<batchObj.contractDetailTOList.length; i++){
        delete batchObj.contractDetailTOList[i].errorCode
        delete batchObj.contractDetailTOList[i].errorMsg
        delete batchObj.contractDetailTOList[i].chk
        delete batchObj.contractDetailTOList[i].rowId // 견적 등록 할 때 만들어 놓은 고유 식별 변수
        delete batchObj.contractDetailTOList[i].itemName
      };
      dispatch(addContractAction({batchObj, contractDate:today, personCodeInCharge:sessionId }));
      setEstimateDetailRows([]);
    } else {
      alert("취소되었습니다");
    };
  };

  // CtRegister.js -> 견적취소
  const delEsitmate = () => {
    const confirmMsg = "견적번호 " +  estimateNo + " 을 취소합니다. \r\n" +
      "이후 수주 가능 목록에서 조회되지 않습니다. \r\n취소할래요?";
    if(window.confirm(confirmMsg)){
      dispatch(delEstimateAction({estimateNo:estimateNo}));
      setEstimateDetailRows([]);
    } else {
      alert("취소되었습니다");
    };
  };

  return (
        <>
          <Typography variant="h4"><b>수 주</b></Typography>
          <hr/>
          <Calendar dateHandler={dateHandler} />
          <CtRegister
            basicDataList={registerableEstimateList}
            DetailDataList={estimateDetailRows}
            searchBtn={contractCandidateSearchButton}
            onCellClicked={handleGridCell}
            regContracteBtn={addContract}
            cancelContracteBtn={delEsitmate}
          />
          <LogiModal
            data={modalCodeList}
            isOpenModal={isOpenModal}
            closeEsDialog={closeEsDialog}
            handleClose={handleClose}
          />
        </>
  );
};
export default ContractContainer;
//**************************************** 2020.09.06 양지훈 수정 종료 ****************************************