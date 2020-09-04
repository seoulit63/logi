package kr.co.seoulit.erp.acc.base.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.seoulit.erp.acc.base.serviceFacade.AccBaseServiceFacade;
import kr.co.seoulit.erp.acc.base.to.CodeBean;
import kr.co.seoulit.erp.acc.base.to.DetailCodeBean;

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class AccCodeListController {
	
	@Autowired
    private AccBaseServiceFacade baseServiceFacade;
 

	@RequestMapping(value="/base/getDetailCodeList", method = RequestMethod.GET )
	public HashMap<String, Object> getDetailCodeList(@RequestParam HashMap<String,Object> param) {
		HashMap<String, Object> map=new HashMap<>();
        try {
        ArrayList<DetailCodeBean> detailCodeList = baseServiceFacade.getDetailCodeList(param);
        map.put("detailCodeList",detailCodeList);
        map.put("errorCode",0);
        map.put("errorMsg","등록완료");

 }
        catch(Exception e2){
     	 	map.put("errorCode", -1);
         	map.put("errorMsg", e2.getMessage());
        }
        return map;
        }
           
       //     param.put("divisionCodeNo", request.getParameter("divisionCodeNo"));
            
           
        

    
   
    public ModelAndView findCodeList(HttpServletRequest request, HttpServletResponse response) {
        
    	ModelAndView modelAndView = new ModelAndView("jsonView");
            ArrayList<CodeBean> codeList = baseServiceFacade.findCodeList();

            modelAndView.addObject("codeList", codeList);
          

        return modelAndView;
    }

    public ModelAndView batchCodeProcess(HttpServletRequest request, HttpServletResponse response) {
    	ModelAndView modelAndView = new ModelAndView("jsonView");
            String list = request.getParameter("batchList");
            String list2 = request.getParameter("batchList2");
            ObjectMapper mapper = new ObjectMapper();

    		ArrayList<CodeBean> codeList = null;
    		ArrayList<DetailCodeBean> codeList2 = null;
        	
    		try {
    			codeList = mapper.readValue(list, new TypeReference<ArrayList<CodeBean>>(){});
    			codeList2 = mapper.readValue(list2, new TypeReference<ArrayList<DetailCodeBean>>(){});
    		} catch (IOException e) {
    			e.printStackTrace();
    		}

            baseServiceFacade.batchCodeProcess(codeList, codeList2);

            baseServiceFacade.batchCodeProcess(codeList, codeList2);

        return modelAndView;
    }

}
