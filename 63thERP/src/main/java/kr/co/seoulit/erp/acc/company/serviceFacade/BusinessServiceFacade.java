package kr.co.seoulit.erp.acc.company.serviceFacade;

import java.util.ArrayList;

import kr.co.seoulit.erp.acc.company.to.BusinessBean;
import kr.co.seoulit.erp.acc.company.to.DetailBusinessBean;

public interface BusinessServiceFacade {
	public ArrayList<BusinessBean> getBusinessList(); 
	
	public ArrayList<DetailBusinessBean> getDetailBusiness(String businessName); 
}
