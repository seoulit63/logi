import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Checkbox } from "@material-ui/core";
import accountApi from "../../../../Api/accountApi";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as types from "ERP/ACCOUNT/ActionType/ActionType";
import JournalDetailDialog from "./JournalDetailDialog";

const JournalFormGrid = ({ date }) => {
  const { startDate, endDate } = date;

  const data = useSelector(({ AccReducer }) => AccReducer.journalFormList, [
    startDate,
    endDate,
  ]);

  const [journalDetailDialogOpen, setJournalDetailDialogOpen] = useState(false);
  const [journalNo, setjournalNo] = useState('');

  const dispatch = useDispatch();

  const selectData = () => {
    dispatch({
      type: types.SEARCH_JOURNAL_FROM_REQUEST,

      params: {
        startDate: moment(startDate).format("yyyy-MM-DD"),
        endDate: moment(endDate).format("yyyy-MM-DD"),
      },
    });
  };

  const cellRenderer = () => {
    return '<button onclick="">상세보기</button>';
  };

  const handleClose = () => {
    setJournalDetailDialogOpen(false);
  }

  const onCellClicked = id => {
    if (id.colDef.field === 'showJournalDetail') {
      setJournalDetailDialogOpen(true);
      setjournalNo(id.data.journalNo)
    }
  };

  const JournalFoamColumnDefs = [
    { headerName: "전표번호", field: "slipNo", width: 150 },
    { headerName: "분개번호", field: "journalNo", width: 200 },
    { headerName: "구분", field: "balanceDivision", width: 150 },
    { headerName: "개정과목", field: "accountName", width: 150 },
    { headerName: "차변", field: "leftDebtorPrice", width: 150 },
    { headerName: "대변", field: "rightCreditsPrice", width: 150 },
    {
      headerName: "분개상세",
      field: "journalDetail",
      width: 150,
      hide: "true",
    },
    { headerName: "거래처명", field: "customerName", width: 150 },
    { headerName: "분개상세", field: "showJournalDetail",width:100, cellRenderer: cellRenderer},
  ];

  return (
    <React.Fragment>
      <br />
      <div align="right">
        <Button variant={"outlined"} color={"primary"} onClick={selectData}>
          조회
        </Button>
      </div>
      <br />
      <div
        className={"ag-theme-balham"}
        style={{
          height: "60%",
          wieth: "100%",
          paddingTop: "20px",
        }}
      >
        <AgGridReact
          columnDefs={JournalFoamColumnDefs}
          rowData={data}
          rowSelection="single"
          onCellClicked={onCellClicked}
          onGidReady={event => {
            event.api.sizeColumnsToFit();
          }}
        />
      </div>
      <JournalDetailDialog journalNo={journalNo} open={journalDetailDialogOpen} onClose={handleClose} />
    </React.Fragment>
  );
};

export default JournalFormGrid;
