package kr.co.seoulit.erp.acc.account.base.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.acc.account.base.applicationService.AccountApplicationService;
import kr.co.seoulit.erp.acc.account.base.to.AccountBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountCodeBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountControlBean;
import kr.co.seoulit.erp.acc.account.base.to.CustomerBean;
import kr.co.seoulit.erp.acc.account.base.applicationService.AccountApplicationServiceImpl;
import kr.co.seoulit.erp.acc.account.base.serviceFacade.AccountServiceFacade;
import kr.co.seoulit.erp.acc.account.base.serviceFacade.AccountServiceFacadeImpl;

@Service
public class AccountServiceFacadeImpl implements AccountServiceFacade{
 
   @Autowired
    private AccountApplicationService accountApplicationService;


	@Override
    public AccountBean getAccount(String accountCode) {
   
        return accountApplicationService.getAccount(accountCode);
    }

    @Override
    public ArrayList<AccountBean> findParentAccountList() {
           
        return accountApplicationService.findParentAccountList();
    }

    @Override
    public ArrayList<AccountBean> findDetailAccountList(String code) {
       
        return accountApplicationService.findDetailAccountList(code);
    }

    @Override
    public void updateAccount(AccountBean accountBean) {
      
            accountApplicationService.updateAccount(accountBean);         
    }

    public String findPeriodNo(String toDay) {
    	return accountApplicationService.selectPeriodNo(toDay);
    }
    
    @Override
    public ArrayList<AccountBean> getAccountListByName(String accountName) {
         
        return accountApplicationService.getAccountListByName(accountName);
    }

    @Override
    public ArrayList<AccountControlBean> getAccountControlList(String accountCode) {

        return accountApplicationService.getAccountControlList(accountCode);
            
    }

	@Override
	public List<AccountCodeBean> getAccountList() {
		return accountApplicationService.getAccountList();
	}
    //=====================================  2020-08-25 계정별 원장 조편백   시작 ====================================
	@Override
	public HashMap<String, Object> getLedgerbyAccountInfo(String accountCode, String startDate, String endDate) {
		
		return accountApplicationService.getLedgerbyAccountInfo(accountCode, startDate,endDate);
	}
	//=====================================  2020-08-25 계정별 원장 조편백   끝 =======================================
	
    //=====================================  2020-09-01 거래처관리   조편백   시작 ======================================
	@Override
	public List<CustomerBean> getCustomerList(){
		return accountApplicationService.getCustomerList();
	}
	@Override
	public void deleteNormalCustormer(String customerCode ) {
		 accountApplicationService.deleteNormalCustormer(customerCode);	 
	}
	@Override
	public void batchCustormerProcess(HashMap<String, ArrayList<CustomerBean>> customerList) {
		accountApplicationService.batchCustormerProcess(customerList);	
	}
	//=====================================  2020-09-01 거래처관리  조편백   끝 ========================================
}