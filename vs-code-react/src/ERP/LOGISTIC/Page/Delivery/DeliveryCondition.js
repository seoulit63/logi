import React, { useState } from "react";
import { Button, TextField, makeStyles, Typography } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
/*#####################################  2020-08-24 #######################################*/
/*###################################### 63기 김태윤 #######################################*/
/*##################################### 납품현황 수정#######################################*/
const useStyles = makeStyles(theme => ({  
  btnSearch: {
    fontSize: "1.3rem",
    backgroundColor: "rosybrown",
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
    { headerName: "납품일련번호", field: "deliveryNo", width: 170 },
    { headerName: "견적일련번호", field: "estimateNo", width: 140 },  
    { headerName: "수주일련번호", field: "contractNo", width: 140},
    { headerName: "수주상세일련번호", field: "contractDetailNo", width: 170},
    { headerName: "거래처코드", field: "customerCode", width: 100 },
    { headerName: "처리자코드", field: "personCodeInCharge", width: 100 },
    { headerName: "품목코드", field: "itemCode", width: 120},
    { headerName: "품목명", field: "itemName", width: 200 },
    { headerName: "단위", field: "unitOfDelivery", width: 80, editable: true },
    { headerName: "납품수량", field: "deliveryAmount", width: 110 },
    { headerName: "단가", field: "unitPrice", width: 100 },
    { headerName: "총액", field: "sumPrice", width: 100 },
    { headerName: "납품날짜", field: "deliverydate", width: 150 },
    { headerName: "배송지", field: "deliveryPlaceName", width: 150 },
  ];



const DeliveryCondition = () => {
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

  const searchDelivery = e => {


    let url = "http://localhost:8282/logi/logistics/sales/searchDeliveryInfoList";

    const getData = async () =>
      await axios({
        method: "POST",
        url: url,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    getData()
      .then(response => {
        console.log(
          "axios동작해서 나온 response.data ---> ",
          response.data.gridRowJson,
        );
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
        <Button className={classes.btnSearch} onClick={searchDelivery}>
          납품 현황 조회
        </Button>
      </div>
      <br />
      <hr className={classes.hrStyle} />
      <div className="contract_body">
        <br />
        <Typography className={classes.name}>납품 현황 리스트</Typography>
        <br />
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
            onGridReady={gridReady}
            columnDefs={headerName}
            style={gridStyle}
            rowSelection={single}
            rowData={rowData}
          />
        </div>
      </div>
    </>
  );
};

export default DeliveryCondition;

/*##################################### 납품현황 수정끝#####################################*/