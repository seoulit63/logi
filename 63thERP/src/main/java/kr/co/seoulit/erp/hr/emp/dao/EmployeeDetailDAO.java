package kr.co.seoulit.erp.hr.emp.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.hr.emp.to.EmployeeDetailTO;


@Mapper
public interface EmployeeDetailDAO {
	
	public ArrayList<EmployeeDetailTO> selectUserIdList(String companyCode);
	
	public void insertEmployeeDetail(EmployeeDetailTO TO);

	public ArrayList<EmployeeDetailTO> selectEmployeeDetailList(HashMap<String, Object> param);
	

}
