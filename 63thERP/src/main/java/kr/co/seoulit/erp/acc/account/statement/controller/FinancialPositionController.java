package kr.co.seoulit.erp.acc.account.statement.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.statement.serviceFacade.StatementServiceFacade;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class FinancialPositionController {
    @Autowired
	private StatementServiceFacade statementServiceFacade;
  
    @RequestMapping(value="/statement/getFinancialPosition")
    public HashMap<String, Object> getFinancialPosition(@RequestParam("toDate")String toDate){
    System.out.println("============재무상태표 컨트롤러시작===============");
    HashMap<String, Object> param =new HashMap<>();
	try {			
		
		param = statementServiceFacade.getFinancialPosition(toDate);
		
		System.out.println("재무상태표 프로시저리턴값::::::::::::::::::::: "+param.get("RESULT"));
		System.out.println("재무상태표 프로시저리턴값::::::::::::::::::::: "+param.get("ERROR_CODE"));
		System.out.println("재무상태표 프로시저리턴값::::::::::::::::::::: "+param.get("ERROR_MSG"));
		
		param.put("financialList", param.get("RESULT"));
        param.put("errorCode", param.get("ERROR_CODE"));
        param.put("errorMsg", param.get("ERROR_MSG"));			
		} catch(Exception e){
			param.put("errorCode", -1);
			param.put("errorMsg", e.getMessage());
	           }
      return param;
    }
    
    
    @RequestMapping(value="/statement/addearlystatements", method = RequestMethod.POST)
	public void addearlystatements(@RequestParam("toDate")String toDate) {
		
          //  HashMap<String, Object> financialPosition = statementServiceFacade.addEarlyStatements(toDate);
          statementServiceFacade.addEarlyStatements(toDate);
    }

}

