package kr.co.seoulit.erp.acc.account.base.to;

import lombok.Data;
import lombok.EqualsAndHashCode;
import kr.co.seoulit.common.to.BaseTO;

@EqualsAndHashCode(callSuper=false)
@Data
public class AccountControlBean extends BaseTO{
    private String accountControlCode;
    private String accountControlName;
    private String accountControlType;

    public String getAccountControlCode() {
        return accountControlCode;
    }

    public void setAccountControlCode(String accountControlCode) {
        this.accountControlCode = accountControlCode;
    }

    public String getAccountControlName() {
        return accountControlName;
    }

    public void setAccountControlName(String accountControlName) {
        this.accountControlName = accountControlName;
    }

    public String getAccountControlType() {
        return accountControlType;
    }

    public void setAccountControlType(String accountControlType) {
        this.accountControlType = accountControlType;
    }
}
