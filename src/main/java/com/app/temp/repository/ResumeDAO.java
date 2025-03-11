package com.app.temp.repository;

import com.app.temp.domain.dto.MemberResumeDTO;
import com.app.temp.mapper.ResumeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
@RequiredArgsConstructor
public class ResumeDAO {
    private final ResumeMapper resumeMapper;
    public ArrayList<MemberResumeDTO> findByMemberId(Long memberId) {
        return resumeMapper.selectByMemberId(memberId);
    }
}
