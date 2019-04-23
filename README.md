# Liri-Node-App

### **What is LIRI?**

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Getting Started

### **Requirements**

* node.js
* git bash (*or some other terminal capable of running node applications*)
* text editor (*for adding API keys in .env file*)

### **Installation**

1. Clone the repository:

    `git clone https://github.com/Bryceacampbell/liri-node-app.git`

2.  Open application in directory and install the dependencies:

    `npm install`

3. Create a file named .env and insert your API keys like below:

    ```SPOTIFY_ID=<*YOUR-SPOTIFY-ID*>  
    SPOTIFY_SECRET=<*YOUR-SPOTIFY-SECRET*>  
    OMBD_API_KEY=<*YOUR-OMDB-API-KEY*>  
    BINT_API_KEY=<*YOUR-BANDS-IN-TOWN-API-KEY*>
    ```

## Running The Application

NOTE : Confirm you are in the correct directory prior to running these commands
    
### **Set up**

`node liri.js` `<command>` `<string>`

### **Commands**

### 1. spotify-this-song `string`

    The `spotify-this` command utilizes the Spotify-API and takes in a user input to search for songs.

### 2. movie-this `string`

    The `movie-this` command uses the OMDB-API and takes in a user input to search a movie title.

### 3. concert-this `string`

    The `concert-this` command uses




