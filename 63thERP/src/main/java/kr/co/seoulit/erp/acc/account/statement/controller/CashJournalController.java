package kr.co.seoulit.erp.acc.account.statement.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.statement.serviceFacade.StatementServiceFacade;
import kr.co.seoulit.erp.acc.account.statement.to.CashJournalBean;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class CashJournalController{

    @Autowired
    private StatementServiceFacade statementServiceFacade;

    

	@RequestMapping(value="/statement/cashJournal")
    public ArrayList<CashJournalBean> handleRequestInternal(@RequestParam("fromDate")String fromDate,@RequestParam("toDate")String toDate) {
                    
        return statementServiceFacade.getCashJournal(fromDate, toDate);  
    }

}
