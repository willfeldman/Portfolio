# Personal Portfolio (React)
A portfolio website built in React containing experiences, accomplishments, and contact information.

To install dependencies and run locally:
```
npm install
npm start
```

#### Components with available parameters
| Component   | Description  | Parameters |
| ----------- | -----------  | -----------|
| `<Button link="https://google.com" />`  | Used to create a button with a link or action | `link`* (string) - used to open a url on button click <br> `action`* (function) - used to indicate an action on button click <br> <mark>either `link` or `action` is required for proper function</mark> <br><br> `text` (string) - text for button <br> `icon` (img) - button icon image <br> `tooltip` (boolean) - default is `false`, shows `link` string on button hover if set to `true` <br> `customClass` (string) - any custom css classes to add to the button

*parameter is required