import React, { useState } from "react";
import AccountLedgerSearch from "ERP/ACCOUNT/Page/AccountLedger/AccountLedgerSearch";
import AccountSearch from "ERP/ACCOUNT/Page/AccountLedger/AccountSearch";

import { AppBar, Typography, Toolbar, Tab } from "@material-ui/core";
import useStyles from "ERP/ACCOUNT/Page/AccountLedger/Theme";

//========================================= 2020-08-25 계정별원장 조편백 ==============================================
const AccountLedger = () => {
  const classes = useStyles();

  // 코드 초기 상태값 정의
  // AccountSearch 에서 변경된날짜를 AccountLedgerSearch 에 넘겨주기위해 초기값을 부모컴포넌트에 세팅
  const [code, setAccountCode] = useState({
    accountCode: "",
  });

  return (
    <div className="ui primary segment">
      <AppBar position="sticky">
        <Toolbar>
          <Typography component="h1" variant="h3">
            계정별 원장
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <div>
        <div className="tab1">
          <AppBar className={classes.root}>
            <Tab className={classes.tab} label=" 계정코드 " />
            <br />
            <br />
            <AccountSearch code={code} setAccountCode={setAccountCode} />
            <br />
          </AppBar>
        </div>
        <div className="tab2">
          <AppBar className={classes.root1}>
            <Tab className={classes.tab1} label=" 계정코드 기간조회 "></Tab>
            <AccountLedgerSearch code={code} />
          </AppBar>
        </div>
      </div>
    </div>
  );
};
export default AccountLedger;
