package kr.co.seoulit.erp.hr.emp.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.erp.hr.emp.to.LicenseInfoTO;

@Mapper

public interface LicenseInfoDAO {
	public ArrayList<LicenseInfoTO> selectLicenseList(String code);

	public void insertLicenseInfo(LicenseInfoTO licenscInfo);
	public void updateLicenseInfo(LicenseInfoTO licenscInfo);
	public void deleteLicenseInfo(LicenseInfoTO licenscInfo);
}
