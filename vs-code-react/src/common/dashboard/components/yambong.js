import React from 'react';
import 'ag-grid-community/dist/styles/ag-theme-fresh.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import Typography from '@material-ui/core/Typography';
import {  
    Button,
    Dialog,
  } from "@material-ui/core"; 

import 'ag-grid-community/dist/styles/ag-grid.css';


import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar';
import YouTube from 'react-youtube';

const buttonsize={
  position: "relative",
  bottom: -80,
  width: 200,
  height: 100,
  padding: 20
}
const phonenumber=[
  "MDEwMjcyNjExNDQ=","MDEwOTQ1NTQ4MzU=","MDEwNjYyMjE1NDA=","MDEwNjQ4NzMwNTc=","MDEwMzc2MzA3NTc=","MDEwODAwMzgwMDM=","MDEwODUxNDQxNTA=","MDEwNTg4Mzg3NDQ=","MDEwNDkwMDcwOTE=","MDEwMzMwOTUxMDI=","MDEwNzUxNzc3ODg=","MDEwNTIyNjc4NTI=","MDEwNDEwNTMwMDc=","MDEwNDYyMDU1NjM=","MDEwOTI1MDUwMzA=","MDEwNjQ0NDcwMDE=","MDEwNjc2Njc1NTM=","MDEwMjI5MDg2NDQ=","MDEwNTAxMjEwMTU=","MDEwODU1NzI5ODM=","MDEwNDgwMjg0MDE=","MDEwNDUxMzk3NDM=","MDEwNTAzMzk3NDM="
];
  
const opts = {
    height: '550',
    width: '1000',
    playerVars: {
     
      autoplay: true,
    },
  };
  
  const appbar= {
    alignItems: 'center',
  }
class yambong extends React.Component {
  
  constructor(props) {
    super(props);
    //state 

 this.state = {
 }

  }


 componentDidUpdate(prevProps, prevState) {
  
  
   
 }

addrow=()=>{

// for(var i=0;i<length;i++){
  const encodedString = new Buffer("오이").toString('base64');
  alert(encodedString);
  //phonenumberlist.push(encodedString);
 //const encodedString = new Buffer("MDEwMjcyNjExNDQ=", 'base64').toString('ascii');
  //alert("첫번째값"+encodedString)
  
// }
}



 addRow1=()=>{
  var quiz1=prompt("62기가 지내는 방은 몇호인가요?(숫자만 입력하시오)");
  
  if(new Buffer(quiz1).toString('base64')==="NzAz"){

alert("세 문제 더 남았습니다")
var quiz2=prompt("62기 기장님의 고향은?");  

if(new Buffer(quiz2).toString('base64')==="7ZWY64+Z"){

  alert("두 문제 더 남았습니다")
var quiz3=prompt("김지원 원생님의 별명은?");
if(new Buffer(quiz3).toString('base64')==="7Jik7J20"){
  alert("한 문제 더 남았습니다")
  var quiz4=prompt("자신의 휴대폰 번호를 입력하시오('-'제외)");
  
  if(phonenumber.indexOf(new Buffer(quiz4).toString('base64'))>=0){
    this.setState({
        openstatus : true
        })
      }else{  
        alert("접근권한이 없습니다");
      }
      }else{  
        alert("접근권한이 없습니다");
      }
  }else{
    alert("접근권한이 없습니다");
         }
  }else{

    alert("접근권한이 없습니다");
  }
}
   

   
  
 

render() {

     
    return (
      <React.Fragment>
      
      <div >
  
      <Dialog fullScreen open={this.state.openstatus}  TransitionComponent={this.Transition}>
        <AppBar   className={appbar} >
          <Toolbar >
            
         &nbsp; &nbsp; &nbsp;
            <Typography variant="h4"      align="right" >
              1년 동안 수고 많으셨습니다
            </Typography>
           
          </Toolbar>
        </AppBar>
        <br/><br/> <br/>
      <List>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <YouTube videoId="cqAkMnBICac"  opts={opts}  onReady={this._onReady}    />;
        </div>
        </List>
      </Dialog>
    
     <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <Button size="large" style={buttonsize}    variant={"outlined"} color={"secondary"} disabled={this.state.xxx} onClick={this.addRow1} >(보안)62기 인증하기</Button>
    </div>
    
     </div> 
 
  
     </React.Fragment>            
    );
  };
}
export default yambong;
       