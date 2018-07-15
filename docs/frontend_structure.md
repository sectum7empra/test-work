[back](../readme.md)

#Frontend

Frontend is developed using React, Redux and few libraries that got used in process and were basis for functionality of our app.
The most important of them are:
 - admin-on-rest
 - material-ui and material-ui-next
 - @devexpress/dx-react-grid
 - @devexpress/dx-react-grid-material-ui
 
It would be easy to find documentation about them. We have to change and start some parts of them using edited copies. You could learn more about it in the File structure.

### File structure. 
##Styles
Main scss file settled down at
`resources/assets/sass/app.scss`.
## Scripts
Main js file settled down at
`resources/assets/js/app.js`.
Start from js:

    |_ app.js
    |_ botstrap.js
    |_src
        |_App.js
        |_authClient.js
        |_Layout.js
        |_Menu.js
        |_restClient.js
        |_routes.js
        |_actions/ (directory with custom Redux actions)
        |_advanse/ (advanced capabilities)
        |_components/ (Layouts, Views, view's parts)
            |_editable_grid (configured layout of table what used 
                for editing gravestones, and parts of this table like chekboxes, 
                filters, dependent inputs etc...)
        |_configuration/ 
            |_Configuration.js(configuration view)
        |_form/ 
            |_CustomLogin.js(login form)
        |_i18n/ (localization files)
        |_redefined_components/ (there is libraries and parts of modules, that was changed 
            to achive expectations,  versions of original modules listed strictly in package.json)
        |_reducers/ (custom reducers for Redux)
        |_resources/ (each file inside this directory is separate entity of REST architecture 
            and contains views and logic to output)