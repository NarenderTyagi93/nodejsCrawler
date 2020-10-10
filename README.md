# Medium Crawler

Recursively crawls popular blogging website `https://medium.com` and harvests all possible hyperlinks that belong to medium.com and stores them in MongoDB.

## Pre-requisites

- Node.js
- npm
- MongoDB

## Setup

- Clone this repository with `git clone https://github.com/NarenderTyagi93/nodejsCrawler`.
- Move into the directory the program is in with `cd nodejsCrawler`
- Install node modules with `npm install/yarn`.
- Initiate the required environment variables. This can be done in two ways.
  - Dump a environment.env file into the root directory of the repository with all environment variables you need.
    This will be auto included in the project.
  - Simply export the variables in any other way (source a bash file/add it to your .bashrc/add them one by one in the terminal etc.)
- Required env variables are as follows :

## Running the program

- The program can be run with `npm start/ yarn start`.
- If the MAX_URLS environment variable is set to -1 then the crawler will run infinitely
  (or until your heap space runs out atleast) and will need to be stopped manually.
- If MAX_CONCURRENT_REQUESTS is too high then you'll get blocked by the IP banner and start receiving 429 responses. I'd advise keeping this to 10 or lower.
- The MAX_URLS variable might be exceeded slightly due to the bundled nature of the DB inserts. (DB inserts are batched and multiple are processed at the same time). If you have a hard limit on the number of URLs you can store in the DB, you might want to lower the number a little in the MAX_URLS field.

