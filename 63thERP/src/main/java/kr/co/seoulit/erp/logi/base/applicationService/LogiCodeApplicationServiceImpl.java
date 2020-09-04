package kr.co.seoulit.erp.logi.base.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.logi.base.dao.LogiCodeDAO;
import kr.co.seoulit.erp.logi.base.dao.LogiCodeDetailDAO;
import kr.co.seoulit.erp.logi.base.to.LogiCodeDetailTO;
import kr.co.seoulit.erp.logi.base.to.LogiCodeTO;

@Component
public class LogiCodeApplicationServiceImpl implements LogiCodeApplicationService {


	@Autowired
	private LogiCodeDAO codeDAO;
	@Autowired
	private LogiCodeDetailDAO codeDetailDAO;

	@Override
	public ArrayList<LogiCodeTO> getCodeList() {

		ArrayList<LogiCodeTO> codeList = null;

			codeList = codeDAO.selectCodeList();

			for (LogiCodeTO bean : codeList) {

				bean.setCodeDetailTOList(codeDetailDAO.selectDetailCodeList(bean.getDivisionCodeNo()));

			}

		return codeList;
	}

	@Override
	public ArrayList<LogiCodeDetailTO> getDetailCodeList(String divisionCode) {

		return  codeDetailDAO.selectDetailCodeList(divisionCode);

	}

	public Boolean checkCodeDuplication(String divisionCode, String newDetailCode) {

		ArrayList<LogiCodeDetailTO> detailCodeList = null;
		Boolean duplicated = false;;

			detailCodeList = codeDetailDAO.selectDetailCodeList(divisionCode);

			for (LogiCodeDetailTO bean : detailCodeList) {

				if (bean.getDetailCode().equals(newDetailCode)) {

					duplicated = true; // 입력받은 newDetailCode 와 같은 값이 있으면 중복된 코드임

				}

			}

		return duplicated; // 중복된 코드이면 true 반환

	}

	@Override
	public HashMap<String, Object> batchCodeListProcess(ArrayList<LogiCodeTO> codeList) {

		HashMap<String, Object> resultMap = new HashMap<>();
		
			ArrayList<String> insertList = new ArrayList<>();
			ArrayList<String> updateList = new ArrayList<>();
			ArrayList<String> deleteList = new ArrayList<>();

			for (LogiCodeTO bean : codeList) {

				String status = bean.getStatus();

				switch (status) {

				case "INSERT":

					codeDAO.insertCode(bean);

					insertList.add(bean.getDivisionCodeNo());

					break;

				case "UPDATE":

					codeDAO.updateCode(bean);

					updateList.add(bean.getDivisionCodeNo());

					break;

				case "DELETE":

					codeDAO.deleteCode(bean);

					deleteList.add(bean.getDivisionCodeNo());

					break;

				}

			}

			resultMap.put("INSERT", insertList);
			resultMap.put("UPDATE", updateList);
			resultMap.put("DELETE", deleteList);

		return resultMap;

	}

	@Override
	public HashMap<String, Object> batchDetailCodeListProcess(ArrayList<LogiCodeDetailTO> detailCodeList) {

		HashMap<String, Object> resultMap = new HashMap<>();

			ArrayList<String> insertList = new ArrayList<>();
			ArrayList<String> updateList = new ArrayList<>();
			ArrayList<String> deleteList = new ArrayList<>();

			for (LogiCodeDetailTO bean : detailCodeList) {

				String status = bean.getStatus();

				switch (status) {

				case "INSERT":

					codeDetailDAO.insertDetailCode(bean);

					insertList.add(bean.getDivisionCodeNo() + " / " + bean.getDetailCode());

					break;

				case "UPDATE":

					codeDetailDAO.updateDetailCode(bean);

					updateList.add(bean.getDivisionCodeNo() + " / " + bean.getDetailCode());

					break;

				case "DELETE":

					codeDetailDAO.deleteDetailCode(bean);

					deleteList.add(bean.getDivisionCodeNo() + " / " + bean.getDetailCode());

					break;

				}

			}

			resultMap.put("INSERT", insertList);
			resultMap.put("UPDATE", updateList);
			resultMap.put("DELETE", deleteList);

		return resultMap;

	}

	@Override
	public HashMap<String, Object> changeCodeUseCheckProcess(ArrayList<LogiCodeDetailTO> detailCodeList) {

		HashMap<String, Object> resultMap = new HashMap<>();

			ArrayList<String> codeUseList = new ArrayList<>();
			ArrayList<String> codeNotUseList = new ArrayList<>();

			for (LogiCodeDetailTO bean : detailCodeList) {

				String codeUseCheck = ((bean.getCodeUseCheck() == null) ? "" : bean.getCodeUseCheck().toUpperCase());

				switch (codeUseCheck) {

				case "N":

					codeDetailDAO.changeCodeUseCheck(bean.getDivisionCodeNo(), bean.getDetailCode(), "N");

					codeNotUseList.add(bean.getDivisionCodeNo() + " / " + bean.getDetailCode());

					break;

				default:

					codeDetailDAO.changeCodeUseCheck(bean.getDivisionCodeNo(), bean.getDetailCode(), "");

					codeUseList.add(bean.getDivisionCodeNo() + " / " + bean.getDetailCode());

					break;

				}

			}

			resultMap.put("USE", codeUseList);
			resultMap.put("NOT_USE", codeNotUseList);

		return resultMap;
	}

}
