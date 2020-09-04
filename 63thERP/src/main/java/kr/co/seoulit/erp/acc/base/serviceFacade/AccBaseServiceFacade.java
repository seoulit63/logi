package kr.co.seoulit.erp.acc.base.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;
import kr.co.seoulit.erp.acc.base.to.CodeBean;
import kr.co.seoulit.erp.acc.base.to.DetailCodeBean;
import kr.co.seoulit.erp.acc.base.to.SlipIreportBean;

public interface AccBaseServiceFacade {

    public ArrayList<DetailCodeBean> getDetailCodeList(HashMap<String, Object> param);

    public ArrayList<CodeBean> findCodeList();

    public ArrayList<SlipIreportBean> getSlipIreportData(String slipNo);
    
    public void batchCodeProcess(ArrayList<CodeBean> codeList, ArrayList<DetailCodeBean> codeList2);

    public String getPeriodNo(String today);
    
    public void insertPeriodNo(String sdate,String edate);

}
