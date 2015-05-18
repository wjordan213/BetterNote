# BetterNote

[Heroku link][heroku]

[heroku]: http://flux-capacitr.herokuapp.com

- username/password: password

## Minimum Viable Product
BetterNote is a clone of Evernote built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create/edit/delete notebooks
- [x] Create/edit notes for notebooks
- [x] Delete Notes
- [ ] Tag Notes
- [ ] Search for notes by title
- [ ] Search for notes by notebook
- [ ] Search for notes by tag

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

[Details][phase-three]

### Phase 4: Searching for Notes, Notebooks, and Tags (~1 day)
The search will essentially thin down the indexed tags, notebooks, or notes
in the sidebar. I will add a search bar on top of the view, then I will add
an event handler for key input to the browser which matches the titles against
search bar input

[Details][phase-four]


### Phase 5: drag and drop note linking  (~2-3 days)
First, I'll have the primary note view/edit view resize when the sidebar view
pops up, then I'll enable drag and drop from the sidebar to allow linking between
notes. That drag and drop will have to yield some escaped html containing
the dragged notes id. I will then set up click handlers on each dragged element
for navigation to that note's corresponding view.

[Details][phase-five]


### Bonus Features (TBD)
- [ ] make note show and note edit the same thing
- [ ] real-time ajax updates during note edit
- [ ] Link notebooks to notes (polymorphic)
- [ ] Easy hyperlinking to notes
- [ ] Back and forward buttons on notes
- [ ] User Show page
- [ ] Regexp email validation
- [ ] email confirmation via actionMailer
- [ ] filter out notes index by multiple tags
- [ ] Edit Tags
- [ ] delete account
- [ ] fancy note forms.
- [ ] infinite scroll/scroll within sectons of page
- [ ] Multiple sessions/session management
- [ ] Backbone auth for transition from login/signup into main view
[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
