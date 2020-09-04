package kr.co.seoulit.erp.acc.account.slip.serviceFacade;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.acc.account.slip.applicationService.JournalApplicationService;
import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;
import kr.co.seoulit.erp.acc.account.slip.serviceFacade.JournalServiceFacade;
import kr.co.seoulit.erp.acc.account.slip.serviceFacade.JournalServiceFacadeImpl;

@Service
public class JournalServiceFacadeImpl implements JournalServiceFacade {
    
    @Autowired
	private JournalApplicationService journalApplicationService;

    @Override
    public ArrayList<JournalBean> findRangedJournalList(String fromDate, String toDate) {
    
           
        return journalApplicationService.findRangedJournalList(fromDate, toDate);
    }

    @Override
    public ArrayList<JournalBean> findSingleJournalList(String slipNo) {         
        return journalApplicationService.findSingleJournalList(slipNo);
    }

    @Override
    public void editJournal(String slipNo, ArrayList<JournalBean> journalBeanList) {
       
            journalApplicationService.editJournal(slipNo, journalBeanList);
          
    }

   
}
