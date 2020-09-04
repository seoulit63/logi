package kr.co.seoulit.erp.hr.emp.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;

@Data
public class CareerInfoTO extends BaseTO{
	private String empCode, careerCode, companyName, occupation, assignmentTask, exHiredate, exRetirementDate;

}
