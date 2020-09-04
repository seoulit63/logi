package kr.co.seoulit.erp.acc.account.slip.applicationService;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.acc.account.slip.dao.JournalDetailDAO;
import kr.co.seoulit.erp.acc.account.slip.to.JournalDetailBean;
import kr.co.seoulit.erp.acc.account.slip.applicationService.JournalDetailApplicationService;
import kr.co.seoulit.erp.acc.account.slip.applicationService.JournalDetailApplicationServiceImpl;

@Component
public class JournalDetailApplicationServiceImpl implements JournalDetailApplicationService {
  
	@Autowired
    private JournalDetailDAO journalDetailDAO;
    

	@Override
    public ArrayList<JournalDetailBean> getJournalDetailList(String journalNo) {
		System.out.println("나오나1?"+journalNo);
        return journalDetailDAO.selectJournalDetailList(journalNo);
    }

    @Override
    public void addJournalDetailList(String journalNo) {
        
            journalDetailDAO.insertJournalDetailList(journalNo);
        
    }

    @Override
    public void editJournalDetail(JournalDetailBean journalDetailBean) {
        
            journalDetailDAO.updateJournalDetail(journalDetailBean);
       
    }


}
