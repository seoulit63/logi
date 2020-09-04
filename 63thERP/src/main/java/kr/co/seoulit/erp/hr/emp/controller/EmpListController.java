package kr.co.seoulit.erp.hr.emp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.hr.emp.sf.EmpServiceFacade;
import kr.co.seoulit.erp.hr.emp.to.EmpTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/*")
public class EmpListController  {
	@Autowired
	private EmpServiceFacade empServiceFacade;

	@RequestMapping("emp/list.do")
	public  Map<String, Object> emplist(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
			response.setContentType("application/json; charset=UTF-8");
			String value = "전체부서";

			if (request.getParameter("value") != null)
				value = (String) request.getParameter("value"); //dept: "전체부서"			
			
			List<EmpTO> list = empServiceFacade.findEmpList(value);			
			map.put("list", list);
		
    return map;
	}

	
	
	/*public ModelAndView workInfoList(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/json; charset=UTF-8");
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<String, Object>();
		String viewName = null;
		try {
			String code = request.getParameter("code");

			EmpServiceFacadeImpl sf = EmpServiceFacadeImpl.getInstance();

			ListForm listForm = new ListForm();

			
			ArrayList<EmpTO> list = sf.workInfoList(code);
			map.put("list", list);

			JSONObject jsonobject = JSONObject.fromObject(map);
			PrintWriter out = response.getWriter();
			out.println(jsonobject);
			System.out.println(jsonobject);
		} catch (Exception e) {
			viewName = "error";
			map.put("errorCode", -1);
			map.put("errorMsg", e.getMessage());
			JSONObject jsonobject = JSONObject.fromObject(map);
			try {
				PrintWriter out = response.getWriter();
				out.println(jsonobject);
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		ModelAndView modelAndView = null;
		return null;
	} */
	
}