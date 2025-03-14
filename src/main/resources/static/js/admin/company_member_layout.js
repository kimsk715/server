const companyMemberLayout = (() =>{
    const showList = async (companyMemberListData) =>{
        const tbodyCompanyMember = document.querySelector(".company-member-table tbody");
        const companyMemberPageWrap = document.querySelector(".company-member-pagination");
        const companyMemberPagination = companyMemberListData.companyMemberPagination;
        let companyMemberText = ``;
        companyMemberListData.companyMemberList.forEach((companymember) => {


            companyMemberText += `
                <tr>
                  <td>${companymember.id}</td>
                  <td>${companymember.companyName}</td>
                  <td>${companymember.companyBusinessNumber}</td>
                  <td>${companymember.memberName}</td>
                  <td>${companymember.memberEmail}</td>
                  <td>${companymember.createdDate}</td>
                  <td>${companymember.memberRecentLogin}</td>
                  <td>
                      <span class="status approved">${companymember.memberStatus}</span>
                  </td>
                  <td>
                      <button type="button" class="detail-btn" value="${companymember.id}">상세보기</button>                 
                  </td>
             </tr>
               `;
        })
        tbodyCompanyMember.innerHTML = companyMemberText;

        companyMemberText=``;

        if(companyMemberPagination.prev) {
            companyMemberText += `<button type="button" class="page-btn" id="${companyMemberPagination.startPage - 1}">이전</button>`
        }
        for(let i = companyMemberPagination.startPage; i<=companyMemberPagination.endPage; i++){
            if(companyMemberPagination.page === i){
                companyMemberText += `<button type="button" class="page-btn active" id="${i}">${i}</button>`
                continue;
            }
            companyMemberText += `<button type="button" class="page-btn" id="${i}">${i}</button>`
        }
        if(companyMemberPagination.next){
            companyMemberText += `<button type="button" class="page-btn" id="${companyMemberPagination.endPage + 1}">다음</button>`
        }
        if(companyMemberPagination.check === 0){
            companyMemberText = "";
        }
        companyMemberPageWrap.innerHTML = companyMemberText;

    }
    return {showList : showList};
})();

    const companyMemberTable = document.querySelector("table.company-member-table");

companyMemberTable.addEventListener("click",(e)=>{
        if(e.target.classList.contains("detail-btn")){
            let companyMemberId = parseInt(e.target.value);
            openCompanyMemberDetail(companyMemberId);
        }
    })
    const openCompanyMemberDetail = async (companyMemberId) => {
        const modalContainer = document.querySelector("div.company-member-modal div.modal-container");

        const response = await fetch(`/admin/home/company-members`);
        const companyMemberData = await response.json();
        console.log(response)
        console.log(companyMemberData)
        const companyMember = companyMemberData.companyMemberList.find(p => p.id === companyMemberId)
        console.log(companyMember)

        modalContainer.innerHTML = `
                <!-- 모달 헤더 -->
                <div class="modal-header">
                    <h3>기업회원 상세정보</h3>
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
                        <h4>INFO </h4>
                        <table class="info-table">
                            <tbody>
                                <tr>
                                    <th>회원번호</th>
                                    <td id="company-member-id">${companyMember.id}</td>
                                    <th>기업명</th>
                                    <td id="member-company-name">${companyMember.companyName}</td>
                                </tr>
                                <tr>
                                    <th>사업자등록번호</th>
                                    <td id="business-number">${companyMember.companyBusinessNumber}</td>
                                    <th>대표자명</th>
                                    <td id="ceo-name">${companyMember.companyCEO}</td>
                                </tr>
                                <tr>
                                    <th>설립일</th>
                                    <td id="establishment-date">${companyMember.companyEstablishment}</td>
                                    <th>기업규모</th>
                                    <td id="company-size">중소기업</td>
                                </tr>
                                <tr>
                                    <th>사원수</th>
                                    <td id="employee-count">${companyMember.companyEmployee}명</td>
                                    <th>본사주소</th>
                                    <td id="company-address">
                                        ${companyMember.companyMainAddress}
                                    </td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>

                    <!-- 담당자 정보 섹션 -->
                    <div class="manager-info">
                        <h4>담당자 정보</h4>
                        <table class="manager-table">
                            <tbody>
                                <tr>
                                    <th>담당자명</th>
                                    <td id="manager-name">${companyMember.memberName}</td>
                                    <th>부서/직책</th>
                                    <td id="manager-position">${companyMember.companyMemberPosition}</td>
                                </tr>
                                <tr>
                                    <th>아이디</th>
                                    <td id="manager-userid">younghee123</td>
                                    <th>연락처</th>
                                    <td id="manager-phone">${companyMember.memberPhone}</td>
                                </tr>
                                <tr>
                                    <th>가입일</th>
                                    <td id="company-join-date">${companyMember.createdDate}</td>
                                    <th>최근접속일</th>
                                    <td id="company-last-access">${companyMember.memberRecentLogin}</td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td colspan="3" id="manager-email">
                                        ${companyMember.memberEmail}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 기업 상세 정보 섹션 -->
                    <div class="company-detail">
                        <h4>기업 상세정보</h4>
                        <select class="status-select detail-select">
                            <option value="">카테고리 선택</option>
                            <option value="company-logo">기업 로고</option>
                            <option value="business-certificate">
                                사업자등록증명원
                            </option>
                            <option value="company-intro">기업 소개</option>
                            <option value="financial-info">재무정보</option>
                            <option value="welfare">복리후생</option>
                            <option value="company-culture">기업문화</option>
                            <option value="etc">기타정보</option>
                        </select>
                        <!-- 상세 내용 표시 영역 -->
                        <div class="detail-content">
                            <!-- 기업 로고 섹션 -->
                            <div
                                class="content-section company-logo-section"
                                style="display: none"
                            >
                                <div class="logo-image-view">
                                    <img
                                        src="/images/admin/default_logo.jfif"
                                        alt="기업 로고"
                                    />
                                </div>
                            </div>
                            <!-- 사업자등록증명원 섹션 추가 -->
                            <div
                                class="content-section business-certificate-section"
                                style="display: none"
                            >
                                <div class="certificate-image-view">
                                    <img
                                        src="/images/admin/default_certificate.png"
                                        alt="사업자등록증명원"
                                        class="certificate-image"
                                    />
                                    <div class="certificate-info">
                                        <p class="certificate-date">
                                            등록일: 2025-01-15
                                        </p>
                                        <p class="certificate-notice">
                                            * 이미지를 클릭하면 원본 크기로 볼
                                            수 있습니다
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- 기업 소개 섹션 -->
                            <div
                                class="content-section company-intro-section"
                                style="display: none"
                            >
                                <p>혁신적인 IT 서비스를 제공하는 기업...</p>
                            </div>

                            <!-- 재무정보 섹션 -->
                            <div
                                class="content-section financial-info-section"
                                style="display: none"
                            >
                                <p>연매출 100억원...</p>
                            </div>

                            <!-- 복리후생 섹션 -->
                            <div
                                class="content-section welfare-section"
                                style="display: none"
                            >
                                <p>자유로운 연차사용...</p>
                            </div>

                            <!-- 기업문화 섹션 -->
                            <div
                                class="content-section company-culture-section"
                                style="display: none"
                            >
                                <p>수평적인 조직문화...</p>
                            </div>

                            <!-- 기타정보 섹션 -->
                            <div
                                class="content-section etc-section"
                                style="display: none"
                            >
                                <p>특이사항 없음</p>
                            </div>
                        </div>
                    </div>

                    <!-- 활동 내역 섹션 -->
                    <div class="company-activity">
                        <h4>활동 내역</h4>
                        <select class="status-select activity-select">
                            <option value="">카테고리 선택</option>
                            <option value="announcement-history">
                                공고 등록 내역
                            </option>
                            <option value="program-history">
                                체험 프로그램 운영 내역
                            </option>
                            <option value="report-history">신고 내역</option>
                        </select>
                        <!-- 활동 내역 표시 영역 -->
                        <div class="activity-content">
                            <!-- 공고 등록 내역 섹션 -->
                            <div
                                class="content-section announcement-history-section"
                                style="display: none"
                            >
                                <table class="activity-table">
                                    <thead>
                                        <tr>
                                            <th>공고번호</th>
                                            <th>공고제목</th>
                                            <th>등록일</th>
                                            <th>마감일</th>
                                            <th>상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2025-001</td>
                                            <td>프론트엔드 개발자 체험</td>
                                            <td>2025-02-10</td>
                                            <td>2025-03-10</td>
                                            <td>진행중</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- 체험 프로그램 운영 내역 섹션 -->
                            <div
                                class="content-section program-history-section"
                                style="display: none"
                            >
                                <table class="activity-table">
                                    <thead>
                                        <tr>
                                            <th>프로그램명</th>
                                            <th>시작일</th>
                                            <th>종료일</th>
                                            <th>참가인원</th>
                                            <th>상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>백엔드 개발자 체험</td>
                                            <td>2025-01-15</td>
                                            <td>2025-01-16</td>
                                            <td>3명</td>
                                            <td>완료</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- 신고 내역 섹션 -->
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
                                            <td>부적절한 내용</td>
                                            <td>처리완료</td>
                                        </tr>
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
        openModal(document.querySelector(".company-member-modal"));
    };
