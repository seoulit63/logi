package kr.co.seoulit.erp.acc.account.slip.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.seoulit.erp.acc.account.slip.serviceFacade.SlipServiceFacade;
import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;
import kr.co.seoulit.erp.acc.account.slip.to.SlipBean;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class SlipController{
	@Autowired
    private SlipServiceFacade slipServiceFacade;
  
	@RequestMapping(value="/account/updateSlip", method=RequestMethod.GET)
	public HashMap<String, Object> updateSlip(@RequestParam HashMap<String,Object> param) {
		HashMap<String, Object> map=new HashMap<>();
		try {
            SlipBean slipBean = new SlipBean();
            slipBean.setSlipNo((String)param.get("slipNo"));
            slipBean.setSlipType((String)param.get("slipType"));
            slipBean.setExpenseReport((String)param.get("expenseReport"));
            slipServiceFacade.updateSlip(slipBean); 
            map.put("errorCode",0);
 	        map.put("errorMsg","등록완료");
    }catch(Exception e2) {
	    	map.put("errorCode", -1);
	    	map.put("errorMsg", e2.getMessage());
	    }
		   return map;

}
	@RequestMapping(value="/account/addSlip", method=RequestMethod.POST)
    public HashMap<String, Object> addSlip(@RequestBody Map<String,ArrayList<SlipBean>> batchArray) {
		
		    HashMap<String, Object> map=new HashMap<>();
		    System.out.println(batchArray);

		    try {
		    	
            String slipNo = slipServiceFacade.addSlip(batchArray);
            
            map.put("slipNo", slipNo);
            map.put("errorCode",0);
 	        map.put("errorMsg","등록완료");
 	        
 	        //System.out.println(slipNo + " : 잘된거 같네 ㅎ.ㅎ");
		    }catch (Exception e2) {
	 	    	map.put("errorCode", -1);
	 	    	map.put("errorMsg", e2.getMessage());
	 	    	e2.printStackTrace();
	 	    }
	 		   return map;
	}
	
	@RequestMapping(value="/account/deleteSlip", method=RequestMethod.DELETE)
    public void deleteSlip(@RequestParam("slipNo")String slipNo) {
            slipServiceFacade.deleteSlip(slipNo);  
          
    }

	@RequestMapping(value="/account/approveSlip", method=RequestMethod.PUT)
    public void approveSlip(@RequestBody Map<String,ArrayList<SlipBean>> approvalData) {
            ArrayList<SlipBean> slipBeans = approvalData.get("approvalData");
            slipServiceFacade.approveSlip(slipBeans);

    }
	@RequestMapping(value="/account/findRangedSlipList", method=RequestMethod.GET)
    public ArrayList<SlipBean> findRangedSlipList(@RequestParam HashMap<String,Object> param) {
		
       HashMap<String, Object> map=new HashMap<>();
       ArrayList<SlipBean> slipbean = null;
           try {
           // modelAndView.addObject("slipList", slipList);
     //  ArrayList<SlipBean> ar=new ArrayList<SlipBean>();
           slipbean=slipServiceFacade.findRangedSlipList(param);
           
           map.put("slipList",slipbean);
           map.put("errorCode",0);
           map.put("errorMsg","등록완료");
    //   return ar;
    }
           catch(Exception e2){
        	 	map.put("errorCode", -1);
            	map.put("errorMsg", e2.getMessage());
           }
           return slipbean;
     }
	@RequestMapping(value="/account/slip")
    public ModelAndView findDisApprovalSlipList(HttpServletRequest request, HttpServletResponse response) {
    		ModelAndView modelAndView = new ModelAndView("jsonView");   
            ArrayList<SlipBean> disApprovalSlipList = slipServiceFacade.findDisApprovalSlipList();
            modelAndView.addObject("disApprovalSlipList", disApprovalSlipList);
     

        return modelAndView;
    }
}
