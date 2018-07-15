[back](../readme.md)

##Installation
You will be able to upload app via ftp connection or just pull from git repository.
After uploading of the files, configure your web server so the file public/index.php was called for any request.
Copy .env.example to .env in the project root, setup app parameters, database connection and run:

`composer install`

After installation of php dependencies, you will be able to run migrations or import your database.

_For more safely using of the app, use ssl certificates(the best way is to install Certbot to automatize getting it from Let'sEncrypt for free) to be able to use https and encrypt your traffic_