const programService= (() => {

    const getAllProgram = async(callback, param ={}) =>{
        let page = param.page || 1;
        let search = param.search;
        let keyword = "";
        let status = "";
        let date = 0;
        if(search){
            keyword = search.keyword;
            status = search.status;
            date = search.date;
        }
        let path =`/admin/home/programs?page=${page}`;
        if(status){
            path += `&status=${status}`
        }
        if(date){
            path += `&date=${date}`
        }
        if(keyword){
            path += `&keyword=${keyword}`
        }
        const response = await fetch(path)
        const programListData = await response.json();
        if(callback){
            callback(programListData)
        }
    }
    return {getAllProgram: getAllProgram};
})();