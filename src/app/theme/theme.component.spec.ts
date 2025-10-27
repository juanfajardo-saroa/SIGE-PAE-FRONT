import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
    let component: ThemeComponent;
    let fixture: ComponentFixture<ThemeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({

imports: [ HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatMenuModule
      
      ],

            declarations: [ThemeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThemeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debe crear componente ', () => {
        expect(component).toBeTruthy();
    });
});