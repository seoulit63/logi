package kr.co.seoulit.erp.hr.base.controller;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.seoulit.erp.hr.base.sf.HrBaseServiceFacade;

import kr.co.seoulit.erp.hr.base.to.DeptTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.hr.emp.sf.EmpServiceFacade;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class DeptListController{	
	@Autowired
	private HrBaseServiceFacade baseServiceFacade;
	@Autowired
	private EmpServiceFacade empServiceFacade;

	@RequestMapping("/base/deptList.do")
	@ResponseBody
	public void batchDeptProcess(@RequestParam String sendData) {
         
		  ObjectMapper mapper = new ObjectMapper();
		ArrayList<DeptTO> deptto =null;
				try {
					deptto = mapper.readValue(sendData, new TypeReference<ArrayList<DeptTO>>(){});
		  			
		  		} catch (IOException e) {
		  			e.printStackTrace();
		  		}
		
				
	  baseServiceFacade.batchDeptProcess(deptto);
	}
   
@RequestMapping(value="/base/deptList", method=RequestMethod.GET )
@ResponseBody
	public Map<String, Object> findDeptList(){
		Map<String, Object> map = new HashMap<String, Object>();
		
			List<DeptTO> list = empServiceFacade.findDeptList();
			DeptTO emptyBean = new DeptTO();
			 map.put("emptyBean", emptyBean);
			 map.put("list", list);
			 map.put("errorMsg","success");
			 map.put("errorCode", 0);

		
		
		return map;
	}
		
}
