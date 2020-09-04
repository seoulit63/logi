package kr.co.seoulit.erp.hr.attd.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RestAttdTO extends BaseTO{
	private String empCode,
				   empName, 
				   restAttdCode, 
				   restTypeCode,
				   restTypeName, 
				   requestDate, 
				   startDate,
				   endDate, 
				   numberOfDays, 
				   cost, 
				   cause,
				   applovalStatus, 
				   rejectCause, 
				   startTime, 
				   endTime,
				   detailCodeNumber,
				   detailCodeName;
}
