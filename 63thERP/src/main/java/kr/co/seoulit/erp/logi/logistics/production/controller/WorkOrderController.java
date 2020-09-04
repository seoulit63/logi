package kr.co.seoulit.erp.logi.logistics.production.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.production.serviceFacade.ProductionServiceFacade;

import kr.co.seoulit.erp.logi.logistics.production.to.ProductionPerformanceInfoTO;
import kr.co.seoulit.erp.logi.logistics.production.to.WorkOrderInfoTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/production/*")
public class WorkOrderController {

	@Autowired
	private ProductionServiceFacade productionSF;
	
	private ModelMap modelMap = new ModelMap();
	
	@RequestMapping("/getWorkOrderableMrpList.do")
	public HashMap<String, Object> getWorkOrderableMrpList(HttpServletRequest request, HttpServletResponse response) {

		HashMap<String, Object> resultMap = new HashMap<>();

		try {

			resultMap = productionSF.getWorkOrderableMrpList();
			
		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}
		return resultMap;
	}

	@RequestMapping("/showWorkOrderDialog.do")
	public HashMap<String, Object> showWorkOrderDialog(HttpServletRequest request, HttpServletResponse response) {

		String mrpNo = request.getParameter("mrpNo");
		
		HashMap<String,Object> resultMap = new HashMap<>();

		try {
			resultMap = productionSF.getWorkOrderSimulationList(mrpNo);

		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}
		return resultMap;
	}

	@RequestMapping("/workOrder.do")
	public HashMap<String, Object> workOrder(HttpServletRequest request, HttpServletResponse response) {

		String workPlaceCode = request.getParameter("workPlaceCode");
		String productionProcess = request.getParameter("productionProcessCode");
		HashMap<String,Object> resultMap = new HashMap<>();

		try {

			resultMap = productionSF.workOrder(workPlaceCode,productionProcess);

		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}
		return resultMap;
	}

	@RequestMapping("/showWorkOrderInfoList.do")
	public ModelMap showWorkOrderInfoList(HttpServletRequest request, HttpServletResponse response) {

		ArrayList<WorkOrderInfoTO> workOrderInfoList = null;

		try {

			workOrderInfoList = productionSF.getWorkOrderInfoList();

			modelMap.put("gridRowJson", workOrderInfoList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	@RequestMapping("/workOrderCompletion.do")
	public HashMap<String, Object> workOrderCompletion(HttpServletRequest request, HttpServletResponse response) {

		String workOrderNo=request.getParameter("workOrderNo");
		String actualCompletionAmount=request.getParameter("actualCompletionAmount");
		HashMap<String, Object> resultMap = new HashMap<>();

		try {

			resultMap = productionSF.workOrderCompletion(workOrderNo,actualCompletionAmount);

		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}
		return resultMap;
	}
	
	@RequestMapping("/getProductionPerformanceInfoList.do")
	public ModelMap getProductionPerformanceInfoList(HttpServletRequest request, HttpServletResponse response) {
		
		ArrayList<ProductionPerformanceInfoTO> productionPerformanceInfoList = null;

		try {

			productionPerformanceInfoList = productionSF.getProductionPerformanceInfoList();

			modelMap.put("gridRowJson", productionPerformanceInfoList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	@RequestMapping("/showWorkSiteSituation.do")
	public HashMap<String, Object> showWorkSiteSituation(HttpServletRequest request, HttpServletResponse response) {

		HashMap<String, Object> resultMap = new HashMap<>();
		
		String workSiteCourse = request.getParameter("workSiteCourse");
		String workOrderNo = request.getParameter("workOrderNo");
		String itemClassIfication = request.getParameter("itemClassIfication");

		try {

			resultMap = productionSF.showWorkSiteSituation(workSiteCourse,workOrderNo,itemClassIfication);
			System.out.println(resultMap.get("result"));
		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}
		return resultMap;
	}
	
	@RequestMapping("/workCompletion.do")
	public ModelMap workCompletion(HttpServletRequest request, HttpServletResponse response) {
		
//		String workOrderNo = request.getParameter("workOrderNo");
//		String itemCode = request.getParameter("itemCode");
//		String itemCodeList = request.getParameter("itemCodeList");
//		ArrayList<String> itemCodeListArr = gson.fromJson(itemCodeList,
//				new TypeToken<ArrayList<String>>() {}.getType());

		try {

//			productionSF.workCompletion(workOrderNo,itemCode,itemCodeListArr);

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}
	
	@RequestMapping("/workSiteLog.do")
	public HashMap<String, Object> workSiteLogList(HttpServletRequest request, HttpServletResponse response) {

		String workSiteLogDate = request.getParameter("workSiteLogDate");
		
		HashMap<String, Object> resultMap = new HashMap<>();

		try {

			resultMap=productionSF.workSiteLogList(workSiteLogDate);
			
		} catch (Exception e2) {
			e2.printStackTrace();
			resultMap.put("errorCode", -2);
			resultMap.put("errorMsg", e2.getMessage());

		}
		return resultMap;
	}
	
}
