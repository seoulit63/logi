package kr.co.seoulit.erp.logi.base.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.logi.base.to.LogiCodeTO;

@Mapper
public interface LogiCodeDAO {

	public ArrayList<LogiCodeTO> selectCodeList();

	public void insertCode(LogiCodeTO codeTO);

	public void updateCode(LogiCodeTO codeTO);

	public void deleteCode(LogiCodeTO codeTO);

}
