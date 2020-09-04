package kr.co.seoulit.erp.hr.emp.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.erp.hr.emp.to.EmpTO;
import kr.co.seoulit.erp.hr.emp.to.EmployeeBasicTO;
import kr.co.seoulit.erp.hr.emp.to.RegistEMPTO;


@Mapper
public interface EmpDAO {
   
   public EmpTO selectEmp(String empno);
   public String selectLastEmpCode();
   public ArrayList<EmpTO> selectEmpList();
   public ArrayList<EmpTO> selectEmpListD(String dept);
   public ArrayList<EmpTO> selectEmpListN(String name);
   public String getEmpCode(String name);
	public void registEmployee(RegistEMPTO emp);
   public void updateEmployee(Map<String, ArrayList<EmpTO>> empArray);
   public void deleteEmployee(EmpTO emp);
   public ArrayList<EmpTO> selectEmployee(HashMap<String, String> map);
   
}