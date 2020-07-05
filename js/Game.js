class Game{
    constructor(){
        this.inProgress = true;
        this.winner = null; // 'O' || 'X'
        this.currentTurn = Game.O;
        this.movesMade = 0;
        this.squares = new Array(9).fill().map(s => new Square());
    }

    makeMove(i){
        if(this.inProgress && !this.squares[i].value){
            this.squares[i].value = this.currentTurn;
    
            this.movesMade++;
            this.checkForWinner();
            this.currentTurn = (this.currentTurn === Game.O) ? Game.X : Game.O;
        }
    }

    checkForWinner(){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        winningCombinations.forEach((wc) => {
            const [a, b, c] = wc;
            const squareA = this.squares[a];
            const squareB = this.squares[b];
            const squareC = this.squares[c];
    
            //Winner
            if(squareA.value && squareA.value === squareB.value && squareA.value === squareC.value){
                this.inProgress = false;
                this.winner = squareA.value;
                squareA.isHighlighted = squareB.isHighlighted = squareC.isHighlighted = true;
            }
        });
    
        //Draw
        if(this.movesMade === this.squares.length){
            this.inProgress = false;
        }
    }
}

Game.O = 'O';
Game.X = 'X';