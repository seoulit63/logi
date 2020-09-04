package kr.co.seoulit.erp.acc.company.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import kr.co.seoulit.erp.acc.company.to.WorkplaceBean;


@Mapper
public interface AccWorkplaceDAO {
	
	public void updateWorkplaceAccount(String code,String status); 
	
    public WorkplaceBean selectWorkplace(String workplaceCode);
	
	public void insertWorkplace(WorkplaceBean workplaceBean);
	
	public void deleteWorkplace(String code); 
	
	public ArrayList<WorkplaceBean> selectAllWorkplaceList();
}
