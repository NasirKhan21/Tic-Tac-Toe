let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#refresh");
let msgcontainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0 // to check draw
let colorO = "";
let colorX = "";

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = ()=>{
    turnO = true;
    count = 0;
    enableBox();
    msgcontainer.classList.add("hide");
};


boxes.forEach(box => {
    box.addEventListener("click",()=>{
        
        if(turnO){
            box.innerText = "O";
            box.classList.add("colorO");
            box.classList.remove("colorX");
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.classList.add("colorX");
            box.classList.remove("colorO");
            turnO = true;
        }
        box.disabled = true;//After clicking one time the box should be disabled
        count++;

        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }

    });
});

const gameDraw = ()=>{
    msg.innerText = "Play Again";
    msgcontainer.classList.remove("hide");
}
const enableBox = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const disableBox = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const showWinner = (winner)=>{
    msg.innerText = `Congratulations,Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBox();
    
};
const checkWinner = ()=>{
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
            showWinner(pos1)
            return true;
          }
        }
    } 

};

newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click", resetGame);