import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { RecaptchaComponent } from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IPlan, Plan } from 'src/app/home/interfaces/plan';
import { Price } from 'src/app/home/interfaces/price';
import { IPlanRequest } from 'src/app/plans/interfaces/plans-request';
import { Base64Service } from 'src/app/shared/services/base64.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Utils } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ERd } from '../../enums/rd.enum';
import { IAddress } from '../../interfaces/address';
import { IBuyPlan } from '../../interfaces/buy-plan';
import { ICidade } from '../../interfaces/cidade';
import { ICity } from '../../interfaces/city';
import { ICredentialLogin } from '../../interfaces/credential-login';
import { IIndicacao } from '../../interfaces/indicacao';
import { PersonalInfo } from '../../interfaces/personal-info';
import { CustomMasks } from '../../models/custom-masks';
import { CheckoutService } from '../../services/checkout.service';
import { IIndicacaoInfoPlanos } from '../../interfaces/indicacaoInfoPlanos';

@Component({
    selector: 'app-info-plan',
    templateUrl: './info-plan.component.html',
    styleUrls: ['./info-plan.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class InfoPlanComponent implements OnInit {

    @ViewChild('stepper') stepper: MatStepper;
    @ViewChild('captchaRef') recaptcha: RecaptchaComponent;

    @HostListener('window:offline', ['$event']) onChanceStatusConnectionToOffline(event: any) {
        this.online = false;
        this.snackBar.open('Você está sem conexão com a internet. A compra não poderá ser efetuada. Por favor, verifique os cabos e sua conexão com internet antes de finalizar a compra', undefined, { verticalPosition: 'top' });
    }

    @HostListener('window:online', ['$event']) onChanceStatusConnectionToOnline(event: any) {
        this.online = true;
        this.snackBar.dismiss();
    }

    baseCards: string = environment.baseCards;

    MASKS = MASKS;
    customMasks = new CustomMasks();

    loginFormGroup: FormGroup;
    registerFormGroup: FormGroup;
    registerRdFormGroup: FormGroup;
    setupPlanFormGroup: FormGroup;
    paymentFormGroup: FormGroup;
    indicationFormGroup: FormGroup;

    infoPlan: Plan = new Plan();
    personalInfo: PersonalInfo = new PersonalInfo();
    buyPlan: IBuyPlan;
    vendCodigo: string;

    arrayDaily: number[] = [];
    arrayCities: ICity[] = [];
    arrayFilteredCities: Observable<ICity[]>;

    loading: boolean = false;
    loadingCityFilter: boolean = false;
    doRegister: boolean = false;
    couponToggle: boolean = false;
    thirdPartyCard: boolean = false;
    finished: boolean = false;
    errorFinished: boolean = false;
    addressEditBloq: boolean = true;
    online: boolean = true;
    selectedPlanGo: boolean = false;

    checkoutCitySubscription: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        private cdr: ChangeDetectorRef,
        private checkoutService: CheckoutService,
        private route: ActivatedRoute,
        private base64Service: Base64Service,
        private storageService: StorageService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.loadFormLogin();
        this.loadFormRegister();
        this.loadFormSetupPlan();
        this.loadFormPayment();
        this.loadFormIndication();
        this.storageService.removeItem('user');
    }

    ngOnInit(): void {
        this.getInfoPlan();
    }

    getInfoPlan() {
        if (this.setupPlanFormGroup.invalid) return;

        this.loading = true;

        const plan = this.route.snapshot.queryParams['plan'];
        if (plan) {
            const infoPlanJson: IPlan = JSON.parse(this.base64Service.decode(plan));
            this.setupPlanFormGroup.patchValue({ plCodigo: infoPlanJson.id });
        }

        const planId = this.setupPlanFormGroup.get('plCodigo')?.value;

        if ((planId == 34 || planId == 35 || planId == 42 || planId == 41) && !this.selectedPlanGo) {

            this.setupPlanFormGroup.patchValue({ qtdDiarias: 4 });
            this.selectedPlanGo = true;
        }

        this.spinner.show();

        const setupPlan: IPlanRequest = Object.assign({}, this.setupPlanFormGroup.value);
        // debugger
        this.arrayDaily.push(1)
        const subscription = this.checkoutService
            .getInfoPlans(setupPlan)
            .subscribe((infoPlan: IPlan[]) => {
                this.infoPlan = infoPlan[0];
                this.loading = false;
              //  this.constructArrayDaily();
                this.spinner.hide();
            }, () => this.spinner.hide());

        this.checkoutCitySubscription.push(subscription);
    }

    atualizarPlano() {
        this.getInfoPlan();
    }

    loadFormLogin() {
        this.loginFormGroup = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    loadFormRegister() {
        const cityAutoCompleteControl = new FormControl('', Validators.required);

        this.arrayFilteredCities = cityAutoCompleteControl.valueChanges.pipe(
            startWith(''),
            map(city => (city ? this.filterCities(city) : this.arrayCities.slice())),
        );

        this.registerRdFormGroup = this.fb.group({
            fullName: ['', [Validators.required, Validators.pattern(/^([\w]{3,})+\s+([\w\s]{3,})+$/i)]],
            phone: ['', [Validators.required, NgBrazilValidators.telefone]],
            email: ['', [Validators.required, Validators.email]]
        });

        const indicatedControl = new FormControl(false, [Validators.required]);

        indicatedControl.valueChanges.subscribe((value: boolean) => {

            const cpfIndicatorControl = this.registerFormGroup.get('cpfIndicator');

            if (cpfIndicatorControl) {
                if (value) {
                    cpfIndicatorControl.setValidators([NgBrazilValidators.cpf, Validators.required]);
                } else {
                    cpfIndicatorControl.clearValidators();
                    cpfIndicatorControl.reset();
                }
                this.registerFormGroup.updateValueAndValidity();
            }
        });

        this.registerFormGroup = this.fb.group({
            cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
            news: [false],
            accept: ['', [Validators.required, Validators.requiredTrue]],
            restriction: ['', Validators.required],
            address: this.fb.group({
                zipCode: ['', [Validators.required, NgBrazilValidators.cep]],
                state: ['', [Validators.required]],
                idCity: ['', [Validators.required]],
                cityAutoComplete: cityAutoCompleteControl,
                city: ['', [Validators.required]],
                street: ['', [Validators.required]],
                number: ['', [Validators.required]],
                complement: ['', []],
                district: ['', [Validators.required]],
            }),
            indicated: indicatedControl,
            cpfIndicator: ['', [NgBrazilValidators.cpf]],
        });
    }

    loadFormSetupPlan() {
        this.setupPlanFormGroup = this.fb.group({
            plCodigo: [],
            plFamilia: [false, Validators.required],
            qtdDiarias: [1, Validators.required],
            cupomDesconto: [''],
            vendCodigo: ['', Validators.required]
        });

        const vendCodigo = this.storageService.getItem('vendCodigo');

        if (vendCodigo && vendCodigo == '99015') {
            this.setupPlanFormGroup.patchValue({ vendCodigo: '99015' });
            this.vendCodigo = '99015';
        } else {
            this.setupPlanFormGroup.patchValue({ vendCodigo: '99016' });
            this.vendCodigo = '99016';
        }

    }

    loadFormPayment() {
        const indicationControl = new FormControl(false, Validators.required);

        indicationControl.valueChanges.subscribe(() => {
            this.loadFormIndication();
        });

        this.paymentFormGroup = this.fb.group({
            third: [false, [Validators.required]],
            ccNumber: ['', [Validators.required, Validators.pattern(this.customMasks.creditCardRegExp)]],
            ccName: ['', [Validators.required]],
            ccExpirationDate: ['', [Validators.required, Validators.pattern(this.customMasks.expirationDate)]],
            ccCVV: ['', [Validators.required, Validators.pattern(this.customMasks.cvvRegExp)]],
            ccFlag: ['', [Validators.required]],
            ccImageFlag: [''],
            ccMask: [''],
            paymentDay: ['', [Validators.required, Validators.min(1), Validators.max(28)]],
            accept: ['', [Validators.required, Validators.requiredTrue]],
            indication: indicationControl,
            additionTerms: [false, []],
        });
    }

    loadFormThirdPayment() {

        const indicationControl = new FormControl(false, Validators.required);

        indicationControl.valueChanges.subscribe(() => {
            this.loadFormIndication();
        });

        this.paymentFormGroup = this.fb.group({
            phone: ['', [Validators.required, NgBrazilValidators.telefone]],
            cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
            third: [true, [Validators.required]],
            ccNumber: ['', [Validators.required, Validators.pattern(this.customMasks.creditCardRegExp)]],
            ccName: ['', [Validators.required]],
            ccExpirationDate: ['', [Validators.required, Validators.pattern(this.customMasks.expirationDate)]],
            ccCVV: ['', [Validators.required, Validators.pattern(this.customMasks.cvvRegExp)]],
            ccFlag: ['', [Validators.required]],
            ccImageFlag: [''],
            ccMask: [''],
            paymentDay: ['', [Validators.required, Validators.min(1), Validators.max(28)]],
            accept: ['', [Validators.required, Validators.requiredTrue]],
            indication: indicationControl,
            additionTerms: [false, []],
        });
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
            indicationPhone: [{ value: '', disabled: this.loading }, [Validators.required, NgBrazilValidators.telefone]],
            indicationIdCity: ['', Validators.required],
            indicationCityAutoComplete: cityAutoCompleteControl,
            indicationAccept: ['', [Validators.required, Validators.requiredTrue]],
            indicatorCpf: [{ value: this.personalInfo?.cpf, disabled: this.loading }, [Validators.required, NgBrazilValidators.cpf]],
            tokenRecaptcha: ['', [Validators.required]]
        });
    }

    constructArrayDaily() {
        if (this.selectedPlanGo) {
            this.arrayDaily.push(4);
        }

        for (let index = 7; index <= 49; index += 2) {
            this.arrayDaily.push(index);
        }
    }

    private filterCities(filter: string): ICity[] {
        const filterValue = filter.toLowerCase();
        return this.arrayCities.filter(city => city.name.toLowerCase().includes(filterValue));
    }

    citySelected(evento: MatAutocompleteSelectedEvent) {
        const city = evento.option.value;

        this.registerFormGroup.patchValue({ idCity: city.id, cityAutoComplete: this.assembleCityName(city) });
        this.arrayCities = [];
    }

    assembleCityName(city: ICity) {
        return `${city.name} - ${city.uf.initials}`;
    }

    clearCityForm(evento: KeyboardEvent) {

        if (evento.code === 'Backspace') {
            this.registerFormGroup.patchValue({ idCity: '', cityAutoComplete: '' });
            this.arrayCities = [];
        } else if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown' || evento.key === 'ArrowRight' || evento.key === 'ArrowLeft') {
            return;
        } else if (this.registerFormGroup.value.cityAutoComplete?.length >= 2) {

            this.arrayCities = [];
            this.loadingCityFilter = true;
            const filter = this.registerFormGroup.value.cityAutoComplete + evento.key;

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

    testEmail() {
        const emailControl = this.registerRdFormGroup.get('email');

        if (emailControl?.valid) {
            this.doRegister = true;
        } else {
            this.doRegister = false;
        }
    }

    doLogin() {

        const cpfControlRegister = this.registerFormGroup.get('cpf');

        if (cpfControlRegister?.errors?.registered) {

            this.doRegister = false;
            this.loginFormGroup.patchValue({ username: cpfControlRegister.value });
            this.registerRdFormGroup.patchValue({ email: '' });
            this.registerRdFormGroup.reset();
        }
    }

    hasRegister() {

        const cpfControl = this.registerFormGroup.get('cpf');

        if (!cpfControl?.value || cpfControl?.invalid) return;

        const cpf = cpfControl.value;

        const subscriptionClient = this.checkoutService
            .isClient(cpf)
            .subscribe({
                next: (registered: boolean) => {
                    if (registered) {
                        cpfControl?.setErrors({ 'registered': true });
                    } else {
                        cpfControl?.setErrors(null);
                    }
                    this.registerFormGroup.updateValueAndValidity();
                },
                error: (error) => {
                    return error;
                }
            });

        this.checkoutCitySubscription.push(subscriptionClient);
    }

    hasIndication() {
        const cpfIndicatorControl = this.registerFormGroup.get('cpfIndicator');

        if (!cpfIndicatorControl?.value || cpfIndicatorControl?.invalid) return;

        const cpfIndicator = cpfIndicatorControl.value.replace(/(\.|\-)/g, '').toString();

        const subscriptionIndicated = this.checkoutService
            .isIndicator(cpfIndicator, this.personalInfo.email)
            .subscribe({
                next: (user: any) => {

                    if (user.indicated) {
                        cpfIndicatorControl?.setErrors(null);
                    } else {
                        cpfIndicatorControl?.setErrors({ 'noindicator': true });
                    }
                    this.registerFormGroup.updateValueAndValidity();

                },
                error: (error) => {
                    cpfIndicatorControl?.setErrors({ 'noindicator': true });
                    this.registerFormGroup.updateValueAndValidity();
                    return error;
                }
            });

        this.checkoutCitySubscription.push(subscriptionIndicated);
    }

    // userIndicated() {

    //     const emailControl = this.registerFormGroup.get('email');

    //     if (emailControl?.valid) {

    //         const email = emailControl.value;

    //         const subscriptionIndicated = this.checkoutService
    //             .isIndicated(email)
    //             .subscribe((indicated: boolean) => {
    //                 this.registerFormGroup.patchValue({ indicated: indicated });
    //                 this.personalInfo.indicated = indicated;
    //         });

    //         this.checkoutCitySubscription.push(subscriptionIndicated);
    //     }
    // }

    hasRestriction() {
        const cpfRegisterControl = this.registerFormGroup.get('cpf');

        if (!cpfRegisterControl?.value || cpfRegisterControl?.invalid) return;

        const cpf = cpfRegisterControl.value.replace(/(\.|\-)/g, '').toString();

        this.registerFormGroup.patchValue({ restriction: false });

        const subscriptionRestriction = this.checkoutService
            .hasRestriction(cpf)
            .subscribe({
                next: (restriction: boolean) => {
                    this.registerFormGroup.patchValue({ restriction: restriction });
                },
                error: (error) => {
                    cpfRegisterControl.setErrors({ notfound: true });
                }
            });

        this.checkoutCitySubscription.push(subscriptionRestriction);
    }

    onSubmitRegisterRD() {
        if (this.registerRdFormGroup.invalid) return;

        this.loading = true;
        this.spinner.show();

        this.storageService.setItem('user', this.base64Service.encode(JSON.stringify(this.registerRdFormGroup.value)));

        const personalInfo: PersonalInfo = Object.assign({}, this.registerRdFormGroup.value);
        personalInfo.address = Object.assign({}, this.personalInfo.address);

        // retirando mascaras e formatando objeto
        personalInfo.phone = personalInfo.phone.replace(/(\-|\(| )/g, '').toString();
        personalInfo.phone = personalInfo.phone.replace(')', '-').toString();

        const setupPlan = Object.assign({}, this.setupPlanFormGroup.value);

        const lead: IIndicacaoInfoPlanos = {
            eMail: personalInfo.email,
            nomeCompleto: personalInfo.fullName,
            telefone: personalInfo.phone,
            codigoRD: ERd.VendaSemAdesao,
            nomePlano: this.infoPlan.name,
            familia: setupPlan.plFamilia,
            qtdiarias: setupPlan.qtdDiarias,
        };

        const subscription = this.checkoutService
            .sendFormRDStationAndSiscoobInfoPlan(lead)
            .subscribe({
                next: (resp) => {
                    this.personalInfo = personalInfo;
                    this.spinner.hide();
                    this.stepper.next();
                    this.loading = false;
                },
                error: (error) => {
                    this.loading = false;
                    this.spinner.hide();

                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 6000,
                        timerProgressBar: true,
                        icon: 'error',
                        title: 'Erro',
                        html: `Você já é cadastrado. Por favor, realize o login!`,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                }
            });

        this.checkoutCitySubscription.push(subscription);

    }

    onSubmitRegister() {
        if (this.registerFormGroup.invalid) return;

        this.loading = true;
        this.spinner.show();

        const personalInfo: PersonalInfo = Object.assign({}, this.registerFormGroup.value);
        personalInfo.address = Object.assign({}, this.personalInfo.address);
        this.personalInfo.accept = personalInfo.accept;
        this.personalInfo.cpf = personalInfo.cpf;
        this.personalInfo.restriction = personalInfo.restriction;
        this.personalInfo.address = personalInfo.address;
        this.personalInfo.indicated = personalInfo.indicated;
        this.personalInfo.cpfIndicator = personalInfo.cpfIndicator;
        this.spinner.hide();
        this.stepper.next();
        this.loading = false;
    }

    onSubmitLogin() {
        if (this.loginFormGroup.invalid) return;

        this.loading = true;
        this.spinner.show();
        const credentials: ICredentialLogin = Object.assign({}, this.loginFormGroup.value);

        const subscription = this.checkoutService
            .login(credentials)
            .subscribe({
                next: (personalInfo: PersonalInfo) => {
                    if (personalInfo.restriction) {
                        const additionTermsControl = this.paymentFormGroup.get('additionTerms');

                        additionTermsControl?.addValidators([Validators.required, Validators.requiredTrue]);
                    }
                    this.personalInfo = personalInfo;
                    this.spinner.hide();
                    this.stepper.next();
                    this.stepper.next();
                    this.loading = false;
                },
                error: (error) => {
                    this.loading = false;
                    this.spinner.hide();
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'error',
                        title: 'Erro',
                        html: `${error.error}`,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                }
            });

        this.checkoutCitySubscription.push(subscription);
    }

    onSubmitPayment() {


        this.buyPlan = {
            personalInfo: this.personalInfo,
            setupPlan: Object.assign({}, this.setupPlanFormGroup.value),
            payment: Object.assign({}, this.paymentFormGroup.value),
        }

        this.finished = true;
        this.stepper.next();
        return

        if (this.paymentFormGroup.invalid) return;

        this.spinner.show();

        if (this.storageService.getItem('user')) {
            const buyPlan: IBuyPlan = {
                personalInfo: this.personalInfo,
                setupPlan: Object.assign({}, this.setupPlanFormGroup.value),
                payment: Object.assign({}, this.paymentFormGroup.value),
            }

            this.buyPlan = buyPlan;

            const subscription = this.checkoutService
                .buyPlan(buyPlan)
                .subscribe({
                    next: (resp: any) => {
                        this.finished = true;
                        this.stepper.next();
                        this.spinner.hide();
                    },
                    error: (erro: any) => {
                        this.errorFinished = true;
                        this.stepper.next();
                        this.spinner.hide();
                    }
                });

            this.checkoutCitySubscription.push(subscription);
        } else {
            const buyPlan: IBuyPlan = {
                personalInfo: this.personalInfo,
                setupPlan: Object.assign({}, this.setupPlanFormGroup.value),
                payment: Object.assign({}, this.paymentFormGroup.value),
            }

            this.buyPlan = buyPlan;

            const subscription = this.checkoutService
                .buyPlan(buyPlan)
                .subscribe({
                    next: (resp: any) => {
                        this.finished = true;
                        this.stepper.next();
                        this.spinner.hide();
                    },
                    error: (erro: any) => {
                        this.errorFinished = true;
                        this.stepper.next();
                        this.spinner.hide();
                    }
                });

            this.checkoutCitySubscription.push(subscription);
        }
    }

    public verifyFlag(): boolean {

        const flagCardPatterns = this.checkoutService.getFlagCardPatterns();
        const ccNumber = this.paymentFormGroup.get('ccNumber');

        for (let i = 0; i < flagCardPatterns.length; i++) {

            const regex = new RegExp(flagCardPatterns[i].pattern);

            if (regex.test(ccNumber?.value.toString())) {

                this.paymentFormGroup.patchValue({
                    ccImageFlag: flagCardPatterns[i].image,
                    ccMask: flagCardPatterns[i].mask,
                    ccFlag: flagCardPatterns[i].name
                });

                break;

            } else {

                this.paymentFormGroup.patchValue({ ccImageFlag: '' });

                switch (ccNumber?.value.toString().length) {
                    case 14:
                        this.paymentFormGroup.patchValue({ ccMask: this.customMasks.creditCard3 });
                        break;
                    case 15:
                        this.paymentFormGroup.patchValue({ ccMask: this.customMasks.creditCard2 });
                        break;
                    case 16:
                        this.paymentFormGroup.patchValue({ ccMask: this.customMasks.creditCard });
                        break;
                }
            }
        }
        return this.paymentFormGroup.controls?.ccImageFlag.value ? true : false;
    }

    somenteLetras(caracter: KeyboardEvent) {
        return Utils.somenteLetras(caracter.key);
    }

    somenteNumeros(caracter: KeyboardEvent) {
        return Utils.somenteNumeros(caracter.key);
    }

    formatPrice(price: number, part: number) {
        return Utils.formatPrice(price, part);
    }

    limitCharacters(limit: number, phrase: string, key: KeyboardEvent) {
        return Utils.limitCharacters(2, phrase, key);
    }

    onToggleCoupon() {
        this.couponToggle = !this.couponToggle;
    }

    onChooseThirdPartyCard(third: boolean) {

        this.thirdPartyCard = third;
        this.paymentFormGroup.patchValue({ third: third });

        if (this.thirdPartyCard) {
            this.loadFormThirdPayment();
        } else {
            this.loadFormPayment();
        }
    }

    validationCoupomDiscount() {

        const cupomDescontoControl = this.setupPlanFormGroup.get('cupomDesconto');

        if (cupomDescontoControl?.value.toString().length < 3) {
            cupomDescontoControl?.setErrors({ required: true });
            return;
        } else {
            cupomDescontoControl?.setErrors({ required: false });
        }

        const setupPlan = Object.assign({}, this.setupPlanFormGroup.value);

        const subscription = this.checkoutService
            .checkCoupom(setupPlan)
            .subscribe((values: Price) => {
                this.infoPlan.prices = values;

                if (cupomDescontoControl?.value && values.discount == 0) {
                    cupomDescontoControl?.setErrors({ couponInvalid: true });
                } else {
                    cupomDescontoControl?.setErrors({ couponInvalid: false });
                }

            }, (error) => {
                cupomDescontoControl?.setErrors({ couponInvalid: true });
            });

        this.checkoutCitySubscription.push(subscription);

    }

    goHome() {
        this.router.navigate(['/']);
    }

    tryAgainPayment() {
        this.finished = false;
        this.errorFinished = false;
        this.stepper.previous();
        this.paymentFormGroup.patchValue({
            ccNumber: '',
            ccName: '',
            ccExpirationDate: '',
            ccCVV: '',
            paymentDay: '',
        });
    }

    getAddress() {
        const zipCodeControl = this.registerFormGroup.get('address.zipCode');
        const idCity = this.registerFormGroup.get('address.idCity')?.value;

        if (!zipCodeControl?.value || zipCodeControl?.invalid || idCity) return;

        this.loading = true;
        this.spinner.show();

        // removendo mascaras
        const zipCode = zipCodeControl.value.replace(/(\.|-)/g, '');

        const subscription = this.checkoutService
            .getAddress(zipCode)
            .subscribe({
                next: (address: IAddress) => {

                    this.registerFormGroup.patchValue({
                        address: {
                            zipCode: address.zipCode,
                            state: address.state,
                            idCity: address.idCity,
                            cityAutoComplete: `${address.city} - ${address.state}`,
                            city: address.city,
                            street: address.street,
                            number: '',
                            complement: '',
                            district: address.district,
                        }
                    });

                    this.personalInfo.address = address;

                    this.personalInfo.address.cityAutoComplete = `${address.city} - ${address.state}`;

                    // desabilitando se vier os dados
                    this.personalInfo.address.cityAutoComplete ? this.registerFormGroup.get('address.cityAutoComplete')?.disable() : '';
                    this.personalInfo.address.city ? this.registerFormGroup.get('address.city')?.disable() : '';
                    this.personalInfo.address.street ? this.registerFormGroup.get('address.street')?.disable() : '';
                    this.personalInfo.address.district ? this.registerFormGroup.get('address.district')?.disable() : '';

                    this.registerFormGroup.get('address.zipCode')?.setErrors(null);
                    this.registerFormGroup.updateValueAndValidity();
                    this.spinner.hide();
                    this.loading = false;
                },
                error: (error) => {
                    this.registerFormGroup.get('address.zipCode')?.setErrors({ notfound: true });
                    this.registerFormGroup.updateValueAndValidity();
                    this.spinner.hide();
                    this.loading = false;
                }
            });

        this.checkoutCitySubscription.push(subscription);
    }

    getCepForm(evento: KeyboardEvent) {
        if (evento.code === 'Backspace') {
            this.registerFormGroup.patchValue({
                address: {
                    zipCode: '',
                    state: '',
                    idCity: '',
                    cityAutoComplete: '',
                    city: '',
                    street: '',
                    number: '',
                    complement: '',
                    district: '',
                }
            });
            this.arrayCities = [];
        } else {
            this.getAddress();
        }
    }

    haveIdCity() {
        return this.registerFormGroup.get('address.idCity')?.value ? true : false;
    }

    ngOnDestroy() {
        this.checkoutCitySubscription.forEach(subscription => subscription?.unsubscribe());
    }

}
