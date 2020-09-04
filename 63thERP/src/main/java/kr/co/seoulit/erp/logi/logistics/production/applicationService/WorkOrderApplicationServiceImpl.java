package kr.co.seoulit.erp.logi.logistics.production.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.logi.logistics.production.dao.WorkOrderDAO;
import kr.co.seoulit.erp.logi.logistics.production.to.ProductionPerformanceInfoTO;
import kr.co.seoulit.erp.logi.logistics.production.to.WorkOrderInfoTO;
import kr.co.seoulit.erp.logi.logistics.production.to.WorkSiteLogTO;

@Component
public class WorkOrderApplicationServiceImpl implements WorkOrderApplicationService {

		@Autowired
		private WorkOrderDAO workOrderDAO;


		@Override
		public HashMap<String,Object> getWorkOrderableMrpList() {
			HashMap<String,Object> result = new HashMap<>(); 
			
			workOrderDAO.getWorkOrderableMrpList(result);
			
			return result;
			
	}

		@Override
		public HashMap<String,Object> getWorkOrderSimulationList(String mrpNo) {

			HashMap<String,Object> param = new HashMap<>(); 
			param.put("mrpNo",mrpNo);
			
			workOrderDAO.getWorkOrderSimulationList(param);
			
			return param;
			
		}

		@Override
		public HashMap<String,Object> workOrder(String workPlaceCode,String productionProcess) {

			HashMap<String,Object> param = new HashMap<>(); 
			param.put("workPlaceCode",workPlaceCode);
			param.put("productionProcess",productionProcess);
			
			workOrderDAO.workOrder(param);	
			
        	return param;
			
		}

		@Override
		public ArrayList<WorkOrderInfoTO> getWorkOrderInfoList() {
			
			return workOrderDAO.selectWorkOrderInfoList();
			
		}

		@Override
		public HashMap<String,Object> workOrderCompletion(String workOrderNo,String actualCompletionAmount) {
			
			HashMap<String,Object> param = new HashMap<>(); 
			param.put("workOrderNo",workOrderNo);
			param.put("actualCompletionAmount",actualCompletionAmount);
			
			workOrderDAO.workOrderCompletion(param);
			
        	return param;
		}
		
		@Override
		public ArrayList<ProductionPerformanceInfoTO> getProductionPerformanceInfoList() {

			return workOrderDAO.selectProductionPerformanceInfoList();
			
		}

		@Override
		public HashMap<String,Object> showWorkSiteSituation(String workSiteCourse,String workOrderNo,String itemClassIfication) {

			HashMap<String,Object> param = new HashMap<>(); 
			param.put("workSiteCourse",workSiteCourse);
			param.put("workOrderNo",workOrderNo);
			param.put("itemClassIfication",itemClassIfication);
			
			workOrderDAO.selectWorkSiteSituation(param);
			
			return param;
		}

		@Override
		public void workCompletion(String workOrderNo, String itemCode ,  ArrayList<String> itemCodeListArr) {

				String itemCodeList=itemCodeListArr.toString().replace("[", "").replace("]", "");
				HashMap<String,Object> param = new HashMap<>(); 
				param.put("workOrderNo",workOrderNo);
				param.put("itemCode",itemCode);
				param.put("itemCodeList",itemCodeList);

				workOrderDAO.updateWorkCompletionStatus(param);

		}

		@Override
		public HashMap<String, Object> workSiteLogList(String workSiteLogDate) {
			
			HashMap<String, Object> result = new HashMap<>();
			List<WorkSiteLogTO> list = workOrderDAO.workSiteLogList(workSiteLogDate);
			result.put("result", list);

			return result;
		}
		
}
