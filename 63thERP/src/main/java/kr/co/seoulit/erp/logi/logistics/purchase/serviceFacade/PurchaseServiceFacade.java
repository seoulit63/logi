package kr.co.seoulit.erp.logi.logistics.purchase.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.logi.logistics.purchase.to.BomDeployTO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.BomInfoTO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.BomTO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.OrderInfoTO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.StockLogTO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.StockTO;

public interface PurchaseServiceFacade {

	public ArrayList<BomDeployTO> getBomDeployList(String deployCondition, String itemCode, String itemClassificationCondition);
	
	public ArrayList<BomInfoTO> getBomInfoList(String parentItemCode);
	
	public ArrayList<BomInfoTO> getAllItemWithBomRegisterAvailable();
	
	public HashMap<String, Object> batchBomListProcess(ArrayList<BomTO> batchBomList);
	
	public HashMap<String,Object> getOrderList(String startDate, String endDate);
	
	public HashMap<String,Object> getOrderDialogInfo(ArrayList<String> mrpNoArr);
	
	public HashMap<String,Object> order(ArrayList<String> mrpGatheringNoList);
	
	public HashMap<String,Object> optionOrder(String itemCode, String itemAmount);
	
	public HashMap<String,Object> warehousing(ArrayList<String> orderNoArr);
	
	public ArrayList<StockTO> getStockList();
	
	public ArrayList<StockLogTO> getStockLogList(String startDate,String endDate);
	
	public ArrayList<OrderInfoTO> getOrderInfoListOnDelivery();
	
	public ArrayList<OrderInfoTO> getOrderInfoList(String startDate,String endDate);
}
