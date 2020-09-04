import React, { useState } from "react";
import { connect } from "react-redux";
import { insertDayAttdStart, selectDayAttdStart, deleteDayAttdStart } from "ERP/HR/Action/Action";
import DayAttdGrid from "./DayAttdGrid";
import moment from "moment";
import { Button } from "@material-ui/core";

//===========================재영 20-08-27======================//
const Container = ({ insertDayAttdStart, selectDayAttdStart, attdData, time, deleteDayAttdStart }) => {

  const handleInsertDayAttd = (empCode, applyDay, attdType, attdTypeName, time) => {
    console.log("컨테이너데이터ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+empCode, applyDay, attdType, attdTypeName, time)
    insertDayAttdStart({
      empCode: empCode,
      applyDay: applyDay,
      attdType: attdType,
      attdTypeName: attdTypeName,
      time: time,      
    })
  }
  const handleDayAttd = (applyDay, empCode) => {
    selectDayAttdStart({
      empCode: empCode,
      applyDay: applyDay,
    });
  };

  return (
    <div>     
      <DayAttdGrid
        handleDayAttd={handleDayAttd}
        handleInsertDayAttd={handleInsertDayAttd}
        attdData={attdData}
        deleteDayAttdStart={deleteDayAttdStart}
      ></DayAttdGrid>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    attdData: state.HrReducer.attdData,
  };
};
export default connect(mapStateToProps, {
  insertDayAttdStart,
  selectDayAttdStart,
  deleteDayAttdStart,
})(Container);
