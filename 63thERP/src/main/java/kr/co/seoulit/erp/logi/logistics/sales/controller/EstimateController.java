package kr.co.seoulit.erp.logi.logistics.sales.controller;

import java.util.ArrayList;
//************************* 2020.08.27 63기 양지훈 수정 시작 *************************
//description:	HashMap, LinkedHashMap, Map, ObjectMapper, Gson, GsonBuilder  import

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

//************************* 2020.08.27 63기 양지훈 수정 종료 *************************
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;




import kr.co.seoulit.erp.logi.logistics.sales.serviceFacade.SalesServiceFacade;

import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateDetailTO;
import kr.co.seoulit.erp.logi.logistics.sales.to.EstimateTO;


@RestController
@CrossOrigin("*")
@RequestMapping("/logi/*")
public class EstimateController {

	@Autowired
	private SalesServiceFacade salesSF;
	
	private ModelMap modelMap = new ModelMap();

//************************* 2020.08.27 63기 양지훈 수정 시작 *************************
//	description:	gson import
//	
//	GSON 라이브러리
//	속성값이 null 인 속성도 json 변환
	private static Gson gson = new GsonBuilder().serializeNulls().create();
//************************* 2020.08.27 63기 양지훈 수정 종료 *************************
	
	@RequestMapping("/searchEstimates.do")
	public ModelMap searchEstimateInfo(HttpServletRequest request, HttpServletResponse response) {

		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String dateSearchCondition = request.getParameter("dateSearchCondition");

		try {

			ArrayList<EstimateTO> estimateTOList = salesSF.getEstimateList(dateSearchCondition, startDate, endDate);

			modelMap.put("gridRowJson", estimateTOList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

// 酉곕떒�뿉 二쇱꽍 泥섎━ �릺�뼱�엳�쓬
	@RequestMapping("/searchEstimateDetail.do")
	public ModelMap searchEstimateDetailInfo(HttpServletRequest request, HttpServletResponse response) {
		
		String estimateNo = request.getParameter("estimateNo");

		try {

			ArrayList<EstimateDetailTO> estimateDetailTOList = salesSF.getEstimateDetailList(estimateNo);

			modelMap.put("gridRowJson", estimateDetailTOList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

	
//************************* 2020.08.27 63기 양지훈 수정 시작 *************************
//	description:	주석 처리 되어 있는 부분들 해제
//					주석 내용들 UTF-8로 수정
//					newEstimateInfo의 TYPE이 LinkedHashMap임; ObjectMapper를 사용해 TYPE을 EstimateTO로 변환;
//					Data @RequestBody로 받아옴;

	@RequestMapping(value="/sales/addNewEstimates.do", method=RequestMethod.POST)
	public ModelMap addNewEstimate(@RequestBody Map<String, Object> params) {
//		estimateDate: 견적일자
//		newEstimateInfo: 견적 + 견적상세
		String estimateDate = (String) params.get("estimateDate");
		ObjectMapper mapper = new ObjectMapper();
		EstimateTO newEstimateInfo = mapper.convertValue(params.get("newEstimateInfo"), EstimateTO.class);
		try {
			HashMap<String, Object> resultList = salesSF.addNewEstimate(estimateDate, newEstimateInfo);
			modelMap.clear();
			modelMap.put("result", resultList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");
		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());
		}
		return modelMap;
	}
//************************* 2020.08.27 63기 양지훈 수정 종료 *************************

	@RequestMapping("/batchEstimateDetailListProcess.do")
	public ModelMap batchListProcess(HttpServletRequest request, HttpServletResponse response) {

//		String batchList = request.getParameter("batchList");

//		ArrayList<EstimateDetailTO> estimateDetailTOList = gson.fromJson(batchList,
//				new TypeToken<ArrayList<EstimateDetailTO>>() {
//				}.getType());

		try {

//			HashMap<String, Object> resultList = salesSF.batchEstimateDetailListProcess(estimateDetailTOList);
//
//			modelMap.put("result", resultList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "�꽦怨�");

		} catch (Exception e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}

		return modelMap;
	}

}
