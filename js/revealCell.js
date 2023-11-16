function revealCell(x, y) {
    if (gameOver || x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y].isRevealed) {
      return;
    }
    
    board[x][y].isRevealed = true;

    if (board[x][y] === 9) {
      gameOver = true;
      alert('Game Over!');
    } else if (board[x][y].count === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          revealCell(x + dx, y + dy);
        }
    }
}
}

demineur = new Demineur(5,5,5);
revealCell()