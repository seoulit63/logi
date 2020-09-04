
package kr.co.seoulit.erp.hr.emp.sf;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.hr.base.to.DeptTO;
import kr.co.seoulit.erp.hr.emp.applicationService.EmpApplicationService;

import kr.co.seoulit.erp.hr.emp.to.EmpTO;
import kr.co.seoulit.erp.hr.emp.to.EmployeeBasicTO;
import kr.co.seoulit.erp.hr.emp.to.RegistEMPTO;


@Service
public class EmpServiceFacadeImpl implements EmpServiceFacade {
   @Autowired
   private EmpApplicationService empApplicationService;   
   
   @Override
   public EmpTO getEmp(String name) {
      // TODO Auto-generated method stub      
      EmpTO empto = null;
      empto = empApplicationService.selectEmp(name);
      return empto;
   }

   @Override
   public String findLastEmpCode() {      // 
      String empCode = empApplicationService.findLastEmpCode();
      return empCode;      
   }

	@Override
	public void registEmployee(RegistEMPTO emp) {
		empApplicationService.registEmployee(emp);	
	}

   @Override
   public List<EmpTO> findEmpList(String dept) {
      ArrayList<EmpTO> empList = empApplicationService.findEmployeeListByDept(dept);
      return empList;
   }

   @Override
   public ArrayList<EmpTO> findAllEmpInfo(HashMap<String, String> map) {
      
      ArrayList<EmpTO> empDetailedList = null;
      try {
         System.out.println("=============================EmpServiceFacadeImpl===================================");
               
         
         empDetailedList = empApplicationService.findAllEmpInfo(map);

      } catch (DataAccessException e) {
         e.printStackTrace();
         throw e;
      }

      return empDetailedList;
      
   }

   /*
    * @Override public void modifyEmployee(EmpTO emp) {
    * empApplicationService.modifyEmployee(emp); }
    */
   @Override
   public void deleteEmpList(ArrayList<EmpTO> empList) {
      empApplicationService.deleteEmpList(empList);
   }

   @Override
   public ArrayList<DeptTO> findDeptList() {
      ArrayList<DeptTO> deptList = empApplicationService.findDeptList();      
      return deptList;
   }

	@Override
	public void empInfoUpdate(Map<String, ArrayList<EmpTO>> empArray) {
		

			System.out.println("=============================EmpServiceFacadeImpl===================================");
			empApplicationService.empInfoUpdate(empArray);

	}


}