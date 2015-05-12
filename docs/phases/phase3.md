# Phase 3: Editing and Displaying Posts

## Rails
### Models
* Note
* Tag
* Tagging

### Controllers
- Api::NotesController (create, show, update, destroy, index)
- Api::Tags(create, show, index)
### Views
* notes/show.json.jbuilder
* notes/index.json.jbuilder
* Tags/index.json.jbuilder
* Tags/index.json.jbuilder

## Backbone
### Models
- Tag (parses nested notes association)
- Note

### Collections
- Tag (parses nested notes association)
- Notes
- Notebooks are modified

### Views
- NoteShow
- NoteForm
- Notes index view
- Tag index view

## Gems/Libraries
