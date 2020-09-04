package kr.co.seoulit.erp.hr.emp.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import kr.co.seoulit.erp.hr.base.applicationService.HrBaseApplicationService;
import kr.co.seoulit.erp.hr.base.dao.DeptDAO;
import kr.co.seoulit.erp.hr.base.to.DeptTO;
import kr.co.seoulit.erp.hr.emp.dao.CareerInfoDAO;
import kr.co.seoulit.erp.hr.emp.dao.EducationInfoDAO;
import kr.co.seoulit.erp.hr.emp.dao.EmpDAO;
import kr.co.seoulit.erp.hr.emp.dao.FamilyInfoDAO;
import kr.co.seoulit.erp.hr.emp.dao.LicenseInfoDAO;
import kr.co.seoulit.erp.hr.emp.dao.WorkInfoDAO;
/*import kr.co.seoulit.erp.hr.emp.dao.object;*/
import kr.co.seoulit.erp.hr.emp.to.CareerInfoTO;
import kr.co.seoulit.erp.hr.emp.to.EducationInfoTO;
import kr.co.seoulit.erp.hr.emp.to.EmpTO;
import kr.co.seoulit.erp.hr.emp.to.EmployeeBasicTO;
import kr.co.seoulit.erp.hr.emp.to.FamilyInfoTO;
import kr.co.seoulit.erp.hr.emp.to.LicenseInfoTO;
import kr.co.seoulit.erp.hr.emp.to.RegistEMPTO;
import kr.co.seoulit.erp.hr.emp.to.WorkInfoTO;
import kr.co.seoulit.erp.hr.salary.applicationService.SalaryApplicationService;

import kr.co.seoulit.erp.hr.salary.to.BaseSalaryTO;

@Component
public class EmpApplicationServiceImpl implements EmpApplicationService {
   
   @Autowired
   SalaryApplicationService salaryApplicationService;
   @Autowired
   HrBaseApplicationService baseApplicationService;   
   @Autowired
   private EmpDAO empDAO ;
   @Autowired
   private WorkInfoDAO workInfoDAO ;
   @Autowired
   private CareerInfoDAO careerInfoDAO ;
   @Autowired
   private EducationInfoDAO educationInfoDAO ;
   @Autowired
   private LicenseInfoDAO licenseInfoDAO ;
   @Autowired
   private FamilyInfoDAO familyInfoDAO ;
   @Autowired
   private DeptDAO deptDAO ;   
   
   @Override
   public EmpTO selectEmp(String name) {   
      EmpTO empto = empDAO.selectEmp(name);      
      return empto;
   }
   @Override
   public String findLastEmpCode() {   
      String empCode = empDAO.selectLastEmpCode();      
      return empCode;
   }

   @Override
	public void registEmployee(RegistEMPTO emp) {	
		System.out.println("프로시저 호출 시작 "+emp);
		empDAO.registEmployee(emp);
		System.out.println("프로시저 호출 끝 ");
		//baseApplicationService.registEmpCode(emp);			
	}


   @Override
   public ArrayList<EmpTO> findEmployeeListByDept(String deptName) {   
      ArrayList<EmpTO> empList = null;   
      
      if (deptName.equals("��ü�μ�")) {
         empList = empDAO.selectEmpList();
      } else if (deptName.substring(deptName.length()-1, deptName.length()).equals("��")) {
         empList = empDAO.selectEmpListD(deptName);
      } else {
         empList = empDAO.selectEmpListN(deptName);
      }      
      return empList;
   }
   



   /*
    * @Override public void modifyEmployee(EmpTO emp) {
    * 
    * if (emp.getStatus().equals("update")) { empDAO.updateEmployee(emp); }
    * 
    * if (emp.getWorkInfoList() != null) { List<WorkInfoTO> workInfoList =
    * emp.getWorkInfoList(); for (WorkInfoTO workInfo : workInfoList) { switch
    * (workInfo.getStatus()) { case "insert": workInfoDAO.insertWorkInfo(workInfo);
    * break; case "update": workInfoDAO.updateWorkInfo(workInfo); break; case
    * "delete": workInfoDAO.deleteWorkInfo(workInfo); break; } } }
    * 
    * if (emp.getCareerInfoList() != null && emp.getCareerInfoList().size() > 0) {
    * List<CareerInfoTO> careerInfoList = emp.getCareerInfoList(); for
    * (CareerInfoTO careerInfo : careerInfoList) { switch (careerInfo.getStatus())
    * { case "insert": careerInfoDAO.insertCareerInfo(careerInfo); break; case
    * "update": careerInfoDAO.updateCareerInfo(careerInfo); break; case "delete":
    * careerInfoDAO.deleteCareerInfo(careerInfo); break; } } }
    * 
    * if (emp.getEducationInfoList() != null && emp.getEducationInfoList().size() >
    * 0) { List<EducationInfoTO> educationInfoList = emp.getEducationInfoList();
    * for (EducationInfoTO educationInfo : educationInfoList) { switch
    * (educationInfo.getStatus()) { case "insert":
    * educationInfoDAO.insertEducationInfo(educationInfo); break; case "update":
    * educationInfoDAO.updateEducationInfo(educationInfo); break; case "delete":
    * educationInfoDAO.deleteEducationInfo(educationInfo); break; } } }
    * 
    * if (emp.getLicenseInfoList() != null && emp.getLicenseInfoList().size() > 0)
    * { List<LicenseInfoTO> licenseInfoList = emp.getLicenseInfoList(); for
    * (LicenseInfoTO licenseInfo : licenseInfoList) { switch
    * (licenseInfo.getStatus()) { case "insert":
    * licenseInfoDAO.insertLicenseInfo(licenseInfo); break; case "update":
    * licenseInfoDAO.updateLicenseInfo(licenseInfo); break; case "delete":
    * licenseInfoDAO.deleteLicenseInfo(licenseInfo); break; } } }
    * 
    * if (emp.getFamilyInfoList() != null && emp.getFamilyInfoList().size() > 0) {
    * List<FamilyInfoTO> familyInfoList = emp.getFamilyInfoList(); for
    * (FamilyInfoTO familyInfo : familyInfoList) { switch (familyInfo.getStatus())
    * { case "insert": familyInfoDAO.insertFamilyInfo(familyInfo); break; case
    * "update": familyInfoDAO.updateFamilyInfo(familyInfo); break; case "delete":
    * familyInfoDAO.deleteFamilyInfo(familyInfo); break; } } } }
    */

   @Override
   public void deleteEmpList(ArrayList<EmpTO> empList) { 

      for(EmpTO emp : empList){
           empDAO.deleteEmployee(emp);
           baseApplicationService.deleteEmpCode(emp);
        }   
   }

   @Override
   public ArrayList<DeptTO> findDeptList() {
      ArrayList<DeptTO> deptList = deptDAO.selectDeptList();      
      return deptList;
   }

   @Override
   public ArrayList<BaseSalaryTO> selectPositionList() {

      ArrayList<BaseSalaryTO> positionList = salaryApplicationService.findBaseSalaryList();

      return positionList;
   }
   @Override
   public ArrayList<EmpTO> findAllEmpInfo(HashMap<String, String> map) {
      
      
      return empDAO.selectEmployee(map);
   }
   @Override
	public void empInfoUpdate(Map<String, ArrayList<EmpTO>> empArray) {
		empDAO.updateEmployee(empArray);
		
	}


}