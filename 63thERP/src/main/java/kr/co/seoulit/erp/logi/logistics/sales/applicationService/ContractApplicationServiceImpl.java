package kr.co.seoulit.erp.logi.logistics.sales.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.logi.logistics.sales.dao.ContractDAO;
import kr.co.seoulit.erp.logi.logistics.sales.dao.ContractDetailDAO;
import kr.co.seoulit.erp.logi.logistics.sales.dao.EstimateDAO;
import kr.co.seoulit.erp.logi.logistics.sales.dao.EstimateDetailDAO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractInfoTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.ContractTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;

@Component
public class ContractApplicationServiceImpl implements ContractApplicationService {

	@Autowired
	private ContractDAO contractDAO;
	@Autowired
	private ContractDetailDAO contractDetailDAO;
	@Autowired
	private EstimateDAO estimateDAO;
	@Autowired
	private EstimateDetailDAO estimateDetailDAO;

	
public ArrayList<ContractInfoTO> getContractList(String startDate, String endDate) {
		
		ArrayList<ContractInfoTO> contractInfoTOList = null;
		HashMap<String,String> param = new HashMap<>(); 

				param.put("startDate",startDate);
				param.put("endDate",endDate);
				
				contractInfoTOList = contractDAO.selectContractListByDate(param);

				//수주번호 들고와야함
			//	bean.setContractDetailTOList(contractDetailDAO.selectContractDetailList(bean.getContractNo()));

		return contractInfoTOList;

	}

	public ArrayList<ContractInfoTO> getDeliverableContractList(String searchCondition, String[] paramArray) {

		ArrayList<ContractInfoTO> contractInfoTOList = null;
		HashMap<String,String> param = new HashMap<>();
		
			switch (searchCondition) {

			case "searchByDate":

				String startDate = paramArray[0];
				String endDate = paramArray[1];
				
				param.put("startDate",startDate);
				param.put("endDate",endDate);
				
				contractInfoTOList = contractDAO.selectDeliverableContractListByDate(param);

				break;

			case "searchByCustomer":

				String customerCode = paramArray[0];

				contractInfoTOList = contractDAO.selectDeliverableContractListByCustomer(customerCode);

				break;

			}

			for (ContractInfoTO bean : contractInfoTOList) {

				bean.setContractDetailTOList(contractDetailDAO.selectDeliverableContractDetailList(bean.getContractNo()));

			}

		return contractInfoTOList;

	}
	
	@Override
	public ArrayList<ContractDetailTO> getContractDetailList(String contractNo) {

		return contractDetailDAO.selectContractDetailList(contractNo);
	}

	@Override
	public ArrayList<EstimateTO> getEstimateListInContractAvailable(String startDate, String endDate) {

		ArrayList<EstimateTO> estimateListInContractAvailable = null;
		HashMap<String,String> param = new HashMap<>(); 
		param.put("startDate",startDate);
		param.put("endDate",endDate);
		
			estimateListInContractAvailable = contractDAO.selectEstimateListInContractAvailable(param);
			//estimateListInContractAvailable = EstimateListInContractAvailable

			for (EstimateTO bean : estimateListInContractAvailable) {

				bean.setEstimateDetailTOList(estimateDetailDAO.selectEstimateDetailList(bean.getEstimateNo()));

			}
			
		return estimateListInContractAvailable;
	}

	@Override
	public String getNewContractNo(String contractDate) {

		StringBuffer newContractNo = null;

			int i = contractDAO.selectContractCount(contractDate)+1;
			newContractNo = new StringBuffer();
			newContractNo.append("CO");
			newContractNo.append(contractDate.replace("-", ""));
			newContractNo.append(String.format("%02d", i));	//CO + contractDate + 01

		return newContractNo.toString();
	}

	@Override
	public HashMap<String, Object> addNewContract(String contractDate, String personCodeInCharge,
			ContractTO workingContractBean) {
		
		HashMap<String, Object> param = new HashMap<>(); 
			// �깉濡쒖슫 �닔二쇱씪�젴踰덊샇 �깮�꽦
			String newContractNo = getNewContractNo(contractDate);//CO + contractDate + 01 <= 01�� 泥ル쾲吏몃씪�뒗 �쑜 2踰덉㎏�씠硫� 02 濡� 遺��뿬媛� �맖

			workingContractBean.setContractNo(newContractNo); // �깉濡쒖슫 �닔二쇱씪�젴踰덊샇 �꽭�똿
			workingContractBean.setContractDate(contractDate); // 酉곗뿉�꽌 �쟾�떖�븳 �닔二쇱씪�옄 �꽭�똿
			workingContractBean.setPersonCodeInCharge(personCodeInCharge); // 酉곗뿉�꽌 �쟾�떖�븳 �닔二쇰떞�떦�옄肄붾뱶 �꽭�똿

			contractDAO.insertContract(workingContractBean);
			
			// 寃ъ쟻 �뀒�씠釉붿뿉 �닔二쇱뿬遺� "Y" 濡� �닔�젙
			changeContractStatusInEstimate(workingContractBean.getEstimateNo(), "Y");

			param.put("estimateNo",workingContractBean.getEstimateNo());
			param.put("contractNo",newContractNo);
			
			contractDetailDAO.procedureInsertContractDetail(param);							//CO ... �닔二쇱씪�젴踰덊샇

		return param;
	}

	@Override
	public HashMap<String, Object> batchContractDetailListProcess(ArrayList<ContractDetailTO> contractDetailTOList) {

		HashMap<String, Object> resultMap = new HashMap<>();

			ArrayList<String> insertList = new ArrayList<>();
			ArrayList<String> updateList = new ArrayList<>();
			ArrayList<String> deleteList = new ArrayList<>();

			for (ContractDetailTO bean : contractDetailTOList) {

				String status = bean.getStatus();

				switch (status) {

				case "INSERT":

					/*contractDetailDAO.insertContractDetail(bean);*/
					insertList.add(bean.getContractDetailNo());

					break;

				case "UPDATE":

					/*contractDetailDAO.updateContractDetail(bean);*/
					updateList.add(bean.getContractDetailNo());

					break;

				case "DELETE":

					contractDetailDAO.deleteContractDetail(bean);
					deleteList.add(bean.getContractDetailNo());

					break;

				}

			}

			resultMap.put("INSERT", insertList);
			resultMap.put("UPDATE", updateList);
			resultMap.put("DELETE", deleteList);

		return resultMap;
	}

	public void changeContractStatusInEstimate(String estimateNo, String contractStatus) {
			
			HashMap<String,String> param = new HashMap<>(); 
			param.put("estimateNo",estimateNo);
			param.put("contractStatus",contractStatus);
		
			estimateDAO.changeContractStatusOfEstimate(param);

	}

}
