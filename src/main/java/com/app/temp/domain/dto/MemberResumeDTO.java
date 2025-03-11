package com.app.temp.domain.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
// 개인 회원 이력서(관리자 - 개인회원 상세보기)
public class MemberResumeDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long memberId;
    private String resumeTitle;
    private String resumeIntroduce;
    private String resumeProfilePhoto;
    private String createdDate;
    private String resumeRequired;

}
