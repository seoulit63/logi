package kr.co.seoulit.erp.acc.company.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class BusinessBean  extends BaseTO {

    private String businessName;
    private String classificationCode;
    private String remarks;

}
