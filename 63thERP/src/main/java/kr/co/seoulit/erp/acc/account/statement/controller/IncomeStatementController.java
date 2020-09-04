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
public class IncomeStatementController {
	
	@Autowired
    private StatementServiceFacade statementServiceFacade;

//================================ 손익계산서 컨드롤러 조편백 ====================================
	
	@RequestMapping(value="/statement/incomeStatement")
    public HashMap<String, Object> handleRequestInternal(@RequestParam("toDate")String toDate) {
    	
		System.out.println("============손익계산서 컨트롤러시작===============");
		HashMap<String, Object> param =new HashMap<>();
		try {
			
		param=statementServiceFacade.getIncomeStatement(toDate);
		
		System.out.println("손익계산서 프로시저리턴값::::::::::::::::::::: "+param.get("RESULT"));
		System.out.println("손익계산서 프로시저리턴값::::::::::::::::::::: "+param.get("ERROR_CODE"));
		System.out.println("손익계산서 프로시저리턴값::::::::::::::::::::: "+param.get("ERROR_MSG"));
		
        param.put("gridRowJson", param.get("RESULT"));
        param.put("errorCode", param.get("ERROR_CODE"));
        param.put("errorMsg", param.get("ERROR_MSG"));			
		} catch(Exception e){
			param.put("errorCode", -1);
			param.put("errorMsg", e.getMessage());
	           }
	           return param;
	     }
	}


