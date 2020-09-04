package kr.co.seoulit.erp.acc.account.statement.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.erp.acc.account.statement.to.CashJournalBean;
import kr.co.seoulit.erp.acc.account.statement.to.DetailTrialBalanceBean;
import kr.co.seoulit.erp.acc.account.statement.to.TotalTrialBalanceBean;

public interface StatementServiceFacade {
	public HashMap<String, Object> addEarlyStatements(String toDate);

    public HashMap<String, Object> getTotalTrialBalance(String toDate);

    public HashMap<String, Object> getFinancialPosition(String toDate);

    public HashMap<String, Object> getIncomeStatement(String toDate);
    
    public ArrayList<CashJournalBean> getCashJournal(String fromDate, String toDate);
    
///////////////////////// 2020-08-24 김진호  수정///////////////////////////    
public ArrayList<DetailTrialBalanceBean> getDetailTrialBalance(String fromDate, String toDate);
///////////////////////// 2020-08-24 김진호  끝///////////////////////////    

}

