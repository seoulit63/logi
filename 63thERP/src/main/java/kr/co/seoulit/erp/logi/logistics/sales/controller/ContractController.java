package kr.co.seoulit.erp.logi.logistics.sales.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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

import kr.co.seoulit.erp.logi.logistics.sales.serviceFacade.SalesServiceFacade;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;


@CrossOrigin("*")
@RestController
//************************* 2020.09.04 63기 양지훈 수정 시작 *************************
//description:	url 변경
@RequestMapping(value = "/logi/sales/*", produces = "application/json")
//************************* 2020.09.04 63기 양지훈 수정 종료 *************************
public class ContractController {

	@Autowired
	private SalesServiceFacade salesSF;

	// Gson 생성
	private static Gson gson = new GsonBuilder().serializeNulls().create();
	private ModelMap modelMap = new ModelMap();

	// ------------------- 수주조회
	@RequestMapping("/searchContract")
	public ModelMap searchContract(@RequestParam String startDate, @RequestParam String endDate) {

		ArrayList<ContractInfoTO> contractInfoTOList = null;
		contractInfoTOList = salesSF.getContractList(startDate, endDate);

		// if (searchCondition.equals("searchByDate")) {
		//
		// String[] paramArray = { startDate, endDate };
		// contractInfoTOList = salesSF.getContractList("searchByDate", paramArray);
		//
		// } else if (searchCondition.equals("searchByCustomer")) {
		//
		// String[] paramArray = { customerCode };
		// contractInfoTOList = salesSF.getContractList("searchByCustomer", paramArray);
		//
		// }

		modelMap.put("gridRowJson", contractInfoTOList);
		modelMap.put("errorCode", 1);
		modelMap.put("errorMsg", "성공");

		return modelMap;
	}

	// 안쓰임
	// public ModelMap searchContractNO(HttpServletRequest request,
	// HttpServletResponse response) {
	//
	// String searchCondition = request.getParameter("searchCondition");
	//
	// ArrayList<ContractInfoTO> contractInfoTOList = null;
	// if (searchCondition.equals("searchByDate")) {
	// String customerCode = "";
	// String[] paramArray = { customerCode };
	// contractInfoTOList = salesSF.getContractList("searchByCustomer", paramArray);
	//
	// }
	//
	// modelMap.put("gridRowJson", contractInfoTOList);
	// modelMap.put("errorCode", 1);
	// modelMap.put("errorMsg", "�꽦怨�");
	//
	// return modelMap;
	// }

	@RequestMapping("/searchContractDetail")
	public ModelMap searchContractDetail(@RequestParam String contractNo) {
		System.out.println("controller -searchContractDetail() ");

		ArrayList<ContractDetailTO> contractDetailTOList = salesSF.getContractDetailList(contractNo);

		modelMap.put("gridRowJson", contractDetailTOList);
		modelMap.put("errorCode", 1);
		modelMap.put("errorMsg", "성공");

		return modelMap;
	}

//************************* 2020.09.05 63기 양지훈 수정 시작 *************************
//description:	ModelMap을 HashMap으로 변경;

	/* 수주가능한 견적 조회 */
	@RequestMapping("/searchEstimateInContractAvailable.do")
	public HashMap<String, Object> searchEstimateInContractAvailable(
			@RequestParam String startDate, @RequestParam String endDate) {
//		System.out.println("	@ startDate=====>" + startDate);
//		System.out.println("	@ endDate=====>" + endDate);
		ArrayList<EstimateTO> estimateListInContractAvailable = 
				salesSF.getEstimateListInContractAvailable(startDate, endDate);
//		System.out.println("		@ searchEstimateInContractAvailable_estimateListInContractAvailable : "+estimateListInContractAvailable);
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("gridRowJson", estimateListInContractAvailable);
		resultMap.put("errorCode", 1);
		resultMap.put("errorMsg", "성공");

		return resultMap;
	}
//************************* 2020.09.05 63기 양지훈 수정 종료 *************************
	
//************************* 2020.09.04 63기 양지훈 수정 시작 *************************
//	description:	메서드 내용 전부 변경
//					view에서 넘기는 data안에 띄어쓰기가 있으면 값을 받지 못한다; 이유는 아직 모름;

	/* 수주등록 */
	@RequestMapping(value="/addNewContract.do", method=RequestMethod.POST)
	public HashMap<String, Object> addNewContract(@RequestBody Map<String,Object> params) {
		String batchList = params.get("batchList").toString();
		String contractDate = params.get("contractDate").toString();
		String personCodeInCharge = params.get("personCodeInCharge").toString();
		ContractTO workingContractTO = gson.fromJson(batchList, ContractTO.class);
//		System.out.println("	@ params======>" + params);
//		System.out.println("	@ batchList======>" + batchList);
//		System.out.println("	@ contractDate======>" + contractDate);
//		System.out.println("	@ personCodeInCharge======>" + personCodeInCharge);
//		System.out.println("	@ workingContractTO======>" + workingContractTO);
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap = salesSF.addNewContract(contractDate, personCodeInCharge, workingContractTO);
		return resultMap;
	}

//************************* 2020.09.05 63기 양지훈 수정 종료 *************************

//************************* 2020.09.05 63기 양지훈 수정 시작 *************************
//	description:	errorMsg utf-8로 변경

	@RequestMapping(value="/cancelEstimate.do")
	public ModelMap cancleEstimate(@RequestParam("estimateNo") String estimateNo) {
		System.out.println("	@ params======>" + estimateNo);
		salesSF.changeContractStatusInEstimate(estimateNo, "N");
		modelMap.put("canceldEstimateNo", estimateNo);
		modelMap.put("errorCode", 1);
		modelMap.put("errorMsg", "성공");
		return modelMap;
	}
//************************* 2020.09.06 63기 양지훈 수정 종료 *************************
}
