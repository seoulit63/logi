package kr.co.seoulit.erp.hr.certificate.controller;


import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import kr.co.seoulit.erp.hr.certificate.sf.CertificateServiceFacade;
import kr.co.seoulit.erp.hr.certificate.to.CertificateTO;

@CrossOrigin("*")
@Controller
@RequestMapping("/hr/*")
public class CertificateApprovalController {
	@Autowired
	private CertificateServiceFacade certificateServiceFacade;
	private ModelAndView modelAndView = null;
	private ModelMap modelMap = new ModelMap();
	
	
	public ModelAndView findCertificateListByDept(HttpServletRequest request, HttpServletResponse response) {
		
		String deptName = request.getParameter("deptName");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");		
		try {
			response.setContentType("application/json; charset=UTF-8");
			ArrayList<CertificateTO> certificateList = certificateServiceFacade.findCertificateListByDept(deptName, startDate, endDate);
			modelMap.put("certificateList", certificateList);
			modelMap.put("errorMsg", "success");
			modelMap.put("errorCode", 0);
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
		}
		modelAndView = new ModelAndView("jsonView", modelMap);
		return modelAndView;
	}
	
	public ModelAndView modifyCertificateList(HttpServletRequest request, HttpServletResponse response) {
		
//		String sendData = request.getParameter("sendData");
		try {
			response.setContentType("application/json; charset=UTF-8");
//			Gson gson = new Gson();
//			ArrayList<CertificateTO> certificateList = gson.fromJson(sendData, new TypeToken<ArrayList<CertificateTO>>(){}.getType());
//			certificateServiceFacade.modifyCertificateList(certificateList);
			modelMap.put("errorMsg","success");
			modelMap.put("errorCode", 0);
		} catch (Exception ioe) {
			modelMap.clear();
			modelMap.put("errorMsg", ioe.getMessage());
			}
		modelAndView = new ModelAndView("jsonView", modelMap);
		return modelAndView;
	}
}
