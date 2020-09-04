import React, { useState } from "react";
import { Button, TextField, makeStyles, Typography, Select, MenuItem, Dialog, DialogTitle, DialogContent, 
  List, DialogActions, Radio, FormControlLabel,RadioGroup} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
/*#####################################  2020-09-03 #######################################*/
/*###################################### 63기 김태윤 ######################################*/
/*###################################### MRP 수정완료#########################*/
const useStyles = makeStyles(theme => ({  
  btnSearch: {
    fontSize: "1.0rem",
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "15%",
    height: "20%",
  },
  btnSimulSearch: {
    fontSize: "1rem",
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "47%",
    height: "20%",
  },
  btnDialogSearch: {
    fontSize: "1rem",
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    outline: "none",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "100%",
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
  text:{
    color: "black",
    fontWeight: "bold",
    border: "solid",
    width: "560px",
  },
  dialog:{
    color: "black",
    fontWeight: "bold",
    border: "solid",
    width: "300px",
  },
}));

const gridFrameStyle = {
  height: "500px",
  width: "98%",
  backgroundColor: "gainsboro",
};

const gridStyle = {
  width: "98%",
  height: "70vh",
  backgroundColor: "whiteSmoke",
};

//그리드에 동적으로 라디오버튼 만들어주는 기능
const checkRenderer = (element) => {
  if(element.data.mrpApplyStatus==="Y")
  return null;
  //return '<input type="radio" name="checkGroup"/>';
  else return '<input type="radio" name="checkGroup"/>';
};

const headerName = [
  { headerName: "", width: 50 , cellRenderer: checkRenderer},
  { headerName: "주생산계획번호", field: "mpsNo", width: 150 },  
  { headerName: "계획구분", field: "mpsPlanClassification", width: 150},
 // { headerName: "일련번호(수주/판매)", field: "no", width: 150 },
  { headerName: "수주상세일련번호", field: "contractDetailNo", width: 150 },
 // { headerName: "판매계획일련번호", field: "salesPlanNo", width: 150},
  { headerName: "품목코드", field: "itemCode", width: 150 },
  { headerName: "품목명", field: "itemName", width: 150, editable: true },
  { headerName: "단위", field: "unitOfMps", width: 150 },
  { headerName: "계획일자", field: "mpsPlanDate", width: 150 },
  { headerName: "계획수량", field: "mpsPlanAmount", width: 150 },
  { headerName: "납기일", field: "dueDateOfMps", width: 150 },
  { headerName: "예정마감일자", field: "scheduledEndDate", width: 150 },
  { headerName: "MRP 적용상태", field: "mrpApplyStatus", width: 150 },
  { headerName: "비고", field: "description", width: 150 },
];

const commColumnDefs = [
  { headerName: "주생산계획번호", field: "mpsNo", width: 150 },  
  { headerName: "BOM번호", field: "bomNo", width: 150},
  { headerName: "품목구분", field: "itemClassification", width: 150 },
  { headerName: "품목코드", field: "itemCode", width: 150 },
  { headerName: "품목명", field: "itemName", width: 150},
  { headerName: "발주/작업지시기한", field: "orderDate", width: 150 },
  { headerName: "발주/작업지시완료기한", field: "requiredDate", width: 150, editable: true },
  { headerName: "계획수량", field: "planAmount", width: 150 },
  { headerName: "누적손실율", field: "totalLossRate", width: 150 },
  { headerName: "계산수량", field: "caculatedAmount", width: 150 },
  { headerName: "필요수량", field: "requiredAmount", width: 150 },
  { headerName: "단위", field: "unitOfMrp", width: 150 }
]



const MrpResister = () => {
  const classes = useStyles();
  const single = "single";
  const [openEs, setOpenEs] =useState("");
  const [mpsGridApi, setMpsGridApi] = useState(""); //setDeliveryGridApi
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchDate,setSearchDate] = useState("");
  const [rowData, setRowData] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const [includeMrpApply, setIncludeMrpApply] = useState("includeMrpApply");
  const [open, setOpen] = useState(false);
  const [dateVisible,setDateVisible] = useState(false);

  const onCellClicked = (event) => {
    mpsNo[0]=event.data.mpsNo;
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleOpen = () => {
      setOpen(true);
  }
  
  
  const handleChange = e => {
      if(e.target.value==="searchByDate"){ setFormVisible(true); }
      else{ setFormVisible(false); } 
      setIncludeMrpApply(e.target.value);
      setRowData("");
  }
 
  function gridReady(params) {
    setMpsGridApi(params.api);
    setRowData(null);
    return mpsGridApi;
    
  }

  function onModaGridReady(params) {
    console.log(params.api);
    //return deliveryGridApi;
  }

  const startDateChange = e => {
    setStartDate(e.target.value);
  };

  const endDateChange = e => {
    setEndDate(e.target.value);
  };
  const searchDateChange = e => {
    setSearchDate(e.target.value);
    console.log("e.target.value",e.target.value);
  };

  const closeEsDialog = () => {
    setOpenEs(false);
  };
  
  //MPS조회 버튼이벤트
  const searchMPS= e => {

    let startd = startDate;
    let endd = endDate;
    
    if(formVisible==true){
      if (startd | endd === undefined) {
        alert("날짜를 입력해 주세요");
        return;
      }
    }else{

    }
    
    let url = "http://localhost:8282/logi/production/searchMpsInfo.do";

    const getData = async () =>
      await axios({
        method: "POST",
        url: url,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },  
        params: { startDate: startd, endDate: endd,  includeMrpApply : includeMrpApply},
      });

    getData()
      .then(response => {
        console.log(
          "axios동작해서 나온 response.data ---> ",
          response.data.gridRowJson,
        );
          console.log("response",response);
        setRowData(response.data.gridRowJson);

      })
      .catch(e => {
        console.log("MPS조회하다가 발생한 에러 >> ", e);
      });
    
  };
  //console.log("rowData",rowData);
//let sendDialogData;
const [sendDialogData , setSendDialogData] = useState("");
//console.log(sendDialogData);
  const [dialogData, setDialogData] = useState("");
  //선택한 MPS로 모의전개 버튼 누를때 발생하는이벤트 다이얼로그 띄울때 데이터를 받아서 값셋팅해준다
  const handleClickOpen = async (e) => {
            setOpenEs(true);
            console.log("mpsNo",mpsNo);
            try {
                await axios.get(
                    'http://localhost:8282/logi/logistics/production/openMrp.do',
                    { params: { mpsNoListStr : mpsNo[0] } },
                ).then( response => {
                  console.log("response",response);
                  //const jsonData = response.data.gridRowJson; // return array;
                  setDialogData(response.data.gridRowJson);
                  setSendDialogData(JSON.stringify(response.data.gridRowJson));
                  console.log("sendDialogData",sendDialogData);

                });
            } catch (e) {
                console.log(e);
            } 
  };
  //const [mpsNo,setMpsNo] = useState([]);
  var mpsNo=[];
  //그리드 줄선택시 발생하는 이벤트 값만 집어넣어주고 나중에 클릭이벤트시 값 사용함
  const rowSelected = e => {
      console.log("여기서 두번?");
      console.log(e.data.mpsNo);
      mpsNo[0]=e.data.mpsNo;
     // setMpsNo(JSON.stringify(e.data.mpsNo));
     console.log("mpsNo",mpsNo);
  };

  //선택한 MPS로 모의전개 => 다이얼로그에 현재일자,직접입력 누르면 나오는 이벤트
  const radioChange = e => {
    console.log("e",e.target.value);
    if(e.target.value=="now"){ 
      setDateVisible(false); 
      var today = new Date();
      var month = today.getMonth()+1;
      var day = today.getDate();
      var date;
      if(month<10) month="0"+month;
      if(day<10) day="0"+day;
      date = today.getFullYear() + '-' + month + '-' + day;
      setSearchDate(date);
    }
    else{    
      setDateVisible(true); 
    }
    console.log("dateVisible",dateVisible);
    console.log("date",date);
  }

  //다이얼로그 (선택한 MPS로 모의전개 => 다이얼로그에 현재 전개된 결과를 MRP에 등록 버튼이벤트)
  const resisterMrp = e => {
    console.log("searchDate",searchDate);
    console.log("sendDialogData",sendDialogData);
      try {
        console.log("이까지오나2");
        axios.post(
            'http://localhost:8282/logi/logistics/production/registerMrp.do',
            { mrpRegisterDate : searchDate, batchList : sendDialogData },
            { "Content-Type": "application/json" },
        ).then( response => {
          console.log("response",response);
          if(response.data.errorCode=="1") alert("등록성공");
        });
    } catch (e) {
        console.log(e);
    }   
  }

  //선택초기화 클릭이벤트
  const reloadGrid = e => {
      mpsGridApi.refreshView();
  }

  return (  
    <>
      <div className="contract_header">
        <div id="deliveryPage" className={classes.cal} >
            <div>
                MRP 적용된 주생산계획 &nbsp;
            
            <Select
              name="includeMrpApply"
              open={open}
              value={includeMrpApply}
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={handleChange}
            >

              <MenuItem value="includeMrpApply">포함</MenuItem>
              <MenuItem value="excludeMrpApply">미포함</MenuItem>
            </Select>
            </div>
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
        </div>
        <Button className={classes.btnSearch} onClick={searchMPS}>
          MPS 조회
        </Button>
        
        <fieldset className={classes.text}>
            <legend>
              <strong>  소요량 전개 ( MRP ) 시뮬레이션  </strong>
            </legend>
            <RadioGroup
            row
            aria-label="position"
          >
              <Button
                size= "large"
                color="grey"
                onClick={handleClickOpen}
                className={classes.btnSimulSearch}
              >선택한 MPS로 모의 전개</Button>  
              &nbsp;&nbsp;&nbsp;
              <Button
                size= "large"
                color="grey"
                className={classes.btnSimulSearch}
                onClick={reloadGrid}
              >선택 초기화</Button>  
              </RadioGroup>
              
        </fieldset>
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
            onRowClicked={rowSelected}
            rowData={rowData}
            onCellClicked={onCellClicked}
            target={this}
            getRowStyle={function () {
              return { "text-align": "center" };
            }}
          />
        </div>
        <br />
        <hr className={classes.hrStyle} />
        <br />
        <div>
          { 
          <Dialog open={openEs} onClose={closeEsDialog}
          maxWidth='650px'>
              <DialogTitle id="simple-dialog-title">소요량 전개 시뮬레이션</DialogTitle>
            <tr>
              <td>
        <RadioGroup
            row
            aria-label="position"
          >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <fieldset className={classes.dialog} >
              <legend>
                <strong>MPS 로 등록할 계획 구분</strong>
              </legend>
              <FormControlLabel
                value="now"
                control={<Radio />}
                label="현재일자"
                onChange={radioChange}
              />
              <FormControlLabel
                value="search"
                control={<Radio />}
                label="직접입력"
                onChange={radioChange}
              />
        </fieldset>
      </RadioGroup>
            </td>
            <td>
            <fieldset className={classes.dialog}>
          <legend>
            <strong>  소요량 전개 ( MRP ) 등록  </strong>
            </legend>
            <Button
                size= "large"
                color="grey"
                className={classes.btnDialogSearch}
                onClick={resisterMrp}
              >현재 전개된 결과를 MRP에 등록</Button>  
            </fieldset>
            </td>
            </tr>

            <form hidden={!dateVisible}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                id={"searchDate"}
                type="date"
                value={searchDate}
                onChange={searchDateChange}
              ></TextField>
            </form>
              <DialogContent>
                  <List>
                      { <div className={"ag-theme-balham"}
                          style={{ height: "500px", width: "700px", paddingTop: "8px" }}>
                          <AgGridReact
                              columnDefs={commColumnDefs}
                              rowData={dialogData}   // 뿌릴 data
                              rowSelection='single'  // 하나만 선택 가능.
                              onGridReady={onModaGridReady}
                              getRowStyle={function () {
                                return { "text-align": "center" };
                              }}
                          />
                            </div> }
                  </List>
              </DialogContent>
              <DialogActions>
                  <Button variant="outlined" color="secondary" onClick={closeEsDialog}
                  >확인</Button>
              </DialogActions>
            </Dialog>
                             }
        </div>
      </div>
    </>
  );
};

export default MrpResister;
/*####################################### MRP 수정끝 #######################################*/
