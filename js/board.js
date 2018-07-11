/***************************************************************************/
// Drag start event

function onDragStart(source, piece, position, orientation){
  var boolean = checkForValidPiece({
    source: source,
    piece: piece,
    position: position,
    orientation: orientation,
  });

  if(boolean == false){ return false }
};

/***************************************************************************/
// Drop Event

function onDrop(source, target){
  var boolean = checkForValidMove({
    source: source,
    target: target,
  });

  if(boolean == 'snapback'){ return 'snapback' }
  update();
}

/***************************************************************************/
// Snap End Event

function onSnapEnd(){
  assignBoard();
}

/***************************************************************************/
// Change Event

function onChange(){}

/***************************************************************************/
// Mouse Over Event

function onMouseoverSquare(square, piece){
  var moves = getMoves(square);
  moves = moves.map(d => { return d.to })

  reach_piece = reach_piece.map(d => { return false });
  reach_piece = squares.map(d => {
    if(moves.indexOf(d) != -1){ return true } else { return false }
  })

  highlight_cells();
}

/***************************************************************************/
// Mouse Out Event

function onMouseoutSquare(){
  reach_piece = reach_piece.map(d => { return false });
  highlight_cells();
}

/***************************************************************************/
// Highlight highlight_cells

function highlight_cells(){
  $('#board .square-55d63').css('background', '');

  var square = null;
  reach_all.forEach((d,i) => {
    if(d == true){
      square = squares[i];
      var squareEl = $('#board .square-' + square);
      var background = 'lightblue';
      if (squareEl.hasClass('black-3c85d') === true) { background = '#8696e6'; }
      squareEl.css('background', background);
    }
  })

  var square = null;
  reach_piece.forEach((d,i) => {
    if(d == true){
      square = squares[i];
      var squareEl = $('#board .square-' + square);
      var background = 'lightgreen';
      if (squareEl.hasClass('black-3c85d') === true) { background = 'green'; }
      squareEl.css('background', background);
    }
  })

}
