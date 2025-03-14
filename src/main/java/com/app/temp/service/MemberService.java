package com.app.temp.service;

import com.app.temp.domain.dto.*;
import com.app.temp.repository.MemberDAO;
import com.app.temp.repository.ResumeDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class MemberService {
    private final MemberDAO memberDAO;
    private final ResumeDAO resumeDAO;
    private final Pagination pagination;
//    회원가입
    public void join(MemberDTO memberDTO){
        memberDAO.save(memberDTO.toVO());
    }

//    이메일로 회원 조회
    public Optional<MemberDTO> getMember(String memberEmail){
        Optional<MemberDTO> member = memberDAO.findByMemberEmail(memberEmail);
        member.ifPresent(members -> members.setResumeList(resumeDAO.findByMemberId(members.getId())));

//        중간에 이력서 추가 --> 회원 정보에 포함되어있으면 프로그램 목록에서 즉시 이력서 제출 가능.
        return memberDAO.findByMemberEmail(memberEmail);
    }

//  아이디로 회원 조회
    public Optional<MemberDTO> getMemberById(MemberDTO memberDTO){
        return memberDAO.findByMemberId(memberDTO.getId());
    }
    // 로그인하면 회원 최근 로그인 시간 갱신
    public void updateMemberRecentLogin(Long id){
        memberDAO.updateMemberRecentLogin(id);
    }

    public AdminMemberListDTO getAllAdmin(MemberPagination memberpagination){
        AdminMemberListDTO memberAdminList = new AdminMemberListDTO();
        memberpagination.create(memberDAO.countAll(memberpagination));
        log.info(String.valueOf(memberDAO.countAll(memberpagination)));
        memberAdminList.setMemberPagination(memberpagination);
        memberAdminList.setMemberList(memberDAO.findAllAdmin(memberpagination));
        return memberAdminList;
    }

    public Optional<MemberInfoAdminDTO> getMemberInfoAdmin(Long id){
        return memberDAO.findMemberInfoAdmin(id);
    }
}
