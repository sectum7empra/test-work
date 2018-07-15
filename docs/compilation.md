[back](../readme.md)

##Compilation
After you finish setup of backend, you also need to setup and compile your React frontend app.

First of all, you need to install javascript dependencies using command `npm -i` and to setup server address in next files:

`resources/assets/js/app.js`

`resources/assets/js/src/restClient.js`

`resources/assets/js/src/App.js`

After you edited these files, you can run one of the available commands to compile react application: 
1. Default command from laravel-mix(app will not support older browsers and ie11)
   
    `npm run dev` - developmment compilation with extended sourcemaps and messages in console
    
    `npm run watch` - developmment compilation with extended sourcemaps and messages in console and watching files
    
    `npm run prod` - production mode, you will receive fast with important messages only and with smallest size of compiled file
2. Also there are available webpack commands which allow to support older browsers:
    
    `npm run wp-watch` - development compilation with extended sourcemaps and messages in console and watching files
    
    `npm run wp-prod` - production mode, you will receive fast with important messages only and with smallest size of compiled file
After compilation is ready you'll be able to use yours app