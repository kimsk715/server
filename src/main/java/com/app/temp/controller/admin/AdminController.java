package com.app.temp.controller.admin;

import com.app.temp.domain.dto.*;
import com.app.temp.domain.vo.AdminVO;
import com.app.temp.service.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@Slf4j
@RequiredArgsConstructor
public class AdminController {
    private final HttpSession session;
    private final AdminService adminService;
    private final ProgramService programService;
    private final MemberService memberService;
    private final CompanyMemberService companyMemberService;
    private final InquiryService inquiryService;


    @GetMapping("admin/home")
        public void home(Model model) {
    }

    @PostMapping("admin/home")
    public String adminLogin(String adminId, String adminPassword, RedirectAttributes redirectAttributes) {
        Optional<AdminVO> admin = adminService.login(adminId, adminPassword);

        if (admin.isEmpty()) {
            // 로그인 실패 시, 로그인 페이지로 돌아가기
            redirectAttributes.addFlashAttribute("error", "아이디나 비밀번호가 잘못되었습니다.");
            return "redirect:/member/admin-login"; // 로그인 페이지로 리디렉트
        }

        // 로그인 성공 시 세션에 관리자 정보 저장
        session.setAttribute("admin", admin.get());
        return "redirect:/admin/home"; // 관리자 홈으로 리디렉트
    }



    @GetMapping("/admin/home/members")
    @ResponseBody
    public AdminMemberListDTO getMemberList(MemberPagination memberpagination, Model model) {
        return memberService.getAllAdmin(memberpagination);
    }

    @GetMapping("/admin/home/programs")
    @ResponseBody
    public AdminProgramListDTO getProgramList(Pagination pagination, Model model, HttpSession session) {
        return programService.getAllProgram(pagination);
    }

    @GetMapping("/admin/home/company-members")
    @ResponseBody
    public AdminCompanyMemberListDTO getCompanyMemberList(CompanyMemberPagination companyMemberPagination, Model model, HttpSession session) {
        return companyMemberService.getAllAdmin(companyMemberPagination);
    }

    @GetMapping("/admin/home/member-inquiries")
    @ResponseBody
    public AdminMemberInquiryDTO getMemberInquiryList(MemberInquiryPagination memberInquiryPagination, Model model) {
        return inquiryService.getAll(memberInquiryPagination);
    }

    @GetMapping("/admin/home/company-inquiries")
    @ResponseBody
    public AdminCompanyInquiryListDTO getCompanyInquiryList(CompanyInquiryPagination companyInquiryPagination, Model model) {
        return inquiryService.getAllCompany(companyInquiryPagination);
    }
}