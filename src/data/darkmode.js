// sets mode to either 'night' or 'day' depending on the user's system preferences
const mode = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');  

// changes the background color of 'html' element based on mode
document.body.style.backgroundColor = (mode === 'night' ? '#191919' : '#f5f5f5');

// change ios status bar color depending on mode
document.querySelector('meta[name="theme-color"]').setAttribute('content', (mode === 'night' ? '#191919' : '#f5f5f5'));

export { mode };
