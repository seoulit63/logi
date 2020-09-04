package kr.co.seoulit.erp.hr.emp.sf;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.co.seoulit.erp.hr.base.to.DeptTO;
/*import kr.co.seoulit.erp.hr.emp.dao.object;*/
import kr.co.seoulit.erp.hr.emp.to.EmpTO;
import kr.co.seoulit.erp.hr.emp.to.EmployeeBasicTO;
import kr.co.seoulit.erp.hr.emp.to.RegistEMPTO;

public interface EmpServiceFacade {
   public EmpTO getEmp(String name); //selectEmp
   public String findLastEmpCode();
   public  ArrayList<EmpTO> findAllEmpInfo(HashMap<String, String> map);   
   public List<EmpTO> findEmpList(String dept); //findEmployeeListByDept
   public void registEmployee(RegistEMPTO emp);

   /* public void modifyEmployee(EmpTO emp); */
   public void deleteEmpList(ArrayList<EmpTO> empList);
   public ArrayList<DeptTO> findDeptList();
   public void empInfoUpdate(Map<String, ArrayList<EmpTO>> empArray);
   
}