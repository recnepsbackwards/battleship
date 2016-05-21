//creates variables
var board = [];//the empty array holding the board
var HIT = 1;//the value given to the array when a ship is hit
var MISS = -1;//the value given to the array when a ship is missed
var torpedoesRemaining = 30;//how many torpedoesRemaining
var shipsSunk = 0;//how many ships have been hit
var gameOver = false;//starts with the value of false because the game isn't over
var shipsOnBoard=0; //how many ships are on the board

// checks a horizontal group of squares to see if there is a ship there
// row is the row the ship will be in
// column is the column that the left side of the ship will start in
// length is length of the ship
// Returns true if there are no ships in the area
function checkIfEmptyHorizontal(row, column, length) {
  //loops through all the columns being checked
  for (var i=-1; i<length+1; i++) {
    //checks the row where the ship will be and returns false if there is a ship there
    if (("" + board[row][column+i]).includes("ship")) {
      return false;
    }
    //checks the row below (only if there is one) and returns false if there is a ship there
    if (row < 9 && ("" + board[row+1][column+i]).includes("ship")) {
      return false;
    }
    //checks the row above (only if there is one) and returns false if there is a ship there
    if (row > 0 && ("" + board[row-1][column+i]).includes("ship")) {
      return false;
    }
  }
  //returns true if the whole area is empty
  return true;
}
//checks a vertical group of squares to see if there is a ship there
//column is the column that the ship will be in
//row is the row that the top of the ship will be in
//length is the length of the ship
//returns true if there are no ships in the area
function checkIfEmptyVertical(row, column, length) {
  //runs if the ship will start in row 0
  if (row === 0){
    //loops through all the rows the ship will occupy, plus the row below
    for (var i=0; i<length+1; i++) {
      //checks if there are any ships in the column the ship will occupy and returns false if there are
      if (("" + board[row+i][column]).includes("ship")) {
        return false;
      }
      //checks if there are any ships in the column to the right of the ship (only if there is one) and returns false if there are
      if (column < 9 && ("" + board[row+i][column+1]).includes("ship")) {
        return false;
      }
      //checks if there are any ships in the column to the left of the ship (only if there is one) and returns false if there are
      if (column > 0 && ("" + board[row+i][column-1]).includes("ship")) {
        return false;
      }
    }
  }
  //runs if the ship will end in row 9
  else if (row + length === 10){
    //loops through all the rows the ship will occupy, plus the row above
    for (var i=-1; i<length; i++) {
      //checks if there are any ships in the column the ship will occupy and returns false if there are
      if (("" + board[row+i][column]).includes("ship")) {
        return false;
      }
      //checks if there are any ships in the column to the right of the ship (only if there is one) and returns false if there are
      if (column < 9 && ("" + board[row+i][column+1]).includes("ship")) {
        return false;
      }
      //checks if there are any ships in the column to the left of the ship (only if there is one) and returns false if there are
      if (column > 0 && ("" + board[row+i][column-1]).includes("ship")) {
        return false;
      }
    }
  }
  //runs if the ship will start below row 0 and end above row 9
  else {
    //loops through all the rows the ship will occupy, plus the rows above and below
    for (var i=-1; i<length+1; i++) {
      //checks if there are any ships in the column the ship will occupy and returns false if there are
      if (("" + board[row+i][column]).includes("ship")) {
        return false;
      }
      //checks if there are any ships in the column to the right of the ship (only if there is one) and returns false if there are
      if (column < 9 && ("" + board[row+i][column+1]).includes("ship")) {
        return false;
      }
      //checks if there are any ships in the column to the left of the ship (only if there is one) and returns false if there are
      if (column > 0 && ("" + board[row+i][column-1]).includes("ship")) {
        return false;
      }
    }
  }
  //returns true if the whole area is empty
  return true;
}


//creates vertical ships of a given length and number
//length is the length of the ship
//number is the number of ships to create
//generates a random row and column, checks if the area is empty, and places a ship there if it is
function placeVerticalShips(length, number) {
  //counts the number of ships that have been made
  var shipsPlaced = 0;
  do {
    //generates a random column between 0 and 9
    var column = Math.floor(Math.random()*10);//declaring random row
    //generates a random row between 0 and 10-length
    var row = Math.floor(Math.random()*(11-length));//declaring random column
    //checks if the area is clear
    if (checkIfEmptyVertical(row, column, length) === true) {
      //adds one to shipsOnBoard (so that each ship can be given a unique value)
      shipsOnBoard++;
      //loops through all the squares in the column for the length of the ship
      for (var i=0; i<length; i++) {
        //creates a unique value for each ship (ex: ship1, ship2, ship3) and assigns it to each of the ship's places in the board array
        board[row+i][column] = "ship" + shipsOnBoard;
      }
      //counts that a ship has been successfully placed
      shipsPlaced++;
    }
  //loops until the number of ships placed is equal to number
  } while (shipsPlaced < number );
}

//creates horizontal ships of a given length and number
//length is the length of the ship
//number is the number of ships to create
//generates a random row and column, checks if the area is empty, and places a ship there if it is
function placeHorizontalShips(length, number) {
  //counts the number of ships that have been made
  var shipsPlaced = 0;
  do {
    //generates a random row between 0 and 9
    var row = Math.floor(Math.random()*10);//declaring random row
    //generates a random column between 0 and 10-length
    var column = Math.floor(Math.random()*(11-length));//declaring random column
    //checks if the area is clear
    if (checkIfEmptyHorizontal(row, column, length) === true) {
      //adds one to shipsOnBoard (so that each ship can be given a unique value)
      shipsOnBoard++;
      //loops through all the squares in the row for the length of the ship
      for (var i=0; i<length; i++) {
        board[row][column + i] = "ship" + shipsOnBoard;//changing value of array at mathrandom to equal 0
        $("#"+row+(column+i)).addClass("shipSquare");//FIXME fix add class
      }
      shipsPlaced++;
    }
  } while (shipsPlaced < number );
}

function placeRandomOrientationShips (length, number) {
  var shipsPlaced = 0
  do {
    if (Math.random() > 0.5){
      placeHorizontalShips(length, 1)
    }
    else {
      placeVerticalShips(length, 1)
    }
    shipsPlaced ++
  } while (shipsPlaced < number)
}


//takes the id of a square (ex: "08", "66") and returns the corresponding value from the board array (ex: "ship1", "ship2hit", -1 (miss))
function getValue(id) {
  var row = parseInt(id.charAt(0));
  var column = parseInt(id.charAt(1));
  return(board[row][column]);
}

//takes the id of a square (ex: "08", "66") and changes the corresponding value in the board array to newValue
function changeValue(id, newValue) {
  var row = parseInt(id.charAt(0));
  var column = parseInt(id.charAt(1));
  board[row][column] = newValue;
}

//puts 10 empty arrays inside the board array
for (var i=0; i < 10; i++) {
  board[i] = [];
}

//checks if a ship of a given number has been sunk
function checkIfSunk (number) {
  //loops through all the positions in the array
  for (var row=0; row<10; row++){
    for (var column=0; column<10; column++) {
      //finds all of the positions in the array with the value "ship" + number
      if(("" + getValue("" + row + column)).includes("ship" + number)) {
        //checks if all of those values contain "hit"
        //returns false if any of them don't
        if(!(("" + getValue("" + row + column)).includes("hit"))) {
          return false;
        }
      }
    }
  }
  //returns true if all of the values containing "ship" + number also include "hit"
  return true;
}

//if a ship of a given number has been sunk, counts the ship and changes its color
function checkThenSinkShip (number) {
  //checks if the ship has been sunk
  if (checkIfSunk(number)) {
    //looks through all the positions in the board array
    for (var row=0; row<10; row++){
      for (var column=0; column<10; column++) {
        //finds all of the positions with the value "ship" + number
        if(("" + getValue("" + row + column)).includes("ship" + number)) {
          //changes the color of the corresponding squares
          $("#" + row + column).addClass("sunkenShip");
        }
      }
    }
    //counts the ship
    shipsSunk++;
    //updates the heading to show the number of ships that have been sunk
    if (shipsSunk === 4) {
      $("#shipsSunkHeading").text("Sink 1 more ship to win!");
    } else {
      $("#shipsSunkHeading").text("Sink " + (5 - shipsSunk) + " more ships to win.");
    }
  }
}



//exectues when the document is ready
$(document).ready( function() {
  //loops 10 times
  for (var i=0; i<10; i++) {
    //creates 10 table rows
    var newTableRow = $("tbody").append("<tr></tr>");
    //loops 10 times
    for (var j=0; j<10; j++) {
      //creates ten tds in each tr with the id "i"+"j"
      newTableRow.append('<td id="' + i + j + '">' + i + j + '</td>');
    }
  }

  //makes horizontal and vertical ships
  placeRandomOrientationShips(4, 2);
  placeRandomOrientationShips(3, 3);
  placeRandomOrientationShips(2, 3);

  //turns on click listener for all tds
  $("td").on("click", function(){
    //executes if the game is not over (so the user can't click anything when the game is over)
    if (gameOver === false) {
      // executes when a user clicks a square, unless they have already clicked on it
      if (!(("" + getValue($(this).attr("id"))).includes("hit")||getValue($(this).attr("id")) === MISS)) {
        //subtracts 1 from torpedoesRemaining
        torpedoesRemaining--;
        //executes when a user HITS a ship
        if (("" + getValue($(this).attr("id"))).includes("ship")) {
          //concatenates "hit" onto the ships value into the board array. ex: the new value will be "ship4hit"
          changeValue($(this).attr("id"), (getValue($(this).attr("id"))+ "hit"));
          //adds the class "hit square" to clange the color of the square
          $(this).addClass("hitSquare");//FIXME fix add class
          //checks if the ship has been sunk. if it has, this changes the color of the ship and adds 1 to shipsSunk
          checkThenSinkShip(("" + getValue($(this).attr("id"))).charAt(4));
          if (torpedoesRemaining<=5) {
            $("#torpedoCountHeading").addClass("blink");
          }
          //updates the heading to show the number of torpedoes remaining
          $("#torpedoCountHeading").text("Torpedoes remaining: " + (torpedoesRemaining));
          //executes when a user sinks five ships and WINS
          if (shipsSunk === 5) {
            //updates the heading to say "You win"
            $("#torpedoCountHeading").text("You win!");
            //ends the game so the user can't click any more squares
            gameOver = true;
            // loops through all values in the board array
            for (var row=0; row<10; row++){
              for (var column=0; column<10; column++) {
                //finds all the ships that have not been hit
                if(("" + getValue("" + row + column)).includes("ship") && !(("" + getValue("" + row + column)).includes("hit"))) {
                  //reveals the ships by changing their color
                  $("#" + row + column).addClass("shipSquareRevealed");//FIXME fix add class
                }
              }
            }
          }
        }
        //executes when the user clicks a square and MISSES
        else {
          //changes the value of the position in the array
          changeValue($(this).attr("id"), MISS);
          //adds the class clicked square to change the color
          $(this).addClass("clickedSquare");
          if (torpedoesRemaining<=5) {
            $("#torpedoCountHeading").addClass("blink");
          }
          //updates the heading to show the number of torpedoes remaining
          $("#torpedoCountHeading").text("Torpedoes remaining: " + (torpedoesRemaining));
          // executes when the user runs out of torpedoes and LOSES
          if (torpedoesRemaining <= 0) {
            //end the game so the user can't click anything
            gameOver = true;
            //updates the heading to say "You lose"
            $("#shipsSunkHeading").text("You lose!");
            $("#shipsSunkHeading").addClass("red");
            $("#torpedoCountHeading").removeClass("blink");
            $("#torpedoCountHeading").addClass("red");
            // loops through all the values in the board
            for (var row=0; row<10; row++){
              for (var column=0; column<10; column++) {
                //finds all the ships
                if(("" + getValue("" + row + column)).includes("ship")) {
                  //reveals the ships
                  $("#" + row + column).addClass("shipSquareRevealed");//FIXME fix add class
                }
              }
            }
          }
        }
      }//end of checking if square has been clicked
    }
  }); // end of on click function
}); // end ready
