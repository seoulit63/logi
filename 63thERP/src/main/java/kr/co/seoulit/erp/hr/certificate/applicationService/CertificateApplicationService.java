package kr.co.seoulit.erp.hr.certificate.applicationService;

import java.util.ArrayList;

import kr.co.seoulit.erp.hr.certificate.to.CertificateTO;

public interface CertificateApplicationService {
	public void registRequest(CertificateTO certificate);
	public ArrayList<CertificateTO> findCertificateList(String empCode, String startDate,String endDate);
	public void removeCertificateRequest(ArrayList<CertificateTO> certificateList);
	public ArrayList<CertificateTO> findCertificateListByDept(String deptName, String startDate, String endDate);
	public void modifyCertificateList(ArrayList<CertificateTO> certificateList);
}
