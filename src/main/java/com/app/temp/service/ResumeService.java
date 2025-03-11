package com.app.temp.service;

import com.app.temp.domain.dto.MemberResumeDTO;
import com.app.temp.mapper.ResumeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ResumeService {
    private final ResumeMapper resumeMapper;

    public ArrayList<MemberResumeDTO> check(Long memberId) {
        ArrayList<MemberResumeDTO> memberResumeDTO = resumeMapper.selectByMemberId(memberId);
        memberResumeDTO.forEach(resumeDTO -> {
            String value;
            if(resumeDTO.getResumeIntroduce() != null && resumeDTO.getResumeTitle() !=null && resumeDTO.getResumeProfilePhoto() !=null) {
                resumeDTO.setResumeRequired("true");
            }
            else{
                resumeDTO.setResumeRequired("false");
            }
        });
        return memberResumeDTO;
    }
}
