import React, {Component} from 'react';
import PlayerCard from './Playercard'
class Game extends Component{
  
  constructor(){
    super();
    this.signs = ["rock" , "paper", "scissors"];
    this.state = {
       playerOne: "rock",
      playerTwo: "scissors",
    }
  }

  //methods should be placed here
  // This will start playgame as well
  playGame = () => {
    this.setState({
      playerOne: this.signs[Math.floor(Math.random() * 3)],
      playerTwo: this.signs[Math.floor(Math.random() * 3)],
    })
  }

  decidewinner = () => {
      let Playerone = this.state.playerOne
      let Playertwo = this.state.playerTwo

    if(Playerone === Playertwo){
      return "Its a Tie!"


    }

    else if ((Playerone === "rock" && Playertwo === "scissors") || (Playerone === "scissors" && Playertwo === "paper") || (Playerone === "paper" && Playertwo === "rock")) {
          return "Playerone wins"
    }
    else {
      return "playerTwo wins"
    }
  }


  render(){
    return(
      <div className="container">


        <div>
        <PlayerCard sign={this.state.playerOne} />
        <PlayerCard sign ={this.state.playerTwo} />
        </div>
      <div className="winner">{this.decidewinner()}</div>
      <button type="button" onClick ={this.playGame}> Play the Game </button>
      </div>
    )
  }
};



export default Game;
