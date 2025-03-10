package com.app.temp.domain.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
// 공지 메인
public class NoticeListDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String noticeTitle;
    private String createdDate;

}
