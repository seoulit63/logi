package kr.co.seoulit.erp.acc.company.applicationService;

import java.util.ArrayList;

import kr.co.seoulit.erp.acc.company.to.WorkplaceBean;

public interface AccWorkplaceApplicationService {
	
	public void eliminationWorkplace(ArrayList<String> getCodes); 

	public void workPlaceAdd(WorkplaceBean workplaceBean);
    
    public WorkplaceBean getWorkplace(String workplaceCode); 
    
    public ArrayList<WorkplaceBean> getAllWorkplaceList(); 
    
    public void updateApprovalStatus(ArrayList<String> getCodes,String status); 
}
