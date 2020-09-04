package kr.co.seoulit.erp.logi.logistics.production.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import kr.co.seoulit.erp.logi.logistics.production.serviceFacade.ProductionServiceFacade;

import kr.co.seoulit.erp.logi.logistics.production.to.MrpGatheringTO;
import kr.co.seoulit.erp.logi.logistics.production.to.MrpTO;


@CrossOrigin("*")
@RestController
@RequestMapping(value = "/logi/logistics/production/*", produces = "application/json")
public class MrpController  {

	@Autowired
	private ProductionServiceFacade productionSF;

	private ModelMap modelMap = new ModelMap();
	
	
	/****************************************************** 2020-09-02 63기 김태윤 수정 gson 추가 **********************************************/
	private static Gson gson = new GsonBuilder().serializeNulls().create();
	
	
	/****************************************************** 2020-09-02 63기 김태윤 수정 **********************************************/
	@RequestMapping("/getMrpList")
	public ModelMap getMrpList(@RequestParam String mrpGatheringStatusCondition, @RequestParam String dateSearchCondition, @RequestParam String mrpStartDate,
			@RequestParam String mrpEndDate, @RequestParam String mrpGatheringNo) {//(HttpServletRequest request, HttpServletResponse response) {

		//String mrpGatheringStatusCondition = request.getParameter("mrpGatheringStatusCondition");
		//String dateSearchCondition = request.getParameter("dateSearchCondition");
		//String mrpStartDate = request.getParameter("mrpStartDate");
		//String mrpEndDate = request.getParameter("mrpEndDate");
		//String mrpGatheringNo = request.getParameter("mrpGatheringNo");
		
		try {

			ArrayList<MrpTO> mrpList = null;
			mrpList = productionSF.searchMrpList(mrpGatheringStatusCondition);
		
			if(mrpGatheringStatusCondition != null ) {
				//여기 null이라는 스트링값이 담겨저왔으니 null은 아님. 객체가있는상태.
				
				mrpList = productionSF.searchMrpList(mrpGatheringStatusCondition);
				
			} else if (dateSearchCondition != null) {
				
				mrpList = productionSF.searchMrpList(dateSearchCondition, mrpStartDate, mrpEndDate);
				
			} else if (mrpGatheringNo != null) {
				
				mrpList = productionSF.searchMrpListAsMrpGatheringNo(mrpGatheringNo);
				
			}
			
			modelMap.put("gridRowJson", mrpList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	/****************************************************** 2020-09-02 63기 김태윤 수정 **********************************************/
	@RequestMapping("/openMrp.do")
	public ModelMap/*HashMap<String, Object>*/ openMrp(@RequestParam String mpsNoListStr){//(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("mpsNoListStr   "+mpsNoListStr);
		
//		String mpsNoListStr = request.getParameter("mpsNoList");
		/*
		ArrayList<String> mpsNoArr = gson.fromJson((mpsNoListStr),
				new TypeToken<ArrayList<String>>() { }.getType());		
		HashMap<String, Object> resultMap = new HashMap<>();
		*/
		ArrayList<String> mpsNoArr=new ArrayList<>();
		HashMap<String, Object> resultMap = new HashMap<>();
		mpsNoArr.add(0,mpsNoListStr);
		try {
			System.out.println("mpsNoListStr   4"+mpsNoListStr);
			resultMap = productionSF.openMrp(mpsNoArr);
			modelMap.put("gridRowJson", resultMap.get("gridRowJson"));
		} catch (Exception e2) {
			
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		//return null;
		return modelMap;
		
	}

	
	/****************************************************** 2020-09-02 63기 김태윤 수정 **********************************************/
	@RequestMapping(value="/registerMrp.do", method=RequestMethod.POST )
	public ModelMap registerMrp(@RequestBody Map<String, Object> params) {//@RequestBody Map<String, Object> params
		
		System.out.println("params				"+params);

		System.out.println("batchList				"+params.get("batchList"));
		System.out.println("mrpRegisterDate				"+params.get("mrpRegisterDate"));
		
		String batchList=params.get("batchList").toString();
		String mrpRegisterDate=params.get("mrpRegisterDate").toString();
		/*
		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(params.toString());
		String mrpRegisterDate = element.getAsJsonObject().get("mrpRegisterDate").getAsString();
		*/
		ArrayList<MrpTO> newMrpList 
			= gson.fromJson(batchList, 
					new TypeToken<ArrayList<MrpTO>>() { }.getType());
		
		System.out.println(newMrpList.toString());

		try {

			HashMap<String, Object> resultMap = productionSF.registerMrp(mrpRegisterDate, newMrpList);	 
			
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
	
	
	@RequestMapping("/getMrpGatheringList.do")
	public ModelMap getMrpGatheringList(HttpServletRequest request, HttpServletResponse response) {
		
//		String mrpNoList = request.getParameter("mrpNoList");
		
//		ArrayList<String> mrpNoArr = gson.fromJson(mrpNoList,
//				new TypeToken<ArrayList<String>>() { }.getType());

		try {

//			ArrayList<MrpGatheringTO> mrpGatheringList = productionSF.getMrpGathering(mrpNoArr);
//			
//			modelMap.put("gridRowJson", mrpGatheringList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	
	@RequestMapping("/registerMrpGathering.do")
	public ModelMap registerMrpGathering(HttpServletRequest request, HttpServletResponse response) {
		
//		String mrpGatheringRegisterDate = request.getParameter("mrpGatheringRegisterDate");
//		String batchList = request.getParameter("batchList");
//		String mrpNoAndItemCodeList = request.getParameter("mrpNoAndItemCodeList");
		
//		ArrayList<MrpGatheringTO> newMrpGatheringList
//			= gson.fromJson(batchList,
//					new TypeToken<ArrayList<MrpGatheringTO>>() { }.getType());	
//		
//		HashMap<String, String> mrpNoAndItemCodeMap 
//			=  gson.fromJson(mrpNoAndItemCodeList,
//					new TypeToken<HashMap<String, String>>() { }.getType());

		try {

//			HashMap<String, Object> resultMap 
//				= productionSF.registerMrpGathering(mrpGatheringRegisterDate, newMrpGatheringList, mrpNoAndItemCodeMap);	 
//			
//			modelMap.put("result", resultMap);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	@RequestMapping("/searchMrpGathering.do")
	public ModelMap searchMrpGathering(HttpServletRequest request, HttpServletResponse response) {
		
		String searchDateCondition = request.getParameter("searchDateCondition");
		String startDate = request.getParameter("mrpGatheringStartDate");
		String endDate = request.getParameter("mrpGatheringEndDate");

		System.out.println("searchDateCondition              "+searchDateCondition);
		System.out.println("startDate              "+startDate);
		System.out.println("endDate              "+endDate);
		try {

			ArrayList<MrpGatheringTO> mrpGatheringList = 
					productionSF.searchMrpGatheringList(searchDateCondition, startDate, endDate);
			
			modelMap.put("gridRowJson", mrpGatheringList);
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
