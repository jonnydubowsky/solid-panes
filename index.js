/*                            SOLID PANES
**
**     Panes are regions of the outline view in which a particular subject is
** displayed in a particular way.
** Different panes about the same subject are typically stacked vertically.
** Panes may be used naked or with a pane selection header.
**
** The label() method has two functions: it determines whether the pane is
** relevant to a given subhect, returning null if not.
** If it is relevant, then it returns a suitable tooltip for a control which selects the pane
*/

// create the unique UI module on which to attach panes (no, don't attach as UI dot panes any more)
// var UI = require('solid-ui') // Note we will add the panes register to this.

const panes = require('./paneRegistry')

module.exports = panes

// We attach the solid-UI lower-level system for convenience
// Currently most panes ar ebuilt using it anyway.
// It also gives access to rdflib as panes.UI.rdf

panes.UI = require('solid-ui') // Pass on directly to any who needs it

// This has common outline mode functionality for the default and other other panes
// A separate outline manager is requires per DOM in cases like a browser extension
// where ther are many occurences of window, and of window.document
// But each DOM should have just one outline manager.

panes.OutlineManager = require('./outline/manager.js')
panes.getOutliner = function (dom) {
  if (!dom.outlineManager) {
    dom.outlineManager = panes.OutlineManager(dom)
  }
  return dom.outlineManager
}
if (typeof window !== 'undefined') {
  var dom = window.document
  panes.getOutliner(dom)
}

/*  Note that the earliest panes have priority. So the most specific ones are first.
**
*/
// Developer designed:

let register = panes.register

register(require('./issue/pane.js'))
register(require('./contact/contactPane.js'))

register(require('./pad/padPane.js'))
// register(require('./argument/argumentPane.js')) // A posistion in an argumnent tree

register(require('./transaction/pane.js'))
register(require('./transaction/period.js'))
register(require('./chat/chatPane.js'))
register(require('./chat/longChatPane.js'))
// register(require('./publication/publicationPane.js'))
register(require('./meeting/meetingPane.js'))
register(require('./tabbed/tabbedPane.js'))
register(require('./schedule/schedulePane.js'))
register(require('./links/linksPane.js'))

register(require('./trip/tripPane.js'))
// register(require('./airPane.js'))

// Content views

register(require('./imagePane.js')) // Basic image view
register(require('./playlist/playlistPane.js')) // Basic playlist view
register(require('./wallet/wallet.js')) // Basic wallet view
register(require('./wallet/creditChain.js')) // Basic credits view
register(require('./wallet/ledger.js')) // Basic ledger view

register(require('./video/videoPane.js')) // Video clip player
register(require('./audio/audioPane.js')) // Audio clip player

register(require('./dokieli/dokieliPane.js')) // Should be above dataContentPane
register(require('./folderPane.js')) // Should be above dataContentPane
register(require('./classInstancePane.js')) // Should be above dataContentPane
// register(require('./dynamic/dynamicPanes.js')) // warp etc  warp broken 2017/8
register(require('./slideshow/slideshowPane.js'))

register(require('./socialPane.js'))

register(require('./humanReadablePane.js')) // A web page as a web page -- how to escape to tabr?
register(require('./dataContentPane.js')) // Prefered for a data file

register(require('./source/sourcePane.js')) // edit source
register(require('./n3Pane.js'))
register(require('./RDFXMLPane.js'))

// User configured - data driven
register(require('./form/pane.js'))

// Generic:

register(require('./attach/attachPane.js'))
register(require('./tableViewPane.js'))

// Fallback totally generic:
register(require('./defaultPane.js'))

register(require('./ui/pane.js'))

// register(require("categoryPane.js"))  // Not useful enough
// register(require("pubsPane.js")) // not finished

// @@ jambo commented these things out to pare things down temporarily.
// Note must use // not /* to comment out to make sure expander sees it
// register(require("lawPane.js"))

register(require('./microblogPane/microblogPane.js'))

// register(require("./social/pane.js")) // competitor to other social
// register(require("./airPane.js"))
// register(require("./lawPane.js"))
// register(require("pushbackPane.js"))
// register(require("CVPane.js"))
// register(require("photoPane.js"))
// register(require("tagPane.js"))
// register(require("photoImportPane.js"))

// The sharing pane is fairly generic and administrative  201
register(require('./sharing/sharingPane.js'))

// The internals pane is always (almost?) the last as it is the least user-friendly
register(require('./internalPane.js'))
// The home pame is a 2016 experiment. Always there.

register(require('./profile/profilePane.js')) // edit your public profile
register(require('./home/homePane.js'))

// ENDS
