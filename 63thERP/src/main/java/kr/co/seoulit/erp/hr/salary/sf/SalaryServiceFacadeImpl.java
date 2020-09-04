package kr.co.seoulit.erp.hr.salary.sf;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.co.seoulit.erp.hr.salary.applicationService.SalaryApplicationService;
import kr.co.seoulit.erp.hr.salary.sf.SalaryServiceFacade;
import kr.co.seoulit.erp.hr.salary.sf.SalaryServiceFacadeImpl;
import kr.co.seoulit.erp.hr.salary.to.BaseDeductionTO;
import kr.co.seoulit.erp.hr.salary.to.BaseExtSalTO;
import kr.co.seoulit.erp.hr.salary.to.BaseSalaryTO;
import kr.co.seoulit.erp.hr.salary.to.MonthSalaryTO; 

@Service

public class SalaryServiceFacadeImpl implements SalaryServiceFacade{
	@Autowired
	private SalaryApplicationService salaryApplicationService;
	
	@Override
	public ArrayList<BaseSalaryTO> findBaseSalaryList() {		
			ArrayList<BaseSalaryTO> baseSalaryList=salaryApplicationService.findBaseSalaryList();
			return baseSalaryList;	
	}
	
	@Override
	public void modifyBaseSalaryList(ArrayList<BaseSalaryTO> baseSalaryList) {
			salaryApplicationService.modifyBaseSalaryList(baseSalaryList);					
	}
	
	@Override
	public ArrayList<BaseDeductionTO> findBaseDeductionList() {
			ArrayList<BaseDeductionTO> baseDeductionList=salaryApplicationService.findBaseDeductionList();
			return baseDeductionList;
	}
	
	@Override
	public void batchBaseDeductionProcess(ArrayList<BaseDeductionTO> baseDeductionList) {
			salaryApplicationService.batchBaseDeductionProcess(baseDeductionList);
	}
	
	@Override
	public ArrayList<BaseExtSalTO> findBaseExtSalList() {
			ArrayList<BaseExtSalTO> baseExtSalList=salaryApplicationService.findBaseExtSalList();
			return baseExtSalList;
	}	
	@Override
	public void modifyBaseExtSalList(ArrayList<BaseExtSalTO> baseExtSalList) {
			salaryApplicationService.modifyBaseExtSalList(baseExtSalList);
	}

	@Override
	public HashMap<String, Object> findMonthSalary(String ApplyYearMonth, String empCode) {
		return salaryApplicationService.findMonthSalary(ApplyYearMonth, empCode);
				
	}

	@Override
	public ArrayList<MonthSalaryTO> findYearSalary(String applyYear, String empCode) {
			ArrayList<MonthSalaryTO> monthSalary=salaryApplicationService.findYearSalary(applyYear, empCode);
			return monthSalary;
	}
	
	@Override
	public void modifyMonthSalary(MonthSalaryTO monthSalary) {
			salaryApplicationService.modifyMonthSalary(monthSalary);
	}

	@Override
	public HashMap<String, Object> CloseSalary(String applyYearMonth, String deptCode) {
		// TODO Auto-generated method stub
		return salaryApplicationService.findCloseSalary(applyYearMonth,deptCode);
	}

	@Override
	public void closeMonthSalary(MonthSalaryTO empCodeList) {  //월급여 마감
		salaryApplicationService.closeSalary(empCodeList);
		
	}
	
}
