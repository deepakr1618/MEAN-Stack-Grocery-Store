// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl:"http://localhost:3000/api",
  firebase:{
    apiKey: "AIzaSyBNHITSvWjaHfQ_N9E21htiHanMqusF_UI",
    authDomain: "angularweb-73dfb.firebaseapp.com",
    databaseURL: "https://angularweb-73dfb.firebaseio.com",
    projectId: "angularweb-73dfb",
    storageBucket: "angularweb-73dfb.appspot.com",
    messagingSenderId: "118982292401",
    appId: "1:118982292401:web:a7675a3e8ba6c33831c390",
    measurementId: "G-D0Q3WFEK40"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
