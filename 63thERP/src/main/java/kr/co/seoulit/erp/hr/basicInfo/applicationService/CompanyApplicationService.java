package kr.co.seoulit.erp.hr.basicInfo.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.hr.basicInfo.to.CompanyTO;
import kr.co.seoulit.erp.hr.basicInfo.to.PositionTO;

public interface CompanyApplicationService {

   public ArrayList<CompanyTO> getCompanyList();
   
   public String getNewCompanyCode();
   
   public HashMap<String, Object> batchCompanyListProcess(ArrayList<CompanyTO> companyList);

   public ArrayList<PositionTO> positionList();
   
   
   
}