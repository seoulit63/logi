package kr.co.seoulit.erp.acc.company.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.seoulit.erp.acc.company.serviceFacade.BusinessServiceFacade;
import kr.co.seoulit.erp.acc.company.to.BusinessBean;
import kr.co.seoulit.erp.acc.company.to.DetailBusinessBean;

@CrossOrigin("*")
@Controller
@RequestMapping("/acc/*")
public class BusinessController  {

	@Autowired
	private BusinessServiceFacade businessServiceFacade;
	
    @RequestMapping(value="/company/getBusinessList", method=RequestMethod.GET)
	public ArrayList<BusinessBean> getBusinessList(HttpServletRequest request, HttpServletResponse response) {

		return businessServiceFacade.getBusinessList();	

	}
	
    @RequestMapping(value="/company/getDetailBusiness", method=RequestMethod.GET)
	public ArrayList<DetailBusinessBean> getDetailBusiness(@RequestParam("businessCode")String businessCode) {

			//modelAndView.addObject("detailBusinessList",detailBusinessList);
			//modelAndView.addObject("errorCode", 0);
			
			return businessServiceFacade.getDetailBusiness(businessCode);
	}

}
