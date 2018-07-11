var board, game, squares, reach_all, reach_piece;
var show_highlighting = true;

$(document).ready(function(){
  setup();
})

/***************************************************************************/
// Setup

function setup(fem){
  game = new Chess();
  squares = game.SQUARES;
  reach_all = squares.map(d => { return false });
  reach_piece = squares.map(d => { return false });

  var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onChange: onChange,
    onMouseoverSquare: onMouseoverSquare,
    onMouseoutSquare: onMouseoutSquare,
    showErrors: 'console',
  };

  board = ChessBoard('board', cfg);
  update();
}

/***************************************************************************/
// Update

function update(){
  updateText();
  updateBoard();
}

function updateText(){
  var status = getGameStatus(game);

  $('#status').html(status);
  $('#fen').html(game.fen());
  $('#pgn').html(game.pgn());
}

function updateBoard(){
  if(show_highlighting === true){ assignHighlighting_all(); highlight_cells(); }
}

/***************************************************************************/
// Processes

function checkForValidPiece(board_args){
  if(game.game_over() === true ||
      (game.turn() === 'w' && board_args.piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && board_args.piece.search(/^w/) !== -1)) {
    return false;
  }
}

function checkForValidMove(board_args){
  var move = game.move({ from: board_args.source, to: board_args.target });
  if(move === null){ return 'snapback' }
}

function assignBoard(){
  board.position(game.fen());
}
