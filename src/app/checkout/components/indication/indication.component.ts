import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { RecaptchaComponent } from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ERd } from '../../enums/rd.enum';
import { ICity } from '../../interfaces/city';
import { IIndicacao } from '../../interfaces/indicacao';
import { IPersonalInfo } from '../../interfaces/personal-info';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-indication',
  templateUrl: './indication.component.html',
  styleUrls: ['./indication.component.scss']
})
export class IndicationComponent implements OnInit {

    @ViewChild('captchaRef') recaptcha: RecaptchaComponent;

    @Input() personalInfo: IPersonalInfo;

    indicationFormGroup: FormGroup;

    arrayDaily: number[] = [];
    arrayCities: ICity[] = [];
    arrayFilteredCities: Observable<ICity[]>;

    loading: boolean = false;
    loadingCityFilter: boolean = false;

    MASKS = MASKS;

    checkoutCitySubscription: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        private cdr: ChangeDetectorRef,
            private checkoutService: CheckoutService,
    ) {}

    ngOnInit(): void {
        this.loadFormIndication();
    }

    loadFormIndication() {
        const cityAutoCompleteControl = new FormControl('', Validators.required);

        this.arrayFilteredCities = cityAutoCompleteControl.valueChanges.pipe(
            startWith(''),
            map(city => (city ? this.filterCities(city) : this.arrayCities.slice())),
        );

        this.indicationFormGroup = this.fb.group({
            indicationName: ['', [Validators.required]],
            indicationEmail: ['', [Validators.required, Validators.email]],
            indicationPhone: ['', [Validators.required, NgBrazilValidators.telefone]],
            indicationIdCity: ['', Validators.required],
            indicationCityAutoComplete: cityAutoCompleteControl,
            indicationAccept: ['', [Validators.required, Validators.requiredTrue]],
            indicatorCpf: [this.personalInfo?.cpf, [Validators.required, NgBrazilValidators.cpf]],
            tokenRecaptcha: ['', [Validators.required]],
        });
    }

    private filterCities(filter: string): ICity[] {
        const filterValue = filter.toLowerCase();
        return this.arrayCities.filter(city => city.name.toLowerCase().includes(filterValue));
    }

    citySelected(evento: MatAutocompleteSelectedEvent) {
        const city = evento.option.value;

        this.indicationFormGroup.patchValue({ indicationIdCity: city.id, indicationCityAutoComplete: this.assembleCityName(city) });
        this.arrayCities = [];
    }

    assembleCityName(city: ICity) {
        return `${city.name} - ${city.uf.initials}`;
    }

    clearCityForm(evento: KeyboardEvent) {
    
        if (evento.code === 'Backspace') {
            this.indicationFormGroup.patchValue({ indicationIdCity: '', indicationCityAutoComplete: '' });
            this.arrayCities = [];
        } else if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown' || evento.key === 'ArrowRight' || evento.key === 'ArrowLeft') {
            return;
        } else if (this.indicationFormGroup.value.indicationCityAutoComplete?.length >= 2) {

            this.arrayCities = [];
            this.loadingCityFilter = true;
            const filter = this.indicationFormGroup.value.indicationCityAutoComplete + evento.key;

            const subscription = this.checkoutService
                .getCities(filter)
                .subscribe((cities: ICity[]) => {
                    this.loadingCityFilter = false;

                    this.cdr.detectChanges();
                    this.arrayCities = cities;
                });

            this.checkoutCitySubscription.push(subscription);
        }
    }

    recaptchaResolve(event: string) {
        this.indicationFormGroup.patchValue({ tokenRecaptcha: event });
    }

    onSubmitIndication() {
        if(this.indicationFormGroup.invalid) return;

        this.spinner.show();
        this.loading = true;
        const indicationForm = Object.assign(this.indicationFormGroup.value);

        const indication: IIndicacao = {
            aceite: indicationForm.indicationAccept,
            cidadeAutoComplete: indicationForm.indicationCityAutoComplete,
            cpfIndicador: this.personalInfo.cpf,
            eMail: indicationForm.indicationEmail,
            idCidade: indicationForm.indicationIdCity,
            nomeCompleto: indicationForm.indicationName,
            telefone: indicationForm.indicationPhone,
            tokenRecaptcha: indicationForm.tokenRecaptcha,
            codigoRD: ERd.VendaSemAdesao,
        }

        const subscription = this.checkoutService
            .sendFormRDStationAndSiscoob(indication)
            .subscribe((resp) => {
                this.spinner.hide();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    background: '#f18715',
                    timer: 25000,
                    timerProgressBar: true,
                    title: '<span style="color: white">Sua indicação foi concluída!</span>',
                    width: '500',
                    html: `
                        <div style="font-size: 14px; color: white">
                            <p>
                                Agora é só esperar o seu indicado fazer a Assinatura de Viagens
                                Coobrastur e após o pagamento da 1ª mensalidade, você receberá 5.000 Dotz!
                            </p>
                            <p>
                                Quanto mais indicações, mais Dotz você ganha! Bora fazer uma nova indicação?  
                            </p>
                        </div>`,
                    showCloseButton: true,
                    closeButtonHtml: `
                        <div style="height: 100%; display: flex; align-items: center">    
                            <span style="color: white">&times;</span>
                        </div>
                    `,
                    didClose: () => {
                        this.loadFormIndication();
                        this.recaptcha.reset();
                        this.loading = false;
                    },
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
        });

        this.checkoutCitySubscription.push(subscription);
    }

    ngOnDestroy(): void {
        this.checkoutCitySubscription.forEach(subscription => subscription?.unsubscribe);
    }

}
