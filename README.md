# BetterNote

* [Main site][Main]

[Main]: http://www.betternote.io

## Description
A note taking/organization app inspired by the website Evernote. Users can write
notes, upload photos, tag their notes, insert them into custom notebooks, and search over their notebooks and tags. They can also log in with twitter and search over the title and body of all notes that they write.

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication Heroku Deployment (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to sign in and sign up. The most important part of
this phase will be pushing the app to Heroku and ensuring that everything works
before moving on to phase 2.

[Details][phase-one]

### Phase 2: Notebooks via sidebar view (~1 day)
I plan to compose my root view and my primary sub-view in this phase. First
I will add API routes to serve notebook data as JSON, as well as CRUD controller
actions for notes, then I will create a Backbone Model, View, Collection, and
router for my notebooks. At the end of this phase, users will be able to create
and view (empty) notebooks, all inside a single Backbone App.

[Details][phase-two]

### Phase 3: Note CRUD, Tags, Notes Index  (~2-3 days)
On the back end, I will compose my api routes for sending down JSON objects
consisting of titles and ids for my tags and notes, as well as content for my notes. I will also create an api route
that sends down a list of all the notes specific to a notebook and tag, and one for sending down all of the notes.

On the front end, I will first create a view for editing/creating/viewing notes. I will then create a sidebar composite view, and collection/model
for notes and tags. I will also create an association between notebooks and notes and
vice versa. Last, I will create a sidebar-subview that display an index of notes corresponding to notebooks and one that groups by tags.

A difficult component here was to make sure that my side pane, while displaying the title of whatever is being modified in the primary View, updates the order/title in which that item is displayed.

[Details][phase-three]

### Phase 4: Searching for Notes, Notebooks, and Tags (~1 day)
The search will essentially thin down the indexed tags, notebooks, or notes
in the sidebar. I will add a search bar on top of the view, then I will add
an event handler for key input to the browser which matches the titles against
search bar input

The difficult piece of everything here was keeping each list item sorted. Since
each list item was implemented as a composite view, I had to actually remove
notebooks and tags while matching the text of each title to the input in the
search bar. To re-insert it into the correct place, I actually had to iterate
over my collection of all rendered items for my sidePane View and use its
comparator function to find the appropriate spot

[Details][phase-four]

### Technologies
Javascript, ruby on rails, Backbone, App Academy's composite view backbone
extension, JQuery, HTML5, CSS3, the Twitter api (omni-auth), pg search (ruby gem)

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
[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
