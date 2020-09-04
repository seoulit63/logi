package kr.co.seoulit.erp.acc.base.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.acc.base.dao.AccCodeDAO;
import kr.co.seoulit.erp.acc.base.dao.AccDetailCodeDAO;
import kr.co.seoulit.erp.acc.base.to.CodeBean;
import kr.co.seoulit.erp.acc.base.to.DetailCodeBean;
import kr.co.seoulit.erp.acc.base.applicationService.AccCodeListApplicationService;
import kr.co.seoulit.erp.acc.base.applicationService.AccCodeListApplicationServiceImpl;

@Component
public class AccCodeListApplicationServiceImpl implements AccCodeListApplicationService {

	@Autowired
    private AccCodeDAO codeDAO;
	@Autowired
    private AccDetailCodeDAO detailCodeDAO;   
    
    

	@Override
    public ArrayList<DetailCodeBean> getDetailCodeList(HashMap<String, Object> param) {
    
        return detailCodeDAO.selectDetailCodeList(param);
    }

    @Override
    public ArrayList<CodeBean> findCodeList() {
        return codeDAO.selectCodeList();
    }

    @Override
    public void batchCodeProcess(ArrayList<CodeBean> codeList, ArrayList<DetailCodeBean> codeList2) {

            for (CodeBean code : codeList) {
                switch (code.getStatus()) {
                    case "insert":
                        codeDAO.insertCode(code);
                        break;
                    case "update":
                        codeDAO.updateCode(code);
                        break;
                    case "normal":
                        break;
                    case "delete":
                        codeDAO.deleteCode(code.getDivisionCodeNo());
                }
            }
            ArrayList<DetailCodeBean> DetailcodeList = codeList2;
            for (DetailCodeBean codeDetailBean : DetailcodeList) {
                switch (codeDetailBean.getStatus()) {
                    case "insert":
                    	detailCodeDAO.insertDetailCode(codeDetailBean);
                        break;
                    case "update":
                    	detailCodeDAO.updateDetailCode(codeDetailBean);
                        break;
                    case "delete":
                    	detailCodeDAO.deleteDetailCode(codeDetailBean.getDetailCode());
                }
            }


       
    }


}
