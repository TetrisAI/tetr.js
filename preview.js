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
  for (var i = 0; i < 6; i++) {
    var initInfo = RotSys[settings.RotSys].initinfo[this.grabBag[i]];
	var x = pieces[this.grabBag[i]].x - (gameWidth - 4) / 2 + 0.5;
	var y = pieces[this.grabBag[i]].y + 2 + initInfo[1] + i * 3;
	if (settings.RotSys == 3) {
		if (this.grabBag[i] === 4 || this.grabBag[i] === 5 || this.grabBag[i] === 6) {
			x += 1
		}
		else if (this.grabBag[i] === 2) {
			x += 1.5
		}
		else {
			x += 0.5
		}
		if (this.grabBag[i] !== 1 && this.grabBag[i] !== 2) {
			y += 0.5
		}
		else {
			y += 1
		}
	}
    else {
		if (this.grabBag[i] === 0 || this.grabBag[i] === 3) {
			x -= 0.5
		}
	}
      draw(pieces[this.grabBag[i]].tetro[initInfo[2]], x, y, previewCtx);
  }
}
var preview = new Preview();
