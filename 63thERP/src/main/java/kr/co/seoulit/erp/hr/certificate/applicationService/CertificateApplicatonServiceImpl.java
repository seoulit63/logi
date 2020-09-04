package kr.co.seoulit.erp.hr.certificate.applicationService;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import kr.co.seoulit.erp.hr.certificate.dao.CertificateDAO;
import kr.co.seoulit.erp.hr.certificate.to.CertificateTO;

@Component
public class CertificateApplicatonServiceImpl implements CertificateApplicationService{
	@Autowired
	private CertificateDAO certificateDAO ;

	
	@Override
	public void registRequest(CertificateTO certificate) {		
		certificateDAO.insertCertificateRequest(certificate);
		}
	@Override
	public ArrayList<CertificateTO> findCertificateList(String empCode, String startDate, String endDate) {
		ArrayList<CertificateTO> certificateList=certificateDAO.selectCertificateList(empCode, startDate, endDate);
		return certificateList;
	}
	@Override
	public void removeCertificateRequest(ArrayList<CertificateTO> certificateList) {
		
		for(CertificateTO certificate : certificateList) {
			certificateDAO.deleteCertificate(certificate);
		}
		
	}
	@Override
	public ArrayList<CertificateTO> findCertificateListByDept(String deptName, String startDate, String endDate) {
		ArrayList<CertificateTO> certificateList = null;
		if(deptName.equals("모든부서")) {
			certificateList = certificateDAO.selectCertificateListByAllDept(startDate);
		}else {
			certificateList = certificateDAO.selectCertificateListByDept(deptName, startDate, endDate);
		}
		return certificateList;
	}
	@Override
	public void modifyCertificateList(ArrayList<CertificateTO> certificateList) {
		for(CertificateTO certificate : certificateList) {
			System.out.println(certificate.getApprovalStatus());
			if(certificate.getStatus().equals("update")) {
				certificateDAO.updateCertificate(certificate);
			}
		}
	}

}
