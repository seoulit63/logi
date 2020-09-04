package kr.co.seoulit.erp.acc.account.statement.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.acc.account.statement.dao.CashJournalDAO;
import kr.co.seoulit.erp.acc.account.statement.dao.DetailTrialBalanceDAO;
import kr.co.seoulit.erp.acc.account.statement.dao.FinancialPositionDAO;
import kr.co.seoulit.erp.acc.account.statement.dao.TotalTrialBalanceDAO;
import kr.co.seoulit.erp.acc.account.statement.to.CashJournalBean;
import kr.co.seoulit.erp.acc.account.statement.to.DetailTrialBalanceBean;
import kr.co.seoulit.erp.acc.account.statement.to.TotalTrialBalanceBean;
import kr.co.seoulit.erp.acc.account.statement.applicationService.StatementApplicationService;
import kr.co.seoulit.erp.acc.account.statement.applicationService.StatementApplicationServiceImpl;

import kr.co.seoulit.erp.acc.account.statement.dao.IncomeStatementDAO; 

@Component
public class StatementApplicationServiceImpl implements StatementApplicationService {

    @Autowired
	private TotalTrialBalanceDAO totalTrialBalanceDAO;
    @Autowired
    private FinancialPositionDAO financialPositionDAO;
    @Autowired
    private DetailTrialBalanceDAO detailTrialBalanceDAO;
    @Autowired
    private CashJournalDAO cashJournalDAO;
    @Autowired
    private IncomeStatementDAO IncomeStatementDAO;



    @Override
    public HashMap<String, Object> getTotalTrialBalance(String toDate) {
    	System.out.println("겟토탈  ㅣ:"+toDate);
    	HashMap<String, Object> param =new HashMap<>();
    	param.put("toDate", toDate);
    	List<TotalTrialBalanceBean> ttbb= totalTrialBalanceDAO.callTotalTrialBalance(param);
         System.out.println("eeee : "+ttbb);
         return param;
        
    }
    
    public HashMap<String, Object> addEarlyStatements(String toDate){

		return totalTrialBalanceDAO.addEarlyStatements(toDate);
        
    }

  

    @Override
    public HashMap<String, Object> getFinancialPosition(String toDate) {
    	 System.out.println("겟파이낸셜  :"+toDate);
	    	HashMap<String, Object> param =new HashMap<>();
	    	param.put("toDate", toDate);
	    	financialPositionDAO.callFinancialPosition(param);
            return param;
    }

 
	@Override
	public ArrayList<CashJournalBean> getCashJournal(String fromDate, String toDate) {	
	   
	     /************************ 2020.08.24 정대현 수정 **********************/
		HashMap<String, Object> param =new HashMap<>();
		param.put("fromDate", fromDate);
		param.put("toDate", toDate);
	    return cashJournalDAO.selectCashJournalList(param);
	    /************************ 2020.08.24 정대현 수정 **********************/

	}

	   public HashMap<String, Object> getIncomeStatement(String toDate) {
		   System.out.println("겟인컴  ㅣ:"+toDate);
	    	HashMap<String, Object> param =new HashMap<>();
	    	param.put("toDate", toDate);
	    	IncomeStatementDAO.callIncomeStatement(param);
	         return param;	   
		 
	    }

///////////////////////// 2020-08-24 김진호  수정///////////////////////////
@Override
public ArrayList<DetailTrialBalanceBean> getDetailTrialBalance(String fromDate, String toDate) {
System.out.println("일(월)계표 fromDate : "+fromDate);
System.out.println("일(월)계표 toDate : "+toDate);
HashMap<String, String> param =new HashMap<>();
param.put("fromDate", fromDate);
param.put("toDate", toDate);
return detailTrialBalanceDAO.selectDetailTrialBalance(param);

}
///////////////////////// 2020-08-24 김진호  끝///////////////////////////
	
}
