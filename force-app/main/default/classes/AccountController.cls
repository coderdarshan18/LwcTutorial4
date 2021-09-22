public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountList(){
      return [Select id,Name,phone From Account Order by createddate desc Limit 5];
  } 
}
