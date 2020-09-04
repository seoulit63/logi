package kr.co.seoulit.erp.hr.emp.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class FamilyInfoTO extends BaseTO{
	private String empCode,familyCode,familyName,relation,birthdate,liveTogether;

}
