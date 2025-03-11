document.addEventListener("DOMContentLoaded", function () {
  // DOM 요소 참조 영역
  // ----------------------------------------------------
  programService.
  // 공고관리 필터 요소 선택
  const announceStatusFilter = document.querySelector(
    ".announce-status-filter"
  ); // 상태 필터 드롭다운
  const announceDateFilter = document.querySelector(".announce-date-filter"); // 기간 필터 드롭다운
  const announceSearchInput = document.querySelector(".announce-search-input"); // 검색어 입력창
  const announceSearchBtn = document.querySelector(".announce-search-btn"); // 검색 버튼

  // 필수 DOM 요소 존재 검증
  //   if (
  //     !announceStatusFilter ||
  //     !announceDateFilter ||
  //     !announceSearchInput ||
  //     !announceSearchBtn
  //   ) {
  //     console.error("공고관리 필터 초기화 실패: 필수 DOM 요소 누락");
  //     return;
  //   }

  // 유틸리티 함수 정의 영역
  // ----------------------------------------------------

  // 검색어 유효성 검사 및 검색 실행
  function announceSearch(searchText) {
    // 검색어 입력 여부 확인
    if (!searchText) {
      alert("검색어를 입력해주세요.");
      return;

    }

    // 검색 실행 (추후 서버 연동)
    console.log("공고관리 검색어:", searchText);
  }

  // 필터 초기화 함수
  function initializeFilters() {
    announceStatusFilter.value = "all"; // 상태 필터 '전체'로 초기화
    announceDateFilter.value = "week"; // 기간 필터 '1주일'로 초기화
    announceSearchInput.value = ""; // 검색어 입력창 비우기
    console.log("공고관리 필터 초기화 완료");
  }

  // 이벤트 리스너 설정 영역
  // ----------------------------------------------------

  // 상태 필터 변경 이벤트
  announceStatusFilter.addEventListener("change", function () {
    const selectedStatus = this.value;
    // 선택된 상태값에 따른 한글 상태 매핑
    console.log(
      "공고관리 상태값:",
      selectedStatus === "pending"
        ? "심사중"
        : selectedStatus === "hold"
        ? "보류"
        : selectedStatus === "approved"
        ? "승인"
        : selectedStatus === "rejected"
        ? "반려"
        : "전체"
    );
  });

  // 기간 필터 변경 이벤트
  announceDateFilter.addEventListener("change", function () {
    const selectedDate = this.value;
    console.log("공고관리 기간 필터:", selectedDate);
  });

  // 검색 버튼 클릭 이벤트
  announceSearchBtn.addEventListener("click", function () {
    const searchText = announceSearchInput.value.trim();
    announceSearch(searchText);
  });

  // 검색어 입력창 엔터키 이벤트
  announceSearchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const searchText = this.value.trim();
      announceSearch(searchText);
    }
  });

  // 초기화 실행
  // ----------------------------------------------------
  initializeFilters(); // 필터 초기 상태 설정
  console.log("공고관리 필터 기능 초기화 완료");
});


// service.js

const programService= (() => {

  const getAllProgram = async(callback, param ={}) =>{
    let page = param.page || 1;
    let search = param.search;
    let keyword = "";
    let status = "";
    let date = 0;
    if(search){
      keyword = search.keyword;
      status = search.status
      date = search.date
    }
    let path =`/admin/home/program?page=${page}`;
    if(status){
      path += `&status=${status}`
    }
    if(date){
      path += `&date=${date}`
    }
    if(keyword){
      path += `&keyword=${keyword}`
    }
    const response = await fetch(path)
    const programListData = await response.json();
    if(callback){
      callback(programListData)
    }
  }
  return {getAllProgram: getAllProgram}
})();


// layout.js
const programLayout = (() =>{
  const showList = async (programListData) =>{
    const tbody = document.querySelector(".announce-table tbody");
    const pageWrap = document.querySelector(".announce-pagination");
    const pagination = programListData.pagination;
    let text = ``;
    programListData.programs.forEach((program) => {
      text += `<tr>
                  <td>${program.id}</td>
                  <td>${program.companyName}</td>
                  <td>${program.programName}</td>
                  <td>${program.createdDate}</td>
                  <td>${program.programEndDate}</td>
                  <td>
                      <span class="status approved">${program.programStatus}</span>
                  </td>
                  <td>
                      <button type="button" class="detail-btn">상세보기</button>
                  </td>
             </tr>`;
    })
    tbody.innerHTHL = text;

    text=``;

    if(pagination.prev) {
      text += `<button type="button" class="page-btn" id="${pagination.startPage - 1}">이전</button>`
    }
    for(let i = pagination.startPage; i<=pagination.endPage + 1; i++){
      if(pagination.page === i){
        text += `<button type="button" class="page-btn active" id="${i}">${i}</button>`
        continue;
      }
      text += `<button type="button" class="page-btn" id="${i}">${i}</button>`
    }
    if(pagination.next){
      text += `<button type="button" class="page-btn" id="${pagination.endPage + 1}">다음</button>`
    }
    pageWrap.innerHTML =text;
  }
  return {showList : showList}
})();

// event.js
const pageWrap = document.querySelector(".announce-pagination");
const statusCategories = document.querySelectorAll(".announce-status-filter option");
const dateCategories = document.querySelectorAll("announce-date-filter option")
const keywordInput = document.querySelector(".search-box input[name=keyword]");

programService.getAllProgram(programLayout.showList);

pageWrap.addEventListener('click',(e) =>{
    if(e.target.className.includes("page-btn")){
      programService.getAllProgram(programLayout.showList, {page:e.target.id});
    }
})

statusCategories.forEach((status) => {
    status.addEventListener('click',(e) =>{
      const dateType  = dateCategories.querySelector("option[selected]");
      const statusType = statusCategories.querySelector("option[selected]");
      const param = {search : {date : dateType, status : statusType}}
      const keyword = keywordInput.value;
      if(keyword){
        param.search.keyword = keyword;
      }
      programService.getAllProgram(programLayout.showList,param);
    })
})


dateCategories.forEach((date) =>{
  date.addEventListener('click',(e) =>{
    // e.preventDefault();
    const dateType  = dateCategories.querySelector("option[selected]");
    const statusType = statusCategories.querySelector("option[selected]");
    const param = {search : {date : dateType, status : statusType}}
    const keyword = keywordInput.value;
    if(keyword){
      param.search.keyword = keyword;
    }
    programService.getAllProgram(programLayout.showList,param);
  })
})

keywordInput.addEventListener("keyup",(e)=>{
  if(e.key === 'Enter'){
    const keyword = e.target.value;
    if(keyword){
      const dateType  = dateCategories.querySelector("option[selected]");
      const statusType = statusCategories.querySelector("option[selected]");
      const param = {search : {date : dateType, status : statusType, keyword : keyword}}
      programService.getAllProgram(programLayout.showList, param)
    }
  }
})



