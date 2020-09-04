import React,{useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import * as types from 'ERP/ACCOUNT/ActionType/ActionType';

import useInputs from 'util/useInputs'

import {Paper,
} from "@material-ui/core";

import SlipHead from 'ERP/ACCOUNT/Page/Slip/SlipHead'
import AddSlip from 'ERP/ACCOUNT/Page/Slip/AddSlip'
import AddJournal from 'ERP/ACCOUNT/Page/Slip/AddJournal'
import { useEffect } from 'react';

const Slip = () => {
    
    const cmptSlipNo = useSelector(({AccReducer}) => AccReducer.slipNo , []);

    //dispatch Hook 함수이다
    const dispatch = useDispatch();

    // leadingZeros는 자릿수를 맞추기 위한 펑션임.
    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();
    
        if (n.length < digits) {
            for (var i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }
    
    // 오늘 날짜를 불러오는 javascript 객체임. 결국 만들어진 today는 
    // SlipGrid, JournalGrid 의 props로 넘겨져서 사용된다.
    let now = new Date();
    let year = now.getFullYear();
    let month = leadingZeros(now.getMonth() + 1, 2);
    let date = leadingZeros(now.getDate(), 2);
    let today = year + '-' + month + '-' + date;

    // headInfo는 전표입력창의 날짜와 상태를 가진 state임.
    const [headInfo, headChange] = useInputs(
        {
            startDate: today,
            endDate: today,  // 위에서 만들어진 오늘 날짜를 그냥 붙이기 위해서 여기 지정값을 넣어줬음.
            slipStatus: '미결'
        }
    );

    const [slipNo, setSlipNo] = useState(''); 
    // slipNo 는 SlipGrid 컴포넌트에서 그리드 한 줄을 클릭하면
    // JournalGrid 컴포넌트에서 전표번호(slipNo)를 받아서 다시 조회 후 그리드에 표현.
    const [slipFlag, setSlipFlag] = useState(true);

    const [journalflag, setJournalFlag] = useState(true);
    // flag 는 SlipGrid 컴포넌트에서 '전표저장' 버튼을 클릭했을 때 
    // 분개추가, 분개삭제, 분개저장 버튼이 동시에 활성화 됨. 그때 사용되는 state임

    const [batchArray , setBatchArray] = useState([]); // 분개에서 대차변이 일치할경우 배열에 갑이 있게 설정함
                                                       // 그리고 일괄저장으로 

    useEffect(
        () => {
            if(batchArray.slip === undefined ) return;
            else if (batchArray.slip[0].journalList.length === 0) return ;
            dispatch( { type : types.ADD_SLIP_REQUEST, params : { batchArray:batchArray } } );
                // try {
                //     async function addSlip () {
                //     const response = await Axios.post('http://localhost:8282/acc/account/addSlip',batchArray);
                //     
                //     }
                // addSlip();
            setBatchArray([])
        },[batchArray]
    );
    useEffect(
            () => {
                if(cmptSlipNo === '') return;
                alert(`일련번호 : ${cmptSlipNo} 가 일괄저장되었습니다. `)
            },[cmptSlipNo]
    )
    
    
    return (
        <>
        <h1>전 표 관 리</h1>
            <Paper>
                <SlipHead headInfo={headInfo} headChange={headChange} />
                <AddSlip headInfo={headInfo} 
                         today={today} 
                         setSlipNo={setSlipNo} 
                         flag={slipFlag} 
                         setFlag={setJournalFlag} 
                         setBatchArray={setBatchArray}
                />
                <AddJournal slipNo={slipNo} 
                            flag={journalflag}
                            setFlag={setSlipFlag}
                            batchArray={batchArray}
                            setBatchArray={setBatchArray}
                />
            </Paper>
        </>
    );
};




export default Slip;