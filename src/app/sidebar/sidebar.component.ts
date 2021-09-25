import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {LoginService}  from '../service/login/login.service'
declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    //{
    //    path: '',
    //    title: 'Aplicaciones',
    //    type: 'sub',
    //    icontype: 'apps',
    //    collapse: 'apps',
    //    children: [
    //        {
    //            path: 'categoria',
    //            title: 'Categoria',
    //            type: 'link',
    //            ab: 'C'
    //        },
    //    ]
    //},
    {
        path: '',
        title: 'Aplicaciones',
        type: 'sub',
        icontype: 'apps',
        collapse: 'apps',
        children: [
            { path: 'paciente', title: 'Paciente', type: 'link', ab:'P'},
            { path: 'categoria', title: 'Categorias', type: 'link', ab:'C'},
            { path: 'subcategoria', title: 'Sub-Categorias', type: 'link', ab:'SC'},
            { path: 'ficha_clinica', title: 'Ficha Clínica', type: 'link', ab:'FC'},
            { path: 'horario', title: 'Paciente', type: 'link', ab:'P'},
            { path: 'horario', title: 'Horario de Atencion', type: 'link', ab:'H'},
            { path: 'horarioex', title: 'Horario Excepcional', type: 'link', ab:'H'},
        {
            path: 'servicio',
            title: 'Servicio',
            type: 'link',
            ab:'S'
        }
        ]
    },{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    },
    {
        path: '/presentacionProducto',
        title: 'Presentacion Producto',
        type: 'link',
        icontype: 'timeline'
    },
    {
        path: '/reserva',
        title: 'Reserva',
        type: 'link',
        icontype: 'timeline'
    },
    {
        path: '',
        title: 'Cerrar Sesion',
        type: 'logOut',
        icontype: 'timeline'
    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    constructor(private loginService:LoginService){}
    ngOnInit() {
        this.loginService.isLogged()
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    logOut():void{
        console.log("Hago logOut")
        localStorage.clear()
        this.ngOnInit()
    }
}
