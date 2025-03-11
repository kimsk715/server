package com.app.temp.domain.dto;

import com.app.temp.domain.vo.ProgramVO;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
// /program/detail/{programId} 에서 띄울 프로그램 정보.
public class MainProgramInfoDTO {
    @EqualsAndHashCode.Include
    private Long id; // 프로그램 번호
    private String programName;
    private Long categoryCid;
    private String categoryName;
    private int duration;
    private int year;
    private int month;
    private String companyUrl;
    private String categoryCname;
    private String programEndDate;
    private String programDetail;
    private int programPrice;
    private String programBenefit;
    private String companyName;
    private String companyIntroduce;
    private String companyEstablishment;
    private String companyMainAddress;
    private String companySubAddress;
    private String companyLogoPath; // 로고 경로
    private String companyWelfare;
    private String companyCulture;
    private List<CompanyImageDTO> companyImageList;
    private int imageCount; // 회사 이미지 개수

    public ProgramVO toProgramVO() {
        ProgramVO programVO = new ProgramVO();
        programVO.setId(id);
        programVO.setProgramName(programName);
        programVO.setProgramDetail(programDetail);
        programVO.setProgramEndDate(programEndDate);
        programVO.setProgramPrice(programPrice);
        programVO.setProgramBenefit(programBenefit);
        return programVO;
    }

}
