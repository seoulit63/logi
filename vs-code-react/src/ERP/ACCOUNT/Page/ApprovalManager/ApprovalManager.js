/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react';

import useInputs from 'util/useInputs'

import { Paper } from '@material-ui/core';

import ApprovalManagerHeader from './ApprovalManagerHeader';
import SlipGrid from './SlipGrid';
import JournalGrid from './JournalGrid';


const ApprovalManager = () => {
    const [flag,setFlag] = useState(false);
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
        
        let now = new Date();
        let year = now.getFullYear();
        let month = leadingZeros(now.getMonth() + 1, 2);
        let date = leadingZeros(now.getDate(), 2);
        let today = year + '-' + month + '-' + date;
    
        // headInfo는 전표입력창의 날짜와 상태를 가진 state임.
        const [headInfo, headChange] = useInputs(
            {
                startDate: '',
                endDate: today,  // 위에서 만들어진 오늘 날짜를 그냥 붙이기 위해서 여기 지정값을 넣어줬음.
                slipStatus: '미결',
            }
        );
    
        const [slipNo, setSlipNo] = useState(''); 
        // slipNo 는 SlipGrid 컴포넌트에서 그리드 한 줄을 클릭하면
        // JournalGrid 컴포넌트에서 전표번호(slipNo)를 받아서 다시 조회 후 그리드에 표현.
    
    return (
        <>
            <h1>전 표 승 인</h1>
            <Paper>
                <div>
                    <ApprovalManagerHeader headInfo={headInfo} headChange={headChange}/>
                    <SlipGrid headInfo={headInfo} setSlipNo={setSlipNo} today={today} setFlag={setFlag} />
                </div>
                <div>
                    <JournalGrid slipNo = {slipNo} flag={flag} />
                </div>
            </Paper>
        </>
    );
};

export default ApprovalManager; 