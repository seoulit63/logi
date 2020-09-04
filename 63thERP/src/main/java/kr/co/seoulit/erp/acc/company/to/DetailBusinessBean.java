package kr.co.seoulit.erp.acc.company.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class DetailBusinessBean extends BaseTO{
	   private String detailBusinessName;
	    private String ChildClassificationCode;
	    private String remarks;

}
