import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SistemasComponent } from './sistemas.component';

describe('SistemasComponent', () => {
    let component: SistemasComponent;
    let fixture: ComponentFixture<SistemasComponent>;

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

            declarations: [SistemasComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SistemasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debe crear componente ', () => {
        expect(component).toBeTruthy();
    });
});