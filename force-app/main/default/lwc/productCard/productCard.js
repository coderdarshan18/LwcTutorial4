import { LightningElement,wire } from 'lwc';
import {CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin} from 'lightning/navigation';

import {getRecord} from 'lightning/uiRecordApi';

import { registerListener, unregisterAllListeners } from 'c/pubsub';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import MSRP_FIELD from '@salesforce/schema/Product__c.MSRP__c';
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_URL__c';

const fields = [
                NAME_FIELD,LEVEL_FIELD,CATEGORY_FIELD
               , MATERIAL_FIELD,MSRP_FIELD,PICTURE_URL_FIELD
];

export default class ProductCard extends LightningElement {
    recordId;

    @wire(CurrentPageReference) pageRef;
    @wire(getRecord,{recordId : '$recordId',fields}) product;

    connectedCallback(){
        registerListener('productSelected',this.handleProductSelected,this);

    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleProductSelected(productId){
        this.recordId = productId;
    }
    handleNavigateToRecord(){
        this[NavigationMixin.navigate]({
            type : 'standard__recordPage',
            attribute:{
                recordId :this.recordId,
                objectApiName : PRODUCT_OBJECT.objectApiName,
                actionName:'view'

            }
        });
    }
get noData(){
    return !this.product.error && !this.product.data;
}
}