package kr.co.seoulit.erp.acc.account.slip.to;

import lombok.Data;

import lombok.EqualsAndHashCode;

import java.util.ArrayList;

import kr.co.seoulit.common.to.BaseTO;


@EqualsAndHashCode(callSuper=false)
@Data
public class JournalBean extends BaseTO{
    private String id;
    private String slipNo;
    private String journalNo;
    private String balanceDivision;
    private String accountCode;
    private String accountName;
    private String customerCode;
    private String customerName;
    private String leftDebtorPrice;
    private String rightCreditsPrice;
    private String price;
    private String deptCode;
    private String accountPeriodNo;
    private ArrayList<JournalDetailBean> journalDetailList;
}
