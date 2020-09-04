package kr.co.seoulit.erp.acc.base.to;

import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=false)
@Data
public class AddressBean extends BaseTO{
	
    String zipNo;
    String zipcode;
    String sido;
    String sigungu;
    String dong;
    String ri;
    String bunji;
    String sidoname;
    String roadName;
    String buildingCode1;
    String buildingCode2;

}
