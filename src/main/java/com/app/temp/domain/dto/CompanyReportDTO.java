package com.app.temp.domain.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
// 신고 목록(기업 회원 상세보기에 출력할 내용)
public class CompanyReportDTO {
    @EqualsAndHashCode.Include
    private Long companyId;
    private String reportDate;
    private String reportType;
    private String reportStatus;
}
