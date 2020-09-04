package kr.co.seoulit.erp.logi.base.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.logi.base.to.LogiCodeDetailTO;
import kr.co.seoulit.erp.logi.base.to.LogiCodeTO;

public interface LogiCodeApplicationService {

	public ArrayList<LogiCodeDetailTO> getDetailCodeList(String divisionCode);

	public ArrayList<LogiCodeTO> getCodeList();

	public Boolean checkCodeDuplication(String divisionCode, String newDetailCode);
	
	public HashMap<String, Object> batchCodeListProcess(ArrayList<LogiCodeTO> codeList);
	
	public HashMap<String, Object> batchDetailCodeListProcess(ArrayList<LogiCodeDetailTO> detailCodeList);
	
	public HashMap<String, Object> changeCodeUseCheckProcess(ArrayList<LogiCodeDetailTO> detailCodeList);

}
