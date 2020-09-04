package kr.co.seoulit.erp.logi.logistics.purchase.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.logi.logistics.purchase.to.StockLogTO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.StockTO;

@Mapper
public interface StockDAO {
	
	public ArrayList<StockTO> selectStockList();
	
	public HashMap<String,Object> warehousing(HashMap<String,Object> resultMap);

	public ArrayList<StockLogTO> selectStockLogList(HashMap<String, String> param);
	
}
