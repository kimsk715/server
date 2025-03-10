package com.app.temp.controller.main;

import com.app.temp.domain.dto.MainProgramInfoDTO;
import com.app.temp.domain.dto.MainProgramListDTO;
import com.app.temp.domain.dto.MemberDTO;
import com.app.temp.domain.vo.ScrapVO;
import com.app.temp.service.MemberService;
import com.app.temp.service.ProgramService;
import com.app.temp.service.ScrapService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/program")
// 여기 맵핑에 * 달면 스크랩 버튼이 망가지니 혹시나 바꿔야 될 일 있으면 말씀해주세요!
@Slf4j
public class ProgramController {
    private final ProgramService programService;
    private final ScrapService scrapService;
    private final MemberService memberService;


    public ProgramController(ProgramService programService, ScrapService scrapService, MainProgramInfoDTO mainProgramInfoDTO, MemberService memberService) {
        this.programService = programService;
        this.scrapService = scrapService;
        this.memberService = memberService;
    }

    @GetMapping("list")
    public String list(Model model, HttpSession httpSession) {
        MemberDTO member = (MemberDTO) httpSession.getAttribute("member");
        String memberEmail = member.getMemberEmail();
        Long memberId = member.getId();
//        log.info("memberEmail: " + memberEmail);
//        log.info("memberId: " + memberId);
        programService.getAllMain(memberEmail);
        ArrayList<MainProgramListDTO> mainProgramListDTOS = programService.getAllMain(memberEmail);
        model.addAttribute("mainProgramListDTOS", mainProgramListDTOS);
        return "/main/program-list";
    }

    @GetMapping("detail")
    public String detail() {
        return "/main/program-detail";
    }

//   각 프로그램으로 이동. 아직 작업 중
    @GetMapping("detail/{id}")
    public String programDetail(@PathVariable Long id, Model model) {
        Optional<MainProgramInfoDTO> programInfo =  programService.getMainProgramInfoDTOById(id);
        if(programInfo.isPresent()) {
            model.addAttribute("programInfo", programInfo.get());
        }
        else{
            model.addAttribute("programInfo", new MainProgramInfoDTO());
        }

        return "/main/program-detail";

    }

    @GetMapping("company-info")
    public String companyInfo() {
        return "/main/company-info";
    }

// 스크랩 추가
    @PostMapping("list/add/{programId}")
    public ResponseEntity<Void> addScrap(@PathVariable Long programId, HttpSession httpSession) {
        ScrapVO scrapVO = new ScrapVO();
        MemberDTO member = (MemberDTO) httpSession.getAttribute("member");
        String memberEmail = member.getMemberEmail();
        Long memberId = memberService.getMember(memberEmail).get().getId();
        scrapVO.setProgramId(programId);
        scrapVO.setMemberId(memberId); //테스트용
        scrapService.create(scrapVO);
        return ResponseEntity.ok().build();
    }
// 스크랩 제거
    @DeleteMapping("list/delete/{programId}")
    public ResponseEntity<Void> deleteScrap(@PathVariable Long programId, HttpSession httpSession) {

        ScrapVO scrapVO = new ScrapVO();
        MemberDTO member = (MemberDTO) httpSession.getAttribute("member");
        String memberEmail = member.getMemberEmail();
        Long memberId = memberService.getMember(memberEmail).get().getId();
        scrapVO.setProgramId(programId);
        scrapVO.setMemberId(memberId); //테스트용
        scrapService.delete(scrapVO);
        return ResponseEntity.ok().build();
    }
// 스크랩 버튼 클릭 시 스크랩의 null 여부 확인.
    @GetMapping("list/exists/{programId}")
    public ResponseEntity<Map<String, Boolean>> checkScrapExists(@PathVariable Long programId, HttpSession httpSession) {
        ScrapVO scrapVO = new ScrapVO();
        MemberDTO member = (MemberDTO) httpSession.getAttribute("member");
        String memberEmail = member.getMemberEmail();
        Long memberId = memberService.getMember(memberEmail).get().getId();
        scrapVO.setProgramId(programId);
        System.out.println("🔍 존재 여부 확인 요청: programId = " + programId);
        scrapVO.setMemberId(memberId); //테스트용
        boolean exists = scrapService.isExists(scrapVO);
        System.out.println("✅ 존재 여부: " + exists);
        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }



}
