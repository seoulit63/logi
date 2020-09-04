package kr.co.seoulit.erp.acc.account.statement.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.acc.account.statement.applicationService.StatementApplicationService;
import kr.co.seoulit.erp.acc.account.statement.to.CashJournalBean;
import kr.co.seoulit.erp.acc.account.statement.to.DetailTrialBalanceBean;
import kr.co.seoulit.erp.acc.account.statement.to.TotalTrialBalanceBean;

@Service
public class StatementServiceFacadeImpl implements StatementServiceFacade {
    
	@Autowired
    private StatementApplicationService statementApplicationService;
    
    @Override
    public HashMap<String, Object> getTotalTrialBalance(String toDate) {
        return statementApplicationService.getTotalTrialBalance(toDate);
    }


    @Override
    public HashMap<String, Object> getIncomeStatement(String toDate) {
        return statementApplicationService.getIncomeStatement(toDate);
    }

    @Override
    public HashMap<String, Object> getFinancialPosition(String toDate) {
        return statementApplicationService.getFinancialPosition(toDate);
    }
 
	@Override
	public ArrayList<CashJournalBean> getCashJournal(String fromDate, String toDate) {
        return statementApplicationService.getCashJournal(fromDate, toDate);
	}
    
	  public HashMap<String, Object> addEarlyStatements(String toDate){	      
			return statementApplicationService.addEarlyStatements(toDate);
	    }
	  
///////////////////////// 2020-08-24 김진호  수정///////////////////////////
@Override
public ArrayList<DetailTrialBalanceBean> getDetailTrialBalance(String fromDate, String toDate) {
return statementApplicationService.getDetailTrialBalance(fromDate, toDate);
}
///////////////////////// 2020-08-24 김진호  끝///////////////////////////
}
