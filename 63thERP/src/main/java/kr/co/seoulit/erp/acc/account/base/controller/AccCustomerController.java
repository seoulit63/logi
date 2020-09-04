package kr.co.seoulit.erp.acc.account.base.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.base.serviceFacade.AccountServiceFacade; 
import kr.co.seoulit.erp.acc.account.base.to.CustomerBean;
import kr.co.seoulit.erp.hr.attd.to.DayAttdMgtTO;
import kr.co.seoulit.erp.hr.basicInfo.to.WorkplaceTO; 

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class AccCustomerController {
	
	//====================================== 2020-09-01 조편백 거래처 관리  컨트롤러 생성 =====================================
	
	  @Autowired
		private AccountServiceFacade accountServiceFacade;
	  
	  private ModelMap modelMap = new ModelMap();
	  
	  //일반 거래처 조회 
	   @RequestMapping(value="/base/getCustomerList")
		public List<CustomerBean> getCustomerList() {
					
			return accountServiceFacade.getCustomerList();
		}
	   
	   
	//거래처 삭제 
    @RequestMapping(value="/base/deleteNormalCustormer")  
	public void deleteNormalCustormer(@RequestParam String customerCode) {
    	
		   System.out.println("  ::::::: 일반거래처 삭제   :::::::  "+customerCode); 
		   
		   accountServiceFacade.deleteNormalCustormer(customerCode );
		}
    
	//거래처 저장
    @RequestMapping(value="/base/batchCustormerProcess", method = RequestMethod.POST)  
	public void batchCustormerProcess(@RequestBody  HashMap<String,ArrayList<CustomerBean>> customerList) {
    	
 		  // System.out.println("  ::::::: 일반거래처 저장   :::::::  "+customerList); 
		   accountServiceFacade.batchCustormerProcess(customerList );
		    
		}
}
