package kr.co.seoulit.erp.acc.account.slip.applicationService;

import java.util.ArrayList;

import kr.co.seoulit.erp.acc.account.slip.to.JournalDetailBean;

public interface JournalDetailApplicationService {
    public ArrayList<JournalDetailBean> getJournalDetailList(String journalNo);

    public void addJournalDetailList(String journalNo);

    public void editJournalDetail(JournalDetailBean journalDetailBean);
}
