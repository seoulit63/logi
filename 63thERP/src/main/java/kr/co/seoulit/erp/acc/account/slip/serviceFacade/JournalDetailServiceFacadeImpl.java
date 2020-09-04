package kr.co.seoulit.erp.acc.account.slip.serviceFacade;



import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.acc.account.slip.applicationService.JournalDetailApplicationService;
import kr.co.seoulit.erp.acc.account.slip.to.JournalDetailBean;
import kr.co.seoulit.erp.acc.account.slip.serviceFacade.JournalDetailServiceFacade;
import kr.co.seoulit.erp.acc.account.slip.serviceFacade.JournalDetailServiceFacadeImpl;

@Service
public class JournalDetailServiceFacadeImpl implements JournalDetailServiceFacade {
    
	@Autowired
	private JournalDetailApplicationService journalDetailApplicationService;


	@Override
    public void addJournalDetailList(String journalNo) {
      
       
            journalDetailApplicationService.addJournalDetailList(journalNo);
            
    }

    @Override
    public void editJournalDetail(JournalDetailBean journalDetailBean) {
       
            journalDetailApplicationService.editJournalDetail(journalDetailBean);
           
    }

    @Override
    public ArrayList<JournalDetailBean> getJournalDetailList(String journalNo) {     
    	System.out.println("나오나?"+journalNo);
        return journalDetailApplicationService.getJournalDetailList(journalNo);
    }

   
}
