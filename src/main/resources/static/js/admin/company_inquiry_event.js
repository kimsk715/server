const companyInquiryPageWrap = document.querySelector(".company-inquiry-pagination");
const companyInquiryStatusCategories = document.querySelector(".company-inquiry-status-filter");
const companyInquiryDateCategories = document.querySelector(".company-inquiry-date-filter")
const companyInquiryKeywordInput = document.querySelector("div.company-inquiry-filter div.search-box input[name=companyInquiryKeyword]");
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains("company-inquiry-link")){
        companyInquiryService.getAllCompanyInquiry(companyInquiryLayout.showList);
    }
})

companyInquiryPageWrap.addEventListener('click',(e) =>{
    if(e.target.className.includes("page-btn")){
        companyInquiryService.getAllCompanyInquiry(companyInquiryLayout.showList, {page:e.target.id});
    }
})

companyInquiryStatusCategories.addEventListener('click',(e) =>{
        const dateType  = companyInquiryDateCategories.value;
        const statusType = companyInquiryStatusCategories.innerText;
        const param = {search : {date : dateType, status : statusType}}
        const companyInquiryKeyword = companyInquiryKeywordInput.value;

        if(companyInquiryKeyword){
            param.search.companyInquiryKeyword = companyInquiryKeyword;
        }
    companyInquiryService.getAllCompanyInquiry(companyInquiryLayout.showList, param);
    })


companyInquiryDateCategories.addEventListener('click',(e) =>{
        // e.preventDefault();
        const dateType  = companyInquiryDateCategories.value;
        const statusType = companyInquiryStatusCategories.innerText;
        const param = {search : {date : dateType, status : statusType}}
        const companyInquiryKeyword = companyInquiryKeywordInput.value;

        if(companyInquiryKeyword){
            param.search.companyInquiryKeyword = companyInquiryKeyword;
        }
    companyInquiryService.getAllCompanyInquiry(companyInquiryLayout.showList, param);
    })


companyInquiryKeywordInput.addEventListener("keyup",(e)=>{
    if(e.key === 'Enter'){
        const companyInquiryKeyword = e.target.value;
        if(companyInquiryKeyword){
            const dateType  = companyInquiryDateCategories.value;
            const statusType = companyInquiryStatusCategories.innerText;
            const param = {search : {date : dateType, status : statusType, companyInquiryKeyword : companyInquiryKeyword}}
            companyInquiryService.getAllCompanyInquiry(companyInquiryLayout.showList, param);
        }
    }
})
// console.log(dateCategories.value)
// console.log(statusCategories.value)




