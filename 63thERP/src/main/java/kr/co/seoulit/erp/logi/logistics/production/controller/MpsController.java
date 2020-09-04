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
import com.google.gson.reflect.TypeToken;

import kr.co.seoulit.erp.logi.logistics.production.serviceFacade.ProductionServiceFacade;

import kr.co.seoulit.erp.logi.logistics.production.to.ContractDetailInMpsAvailableTO;
import kr.co.seoulit.erp.logi.logistics.production.to.MpsTO;
import kr.co.seoulit.erp.logi.logistics.production.to.SalesPlanInMpsAvailableTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/production/*")
public class MpsController {

	@Autowired
	private ProductionServiceFacade productionSF;

	
	private ModelMap modelMap = new ModelMap();
	
	private Gson gson = new Gson();

	//2020-09-03 진형욱 메서드 수정::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	@RequestMapping("/searchMpsInfo.do")
	public ModelMap searchMpsInfo(HttpServletRequest request, HttpServletResponse response) {


		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String includeMrpApply = request.getParameter("includeMrpApply"); 
		System.out.println("넘어온 시작날짜::::::::"+startDate);
		System.out.println("넘어온 종료날짜::::::::"+endDate);
		System.out.println("넘어온 ???::::::::"+includeMrpApply);

		try {

			ArrayList<MpsTO> mpsTOList = productionSF.getMpsList(startDate, endDate, includeMrpApply);

			modelMap.put("gridRowJson", mpsTOList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping("/searchContractDetailInMpsAvailable.do")
	public ModelMap searchContractDetailListInMpsAvailable(HttpServletRequest request,
			HttpServletResponse response) {

		String searchCondition = request.getParameter("searchCondition");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");

		try {

			ArrayList<ContractDetailInMpsAvailableTO> contractDetailInMpsAvailableList = productionSF
					.getContractDetailListInMpsAvailable(searchCondition, startDate, endDate);
													   //contractDate, 2019-07-01, 2019-07-31
			modelMap.put("gridRowJson", contractDetailInMpsAvailableList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping("/searchSalesPlanInMpsAvailable.do")
	public ModelMap searchSalesPlanListInMpsAvailable(HttpServletRequest request, HttpServletResponse response) {

		String searchCondition = request.getParameter("searchCondition");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");

		try {

			ArrayList<SalesPlanInMpsAvailableTO> salesPlanInMpsAvailableList = productionSF
					.getSalesPlanListInMpsAvailable(searchCondition, startDate, endDate);

			modelMap.put("gridRowJson", salesPlanInMpsAvailableList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping(value="/convertContractDetailToMps.do", method=RequestMethod.POST) //mps등록
	public ModelMap convertContractDetailToMps(@RequestBody ContractDetailInMpsAvailableTO batchList) {

		System.out.println(":::::::::::::::MPS등록 메서드 들어옴:::::::::::::::");

		//String batchList = request.getParameter("batchList");
		System.out.println("MPS등록할 값:::::::::::::::"+batchList);
		//ArrayList<ContractDetailInMpsAvailableTO> contractDetailInMpsAvailableList = gson.fromJson(batchList, new TypeToken<ContractDetailInMpsAvailableTO>(){}.getType());
		//System.out.println("gson.formJson을 통해 변환된 값:::::::::::::::::::::::::"+contractDetailInMpsAvailableList);
	try {
			HashMap<String, Object> resultMap = productionSF.convertContractDetailToMps(batchList);

			modelMap.put("result", resultMap);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping("/convertSalesPlanToMps.do")
	public ModelMap convertSalesPlanToMps(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");

//		ArrayList<SalesPlanInMpsAvailableTO> salesPlanInMpsAvailableList = gson.fromJson(batchList,
//				new TypeToken<ArrayList<SalesPlanInMpsAvailableTO>>() {
//				}.getType());

		try {

//			HashMap<String, Object> resultMap = productionSF.convertSalesPlanToMps(salesPlanInMpsAvailableList);
//
//			modelMap.put("result", resultMap);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

}
