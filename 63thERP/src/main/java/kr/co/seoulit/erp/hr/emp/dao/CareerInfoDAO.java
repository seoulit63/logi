package kr.co.seoulit.erp.hr.emp.dao;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Mapper;
import kr.co.seoulit.erp.hr.emp.to.CareerInfoTO;

@Mapper
public interface CareerInfoDAO {
	public ArrayList<CareerInfoTO> selectCareerList(String code);

	public void insertCareerInfo(CareerInfoTO careerInfo);
	public void updateCareerInfo(CareerInfoTO careerInfo);
	public void deleteCareerInfo(CareerInfoTO careerInfo);
}
