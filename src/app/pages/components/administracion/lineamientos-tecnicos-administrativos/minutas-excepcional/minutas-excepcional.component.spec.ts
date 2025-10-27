import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MinutasExcepcionalComponent } from './minutas-excepcional.component';

describe('MinutasExcepcionalComponent', () => {
  let component: MinutasExcepcionalComponent;
  let fixture: ComponentFixture<MinutasExcepcionalComponent>;

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
      declarations: [ MinutasExcepcionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutasExcepcionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear componente ', () => {
    expect(component).toBeTruthy();
  });
});
