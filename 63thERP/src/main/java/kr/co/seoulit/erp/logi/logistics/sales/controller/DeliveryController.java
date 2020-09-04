/*¼ö  Á¤*/
package kr.co.seoulit.erp.logi.logistics.sales.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
  
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.sales.serviceFacade.SalesServiceFacade;

import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.DeliveryInfoTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/logi/logistics/sales/*", produces = "application/json")
public class DeliveryController {

	@Autowired
	private SalesServiceFacade salesSF;
	
	private ModelMap modelMap = new ModelMap();

	/*********************³³Ç°ÇöÈ² Á¶È¸ 2020-08-23 ±èÅÂÀ±***********************/
	@RequestMapping("/searchDeliveryInfoList")
	public ModelMap searchDeliveryInfoList(HttpServletRequest request, HttpServletResponse response) {

		try {

			ArrayList<DeliveryInfoTO> deliveryInfoList = salesSF.getDeliveryInfoList();

			modelMap.put("gridRowJson", deliveryInfoList);
			modelMap.put("errorCode", 0);
			modelMap.put("errorMsg", "¼º°ø");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	// batchListProcess

	public ModelMap batchListProcess(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");

		try {

//			List<DeliveryInfoTO> deliveryTOList = gson.fromJson(batchList, new TypeToken<ArrayList<DeliveryInfoTO>>() {
//			}.getType());

//			HashMap<String, Object> resultMap = salesSF.batchDeliveryListProcess(deliveryTOList);
//
//			modelMap.put("result", resultMap);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "¼º°ø");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	/*********************³³Ç°°¡´É¼öÁÖÁ¶È¸ Á¶È¸ 2020-08-23 ±èÅÂÀ±***********************/
	@RequestMapping("/searchDeliverableContractList")
	public ModelMap searchDeliverableContractList(@RequestParam String startDate, @RequestParam String endDate,@RequestParam String searchCondition, @RequestParam String customerCode) {

		try {

			ArrayList<ContractInfoTO> deliverableContractList = null;

			if (searchCondition.equals("searchByDate")) {

				String[] paramArray = { startDate, endDate };
				deliverableContractList = salesSF.getDeliverableContractList("searchByDate", paramArray);

			} else if (searchCondition.equals("searchByCustomer")) {

				String[] paramArray = { customerCode };
				deliverableContractList = salesSF.getDeliverableContractList("searchByCustomer", paramArray);

			} 

			modelMap.put("gridRowJson", deliverableContractList);
			modelMap.put("errorCode", 0);
			modelMap.put("errorMsg", "¼º°ø");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	/*********************³³Ç°°¡´É¼öÁÖÁ¶È¸ Á¶È¸ 2020-08-28 ±èÅÂÀ±***********************/
	@RequestMapping("/deliver")
	public ModelMap deliver(HttpServletRequest request, HttpServletResponse response) {

		HashMap<String,Object> resultMap = new HashMap<>();

		String contractDetailNo = request.getParameter("contractDetailNo");

		try {

			resultMap = salesSF.deliver(contractDetailNo);
			
		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

}
