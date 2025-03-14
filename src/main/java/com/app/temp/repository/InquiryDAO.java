package com.app.temp.repository;

import com.app.temp.domain.dto.MemberInquiryDTO;
import com.app.temp.domain.dto.MemberInquiryPagination;
import com.app.temp.mapper.MemberInquiryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor

public class InquiryDAO {
    private final MemberInquiryMapper memberInquiryMapper;



    public List<MemberInquiryDTO> findAll(MemberInquiryPagination memberInquiryPagination) {
            return memberInquiryMapper.selectAll(memberInquiryPagination);
    }

    public int countAll(MemberInquiryPagination memberInquiryPagination) {
        return memberInquiryMapper.countAll(memberInquiryPagination);
    }


}
