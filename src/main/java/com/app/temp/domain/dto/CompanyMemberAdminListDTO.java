package com.app.temp.domain.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
// 기업회원 목록(관리자 페이지)
public class CompanyMemberAdminListDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String companyName;
    private String companyBusinessNumber;
    private String memberName;
    private String memberEmail;
    private String memberRegisterDate;
    private String memberRecentLogin;
    private String memberStatus;
}
