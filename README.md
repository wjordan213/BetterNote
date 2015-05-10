# BetterNote

[Heroku link][heroku]

[heroku]: http://flux-capacitr.herokuapp.com

## Minimum Viable Product
BetterNote is a clone of Evernote built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create/edit notes for notebooks
- [ ] Delete Notes
- [ ] Create/edit notebooks
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

### Phase 1: User Authentication, DB Schema setup, Heroku Deployment (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. Buy the end of this phase, users will be able to sign in, sign up,
and all the tables for my database will be setup. The most important part of
this phase will be pushing the app to Heroku and ensuring that everything works
before moving on to phase 2.

[Details][phase-one]

### Phase 2: Note CRUD (~1 day)
I plan to compose my composite view and my primary sub-view in this phase. First
I will add API routes to serve note data as JSON, as well as CRUD controller
actions for notes, then I will create a Backbone Model, View, Collection, and
router for my notes. At the end of this phase, users will be able to create
and view notes, all inside a single Backbone App.

[Details][phase-two]

### Phase 3: Notebooks, Tags, Notes Index via sidebar view (~2-3 days)
On the back end, I will compose my api routes for sending down JSON objects
consisting of titles and ID's for my notebook and tag. I will also create an api route
that sends down a list of all the notes specific to a notebook.

On the front end, I will create a sidebar composite view, and collection/model
for notebooks. I will also create an association between notebooks and notes and
vice versa. I will create sidebar-subviews that display an index of notebooks and
notes, and I will then create a sidebar subview specific to listing tags
finally, I will create a notebook primary subview, which indexes that
notebook's notes.

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
- [ ] change notebook/tag pages to only be contained in sidebar view
- [ ] Back and forward buttons on notes
- [ ] Easy hyperlinking to notes
- [ ] Edit Tags
- [ ] delete account
- [ ] Pagination/infinite scroll
- [ ] Note types (image posts, quote posts, etc)
- [ ] Multiple sessions/session management

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
