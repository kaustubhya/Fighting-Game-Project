 // Grabbing elements from DOM and storing them into variables

let playButton = document.getElementById('play')

let resultDiv = document.getElementById('result')

let p1NameDiv = document.getElementById('p1Name')

let p2NameDiv = document.getElementById('p2Name')

let p1HealthDiv = document.getElementById('p1Health')

let p2HealthDiv = document.getElementById('p2Health')

// Check if either player's health is 0 and if it is then update isOver to true

const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the names and latest health of the players
 p1NameDiv.innerText = p1.name
 p2NameDiv.innerText = p2.name
 p1HealthDiv.innerText = p1.health
 p2HealthDiv.innerText = p2.health 
  
  // Condition IF either player health is <= 0 then set is Over = true and declareWinner
if(p1.health <= 0 || p2.health <= 0){
  game.isOver = true;
  gameState = game.isOver
  result.innerText = game.declareWinner(game.isOver, p1, p2)
  return gameState
}
}

// Create a player class which can create a player with all its attributes and methods

class Player{
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  // Attack an enemy with a random number from 0 to YOUR attacking bonus
  strike(player, enemy, attackDmg){

    // Get a random number between 1 - 10 and that is damageAmount
    let damageAmount = Math.ceil(Math.random() * attackDmg)
    // Math.random() * 10 gives us a random number beetween 1 and 10, even decimal nos and we use 
       // ceil function to convert them to natural nos.
    
    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount
    // update the game and DOM with updateGame()
    updateGame(p1,p2,gameState)
    // Return a message of 'player name attacks enemy name for damageAmount'
    
    return `${player.name} attacks ${enemy.name}, ${enemy.name} lost ${damageAmount} points`
    // using template literals here
  }

  // heal the player for a random number from 1 to 5
  heal (player) {

    // Get a random number between 1 to 5 and store that in hpAmount
      let hpAmount = Math.ceil(Math.random() * 5)
    // Add hpAmount to players health
      player.health += hpAmount
    // Update the game and DOM with updateGame()
      updateGame(p1, p2, gameState)
    // Return a message of 'player name heals for hpAmount HP'
      return `${player.name} restores his health by ${hpAmount} points`
  }
}

// Create the Game class with all its attributes and methods to run a match
class Game {
  constructor() {
    this.isOver = false;
  }

  // If the game is over and the player has 0 health then declare the winner!
  declareWinner(isOver,p1,p2){

    // Create a message variable that will hold a message based on the condition
    let message = "TIE!!"
    // If isOver is true AND p1 health is <= 0 then update message variable to 'p1 WINS!'
    if(isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`
    }
    // Else if isOver is true AND p2 health is <= 0 then update message variable to 'p2 WINS!'
    else if(isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`
    }
    console.log(isOver, p1.health, p2.health)
    // Play victory sound
    document.getElementById('victory').play()
    // Return message variable
    return message
  }

  // Reset the players' health back to its original state and isOver to FALSE
  reset(p1,p2) {
    // set p1 health and p2 health back to 100 and isOver back to false and clear resultDiv.innerText and don't forget to updateGame()
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1,p2)
  }

  // Simulates the whole match until one player runs out of health
  play(p1,p2) {
    // Reset to make sure that player health is back to full before starting

    // reset is a method within the game, so we can use 'this' keyword
    this.reset(p1,p2);
    // Make sure that player take turns until isOver is TRUE
    while(!this.isOver){
      // Make sure that both players get strike() and heal() once each loop
      p1.strike(p1,p2,p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1,p2.attackDmg)
      p1.heal(p1)
    }
    // Once isOver is TRUE, run the declareWinner() method
    return this.declareWinner(this.isOver,p1,p2);
    
  }

  
}


// Create 2 players using the same player class
let player1 = new Player('KSD', 100, 10)
let player2 = new Player('Saksham', 100, 10)

// Save original Player Data into a variable in order to reset
let p1 = player1
let p2 = player2

// Create a game object from the Game class
let game = new Game()

// Initialize the game by calling updateGame()
updateGame(p1, p2)
// Save initial isOver from the game object inside this variable
let gameState = game.isOver

// Add a click listener to the stimulate button that runs the play() method on click and pass in the players 
 playButton.onclick = () => result.innerText = game.play(p1,p2)
// Add functionality where players can press a button to attack OR heal

// Player 1 Controls
document.addEventListener('keydown', function(e) {
  // If you press Q and the Enemy health is greater than 0 AND isOver is still false then strike()
  if(e.key == 'q' && p2.health > 0 && game.isOver == false) {
     // After striking, play the attack sound
     p1.strike(p1,p2,p1.attackDmg)
    document.getElementById('p1attack').play()
  }
 
});

document.addEventListener('keydown', function(e) {

  // If you  press A AND the player health is greater than 0 and isOver is still false then heal()
   if(e.key == 'a' && p2.health > 0 && game.isOver == false) {
     // After healing, then play the heal sound 
     p1.heal(p1)
     document.getElementById('p1heal').play()
   }
  
});

// Player 2 controls

document.addEventListener('keydown', function(e) {
  // If you press P AND the enemy health is greater than 0 AND isOver is still false then strike()
  if(e.key == 'p' && p1.health > 0 && game.isOver == false) {
  
    // After striking, then play the attack sound
     p2.strike(p2,p1,p2.attackDmg)
    document.getElementById('p2attack').play()
  }
});

document.addEventListener('keydown', function(e) {
  // If you press L AND the player health is greater than 0 AND isOver is still false then heal()
  if(e.key == 'l' && p1.health > 0 && game.isOver == false) {
  // After healing, then play the healing sound
    p2.heal(p2)
    document.getElementById('p2heal').play()
  }
});

