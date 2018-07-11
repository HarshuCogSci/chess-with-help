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
  removeGreySquares();
  highlightAllPossibleCells();

  updateText(game);
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen());
};

function onChange(){}

/***************************************************************************/
// Cell highlighting functions

function highlightAllPossibleCells(){
  var moves = game.moves({ verbose: true });
  for(var i = 0; i < moves.length; i++){ greySquare(moves[i].to); }
}

function onMouseoverSquare(square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

function onMouseoutSquare(square, piece) {
  removeGreySquares();
};

/***************************************************************************/
// Graying squares

function removeGreySquares() {
  $('#board .square-55d63').css('background', '');
};

function greySquare(square) {
  var squareEl = $('#board .square-' + square);
  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) { background = '#696969'; }
  squareEl.css('background', background);
};

function removeHighlightingSquares() {
  $('#board .square-55d63').css('background', '');
};

function highlightingSquare(square) {
  var squareEl = $('#board .square-' + square);

  var background = 'green';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = 'darkgreen';
  }

  squareEl.css('background', background);
};

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
// Update

function updateText(game){
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
  // onMouseoverSquare: onMouseoverSquare,
  // onMouseoutSquare: onMouseoutSquare,
  showErrors: 'console',
};
var board = ChessBoard('board', cfg);

updateText(game);
highlightAllPossibleCells();
