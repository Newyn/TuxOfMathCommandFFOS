// window.indexedDB
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var db;

// window.IDB* objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// test indexedDB
if (!window.indexedDB) {
    alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

function errorOpen(event) {
    window.alert("Erreur ouverture !");
}

function saveScore(score, wave) {

    var request = indexedDB.open("TuxTest", 2);
	
    request.onerror = function(event) {
	  alert("Why didn't you allow my web app to use IndexedDB?!");
	};
	
	request.onupgradeneeded = function(event) { 
	   var db = event.target.result;
	   var store = db.createObjectStore("save",
			{keyPath: "score"});
	};

    request.onsuccess = function(event) {
	
		var db = event.target.result;
			
		var store = db.transaction(["save"], "readwrite").objectStore("save");
		var data = {score:score, wave:wave};
		
		console.log("Attempting to write", data);
		
		var req = store.put(data);
		
        req.onerror = function onerror(event) {
          console.log("Writing failed", event);
        };
        req.onsuccess = function onsuccess() {
          console.log("Write succeeded");
        };
		
	};
}

function readAllScores(){

    var request = indexedDB.open("TuxTest", 2);
	
    request.onerror = function(event) {
	  alert("Why didn't you allow my web app to use IndexedDB?!");
	};
	
	request.onupgradeneeded = function(event) { 
	   var db = event.target.result;
	   var store = db.createObjectStore("save",
			{keyPath: "score"});
	};

    request.onsuccess = function(event) {
	
		var scores = [];
		document.getElementById("listTabScore").innerHTML = "";
		
		var db = event.target.result; 
		
		var store = db.transaction(["save"], "readonly").objectStore("save");

		store.openCursor().onsuccess = function (event) {

		var cursor = event.target.result;
			
		
			
			if (cursor) {

				var tmp = store.get(cursor.key);

				tmp.onsuccess = function (e) {
					scores.push(tmp.result.score+" - Wave "+tmp.result.wave);
					console.log(tmp.result);
					cursor.continue();
				}
				
				
			}
			else {
				scores.reverse();
					
				for(var i=0;i<scores.length;i++) {		
					document.getElementById("listTabScore").innerHTML += "<li>"+scores[i]+"</li>";
				}
			}
		}
		
		
	}
}
