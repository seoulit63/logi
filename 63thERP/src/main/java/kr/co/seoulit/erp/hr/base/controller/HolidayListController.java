package kr.co.seoulit.erp.hr.base.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.seoulit.erp.hr.base.sf.HrBaseServiceFacade;
import kr.co.seoulit.erp.hr.base.to.HolidayTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class HolidayListController{
	@Autowired
	private HrBaseServiceFacade baseServiceFacade;
	@RequestMapping(value="/base/holidayList", method=RequestMethod.GET)
	
	
	
	public Map<String, Object> findHolidayList(HttpServletRequest request, HttpServletResponse response, Model model) {
		Map<String, Object> map = new HashMap<String, Object>();
		ArrayList<HolidayTO> holidayList = baseServiceFacade.findHolidayList();
			HolidayTO holito = new HolidayTO();
			 map.put("holidayList", holidayList);
			 map.put("emptyHoilday", holito);
			 map.put("errorMsg", "success");
			 map.put("errorCode", 0);

	return map;
	}
	
	public Model findWeekDayCount(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, Model model) {
		// TODO Auto-generated method stub
	
		try {
			String weekdayCount = baseServiceFacade.findWeekDayCount(startDate, endDate);
			model.addAttribute("weekdayCount", weekdayCount);
			model.addAttribute("errorMsg", "success");
			model.addAttribute("errorCode", 0);

			} catch (Exception e) {
			
			model.addAttribute("errorMsg", e.getMessage());
			
			}
		
		return model;
	}
	@RequestMapping("/base/holidayList.do")
	@ResponseBody
	public void regitCodeList(@RequestParam String sendData) {
		ObjectMapper mapper = new ObjectMapper();
		ArrayList<HolidayTO> holydayList = null;
		try {
		
			holydayList = mapper.readValue(sendData, new TypeReference<ArrayList<HolidayTO>>() {
			});
	} catch (Exception e) {
			
		e.printStackTrace();
		}
		baseServiceFacade.registCodeList(holydayList);
	 }

}

