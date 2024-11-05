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
 
  it('INICIAR TABLERO CON LAS DIMENSIONES CORRECTAS', () => {
    // Llamamos a ngOnInit para asegurarnos de que se inicializa el tablero
    component.ngOnInit();
    // Verificamos que el tablero tenga la dimensión esperada
    expect(component.board.length).toBe(component.SIZE);
    expect(component.board[0].length).toBe(component.SIZE);

  });
  it('COMPROBAR QUE EL TABLERO CONTENGA 10 MINAS', () => {
    // Llamamos a ngOnInit para inicializar el tablero
    component.ngOnInit();
    // Contamos el número de minas en el tablero
    let mineCount = 0;
    //RECORRER FILAS Y CELDAS(FOR ANIDADO), EN EL CUAL SI LA CELDA CONTIENE UN VALOR "-1", SE SUMARA AL MINECOUNT++ 
    for (let row of component.board) {
      for (let cell of row) {
        if (cell.isMine === -1){ 
          mineCount++;
        }
      }
    }
    //SE HACE LA COMPARACION ENTRE LA VARIABLE mineCount con la defincion en el componente.
    expect(mineCount).toBe(component.MINES);
  });
});
