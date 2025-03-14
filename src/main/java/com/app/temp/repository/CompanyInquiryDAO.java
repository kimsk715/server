package com.app.temp.repository;

import com.app.temp.domain.dto.CompanyInquiryListDTO;
import com.app.temp.domain.dto.CompanyInquiryPagination;
import com.app.temp.mapper.CompanyInquiryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CompanyInquiryDAO {
    private final CompanyInquiryMapper companyInquiryMapper;

    public List<CompanyInquiryListDTO> findAllAdmin(CompanyInquiryPagination companyInquiryPagination) {
        return companyInquiryMapper.selectAllAdmin(companyInquiryPagination);
    }

    public int countAllAdmin(CompanyInquiryPagination companyInquiryPagination) {
        return companyInquiryMapper.countAllAdmin(companyInquiryPagination);
    }
}
