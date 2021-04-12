# Hospitality Herald

## Contents  

[Description](#Description) 
 
[Development](#Development) 

[Instillation](#Instillation)

[Usage](#Usage)

[Contributors](#Contributors)

[License](#License)

[Contact](#Contact)



## Description
This repository contains a hospitality management system application created with react and augmented with mongodb. Its primary functions include management of guest reservations, managing rooms for guest stay, an activity schedular and a store for guest purchases. The application also features authentication for user login as well as a running tab for each guest that tracks financial transactions.

## Development
To begin, wireframes were created to map the user experience and convey aesthetics, mongodb documents, and backend functions. Next the mongodb schemas, components, dependencies, and overall React MVC design was created. Overall styling of pages and components was done utilizing Material UI. For the financial chart and activity scheduler, modified source code was used from devextreme reactive. Routing and API calls were built out and modified accordingly satisfied user requests of data creation/manipulation of database documents. Lastly deployment was achieved through heroku and the database was moved to the cloud using mongodb Atlas.

## Instillation
No installation required for this application. Simply click the heroku link below to begin.
https://hostelhedonism.herokuapp.com/

## Usage
After navigating to the webpage, the user will be prompted to sign it (default username: , password: ). From here a dashboard page will display convenient information extrapolated from, guests, rooms, and the store. 

To manage guests, the user clicks the reservation tab on the navbar. Once on the  page, the user will have the power to add guests and search for guests- from buttons beneath the table, and modify guests by clicking on the pencil icon on each guest row. Both adding a guest and modifying guests will prompt the user with a series of modal forms to input guest information. A ledger for a give guests tab can be displayed by clicking on the other row icon.

To manage rooms, after clicking the room tab on the nav bar. Rooms are added similar to guests and can be modified on clicking each room card.

To manage activities, after clicking the room tab on the nav bar, the user will click the plus button and fill out the forms thus creating the activities. To modify the activity which includes adding/removing guests simply click the activity from the calendar.

To manage the store, an item can be created clicking the add button. Modifications to items can be made from the pencil icon, and purchases can be made from clicking the other icon.










