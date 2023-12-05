# Gmail to Google Sheet Script

This Google Script can do any search on your Gmail account, and store the results on a sheet file.

The search will be made on your gmail account, from your Google Script. All data will be changed inside your account, with no external access to it.

## How to use

1. Create a new Google Sheet
1. Access menu Extension > App Script
1. Copy the content from [gmailt-to-sheets.gs](gmailt-to-sheets.gs) to editor, replacing the sample code there
1. Replace the value on `SEARCH_QUERY` to your real query (Do your search on gmail first, copy and paste the search terms there)
1. Click on "Save" button (the flop disk)
1. Select `saveEmails` on menu (after "run" and "debug" buttons)
1. Click on "Run" button
1. It will ask for authorization at first run, proceed to accepting it (it's your Gmail account authorizing your Google Script account)
1. After run, the results will be applied to you sheet

## Changing fields

If you want to save different message attributes, take a look at [gmail-message class](https://developers.google.com/apps-script/reference/gmail/gmail-message) and chage your script file the code below comments with a pencil (✏️)
