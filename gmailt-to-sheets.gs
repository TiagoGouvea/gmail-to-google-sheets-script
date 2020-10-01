// Add here your search query. Do your search on gmail first, copy and paste the search terms here
// Samples: "label: hiring-process", "to: sales@mycompany.com"
var SEARCH_QUERY = 'label: hiring-process';

// Main function, the one that you must select before run
function saveEmails() {
    var array2d = getEmails_(SEARCH_QUERY);
    if (array2d) {
        appendData_(SpreadsheetApp.getActiveSheet(), array2d);
    }
}

// Will get the emails and return a list
function getEmails_(q) {
    var emails = [];
    // Sheet header collumns
    emails.push(["Date","From Address", "to Address"]);

    var threads = GmailApp.search(q);

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
            emails.push([data,from,to]);
        }
    }
    return emails;
}

// Will clear the sheet and add all emails there
function appendData_(sheet, array2d) {
    sheet.clear();
    sheet.getRange(sheet.getLastRow() + 1, 1, array2d.length, array2d[0].length).setValues(array2d);
}

