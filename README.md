# URL Shortener

The url shortener is a simple Frontend based only application that uses Firestore as a backend database. The frontend is written in React/Javascript.

The shortening works by assigning each new url an incrementing integer. In order to get the latest id, there is an extra document that saves the total number of URL’s that have already been shortened. This integer is then encoded into base62. If the length of the encoded url is less than 6, it is padded with zeros in the beginning. Using base62 as an encoding, gives us 62^6 (56800235584) possible urls.

A url can only be shortened if it contains `https://` or `http://` as a prefix.
Urls from `url.moritz.dev` can not be shortened.

## Running it locally

Running it locally only works if there is a `firebase.js` file under /src that looks like that:

```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: <apiKey>,
  authDomain: <authDomain>,
  projectId: <projectId>,
  storageBucket: <storageBucket>,
  messagingSenderId: <messagingSenderId>,
  appId: <appId>,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

- install node (>=14.7.0) and npm
- `npm install` in root directoy
- `npm run start` to run local server


## Shortcomings of my current approach

### Database Permissions

Since the application is completely frontend based and there is no validation in firebase for any user input, it is theoretically possible to save any document with any field which would basically break the application.

This can partly be prevented by using firebase security rules and validating certain properties such as the fields in a document or the length of the encoded url. Although this seems like the easiest option it still doesn‘t prevent someone from entering a 6 character url that wasn‘t created by the `shortenUrl` function.

The best option would be to create the shortened url in backend, ideally in a firebase cloud function, that way we can make sure to prevent invalid documents/urls.

### URL Crawling

Another issue that arises due to the nature of the approach is that a user can theoretically crawl all encoded url‘s since the encoding simply works by incrementing an integer and encoding it to base62.
This option was choosen due to simplicity reasons because it does not cause any collision as for example a hash.

### Scalability
The urls
Since the short urls are supposed to be idempotent, scalability can 