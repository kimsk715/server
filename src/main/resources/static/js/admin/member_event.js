const pageWrap = document.querySelector(".normal-member-pagination");
const statusCategories = document.querySelector(".member-status-filter");
const dateCategories = document.querySelector(".member-date-filter")
const keywordInput = document.querySelector("div.member-filter div.search-box input[name=keyword]");

memberService.getAllMember(memberLayout.showList);


pageWrap.addEventListener('click',(e) =>{
    if(e.target.className.includes("page-btn")){
        programService.getAllMember(memberLayout.showList, {page:e.target.id});
    }
})

statusCategories.addEventListener('click',(e) =>{
        const dateType  = dateCategories.value;
        const statusType = statusCategories.value;
        const param = {search : {date : dateType, status : statusType}}
        const keyword = keywordInput.value;

        if(keyword){
            param.search.keyword = keyword;
        }
        programService.getAllMember(memberLayout.showList,param);
    })


dateCategories.addEventListener('click',(e) =>{
        // e.preventDefault();
        const dateType  = dateCategories.value;
        const statusType = statusCategories.value;
        const param = {search : {date : dateType, status : statusType}}
        const keyword = keywordInput.value;

        if(keyword){
            param.search.keyword = keyword;
        }
        programService.getAllMember(memberLayout.showList,param);
    })


keywordInput.addEventListener("keyup",(e)=>{
    if(e.key === 'Enter'){
        const keyword = e.target.value;
        if(keyword){
            const dateType  = dateCategories.value;
            const statusType = statusCategories.value;
            const param = {search : {date : dateType, status : statusType, keyword : keyword}}
            programService.getAllMember(memberLayout.showList, param);
        }
    }
})
console.log(dateCategories.value)
console.log(statusCategories.value)




