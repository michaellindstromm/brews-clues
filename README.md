# Brews Clues

Brews Clues is an app built to help beer consumers make choices about which beer they should drink next. The app was built using AngularJS, Ionic1, and Firebase. Upon first use, users register and then rate a preselected list of beers in order to create a baseline rating of different types of beers. All beer information is obtained from the BreweryDB API. Using a custom kNN (k Nearest Neighbors) formula, users scan a QR Code which contains a menu of beers. After scanning, beers on the menu are compared to beers users have already rated, and information is passed through the formula to give the users five beer suggestions from the menu.

---

## Getting Started

To access locally simply clone down the repo to your machine.

 ```
 git clone https://github.com/michaellindstromm/brews-clues.git
 ```

### Installing

Go to root directory of the app.
```
cd [wherever you put the app]
```

Bundle install the necessary gems from the Gemfile.
```
npm install
```

```
cd www/
```

Start up a local server and you are good to go!

**Note: This app is intended to run natively. Using the barcode scanner will only work when the app is run natively. For native access email me at:**
michaellindstr@gmail.com

---

## Built With

* [Ionic](https://ionicframework.com/)
* [AngularJS](https://angularjs.org/)
* [Firebase](https://firebase.google.com/)


## Live

**For native access email me at:**
michaellindstr@gmail.com