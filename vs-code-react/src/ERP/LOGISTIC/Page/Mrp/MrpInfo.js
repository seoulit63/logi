/*******************2020-08-25 수정*********************/    
import React, { useState } from "react";
import { Button, TextField, makeStyles, Typography, Select, MenuItem, Dialog, DialogTitle, DialogContent, 
  List, DialogActions, Radio, FormControlLabel,RadioGroup} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
/*#####################################  2020-09-03 #######################################*/
/*###################################### 63기 김태윤 #######################################*/
/*##################################### MRP 수정#######################################*/
const useStyles = makeStyles(theme => ({  
    btnSearch: {
      fontSize: "1.3rem",
      backgroundColor: "black",
      color: "white",
      fontWeight: "bold",
      outline: "none",
      borderRadius: "4px",
      cursor: "pointer",
      border: "none",
      width: "20%",
      height: "20%",
    },
    labelStyle: {
      color: "gray",
      padding: theme.spacing(2),
    },
    cal: {
      padding: theme.spacing(2),
    },
    end: {
      padding: theme.spacing(2),
    },
    hrStyle: {
      opacity: "0.4",
    },
    name: {
      color: "dimGray",
      fontWeight: "600",
      fontSize: "20px",
    },
  }));
  
  const gridFrameStyle = {
    height: "400px",
    width: "98%",
    backgroundColor: "gainsboro",
  };
  
  const gridStyle = {
    width: "98%",
    height: "70vh",
    backgroundColor: "whiteSmoke",
  };
  
  const mrpGatheringGrid = [
    { headerName: "소요량취합번호", field: "mrpGatheringNo", width: 200 },
    { headerName: "구매 및 생산여부", field: "orderOrProductionStatus", width: 170 },  
    { headerName: "품목코드", field: "itemCode", width: 130},
    { headerName: "품목명", field: "itemName", width: 210 },
    { headerName: "필요수량", field: "necessaryAmount", width: 130 },
    { headerName: "단위", field: "unitOfMrpGathering", width: 130 },
    { headerName: "발주/작업지시기한", field: "claimDate", width: 180 },
    { headerName: "발주/작업지시완료기한", field: "dueDate", width: 180},
    { headerName: "공정진행여부", field: "onGoingProcessStatus", width: 180},
  ];
  

  const mrpSearchGrid = [
    { headerName: "소요량전개번호", field: "mrpNo", width: 200 },
    { headerName: "주생산계획번호", field: "mpsNo", width: 170 },  
    { headerName: "품목분류", field: "mrpGatheringNo", width: 130},
    { headerName: "품목분류", field: "itemClassification", width: 130},
    { headerName: "품목코드", field: "itemCode", width: 130},
    { headerName: "품목명", field: "itemName", width: 210 },
    { headerName: "발주/작업지시기한", field: "orderDate", width: 180 },
    { headerName: "발주/작업지시완료기한", field: "requiredDate", width: 180},
    { headerName: "필요수량", field: "requiredAmount", width: 130 },
    { headerName: "단위", field: "unitOfMrp", width: 130 },
  ];

const MrpInfo = () => {
//   const useStyles = makeStyles(theme => ({
//     bar: {
//       backgroundColor: "gray",
//     },
//   }));
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchDateCondition, setSearchDateCondition] = useState("");
    const [mrpGatheringGridData, setMrpGatheringGridData] = useState("");
    const [mrpSearchGridData, setMrpSearchGridData] = useState("");
    const startDateChange = e => {
      setStartDate(e.target.value);
    };

    const endDateChange = e => {
      setEndDate(e.target.value);
    };

    const radioChange = e => {
      console.log("e.target.value",e.target.value);
      setSearchDateCondition(e.target.value);
    }
    const search = e => {
      console.log("e",e)
    }
    return (
      <React.Fragment>
        <>
        <div>
        <RadioGroup
            row
            aria-label="position"
          >
          &nbsp;
        <fieldset>{/*} className={classes.dialog} > */}
              <legend>
                <strong>소요량취합 검색</strong>
              </legend>
              <FormControlLabel
                value="claimDate"
                control={<Radio />}
                label="발주/작업지시 기한"
                onChange={radioChange}
              />
              <FormControlLabel
                value="dueDate"
                control={<Radio />}
                label="발주/작업지시 완료 기한"
                onChange={radioChange}
              />
        </fieldset>
      </RadioGroup>
      <br/>
      <tr>
      &nbsp;
              <td width="200">
              <div>
              <Typography>{/* className={classes.labelStyle}>*/}시작일</Typography>
              <TextField
                id={"startDate"}
                type="date"
                value={startDate}
                onChange={startDateChange}
            //    rowSelection={single}
              ></TextField>
              </div>
            </td>
            <td width="200">
             <div>
              <Typography>{/* className={classes.labelStyle}>*/}종료일</Typography>
              <TextField
                id={"endDate"}
                type="date"
                value={endDate}
                onChange={endDateChange}
              ></TextField>
              </div>
            </td>
            <td>
            <Button onClick={search}>{/* className={classes.btnSearch} onClick={searchMrp}>*/}
              소요량취합 조회
             </Button>
            </td>
          </tr>
        </div>
        <div>
          <br/>
        <Typography>취합 대기중인 소요량 전개 목록</Typography>
        {/* <Typography className={classes.name}>취합 대기중인 소요량 전개 목록</Typography> */}
        <br />
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
        //    onGridReady={gridReady}
            columnDefs={mrpGatheringGrid}
         //   style={gridStyle}
         //   rowSelection={single}
         //   rowData={rowData}
            // getRowStyle={function () {
            //   return { "text-align": "center" };
            // }}
          />
        </div>
        <br/>
        <br/>
        <br/>
        <Typography>취합 대기중인 소요량 전개 목록</Typography>
        <br/>
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
        //    onGridReady={gridReady}
            columnDefs={mrpSearchGrid}
         //   style={gridStyle}
         //   rowSelection={single}
         //   rowData={rowData}
            // getRowStyle={function () {
            //   return { "text-align": "center" };
            // }}
          />
        </div>
        </div>
      </>
    </React.Fragment>
  );
};

export default MrpInfo;

/*##################################### MRP 수정끝#####################################*/