//**************************************** 2020.09.01 양지훈 수정 시작 ****************************************
import { all, fork } from 'redux-saga/effects';
import contractSaga from './contract';
import estimateSaga from './estimate';
import stockSaga from './stock';
import warehouseSaga from './warehouse';
import workOrderSaga from './workOrder';
import deliverySaga from './delivery';

export default function* LogiSaga() {
  yield all([
    fork(estimateSaga),
    fork(contractSaga),
    fork(stockSaga),
    fork(warehouseSaga),
    fork(workOrderSaga),
    fork(deliverySaga),  
  ]);
}

// //다이얼로그 공통단
// function* DialogSaga(action) {
//     try {
//         const { data } = yield axios.get(
//             "http://localhost:8282/logi/base/codeList.do",
//             {
//                 params: {
//                     divisionCode: action.payload.divisionCode,
//                 },
//             },
//         );
//         yield put(dialogDataSuccess(data));
//     } catch (error) {
//         console.log(error)
//         yield put(dialogDataFailure(error));
//     }
// }
//**************************************** 2020.09.01 양지훈 수정 종료 ****************************************