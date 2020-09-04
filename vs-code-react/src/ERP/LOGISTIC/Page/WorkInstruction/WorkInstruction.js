import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './WorkInstructionPanel';

import WorkInstructionsContainer from 'ERP/LOGISTIC/Page/WorkInstruction/Container/WorkInstructionsContainer';
import ProductionPerformanceContainer from 'ERP/LOGISTIC/Page/WorkInstruction/Container/ProductionPerformanceContainer';
import InstructionStatusContainer from 'ERP/LOGISTIC/Page/WorkInstruction/Container/InstructionStatusContainer';

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
                    <Tab label="작업 지시" />
                    <Tab label="작업 지시 현황" />
                    <Tab label="생산 실적 관리" />
                </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
            <WorkInstructionsContainer />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <InstructionStatusContainer />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <ProductionPerformanceContainer />
        </TabPanel>
    </div>
    
);


}