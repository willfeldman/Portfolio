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
| `<Button link="https://google.com" />`  | Used to create a button with a link or action | `link`* (string) - used to open a url on button click <br> `action`* (function) - used to indicate an action on button click <br> <b>either `link` or `action` is required for proper function</b> <br><hr> `text` (string) - text for button <br> `hidenWhenSmall` (boolean) - default is `false`, hides button text when screen is less than 425px if set to `true` <br> `icon` (img) - button icon image <br> `tooltip` (boolean) - default is `false`, shows `link` string on button hover if set to `true` <br> `customClass` (string) - any custom css classes to add to the button |
| `<Modal />` | Generates a responsive modal with given content | `children`* (html) - content inside the modal |
| `<Card />` | Generates a responsive, expandable card with given content | `expandable` (boolean) - default is true, shows an expand button in the top right <br> `children`* (html) - content inside the card <br> `action`* (function) - used to indicate an action on card click |
| `<ExperienceCard />` | Generates a card for a single experience |     |
| `<ExperienceView />` | Generates a view of a single experience | none |
| `<Experience />` |                | none |
| `<Header />` |                   | none |
| `<Homepage />` | Generates a `<Header />` and `<Experience />` | none |
| `<Error />`&#176; |                | none |
| `<Footer />`&#176; |                | none |
| `<Gallery />`&#176; |                | none |

*parameter is required

&#176;component is unfinished