package kr.co.seoulit.erp.acc.company.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class WorkplaceBean  extends BaseTO{

	private String workplaceCode;
    private String companyCode;
    private String workplaceName;
    private String businessLicense;
    private String corporationLicence;
    private String workplaceCeoName;
    private String businessConditions;
    private String businessItems;
    private String workplaceTelNumber;
    private String workplaceFaxNumber;
    private String workplaceBasicAddress;
    private String approvalStatus; 

}
