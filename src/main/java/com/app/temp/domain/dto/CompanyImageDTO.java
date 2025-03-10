package com.app.temp.domain.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
// 공고에서 이미지 띄우기 위한 목록.
// 썸네일 여부가 필요 없이 모든 이미지 출력하면 됨.
public class CompanyImageDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String companyImagePath;
    private Long companyId;
}
