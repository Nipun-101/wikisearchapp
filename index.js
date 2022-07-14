let search_input_ele = document.getElementById("searchInput");
let error_msg_ele = document.getElementById("alert");

let search_result_container_ele = document.getElementById("searchResults");
let loadingEle = document.getElementById("spinner");

function displayAll(result) {
    loadingEle.classList.add("d-none");
    let {
        title,
        link,
        description
    } = result;

    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");
    search_result_container_ele.appendChild(resultItemEle);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    resultItemEle.appendChild(titleEl);

    let lineBreak = document.createElement("br");
    resultItemEle.appendChild(lineBreak);


    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.textContent = link;
    linkEl.target = "_blank";
    linkEl.classList.add("result-url");
    resultItemEle.appendChild(linkEl);

    let lineBreak2 = document.createElement("br");
    resultItemEle.appendChild(lineBreak2);

    let paraEle = document.createElement("p");
    paraEle.classList.add("link-description");
    paraEle.textContent = description;
    resultItemEle.appendChild(paraEle);

}

function displayResults(search_results) {
    for (let result of search_results) {
        displayAll(result);
    }
}



function searchResult(event) {

    if (event.key === "Enter") {

        search_result_container_ele.textContent = "";
        let input_string = event.target.value;
        if (input_string === "") {
            error_msg_ele.classList.remove("d-none")
        } else {
            loadingEle.classList.remove("d-none");
            error_msg_ele.classList.add("d-none")
            let URL = "https://apis.ccbp.in/wiki-search?search=" + input_string;
            let OPTIONS = {
                method: "GET",
            }
            fetch(URL, OPTIONS)
                .then(function(response) {
                    return response.json();
                }).then(function(jsonData) {
                    let {
                        search_results
                    } = jsonData;
                    displayResults(search_results);
                });
        }
    }


}




search_input_ele.addEventListener("keydown", searchResult);