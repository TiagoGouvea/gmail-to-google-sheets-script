// This Google Script searchs on your Gmail account, and store the results on a Google Sheet file
// Original: https://github.com/TiagoGouvea/gmail-to-google-sheets-script/

// HOW TO USE:
// 1 - Add your search query on the SEARCH_QUERY line. Do your search on gmail first, copy and paste the search terms here
// Samples: "label: hiring-process", "to: sales@mycompany.com", "from: james@james.com"
var SEARCH_QUERY = 'label: hiring-process';
// 2 - If you want each email address just once on sheet, set to true
var AVOID_REPEATED_ADDRESS = true;

// Do not modify the code below this line

// Escapes the label to work correctly in Gmail search
// Automatically adds {label:...} and escapes special characters
function buildGmailQuery(label) {
  // If already in full format "label:...", return as is
  if (label.toLowerCase().startsWith('label:')) {
    return label;
  }
  
  // If already has {}, return with prefix
  if (label.startsWith('{') && label.endsWith('}')) {
    return 'label:' + label;
  }
  
  // Characters that need escaping in Gmail
  var needsEscape = /[.\-,/\s()]/;
  
  // If has special characters, wrap with {}
  if (needsEscape.test(label)) {
    return 'label:{' + label + '}';
  }
  
  // Simple label, just add prefix
  return 'label:' + label;
}

// Main function, the one that you must select before run
function saveEmails() {
    console.log("Clearing sheet...");
    SpreadsheetApp.getActiveSheet().clear();  

    var gmailQuery = buildGmailQuery(SEARCH_QUERY);
    console.log(`Original query: "${SEARCH_QUERY}"`);
    console.log(`Gmail query: "${gmailQuery}"`);

    var start = 0;
    var max = 500;
    
    var threads = GmailApp.search(gmailQuery, start, max);
    if (threads!=null){
      console.log("Threads found 🎉");
      console.log("Paginating to collect email addresses...");
    } else {
      console.warn("No emails found within search criteria 😢");
      return;
    }

    // Add Sheet header collumns ✏️
    appendData(1, [["Date","From Address", "to Address"]]);
    
    var totalEmails = 0;
    var emails = [];
    var addresses = [];
    while (threads.length>0){
      for (var i in threads) {
          var thread=threads[i];
          var data = thread.getLastMessageDate();
          var msgs = threads[i].getMessages();
          for (var j in msgs) {
            var msg = msgs[j];

            // Values to get and store ✏️
            var data = msg.getDate();          
            var from = msg.getFrom();
            var to = msg.getTo();
            // var subject = msg.getSubject();
            var dataLine = [data,from,to];

            // Add values to array
            if (!AVOID_REPEATED_ADDRESS || (AVOID_REPEATED_ADDRESS && !addresses.includes(to))){
              emails.push(dataLine);
              addresses.push(to);
            }
          }
      }

      totalEmails = totalEmails + emails.length;

      // Add emails to sheed
      appendData(2, emails);

      if (threads.length == max){
          console.log("Reading next page...");
          start = start + max; 
          threads = GmailApp.search(gmailQuery, start, max);
      } else {
          console.log("Last page readed 🏁");
          break;
      }
    }

    console.info(totalEmails+" emails added to sheet 🎉");
}

// Add contents to sheet
function appendData(line, array2d) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(line, 1, array2d.length, array2d[0].length).setValues(array2d);
}


