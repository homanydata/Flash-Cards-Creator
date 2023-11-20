const main = document.getElementsByClassName("main")[0];
const create = document.querySelector("#create");
const create_page = document.querySelector("#create_page");
var keywordInput = document.getElementById("keyword");
var answerInput = document.getElementById("answer");

onload = ()=>{
    let data = loadData()
    loadCards(data);
}


// basic interactions
create.addEventListener("click", ()=>{
    create_page.style.left = "0px";
    create_page.style.display = "block";
})
const back = document.getElementById("back")
back.addEventListener("click", ()=>{
    create_page.style.left = "100%";
})

// flip card effect
function flipcard(card){
    let hidden = card.style.transform == "rotateY(0deg)"
    let cards = document.getElementsByClassName("card")
    for(let card of cards){
        const keyword = card.querySelector(".keyword")
        const answer = card.querySelector(".answer")
        keyword.style.display = "block"
        answer.style.display ="none"
        answer.style.opacity = "0"
        card.style.transform = "rotateY(0deg)"
        card.style.backgroundColor="burlywood"
        answer.style.transform ="rotateY(0deg)"
        keyword.style.transform ="rotateY(0deg)"
    }
    const keyword = card.querySelector(".keyword")
    const answer = card.querySelector(".answer")
    if(hidden){
        keyword.style.display = "none"
        answer.style.display = "block"
        answer.style.opacity = "1"
        card.style.transform = "rotateY(180deg)"
        card.style.backgroundColor="rgb(180,100,40)"
        answer.style.transform ="rotateY(180deg)"
        keyword.style.transform ="rotateY(180deg)"
    }else{
        keyword.style.display = "block"
        answer.style.display ="none"
        answer.style.opacity = "0"
        card.style.transform = "rotateY(0deg)"
        card.style.backgroundColor="burlywood"
        answer.style.transform ="rotateY(0deg)"
        keyword.style.transform ="rotateY(0deg)"
    }
};
function addFlipEffect(card){
    card.addEventListener("click", ()=>{flipcard(card)});
};


// creating cards
function loadData(){
    let data = JSON.parse(localStorage.getItem("cards"))
    return data
}
function saveData(data){
    localStorage.setItem("cards", JSON.stringify(data))
}
function loadCards(data){
    main.innerHTML = "";
    if(data!=null){
        for(let card_data of data){
            create_card(card_data);
        }
    }else{
        create_card({key:"here you put your question or keyword",ans:"here is your answer"})
    }
}

function addCardData(){
    let keyword_text = keywordInput.value;
    let answer_text = answerInput.value;
    card_data = {
        key: keyword_text,
        ans: answer_text
    }
    let data = loadData();
    if(data===null){
        data=[]
    }
    data.push(card_data)
    saveData(data);
    loadCards();
}
function create_card(card_data) {
    let keyword_text = card_data.key
    let answer_text = card_data.ans
    let main = document.getElementsByClassName("main")[0]; // Assuming there's only one element with class "main"

    const new_card = document.createElement("div");
    new_card.className = "card"
    new_card.style.transform = "rotateY(0deg)"
    
    const keyword = document.createElement("h2");
    keyword.innerHTML = keyword_text;
    keyword.className = "keyword";
    
    const answer = document.createElement("h2");
    answer.innerHTML = answer_text;
    answer.className = "answer";
    
    new_card.appendChild(keyword);
    new_card.appendChild(answer);
    
    main.appendChild(new_card);
    addFlipEffect(new_card);
    // close create page
    create_page.style.left = "100%";
}


// search
const search = document.getElementById("search")
function searchCards(){
    let search_query = search.value
    let data = loadData()
    let filtered_data = []
    for(let card_data of data){
        if(String(card_data.key).toLowerCase().includes(search_query)){
            filtered_data.push(card_data)
        }
    }
    loadCards(filtered_data)
}