// This Google Script searchs on your Gmail account, and store the results on a Google Sheet file
// Original: https://github.com/TiagoGouvea/gmail-to-google-sheets-script/

// Add here your search query. Do your search on gmail first, copy and paste the search terms here
// Samples: "label: hiring-process", "to: sales@mycompany.com"
var SEARCH_QUERY = 'label: hiring-process';

// Main function, the one that you must select before run
function saveEmails() {
    console.log("Clearing sheet...");
    SpreadsheetApp.getActiveSheet().clear();  
  
    console.log(`Searching for: "${SEARCH_QUERY}"`);
    var start = 0;
    var max = 500;
    
    var threads = GmailApp.search(SEARCH_QUERY, start, max);
    if (threads!=null){
      console.log("Threads found 🎉");
      console.log("Paginating to collect email addresses...");
    } else {
      console.warn("No emails found within search criteria 😢");
      return;
    }
    
    var emails = [];
    while (threads.length>0){
      for (var i in threads) {
          var thread=threads[i];
          var data = thread.getLastMessageDate();
          var msgs = threads[i].getMessages();
          for (var j in msgs) {
            var msg = msgs[j];

            // Values to get and store
            var data = msg.getDate();          
            var from = msg.getFrom();
            var to = msg.getTo();

            // Add values to array
            emails.push([data,from,to]);
          }
      }
      if (threads.length == max){
          console.log("Getting next page...");
      } else {
          console.log("Last page readed 🏁");
      }
      start = start + max; 
      threads = GmailApp.search(SEARCH_QUERY, start, max);
    }

    // Add Sheet header collumns
    appendData([["Date","From Address", "to Address"]]);
    // Add emails to sheed
    appendData(emails);

    console.info(emails.length+" emails added to sheet 🎉");
}

// Add contents to sheet
function appendData(array2d) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(sheet.getLastRow() + 1, 1, array2d.length, array2d[0].length).setValues(array2d);
}

