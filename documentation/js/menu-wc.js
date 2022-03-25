'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">dotz documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c12f70a713f1a3fe47c0430714294591f02b4d9ae6c74d0ba6120233eb47bb3b0f0ba640816b1ef4d0201a78f6d877f0a0d4ef1c98672f6a484087ebdfbe4067"' : 'data-target="#xs-components-links-module-AppModule-c12f70a713f1a3fe47c0430714294591f02b4d9ae6c74d0ba6120233eb47bb3b0f0ba640816b1ef4d0201a78f6d877f0a0d4ef1c98672f6a484087ebdfbe4067"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c12f70a713f1a3fe47c0430714294591f02b4d9ae6c74d0ba6120233eb47bb3b0f0ba640816b1ef4d0201a78f6d877f0a0d4ef1c98672f6a484087ebdfbe4067"' :
                                            'id="xs-components-links-module-AppModule-c12f70a713f1a3fe47c0430714294591f02b4d9ae6c74d0ba6120233eb47bb3b0f0ba640816b1ef4d0201a78f6d877f0a0d4ef1c98672f6a484087ebdfbe4067"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BootstrapModule.html" data-type="entity-link" >BootstrapModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CheckoutModule.html" data-type="entity-link" >CheckoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' : 'data-target="#xs-components-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' :
                                            'id="xs-components-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' }>
                                            <li class="link">
                                                <a href="components/CheckoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoPlanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoPlanComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' : 'data-target="#xs-injectables-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' :
                                        'id="xs-injectables-links-module-CheckoutModule-fb9e5c5a26bf4ebdc882d3e770f52054d57f0f3c5db7ed224e0de6ad0e5144dd648c1bb5ace6c3dcff33110972650255f20035bf9c03a5d074d9e914f2a2ff37"' }>
                                        <li class="link">
                                            <a href="injectables/CheckoutService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckoutRoutingModule.html" data-type="entity-link" >CheckoutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' : 'data-target="#xs-components-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' :
                                            'id="xs-components-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' }>
                                            <li class="link">
                                                <a href="components/BenefitsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BenefitsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DestinationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DestinationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndicateMoreComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicateMoreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestimonialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestimonialComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' : 'data-target="#xs-injectables-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' :
                                        'id="xs-injectables-links-module-HomeModule-31791e6bcd36ca8431b42a806f7be7f1df8e35c20e593b14280e5033b7410a02e24a582d901d83a03d27df97fdb33fcc35ace160e0d4537bd8c7283067831f68"' }>
                                        <li class="link">
                                            <a href="injectables/HomeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PlansModule.html" data-type="entity-link" >PlansModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' : 'data-target="#xs-components-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' :
                                            'id="xs-components-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlansComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowPlanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowPlanComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' : 'data-target="#xs-injectables-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' :
                                        'id="xs-injectables-links-module-PlansModule-bc1feb970c37a557a23d28f74c1f5045813c6caf4b6b73cc2dca5b26ead80abcdb0bc58e2a5730224a46dd11d9c4dbc9dcc91e61cf9718aa746d7b759fbbafd6"' }>
                                        <li class="link">
                                            <a href="injectables/Base64Service.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Base64Service</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HomeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlansRoutingModule.html" data-type="entity-link" >PlansRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/FooterComponent-1.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-2.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-3.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-1.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-2.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-3.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomMasks.html" data-type="entity-link" >CustomMasks</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlagCard.html" data-type="entity-link" >FlagCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlagCardPattern.html" data-type="entity-link" >FlagCardPattern</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageHotel.html" data-type="entity-link" >ImageHotel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pattern.html" data-type="entity-link" >Pattern</a>
                            </li>
                            <li class="link">
                                <a href="classes/Plan.html" data-type="entity-link" >Plan</a>
                            </li>
                            <li class="link">
                                <a href="classes/Price.html" data-type="entity-link" >Price</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utils.html" data-type="entity-link" >Utils</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/Base64Service.html" data-type="entity-link" >Base64Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckoutService.html" data-type="entity-link" >CheckoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link" >HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlansService.html" data-type="entity-link" >PlansService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlansServiceMock.html" data-type="entity-link" >PlansServiceMock</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/LoadingInterceptor.html" data-type="entity-link" >LoadingInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IBuyPlan.html" data-type="entity-link" >IBuyPlan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICidade.html" data-type="entity-link" >ICidade</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICity.html" data-type="entity-link" >ICity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICredentialLogin.html" data-type="entity-link" >ICredentialLogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IImageHotel.html" data-type="entity-link" >IImageHotel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILink.html" data-type="entity-link" >ILink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILinkSubMenu.html" data-type="entity-link" >ILinkSubMenu</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPersonalInfo.html" data-type="entity-link" >IPersonalInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlan.html" data-type="entity-link" >IPlan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlanRequest.html" data-type="entity-link" >IPlanRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPrice.html" data-type="entity-link" >IPrice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRdStation.html" data-type="entity-link" >IRdStation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUF.html" data-type="entity-link" >IUF</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUFPt.html" data-type="entity-link" >IUFPt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Testimonial.html" data-type="entity-link" >Testimonial</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});