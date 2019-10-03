# ContactManager

## SQL connection string

Find appsettings.json in ContactManager.API project. Change the Server, User ID and password.

## iisExpress applicationUrl

Find launchSettings.json in ContactManager.API project Properties folder. The iisExpress applicationUrl is set to http://localhost:5000 which is the web API's base url.

## urlAddress in environment.ts

Find environment.ts in ContactManager.Web\angularApp\src\environments folder. The urlAddress: 'http://localhost:5000' is where the Anglar app making API calls to.

## log file path

Find nlog.config in ContactManager.API project. Change the 2 file pathes.