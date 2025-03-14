const memberLayout = (() =>{
    const showList = async (memberListData) =>{
        const tbodyMember = document.querySelector(".normal-member-table tbody");
        const memberPageWrap = document.querySelector(".normal-member-pagination");
        const memberPagination = memberListData.memberPagination;
        let memberText = ``;
        memberListData.memberList.forEach((member) => {
            memberText += `
                <tr>
                  <td>${member.id}</td>
                  <td>${member.memberName}</td>
                  <td>${member.memberEmail}</td>
                  <td>${member.createdDate}</td>
                  <td>${member.memberRecentLogin}</td>
                  <td>
                      <span class="status approved">${member.memberStatus}</span>
                  </td>
                  <td>
                      <button type="button" class="detail-btn" value="${member.id}">상세보기</button>                 
                  </td>
             </tr>
               `;
        })
        tbodyMember.innerHTML = memberText;

        memberText=``;

        if(memberPagination.prev) {
            memberText += `<button type="button" class="page-btn" id="${memberPagination.startPage - 1}">이전</button>`
        }
        for(let i = memberPagination.startPage; i<=memberPagination.endPage; i++){
            if(memberPagination.page === i){
                memberText += `<button type="button" class="page-btn active" id="${i}">${i}</button>`
                continue;
            }
            memberText += `<button type="button" class="page-btn" id="${i}">${i}</button>`
        }
        if(memberPagination.next){
            memberText += `<button type="button" class="page-btn" id="${memberPagination.endPage + 1}">다음</button>`
        }
        memberPageWrap.innerHTML = memberText;
        console.log(memberPagination);
    }
    return {showList : showList};
})();

    const memberTable = document.querySelector("table.normal-member-table");

    memberTable.addEventListener("click",(e)=>{
        if(e.target.classList.contains("detail-btn")){
            let memberId = parseInt(e.target.value);
            openMemberDetail(memberId);
        }
    })
    const openMemberDetail = async (memberId) => {
        const modalContainer = document.querySelector("div.normal-member-modal div.modal-container");

        const response = await fetch(`/admin/home/members`);
        const memberData = await response.json();

        const member = memberData.memberList.find(p => p.id === memberId)

        modalContainer.innerHTML = `
                <div class="modal-header">
                    <h3>일반회원 상세정보</h3>
                    <button type="button" class="close-btn">
                        <img
                            src="/images/admin/cross.png"
                            alt="닫기"
                        />
                    </button>
                </div>

                <!-- 모달 본문 -->
                <div class="modal-body">
                    <!-- 기본 정보 섹션 -->
                    <div class="member-info">
                        <h4>INFO</h4>
                        <table class="info-table">
                            <tbody>
                                <tr>
                                    <th>회원번호</th>
                                    <td id="member-id">${member.id}</td>
                                    <th>이름</th>
                                    <td id="member-name">${member.memberName}</td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td id="member-email">
                                        ${member.memberEmail}
                                    </td>
                                    <th>연락처</th>
                                    <td id="member-phone">${member.memberPhone}</td>
                                </tr>
                                <tr>
                                    <th>가입일</th>
                                    <td id="join-date">${member.createdDate}</td>
                                    <th>최근접속일</th>
                                    <td id="last-access">${member.memberRecentLogin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 상세 내용 섹션 -->
                    <div class="member-detail">
                        <h4>회원 상세내용</h4>
                        <select class="status-select detail-select">
                            <option value="">카테고리 선택</option>
                            <option value="profile-image">대표 이미지</option>
                            <option value="brief-intro">간단 소개</option>
                            <option value="education">학력</option>
                            <option value="career">경력</option>
                            <option value="etc">기타사항</option>
                            <option value="self-intro">자기소개서</option>
                        </select>
                        <!-- 상세 내용 표시 영역 -->
                        <div class="detail-content">
                            <!-- 대표 이미지 섹션 -->
                            <div
                                class="content-section profile-image-section"
                                style="display: none"
                            >
                                <div class="profile-image-view">
                                    <img
                                        src="/images/admin/default_profile.webp"
                                        alt="프로필 이미지"
                                    />
                                </div>
                            </div>

                            <!-- 간단 소개 섹션 -->
                            <div
                                class="content-section brief-intro-section"
                                style="display: none"
                            >
                                <p>웃음이 밝은 허세웅입니다...</p>
                            </div>

                            <!-- 학력 섹션 -->
                            <div
                                class="content-section education-section"
                                style="display: none"
                            >
                                <p>xx 고등학교 최종 졸업...</p>
                            </div>

                            <!-- 경력 섹션 -->
                            <div
                                class="content-section career-section"
                                style="display: none"
                            >
                                <p>프로게이머 경력은...</p>
                            </div>

                            <!-- 기타사항 섹션 -->
                            <div
                                class="content-section etc-section"
                                style="display: none"
                            >
                                <p>TOEIC 900점...</p>
                            </div>

                            <!-- 자기소개서 섹션 -->
                            <div
                                class="content-section self-intro-section"
                                style="display: none"
                            >
                                <p>
                                    안녕하세요. 열정적인 프론트엔드 취업
                                    희망자입니다...
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 활동 내역 섹션 -->
                    <div class="member-activity">
                        <h4>활동 내역</h4>
                        <select class="status-select activity-select">
                            <option value="">카테고리 선택</option>
                            <option value="application-history">
                                지원이력
                            </option>
                            <option value="report-history">신고내역</option>
                        </select>
                        <!-- 활동 내역 표시 영역 -->
                        <div class="activity-content">
                            <!-- 지원이력 섹션 -->
                            <div
                                class="content-section application-history-section"
                                style="display: none"
                            >
                                <table class="activity-table">
                                    <thead>
                                        <tr>
                                            <th>지원일</th>
                                            <th>기업명</th>
                                            <th>공고명</th>
                                            <th>상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2025-02-10</td>
                                            <td>템프</td>
                                            <td>실무자 원데이 체험 프로그램</td>
                                            <td>지원완료</td>
                                        </tr>
                                        <!-- 추가 데이터는 서버에서 받아와 동적으로 추가 예정 -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- 신고내역 섹션 -->
                            <div
                                class="content-section report-history-section"
                                style="display: none"
                            >
                                <table class="activity-table">
                                    <thead>
                                        <tr>
                                            <th>신고일</th>
                                            <th>신고사유</th>
                                            <th>처리상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2025-02-04</td>
                                            <td>권리침해</td>
                                            <td>처리완료</td>
                                        </tr>
                                        <!-- 추가 데이터는 서버에서 받아와 동적으로 추가 예정 -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- 회원 상태 변경 섹션 -->
                    <div class="status-selection">
                        <h4>회원 상태</h4>
                        <select class="status-select">
                            <option value="active">활성</option>
                            <option value="dormant">휴면</option>
                            <option value="suspended">정지</option>
                            <option value="withdrawn">탈퇴</option>
                        </select>
                    </div>

                    <!-- 관리자 메모 -->
                    <div class="admin-memo">
                        <h4>관리자 메모</h4>
                        <textarea
                            placeholder="처리 관련 메모를 입력하세요"
                            id="admin-memo"
                        ></textarea>
                    </div>
                </div>

                <!-- 모달 푸터 -->
                <div class="modal-footer">
                    <button type="button" class="cancel-btn">취소</button>
                    <button type="button" class="save-btn">저장</button>
                </div>`;
        openModal(document.querySelector(".normal-member-modal"));
    };
