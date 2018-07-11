/***************************************************************************/
// During game-play functions

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
function onDragStart(source, piece, position, orientation) {
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';
  update(game);
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen());
};

function onChange(){}

/***************************************************************************/
// Get Game Status

function getGameStatus(game){
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') { moveColor = 'Black'; }

  // checkmate?
  if (game.in_checkmate() === true) { status = 'Game over, ' + moveColor + ' is in checkmate.'; }

  // draw?
  else if (game.in_draw() === true) { status = 'Game over, drawn position'; }

  // game still on
  else {
    status = moveColor + ' to move';
    // check?
    if (game.in_check() === true) { status += ', ' + moveColor + ' is in check'; }
  }

  return status
}

/***************************************************************************/
// Update

function update(game){
  var status = getGameStatus(game);

  $('#status').html(status);
  $('#fen').html(game.fen());
  $('#pgn').html(game.pgn());
}

/***************************************************************************/
// Set Game

function setGame(fen){
  board.position(fen);
}

/***************************************************************************/
// Chess board

var game = new Chess();
var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  onChange: onChange,
  showErrors: 'console',
};
var board = ChessBoard('board', cfg);

update(game);
