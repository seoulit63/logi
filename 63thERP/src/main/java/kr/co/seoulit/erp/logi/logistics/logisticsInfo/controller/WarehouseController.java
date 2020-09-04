package kr.co.seoulit.erp.logi.logistics.logisticsInfo.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.seoulit.erp.logi.logistics.logisticsInfo.serviceFacade.LogisticsInfoServiceFacade;

import kr.co.seoulit.erp.logi.logistics.logisticsInfo.to.WarehouseTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/logi/logisticsInfo/*")
public class WarehouseController {

	@Autowired
	private LogisticsInfoServiceFacade logisticsSF;

	private ModelMap modelMap = new ModelMap();

	@RequestMapping("/warehouseInfo.do")
	public ModelMap getWarehouseList(HttpServletRequest request, HttpServletResponse response) {

		try {
			ArrayList<WarehouseTO> WarehouseTOList = logisticsSF.getWarehouseInfoList();
			modelMap.put("gridRowJson", WarehouseTOList);
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
