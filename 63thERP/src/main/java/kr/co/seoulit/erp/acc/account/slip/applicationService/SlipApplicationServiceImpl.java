package kr.co.seoulit.erp.acc.account.slip.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.acc.account.slip.dao.SlipDAO;
import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;
import kr.co.seoulit.erp.acc.account.slip.to.SlipBean;
import kr.co.seoulit.erp.acc.account.slip.applicationService.SlipApplicationService;
import kr.co.seoulit.erp.acc.account.slip.applicationService.SlipApplicationServiceImpl;
import kr.co.seoulit.erp.acc.account.slip.dao.JournalDAO;
import kr.co.seoulit.erp.acc.account.slip.dao.JournalDetailDAO;

@Component
public class SlipApplicationServiceImpl implements SlipApplicationService {
	
	@Autowired
    private SlipDAO slipDAO;
	@Autowired
    private JournalDAO journalDAO;
	@Autowired
    private JournalDetailDAO journalDetailDAO;  


	@Override
    public ArrayList<SlipBean> findSlipDataList(String slipDate) {

        return slipDAO.selectSlipDataList(slipDate);
    }
    

    @Override
    public String addSlip(Map<String,ArrayList<SlipBean>> batchArray) {
    	
    	
    	ArrayList<SlipBean> slipList = batchArray.get("slip");
    	ArrayList<JournalBean> journalList = null;
    	
    	
    	SlipBean slipBean = slipList.get(0);
    	
    	StringBuffer slipNo = new StringBuffer();
        String slipNoDate = slipBean.getReportingDate().replace("-", ""); // 20190717
        slipNo.append(slipNoDate);
        slipNo.append("SLIP"); // 20190717SLIP

        journalList = slipBean.getJournalList();
        
        String code = "0000" + (slipDAO.selectSlipCount(slipNoDate) + 1) + ""; // 00003
        
        slipNo.append(code.substring(code.length() - 5)); // 00003
        slipBean.setSlipNo(slipNo.toString()); // 20190717SLIP00003
        slipBean.setApprovalEmpCode("");
        slipBean.setApprovalDate("");
        slipDAO.insertSlip(slipBean);
    		
        for (JournalBean journalBean : journalList) {
            String SlipNo=slipBean.getSlipNo();
            String journalNo = journalDAO.selectJournalName(SlipNo);
            journalBean.setSlipNo(SlipNo);
            journalBean.setJournalNo(journalNo);
            journalDAO.insertJournal(journalBean);
            journalDetailDAO.insertJournalDetailList(journalNo);
        }      

        return slipNo.toString();
    }

    @Override
    public void deleteSlip(String slipNo) {
            slipDAO.deleteSlip(slipNo);
    }

    @Override
    public void updateSlip(SlipBean slipBean) {
            slipDAO.updateSlip(slipBean);
    }

    @Override
    public void approveSlip(ArrayList<SlipBean> slipBeans) {

            for (SlipBean slipBean : slipBeans) {
                //slipBean.setSlipStatus(slipBean.getSlipStatus().equals("true") ? "승인" : "반려");  반려가 들어가면 전표가 삭제 가능하게 하면됨 ( 귀찮아서 안했습니다 죄송합니다 ㅎㅎ... ) 
                slipDAO.approveSlip(slipBean);
            }
    }

    @Override
    public ArrayList<SlipBean> findRangedSlipList(HashMap<String,Object> map) {
    
        return slipDAO.selectRangedSlipList(map);
    }

    @Override
    public ArrayList<SlipBean> findDisApprovalSlipList() {
        return slipDAO.selectDisApprovalSlipList();
    }


}


