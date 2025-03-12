/*
document.addEventListener('click', function(e){
    if(e.target.classList.contains("submenu-item")){
        const type = e.target.getAttribute("data-category");
        let url="";

        if(type === "program"){
            url = "/admin/home/programs"
        }
        else if(type === "member"){
            url = "/admin/home/members";
        }

        if(url){
            fetch(url)
                .then(response => response.json())

        }
    }
})*/
