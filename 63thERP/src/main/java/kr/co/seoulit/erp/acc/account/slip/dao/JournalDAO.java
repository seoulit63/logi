package kr.co.seoulit.erp.acc.account.slip.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.acc.account.slip.to.JournalBean;

@Mapper
public interface JournalDAO {

    public ArrayList<JournalBean> selectRangedJournalList(HashMap<String, String> map);

    public ArrayList<JournalBean> selectJournalList(String slipNo);

    public JournalBean selectJournal(String journalNo);

    public void insertJournal(JournalBean journalBean);
    
    public String selectJournalName(String slipNo);

    public void deleteJournal(JournalBean journalBean);

    public boolean updateJournal(JournalBean journalBean);
}
