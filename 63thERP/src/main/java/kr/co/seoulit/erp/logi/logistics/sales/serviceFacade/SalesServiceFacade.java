package kr.co.seoulit.erp.logi.logistics.sales.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.erp.logi.logistics.sales.to.ContractDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.DeliveryInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.SalesPlanTO;

public interface SalesServiceFacade {

	
	// EstimateApplicationServiceImpl
	public ArrayList<EstimateTO> getEstimateList(String dateSearchCondition, String startDate, String endDate);

	public ArrayList<EstimateDetailTO> getEstimateDetailList(String estimateNo);
	
	public HashMap<String, Object> addNewEstimate(String estimateDate, EstimateTO newEstimateTO);

	public HashMap<String, Object> batchEstimateDetailListProcess(ArrayList<EstimateDetailTO> estimateDetailTOList);	
	
	
	// ContractApplicationServiceImpl
	public ArrayList<ContractInfoTO> getContractList(String startDate, String endDate);

	public ArrayList<ContractInfoTO> getDeliverableContractList(String searchCondition, String[] paramArray);
	
	public ArrayList<ContractDetailTO> getContractDetailList(String estimateNo);
	
	public ArrayList<EstimateTO> getEstimateListInContractAvailable(String startDate, String endDate);

//************************* 2020.09.04 63기 양지훈 수정 시작 *************************
//	description:	파라미터 타입 & 이름 변경
	
	public HashMap<String, Object> addNewContract(String contractDate, String personCodeInCharge, ContractTO workingContractTO);

//************************* 2020.09.04 63기 양지훈 수정 종료 *************************
	
	public HashMap<String, Object> batchContractDetailListProcess(ArrayList<ContractDetailTO> contractDetailTOList);
	
	public void changeContractStatusInEstimate(String estimateNo , String contractStatus);
	
	
	// SalesPlanApplicationServiceImpl
	public ArrayList<SalesPlanTO> getSalesPlanList(String dateSearchCondition, String startDate, String endDate);
	
	public HashMap<String, Object> batchSalesPlanListProcess(ArrayList<SalesPlanTO> salesPlanTOList);

	public HashMap<String, Object> batchDeliveryListProcess(List<DeliveryInfoTO> deliveryTOList);

	public HashMap<String, Object> deliver(String contractDetailNo);
	
	public ArrayList<DeliveryInfoTO> getDeliveryInfoList();
	
}
