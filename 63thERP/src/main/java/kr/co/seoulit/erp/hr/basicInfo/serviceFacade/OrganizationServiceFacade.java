package kr.co.seoulit.erp.hr.basicInfo.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.hr.basicInfo.to.CompanyTO;
import kr.co.seoulit.erp.hr.basicInfo.to.DepartmentTO;
import kr.co.seoulit.erp.hr.basicInfo.to.PositionTO;
import kr.co.seoulit.erp.hr.basicInfo.to.WorkplaceTO;

public interface OrganizationServiceFacade {

   public ArrayList<CompanyTO> getCompanyList();
   
   public ArrayList<WorkplaceTO> getWorkplaceList(String companyCode);

   public ArrayList<DepartmentTO> getDepartmentList(String searchCondition, String companyCode,
         String workplaceCode);
   
   public HashMap<String, Object> batchCompanyListProcess(ArrayList<CompanyTO> companyList);
   
   public HashMap<String, Object> batchWorkplaceListProcess(ArrayList<WorkplaceTO> workplaceList);
      
   public HashMap<String, Object> batchDepartmentListProcess(ArrayList<DepartmentTO> departmentList);

   public ArrayList<PositionTO> getPositionList();


}