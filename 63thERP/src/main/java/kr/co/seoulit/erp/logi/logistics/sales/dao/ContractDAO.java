package kr.co.seoulit.erp.logi.logistics.sales.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;

@Mapper
public interface ContractDAO {

	public ArrayList<ContractInfoTO> selectContractListByCustomer(String customerCode);

	public ArrayList<ContractInfoTO> selectDeliverableContractListByCustomer(String customerCode);

	
	public int selectContractCount(String contractDate);

	public void insertContract(ContractTO TO);

	public void updateContract(ContractTO TO);

	public void deleteContract(ContractTO TO);

	public ArrayList<ContractInfoTO> selectContractListByDate(HashMap<String, String> param);

	public ArrayList<ContractInfoTO> selectDeliverableContractListByDate(HashMap<String, String> param);

	public ArrayList<EstimateTO> selectEstimateListInContractAvailable(HashMap<String, String> param);

}
