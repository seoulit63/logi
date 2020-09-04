package kr.co.seoulit.erp.acc.base.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.acc.base.to.CodeBean;
import kr.co.seoulit.erp.acc.base.to.DetailCodeBean;

public interface AccCodeListApplicationService {

    public ArrayList<DetailCodeBean> getDetailCodeList(HashMap<String, Object> param);

    public ArrayList<CodeBean> findCodeList();

    public void batchCodeProcess(ArrayList<CodeBean> codeList, ArrayList<DetailCodeBean> codeList2);


}
