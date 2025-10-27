
import { async, ComponentFixture, TestBed } from '@angular/core/testing';





import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ContratosSupervisionComponent } from './contratos-supervision.component';

describe('ContratosSupervisionComponent', () => {
  let component: ContratosSupervisionComponent;
  let fixture: ComponentFixture<ContratosSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatMenuModule
      
      ],
      declarations: [ ContratosSupervisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente ', () => {
    expect(component).toBeTruthy();
  });
});
