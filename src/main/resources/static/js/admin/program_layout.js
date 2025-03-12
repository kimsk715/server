const programLayout = (() =>{
    const showList = async (programListData) =>{
        const tbody = document.querySelector(".announce-table tbody");
        const pageWrap = document.querySelector(".announce-pagination");
        const pagination = programListData.pagination;
        let text = ``;
        programListData.programs.forEach((program) => {
            text += `
                <tr>
                  <td>${program.id}</td>
                  <td>${program.companyName}</td>
                  <td>${program.programName}</td>
                  <td>${program.createdDate}</td>
                  <td>${program.programEndDate}</td>
                  <td>
                      <span class="status approved">${program.programStatus}</span>
                  </td>
                  <td>
                      <button type="button" class="detail-btn" value="${program.id}">상세보기</button>                 
                  </td>
             </tr>
               `;
        })
        tbody.innerHTML = text;

        text=``;

        if(pagination.prev) {
            text += `<button type="button" class="page-btn" id="${pagination.startPage - 1}">이전</button>`
        }
        for(let i = pagination.startPage; i<=pagination.endPage; i++){
            if(pagination.page === i){
                text += `<button type="button" class="page-btn active" id="${i}">${i}</button>`
                continue;
            }
            text += `<button type="button" class="page-btn" id="${i}">${i}</button>`
        }
        if(pagination.next){
            text += `<button type="button" class="page-btn" id="${pagination.endPage + 1}">다음</button>`
        }
        pageWrap.innerHTML = text;
        console.log(pagination);
    }
    return {showList : showList};
})();