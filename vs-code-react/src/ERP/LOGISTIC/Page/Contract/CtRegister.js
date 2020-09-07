//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import React from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { Button } from "@material-ui/core";

const CtRegister = ({
    basicDataList, DetailDataList,
    searchBtn, onCellClicked, 
    regContracteBtn, cancelContracteBtn
}) => {
    // ag-grid column headers
    const state = {
        ctColumns: [ 
            { headerName: "", field: "chk", width: 40, },
            { headerName: "견적일련번호", field: "estimateNo", width: 150, },
            { headerName: "수주유형분류", field: "contractType", width: 100, },
            { headerName: "거래처코드", field: "customerCode", width: 100, },
            { headerName: "견적일자", field: "estimateDate", width: 150, },
            { headerName: "수주요청자", field: "contractRequester", width: 100, editable: true, },
            { headerName: "유효일자", field: "effectiveDate", width: 150, },
            { headerName: "견적담당자코드", field: "personCodeInCharge", width: 130, },
            { headerName: "비고", field: "description", width: 150, editable: true, },
        ],
        ctDetailColumns: [ 
            { headerName: "견적상세일련번호", field: "estimateDetailNo", width: 150, },
            { headerName: "품목코드", field: "itemCode", width: 100, },
            { headerName: "품목명", field: "itemName", width: 150, },
            { headerName: "단위", field: "unitOfEstimate", width: 70, },
            { headerName: "납기일", field: "dueDateOfEstimate", width: 150, },
            { headerName: "견적수량", field: "estimateAmount", width: 100, },
            { headerName: "견적단가", field: "unitPriceOfEstimate", width: 150, },
            { headerName: "합계액", field: "sumPriceOfEstimate", width: 150, },
            { headerName: "비고", field: "description", width: 150, },
        ],
    };

    return(
        <>  
            <div style={{ marginBottom: '10px', width:'370px', display:"inline-block", }}>
                &nbsp;&nbsp;<Button
                                variant="contained"
                                color="secondary"
                                onClick={searchBtn}
                                >수주가능견적조회</Button>
                &nbsp;&nbsp;<Button
                                variant="contained"
                                color="secondary"
                                onClick={regContracteBtn}
                            >수주등록</Button>
                &nbsp;&nbsp;<Button
                                variant="contained"
                                color="secondary"
                                onClick={cancelContracteBtn}
                                >견적취소</Button>
            </div>
            <div className="ag-theme-balham" style={{ height: "200px", width: "100%", paddingTop: "8px" }}>
                <AgGridReact
                    columnDefs={state.ctColumns}
                    rowData={basicDataList}
                    onCellClicked={onCellClicked}
                />
            </div>
            <div className="ag-theme-balham" style={{ height: "250px", width: "100%", paddingTop: "8px" }}>
                <AgGridReact
                    columnDefs={state.ctDetailColumns}
                    rowData={DetailDataList}
                    // onGridReady={}
                    // onSelectionChanged={}
                />
            </div>
        </>
    );
};

export default CtRegister;
//**************************************** 2020.09.04 양지훈 수정 종료 ****************************************

//     { name: "check", width: "50", resizable: true, align: "center" ,
//         //celvalue=현재 formatter가 걸려있는 컬럼의 값, rowObj = 해당 행의 데이터, 
//         //option = {rowId , colModel} 요소 1) rowId : row의 id, 2) colModel : jqGrid의 colModel 배열의 형식				  
//         formatter : function (celvalue, options, rowObj) {
//              var chk = "<input type='radio' name='chk' value=" + JSON.stringify(options.rowId) +" />";     
//              return chk; 
//         }
//     },
//     { name: "effectiveDate", width: "90", resizable: true, align: "center",
//           formatter: 'date', 
//           formatoptions: { srcformat: 'ISO8601Long', newformat: 'Y-m-d', defaultValue:null }
//     } ,
// 			{ name: "dueDateOfEstimate", width: "70", resizable: true, align: "center", editable: true,
//				  formatter: 'date',   => 주석 처리 : 여기 지정되면 사용자가 값을 미입력시 걸러주지 못함
//				  formatoptions: { srcformat: 'ISO8601Long', newformat: 'Y-m-d' },  
// 				  edittype: 'text', 
// 		          editoptions: { size: 12, maxlengh: 12, 
// 						dataInit: function (element) {						
// 							var checkedRowId = $('input[type=radio][name=chk]:checked').val();
// 							var checked_contractCandidateGrid_RowValue = $('#contractCandidateGrid').jqGrid('getRowData', checkedRowId);						
// 							$(element).datepicker({ 
// 								minDate : checked_contractCandidateGrid_RowValue.estimateDate ,
// 								maxDate : checked_contractCandidateGrid_RowValue.effectiveDate ,
// 								changeMonth: true, 
// 								numberOfMonths: 1, 
// 								onClose: function(dateText, datepicker) {
// 									$(this).editCell(checkedRowId,"dueDateOfEstimate",false); 
// 								}
// 		                  })}
// 		          }, 
// 		          editrules: { date: true } 
// 			} ,
// 			{ name: "sumPriceOfEstimate", width: "80", resizable: true, align: "center", 
// 			        formatter:'integer',formatoptions: { defaultValue: '0', thousandsSeparator: ',' }
// 	        } , 	
