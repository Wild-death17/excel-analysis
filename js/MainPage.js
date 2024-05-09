let NavBox = document.getElementById("NavBox"),
    NavList = document.getElementById("NavList");

NavBox.addEventListener("click",()=>{
    if (NavList.style.display === "grid") {
        NavList.style.display = "none";
    }else {
        NavList.style.display = "grid";
    }
});