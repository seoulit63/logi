package kr.co.seoulit.erp.acc.account.base.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.base.serviceFacade.AccountServiceFacade;
import kr.co.seoulit.erp.acc.account.base.to.AccountBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountCodeBean;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class AccountController{
   @Autowired
	private AccountServiceFacade accountServiceFacade;

   @RequestMapping(value="/base/getAccountList")
	public List<AccountCodeBean> getAccountList() {
				
		return accountServiceFacade.getAccountList();
	}
   @RequestMapping(value="/account/getAccount", method=RequestMethod.GET)
	public HashMap<String, Object> getAccount(@RequestParam("accountCode") String accountCode){
	   HashMap<String, Object> map=new HashMap<>();
	   try {
		AccountBean accountBean=accountServiceFacade.getAccount(accountCode);
        map.put("account", accountBean);
        map.put("errorCode",0);
        map.put("errorMsg","등록완료");
         
    }catch (Exception e2) {
    	map.put("errorCode", -1);
    	map.put("errorMsg", e2.getMessage());
    }
	   return map;
   }
   @RequestMapping(value="/account/getAccountListByName")
    public HashMap<String, Object> getAccountListByName(@RequestParam("accountName") String accountName) {
 
       HashMap<String, Object> map=new HashMap<>();
	   try {
		   ArrayList<AccountBean> accountBean=accountServiceFacade.getAccountListByName(accountName);
        map.put("accountList", accountBean);
        map.put("errorCode",0);
        map.put("errorMsg","등록완료");
        
    }catch (Exception e2) {
    	map.put("errorCode", -1);
    	map.put("errorMsg", e2.getMessage());
    }
	   return map;
   }
       
   @RequestMapping(value="/account/findParentAccountList", method=RequestMethod.GET)
    public HashMap<String, Object> findParentAccountList() {     
        HashMap<String, Object> map=new HashMap<>();
 	   try {
 		 ArrayList<AccountBean> accountBean=accountServiceFacade.findParentAccountList();
         map.put("accountList", accountBean);
         map.put("errorCode",0);
         map.put("errorMsg","등록완료");
         
     }catch (Exception e2) {
     	map.put("errorCode", -1);
     	map.put("errorMsg", e2.getMessage());
     }
 	   return map;
    }
        
    
   @RequestMapping(value="/account/findDetailAccountList", method=RequestMethod.GET)
    public HashMap<String, Object> findDetailAccountList(@RequestParam("code") String code) {
	   HashMap<String, Object> map=new HashMap<>();
        try {
    		ArrayList<AccountBean> accountBean=accountServiceFacade.findDetailAccountList(code);
            map.put("detailAccountList", accountBean);
            map.put("errorCode",0);
            map.put("errorMsg","등록완료");
            System.out.println(accountBean.get(1));
            
        }catch (Exception e2) {
        	map.put("errorCode", -1);
        	map.put("errorMsg", e2.getMessage());
        }
    	   return map;
       }
   @RequestMapping(value="/account/editAccount", method=RequestMethod.PUT)
   public void editAccount(@RequestParam HashMap<String,Object> param){
		AccountBean accountBean = new AccountBean();
		accountBean.setAccountInnerCode((String)param.get("accountInnerCode"));
		accountBean.setAccountName((String)param.get("accountName"));
       accountServiceFacade.updateAccount(accountBean);
   }
   
   @RequestMapping(value="/account/findPeriodNo")
   public String findPeriodNo(@RequestParam String toDay) {
	   
	   String periodNo = accountServiceFacade.findPeriodNo(toDay);
	   return periodNo ;
   }
   //=====================================  2020-08-25 계정별 원장 조편백   시작 ==================================== 

   @RequestMapping(value="/account/getLedgerbyAccountInfo")
   public HashMap<String, Object> getLedgerbyAccountInfo(
   											@RequestParam("accountCode") String accountCode ,
   											@RequestParam("startDate") String startDate,
   											@RequestParam("endDate") String endDate) {
   	
    System.out.println("======================계정코드 기간조회======================");
    System.out.println("========accountCode========== : "+accountCode);
    System.out.println("========accountCode========== : "+startDate);
    System.out.println("========accountCode========== : "+endDate);
    
    	HashMap<String,Object> param=new HashMap<>();
    	try {
    		
   	param = accountServiceFacade.getLedgerbyAccountInfo(accountCode, startDate, endDate);
   	
   	param.put("gridRowJson", param.get("RESULT"));
   	param.put("errorCode", param.get("ERROR_CODE"));
   	param.put("errorMsg", param.get("ERROR_MSG"));
   	
    	}catch (Exception e) {
   		param.put("errorCode",-1);
   		param.put("errorMsg",e.getMessage());
   	}
   	return param; 
      }
   //=====================================  2020-08-25 계정별 원장 조편백   끝 ==================================== 
}