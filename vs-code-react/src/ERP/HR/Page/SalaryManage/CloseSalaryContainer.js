import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import Select from "react-select";
import { Button, FormControl } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { createStructuredSelector } from "reselect";
import CloseSalary from "./CloseSalary";
import { connect, useDispatch } from "react-redux";
import {
  salaryListRequest,
  closeSalaryWithSlipRequest,
} from "ERP/HR/Action/Action";
import { selectSalaryList, selectedErrorCD } from "../../Selector/selector";
import * as types from "ERP/ACCOUNT/ActionType/ActionType";
import useDate from "./useDate";

const CloseSalaryContainer = props => {
  const {
    salaryList,
    errorMsg,
    salaryListRequest,
    closeSalaryWithSlipRequest,
    flag, //이건 마감이후 전표발행으로 바로 넘어갈때 마감에서 에러가 발생했을때 전표발행을 막기위한 일종의 표식
  } = props;

  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [dept, setDept] = useState("");
  const [empCodes, setEmpCodes] = useState();
  const [event, setEvent] = useState();
  const [journalLists, setJournalLists] = useState([
    //분개는 단 두가지만 표현한다 현금/ 공제금액 그리고 이부분들은 set을 사용하면 작동안된다.
    {
      journalNo: "NEW JOURNAL", // 여기서 분개 번호가 만들어짐.
      slipNo: "NEW",
      balanceDivision: "차변",
      accountCode: "0603", //급여는 노무비로 넣었다.
      customerCode: null,
      leftDebtorPrice: "", // 차변
      rightCreditsPrice: 0, // 대변
    },
    {
      journalNo: "NEW JOURNAL",
      slipNo: "NEW",
      balanceDivision: "대변",
      accountCode: "0101", //급여에 대한 현금
      customerCode: null,
      leftDebtorPrice: 0, // 차변
      rightCreditsPrice: "", // 대변
    },
    {
      journalNo: "NEW JOURNAL",
      slipNo: "NEW",
      balanceDivision: "차변",
      accountCode: "0621", //공제금을 세부적으로 구분하지 않고 보험료로 전표발행
      customerCode: null,
      leftDebtorPrice: "", // 차변
      rightCreditsPrice: 0, // 대변
    },
    {
      journalNo: "NEW JOURNAL",
      slipNo: "NEW",
      balanceDivision: "대변",
      accountCode: "0101", //공제금에 대한 현금
      customerCode: null,
      leftDebtorPrice: 0, // 차변
      rightCreditsPrice: "", // 대변
    },
  ]);

  const [slipData, setSlipData] = useState([
    {
      slipNo: "NEW", // 전표 번호 생성
      slipType: "대체",
      accountPeriodNo: "4", //이건 나중에 알아서 수정
      reportingDate: useDate(),
      reportingEmpCode: sessionStorage.getItem("empCodeInfo_token"), // session단위로 올라간 empCode
      reportingEmpName: sessionStorage.getItem("empNameInfo_token"),
      slipStatus: "미결",
      deptCode: sessionStorage.getItem("deptCodeInfo_token"), // session단위로 올라간 deptCode
      journalList: [],
      status: "insert",
    },
  ]);

  const makeJournal = empcode1 => {
    //체크된 월급여 데이터를 가지고 전표발행을 위한 데이터 등록
    const realSalary = empcode1.reduce((stack, el) => {
      return stack + parseInt(el.realSalary);
    }, 0);
    const totalDeduction = empcode1.reduce((stack, el) => {
      return stack + parseInt(el.totalDeduction);
    }, 0);

    const newJournal = journalLists.map((journalState, index) => {
      switch (index) {
        case 0:
          return {
            ...journalState,
            leftDebtorPrice: realSalary,
          };

        case 1:
          return {
            ...journalState,
            rightCreditsPrice: realSalary,
          };

        case 2:
          return {
            ...journalState,
            leftDebtorPrice: totalDeduction,
          };

        case 3:
          return {
            ...journalState,
            rightCreditsPrice: totalDeduction,
          };

        default:
          return { ...journalState };
      }
    });
    const slip = slipData.map(newSlip => {
      return {
        ...newSlip,
        journalList: newJournal,
      };
    });

    dispatch({
      //전표 발행 사가 실행
      type: types.ADD_SLIP_REQUEST,
      params: { batchArray: { slip } },
    });
  };

  //셀렉터에 년도와 월을 부른다.
  function findCloseSalary() {
    salaryListRequest({ date, dept });
  }

  const handleChange = (event, actionMeta) => {
    if (actionMeta.name === "dept") {
      setDept(event.value);
    } else {
      setDate(event.value);
    }
  };

  let empcode1 = [];

  const callCloseSalary = () => {
    //유효성 검사는 왜 이방법밖에 생각이 안나지
    if (empCodes !== undefined) {
      if (empCodes.length != 0) {
        empcode1 = empCodes.filter(empCode2 => empCode2.finalizeStatus === "Y");
        if (empcode1[0] === undefined) {
          const dummy = empCodes.map(emp =>
            alert(emp.empCode + "가 이미 마감되어있습니다"),
          );
        } else {
          console.log("마감함수작동"+empcode1);

          closeSalaryWithSlipRequest({ empcode1 }); //마감 함수를 부른다.
          alert("월 급여 마감을 완료했습니다.");
        }
      } else {
        alert("마감할 값을 선택해주세요");
      }
    } else {
      alert("마감할 값을 선택해주세요");
    }
  };

  useEffect(() => {
    //마감 함수에서 에러가 발생했을시 전표발행을 막는다.
    console.log("에러코드", flag);
    console.log("전표발행");
    makeJournal(empcode1);
  }, [flag]);

  const onRowSelected = event => {
    console.log("온셀로우 이벤트 ", event);

    if (event.node.selected) {
      let list = [];
      list.push(event.api.getSelectedRows());
      setEmpCodes(list[0]);
    } else {
      const empcode1 = empCodes.filter(
        empCode2 => empCode2.empCode !== event.node.data.empCode,
      );
      console.log(empcode1);
      setEmpCodes(empcode1);
    }
  };

  return (
    <div>
      <CloseSalary
        handleChange={handleChange}
        callCloseSalary={callCloseSalary}
        onRowSelected={onRowSelected}
        salaryList={salaryList}
        findCloseSalary={findCloseSalary}
        setEvent={setEvent}
        empCodes={empCodes}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  salaryList: selectSalaryList,
  flag: selectedErrorCD,
});

export default connect(mapStateToProps, {
  salaryListRequest,
  closeSalaryWithSlipRequest,
})(CloseSalaryContainer);