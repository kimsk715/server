package com.app.temp.service;

import com.app.temp.domain.dto.AdminCompanyInquiryListDTO;
import com.app.temp.domain.dto.AdminMemberInquiryDTO;
import com.app.temp.domain.dto.CompanyInquiryPagination;
import com.app.temp.domain.dto.MemberInquiryPagination;
import com.app.temp.repository.CompanyInquiryDAO;
import com.app.temp.repository.InquiryDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class InquiryService {
    private final InquiryDAO inquiryDAO;
    private final CompanyInquiryDAO companyInquiryDAO;

    public AdminMemberInquiryDTO getAll(MemberInquiryPagination memberInquiryPagination) {
        AdminMemberInquiryDTO adminMemberInquiryDTO = new AdminMemberInquiryDTO();
        memberInquiryPagination.create(inquiryDAO.countAll(memberInquiryPagination));
        adminMemberInquiryDTO.setMemberInquiryPagination(memberInquiryPagination);
        adminMemberInquiryDTO.setMemberInquiryList(inquiryDAO.findAll(memberInquiryPagination));
        return adminMemberInquiryDTO;
    }

    public AdminCompanyInquiryListDTO getAllCompany(CompanyInquiryPagination companyInquiryPagination) {
        AdminCompanyInquiryListDTO adminCompanyInquiryListDTO = new AdminCompanyInquiryListDTO();
        companyInquiryPagination.create(companyInquiryDAO.countAllAdmin(companyInquiryPagination));
        adminCompanyInquiryListDTO.setCompanyInquiryList(companyInquiryDAO.findAllAdmin(companyInquiryPagination));
        adminCompanyInquiryListDTO.setCompanyInquiryPagination(companyInquiryPagination);
        return adminCompanyInquiryListDTO;
    }
}

