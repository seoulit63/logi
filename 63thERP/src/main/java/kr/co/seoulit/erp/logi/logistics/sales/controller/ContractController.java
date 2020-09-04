package kr.co.seoulit.erp.logi.logistics.sales.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



import kr.co.seoulit.erp.logi.logistics.sales.serviceFacade.SalesServiceFacade;

import kr.co.seoulit.erp.logi.logistics.sales.to.ContractDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/logi/logistics/sales/*", produces = "application/json")
public class ContractController {

	@Autowired
	private SalesServiceFacade salesSF;

	private ModelMap modelMap = new ModelMap();

	// gson 생성
	//private static Gson gson = new GsonBuilder().serializeNulls().create(); // �냽�꽦媛믪씠 null �씤 �냽�꽦�룄 蹂��솚

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

	// -------- 수주가능한 견적 조회----------------------------------
	@GetMapping("/searchEstimateInContractAvailable")
	public ModelMap searchEstimateInContractAvailable(@RequestParam String startDate, @RequestParam String endDate) {
		System.out.println("controller _startDate=====" + startDate);
		System.out.println("controller _endDate=====" + endDate);

		ArrayList<EstimateTO> estimateListInContractAvailable = salesSF.getEstimateListInContractAvailable(startDate,
				endDate);

		modelMap.put("gridRowJson", estimateListInContractAvailable);
		modelMap.put("errorCode", 1);
		modelMap.put("errorMsg", "성공");

		return modelMap;
	}

	// ---------------견적을 수주로 등록하기-------------------------------------
	// contractTO를 다 estimateTO로 변경해야할듯
	// 수주상태(contractStatus) + 오늘날짜(contractDate) + 담당자코드(personCodeInCharge) 만
	// view에서 들고오고
	// 견적 ---> 수주 로, 견적상세 ---> 수주상세 로 넣으면 됨
	@RequestMapping("/addNewContract")
	public HashMap<String, Object> addNewContract(@RequestParam String contractStatus,
			@RequestParam String contractDate, @RequestParam String personCodeInCharge,
			@RequestBody Map<String, ArrayList<ContractTO>> contractList) {

		//

		System.out.println("=============수주 컨트롤러  -   addNewContract  () 호출====================");
		System.out.println("@@@@contractStatus======>" + contractStatus);
		System.out.println("@@@@@contractDate=====>" + contractDate);
		System.out.println("@@@@@@personCodeInCharge=======>" + personCodeInCharge);
		System.out.println("@@@@@@@@@ contractList ======> " + contractList);	

		HashMap<String, Object> resultMap = new HashMap<>();

		// EstimateTO workingContractTO = (batchList, EstimateTO.class); //수주를 등록하기 위해
		// TO객체로 만드는 곳

	//	resultMap = salesSF.addNewContract(contractDate, personCodeInCharge, contractList);

		return resultMap;

	}

	// 안쓰임(견적삭제는 견적컨트롤러에 --> 수주를 수정하려면 견적부터 수정해야함)
	@RequestMapping("/cancleEstimate.do")
	public ModelMap cancleEstimate(HttpServletRequest request, HttpServletResponse response) {

		String estimateNo = request.getParameter("estimateNo");

		salesSF.changeContractStatusInEstimate(estimateNo, "N");

		modelMap.put("errorCode", 1);
		modelMap.put("errorMsg", "�꽦怨�");
		modelMap.put("cancledEstimateNo", estimateNo);

		return modelMap;
	}

}
