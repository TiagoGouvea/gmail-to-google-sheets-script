# Gmail to Google Sheet Script

This Google Script can do any search on your Gmail account, and store the results on a sheet file.

The search will be made on your gmail account, from your Google Script. All data will be changed inside your account, with no external access to it.

## How to use

* Create a new Google Sheet
* Access menu Tools > Script Editor
* Copy the content from [gmailt-to-sheets.gs](gmailt-to-sheets.gs) to editor, replacing the sample code there
* Replace the value on `SEARCH_QUERY` to your real query (Do your search on gmail first, copy and paste the search terms there) 
* Select `saveEmails` on menu (near "run" and "debug" buttons)
* Click on "Run" button
* It will ask for authorization at first run, proceed accepting it (it's your Gmail account authorizing your Google Script account)
* After run, the results will be applied to you sheet

## Changing fields

If you want to save different message attributes, take a look at [gmail-message class](https://developers.google.com/apps-script/reference/gmail/gmail-message) and chage your script file the code below comments with a pencil (✏️)
