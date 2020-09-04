import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './StockManagementPanel';
import StockContainer from 'ERP/LOGISTIC/Page/purchase/StockManagement/Container/StockContainer';
import StockLogContainer from 'ERP/LOGISTIC/Page/purchase/StockManagement/Container/StockLogContainer';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    }
  }));

  

export default () => {
    
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (e, newVal) => {
        e.preventDefault();
        setValue(newVal);
    }


return (

    <div>
        <Paper className={classes.root}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="secondary"
                    centered
                    onChange={handleChange}
                >
                    <Tab label="재고" />
                    <Tab label="재고 로그" />
                </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <StockContainer/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StockLogContainer/>
        </TabPanel>
    </div>
    
);


}