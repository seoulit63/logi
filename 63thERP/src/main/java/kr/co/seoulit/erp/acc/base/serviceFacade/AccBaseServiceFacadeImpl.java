package kr.co.seoulit.erp.acc.base.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.acc.base.applicationService.AccBaseApplicationService;
import kr.co.seoulit.erp.acc.base.applicationService.AccCodeListApplicationService;
import kr.co.seoulit.erp.acc.base.to.CodeBean;
import kr.co.seoulit.erp.acc.base.to.DetailCodeBean;
import kr.co.seoulit.erp.acc.base.to.SlipIreportBean;
import kr.co.seoulit.erp.acc.base.serviceFacade.AccBaseServiceFacade;
import kr.co.seoulit.erp.acc.base.serviceFacade.AccBaseServiceFacadeImpl;


@Service
public class AccBaseServiceFacadeImpl implements AccBaseServiceFacade {
	@Autowired
    private AccBaseApplicationService baseApplicationService;
	@Autowired
    private AccCodeListApplicationService codeListApplicationService;

    
    
    public String getPeriodNo(String today) {
        return baseApplicationService.getPeriodNo(today);
    }

    
    public void insertPeriodNo(String sdate,String edate) {
       
    	baseApplicationService.insertPeriodNo(sdate,edate);
         
    }

    @Override
    public ArrayList<DetailCodeBean> getDetailCodeList(HashMap<String, Object> param) {
        return codeListApplicationService.getDetailCodeList(param);
    }

    @Override
    public ArrayList<CodeBean> findCodeList() {
        return codeListApplicationService.findCodeList();
    }
    @Override
    public void batchCodeProcess(ArrayList<CodeBean> codeList, ArrayList<DetailCodeBean> codeList2) {

            codeListApplicationService.batchCodeProcess(codeList, codeList2);

    }

	@Override
	public ArrayList<SlipIreportBean> getSlipIreportData(String slipNo) {
		// TODO Auto-generated method stub
		return null;
	}
    
}
