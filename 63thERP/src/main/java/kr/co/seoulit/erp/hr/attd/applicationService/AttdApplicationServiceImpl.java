package kr.co.seoulit.erp.hr.attd.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import kr.co.seoulit.erp.hr.attd.dao.DayAttdDAO;
import kr.co.seoulit.erp.hr.attd.dao.DayAttdMgtDAO;
import kr.co.seoulit.erp.hr.attd.dao.MonthAttdMgtDAO;
import kr.co.seoulit.erp.hr.attd.dao.RestAttdDAO;
import kr.co.seoulit.erp.hr.attd.to.DayAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.DayAttdTO;
import kr.co.seoulit.erp.hr.attd.to.MonthAttdMgtTO;
import kr.co.seoulit.erp.hr.attd.to.RestAttdTO;
import kr.co.seoulit.erp.hr.base.to.HrDetailCodeTO;

@Component
public class AttdApplicationServiceImpl implements AttdApplicationService{
	
	@Autowired
	private DayAttdDAO dayAttdDAO;
	@Autowired
	private RestAttdDAO restAttdDAO;
	@Autowired
	private DayAttdMgtDAO dayAttdMgtDAO;
	@Autowired
	private MonthAttdMgtDAO monthAttdMgtDAO;
	

	@Override
	public ArrayList<DayAttdTO> findDayAttdList(String empCode, String applyDay) {
		// TODO Auto-generated method stub
	
		ArrayList<DayAttdTO> dayAttdList=dayAttdDAO.selectDayAttdList(empCode, applyDay);
		
		for(DayAttdTO dayAttdTO : dayAttdList  ) {
			String time = dayAttdTO.getTime();
			if(time.length() == 3) { StringBuffer t1 = new StringBuffer(time);
			t1.insert(1, ":");
			String t2 = t1.toString();
			dayAttdTO.setTime(t2);}
			else if(time.length() == 4) {StringBuffer tt1 = new StringBuffer(time);
			tt1.insert(2, ":");
			String tt2 = tt1.toString();
			dayAttdTO.setTime(tt2);
				
			}
			
		}
		System.out.println(dayAttdList);
		
		return dayAttdList;
	}
@Override
	public HashMap<String,Object> registDayAttd(DayAttdTO dayAttd) {
		
		HashMap<String,Object> map = new HashMap<>();
		map.put("empCode", dayAttd.getEmpCode());
		map.put("attdTypeCode", dayAttd.getAttdTypeCode());
		map.put("attdTypeName", dayAttd.getAttdTypeName());
		map.put("applyDay", dayAttd.getApplyDay());
		map.put("time", dayAttd.getTime());
		System.out.println("�뼱�뵆由ъ��씠�뀡�띁�궗�뱶"+map);
		
		return dayAttdDAO.batchInsertDayAttd(map);
		
	}

//@Override
//public void removeDayAttdList(ArrayList<DayAttdTO> dayAttdList) {
//	// TODO Auto-generated method stub
//	
//	for(DayAttdTO dayAttd : dayAttdList){
//		dayAttdDAO.deleteDayAttd(dayAttd);
//	}
//	
//	
//}
	
	@Override
	public ArrayList<RestAttdTO> findRestAttdListByToday(String empCode, String toDay) {
	
		ArrayList<RestAttdTO> restAttdList = restAttdDAO.selectRestAttdListByToday(empCode, toDay);
		return restAttdList;
	}

	@Override
	public void modifyDayAttdMgtList(ArrayList<DayAttdMgtTO> dayAttdMgtList) {
		
		
		
		// TODO Auto-generated method stub
		for(DayAttdMgtTO dayAttdMgt : dayAttdMgtList){
			if(dayAttdMgt.getStatus().equals("update")){				
				dayAttdMgt.setFinalizeStatus("Y");
				dayAttdMgtDAO.updateAttd(dayAttdMgt);
			}else if(dayAttdMgt.getStatus().equals("cancel")) {
				dayAttdMgt.setFinalizeStatus("N");
				dayAttdMgtDAO.updateAttd(dayAttdMgt);
			}
		}
}

	@Override
	public ArrayList<MonthAttdMgtTO> findMonthAttdMgtList(String applyYearMonth) {
		// TODO Auto-generated method stub
	
		HashMap<String,Object> map = new HashMap<>();
		map.put("applyYearMonth",applyYearMonth);
		monthAttdMgtDAO.batchMonthAttdMgtProcess(map);		
		@SuppressWarnings("unchecked")
		ArrayList<MonthAttdMgtTO> monthAttdMgtList = (ArrayList<MonthAttdMgtTO>) map.get("result");
		System.out.println(monthAttdMgtList);
		
		return monthAttdMgtList;
	}
	
	@Override
	public ArrayList<RestAttdTO> findRestAttdListByDept(HashMap<String,String> attdApplMap) {
		// TODO Auto-generated method stub
		ArrayList<RestAttdTO> restAttdList = null;
//		HashMap<String, Object> map = new HashMap<>();
//		
//		if(deptName.equals("嶺뚳옙占썬끇援곤옙釉앹삕�뜝�럡占�")) {
//			restAttdList = restAttdDAO.selectRestAttdListByAllDept(startDate);
//		}else {
//			map.put("deptName", deptName);
//			map.put("startDate", startDate);
//			map.put("endDate", endDate);
			restAttdList = restAttdDAO.selectRestAttdListByDept(attdApplMap);
//		}
	
		return restAttdList;
	}
	
	
	@Override
	public void registRestAttd(HashMap<String, String> attdRestMap) {
		// TODO Auto-generated method stub
		
		restAttdDAO.insertRestAttd(attdRestMap);
		
		
	}
	
	@Override
	public ArrayList<RestAttdTO> findRestAttdList(String empCode, String startDate, String endDate, String code) {
		// TODO Auto-generated method stub
		
		ArrayList<RestAttdTO> restAttdList=null;
		HashMap<String, Object> map = new HashMap<>();
		map.put("empCode", empCode);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		
		if(code == "")
			restAttdList = restAttdDAO.selectRestAttdList(map);
		else {
			map.put("code", code);
			restAttdList = restAttdDAO.selectRestAttdListCode(map);
		}
		return restAttdList;
	}
	
//	@Override
//	public void removeRestAttdList(ArrayList<RestAttdTO> restAttdList) {
//		// TODO Auto-generated method stub
//		
//		for(RestAttdTO restAttd : restAttdList){
//			restAttdDAO.deleteRestAttd(restAttd);
//		}
//		
//	}

//	********************* 결재승인관리 시작 _2020.08.27 _준서 *********************
	@Override
	public void modifyRestAttdList(HashMap<String,String> attdApplMap) {
		// TODO Auto-generated method stub
		System.out.println("aaaaaaaaaaaaaaaaa");
		restAttdDAO.updateRestAttd(attdApplMap);		
	}
//	********************* 결재승인관리 종료 _2020.08.27 _준서 *********************
	
	@Override
	public ArrayList<DayAttdMgtTO> findDayAttdMgtList(@Param("applyDay") String applyDay) {
		// TODO Auto-generated method stub

		HashMap<String, Object> param=new HashMap<>();
		param.put("applyDay", applyDay);
	 dayAttdMgtDAO.batchDayAttdMgtProcess(param);
		/*
		 * ResultTO resultTO = (ResultTO) resultMap.get("resultTO");
		 * if(Integer.parseInt(resultTO.getErrorCode()) < 0){ throw new
		 * DataAccessException(resultTO.getErrorMsg()) {}; }
		 */
		@SuppressWarnings("unchecked")
		ArrayList<DayAttdMgtTO> dayAttdMgtList = (ArrayList<DayAttdMgtTO>) param.get("result");
		return dayAttdMgtList;
		
	}
	
	
	@Override
	public void modifyMonthAttdMgtList(ArrayList<MonthAttdMgtTO> monthAttdMgtList) {
		// TODO Auto-generated method stub
		
		for(MonthAttdMgtTO monthAttdMgt : monthAttdMgtList){

			System.out.println("癒쇱뒪癒쇱뒪"+monthAttdMgt);
				if(monthAttdMgt.getStatus().equals("update")) {
				monthAttdMgt.setFinalizeStatus("Y");
				monthAttdMgtDAO.updateMonthAttdMgtList(monthAttdMgt);
				}else if(monthAttdMgt.getStatus().equals("cancel")) {
				monthAttdMgt.setFinalizeStatus("N");
				monthAttdMgtDAO.cancelMonthAttdMgtList(monthAttdMgt);	
				}
		//	}
		}

		
	}
	@Override
	public void insertDayAttd(DayAttdTO dayAttd) { //test
		// TODO Auto-generated method stub
		dayAttdDAO.insertDayAttd(dayAttd);
		}
	
	   @Override
	   public ArrayList<DayAttdMgtTO> findDayAttdMgtListAll(HashMap<String, Object> map) {
	      // TODO Auto-generated method stub
	      return dayAttdMgtDAO.selectDayAttdMgtProcessAll(map);
	   }

	   @Override
	   public ArrayList<DayAttdMgtTO> dayDeadlineRegister(HashMap<String, Object> map) {
	      // TODO Auto-generated method stub
	      
	            HashMap<String,Object> map1=new HashMap<String,Object>(); 
	         
	      Map<String,ArrayList<DayAttdMgtTO>> list=(Map<String, ArrayList<DayAttdMgtTO>>) map.get("DayAttdMgtToList");
	            
	      
	               ArrayList<DayAttdMgtTO> DayAttdMgtList=list.get("DayAttdMgtToList");
	      
	         
	         for(DayAttdMgtTO DayAttdMgtTo:DayAttdMgtList) {
	            
	                  map1.put("empCode",DayAttdMgtTo.getEmpCode());
	                  
	                  map1.put("applyDays",DayAttdMgtTo.getApplyDays());
	                  
	                  map1.put("finalizeStatus","Y");
	         
	                     
	                  dayAttdMgtDAO.updateDayAttdMgtList(map1);}
	                     
	                     
	       
	         					
	         				
	         
	                     return null;
	   }
	   
	   @Override //占쎈챶占�
	   public HashMap<String, Object> findDayAttdMgtList(HashMap<String,Object> map) {
	      // TODO Auto-generated method stub   
		   dayAttdMgtDAO.batchDayAttdMgtProcesses(map);
		   return map;
	   }

	@Override
	public void dayDeadlineCancel(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
       
		HashMap<String,Object> map1=new HashMap<String,Object>(); 
        
	      Map<String,ArrayList<DayAttdMgtTO>> list=(Map<String, ArrayList<DayAttdMgtTO>>) map.get("DayAttdMgtToList");
	            
	      
	               ArrayList<DayAttdMgtTO> DayAttdMgtList=list.get("DayAttdMgtToList");
	      
	         
	         for(DayAttdMgtTO DayAttdMgtTo:DayAttdMgtList) {
	            
	                  map1.put("empCode",DayAttdMgtTo.getEmpCode());
	                  
	                  map1.put("applyDays",DayAttdMgtTo.getApplyDays());
	                  
	                  map1.put("finalizeStatus","N");
	         
	                     
	                  dayAttdMgtDAO.CanCelDayAttdMgtList(map1);}
	}

	@Override
	public ArrayList<HrDetailCodeTO> searchRestAttendanceType() {
		// TODO Auto-generated method stub
		return restAttdDAO.selectRestDatailCodeName();
	}
	
	//재영 일근태 기록조회 삭제
	@Override
	public void deleteDayAttd(ArrayList<DayAttdTO> dayAttdData) {
		// TODO Auto-generated method stub
		for(DayAttdTO dayAttd : dayAttdData) {
		dayAttdDAO.deleteDayAttd(dayAttd);
		}
		
	}

}
