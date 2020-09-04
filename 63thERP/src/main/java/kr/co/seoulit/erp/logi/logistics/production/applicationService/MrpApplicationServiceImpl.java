package kr.co.seoulit.erp.logi.logistics.production.applicationService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.logi.logistics.production.dao.MpsDAO;
import kr.co.seoulit.erp.logi.logistics.production.dao.MrpDAO;
import kr.co.seoulit.erp.logi.logistics.production.dao.MrpGatheringDAO;
import kr.co.seoulit.erp.logi.logistics.production.to.MrpGatheringTO;
import kr.co.seoulit.erp.logi.logistics.production.to.MrpTO;

@Component
public class MrpApplicationServiceImpl implements MrpApplicationService {

	@Autowired
	private MpsDAO mpsDAO;
	@Autowired
	private MrpDAO mrpDAO;
	@Autowired
	private MrpGatheringDAO mrpGatheringDAO;


	public ArrayList<MrpTO> searchMrpList(String mrpGatheringStatusCondition) {
		
		return mrpDAO.selectMrpListAll(mrpGatheringStatusCondition);
	}

	public ArrayList<MrpTO> searchMrpList(String dateSearchCondtion, String startDate, String endDate) {

		HashMap<String,String> param = new HashMap<>(); 
		param.put("dateSearchCondtion",dateSearchCondtion);
		param.put("startDate",startDate);
		param.put("endDate",endDate);
		
		return mrpDAO.selectMrpList(param);

	}

	public ArrayList<MrpTO> searchMrpListAsMrpGatheringNo(String mrpGatheringNo) {

		return mrpDAO.selectMrpListAsMrpGatheringNo(mrpGatheringNo);

	}

	public ArrayList<MrpGatheringTO> searchMrpGatheringList(String dateSearchCondtion, String startDate,
			String endDate) {

		ArrayList<MrpGatheringTO> mrpGatheringList = null;
		HashMap<String,String> param = new HashMap<>(); 
		param.put("dateSearchCondtion",dateSearchCondtion);
		param.put("startDate",startDate);
		param.put("endDate",endDate);
		
			mrpGatheringList = mrpGatheringDAO.selectMrpGatheringList(param);

			for(MrpGatheringTO bean : mrpGatheringList) 	{
				
				bean.setMrpTOList(  mrpDAO.selectMrpListAsMrpGatheringNo( bean.getMrpGatheringNo()) );
			
			}

		return mrpGatheringList;

	}

	public HashMap<String, Object> openMrp(ArrayList<String> mpsNoArr) {

		HashMap<String, Object> resultMap = new HashMap<>();

		String mpsNoList = mpsNoArr.toString().replace("[", "").replace("]", "");
		HashMap<String, Object> param = new HashMap<>();
				param.put("mpsNoList",mpsNoList);		
				mrpDAO.openMrp(param);
        resultMap.put("gridRowJson",param.get("RESULT"));
        resultMap.put("errorCode",param.get("ERROR_CODE"));
        resultMap.put("errorMsg", param.get("ERROR_MSG"));
		System.out.println("이거는        ");
		System.out.println(resultMap.get("gridRowJson"));
		return resultMap;

	}

	public HashMap<String, Object> registerMrp(String mrpRegisterDate, ArrayList<MrpTO> newMrpList) {

		HashMap<String, Object> resultMap = null;
		HashMap<String, String> param = null;

			List<MrpTO> mrpTOList= mrpDAO.selectMrpCount(mrpRegisterDate);
			TreeSet<Integer> intSet = new TreeSet<>();

			int i;
			
			for (MrpTO bean : mrpTOList) {

				String mrpNo = bean.getMrpNo();

				// MRP 일련번호에서 마지막 3자리만 가져오기
				int no = Integer.parseInt(mrpNo.substring(mrpNo.length() - 3, mrpNo.length()));

				intSet.add(no);

			}

			if (intSet.isEmpty()) {
				i = 1;
			} else {
				i = intSet.pollLast() + 1; // 가장 높은 번호 + 1
			}
			StringBuffer newMrpNo = new StringBuffer();
			newMrpNo.append("RP");
			newMrpNo.append(mrpRegisterDate.replace("-", ""));
			newMrpNo.append("-");

			// 주생산계획번호를 담을 HashSet : 중복된 번호도 하나만 입력됨
			HashSet<String> mpsNoList = new HashSet<>();

			for (MrpTO bean : newMrpList) {

				bean.setMrpNo(newMrpNo.toString() + String.format("%03d", i++));
				//3자리로 일련번호 표현하고싶을때 사용.
				bean.setStatus("INSERT");
				mpsNoList.add(bean.getMpsNo());

			}

			// 새로운 MRP 빈을 batchListProcess 로 테이블에 저장
			resultMap = batchMrpListProcess(newMrpList);

			// 생성된 MRP 일련번호를 저장할 TreeSet
			TreeSet<String> mrpNoSet = new TreeSet<>();

			// "INSERT" 목록에 새로 생성된 MRP 일련번호들이 있음, ArrayList 로 형변환
			@SuppressWarnings("unchecked")
			ArrayList<String> mrpNoArr = (ArrayList<String>) resultMap.get("INSERT");

			for (String mrpNo : mrpNoArr) {
				mrpNoSet.add(mrpNo); // ArrayList 의 MRP 일련번호들을 TreeSet 에 저장

			}

			resultMap.put("firstMrpNo", mrpNoSet.pollFirst()); // 최초 MRP 일련번호를 결과 Map 에 저장
			resultMap.put("lastMrpNo", mrpNoSet.pollLast()); // 마지막 MRP 일련번호 결과 Map 에 저장

			// MPS 테이블에서 해당 mpsNo 의 MRP 적용상태를 "Y" 로 변경
			for (String mpsNo : mpsNoList) {
				param = new HashMap<>();
				param.put("mpsNo",mpsNo);
				param.put("mrpStatus","Y");
				mpsDAO.changeMrpApplyStatus(param);

			}

			// MRP 적용상태를 "Y" 로 변경한 주생산계획번호들을 결과 Map 에 저장
			resultMap.put("changeMrpApplyStatus", mpsNoList.toString().replace("[", "").replace("]", ""));

		return resultMap;
	}

	public HashMap<String, Object> batchMrpListProcess(ArrayList<MrpTO> mrpTOList) {

		HashMap<String, Object> resultMap = new HashMap<>();

			ArrayList<String> insertList = new ArrayList<>();
			ArrayList<String> updateList = new ArrayList<>();
			ArrayList<String> deleteList = new ArrayList<>();

			for (MrpTO bean : mrpTOList) {

				String status = bean.getStatus();

				switch (status) {

				case "INSERT":

					// dao 파트 시작
					mrpDAO.insertMrp(bean);
					// dao 파트 끝

					insertList.add(bean.getMrpNo());

					break;

				case "UPDATE":

					// dao 파트 시작
					mrpDAO.updateMrp(bean);
					// dao 파트 끝

					updateList.add(bean.getMrpNo());

					break;

				case "DELETE":

					// dao 파트 시작
					mrpDAO.deleteMrp(bean);
					// dao 파트 끝

					deleteList.add(bean.getMrpNo());

					break;

				}

			}

			resultMap.put("INSERT", insertList);
			resultMap.put("UPDATE", updateList);
			resultMap.put("DELETE", deleteList);

		return resultMap;
	}

	public ArrayList<MrpGatheringTO> getMrpGathering(ArrayList<String> mrpNoArr) {

		ArrayList<MrpGatheringTO> mrpGatheringList = null;

			// mrp번호 배열 [mrp번호,mrp번호, ...] => "mrp번호,mrp번호, ..." 형식의 문자열로 변환
			String mrpNoList = mrpNoArr.toString().replace("[", "").replace("]", "");
			mrpGatheringList = mrpGatheringDAO.getMrpGathering(mrpNoList);

		return mrpGatheringList;

	}

	public HashMap<String, Object> registerMrpGathering(String mrpGatheringRegisterDate,
			ArrayList<MrpGatheringTO> newMrpGatheringList, HashMap<String, String> mrpNoAndItemCodeMap) {

		HashMap<String, Object> resultMap = null;
		HashMap<String, String> param = new HashMap<>();

			// 소요량 취합일자로 새로운 소요량 취합번호 확인
			int i;
			ArrayList<MrpGatheringTO> list= mrpGatheringDAO.selectMrpGatheringCount(mrpGatheringRegisterDate);
			
			
			TreeSet<Integer> intSet = new TreeSet<>();

			for(MrpGatheringTO mrpGathering : list) {
				String mrpGatheringNo = mrpGathering.getMrpGatheringNo();

				// mrpGathering 일련번호에서 마지막 2자리만 가져오기
				int no = Integer
						.parseInt(mrpGatheringNo.substring(mrpGatheringNo.length() - 2, mrpGatheringNo.length()));

				intSet.add(no);
			}

			if (intSet.isEmpty()) {
				i = 1;
			} else {
				i = intSet.pollLast() + 1; // 가장 높은 번호 + 1
			}
			/*
			 * ( itemCode : 새로운 mrpGathering 일련번호 ) 키/값 Map => itemCode 로 mrpNo 와
			 * mrpGatheringNo 를 매칭
			 */
			HashMap<String, String> itemCodeAndMrpGatheringNoMap = new HashMap<>();

			// 새로운 mrpGathering 일련번호 양식 생성 : 등록일자 '2018-01-01' => 일련번호 'MG20180101-'
			StringBuffer newMrpGatheringNo = new StringBuffer();
			newMrpGatheringNo.append("MG");
			newMrpGatheringNo.append(mrpGatheringRegisterDate.replace("-", ""));
			newMrpGatheringNo.append("-");

			// 새로운 mrpGathering 빈에 일련번호 입력 / status 를 "INSERT" 로 변경
			for (MrpGatheringTO bean : newMrpGatheringList) {

				bean.setMrpGatheringNo(newMrpGatheringNo.toString() + String.format("%03d", i++));
				bean.setStatus("INSERT");

				// mrpGathering 빈의 itemCode 와 mrpGatheringNo 를 map 에 저장
				itemCodeAndMrpGatheringNoMap.put(bean.getItemCode(), bean.getMrpGatheringNo());

			}

			// 새로운 mrpGathering 빈을 batchListProcess 로 테이블에 저장, 결과 Map 반환
			resultMap = batchMrpGatheringListProcess(newMrpGatheringList);
			
			// 생성된 mrp 일련번호를 저장할 TreeSet
			TreeSet<String> mrpGatheringNoSet = new TreeSet<>();

			// "INSERT_LIST" 목록에 "itemCode - mrpGatheringNo" 키/값 Map 이 있음
			@SuppressWarnings("unchecked")
			HashMap<String, String> mrpGatheringNoList = (HashMap<String, String>) resultMap.get("INSERT_MAP");

			for (String mrpGatheringNo : mrpGatheringNoList.values()) {
				mrpGatheringNoSet.add(mrpGatheringNo); // ArrayList 의 mrpGathering 일련번호들을 TreeSet 에 저장

			}

			resultMap.put("firstMrpGatheringNo", mrpGatheringNoSet.pollFirst()); // 최초 mrpGathering 일련번호를 결과 Map 에 저장
			resultMap.put("lastMrpGatheringNo", mrpGatheringNoSet.pollLast()); // 마지막 mrpGathering 일련번호를 결과 Map 에 저장

			// MRP 테이블에서 해당 mrpNo 의 mrpGatheringNo 저장, 소요량취합 적용상태를 "Y" 로 변경
			// itemCode 로 mrpNo 와 mrpGatheringNo 를 매칭시킨다
			for (String mrpNo : mrpNoAndItemCodeMap.keySet()) {

				String itemCode = mrpNoAndItemCodeMap.get(mrpNo);
				String mrpGatheringNo = itemCodeAndMrpGatheringNoMap.get(itemCode);
				param.put("mrpNo",mrpNo);
				param.put("mrpGatheringNo",mrpGatheringNo);
				param.put("mrpGatheringStatus","Y");
				mrpDAO.changeMrpGatheringStatus(param);

			}

			// MRP 적용상태를 "Y" 로 변경한 MRP 번호들을 결과 Map 에 저장
			resultMap.put("changeMrpGatheringStatus",
					mrpNoAndItemCodeMap.keySet().toString().replace("[", "").replace("]", ""));

		return resultMap;
	}

	public HashMap<String, Object> batchMrpGatheringListProcess(ArrayList<MrpGatheringTO> mrpGatheringTOList) {

		HashMap<String, Object> resultMap = new HashMap<>();

			HashMap<String, String> insertListMap = new HashMap<>(); // "itemCode : mrpGatheringNo" 의 맵
			ArrayList<String> insertList = new ArrayList<>();
			ArrayList<String> updateList = new ArrayList<>();
			ArrayList<String> deleteList = new ArrayList<>();

			for (MrpGatheringTO bean : mrpGatheringTOList) {

				String status = bean.getStatus();

				switch (status) {

				case "INSERT":

					mrpGatheringDAO.insertMrpGathering(bean);

					insertList.add(bean.getMrpGatheringNo());

					insertListMap.put(bean.getItemCode(), bean.getMrpGatheringNo());

					break;

				case "UPDATE":

					mrpGatheringDAO.updateMrpGathering(bean);

					updateList.add(bean.getMrpGatheringNo());

					break;

				case "DELETE":

					mrpGatheringDAO.deleteMrpGathering(bean);

					deleteList.add(bean.getMrpGatheringNo());

					break;

				}

			}

			resultMap.put("INSERT_MAP", insertListMap);
			resultMap.put("INSERT", insertList);
			resultMap.put("UPDATE", updateList);
			resultMap.put("DELETE", deleteList);

		return resultMap;
	}

}
