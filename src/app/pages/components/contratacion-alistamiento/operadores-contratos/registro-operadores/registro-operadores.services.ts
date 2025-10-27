export class fichaContratoOperadores {
    private fichaContrato: boolean;
    private itemFichaContrato: any;

    constructor(){}

    set_fichaContrato(fichaContrato: boolean) {
        this.fichaContrato = fichaContrato;
    }

    set_itemFichaContrato(itemFichaContrato: any) {
        this.itemFichaContrato = itemFichaContrato;
    }

    get_fichaContrato(fichaContrato: boolean) {
        return this.fichaContrato;
    }

    get_itemFichaContrato(itemFichaContrato: any) {
        return this.itemFichaContrato = itemFichaContrato;
    }    
}