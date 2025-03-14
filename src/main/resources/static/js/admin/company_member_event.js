const companyMemberPageWrap = document.querySelector(".company-member-pagination");
const companyMemberStatusCategories = document.querySelector(".company-member-status-filter");
const companyMemberDateCategories = document.querySelector(".company-member-date-filter")
const companyMemberKeywordInput = document.querySelector(".company-member-search.search-box input[name=companyKeyword]");

document.addEventListener('click', (e) =>{
    if(e.target.classList.contains("company-member-link")){
        companyMemberService.getAllCompanyMember(companyMemberLayout.showList);
    }
})



companyMemberPageWrap.addEventListener('click',(e) =>{
    if(e.target.className.includes("page-btn")){
        companyMemberService.getAllCompanyMember(companyMemberLayout.showList, {page:e.target.id});

    }
})

companyMemberStatusCategories.addEventListener('click',(e) =>{
        const dateType  = companyMemberDateCategories.value;
        const statusType = companyMemberStatusCategories.value;
        const param = {search : {date : dateType, status : statusType}}
        const keyword = companyMemberKeywordInput.value;

        if(keyword){
            param.search.keyword = keyword;
        }
    companyMemberService.getAllCompanyMember(companyMemberLayout.showList,param);
    })


companyMemberDateCategories.addEventListener('click',(e) =>{
        // e.preventDefault();
        const dateType  = companyMemberDateCategories.value;
        const statusType = companyMemberStatusCategories.value;
        const param = {search : {date : dateType, status : statusType}}
        const keyword = companyMemberKeywordInput.value;

        if(keyword){
            param.search.keyword = keyword;
        }
    companyMemberService.getAllCompanyMember(companyMemberLayout.showList,param);
    })


companyMemberKeywordInput.addEventListener("keyup",(e)=>{
    if(e.key === 'Enter'){
        const keyword = e.target.value;
        if(keyword){
            const dateType  = companyMemberDateCategories.value;
            const statusType = companyMemberStatusCategories.value;
            const param = {search : {date : dateType, status : statusType, keyword : keyword}}
            companyMemberService.getAllCompanyMember(companyMemberLayout.showList, param);
        }
    }
})




