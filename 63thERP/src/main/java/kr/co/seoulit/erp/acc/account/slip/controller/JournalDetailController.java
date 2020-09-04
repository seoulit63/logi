package kr.co.seoulit.erp.acc.account.slip.controller;

import kr.co.seoulit.erp.acc.account.slip.serviceFacade.JournalDetailServiceFacade;
import kr.co.seoulit.erp.acc.account.slip.to.JournalDetailBean;


import java.util.ArrayList;
import java.util.HashMap;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class JournalDetailController {
	@Autowired
    private JournalDetailServiceFacade journalDetailServiceFacade;
    
	@RequestMapping(value="/account/getJournalDetailList", method=RequestMethod.GET)
    public HashMap<String, Object> getJournalDetailList(@RequestParam("journalNo")String journalNo) {

		
        HashMap<String, Object> map=new HashMap<>();
        try {
        // modelAndView.addObject("slipList", slipList);
  //  ArrayList<SlipBean> ar=new ArrayList<SlipBean>();
        ArrayList<JournalDetailBean> journalDetailList=journalDetailServiceFacade.getJournalDetailList(journalNo);
        map.put("journalDetailList",journalDetailList);
        map.put("errorCode",0);
        map.put("errorMsg","등록완료");
 //   return ar;
 }
        catch(Exception e2){
     	 	map.put("errorCode", -1);
         	map.put("errorMsg", e2.getMessage());
        }
        return map;
        }
    
	@RequestMapping(value="/account/editJournalDetail", method=RequestMethod.GET)
    public void editJournalDetail(@RequestParam("journalDetailNo")String journalDetailNo,@RequestParam("journalDescription")String journalDescription) {
    	
            JournalDetailBean journalDetailBean = new JournalDetailBean();
            journalDetailBean.setJournalDetailNo(journalDetailNo);
            journalDetailBean.setJournalDescription(journalDescription);
            journalDetailServiceFacade.editJournalDetail(journalDetailBean);

    }
}