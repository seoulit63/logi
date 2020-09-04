package kr.co.seoulit.erp.hr.attd.sf;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.hr.attd.applicationService.AttdApplicationService;
import kr.co.seoulit.erp.hr.attd.sf.AttdServiceFacade;
import kr.co.seoulit.erp.hr.attd.sf.AttdServiceFacadeImpl;
import kr.co.seoulit.erp.hr.attd.to.DayAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.DayAttdTO;
import kr.co.seoulit.erp.hr.attd.to.MonthAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.RestAttdTO;
import kr.co.seoulit.erp.hr.base.to.HrDetailCodeTO;

@Service
public class AttdServiceFacadeImpl implements AttdServiceFacade{
@Autowired   
private AttdApplicationService attdApplicationService;
	
	@Override
	public ArrayList<DayAttdTO> findDayAttdList(String empCode, String applyDay) {
		ArrayList<DayAttdTO> dayAttdList=attdApplicationService.findDayAttdList(empCode, applyDay);
			return dayAttdList;
		}
	
	@Override  
	public HashMap<String,Object> registDayAttd(DayAttdTO dayAttd) {
			return attdApplicationService.registDayAttd(dayAttd);
			
		}
	@Override
	public ArrayList<RestAttdTO> findRestAttdList(String empCode, String startDate, String endDate, String code) {
			ArrayList<RestAttdTO> restAttdList = attdApplicationService.findRestAttdList(empCode, startDate, endDate, code);
			return restAttdList;	
		}
	@Override
	public ArrayList<RestAttdTO> findRestAttdListByDept(HashMap<String,String> attdApplMap) {
			ArrayList<RestAttdTO> restAttdList = attdApplicationService.findRestAttdListByDept(attdApplMap);
			return restAttdList;
		}

	@Override
	public ArrayList<RestAttdTO> findRestAttdListByToday(String empCode, String toDay) {
			ArrayList<RestAttdTO> restAttdList = attdApplicationService.findRestAttdListByToday(empCode,toDay);
			return restAttdList;
		}

	@Override
	public void registRestAttd(HashMap<String, String> attdRestMap) {
			attdApplicationService.registRestAttd(attdRestMap);
		}
//	********************* ������ΰ��� ���� _2020.08.27 _�ؼ� *********************
	@Override
	public void modifyRestAttdList(HashMap<String,String> attdApplMap) {
		System.out.println("ffffffffffffffffffffffff");
			attdApplicationService.modifyRestAttdList(attdApplMap);
		}
//	********************* ������ΰ��� ���� _2020.08.27 _�ؼ� *********************
	@Override
	public ArrayList<DayAttdMgtTO> findDayAttdMgtList(String applyDay) {
			ArrayList<DayAttdMgtTO> dayAttdMgtList = attdApplicationService.findDayAttdMgtList(applyDay);
			return dayAttdMgtList;
		}
	@Override
	public void modifyDayAttdMgtList(ArrayList<DayAttdMgtTO> dayAttdMgtList) {
			attdApplicationService.modifyDayAttdMgtList(dayAttdMgtList);
		}
	@Override
	public ArrayList<MonthAttdMgtTO> findMonthAttdMgtList(String applyYearMonth) {
		
			return attdApplicationService.findMonthAttdMgtList(applyYearMonth);
		}
	@Override
	public void modifyMonthAttdMgtList(ArrayList<MonthAttdMgtTO> monthAttdMgtList) {
			attdApplicationService.modifyMonthAttdMgtList(monthAttdMgtList);
		}
	@Override
	public void insertDayAttd(DayAttdTO dayAttd) {
			attdApplicationService.insertDayAttd(dayAttd);
	
		}
	
	   @Override  ///�κ�
	   public ArrayList<DayAttdMgtTO> findDayAttdMgtListAll(HashMap<String, Object> map) {
	      // TODO Auto-generated method stub
	      return attdApplicationService.findDayAttdMgtListAll(map);
	   }

	   @Override   ///�κ�
	   public ArrayList<DayAttdMgtTO> dayDeadlineRegister(HashMap<String, Object> map) {
	      // TODO Auto-generated method stub
	      
	      return attdApplicationService.dayDeadlineRegister(map);
	   }

	@Override
	  public HashMap<String, Object> findDayAttdMgtList(HashMap<String,Object> map) {
		
		HashMap<String, Object> result = attdApplicationService.findDayAttdMgtList(map);
		return result;
	      }

	@Override
	public void dayDeadlineCancel(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		attdApplicationService.dayDeadlineCancel(map);
	}

	@Override
	public ArrayList<HrDetailCodeTO> searchRestAttendanceType() {
		// TODO Auto-generated method stub
		return attdApplicationService.searchRestAttendanceType();
	}
	
	//재영 일근태 기록조회 삭제
	@Override
	public void deleteDayAttd(ArrayList<DayAttdTO> dayAttdData) {
			attdApplicationService.deleteDayAttd(dayAttdData);
	}
	   

}
