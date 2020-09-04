package kr.co.seoulit.erp.hr.emp.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class WorkInfoTO extends BaseTO{
	private String empCode, workInfoDays, hiredate, retireDate, 
	occupation, employmentType, hobong, position, deptName;

}
