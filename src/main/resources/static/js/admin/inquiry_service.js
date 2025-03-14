const inquiryService= (() => {
    document.addEventListener("click", async (e) => {
        if (e.target.classList.contains("detail-btn")) {
            let inquiryId = e.target.value;  // 버튼의 value 속성에서 programId 가져옴


            // programId를 포함한 API 요청
            let path = `/admin/home/member-inquiries?inquiryId=${inquiryId}`;

            try {
                const response = await fetch(path, {
                    method: "GET", // 필요에 따라 "POST"로 변경
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("받은 데이터:", data);

                // 필요한 로직 추가 (예: 데이터 화면에 출력)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        }
    });



    const getAllInquiry = async(callback, param ={}) =>{
        let page = param.page || 1;
        let search = param.search;
        let normalInquiryKeyword = "";
        let status = "";
        let date = 0;
        if(search){
            normalInquiryKeyword = search.normalInquiryKeyword;
            status = search.status;
            date = search.date;
        }
        let path =`/admin/home/member-inquiries?page=${page}`;
        if(status){
            path += `&status=${status}`
        }
        if(date){
            path += `&date=${date}`
        }
        if(normalInquiryKeyword){
            path += `&normalInquiryKeyword=${normalInquiryKeyword}`
        }
        const response = await fetch(path)
        const inquiryListData = await response.json();
        if(callback){
            callback(inquiryListData)
        }
    }
    return {getAllInquiry: getAllInquiry};
})();
