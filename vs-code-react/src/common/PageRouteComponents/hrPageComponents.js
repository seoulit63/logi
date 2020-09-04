// 인 사 관 리 =========================================================================================================================
export { default as EmpDetailedContainer } from "../../ERP/HR/Page/EmpDetailed/EmpDetailedContainer"; // 사원상세조회          //유주
export { default as EmpRegist } from "ERP/HR/Page/EmpRegist/EmpRegist"; //사원등록     //성훈

// 사 원 관 리 =========================================================================================================================
export { default as DayAttendance } from "ERP/HR/Page/DayAttendance/DayAttendanceContainer"; // 2020-08-26 일근태 조회 기록 재영//
export { default as RestAttendance } from "ERP/HR/Page/RestAttendance/RestAttendance"; //외출 및 조퇴 시작 _준서 _20.08.24
export { default as Break } from "ERP/HR/Page/Break/Break"; //휴가 신청/조회 시작 _재영 _20.08.31
export { default as Travel } from "ERP/HR/Page/Travel/Travel"; //2020-08-31 손유찬 --출장/교육신청 
export { default as OverWork } from "ERP/HR/Page/OverWork/OverWork"; //2020-08-31 손유찬 --초과근무신청 


// 근 태 관 리 =========================================================================================================================
export { default as DayAttdManageContainer } from "ERP/HR/Page/DayAttdManage/DayAttdManageContainer"; // 2020-08-23 일 근태 관리   재영
export { default as MonthAttdManageContainer } from "ERP/HR/Page/MonthAttendance/MonthAttdManageContainer"; // 2020-08-21 월 근태 관리  재영
export { default as AttendanceApploval } from "ERP/HR/Page/AttendanceApploval/AttendanceApploval";  // 결재승인관리 _준서

// 급 여 조 회 =========================================================================================================================
export { default as MonthSalaryManage } from "ERP/HR/Page/MonthSalary/MonthSalaryManage"; //2020-08-20 63기 손유찬 -- 월별 급여조회



// 급 여 관 리 =========================================================================================================================
export { default as CloseSalaryContainer } from "ERP/HR/Page/SalaryManage/CloseSalaryContainer"; //2020-08-20 63기 손유찬수정 --월급여 조회마감
export { default as BaseExtSalManage } from "ERP/HR/Page/BaseExtSalManage/BaseExtSalManage"; //2020-08-22 63기 손유찬 -- 초과수당관리
export { default as BaseDeductionManage } from "ERP/HR/Page/BaseDeductionManage/BaseDeductionManage"; //2020-08-26 63기 손유찬 -- 공제기준관리
export { default as BaseSalaryManage } from "ERP/HR/Page/BaseSalaryManage/BaseSalaryManage"; //2020-08-26 63기 손유찬 -- 급여기준관리