package kr.co.seoulit.erp.logi.logistics.purchase.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.logi.logistics.purchase.to.OrderInfoTO;

@Mapper
public interface OrderDAO {
	 
	 public HashMap<String,Object> getOrderDialogInfo(HashMap<String, Object> resultMap);
	 
	 public ArrayList<OrderInfoTO> getOrderInfoListOnDelivery();

	 public HashMap<String,Object> order(HashMap<String,Object> resultMap);	 

	public HashMap<String, Object> getOrderList(HashMap<String, Object> param);

	public HashMap<String, Object> optionOrder(HashMap<String, Object> param);

	public ArrayList<OrderInfoTO> getOrderInfoList(HashMap<String, Object> param);
	 
}
