package kr.co.seoulit.erp.logi.base.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.seoulit.erp.logi.base.serviceFacade.LogiBaseServiceFacade;

import kr.co.seoulit.erp.logi.base.to.LogiCodeDetailTO;
import kr.co.seoulit.erp.logi.base.to.LogiCodeTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/base/*")
public class LogiCodeController {


	@Autowired
	private LogiBaseServiceFacade baseSF;

	
	private ModelMap modelMap = new ModelMap();

	@RequestMapping(value="/searchCodeList.do",method=RequestMethod.GET)
	public ModelMap findCodeList(HttpServletRequest request, HttpServletResponse response) {

		try {

			ArrayList<LogiCodeTO> codeList = baseSF.getCodeList();

			modelMap.put("codeList", codeList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		
		return modelMap;

	}

	@RequestMapping(value="/codeList.do",method=RequestMethod.GET)
	public ModelMap findDetailCodeList(HttpServletRequest request, HttpServletResponse response) {


		String divisionCode = request.getParameter("divisionCode");
		

		try {

			ArrayList<LogiCodeDetailTO> detailCodeList = baseSF.getDetailCodeList(divisionCode);
			

			modelMap.put("detailCodeList", detailCodeList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		}catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping(value="/batchListProcess.do",method=RequestMethod.GET)
	public ModelMap batchListProcess(HttpServletRequest request, HttpServletResponse response) {


//		String batchList = request.getParameter("batchList");
//		String tableName = request.getParameter("tableName");

		try {

//			ArrayList<LogiCodeTO> codeList = null;
//			ArrayList<LogiCodeDetailTO> detailCodeList = null;
			HashMap<String, Object> resultMap = null;

//			if (tableName.equals("CODE")) {
//
//				codeList = gson.fromJson(batchList, new TypeToken<ArrayList<CodeTO>>() {
//				}.getType());
//
//				resultMap = baseSF.batchCodeListProcess(codeList);
//
//			} else if (tableName.equals("CODE_DETAIL")) {
//
//				detailCodeList = gson.fromJson(batchList, new TypeToken<ArrayList<CodeDetailTO>>() {
//				}.getType());
//
//				resultMap = baseSF.batchDetailCodeListProcess(detailCodeList);
//
//			}

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

	@RequestMapping(value="/changeCodeUseCheckProcess.do",method=RequestMethod.GET)
	public ModelMap changeCodeUseCheckProcess(HttpServletRequest request, HttpServletResponse response) {


//		String batchList = request.getParameter("batchList");

		try {

//			ArrayList<LogiCodeDetailTO> detailCodeList = null;
//			HashMap<String, Object> resultMap = null;
//
//			detailCodeList = gson.fromJson(batchList, new TypeToken<ArrayList<CodeDetailTO>>() {
//			}.getType());
//
//			resultMap = baseSF.changeCodeUseCheckProcess(detailCodeList);
//
//			modelMap.put("result", resultMap);
//			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
}
