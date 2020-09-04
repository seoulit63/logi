package kr.co.seoulit.erp.hr.emp.dao;

import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.erp.hr.emp.to.EmpInfoTO;
import kr.co.seoulit.erp.hr.emp.to.EmployeeSecretTO;


@Mapper
public interface EmpSearchingDAO {

	public EmpInfoTO getTotalEmpInfo(HashMap<String, String> map);

	public EmployeeSecretTO selectAllEmpList(HashMap<String, Object> param);
		
}
