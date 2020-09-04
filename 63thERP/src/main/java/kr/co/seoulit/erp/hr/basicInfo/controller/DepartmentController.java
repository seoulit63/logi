package kr.co.seoulit.erp.hr.basicInfo.controller;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.hr.basicInfo.serviceFacade.OrganizationServiceFacade;

import kr.co.seoulit.erp.hr.basicInfo.to.DepartmentTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/basicInfo/*")
public class DepartmentController {

	@Autowired
	private OrganizationServiceFacade orgSF;

	private ModelMap modelMap = new ModelMap();

	@RequestMapping(value="/searchDepartment.do",method=RequestMethod.GET)
	public ModelMap searchDepartmentList(@RequestParam String searchCondition , @RequestParam String companyCode, @RequestParam String workplaceCode) {
		
		ArrayList<DepartmentTO> departmentList = null;
System.out.println("HKYILJQGEYUHGFQWYUFRUQWTWUYRFTYQWFTEIYFTUFUYTRQFWEKGFYQUGFWUFQTRQWTEFQU");
		try {

			departmentList = orgSF.getDepartmentList(searchCondition,companyCode, workplaceCode);

			modelMap.put("gridRowJson", departmentList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping(value="/batchDepartmentListProcess.do",method=RequestMethod.POST)
	public ModelMap batchListProcess(@RequestBody ArrayList<DepartmentTO> batchList) {

		try {

			HashMap<String, Object> resultMap = orgSF.batchDepartmentListProcess(batchList);

			modelMap.put("result", resultMap);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
}
