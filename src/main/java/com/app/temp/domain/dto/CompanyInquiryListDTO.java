package com.app.temp.domain.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
// 기업회원 문의 목록용 --> 관리자 페이지에서 기업 문의 전체 목록 조회
public class CompanyInquiryListDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String companyInquiryType;
    private String memberName;
    private String companyName;
    private String createdDate;
    private String companyInquiryStatus;
    private String companyInquiryDetail;


}
