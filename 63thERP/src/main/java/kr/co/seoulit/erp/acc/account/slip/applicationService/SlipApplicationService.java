package kr.co.seoulit.erp.acc.account.slip.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import kr.co.seoulit.erp.acc.account.slip.to.SlipBean;

public interface SlipApplicationService {

    public ArrayList<SlipBean> findSlipDataList(String slipDate);

    public ArrayList<SlipBean> findRangedSlipList(HashMap<String,Object> map);

    public ArrayList<SlipBean> findDisApprovalSlipList();

    public String addSlip(Map<String,ArrayList<SlipBean>> batchArray);

    public void deleteSlip(String slipNo);

    public void updateSlip(SlipBean slipBean);

    public void approveSlip(ArrayList<SlipBean> slipBeans);
}
