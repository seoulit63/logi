package kr.co.seoulit.erp.hr.basicInfo.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.hr.basicInfo.to.PositionTO;

@Mapper
public interface PositionDAO {
   
   public ArrayList<PositionTO> selectPositionList();
   
   
   
}