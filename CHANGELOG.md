[v.1.0-19.02.2023]:
=======================================================================================================================================================================
- New web app design;
- Added "blank search input" block;
- Added "not found" block;
- All images (files .png) are changed to links;
- Code refactoring;
- Added new information blocks: humidity, country,
wind speed;

- Added "clear search input" button;
- Added new information blocks: visibility, cloudiness, air quality
and pressure;
- New "saved locations" block design;
- New web app logo design;
- Code refactoring;
- Added "Celsium" and "Fahrenheit" buttons (To switch between these 
temperature types, now non functional);
- Disabled selection to all images and practically all texts;
- Removed country flag icons from "weather main" block;

- Fixed "description" info displaying;
- Added functionality to "clear search input" button;
- Added date and time blocks to web app;

- Added country flag icon to "weather main" block;
- Added "save location" button;
- Added scaling animations to all buttons;
- Added "time" and "day of the week" info to "weather main" block;
- Added "saved locations count" text;
- Added Great Britain (GB) and France (FR) flags;
- Added "delete saved location" button;

[v.1.1-24.02.2023]:
=======================================================================================================================================================================
- Removed all flags images from project;
- Integrated "FlagsAPI" api to get any country flag from 2-alpha country code;
- A check for an identical location in the list "Saved locations" was added 
to exclude the possibility of duplication of these values;

- Fixed issue with saving location (The location was saved with 
the value from the input and not with the value of the location 
that the user is looking for);
- Integrated "Moment.js" library (Date and time);
- Added hover animations to "save location" items;
- Added hover animations to "highlight" item;

- Integrated "String.js" library (Strings);
- Added functional to "Celsium" and "Fahrenheit" buttons:
    Now users can switch temperature type between celsium and fahrenheit types;

- Added "Copy" buttons to all "weather highlight" blocks:
    Now users can copy any weather detail to clipboard and share this information to each other;
- Added saving system (LocalStorage):
    Now users can save and load next information: Temperature type (Celsium or Fahrenheit) and
    all saved locations;

[v.1.2-03.02.2023]:
=======================================================================================================================================================================
- Integrated "JQuery" library;
- Fixed issues with saving and removing location;

- Redesigned "header" block;
- Redesigned all "header" buttons;
- Redesigned all "highlight" items;

- Added "search history" button;
- Added "search history" block;
- Added search history system to weather app:
    Users can see last 10 locations which they searched;
    Users can search faster any location which they searched earlier;
    Users can clear all search history;

- Added "favorite location" block;
- Added "favorite location" feature:
    Now users can set any one location as favorite and get main and useful information within a second;

- Added searched city to title "Today's Highlights" to display which location was searched right now;
- Redesigned "search input" block;
- Redesigned "saved location" buttons;

[v.1.3-08.02.2023]:
=======================================================================================================================================================================
- Added notifications system;
- Added notification popups (Three types: Success, warning and error);

    Stuxlut Premium :
    *Max saved locations (12, base: 6)
    *Max history locations (30, base: 10)
    *Air pollution data
    *Unlimited search locations per day (base: 10)