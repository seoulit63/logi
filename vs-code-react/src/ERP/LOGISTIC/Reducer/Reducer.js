//**************************************** 2020.09.04 양지훈 수정 시작 ****************************************
import { combineReducers } from "redux";
import estimate from './estimate';
import contract from './contract';
import stock from './stock';
import warehouse from './warehouse';
import workOrder from './workOrder';
import delivery from './delivery';

const LOGIReducer = combineReducers({estimate, contract, stock, warehouse, workOrder, delivery});
export default LOGIReducer;

//**************************************** 2020.09.04 양지훈 수정 종료 ****************************************