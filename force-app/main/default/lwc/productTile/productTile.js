import { LightningElement,api,track } from 'lwc';

export default class ProductTile extends LightningElement {
    @api draggable;
    _product;
    @track pictureUrl;
    @track name;
    @track msrp;

    @api
    get product(){
        return this._product;
    
    }
    set product(value){
        this._product = value;
        this.pictureUrl = value.Picture_URL__C;
        this.name = value.Name;
        this.msrp = value.MSRP__c;

    }
    handleClick(){
        const selectedEvent = new CustomEvent('selected',{
            detail : this.product.Id
        });
        this.dispatchEvent(selectedEvent);

    }
    handleDragStart(event){
        event.dataTransfer.setData('product',JSON.stringify(this.product));
    }
}