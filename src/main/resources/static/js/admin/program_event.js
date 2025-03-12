const pageWrap = document.querySelector(".announce-pagination");
const statusCategories = document.querySelector(".announce-status-filter");
const dateCategories = document.querySelector(".announce-date-filter")
const keywordInput = document.querySelector(".search-box input[name=keyword]");

programService.getAllProgram(programLayout.showList);


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
console.log(dateCategories.value)
console.log(statusCategories.value)

document.addEventListener("click", (e) => {
        const target = e.target;
    // 클릭한 요소가 'detail-btn' 클래스를 가진 버튼인지 확인
    if (target.classList.contains("detail-btn")) {
        const buttonValue = e.target.value;
        console.log(buttonValue);
    }
}
);
//
// function setValue(value){
//     fetch('/admin/home?buttonValue='+value,{
//         method : 'GET'
//     })
//         .then(response => response.text())
//         .then(html => {document.body.innerHTML = html;}
//         );
// }
