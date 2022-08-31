var player_1 = 1;
var player_2 = 0;
var round = 1;

function move(cell_id, event) {

    var cell = document.getElementById(cell_id);

    if (cell.hasChildNodes() == false) {
        console.log("round:" + round);
        if (round % 2 == 1) {
            player_1 = 1;
            player_2 = 0;
        }
        else {
            player_2 = 1;
            player_1 = 0;
        }

        if (player_1 == 1) {
            var elem = document.createElement("img");
            elem.setAttribute("src", "icons8-x-50.png");
            cell.appendChild(elem);
            cell.dataset.move = "X";
        }

        if (player_2 == 1) {
            var elem = document.createElement("img");
            elem.setAttribute("src", "icons8-o-50.png");
            cell.appendChild(elem);
            cell.dataset.move = "O";
        }

        round = round + 1;
        if(cell.getAttribute('data-move') == "X" )
            document.getElementById("turn").innerHTML="TURN: " + "O";
        else if (cell.getAttribute('data-move') == "O" )
            document.getElementById("turn").innerHTML="TURN: " + "X"; 

        return moveControl();
    }
    moveControl();
}

function moveControl() {
    var result = 0;
    var counter_x = 0;
    var counter_o = 0;

    const GAME_BOARD = getCurrentBoardState();

    console.table(GAME_BOARD);

    const resultSign = checkIfWinningExist(GAME_BOARD);

    if (resultSign) {
        //console.log("Kazanan taraf: " + resultSign);
        finishGameAndShowResult(resultSign);// resultSign kazandi 


    } else if (checkIfAllBoxesUsed(GAME_BOARD)) {
        //console.log("Tum kutular isaretlendi");
        finishGameAndShowResult(null);// berabere
    }

}

function getCurrentBoardState() {
    const GAME_BOARD = createEmptyGameBoard();

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var current_cell = document.querySelectorAll(`[data-cell-coordination="(${i},${j})"]`)[0];
            GAME_BOARD[i][j] = current_cell.getAttribute('data-move');
        }
    }

    return GAME_BOARD;
}

function createEmptyGameBoard() {
    return [...Array(3)].map(() => [...Array(3)].map(() => ""));
}

function checkIfWinningExist(game_board) {
    if (!game_board) {
        return null;
    }

    // row kontrol
    for (let row = 0; row < 3; row++) {
        if (game_board[row][0] && game_board[row][0] === game_board[row][1] && game_board[row][0] === game_board[row][2]) {
            console.log(`Yatayda 3lu bulundu. satir: ${row}`);
            return game_board[row][0];
        }
    }

    // column kontrol
    for (let column = 0; column < 3; column++) {
        if (game_board[0][column] && game_board[0][column] === game_board[1][column] && game_board[0][column] === game_board[2][column]) {
            console.log(`Dikeyde 3lu bulundu. kolon: ${column}`);
            return game_board[0][column];
        }
    }

    // çapraz1 kontrol
    if (game_board[0][0] && game_board[0][0] === game_board[1][1] && game_board[0][0] === game_board[2][2]) {
        console.log("Capraz 3lu bulundu");
        return game_board[0][0];
    }

    // çapraz2 kontrol
    if (game_board[0][2] && game_board[0][2] === game_board[1][1] && game_board[0][2] === game_board[2][0]) {
        console.log("Capraz 3lu bulundu.");
        return game_board[0][2];
    }
}

function checkIfAllBoxesUsed(game_board) {
    var counter = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var current_cell = document.querySelectorAll(`[data-cell-coordination="(${i},${j})"]`)[0];
            if(game_board[i][j] != '') counter++; 
        }
    }
    if(counter == 9){

        return true;
    }

    else 
        return false;   
}

function finishGameAndShowResult(userSign) {

    if (userSign) {
       // console.log(userSign + " isaretleyen oyuncu kazandi");
        // Swal.fire("Kazanan:" + userSign); 
        Swal.fire({
            position: 'center',
            icon:'success',
            title: "Kazanan oyuncu: " + userSign,
            showConfirmButton: false,
          });
        clearGameBoard();

    } else {
       // console.log("berabere");
       Swal.fire({
        position: 'center',
        icon:'error',
        title: "Berabere Kaldınız!",
        showConfirmButton: false,
      });
       clearGameBoard();
    }

}

function clearGameBoard() {
    window.setTimeout(function(){location.reload()},1800)
}

function restartGame() {
    location.reload();
}