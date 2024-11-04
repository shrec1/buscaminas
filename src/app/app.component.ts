import { Component } from '@angular/core';

interface Cell {
  isMine: number;
  isRevealed: boolean;
  neighborMines: number;
  isFlagged: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  board: Cell[][] = [];
  gameOver = false;
  isGameWon = false;
  readonly SIZE = 10;
  readonly MINES = 10;
  

  ngOnInit(): void {
    this.inicializarTablero();
    this.placeMines();
    this.calculateNeighborMines();
    //this.iniciarTablero();
    // this.recorrerTablero();
    // this.minePlaced();
    //this.initializeBoard();
  }
  // iniciarTablero() {
  //   this.board = [];
  //   for (let i = 0; i < this.SIZE; i++) {
  //     this.board[i] = [];
  //     for (let j = 0; j < this.SIZE; j++) {
  //       this.board[i][j] = { isMine: 0, isRevealed: false, neighborMines: 0 };
  //     }
  //   }
  //   console.log(this.board);
  // }

  // private initializeBoard() {
  //   this.board = Array.from({ length: this.SIZE }, () =>
  //     Array.from({ length: this.SIZE }, () => ({ isMine: false, isRevealed: false, neighborMines: 0 }))
  //   );
  // }

  inicializarTablero() {
      this.board = Array.from({ length: this.SIZE }, () =>
      Array.from({ length: this.SIZE }, () => ({
        isMine: 0,
        isRevealed: false,
        neighborMines: 0,
        isFlagged : false
      }))
    );
    console.log(this.board);
    console.log('-------------------------------------------------');
  }

   placeMines() {
    let minasColocadas = 0;

    while (minasColocadas < this.MINES) {
      const row = Math.floor(Math.random() * this.SIZE);
      const col = Math.floor(Math.random() * this.SIZE);
      if (!this.board[row][col].isMine) {
        this.board[row][col].isMine = -1;
        minasColocadas++;
      }
    }
    console.log('Tablero después de colocar minas:', this.board);
  }

   calculateNeighborMines() {
    for (let row = 0; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        if (this.board[row][col].isMine) {
          this.incrementNeighborCounts(row, col);
        }
      }
    }
  }

   incrementNeighborCounts(row: any, col: any) {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if(this.isInBounds(r,c))
         {
           this.board[r][c].neighborMines++;
         }
        // if (
        //   r >= 0 &&
        //   r < this.SIZE &&
        //   c >= 0 &&
        //   c < this.SIZE &&
        //   !(r === row && c === col)
        // ) 
        
      }
    }
  }
  
  public revealCell(row: number, col: number) {
    //Linea para omitir revelar si se da la condicion
    if (this.gameOver || this.board[row][col].isRevealed) return; 
    this.board[row][col].isRevealed = true;

    
    //Condicion para abrir area si la celda no tiene "Minas Vecinas"
    if (this.board[row][col].neighborMines === 0) {
      //Array que contiene las coordenadas, para manejar las celdas cercanas a la Celda con minas adyacente=0
      //(-1,-1 -> ARRIBA IZQUIERDA , -1,0 ARRIBA-CENTRO, ETC... )
      const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1], [0, 1],
          [1, -1], [1, 0], [1, 1]
      ];
      
      for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
  
          // Verificar si la nueva posición está dentro de los límites del tablero
          if (this.isInBounds(newRow, newCol)) {
              this.revealCell(newRow, newCol); // Llamada recursiva
           
          }
          
      }
    
    }
    //Condicion si la celda revelada es mina; se cambia el estado de la variable "gameOver = true" y mensaje de alerta
    //En caso  
    if (this.board[row][col].isMine) {
      this.gameOver = true;
      alert('HAS PERDIDO');
    } 
    else if (this.checkWinCondition()) {
       this.isGameWon = true;
       alert('FELICIDADES. HAS LIMPIADO EL TABLERO.');
    }
  }
  isInBounds(row: number, col: number): boolean {
   return row >= 0 && row < this.SIZE && col >= 0 && col < this.SIZE;
}

placeFlag(event: MouseEvent, row: number, col: number) {
 
  //Previene el menu de contexto del navegador al hacer click derecho
  event.preventDefault(); 

  console.log(`Clic derecho en: (${row}, ${col})`);
  const cell = this.board[row][col];

  if (!cell.isRevealed) { // Solo permitir colocar bandera si la celda no está revelada
      cell.isFlagged = false; // Alternar el estado de la bandera
  }
}
placeFlag2(event: MouseEvent, row: number, col: number) {
  event.preventDefault(); // Previene el menú de contexto

  console.log(`Clic derecho en: (${row}, ${col})`);
  const cell = this.board[row][col];

  if (!cell.isRevealed) {
    this.toggleFlag(cell); // Llama a un método auxiliar
  }
}

private toggleFlag(cell: Cell) {
  cell.isFlagged = !cell.isFlagged; // Alterna el estado de la bandera
}

   checkWinCondition() {
     return this.board.flat().every((cell) => cell.isRevealed || cell.isMine);
   }

  //   inicializarTablero() {
  //     this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  //     console.log(this.board);

  //   }

  //   minePlaced(){
  //     let minasColocadas = 0;

  //     while (minasColocadas < this.mines) {
  //       const fila = Math.floor(Math.random() * this.rows);
  //       const columna = Math.floor(Math.random() * this.cols);

  //       if (this.board[fila][columna] === 0) { // Verifica si la celda está vacía
  //         this.board[fila][columna] = -1; // Coloca la mina

  //         minasColocadas++; // Incrementa el contador de minas colocadas
  //       }
  //     }
  //     console.log('Tablero después de colocar minas:', this.board);
  //   }
  //   isMine(row: number, col: number): boolean {
  //     return this.board[row][col] === -1;
  //   }

  //   recorrerTablero() {
  //     for (let i = 0; i < this.board.length; i++) { // Recorre las filas
  //       for (let j = 0; j < this.board[i].length; j++) { // Recorre las columnas
  //         console.log(`Celda [${i}, ${j}]: ${this.board[i][j]}`);
  //       }}
  //     }
  // revealCell(row:number,col:number,){}
}
