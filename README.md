# BetterNote

* [Main site][Main]

[Main]: http://www.betternote.io

## Description
A note taking/organization app inspired by the website Evernote. Users can write
notes, upload photos, tag their notes, insert them into custom notebooks, and search over their notebooks and tags. They can also log in with twitter and search over the title and body of all notes that they write.


## How to use:
- either create a username and password, or sign in with your twitter account
- create a notebook
- start making notes!
  - users can upload images, tag their notes, and organize them into different notebooks

## Technologies
Javascript, ruby on rails, Backbone, App Academy's composite view backbone
extension, JQuery, HTML5, CSS3, the Twitter api (omni-auth), pg search (ruby gem)

## Implementation Details:
### Composite Views
- only necessary segments of the page re-render after given events, minimizing the amount of work the browser has to perform (setting up event listeners, removing Views, re-rendering html, etc.) giving the application a snappy feel

### Data fetching
- Note data is fetched on page load, allowing for nearly instant rendering of notes on the page

### Side Pane Sorting
- notes are sorted by date updated at
- tags and notebooks are sorted alphabetically
- side pane is resorted given any change to models of its collection
  - the side pane content view for that model is removed from the page, and then re-inserted in the appropriate place

### Searching
- Tag and Notebook titles can be searched over client-side
- Note titles and bodies can be searched over server-side
  - a custom SQL join is used with active-record and pg search to match only those notes belonging to the current user

### Authentication
- Users are allowed to sign up for the site either by inputting a username and password or signing up through twitter
  - twitter sign in/sign up implemented using the omni-auth gem

### Bonus Features (TBD)
- [x] real-time ajax updates during note edit
- [x] scroll within sectons of page
- [ ] drag and drop note linking
- [ ] fancy note forms.
- [ ] Link notebooks to notes (polymorphic)
- [ ] Easy hyperlinking to other websites
- [ ] Back and forward buttons on notes
- [ ] Regexp email validation
- [ ] email confirmation via actionMailer
- [ ] filter out notes index by multiple tags
- [ ] Edit Tags
- [ ] delete account
