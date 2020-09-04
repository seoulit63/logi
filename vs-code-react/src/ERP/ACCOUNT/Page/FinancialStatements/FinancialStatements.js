/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from "react";
import FinancialStatementsMenu from "ERP/ACCOUNT/Page/FinancialStatements/FinancialStatementsMenu";
import FinancialStatementsGrid from "ERP/ACCOUNT/Page/FinancialStatements/FinancialStatementsGrid";
import { Typography, AppBar, Toolbar, Grid} from "@material-ui/core"

const FinancialStatements = () => {
  // 날짜 관련 상태값 정의
  const [date, setDate] = useState({
    approvalDate: ""
  });

  return (
    <React.Fragment>
      <Grid container spacing={0}>
      <Grid item xs={12}>
      <div className="ui primary segment">      
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography component="h2" variant="h4">
          💩재무상태표💩          
          </Typography>
        </Toolbar>
      </AppBar>     
      <br/>
      <FinancialStatementsMenu date={date} setDate={setDate} />
      <FinancialStatementsGrid date={date} />
      </div>
      </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FinancialStatements;
