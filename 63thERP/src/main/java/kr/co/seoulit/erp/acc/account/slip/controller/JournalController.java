package kr.co.seoulit.erp.acc.account.slip.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import kr.co.seoulit.erp.acc.account.slip.serviceFacade.JournalServiceFacade;
import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class JournalController {

	@Autowired
	private JournalServiceFacade journalServiceFacade;

    @RequestMapping(value="/account/journal", method=RequestMethod.GET)
	public ArrayList<JournalBean> findRangedJournalList(@RequestParam("startDate")String fromDate, @RequestParam("endDate")String toDate) {
    	System.out.println(fromDate);
		return journalServiceFacade.findRangedJournalList(fromDate, toDate);
	}
    @RequestMapping(value="/account/findSingleJournalList", method=RequestMethod.GET)
	public HashMap<String, Object> findSingleJournalList(@RequestParam String slipNo){

    	HashMap<String, Object> map=new HashMap<>();
    	try {
    		if(slipNo != "null") {
    		ArrayList<JournalBean> journalList=journalServiceFacade.findSingleJournalList(slipNo);
    		System.out.println("�솕�깘 ���꼸鍮�:   "+journalList);
    		map.put("journalList",journalList);
    		map.put("errorCode",0);
            map.put("errorMsg","�벑濡앹셿猷�");
    		}
	}
    	catch(Exception e2){
    	 	map.put("errorCode", -1);
        	map.put("errorMsg", e2.getMessage());
       }
    		
    	return map;
    	}
    	
    @RequestMapping(value="/account/editJournal", method=RequestMethod.PUT)
    public ModelAndView editJournal(HttpServletRequest request, HttpServletResponse response) {
		
		ModelAndView modelAndView = new ModelAndView("jsonView");

        String slipNo = request.getParameter("slipNo");
        ArrayList<JournalBean> journalBeanList = new ArrayList<JournalBean>();

   
            //JournalBean journalBean = BeanCreator.getInstance().create(JSONObject.fromObject(journalObj), JournalBean.class);
            //journalBean.setSlipNo(slipNo);
            //journalBeanList.add(journalBean);
  

        journalServiceFacade.editJournal(slipNo, journalBeanList);
        modelAndView.addObject("slipNo", journalBeanList);

    return modelAndView;
}
}
