package kr.co.seoulit.erp.acc.company.applicationService;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.acc.company.dao.BusinessDAO;
import kr.co.seoulit.erp.acc.company.dao.DetailBusinessDAO;
import kr.co.seoulit.erp.acc.company.to.BusinessBean;
import kr.co.seoulit.erp.acc.company.to.DetailBusinessBean;

@Component
public class BusinessApplicationServiceImpl implements BusinessApplicationService{
        @Autowired
	    private BusinessDAO businessDAO; 	    
        @Autowired
	    private DetailBusinessDAO detailbusinessDAO;
	    
	    public void setBusinessDAO(BusinessDAO businessDAO){
	    	this.businessDAO = businessDAO;
	    }
	    public void setDetailBusinessDAO(DetailBusinessDAO detailbusinessDAO){
	    	this.detailbusinessDAO = detailbusinessDAO;
	    };
	    
	   @Override
	    public ArrayList<BusinessBean> getBusinessList() {
	        return businessDAO.selectBusinessList();
	    }
	    
	    @Override
	    public ArrayList<DetailBusinessBean> getDetailBusiness(String businessCode) {
	        return detailbusinessDAO.selectDetailBusinessList(businessCode);
	    }
	    

}
