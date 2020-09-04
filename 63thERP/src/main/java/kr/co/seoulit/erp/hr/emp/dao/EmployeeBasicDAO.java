package kr.co.seoulit.erp.hr.emp.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.hr.emp.to.EmployeeBasicTO;


@Mapper
public interface EmployeeBasicDAO {

	public ArrayList<EmployeeBasicTO> selectEmployeeBasicList(String companyCode);
	
	public void insertEmployeeBasic(EmployeeBasicTO TO);

	public EmployeeBasicTO selectEmployeeBasicTO(HashMap<String, Object> param);

	public void changeUserAccountStatus(HashMap<String, String> param);
	
}
