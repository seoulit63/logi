package kr.co.seoulit.erp.acc.account.base.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.erp.acc.account.base.to.AccountBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountCodeBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountControlBean;
import kr.co.seoulit.erp.acc.account.base.to.CustomerBean;

public interface AccountApplicationService {

    public AccountBean getAccount(String code);

    public ArrayList<AccountBean> findParentAccountList();

    public ArrayList<AccountBean> findDetailAccountList(String code);

    public void updateAccount(AccountBean accountBean);

    ArrayList<AccountBean> getAccountListByName(String accountName);

    ArrayList<AccountControlBean> getAccountControlList(String accountCode);
    
    public String selectPeriodNo(String toDay);

	public List<AccountCodeBean> getAccountList();
	
    //=====================================  2020-08-25 계정별 원장 조편백   시작 ====================================
    public HashMap<String,Object> getLedgerbyAccountInfo(String accountCode, String startDate, String endDate);
    //=====================================  2020-08-25 계정별 원장 조편백   끝  ====================================
    
    //=====================================  2020-09-01 거래처관리  조편백   시작 ====================================
    public List<CustomerBean> getCustomerList();
    
    public void deleteNormalCustormer(String customerCode );
    
	public void batchCustormerProcess(HashMap<String, ArrayList<CustomerBean>> customerList);
	//=====================================  2020-09-01 거래처관리  조편백   끝 =======================================
}
