// window.indexedDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var db;

// window.IDB* objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// test indexedDB
if (!window.indexedDB) {
    alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

var request = window.indexedDB.open("TuxTest");

request.onerror = function(event) {
  alert("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  db = event.target.result;
};
request.onupgradeneeded = function(event) { 
   // Update object stores and indices .... 
};