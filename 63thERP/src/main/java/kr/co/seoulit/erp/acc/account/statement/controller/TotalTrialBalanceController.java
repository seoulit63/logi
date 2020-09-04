package kr.co.seoulit.erp.acc.account.statement.controller;

import java.util.HashMap;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.statement.serviceFacade.StatementServiceFacade;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class TotalTrialBalanceController  {
    @Autowired
    private StatementServiceFacade statementServiceFacade;

    @RequestMapping(value="/statement/getTotalTrialBalance")
	public HashMap<String, Object> getTotalTrialBalance(@RequestParam("toDate") String toDate) {
    	
        return statementServiceFacade.getTotalTrialBalance(toDate);
      
    }

}
