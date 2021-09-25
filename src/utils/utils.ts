import { Router } from "@angular/router"

export class Utils{
    constructor(private router:Router){}
    public static isLogged(){
        if (!localStorage.getItem("isLogged")) console.log('sii')
    }
    
}


