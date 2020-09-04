package kr.co.seoulit.erp.hr.attd.controller;


import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.hr.attd.sf.AttdServiceFacade;
import kr.co.seoulit.erp.hr.attd.to.RestAttdTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class AttdApplovalController {
	@Autowired
	private AttdServiceFacade attdServiceFacade;
	private ModelMap modelMap = new ModelMap();

//	********************* 결재승인관리 시작 _2020.08.28 _준서 *********************
	@RequestMapping(value="/attendance/attendanceApploval.do",method=RequestMethod.GET)
	public ModelMap findRestAttdListByDept(@RequestParam HashMap<String,String> attdApplMap, HttpServletResponse response){
		System.out.println("<< findRestAttdListByDept >>");
		System.out.println(attdApplMap);
//		String startDate = attdApplMap.get("startDate");
//		String endDate = attdApplMap.get("endDate");
//		String deptCode = attdApplMap.get("deptCode");
		
		try {
			response.setContentType("application/json; charset=UTF-8");
			ArrayList<RestAttdTO> restAttdList = attdServiceFacade.findRestAttdListByDept(attdApplMap);
			modelMap.put("errorMsg","success");
			modelMap.put("errorCode", 0);
			modelMap.put("restAttdList", restAttdList);
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
		} 
		return modelMap;
	}
//	********************* 결재승인관리 종료 _2020.08.28 _준서 *********************

//	********************* 결재승인관리 시작 _2020.08.27 _준서 *********************
	@RequestMapping(value="/attendance/attendanceApploval.do",method=RequestMethod.POST)
	public ModelMap modifyRestAttdList(@RequestParam HashMap<String,String> attdApplMap, HttpServletResponse response){
		System.out.println("<< modifyRestAttdList >>");
		System.out.println("attdRestMap: "+attdApplMap);
		
		try {
			response.setContentType("application/json; charset=UTF-8");
			attdServiceFacade.modifyRestAttdList(attdApplMap);
			System.out.println("cccccccccccccccccccccccccccc");
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
		} 
		return modelMap;
	} 
}
//********************* 결재승인관리 종료 _2020.08.27 _준서 *********************
