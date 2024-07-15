import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from './modal.component';
import { SharedService } from '../shared.service';
import { DataService } from '../data.service';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    // Create spy objects for SharedService and DataService
    const spySharedService = jasmine.createSpyObj('SharedService', ['resetForm$', 'buttonVisibility$', 'formData$', 'selectedItem$']);
    const spyDataService = jasmine.createSpyObj('DataService', ['postData']);

    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SharedService, useValue: spySharedService },
        { provide: DataService, useValue: spyDataService },
        FormBuilder
      ]
    }).compileComponents();

    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    formBuilder = TestBed.inject(FormBuilder);

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with expected controls', () => {
    const expectedForm = formBuilder.group({
      REF_DATE: [''],
      GEO: [''],
      DGUID: [''],
      APFVP: [''],
      UOM: [''],
      UOM_ID: [''],
      SCALAR_FACTOR: [''],
      SCALAR_ID: [''],
      VECTOR: [''],
      COORDINATE: [''],
      VALUE_: [''],
      STATUS_: [''],
      SYMBOL: [''],
      TERM: [''],
      DECIM: ['']
    });
    expect(component.form).toEqual(expectedForm);
  });

  it('should patch form data when formData$ emits', () => {
    const mockFormData = {
      REF_DATE: '2024-07-15',
      GEO: 'Canada',
      DGUID: '123456',
      APFVP: 'Some value',
      // Add more fields as needed
    };
    sharedServiceSpy.formData$.and.returnValue(of(mockFormData));
    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.form.value).toEqual(mockFormData);
  });

  it('should reset form after onSave()', () => {
    const mockFormData = {
      REF_DATE: '2024-07-15',
      GEO: 'Canada',
      DGUID: '123456',
      APFVP: 'Some value',
      // Add more fields as needed
    };
    component.form.patchValue(mockFormData);
    spyOn(window, 'alert'); // Spy on window.alert

    component.onSave();

    expect(component.form.value).toEqual({
      REF_DATE: '',
      GEO: '',
      DGUID: '',
      APFVP: '',
      UOM: '',
      UOM_ID: '',
      SCALAR_FACTOR: '',
      SCALAR_ID: '',
      VECTOR: '',
      COORDINATE: '',
      VALUE_: '',
      STATUS_: '',
      SYMBOL: '',
      TERM: '',
      DECIM: ''
    });
    expect(window.alert).toHaveBeenCalledWith('Data updated successfully!');
  });
});
