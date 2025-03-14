const memberService= (() => {
    // const memberLink = document.querySelector(".normal-member-link")
    document.addEventListener("click", async (e) => {
        if (e.target.classList.contains("detail-btn")) {
            let memberId = e.target.value;  // 버튼의 value 속성에서 programId 가져옴
            console.log("클릭한 프로그램 ID:", memberId);

            // programId를 포함한 API 요청
            let path = `/admin/home/members?memberId=${memberId}`;

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



    const getAllMember = async(callback, param ={}) =>{
        let page = param.page || 1;
        let search = param.search;
        let memberKeyword = "";
        let status = "";
        let date = 0;
        if(search){
            memberKeyword = search.memberKeyword;
            status = search.status;
            date = search.date;
        }
        let memberPath =`/admin/home/members?page=${page}`;
        if(status){
            memberPath += `&status=${status}`
        }
        if(date){
            memberPath += `&date=${date}`
        }
        if(memberKeyword){
            memberPath += `&memberKeyword=${memberKeyword}`
        }
        const response = await fetch(memberPath)
        // console.log(response);
        const memberListData = await response.json();
        // console.log(memberListData)
        if(callback){
            callback(memberListData)
        }
    }
    return {getAllMember: getAllMember};
})();
