package kr.co.seoulit.erp.logi.logistics.logisticsInfo.applicationService;

import java.util.ArrayList;

import kr.co.seoulit.erp.logi.logistics.logisticsInfo.to.WarehouseTO;

public interface WarehouseApplicationService {
	
	public ArrayList<WarehouseTO> getWarehouseInfoList();

	public void modifyWarehouseInfo(WarehouseTO warehouseTO);

	public String findLastWarehouseCode();
}
