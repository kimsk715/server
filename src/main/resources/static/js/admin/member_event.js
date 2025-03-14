const memberPageWrap = document.querySelector(".normal-member-pagination");
const memberStatusCategories = document.querySelector(".member-status-filter");
const memberDateCategories = document.querySelector(".member-date-filter")
const memberKeywordInput = document.querySelector("div.normal-member-search-filter-container div.search-box input[name=memberKeyword]");

document.addEventListener('click', (e) =>{
    if(e.target.classList.contains("normal-member-link")){
        memberService.getAllMember(memberLayout.showList);
    }
})



memberPageWrap.addEventListener('click',(e) =>{
    if(e.target.className.includes("page-btn")){
        memberService.getAllMember(memberLayout.showList, {page:e.target.id});
        console.log("개인회원 실행점 확인")
    }
})

memberStatusCategories.addEventListener('click',(e) =>{
    console.log("개인회원 실행점 확인")
    const dateType  = memberDateCategories.value;
    const statusType = memberStatusCategories.value;
    const param = {search : {date : dateType, status : statusType}}
    const memberKeyword = memberKeywordInput.value;

        if(memberKeyword){
            param.search.memberKeyword = memberKeyword;
        }
    memberService.getAllMember(memberLayout.showList,param);
    })


memberDateCategories.addEventListener('click',(e) =>{
    console.log("개인회원 실행점 확인")
        const dateType  = memberDateCategories.value;
        const statusType = memberStatusCategories.value;
        const param = {search : {date : dateType, status : statusType}}
        const memberKeyword = memberKeywordInput.value;

        if(memberKeyword){
            param.search.memberKeyword = memberKeyword;
        }
    memberService.getAllMember(memberLayout.showList,param);
    })


memberKeywordInput.addEventListener("keyup",(e)=>{
    console.log("개인회원 실행점 확인")
    if(e.key === 'Enter'){
        console.log(e.target.value)
        const memberKeyword = e.target.value;

        if(memberKeyword){
            const dateType  = memberDateCategories.value;
            const statusType = memberStatusCategories.value;
            const param = {search : {date : dateType, status : statusType, memberKeyword : memberKeyword}}
            memberService.getAllMember(memberLayout.showList, param);
        }
    }
})
console.log(memberDateCategories.value)
console.log(memberStatusCategories.value)




