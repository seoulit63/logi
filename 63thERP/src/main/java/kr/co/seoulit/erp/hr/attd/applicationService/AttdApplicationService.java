package kr.co.seoulit.erp.hr.attd.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.hr.attd.to.DayAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.DayAttdTO;
import kr.co.seoulit.erp.hr.attd.to.MonthAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.RestAttdTO;
import kr.co.seoulit.erp.hr.base.to.HrDetailCodeTO;

public interface AttdApplicationService {
	public ArrayList<DayAttdTO> findDayAttdList(String empCode, String applyDay);
	public HashMap<String,Object> registDayAttd(DayAttdTO dayAttd);
//	public void removeDayAttdList(HashMap<String, String> params);  
	public void insertDayAttd(DayAttdTO dayAttd); //test
	//�뀛�뀞�뀪�뀭modifyMonthAttdMgtListmodifyMonthAttdMgtList
	public ArrayList<DayAttdMgtTO> findDayAttdMgtList(String applyDay);
	public void modifyDayAttdMgtList(ArrayList<DayAttdMgtTO> dayAttdMgtList);
	public ArrayList<MonthAttdMgtTO> findMonthAttdMgtList(String applyYearMonth);
	public void modifyMonthAttdMgtList(ArrayList<MonthAttdMgtTO> monthAttdMgtList);
	
	public ArrayList<RestAttdTO> findRestAttdList(String empCode, String startDate, String endDate, String code);
	public ArrayList<RestAttdTO> findRestAttdListByDept(HashMap<String,String> attdApplMap);
	public ArrayList<RestAttdTO> findRestAttdListByToday(String empCode, String toDay);
	public void registRestAttd(HashMap<String, String> attdRestMap);
	public void modifyRestAttdList(HashMap<String,String> attdApplMap);	// 결재승인관리 시작 _2020.08.27 _준서
//   public void removeRestAttdList(ArrayList<RestAttdTO> restAttdList);
	   public ArrayList<DayAttdMgtTO> findDayAttdMgtListAll(HashMap<String, Object> map);//占쏙옙占싸븝옙
	   public ArrayList<DayAttdMgtTO> dayDeadlineRegister(HashMap<String, Object> map);//占쏙옙占싸븝옙
	   public HashMap<String, Object> findDayAttdMgtList(HashMap<String, Object> map); //占쏙옙占싸븝옙
	public void dayDeadlineCancel(HashMap<String, Object> map);//占싸븝옙
	public ArrayList<HrDetailCodeTO> searchRestAttendanceType();//占싸븝옙
	public void deleteDayAttd(ArrayList<DayAttdTO> dayAttdData);
}
