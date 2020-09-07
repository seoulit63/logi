package kr.co.seoulit.erp.logi.logistics.sales.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.logi.logistics.sales.to.ContractDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;

public interface ContractApplicationService {

	// ---------- 수주검색
	public ArrayList<ContractInfoTO> getContractList(String startDate, String endDate);

	public ArrayList<ContractDetailTO> getContractDetailList(String estimateNo);
	
	public ArrayList<EstimateTO> getEstimateListInContractAvailable(String startDate, String endDate);

//************************* 2020.09.04 63기 양지훈 수정 시작 *************************
//	description:	파라미터 타입 & 이름 변경
//					주석 변경
	
	// ApplicationService 안에서만 호출
	public String getNewContractNo(String contractDate);

	public HashMap<String, Object> addNewContract(String contractDate, String personCodeInCharge, ContractTO workingContractTO);

//************************* 2020.09.04 63기 양지훈 수정 종료 *************************
	public HashMap<String, Object> batchContractDetailListProcess(ArrayList<ContractDetailTO> contractDetailTOList);

	public void changeContractStatusInEstimate(String estimateNo , String contractStatus);
	
	public ArrayList<ContractInfoTO> getDeliverableContractList(String searchCondition, String[] paramArray);

}
