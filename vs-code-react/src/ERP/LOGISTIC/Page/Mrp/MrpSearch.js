import React, { useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
/*#####################################  2020-09-01 #######################################*/
/*###################################### 63기 김태윤 #######################################*/
/*####################################### MRP 수정 #########################################*/
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
  height: "630px",
  width: "98%",
  backgroundColor: "gainsboro",
};

const gridStyle = {
  width: "98%",
  height: "70vh",
  backgroundColor: "whiteSmoke",
};

const headerName = [
  { headerName: "소요량전개번호", field: "mrpNo", width: 200 },
  { headerName: "주생산계획번호", field: "mpsNo", width: 170 },  
  { headerName: "품목분류", field: "mrpGatheringNo", width: 130},
  { headerName: "품목코드", field: "itemCode", width: 130},
  { headerName: "품목명", field: "itemName", width: 210 },
  { headerName: "발주/작업지시기한", field: "orderDate", width: 180 },
  { headerName: "발주/작업지시완료기한", field: "requiredDate", width: 180},
  { headerName: "필요수량", field: "requiredAmount", width: 130 },
  { headerName: "단위", field: "unitOfMrp", width: 130 },
];



const MrpSearch = () => {
  const classes = useStyles();
  const single = "single";

  const [deliveryGridApi, setDeliveryGridApi] = useState("");

  const [rowData, setRowData] = useState("");

  function gridReady(params) {
    console.log("----- gridReady() 호출 -----");
    setRowData(null);
    setDeliveryGridApi(params.api);
    console.log("deliveryGridApi >>>", deliveryGridApi);
    return deliveryGridApi;
  }

  const searchMrp = e => {


    let url = "http://localhost:8282/logi/logistics/production/getMrpList";

    const getData = async () =>
      await axios({
        method: "POST",
        url: url,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params : { mrpGatheringStatusCondition : "",dateSearchCondition :"", mrpStartDate:"", mrpEndDate:"", mrpGatheringNo:""},
      });

    getData()
      .then(response => {
        console.log(
          "axios동작해서 나온 response.data ---> ",
          response.data.gridRowJson,
        );
        console.log("r",response.data);
        console.log("r",response);
        setRowData(response.data.gridRowJson);
      })
      .catch(e => {
        console.log("납품조회하다가 발생한 에러 >> ", e);
      });
  };

  return (
    <>
      <div className="contract_header">
        &nbsp;&nbsp;
        <Button className={classes.btnSearch} onClick={searchMrp}>
        소요량 취합 결과 조회
        </Button>
      </div>
      <br />
      <hr className={classes.hrStyle} />
      <div className="contract_body">
        <br />
        <Typography className={classes.name}>취합 대기중인 소요량 전개 목록</Typography>
        <br />
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
            onGridReady={gridReady}
            columnDefs={headerName}
            style={gridStyle}
            rowSelection={single}
            rowData={rowData}
            // getRowStyle={function () {
            //   return { "text-align": "center" };
            // }}
          />
        </div>
      </div>
    </>
  );
};

export default MrpSearch;

/*##################################### MRP 수정끝#####################################*/