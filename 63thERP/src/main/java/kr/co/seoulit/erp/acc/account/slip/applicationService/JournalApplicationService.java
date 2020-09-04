package kr.co.seoulit.erp.acc.account.slip.applicationService;

import java.util.ArrayList;

import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;

public interface JournalApplicationService {
    public ArrayList<JournalBean> findSingleJournalList(String slipNo);

    public ArrayList<JournalBean> findRangedJournalList(String fromDate, String toDate);

    void editJournal(String slipNo, ArrayList<JournalBean> journalBeanList);
}
