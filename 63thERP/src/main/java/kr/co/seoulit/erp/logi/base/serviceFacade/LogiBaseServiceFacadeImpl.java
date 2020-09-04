package kr.co.seoulit.erp.logi.base.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.seoulit.erp.logi.base.applicationService.LogiCodeApplicationService;
import kr.co.seoulit.erp.logi.base.to.LogiCodeDetailTO;
import kr.co.seoulit.erp.logi.base.to.LogiCodeTO;

@Service
public class LogiBaseServiceFacadeImpl implements LogiBaseServiceFacade {


	@Autowired
	private LogiCodeApplicationService codeAS;


	@Override
	public ArrayList<LogiCodeDetailTO> getDetailCodeList(String divisionCode) {
		
		return codeAS.getDetailCodeList(divisionCode);
	}

	@Override
	public ArrayList<LogiCodeTO> getCodeList() {

		return codeAS.getCodeList();
	}

	@Override
	public Boolean checkCodeDuplication(String divisionCode, String newDetailCode) {

		return codeAS.checkCodeDuplication(divisionCode, newDetailCode);
	}

	@Override
	public HashMap<String, Object> batchCodeListProcess(ArrayList<LogiCodeTO> codeList) {

		return codeAS.batchCodeListProcess(codeList);
	}

	@Override
	public HashMap<String, Object> batchDetailCodeListProcess(ArrayList<LogiCodeDetailTO> detailCodeList) {

		return codeAS.batchDetailCodeListProcess(detailCodeList);
	}

	@Override
	public HashMap<String, Object> changeCodeUseCheckProcess(ArrayList<LogiCodeDetailTO> detailCodeList) {

		return codeAS.changeCodeUseCheckProcess(detailCodeList);
	}


}
