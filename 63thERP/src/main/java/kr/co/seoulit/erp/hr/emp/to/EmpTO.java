package kr.co.seoulit.erp.hr.emp.to;




import kr.co.seoulit.common.to.BaseTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)

public class EmpTO extends BaseTO{
   private String empCode;
   private String empName;
   private String birthDate;
   private String gender; 
   private String mobileNumber;
   private String address; 
   private String companyName;
   private String detailAddress;
   private String email;
   private String workPlace;
   private String position;
   
}