package kr.co.seoulit.erp.sys.serviceFacade;

import kr.co.seoulit.erp.hr.emp.dao.EmpSearchingDAO;
import kr.co.seoulit.erp.hr.emp.dao.EmployeeSecretDAO;
import kr.co.seoulit.erp.hr.emp.to.EmpInfoTO;
import kr.co.seoulit.erp.hr.emp.to.EmployeeSecretTO;
import kr.co.seoulit.erp.sys.dao.AuthorityDao;
import kr.co.seoulit.erp.sys.dao.CodeDao;
import kr.co.seoulit.erp.sys.dao.CodeDetailDao;
import kr.co.seoulit.erp.sys.dao.MenuDao;
import kr.co.seoulit.erp.sys.exception.IdNotFoundException;
import kr.co.seoulit.erp.sys.exception.PwMissMatchException;
import kr.co.seoulit.erp.sys.to.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BaseServiceFacadeImpl implements BaseServiceFacade {

	@Autowired
	MenuDao menuDao;
	@Autowired
	CodeDao codeDao;
	@Autowired
	CodeDetailDao codeDetailDao;
	@Autowired
	AuthorityDao authorityDao;
	@Autowired
	EmpSearchingDAO empSearchingDAO;
	@Autowired
	EmployeeSecretDAO empSecretDAO;

	@Override
	public List<MenuTo> findMenuList() {
		List<MenuTo> flatMenuList = menuDao.selectMenuList();
		Map<String, MenuTo> treeMenuList = new HashMap<>();
		List<MenuTo> topMenuList = new ArrayList<>();

		for (MenuTo flatMenu : flatMenuList) {
			treeMenuList.put(flatMenu.getMenuCode(), flatMenu);
			// 자신이 최상위 메뉴일 경우
			if (flatMenu.getSuperMenuCode() == null)
				topMenuList.add(flatMenu);

			// 상위 메뉴가 존재할 경우
			else {
				if (!treeMenuList.containsKey(flatMenu.getSuperMenuCode())) {
					System.out.println("상위 메뉴가 존재하지 않습니다.");
					continue;
				}

				MenuTo menu = treeMenuList.get(flatMenu.getSuperMenuCode());

				// subMenuList가 생성되어 있지 않을 경우
				if (menu.getSubMenuList() == null)
					menu.setSubMenuList(new ArrayList<>());

				menu.getSubMenuList().add(flatMenu);
			}
		}
		return topMenuList;
	}

	@Override
	public List<SysCodeTo> findCodeList() {
		return codeDao.selectCodeList();
	}

	@Override
	public List<SysCodeDetailTo> findCodeDetailList() {
		return codeDetailDao.selectAllCodeDetailList();
	}

	@Override
	public List<SysCodeDetailTo> findPayStepCodeDetailList(String divisionCode) {
		// TODO Auto-generated method stub
		return codeDetailDao.selectPayStepCodeDetailList(divisionCode);
	}

	@Override
	public List<AuthorityTo> findAuthorityList() {
		return authorityDao.selectAuthorityList();
	}

	@Override
	public List<AuthorityTo> findMenuAuthorityList(Map<String, Object> data) {
		String authorityCode = data.get("authorityCode").toString();
		return authorityDao.selectMenuAuthorityList(authorityCode);
	}

	@Override
	public <T> void batchDetailCodeProcess(T TO, Map<String, Object> codeColumn) {
		// TODO Auto-generated method stub
		try {
			SysCodeDetailTo codeDetailTO = new SysCodeDetailTo();
			Method method = TO.getClass().getMethod("getStatus");
			codeDetailTO.setStatus((String) method.invoke(TO));
			for (String key : codeColumn.keySet()) {
				String colValue = (String) codeColumn.get(key);
				if (colValue != null) {
					switch (key) {
					case "divisionCodeNo":
						codeDetailTO.setDivisionCodeNo(colValue);
						break;
					case "detailCode":
						codeDetailTO.setDetailCode(colValue);
						break;
					case "detailCodeName":
						codeDetailTO.setDetailCodeName(colValue);
						break;
					}
				}
			}
			switch (codeDetailTO.getStatus()) {
			case "inserted":
				codeDetailDao.insertDetailCode(codeDetailTO);
				break;
			case "deleted":
				codeDetailDao.deleteDetailCode(codeDetailTO);
				break;
			case "updated":
				codeDetailDao.updateDetailCode(codeDetailTO);
				break;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public void batchDetailCodeProcess(List<SysCodeDetailTo> codeDetailList) {
		for (SysCodeDetailTo codeDetailTo : codeDetailList) {
			switch (codeDetailTo.getStatus()) {
			case "inserted":
				codeDetailDao.insertDetailCode(codeDetailTo);
				break;
			case "updated":
				codeDetailDao.updateDetailCode(codeDetailTo);
				break;
			case "deleted":
				codeDetailDao.deleteDetailCode(codeDetailTo);
				break;
			}
		}
	}

	@Override
	public EmpInfoTO myLogin(LoginTo loginTo) throws DataAccessException, IdNotFoundException, PwMissMatchException {
		
		EmpInfoTO empTo = checkEmpInfo(loginTo.getCompanyCode(),loginTo.getEmpCode(),loginTo.getWorkplaceCode());
		checkPassword(empTo.getEmpCode(),loginTo.getCompanyCode(),loginTo.getPassword());
		return empTo;
	}

	public EmpInfoTO checkEmpInfo(String companyCode , String empCode , String workplaceCode) throws IdNotFoundException {
		
		HashMap<String, String> map = new HashMap<>();
		
		map.put("companyCode", companyCode);
		map.put("workplaceCode", workplaceCode);
		map.put("empCode", empCode); 
		
		EmpInfoTO empTo = empSearchingDAO.getTotalEmpInfo(map);
		
		if(empTo == null) throw new IdNotFoundException("입력된 정보에 해당하는 사원은 없습니다.");

		return empTo;
		
	};

	public void checkPassword(String empCode , String companyCode , String passWord ) throws PwMissMatchException {
		
		HashMap<String, String> map = new HashMap<>();
		
		map.put("companyCode", companyCode);
		map.put("empCode", empCode); 
	
		EmployeeSecretTO empSecretInfo = empSecretDAO.selectUserPassWord(map);
		
		if(empSecretInfo != null)
			if(!empSecretInfo.getUserPassword().equals(passWord))
				throw new PwMissMatchException("비밀번호를 확인 해주세요.");
		
	};

}
