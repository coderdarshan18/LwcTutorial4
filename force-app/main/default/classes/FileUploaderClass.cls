public with sharing class FileUploaderClass {
    
    @AuraEnabled
    public static String uploadFile(String base64,String filename,String recordId){
        ContentVersion cv = createContentVersion(base64,filename);
        ContentDocumentLink cd1 = createContentLink(cv.Id,recordId);
        if(cv == null || cd1==null){
            return null;
        }
        return cd1.Id
    }
    private static ContentVersion createContentVersion(String base64,String filename){
        ContentVersion cv = new ContentVersion();
        cv.versionData =EncodingUtil.base64Decode(base64);
        cv.Title =filename;
        cv.PathOnClient = filename;
        try {
            insert cv;
            return cv;
        } catch (DMLException e) {
            System.debug(e)
            return null;
        }
    }

    private static ContentDocumentLink createContentLink(String contentVersionId,String recordId){
        if(contentVersionId == null || recordId == null){ return null;}
        ContentDocumentLink cd1 = new ContentDocumentLink();
        cd1.ContentDocumenId =[
            SELECT ContentDocumenId from ContentVersion where Id =: contentVersionId
        ].ContentDocumenId;

        cd1.LinkedEntityId = recordId;

        cd1.ShareType='V';
        try {
            insert cd1;
            return cd1;
        } catch (DMLException e) {
                System.debug(e)
                return null;
        }
    }

}
