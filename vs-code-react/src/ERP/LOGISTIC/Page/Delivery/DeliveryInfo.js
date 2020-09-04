import React, { useState } from "react";
import { Button, TextField, makeStyles, Typography, Select, MenuItem, Dialog, DialogTitle, DialogContent, List, DialogActions, Radio} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
/*#####################################  2020-08-28 #######################################*/
/*###################################### 63기 김태윤 ######################################*/
/*######################## 납품 다이알로그, 거래처 검색, 납품 추가 #########################*/
const useStyles = makeStyles(theme => ({  
  btnSearch: {
    fontSize: "1.0rem",
    backgroundColor: "darkgrey",
    color: "white",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "15%",
    height: "20%",
  },
  btnDelivery: {
    fontSize: "1.0rem",
    backgroundColor: "darkgrey",
    color: "white",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "7%",
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
  height: "300px",
  width: "98%",
  backgroundColor: "gainsboro",
};

const gridStyle = {
  width: "98%",
  height: "70vh",
  backgroundColor: "whiteSmoke",
};

const headerName = [
  { headerName: "수주일련번호", field: "contractNo", width: 150 },
  { headerName: "견적일련번호", field: "estimateNo", width: 150 },  
  { headerName: "수주유형분류", field: "contractTypeName", width: 150},
  { headerName: "거래처코드", field: "customerCode", width: 150 },
  { headerName: "거래처명", field: "customerName", width: 150 },
  { headerName: "견적일자", field: "estimateDate", width: 150},
  { headerName: "수주일자", field: "contractDate", width: 150 },
  { headerName: "수주요청자", field: "contractRequester", width: 150, editable: true },
  { headerName: "수주담당자명", field: "empNameInCharge", width: 150 },
  { headerName: "비고", field: "description", width: 150 },
  { headerName: "contractType", field: "contractType", width: 150 },
  { headerName: "personCodeInCharge", field: "personCodeInCharge", width: 150 },
  { headerName: "납품완료여부", field: "deliveryCompletionStatus", width: 150 },
];

const deliveryDetailName = [
  { headerName: "", width: 50, checkboxSelection: true},// headerCheckboxSelection: true },
  { headerName: "수주상세일련번호", field: "contractDetailNo", width: 180 },
  { headerName: "수주일련번호", field: "contractNo", width: 160 },
  { headerName: "품목코드", field: "itemCode", width: 130 },
  { headerName: "품목명", field: "itemName",  width: 130 },
  { headerName: "단위", field: "unitOfContract", width: 100 },
  { headerName: "납기일", field: "dueDateOfContract", width: 130 },
  { headerName: "견적수량", field: "estimateAmount", width: 100 },
  { headerName: "재고사용량", field: "stockAmountUse", width: 100 },
  { headerName: "필요제작수량", field: "productionRequirement", width: 100 },
  { headerName: "단가", field: "unitPriceOfContract", width: 130 },
  { headerName: "합계액", field: "sumPriceOfContract", width: 130 },
  { headerName: "처리상태", field: "processingStatus", width: 100 },
  { headerName: "작업완료여부", field: "operationCompletedStatus", width: 100 },
  { headerName: "납품완료여부", field: "deliveryCompletionStatus", width: 100 },
  { headerName: "비고", field: "description", width: 130 },
];

const commColumnDefs = [
  { headerName: "거 래 처 코 드 번 호", field: "detailCode", width: 100,},
  { headerName: "거 래 처", field: "detailCodeName", width: 100, }
];

const DeliveryInfo = () => {
  const classes = useStyles();
  const single = "single";

  const [deliveryGridApi, setDeliveryGridApi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rowData, setRowData] = useState("");
  const [rowDetailData, setRowDetailData] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const [searchCondition, setSearchCondition] = useState("searchByDate");
  const [open, setOpen] = useState(false);
  const [detailCode,setDetailCode] = useState("");
  const [detailCodeName,setDetailCodeName] = useState("");
  const [contractDetailNo,setContractDetailNo] = useState("");
  const [detailRow, setDetailRow] = useState([]);
  const handleClose = () => {
      setOpen(false);
  }
  const handleOpen = () => {
      setOpen(true);
  }
  
  
  const handleChange = e => {
      if(e.target.value==="searchByDate"){ setFormVisible(true); }
      else{ setFormVisible(false); } 
      setSearchCondition(e.target.value);
      setRowData("");
      setRowDetailData("");
  }
 
  function gridReady(params) {
    setDeliveryGridApi(params.api);
    setRowData(null);
    setRowDetailData(null);
    return deliveryGridApi;
    
  }

  const startDateChange = e => {
    setStartDate(e.target.value);
  };

  const endDateChange = e => {
    setEndDate(e.target.value);
  };
  console.log("종료날짜>>", endDate);
 
  // ------------------------ 수주검색------------------------------
  const searchDelivery= e => {

    let startd = startDate;
    let endd = endDate;
    
    if(formVisible==true){
      if (startd | endd === undefined) {
        alert("날짜를 입력해 주세요");
        return;
      }
    }else{
      if(detailCodeName==""){
        alert("거래처를 선택하세요");
        return;
      }
    }
    
    let url = "http://localhost:8282/logi/logistics/sales/searchDeliverableContractList";
    console.log(startd,endd,searchCondition,detailCode);
    const getData = async () =>
      await axios({
        method: "POST",
        url: url,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },  
        params: { startDate: startd, endDate: endd,  searchCondition : searchCondition , customerCode : detailCode},
      });

    getData()
      .then(response => {
        console.log(
          "axios동작해서 나온 response.data ---> ",
          response.data.gridRowJson,
        );

        setRowData(response.data.gridRowJson);
        setRowDetailData();
      })
      .catch(e => {
        console.log("납품조회하다가 발생한 에러 >> ", e);
      });
    
  };

  const rowClicked = e => {
    console.log("======= 납품 상세 나오나 ========");
    console.log("해당 번호 :: e >>> ", e);

    setRowDetailData(rowData[e.rowIndex].contractDetailTOList);
  };

  let detailData;
  var detailRowClicked= e => {
    /*
    console.log("%%%%%",e.data);
    detailData=e.data;
    console.log("detailData",detailData);
    if(e.data.chk=="1"){
    setDetailRow(e.data);
    setContractDetailNo(e.data.contractDetailNo);
    }else{
      setDetailRow(null);
      setContractDetailNo(null);
    }
    */
  };

  const detailRowSelected = (e) => {
    
    setDetailRow(e.data);
    setContractDetailNo(e.data.contractDetailNo);
    
  }


  const delivery = async(e) =>{
    /*
    if(detailRow.processingStatus==null){
      alert("처리되지 않은 항목입니다. MPS계획수립부터 작업까지 완료해주세요.");
    }else if(detailRow.productionRequirement==null){
      alert("작업이 완료되지 않은 항목입니다. 작업지시 및 작업완료까지 완료해주세요.");
    }else{
      */
    try {
      await axios(
          'http://localhost:8282/logi/logistics/sales/deliver',
          { params: { contractDetailNo: contractDetailNo }, },
      ).then( response => {
        //  if(response.data.errorCode==="0"){ alert ("납품성공");}

      });
      } catch (e) {
      console.log(e);
      }
  //  }
  }

  const cellClick = e =>{
    setDetailCodeName(e.node.data.detailCodeName);
    setDetailCode(e.node.data.detailCode);
    setOpenEs(false);
  }
  const [openEs, setOpenEs] =useState(false);
    // modal 화면에 보여질 grid data
    const [codeList, setCodeList] = useState([]);

    const handleClickOpen = async (e) => {
      setOpenEs(true);
              console.log('itemName::: 아이템코드는 히든으로 만들자!');
               //modal open
              setOpenEs(true);
              try {
                  await axios.get(
                      'http://localhost:8282/logi/base/codeList.do',
                      { params: { divisionCode: 'CL-01' }, },
                  ).then( response => {
                      const jsonData = response.data.detailCodeList; // return array;
                      setCodeList(jsonData);// data 불변성 적용해야 한다.!!!!!!!!!!!!!!!!!!!!
                  });
              } catch (e) {
                  console.log(e);
              }

    };

    const closeEsDialog = () => {
      setOpenEs(false);
    };

    const onModaGridReady = params => {
      params.api.sizeColumnsToFit();
     };  
  return (  
    <>
      <div className="contract_header">
        <div id="deliveryPage" className={classes.cal} >
            <Select
              name="searchCondition"
              open={open}
              value={searchCondition}
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={handleChange}
            >

              <MenuItem value="searchByDate">기간 검색</MenuItem>
              <MenuItem value="searchByCustomer">거래처 검색</MenuItem>
            </Select>
          <form hidden={!formVisible}>
          <tr>
            <td width="200">
              <div>
              <Typography className={classes.labelStyle}>시작일</Typography> 
              <TextField
                id={"startDate"}
                type="date"
                value={startDate}
                onChange={startDateChange}
                rowSelection={single}
              ></TextField>
              </div>
            </td>
            <td width="200">
             <div>
              <Typography className={classes.labelStyle}>종료일</Typography>
              <TextField
                id={"endDate"}
                type="date"
                value={endDate}
                onChange={endDateChange}
              ></TextField>
              </div>
            </td>
          </tr>
          </form >
          <form hidden={formVisible}>
          <TextField
              value={detailCodeName}
              rowSelection={single}
              placeholder="회사코드"
              onClick={handleClickOpen}
          ></TextField>
          <Button
              size= "large"
              color="grey"
              onClick={handleClickOpen}
            >거래처 조회</Button>  
          </form>
        </div>
        <Button className={classes.btnSearch} onClick={searchDelivery}>
          납품 가능 수주 조회
        </Button>
        <Button className={classes.btnDelivery} onClick={delivery}>
          납품
        </Button>
      </div>
      <br />
      <hr className={classes.hrStyle} />
      <div className="contract_body">
        <br />
        <Typography className={classes.name}>납품 가능 수주 리스트</Typography>
        <br />
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
            onGridReady={gridReady}
            columnDefs={headerName}
            style={gridStyle}
            rowSelection={single}
            onRowClicked={rowClicked}
            rowData={rowData}
            target={this}
            getRowStyle={function () {
              return { "text-align": "center" };
            }}
          />
        </div>
        <br />
        <hr className={classes.hrStyle} />
        <br />
        <Typography className={classes.name}>납품 가능 수주리스트 상세</Typography>
        <br />
        <hr className={classes.hrStyle} />
        <div className={"ag-theme-material"} style={gridFrameStyle}>
          <AgGridReact
            onGridReady={gridReady}
            columnDefs={deliveryDetailName}
            style={gridStyle}
            rowSelection={single}
            onRowClicked={detailRowClicked}
            rowData={rowDetailData}
            onRowSelected={detailRowSelected}
            tartget={this}
            getRowStyle={function () {
              return { "text-align": "center" };
            }}
          />
        </div>
        <div>
          <Dialog open={openEs} onClose={closeEsDialog}
          fullWidth={true} maxWidth={'xs'}>
              <DialogTitle id="simple-dialog-title">회 사 목 록</DialogTitle>
              <DialogContent>
                  <List>
                      { <div className={"ag-theme-balham"}
                          style={{ height: "300px", width: "100%", paddingTop: "8px" }}>
                          <AgGridReact
                              columnDefs={commColumnDefs}
                              rowData={codeList}   // 뿌릴 data
                              rowSelection='single'  // 하나만 선택 가능.
                              onGridReady={onModaGridReady}
                              onRowClicked={cellClick}
                              getRowStyle={function () {
                                return { "text-align": "center" };
                              }}
                          />
                      </div> }
                  </List>
              </DialogContent>
              <DialogActions>
                  <Button variant="outlined" color="secondary" onClick={closeEsDialog}
                  >닫기</Button>
              </DialogActions>
            </Dialog>
        </div>
      </div>
    </>
  );
};

export default DeliveryInfo;
/*####################################### 납품 수정끝#######################################*/
