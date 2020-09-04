package kr.co.seoulit.erp.acc.base.applicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import kr.co.seoulit.erp.acc.base.applicationService.AccBaseApplicationService;

import kr.co.seoulit.erp.acc.base.dao.PeriodDAO;

@Component
public class AccBaseApplicationServiceImpl implements AccBaseApplicationService {

    @Autowired
    private PeriodDAO periodDAO;

    
    public String getPeriodNo(String today) {

        return periodDAO.getPeriodNo(today);
    }
    
    public void insertPeriodNo(String sdate,String edate) {
   
           periodDAO.insertPeriodNo(sdate,edate);

    }


}