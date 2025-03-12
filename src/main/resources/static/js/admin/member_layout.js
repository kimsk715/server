const memberLayout = (() =>{
    const showList = async (memberListData) =>{
        const tbodyMember = document.querySelector(".normal-member-table tbody");
        const pageWrap = document.querySelector(".normal-member-pagination");
        const pagination = memberListData.pagination;
        let memberText = ``;
        memberListData.members.forEach((member) => {
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

        if(pagination.prev) {
            memberText += `<button type="button" class="page-btn" id="${pagination.startPage - 1}">이전</button>`
        }
        for(let i = pagination.startPage; i<=pagination.endPage; i++){
            if(pagination.page === i){
                memberText += `<button type="button" class="page-btn active" id="${i}">${i}</button>`
                continue;
            }
            memberText += `<button type="button" class="page-btn" id="${i}">${i}</button>`
        }
        if(pagination.next){
            memberText += `<button type="button" class="page-btn" id="${pagination.endPage + 1}">다음</button>`
        }
        pageWrap.innerHTML = memberText;
        console.log(pagination);
    }
    return {showList : showList};
})();