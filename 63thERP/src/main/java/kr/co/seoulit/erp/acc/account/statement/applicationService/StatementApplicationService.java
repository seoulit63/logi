package kr.co.seoulit.erp.acc.account.statement.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.erp.acc.account.statement.to.CashJournalBean;
import kr.co.seoulit.erp.acc.account.statement.to.DetailTrialBalanceBean;
import kr.co.seoulit.erp.acc.account.statement.to.EarlyAssetBean;
import kr.co.seoulit.erp.acc.account.statement.to.TotalTrialBalanceBean;

public interface StatementApplicationService {

    HashMap<String, Object> addEarlyStatements(String toDate);
	
    HashMap<String, Object> getTotalTrialBalance(String toDate);

    HashMap<String, Object> getIncomeStatement(String toDate);

    HashMap<String, Object> getFinancialPosition(String toDate);
    
    ArrayList<DetailTrialBalanceBean> getDetailTrialBalance(String fromDate, String toDate);
    
    ArrayList<CashJournalBean> getCashJournal(String fromDate, String toDate);
}
