import React, { useState } from "react";
import TotalTrialBalanceGrid from "ERP/ACCOUNT/Page/TotalTrialBalance/TotalTrialBalanceGrid";
import TotalTrialBalanceSearch from "ERP/ACCOUNT/Page/TotalTrialBalance/TotalTrialBalanceSearch";
import { Grid, AppBar, Typography, Toolbar } from "@material-ui/core";

const TotalTrialBalance = () => {
  // 날짜 초기 상태값 정의
  const [date, setDate] = useState({
    approvalDate: "",
  });

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <div className="ui primary segment">
            <AppBar position="static">
              <Toolbar>
                <Typography component="h2" variant="h3">
                  합계 잔액 시산표
                </Typography>
              </Toolbar>
            </AppBar>
            <br />
            <TotalTrialBalanceSearch date={date} setDate={setDate} />
            <TotalTrialBalanceGrid date={date} />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TotalTrialBalance;
