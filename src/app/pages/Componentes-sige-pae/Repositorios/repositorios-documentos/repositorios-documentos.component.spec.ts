import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriosDocumentosComponent } from './repositorios-documentos.component';

describe('RepositoriosDocumentosComponent', () => {
  let component: RepositoriosDocumentosComponent;
  let fixture: ComponentFixture<RepositoriosDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoriosDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriosDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
