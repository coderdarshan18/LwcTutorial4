import { api, LightningElement } from 'lwc';

export default class FilePreviewAndDownloads extends LightningElement {
    @api recordId;
    fileData;
    openfileUpload(event){
        const file= event.target.file[0];
        var reader = new FileReader()
        reader.onload =()=>{
            var base64 = reader.result.split(',')[1];
            this.fileData = {
                'filename':file.name,
                'base64':base64,
                'recordId':this.recordId
            }
            console.log(this.fileData);
    
        }
        reader.readAsDataURL(file)
    }
    handleClick(){
        const {base64,filename,recordId} = this.fileData;
        uploadFile({base64,filename,recordId}).then(result=>{
            this.fileData=null;
            let title=`${filename} upload successfully!!`;
            this.toast(title);
        })
    }
    toast(title){
        const totastEvent = new ShowToastEvent({
            title,
            variant:"successs"
        })
        this.dispatchEvent(totastEvent)
    }

}