package kr.co.seoulit.erp.acc.base.applicationService;


public interface AccBaseApplicationService {
	 
	public String getPeriodNo(String today);
	    
	public void insertPeriodNo(String sdate,String edate);
}
