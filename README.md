# auth-prectise

Please run "npx maildev --smtp 1025 --web 1080" to monitor the mails.

To start the  front-end server
    1. cd front-end
    2. npm install
    3. npm run dev

To start the back-end server:
    1. npm install
    2. npm run start:dev
        If you've chaged the migrations of for run the migration run : npm run migrations
    3. For get the mail services Please run :
        npx maildev --smtp 1025 --web 1080