package kr.co.seoulit.erp.logi.logistics.purchase.controller;

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
import kr.co.seoulit.erp.logi.logistics.purchase.serviceFacade.PurchaseServiceFacade;

import kr.co.seoulit.erp.logi.logistics.purchase.to.OrderInfoTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/logi/purchase/*", produces ="application/json")
public class OrderController {

	@Autowired
	private PurchaseServiceFacade purchaseSF;

	private ModelMap modelMap = new ModelMap();

	@RequestMapping("/getOrderList.do")
	public HashMap<String, Object> getOrderList(HttpServletRequest request, HttpServletResponse response) {

		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		HashMap<String, Object> resultMap = new HashMap<>();

		try {

			resultMap = purchaseSF.getOrderList(startDate, endDate);

		} catch (Exception e2) {
			
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}

		return resultMap;
		
	}

	@RequestMapping("/showOrderDialog")
	public HashMap<String, Object> openOrderDialog(@RequestParam ArrayList<String> mrpGatheringNoList) {
		System.out.println("mrpGatheringNoListStr:"+mrpGatheringNoList);
//		String mrpGatheringNoListStr = request.getParameter("mrpGatheringNoList");
//		ArrayList<String> mrpGatheringNoListArr = gson.fromJson(mrpGatheringNoListStr, new TypeToken<ArrayList<String>>() {
//		}.getType());
		System.out.println("오잉");
		HashMap<String,Object> resultMap = new HashMap<>();

		try {

			resultMap = purchaseSF.getOrderDialogInfo(mrpGatheringNoList);

		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}

		return resultMap;
		
	}

	@RequestMapping("/showOrderInfo.do")
	public ModelMap showOrderInfo(HttpServletRequest request, HttpServletResponse response) {
		
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		try {

			ArrayList<OrderInfoTO> orderInfoList = purchaseSF.getOrderInfoList(startDate,endDate);
			modelMap.put("gridRowJson", orderInfoList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}
	
	@RequestMapping("/searchOrderInfoListOnDelivery.do")
	public ModelMap searchOrderInfoListOnDelivery(HttpServletRequest request, HttpServletResponse response) {

		try {

			ArrayList<OrderInfoTO> orderInfoListOnDelivery = purchaseSF.getOrderInfoListOnDelivery();
			modelMap.put("gridRowJson", orderInfoListOnDelivery);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		
		return modelMap;
	}

	@RequestMapping("/order.do")
	public ModelMap order(HttpServletRequest request, HttpServletResponse response) {

		HashMap<String, Object> resultMap = new HashMap<>();
//		String mrpGatheringNoListStr = request.getParameter("mrpGatheringNoList");
//		ArrayList<String> mrpGatheringNoList = gson.fromJson(mrpGatheringNoListStr, new TypeToken<ArrayList<String>>() {
//		}.getType());
		try {
///////////////////////////////�떆�옉遺�
//			resultMap = purchaseSF.order(mrpGatheringNoList);

		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	@RequestMapping("/optionOrder.do")
	public ModelMap optionOrder(HttpServletRequest request, HttpServletResponse response) {

		HashMap<String, Object> resultMap = new HashMap<>();

		try {

			String itemCode = request.getParameter("itemCode");
			String itemAmount = request.getParameter("itemAmount");

			resultMap = purchaseSF.optionOrder(itemCode, itemAmount);

		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}
		
		return modelMap;
		
	}
	
	

}
