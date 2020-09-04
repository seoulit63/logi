package kr.co.seoulit.erp.acc.account.slip.applicationService;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.acc.account.slip.dao.JournalDAO;
import kr.co.seoulit.erp.acc.account.slip.dao.JournalDetailDAO;
import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;
import kr.co.seoulit.erp.acc.account.slip.applicationService.JournalApplicationService;
import kr.co.seoulit.erp.acc.account.slip.applicationService.JournalApplicationServiceImpl;

@Component
public class JournalApplicationServiceImpl implements JournalApplicationService {
 
	@Autowired
    private JournalDAO journalDAO;
	@Autowired
    private JournalDetailDAO journalDetailDAO;

    @Override
    public ArrayList<JournalBean> findRangedJournalList(String fromDate, String toDate) {
        HashMap<String, String> map=new HashMap<>();
        map.put("fromDate", fromDate);
        map.put("toDate", toDate);
       return journalDAO.selectRangedJournalList(map);
    }

    @Override
    public void editJournal(String slipNo, ArrayList<JournalBean> journalBeanList) {
       
            for (JournalBean journalBean : journalBeanList) {
                if (journalBean.getStatus().equals("insert")) {
                	String journalNo=journalDAO.selectJournalName(slipNo);
                	journalBean.setSlipNo(slipNo);
                	journalBean.setSlipNo(journalNo);
                    journalDAO.insertJournal(journalBean);
                    
                }
                else if (journalBean.getStatus().equals("update")) {
                    boolean isChangeAccountCode = journalDAO.updateJournal(journalBean);

                    if (isChangeAccountCode) {
                        journalDetailDAO.deleteJournalDetailByJournalNo(journalBean.getJournalNo());
                        journalDetailDAO.insertJournalDetailList(journalBean.getJournalNo());
                    }
                }
            }       
    }

    @Override
    public ArrayList<JournalBean> findSingleJournalList(String slipNo) {

    	return journalDAO.selectJournalList(slipNo);
    }
}
