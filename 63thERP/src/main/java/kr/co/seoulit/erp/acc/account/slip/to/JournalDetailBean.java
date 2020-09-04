package kr.co.seoulit.erp.acc.account.slip.to;

import lombok.Data;
import lombok.EqualsAndHashCode;
import kr.co.seoulit.common.to.BaseTO;

@EqualsAndHashCode(callSuper=false)
@Data
public class JournalDetailBean extends BaseTO{
    private String journalDetailNo;
    private String accountControlName;
    private String accountControlType;
    private String journalDescription;
    private String accountControlDescription;

}
