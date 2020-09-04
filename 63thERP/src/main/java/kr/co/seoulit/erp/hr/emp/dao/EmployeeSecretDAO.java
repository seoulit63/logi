package kr.co.seoulit.erp.hr.emp.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.hr.emp.to.EmployeeSecretTO;


@Mapper
public interface EmployeeSecretDAO {

	public void insertEmployeeSecret(EmployeeSecretTO TO);
	
	public int selectUserPassWordCount(String companyCode, String empCode);

	public EmployeeSecretTO selectUserPassWord(HashMap<String, String> map);

	public ArrayList<EmployeeSecretTO> selectEmployeeSecretList(HashMap<String, Object> param);

}
