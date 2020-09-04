package kr.co.seoulit.erp.acc.account.base.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.acc.account.base.to.AccountBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountCodeBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountControlBean;

@Mapper
public interface AccountDAO {

    public AccountBean selectAccount(String accountCode);

    public ArrayList<AccountBean> selectDetailAccountList(String code);

    public ArrayList<AccountBean> selectParentAccountList();

    public void updateAccount(AccountBean accountBean);
    
    public String selectPeriodNo(String toDay);

    ArrayList<AccountBean> selectAccountListByName(String accountName);

    ArrayList<AccountControlBean> selectAccountControlList(String accountCode);

	public List<AccountCodeBean> getAccountList();

    //=====================================  2020-08-25 계정별 원장 조편백   시작 ====================================
    public HashMap<String, Object> getLedgerbyAccountInfo(HashMap<String,Object> param);//계정별원장 
    //=====================================  2020-08-25 계정별 원장 조편백   끝  ====================================
}