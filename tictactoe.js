const readline = require('readline');
const { runInThisContext } = require('vm');

class TicTacToe{
    constructor(){
        this.tictactoe = [];
        this.tictactoe[8]= undefined;
        this.board=''; // this will display the board
        /**
         * Player 1 = true (X)
         * Player 2 = false (O)
         */
        this.currentPlayer = true ; // first player
        this.gameHasEnded = false;
        this.movesRecord = []; //Will be used to store the moves
        /**
         * Keep reading the inputs provided by the players
         */
        this.readL = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        })
    }


        /**
         * Display the gameboard
        **/
        displayUpdatedBoard() {
this.board = `${this.displayItem(this.tictactoe[0])} | ${this.displayItem(this.tictactoe[1])} | ${this.displayItem(this.tictactoe[2])}
-----------
 ${this.displayItem(this.tictactoe[3])}| ${this.displayItem(this.tictactoe[4])} | ${this.displayItem(this.tictactoe[5])}
-----------
${this.displayItem(this.tictactoe[6])} | ${this.displayItem(this.tictactoe[7])} | ${this.displayItem(this.tictactoe[8])}`;
            
            console.log(this.board);
        }
        
        /**
         * Start the game
         * */  
        start(){
            console.log("Starting the game");
            console.log("First player gets X and second player O");
            console.log("Choose a number 1 to 9. Each cell is repressented by number 1-9 left to right and top to bottom");
            this.displayUpdatedBoard();
            console.log("First player turn....")
            //Now listen the move from the player1
            this.readL.on("line", (input) =>{
                if(this.tictactoe.length <=9){
                    //Read the move of the player
                    console.log(`data read is : ${input}`)
                    this.readPlayerMove(parseInt(input))
                }else{
                    console.log('Game Ended!')
                }
            })
        
        }
        
        readPlayerMove(position){
            if(position>9 || position <1){
                console.log("Wrong position, put a value in the range of 1-9, which is free");
            }
            else if(this.tictactoe[position-1] != undefined){
                console.log("Position already occupied")
            }else{
                console.log("This is eligible position");
                this.tictactoe[position-1]= this.currentPlayer ? 'X':'O';
                //Register the move of the player
                this.movesRecord.push({
                    position: position,
                    char: this.tictactoe[position-1],
                    player: this.currentPlayer ? '1':'2'
                  });
                  //Continue the game;
                  this.continueGame();
            }
        }

        continueGame(){
            this.displayUpdatedBoard();
            console.log("Next Player move please");
            /**
             * Add the logic to continue the moves
             */
            this.processTheGame();
            
        }

        processTheGame(){

            //To decide the winner atleat 5 moves should be done
            if(this.movesRecord.length >= 5){

                //check in the first column
                if(this.tictactoe[0] === this.tictactoe[3] && this.tictactoe[3] === this.tictactoe[6] && this.tictactoe[0] != undefined){
                    console.log(1);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[0])} Wins !`);
                    this.endGame();
                }
                //check in the second column
                if(this.tictactoe[1] === this.tictactoe[4] && this.tictactoe[4] === this.tictactoe[7] && this.tictactoe[1] != undefined){
                    console.log(2);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[1])} Wins !`);
                    this.endGame();
                }
                //check in the third column
                if(this.tictactoe[2] === this.tictactoe[5] && this.tictactoe[5] === this.tictactoe[8] && this.tictactoe[2] != undefined){
                    console.log(3);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[2])} Wins !`);
                    this.endGame();
                }

                //check in the first row
                if(this.tictactoe[0] === this.tictactoe[1] && this.tictactoe[1] === this.tictactoe[2] && this.tictactoe[0] != undefined){
                    console.log(4);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[0])} Wins !`);
                    this.endGame();
                }

                //check in the second row
                if(this.tictactoe[3] === this.tictactoe[4] && this.tictactoe[4] === this.tictactoe[5] && this.tictactoe[3] != undefined){
                    console.log(5);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[3])} Wins !`);
                    this.endGame();
                }

                //check in the third row
                if(this.tictactoe[6] === this.tictactoe[7] && this.tictactoe[7] === this.tictactoe[8] && this.tictactoe[6] != undefined){
                    console.log(6);
                    console.log(this.tictactoe[6]);
                    console.log(this.tictactoe[3]);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[3])} Wins !`);
                    this.endGame();
                }

                //check in the top to bottom diagnol
                if(this.tictactoe[0] === this.tictactoe[4] && this.tictactoe[4] === this.tictactoe[8] && this.tictactoe[0] != undefined){
                    console.log(7);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[0])} Wins !`);
                    this.endGame();
                }

                //check in the bottom to top diagnol
                if(this.tictactoe[6] === this.tictactoe[4] && this.tictactoe[4] === this.tictactoe[2] && this.tictactoe[6] != undefined){
                    console.log(8);
                    console.log(`Player : ${this.displayePlayerFromValue(this.tictactoe[6])} Wins !`);
                    this.endGame();
                }

                if(this.movesRecord.length ==9){
                    console.log(9);
                    console.log("It's a draw");
                    this.endGame();
                }
    

            }

            if(!this.gameHasEnded){
                //Switch the players
                this.currentPlayer = !this.currentPlayer;
            }


        }

        displayePlayerFromValue(val){
            if(val ==='X'){
                return 1 ;
            }else{
                return 2 ;
            }
        }
        displayItem(cell){
            return cell === undefined ? ' ' : cell
        }

        endGame(){
            this.readL.close();
            this.gameHasEnded = true;
            console.log("Moves history --- ")
             console.log(this.movesRecord)
             process.exit();
             return false; 
        }



}

const newGame =new TicTacToe();

newGame.start();
