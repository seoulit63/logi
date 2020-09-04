import React, { useState } from "react";
import {
    Typography,   //다양한 스타일의 텍스트를 연출한다
    Tabs, //화면 전환을 위해 사용하는 컴포넌트이다 tabs컴포넌트안에 tab 컴포넌트가 위치하고 tab을 클릭화면 화면이 전환되어야 한다.
    Tab,
  } from "@material-ui/core"; 
  import AppBar from '@material-ui/core/AppBar';

import Box from '@material-ui/core/Box';

import Motivation from 'common/dashboard/components/motivation';
import Memories from 'common/dashboard/components/62thmemories';
import Yambong from 'common/dashboard/components/yambong';
import Astronomy from 'common/dashboard/components/Astronomy';

  
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );  
}
     
       
  const   Dashboard =()=>{
       

    var [value, setState] = useState(0);
    const handleChange = (event, newValue) => {
    setState(newValue);
    }
    const bar={
      backgroundColor :"black",
      color: "white",
      TextStyle : 'RobotoMono',
      fontFamily: "Noto Sans KR"


    };
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
  

    return(
    
      <React.Fragment>
      
      <div>
      <AppBar style={bar} position="static"> 
<Tabs value={value}  onChange={handleChange}>
  
  <Tab label="Motivation"   {...a11yProps(0)} />
  <Tab label="News"   {...a11yProps(1)} />
  <Tab label="NASA"   {...a11yProps(2)} />
  <Tab label="얌봉"   {...a11yProps(3)} />
 
</Tabs>

</AppBar>
<TabPanel value={value} index={0}>
    <Motivation></Motivation>
      </TabPanel>
<TabPanel value={value} index={1}><Memories></Memories></TabPanel>
 


 
      <TabPanel value={value} index={2}>
    <Astronomy></Astronomy>
      </TabPanel>     
   
      <TabPanel value={value} index={3}>
    <Yambong></Yambong>
      </TabPanel>  
      </div>
     
      </React.Fragment>
      
    );
  };


   
  export default   Dashboard;