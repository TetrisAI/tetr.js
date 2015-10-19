function Preview() {
  grabBag = this.gen();
}
Preview.prototype.init = function() {
  //XXX fix ugly code lolwut /* farter */
  while (1) {
    this.grabBag = this.gen();
    break;
    //if ([3,4,6].indexOf(this.grabBag[0]) === -1) break;
  }
  this.grabBag.push.apply(this.grabBag, this.gen());
  this.draw();
}
Preview.prototype.next = function() {
  var next;
  next = this.grabBag.shift();
  if (this.grabBag.length === 7) {
    this.grabBag.push.apply(this.grabBag, this.gen());
  }
  this.draw();
  return next;
  //TODO Maybe return the next piece?
}
/**
 * Creates a "grab bag" of the 7 tetrominos.
 */
Preview.prototype.gen = function() {
  var pieceList = [0, 1, 2, 3, 4, 5, 6];
  //return pieceList.sort(function() {return 0.5 - rng.next()});
  /* farter */ // proven random shuffle algorithm
  for (var i=0;i<7-1;i++)
  {
    var temp=pieceList[i];
    var rand=~~((7-i)*rng.next())+i;
    pieceList[i]=pieceList[rand];
    pieceList[rand]=temp;
  }
  return pieceList;
}
/**
 * Draws the piece preview.
 */
Preview.prototype.draw = function() {
  clear(previewCtx);
  for (var i = 0, mi = settings.RotSys == 3 ? 4 : 6; i < mi; i++) {
    var initInfo = RotSys[settings.RotSys].initinfo[this.grabBag[i]];
	var offset = getOffset(i, this.grabBag[i]);
	offset.x += pieces[this.grabBag[i]].x - (gameWidth - 4) / 2 + 0.5;
	offset.y += pieces[this.grabBag[i]].y + 2 + initInfo[1] + i * 3;
    draw(pieces[this.grabBag[i]].tetro[initInfo[2]], offset.x, offset.y,
       previewCtx, undefined, undefined, true);
  }
}
var preview = new Preview();
