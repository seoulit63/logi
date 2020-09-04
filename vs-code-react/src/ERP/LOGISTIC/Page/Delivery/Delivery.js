/*******************2020-08-25 수정*********************/    
import React, { useState } from "react";
import { Typography, Tabs, Tab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import DeliveryInfo from "./DeliveryInfo";
import DeliveryCondition from "./DeliveryCondition";
/*#####################################  2020-08-24 #######################################*/
/*###################################### 63기 김태윤 #######################################*/
/*##################################### 납품관리 수정#######################################*/
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

const Delivery = () => {
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
            <Tab label="납품" {...a11yProps(0)} />
            <Tab label="납품 현황" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <div>
        {value === 0 ? (
            <TabPanel value={value} index={0}>
              <DeliveryInfo/>
            </TabPanel>
          ) : (
            <TabPanel value={value} index={1}>
              <DeliveryCondition/>
            </TabPanel>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default Delivery;

/*##################################### 납품관리 수정끝#####################################*/