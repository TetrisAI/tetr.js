function Hold() {
  this.piece;
}
Hold.prototype.draw = function() {
  clear(holdCtx);
  var initInfo = RotSys[settings.RotSys].initinfo[this.piece];
  var offset = getOffset(0, this.piece);
  offset.x += pieces[this.piece].x - (gameWidth - 4) / 2 + 0.5;
  offset.y += pieces[this.piece].y + 2 + initInfo[1];
  draw(pieces[this.piece].tetro[initInfo[2]], offset.x, offset.y, holdCtx, undefined, undefined, true);
}
var hold = new Hold();
