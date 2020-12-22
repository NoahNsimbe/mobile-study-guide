// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiRoot: 'http://localhost:8100/api/',
  combination: 'get_combination/',
  recommendCombinations: 'recommend_combination/',
  course: 'get_course/',
  careers: 'careers/',
  programs: 'programs/',
  uceSubjects: 'uce_subjects/',
  uaceSubjects: 'uace_subjects/',
  programCheck: 'program_check/',
  programDetails: 'program_details/',
  articles: 'articles/',
  crateArticle: 'create_article/',
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig : {
    apiKey: "AIzaSyABd9_E7RhtwIHw9dbaaUKe5opBhvtqdeg",
    authDomain: "e-srs-001.firebaseapp.com",
    databaseURL: "https://e-srs-001.firebaseio.com",
    projectId: "e-srs-001",
    storageBucket: "e-srs-001.appspot.com",
    messagingSenderId: "1001943603071",
    appId: "1:1001943603071:web:5f389d2947c2f921e7ac4a",
    measurementId: "G-NR72HRQ1TG"
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
