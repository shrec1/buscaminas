import { TestBed ,ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should initialize the board with correct dimensions and properties', () => {
    // Llamamos a ngOnInit para asegurarnos de que se inicializa el tablero
    component.ngOnInit();
    // Verificamos que el tablero tenga la dimensión esperada
    expect(component.board.length).toBe(component.SIZE);
    expect(component.board[0].length).toBe(component.SIZE);

  });

  it('should initialize the board with 10 mines', () => {
    // Llamamos a ngOnInit para inicializar el tablero
    component.ngOnInit();

    // Contamos el número de minas en el tablero
    let mineCount = 0;

    for (let row of component.board) {
      for (let cell of row) {
        if (cell.isMine === -1) { // Suponiendo que -1 representa una mina
          mineCount++;
        }
      }
    }

    // Verificamos que haya 10 minas en el tablero
    expect(mineCount).toBe(component.MINES);
  });
});
