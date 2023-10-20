const choiceButtons = document.querySelectorAll(".btn-box")
const playButtons = document.querySelectorAll(".play-btn")
const home = document.querySelector("#home");
const board = document.querySelector("#board");
const xScoreText = document.querySelector("#x-score-text")
const oScoreText = document.querySelector("#o-score-text")
const xScoreElement = document.querySelector("#x-score");
const oScoreElement = document.querySelector("#o-score");
const turnInfoImage = document.querySelector(".turn-box");
const modal = document.querySelector("#modal");
const modalInfoText = document.querySelector(".result-info-text")
const modalIcon = document.querySelector(".modal-box img")
const modalResultText = document.querySelector(".result-text")






let player1 = "x";
let mode = "cpu";
let turn = "x";
let freeButtons = [0,1,2,3,4,5,6,7,8];
let xArray = [];
let oArray = [];
let xScore = 0;
let tieScore = 0;
let oScore = 0;
let winnerCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


const activateChoice = (icon) => {
    if(icon === 'x'){
        choiceButtons[0].classList.add('active');
        choiceButtons[1].classList.remove('active');
        player1 = "x";

    }else {
        choiceButtons[1].classList.add('active');
        choiceButtons[0].classList.remove('active');
        player1 = "o";
    }
    
};
const checkXwin = () => {
    return winnerCombinations.find((combination) =>
      combination.every((button) => xArray.includes(button))
    );
  };
  
  const checkOwin = () => {
    return winnerCombinations.find((combination) =>
      combination.every((button) => oArray.includes(button))
    );
  };

  const onWinX = () => {
    modal.style.display = "flex";
    modalIcon.src = "./assets/icon-x.svg";
    modalResultText.style.color = "#31C3BD";
    xScore++;

    xScoreElement.textContent = xScore;
    if (player1 !== "o") {
      modalInfoText.textContent = "you won!";
    } else {
      modalInfoText.textContent = "OH NO, YOU LOST…";
    }
  };
  
  const onWinO = () => {
    modal.style.display = "flex";
    modalIcon.src = "./assets/icon-o.svg";
    modalResultText.style.color = "#F2B137";
    oScore++;
    oScoreElement.textContent = oScore;
    if (player1 !== "x") {
      modalInfoText.textContent = "you won!";
    } else {
      modalInfoText.textContent = "OH NO, YOU LOST…";
    }
  };
  const  winningStyle = (array) => {
      if(turn === 'x'){
        playButtons[array[0]].firstElementChild.src = "./assets/icon-x-win.svg"
        playButtons[array[1]].firstElementChild.src = "./assets/icon-x-win.svg"
        playButtons[array[2]].firstElementChild.src = "./assets/icon-x-win.svg"
        playButtons[array[0]].style.background = '#31c3bd'
        playButtons[array[1]].style.background = '#31c3bd'
        playButtons[array[2]].style.background = '#31c3bd'

    }else{
        playButtons[array[0]].firstElementChild.src = "./assets/icon-o-win.svg"
        playButtons[array[1]].firstElementChild.src = "./assets/icon-o-win.svg"
        playButtons[array[2]].firstElementChild.src = "./assets/icon-o-win.svg"
        playButtons[array[0]].style.background = '#f2b137'
        playButtons[array[1]].style.background = '#f2b137'
        playButtons[array[2]].style.background = '#f2b137'
    }
  }

const onHoverEffects = () => {
    for (let index = 0; index < freeButtons.length; index++) {
        const playButtonIndex = freeButtons[index];
        if(turn === 'x'){
            playButtons[playButtonIndex].classList.add('xHover');
            playButtons[playButtonIndex].classList.remove('oHover');

        }else{
            playButtons[playButtonIndex].classList.remove("xHover");
            playButtons[playButtonIndex].classList.add('oHover');

        }
    }
}

const createClickedFunctions = () => {
    for (let index = 0; index < playButtons.length; index++) {
        playButtons[index].onclick = (event) => {
            event.target.classList.remove("xHover");
            event.target.classList.remove("oHover");

            const spliceIndex = freeButtons.indexOf(index);
            freeButtons.splice(spliceIndex, 1)


            const icon = document.createElement("img");
            icon.classList.add("play-icon");
            if(turn === "x"){
                icon.src = "./assets/icon-x.svg";
                event.target.append(icon)
                xArray.push(index)
                const win = checkXwin();
                if(win){
                    onWinX()
                    winningStyle(win)
                    return 
                }
                turn = "o"
                turnInfoImage.src = "./assets/icon-o-gray.svg"
            }else{
                icon.src = "./assets/icon-o.svg";
                event.target.append(icon)
                oArray.push(index);
                const win = checkOwin();
                if(win){
                    onWinO()
                    winningStyle(win)
                    return 
                }
                turn = "x"
                icon.classList.remove("play-icon");
                icon.classList.add("margin-right")
                turnInfoImage.src = "./assets/icon-x-gray.svg"

            }
            onHoverEffects();



            event.target.onclick = null
        }
        
    }
}

const startGame = (modeParam) => {
    home.style.display = "none";
    board.style.display = "flex";
    document.body.style.alignItems = "flex-start"
    mode = modeParam;
    onHoverEffects();
    createClickedFunctions();
    if(modeParam === "player"){
        if(player1 === "x"){
            xScoreText.textContent = "X (P1)";
            oScoreText.textContent = "O (P2)";
        }else{
            xScoreText.textContent = "X (P2)";
            oScoreText.textContent = "O (P1)";
        }
    }else{
        if(player1 === "x"){
            xScoreText.textContent = "X (YOU)";
            oScoreText.textContent = "O (CPU)";
        }else{
            xScoreText.textContent = "X (CPU)";
            oScoreText.textContent = "O (YOU)";
        }
    }
}