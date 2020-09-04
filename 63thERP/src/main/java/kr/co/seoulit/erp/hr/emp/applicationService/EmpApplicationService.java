package kr.co.seoulit.erp.hr.emp.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import kr.co.seoulit.erp.hr.base.to.DeptTO;
/*import kr.co.seoulit.erp.hr.emp.dao.object;*/
import kr.co.seoulit.erp.hr.emp.to.EmpTO;
import kr.co.seoulit.erp.hr.emp.to.EmployeeBasicTO;
import kr.co.seoulit.erp.hr.emp.to.RegistEMPTO;
import kr.co.seoulit.erp.hr.salary.to.BaseSalaryTO;

public interface EmpApplicationService {
   public EmpTO selectEmp(String name);
   public String findLastEmpCode();
   
   public ArrayList<EmpTO> findEmployeeListByDept(String deptName);
   public void registEmployee(RegistEMPTO emp);

   /* public void modifyEmployee(EmpTO emp); */
   public void deleteEmpList(ArrayList<EmpTO> empList);
   public ArrayList<DeptTO> findDeptList();   
   
   public ArrayList<BaseSalaryTO> selectPositionList();
   public ArrayList<EmpTO> findAllEmpInfo(HashMap<String, String> map);
   public void empInfoUpdate(Map<String, ArrayList<EmpTO>> empArray);
   
}