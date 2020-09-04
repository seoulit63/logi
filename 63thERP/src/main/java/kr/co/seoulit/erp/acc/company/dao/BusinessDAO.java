package kr.co.seoulit.erp.acc.company.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.acc.company.to.BusinessBean;

@Mapper
public interface BusinessDAO {

    public ArrayList<BusinessBean> selectBusinessList();
}
