//**************************2020-08-20 63기 손유찬 ********************************* 
import { useState, useEffect } from "react";

export default function useSelectItem() {
  const [selectedmonth, setselectedmonth] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectDeptCode, setSelectDeptCode] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const thisYear = new Date().getFullYear();

  let months = [];
  let DeptNames = ["총무부","영업부","생산부","구매부","인사부","개발부"];
  let deptCode = []
  useEffect(() => {
    for (var i = 1; i < 13; i++) {
      months.push({
        value: thisYear + "-" + i,
        label: thisYear + "년 " + i + "월",
      });
    if(i<DeptNames.length)
      deptCode.push({
        value: "DPT-0"+(i),
        label: DeptNames[i-1],
    })
  

  }
  setselectedmonth(months);
 
  setSelectDeptCode(deptCode);

  }, []);

  return { selectedmonth,selectDeptCode };
}
//**************************2020-08-20 63기 손유찬 ********************************* 