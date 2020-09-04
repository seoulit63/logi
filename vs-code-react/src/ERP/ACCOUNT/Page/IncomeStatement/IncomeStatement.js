import React, { useState } from "react";
import IncomeStatementGrid from "ERP/ACCOUNT/Page/IncomeStatement/IncomeStatementGrid";
import IncomeStatementSearch from "ERP/ACCOUNT/Page/IncomeStatement/IncomeStatementSearch";
import { Grid, AppBar, Typography, Toolbar } from "@material-ui/core";

const IncomeStatement = () => {
  // 날짜 초기 상태값 정의
  const [date, setDate] = useState({
    approvalDate: "",
  });

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className="ui primary segment">
            <AppBar position="sticky">
              <Toolbar>
                <Typography component="h1" variant="h3">
                  손익계산서
                </Typography>
              </Toolbar>
            </AppBar>
            <br />
            <IncomeStatementSearch date={date} setDate={setDate} />
            <IncomeStatementGrid date={date} />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default IncomeStatement;
