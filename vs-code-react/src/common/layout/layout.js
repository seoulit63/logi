import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "common/layout/styles";

// components
import HeaderContainer from "common/Header/HeaderContainer";
import Sidebar from "common/Sidebar/Sidebar";
//import LayoutPageRoute from './LayoutPageRoutes';

// pages
import Dashboard from "common/dashboard/Dashboard";
import * as additional from "common/PageRouteComponents/additionalFunctionComponent";
import * as account from "common/PageRouteComponents/accountPageComponents";
import * as hr from "common/PageRouteComponents/hrPageComponents";
import * as logistic from "common/PageRouteComponents/logisticsPageComponents";

// context
import { useLayoutState } from "common/context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <HeaderContainer history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />

          <Switch>
            {/* 메인 홈 : 여기도 이상없이 잘됨 */}
            <Route path="/app/dashboard" component={Dashboard} />
            {/* 각자 업무에 맞게 라우터를 정의 하시오 */}


            {/* 회 계 */}
            {/* 전표입력 */}
            <Route
              exact
              path="/app/acc/account/slipForm"
              component={account.Slip}
            />{" "}
            {/* 일반전표 */}
            <Route
              exact
              path="/app/acc/account/approvalManager"
              component={account.ApprovalManager}
            />{" "}
            {/* 전표승인 */}
            {/* 계정과목 및 계정 */}
            {/* 계정과목 */}
            <Route
              exact
              path="/app/acc/account/accountForm"
              component={account.AccountForm}
            />{" "}
            {/* 거래처원장 */}
            {/*********************************** 2020-08-25 조편백 추가 **********************************/}
            {/* 계정별원장 */}
            <Route
              exact
              path="/app/acc/statement/AccountLedger"
              component={account.AccountLedger}
            />{" "}
            {/*********************************** 2020-08-25 조편백 끝 ***********************************/} 
            <Route
              exact
              path="/app/acc/statement/financialPosition"
              component={account.FinancialStatements}
            />{" "}
            {/* 재무상태표 */}
            {/* 합계잔액시산표 */}
            <Route
              exact
              path="/app/acc/statement/totalTrialBalance"
              component={account.TotalTrialBalance}
            />{" "}
            {/*********************************** 2020-08-24 조편백 추가 ***********************************/}
            {/* 손익계산서 */}
            <Route
              exact
              path="/app/acc/statement/IncomeStatement"
              component={account.IncomeStatement}
            />{" "}
            {/*********************************** 2020-08-24 조편백 끝 ***********************************/}
            {/*********************************** 2020-08-24 정대현 추가 ***********************************/}
            {/* 현금출납장 */}
            <Route
              exact
              path="/app/acc/statement/cashJournal"
              component={account.CashJournal}
            />
            {/*********************************** 2020-08-24 정대현 끝 ***********************************/}
            {/* 매입매출장 */}
            {/* 분개장 */}
            <Route
              exact
              path="/app/acc/account/journalForm"
              component={account.JournalForm}
            />
            {/* ///////////////////////// 2020-08-24 김진호 추가 /////////////////////////// */}
            {/* 일(월)계표 */}
            <Route
              exact
              path="/app/acc/statement/detailTrialBalance"
              component={account.DetailTrialBalance}
            />{" "}
            {/* ///////////////////////// 2020-08-24 김진호 끝  /////////////////////////// */}
             {/*********************************** 2020-08-31 조편백 추가 **********************************/}
            {/* 거래처관리 */}
            <Route
              exact
              path="/app/acc/company/WorkplaceManagement"
              component={account.WorkplaceManagement}
            />{" "}
            {/*********************************** 2020-08-31 조편백 끝 ***********************************/}



            {/* ================인 사=============== */}
            {/*---------------인사관리----------------*/}

            {/***   사원등록*/}
            <Route
              exact
              path="/app/hr/emp/empDetailedView"
              component={hr.EmpDetailedContainer}
            />{" "}
            {/*** 사원상세조회 */}
            <Route
              exact
              path="/app/hr/emp/empRegist"
              component={hr.EmpRegist}
            />
                        
            {/*------------- 사원메뉴--------------- */}

            {/* 일근태기록조회 */}{/************************** 일근태기록조회 _재영 _20.08.26 */}
            <Route
              exact
              path="/app/hr/attendance/dayAttendance"
              component={hr.DayAttendance}
            />{" "}
            {/************************** 일근태기록조회 _재영 _20.08.26 */}
            {/* 근태외신청/조회 */}{/************************** 근태외신청/조회 시작 _준서 _20.08.25 */}
            <Route
              exact
              path="/app/hr/attendance/restAttendance"
              component={hr.RestAttendance}
            />{" "}
            {/************************** 근태외신청/조회 종료 _준서 _20.08.25 */}
            {/* 휴가 신청/조회 */}
            {/************************** 휴가 신청/조회 시작 _재영 _20.08.31 */}
            <Route
              exact
              path="/app/hr/attendance/break"
              component={hr.Break}
            />{" "}
            {/************************** 휴가 신청/조회 종료 _재영 _20.08.31 */}     
            {/* 출장/교육 신청 */}{/************************** 출장/교육 신청 시작 2020-08-31 손유찬 */}
            <Route
              exact
              path="/app/hr/attendance/travel"
              component={hr.Travel}
            />{" "}
            {/************************** 출장/교육 신청 시작 2020-08-31 손유찬 *************************/}   
            {/* 초과근무 신청 */}{/************************** 초과근무 신청 시작 2020-08-31 손유찬 */}
            <Route
              exact
              path="/app/hr/attendance/overWork"
              component={hr.OverWork}
            />{" "}
            {/************************** 초과근무 신청 시작 2020-08-31 손유찬 *************************/}
  


            {/*------------ 근태관리--------------- */}

             {/************************** 일근태관리 _재영 _20.08.21 */}
            <Route
              exact
              path="/app/hr/attendance/dayAttendanceManage"
              component={hr.DayAttdManageContainer}
            />{" "}
              {/************************** 일근태관리 _재영 _20.08.21 */}
            {/************************** 월근태관리 _재영 _20.08.23 */}
            <Route
              exact
              path="/app/hr/attendance/monthAttendanceManage"
              component={hr.MonthAttdManageContainer}
            />{" "}
           {/************************** 월근태관리 _재영 _20.08.23 */}            
           {/************************** 결재승인관리 시작 _준서 */}
            <Route
              exact
              path="/app/hr/attendance/attendanceApploval"
              component={hr.AttendanceApploval}
            />{" "}
            {/************************** 결재승인관리 종료 _준서 */}

           
            {/*---------------- 급여조회 ----------------*/}
            
            {/**  월급여 조회 */}
            {/*******************2020-08-20 손유찬 시작*************************/}
            <Route
              exact
              path="/app/hr/Salary/monthSalary"
              component={hr.MonthSalaryManage}
            />{" "}
            {/*******************2020-08-20 손유찬 종료*************************/}


            {/*----------------- 급여관리---------------- */}
            
            {/* 급여기준관리  */}{/*******************2020-08-26 손유찬 시작************************/}
            <Route
              exact
              path="/app/hr/salary/baseSalaryManage"
              component={hr.BaseSalaryManage}
            />{" "}
            {/*******************2020-08-26 손유찬 종료*************************/}
            {/* 공제기준관리 */}{/*******************2020-08-26 손유찬 시작*************************/}
            <Route
              exact
              path="/app/hr/salary/baseDeductionManage"
              component={hr.BaseDeductionManage}
            />{" "}
            {/*******************2020-08-26 손유찬 종료*************************/}
            {/* 초과수당관리 */}{/*******************2020-08-22 손유찬 시작*************************/}
            <Route
              exact
              path="/app/hr/salary/baseExtSalManage"
              component={hr.BaseExtSalManage}
            />{" "}
            {/*******************2020-08-22 손유찬 종료*************************/}
            {/** 월급여마감 */}{/*******************2020-08-22 손유찬 시작*************************/}
            <Route
              exact
              path="/app/hr/salary/closeSalary"
              component={hr.CloseSalaryContainer}
            />{" "}
            {/*******************2020-08-22 손유찬 종료*************************/}



        {/* 물 류 */}
            {/* 기초정보관리 */}
            {/* 물류정보관리 */}
            {/* 영업관리 */}
            <Route
              exact
              path="/app/logi/sales/estimateInfo"
              component={logistic.Estimate}
            />
            {/* 견적관리 -> 견적조회/수정 */}
            <Route
              exact
              path="/app/logi/sales/estimateRegister"
              component={logistic.EstimateRegister}
            />
             {/* 견적관리 -> 견적추가 */}
            <Route
              exact
              path="/app/logi/sales/contractRegister"

              component={logistic.Contract}
            />{" "}
            {/* 수주관리 }
                  {/* 자재구매관리 */}
            <Route
              path="/app/logi/purchase/orderRegister"
              component={logistic.OrderRegister}
            />
            {/* 납품관리 */}
            <Route
              path="/app/logi/sales/deliveryInfo"
              component={logistic.Delivery}
            />
            {/*******************2020-09-03 정대현 시작*************************/}
            {/* 자재명세서(BOM) */}
            <Route
              path="/app/logi/purchase/logisticsBOM"
              component={logistic.Bom}
            />
            {/*******************2020-09-03 정대현 종료*************************/}
            {/**발주 및 재고처리 */}
            <Route
              path="/app/logi/purchase/stockInfo"
              component={logistic.StockManagement}
            />
            {/* 생산관리 */}
            <Route
              exact
              path="/app/logi/production/mpsRegister"
              component={logistic.MpsRegister}
            />{" "}
            <Route
              exact
              path="/app/logi/production/workInstruction"
              component={logistic.WorkInstruction}
            />{" "}
            {/* MPS */}
            {/*******************2020-09-03 김태윤 시작*************************/}
            <Route
              exact
              path="/app/logi/production/mrpRegisterAndGather"
              component={logistic.MrpResisterAndGather}
            />
            {/*******************2020-09-03 김태윤 종료*************************/}




            {/* 부가기능 Route 여긴 이상없이 잘됨 */}
            <Route path="/app/typography" component={additional.Typography} />
            <Route path="/app/tables" component={additional.Tables} />
            <Route
              path="/app/notifications"
              component={additional.Notifications}
            />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={additional.Maps} />
            <Route path="/app/ui/icons" component={additional.Icons} />
            <Route path="/app/ui/charts" component={additional.Charts} />*
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
