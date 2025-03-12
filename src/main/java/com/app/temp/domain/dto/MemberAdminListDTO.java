package com.app.temp.domain.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
// 개인 회원 목록(관리자 페이지)
public class MemberAdminListDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String memberName;
    private String memberEmail;
    private String memberStatus; // 활성/비활성
    private String memberRecentLogin;
    private String createdDate;
}
