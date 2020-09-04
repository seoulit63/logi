package kr.co.seoulit.erp.acc.account.slip.serviceFacade;

import java.util.ArrayList;

import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;

public interface JournalServiceFacade {
    public ArrayList<JournalBean> findRangedJournalList(String fromDate, String toDate);

    public ArrayList<JournalBean> findSingleJournalList(String slipNo);

    void editJournal(String slipNo, ArrayList<JournalBean> journalBeanList);
}
