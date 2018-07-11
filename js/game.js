/***************************************************************************/
// Get Game Status

function getGameStatus(game){
  var status = '';
  var moveColor = 'White';
  if (game.turn() === 'b') { moveColor = 'Black'; }
  if (game.in_checkmate() === true) { status = 'Game over, ' + moveColor + ' is in checkmate.'; }
  else if (game.in_draw() === true) { status = 'Game over, drawn position'; }
  else {
    status = moveColor + ' to move';
    if (game.in_check() === true) { status += ', ' + moveColor + ' is in check'; }
  }
  return status
}

/***************************************************************************/
// Assign Highlighting All

function assignHighlighting_all(){
  var moves = game.moves({ verbose: true });
  moves = moves.map(d => { return d.to })

  reach_all = reach_all.map(d => { return false });
  reach_all = squares.map(d => {
    if(moves.indexOf(d) != -1){ return true } else { return false }
  })
}

/***************************************************************************/
// Get Moves

function getMoves(square){
  return game.moves({ square: square, verbose: true });
}
