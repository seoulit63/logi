package kr.co.seoulit.erp.acc.account.slip.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.acc.account.slip.applicationService.SlipApplicationService;
import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;
import kr.co.seoulit.erp.acc.account.slip.to.SlipBean;
import kr.co.seoulit.erp.acc.account.slip.serviceFacade.SlipServiceFacade;
import kr.co.seoulit.erp.acc.account.slip.serviceFacade.SlipServiceFacadeImpl;

@Service
public class SlipServiceFacadeImpl implements SlipServiceFacade {
    @Autowired
	private SlipApplicationService slipApplicationService;

	@Override
    public String addSlip(Map<String,ArrayList<SlipBean>> batchArray) {
        return slipApplicationService.addSlip(batchArray);
    }

    @Override
    public void deleteSlip(String slipNo) {
        
            slipApplicationService.deleteSlip(slipNo);
       
    }

    @Override
    public void updateSlip(SlipBean slipBean) { 
            slipApplicationService.updateSlip(slipBean);
          
    }

    @Override
    public void approveSlip(ArrayList<SlipBean> slipBeans) {      
            slipApplicationService.approveSlip(slipBeans);         
    }

    @Override
    public ArrayList<SlipBean> findSlipDataList(String slipDate) {
        return slipApplicationService.findSlipDataList(slipDate);
    }

    @Override
    public ArrayList<SlipBean> findRangedSlipList(HashMap<String,Object> map) {    	
        return slipApplicationService.findRangedSlipList(map);
    }

    @Override
    public ArrayList<SlipBean> findDisApprovalSlipList() {
        return slipApplicationService.findDisApprovalSlipList();
    }
}
