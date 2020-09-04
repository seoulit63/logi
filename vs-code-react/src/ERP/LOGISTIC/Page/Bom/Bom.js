/*******************2020-08-25 수정*********************/    
import React, { useState } from "react";
import { Typography, Tabs, Tab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import DeployMenu from "./DeployMenu";

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

const Bom = () => {
  const useStyles = makeStyles(theme => ({
    bar: {
      backgroundColor: "gray",
    },
  }));
  const classes = useStyles();
  const [value, setState] = useState(0);
  const [deployCondition, setDeployCondition] = useState();
  const [itemCode, setItemCode] = useState();
  

  const handleChange = (event, newValue) => {
    setState(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  //console.log("divisionCode : "+divisionCode);
  //console.log("deployCondition : "+deployCondition);
  //console.log("itemCode : "+itemCode);

  return (
    <React.Fragment>
      <>
        <AppBar className={classes.bar} position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Bom정전개/역전개" {...a11yProps(0)} />
            <Tab label="Bom 등록/수정" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <div>
            <DeployMenu deployCondition={setDeployCondition} itemCode={setItemCode} />
        </div>
      </>
    </React.Fragment>
  );
};

export default Bom;
