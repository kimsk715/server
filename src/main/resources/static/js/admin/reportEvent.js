// 페이지네이션 버튼이 들어갈 요소
const reportPageWrap = document.querySelector(".report-pagination");
const keywordInputReport = document.querySelector(".report-search-input[name=keyword]");
const keywordSearchButton = document.querySelector(".report-search-btn");
const reportStatusFilter = document.querySelector(".report-status-filter");  // 하나만 선택(select 안에 option)
const reportDateFilter = document.querySelector(".report-date-filter");  // 얘도 하나만 선택

// 처음 페이지가 로드될 때 페이지 리스트를 가져와 화면에 출력
reportService.getList(reportLayout.showList);

// 기간 필터에 따른 날짜 계산(신고일~현재 날짜가 기간)
const calculateDateRange = (dateFilterValue) => {
    let createdDateStart = "";

    // new Date: 현재 날짜와 시간을 나타내는 Date 객체 생성
    // toISOString: Date 객체를 ISO? 형태의 문자열로 반환 ex)"2025-03-14T15:20:00.000Z"
    // split[0]: 반환된 문자열을 'T' 기준으로 분리 ex) "2025-03-14", "15:20:00.000Z" 하여 앞 부분 날짜만 가져옴
    let createdDateEnd = new Date().toISOString().split('T')[0];  // 오늘 날짜 (YYYY-MM-DD 형식)

    if (dateFilterValue === "week") {
        const date = new Date();
        date.setDate(date.getDate() - 7);  // 1주일 전 날짜 계산
        createdDateStart = date.toISOString().split('T')[0];
    } else if (dateFilterValue === "month") {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);  // 1개월 전 날짜 계산
        createdDateStart = date.toISOString().split('T')[0];
    } else if (dateFilterValue === "three-month") {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);  // 3개월 전 날짜 계산
        createdDateStart = date.toISOString().split('T')[0];
    } else if (dateFilterValue === "all") {
        // "전체"를 선택하면 날짜 필터링을 적용하지 않음
        createdDateStart = "";
        createdDateEnd = "";
    }

    return { createdDateStart, createdDateEnd };
}

// param 객체 업데이트
const updateParam = (param, createdDateStart, createdDateEnd, reportStatus) => {
    if (!param.search) param.search = {};   // 객체가 없으면 추가
    param.search.createdDateStart = createdDateStart;
    param.search.createdDateEnd = createdDateEnd;

    if (reportStatus) {
        param.search.reportStatus = reportStatus;
    } else {
        delete param.search.reportStatus; // 전체 선택 시 삭제
    }
};

// 초기 날짜 범위 설정
const dateFilterValue = reportDateFilter.value;
let { createdDateStart, createdDateEnd } = calculateDateRange(dateFilterValue);

// param 객체 선언
let param = { page: 1 }; // 기본 페이지 1로 설정
updateParam(param, createdDateStart, createdDateEnd);

// 페이지네이션 추가
reportPageWrap.addEventListener("click", (e) => {
    // 클릭된 요소가 페이지네이션 버튼이면
    if (e.target.className.includes("page-btn")) {
        // 선택한 페이지의 번호(타겟의 id)를 가져와 리스트 갱신
        param.page = e.target.id;
        reportService.getList(reportLayout.showList, param);    // 요청 시 param 객체 전달(한번에 전달되서 편함)
    }
});

// 검색 내용 입력하고 엔터 누를 시 처리
keywordInputReport.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const keyword = e.target.value;
        if (keyword) {
            param.search.keyword = keyword; // 검색어 정보(keyword) param 객체에 담기

            reportService.getList(reportLayout.showList, param);
        }
    }
});

// 검색 내용 입력하고 검색 버튼 누를 때도 동일
keywordSearchButton.addEventListener("click", () => {
    const keyword = keywordInputReport.value;
    if (keyword) param.search.keyword = keyword;

    reportService.getList(reportLayout.showList, param);
});

// 기간 필터 선택 시 처리
reportDateFilter.addEventListener("change", () => {
    const dateFilterValue = reportDateFilter.value;
    // 계산된 날짜를 이용하여 param에 전달하긔
    const { createdDateStart, createdDateEnd } = calculateDateRange(dateFilterValue);
    updateParam(param, createdDateStart, createdDateEnd);

    reportService.getList(reportLayout.showList, param);
});

// 보고서 상태값을 한글로 변환
const convertStatusToKorean = (status) => {
    switch (status) {
        case 'hold': return '보류';
        case 'pending': return '처리중';
        case 'false': return '허위신고';
        case 'completed': return '처리완료';
        case 'all': return '';  // '전체'는 빈 문자열로 처리 (서버에서 무시)
        default: return '';
    }
};

// 한글 상태값을 영어로 변환
const convertStatusToEnglish = (status) => {
    switch(status) {
        case '보류': return 'hold';
        case '처리중': return 'pending';
        case '허위신고': return 'false';
        case '처리완료': return 'completed';
        default: return '';
    }
}

// 날짜 필터 값 변환 함수
const convertDateRange = (selectedRange) => {
    if (selectedRange === 'all') {
        return { createdDateStart: '', createdDateEnd: '' }; // 전체 선택 시 빈 값 전달
    }
    return calculateDateRange(selectedRange); // 기존 범위 계산 함수 호출
};

// 필터 적용 함수
function applyFilters() {
    const reportStatus = reportStatusFilter.value;  // 선택된 신고 상태 가져오기
    const { createdDateStart, createdDateEnd } = convertDateRange(reportDateFilter.value);  // 날짜 변환 함수 호출

    const koreanStatus = convertStatusToKorean(reportStatus);

    // 필터 초기화 (전체 선택 시 기본값으로 리셋)
    if (reportStatus === 'all' && reportDateFilter.value === 'all') {
        delete param.search.reportStatus;
        delete param.search.createdDateStart;
        delete param.search.createdDateEnd;
    } else {
        updateParam(param, createdDateStart, createdDateEnd, koreanStatus);
    }

    // 리스트 갱신
    reportService.getList(reportLayout.showList, param);
}

// 필터 변경 이벤트 리스너 등록
reportStatusFilter.addEventListener("change", applyFilters);
reportDateFilter.addEventListener("change", applyFilters);

//     상세보기 버튼을 누르면 모달창이 뜸
const reportModal = document.querySelector(".report-modal");
const closeBtn = document.querySelector(".report-modal .close-btn");
const cancelBtn = document.querySelector(".report-modal .cancel-btn");
const saveBtn = document.querySelector(".report-modal .save-btn");

// 신고 상세 정보를 모달에 표시하는 함수
const openReportModal = async (reportId) => {
    try {
        // 서비스에서 데이터 가져오기
        const reportData = await reportModalService.getReportDetail(reportId);

        // 데이터로 모달 내용을 업데이트
        document.querySelector("#report-id").textContent = reportData.id;
        // split을 써서 시간을 제외한 연도-월-날짜만 가져옴
        document.querySelector("#report-date").textContent = reportData.createdDate.split(" ")[0];
        document.querySelector("#report-memberName").textContent = reportData.memberName;
        document.querySelector("#report-reportSubject").textContent = reportData.reportSubject;
        document.querySelector("#report-reportType").textContent = reportData.reportType;
        document.querySelector("#report-reportDetail").textContent = reportData.reportDetail;

        // 처리 상태 선택을 서버에서 받은 상태로 설정
        const reportStatus = document.querySelector(".report-status")
        reportStatus.value = convertStatusToEnglish(reportData.reportStatus);

        // 모달 보이기
        reportModal.style.display = "block";
    } catch (error) {
        console.error("보고서 상세 정보를 불러오는 데 실패했습니다.", error);
    }
};

// 모달 닫기 버튼 클릭 시 모달 닫기
closeBtn.addEventListener("click", () => {
    reportModal.style.display = "none";
});

// 모달 취소 버튼 클릭 시 모달 닫기
cancelBtn.addEventListener("click", () => {
    reportModal.style.display = "none";
});

// 상세보기 버튼 클릭 시 해당 신고의 상세 정보를 모달로 표시
// 상세보기 버튼이 js에서 생성된거라 그냥 클래스명으로 선택하려니까 이벤트가 발동안됨..
document.querySelector("#report-table tbody").addEventListener("click", (e) => {
    // 클릭한 대상이 'detail-btn' 클래스가 있는 버튼인지 확인
    if (e.target && e.target.classList.contains("detail-btn")) {
        const reportId = e.target.getAttribute("id");  // id 가져오기
        openReportModal(reportId);  // 모달 열기
    }
});

// 저장 버튼을 누르면 설정된 처리상태가 저장됨
saveBtn.addEventListener("click", async (e) => {

    // 모달에서 선택한 처리상태 가져오기
    const reportStatus = document.querySelector(".report-status").value;
    // console.log("현재 처리상태: " + reportStatus);
    const reportId = document.querySelector("#report-id").textContent;

    // 영어로 저장되어있는 처리상태 DB의 저장을 위해 한국어로 변경
    const koreanStatus = convertStatusToKorean(reportStatus);
    // console.log(koreanStatus);

    const newStatus = {
        id: reportId,
        reportStatus: koreanStatus
    };

    // 상태 업데이트
    await reportModalService.updateStatus(newStatus);

    // 상태 변경 후 현재 페이지를 유지하면서 목록을 갱신
    await reportService.getList(reportLayout.showList, param);  // 현재 페이지 번호를 그대로 사용하여 목록 갱신
});
