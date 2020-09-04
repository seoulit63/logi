/*******************2020-08-25 수정*********************/    
import React, { useState } from "react";
import { Typography, Tabs, Tab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import MrpResister from "./MrpResister";
import MrpSearch from "./MrpSearch";
/*#####################################  2020-09-01 #######################################*/
/*###################################### 63기 김태윤 #######################################*/
/*##################################### MRP 수정#######################################*/
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

const MrpResisterAndGather = () => {
  const useStyles = makeStyles(theme => ({
    bar: {
      backgroundColor: "gray",
    },
  }));
  const classes = useStyles();
  const [value, setState] = useState(0);



  const handleChange = (event, newValue) => {
    setState(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <React.Fragment>
      <>
        <AppBar className={classes.bar} position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="주생산계획으로 소요량전개 시뮬레이션 / MRP로 등록" {...a11yProps(0)} />
            <Tab label="취합 대기중인 소요량전개 검색 / 취합" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <div>
        {value === 0 ? (
            <TabPanel value={value} index={0}>
              <MrpResister/>
            </TabPanel>
          ) : (
            <TabPanel value={value} index={1}>
              <MrpSearch/>
            </TabPanel>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default MrpResisterAndGather;

/*##################################### MRP 수정끝#####################################*/