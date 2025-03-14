const pageWrap = document.querySelector(".announce-pagination");
const statusCategories = document.querySelector(".announce-status-filter");
const dateCategories = document.querySelector(".announce-date-filter")
const keywordInput = document.querySelector("div.announce-filter div.search-box input[name=keyword]");

document.addEventListener('click',(e)=>{
    if(e.target.classList.contains("announce-link")){
        programService.getAllProgram(programLayout.showList);
    }

})



pageWrap.addEventListener('click',(e) =>{
    if(e.target.className.includes("page-btn")){
        programService.getAllProgram(programLayout.showList, {page:e.target.id});
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
        programService.getAllProgram(programLayout.showList,param);
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
        programService.getAllProgram(programLayout.showList,param);
    })


keywordInput.addEventListener("keyup",(e)=>{
    if(e.key === 'Enter'){
        const keyword = e.target.value;
        if(keyword){
            const dateType  = dateCategories.value;
            const statusType = statusCategories.value;
            const param = {search : {date : dateType, status : statusType, keyword : keyword}}
            programService.getAllProgram(programLayout.showList, param);
        }
    }
})
// console.log(dateCategories.value)
// console.log(statusCategories.value)




