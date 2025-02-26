# auth-prectise

Please run "npx maildev --smtp 1025 --web 1080" to monitor the mails.

To start the  front-end server
    1. cd front-end
    2. npm install
    3. npm run dev

To start the back-end server:
    1. npm install
    2. npm run start:dev
    3. For getting the updated migration please tun "npm run migrations"
        If you've chaged the migrations of for run the migration run : npm run migrations
        If you want to generate new migration, please run 'npm run typeorm:generate-migration'
    3. For get the mail services Please run :
        npx maildev --smtp 1025 --web 1080
    You can see the mails as below:
        ![image](https://github.com/user-attachments/assets/94d4e92f-0355-4deb-b2ad-e3e037b4c490)
