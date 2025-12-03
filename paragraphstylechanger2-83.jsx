#targetengine "paraStyleChanger"
#target indesign

function main () {
var ScriptName = 'paragraphStyleChanger';
var ScriptVersion = '2.83';

var __readMe =  
'''
paragraphStyleChanger.jsx | v.2.83
-------------------------------------------------
by Stephan Möbius, last edited: December 2025.

_____________
DESCRIPTION 
This script is good for finding and replacing applied paragraph styles comfortably, especially for finding consecutive combinations of styles. I use it in early design phase to try different typographical layouts and often to change subheadings.

_____________
SOME EXAMPLES
- Simple case: find each paragraph with style 'X', change it to style 'Y' (less clicks than the find/change-dialog)
- Conditional case: find each occurrance of 'Head followed by Sub' and change it to 'Head2 followed by Sub4'
- Use the 'autoReverse'-setting to compare two style combinations back and forth quickly.
- Use the 'quick test'-setting to do serial runs of layout variations: after a run it will automatically enter your last 'change to'-styles into the 'find'-styles so you can focus on selecting new styles to changeTo with a flick of the mousewheel.  
- The 'get styles'-buttons fetch styles from your selection into the find- or change-dropdowns.
- Set paragraphs to [NO-paragraph-style] in order to break their link to a style temporarily. Later find and reassign [no-style]-paragraphs.

_____________
NOTES
Original script for starting point was: "Fix paragraph style combinations" by Thomas Silkjær, 2009.

The script will display the selection it applies to: 
- if nothing is selected: the active document or the active layer (depending on setting)
- if an insertion point or textframe is selected: the parentStory, including anchored tables and anchored textframes in the story
- the stories of texts on paths (of textframes, lines, polygons....)
- the stories of multiple selected items, like textframes, groups
- the paragraphs of selected text, including anchored textframes or tables inside of that selected textrange
- the paragraphs of selected cells, rows, columns or a table
- the paragraphs of a selected page with the page-tool
- many combinations of wildly nested items, tables in tables in anchored textframes inside of groups of groups... 
(To clarify: it will _not_ do paragraphs of a single textframe from a story, but do the complete linked parent story.)

You can now create alternating patterns of paragraph styles like A-B-A-B-A with the exceptional mode: 'find [any style] followed by [any style]'  -> 'change to A followed by B'. 

If you execute with any setting that won't change anything, i.e. 'Change to: [no change] followed by [no change]' then the script will preview the number of found matches.

The 'get-styles' button fetches the styles of any selection. It will put the first paragraphs style into the 'find'-dropdown and the second paragraphs style into the 'followed by'-dropdown. The easiest is to mark a range of two paragraphs with the desired consecutive styles, click 'get', and then revert your selection to what you were working on. To get a single 'find'-paragraphstyle without a 'followed by'-style, place your cursor in the desired paragraph (select nothing) and click 'get'.

Note: Your saved user queries and your selected dropdown items are document specific, they are stored in a scripting label into each document you 'touch' while running the script. This means that the script will immediatly alter your documents. If you need unchanged documents don't run the script. 

Using the 'remove label' option will delete all this scripts scriptlabels from the document and with it all its saved user-queries for this document. This is undoable. Save and close the document immediatly afterwards lest a new label will be written into the document.

Preference settings (wrench icon) are not document specific, they are stored in a simple text-file next to the scriptfile. The settings file can be deleted any time. It will be created with defaults if it is missing. 

Styles that are listed as [-missing-] (i.e. styles that have been deleted) will show an alert icon and prevent execution. Either select another style, or go back to the document and recreate or import the missing style with the same name in the same stylegroup. The script finds styles by comparing 'name' (and grouping) first. But it will also match styles by unique ID in case you just moved or renamed styles. It will update your saved user-queries accordingly. Remember to save your document, if you have changed the user-queries.

_____________
PITFALLS
Local character overrides, i.e. textstyle ranges are kept, but any overrides of paragraph styles in changed paragraphs are lost when you apply a new paragraph style to a aparagraph - just as is always the case in inDesign by default. The script makes no effort to backup your paragraph style overrides, when it applies styles.

A nasty use case you should understand is this: Imagine "if this paragraph's style is [A] followed by [any style] then change this paragraph to [X] and its next paragraph to [Y]." ... this would in some cases result in paragraphs to be changed twice, for example in A A A B --> X Y Y Y.  The script prevents paragraphs from beeing changed twice by prefering _consecutive_ paragraphs and ignoring/blocking the other match. Hence the result may not seem logical. These are exotic cases though ...

ParagraphStyleChanger won't find nor change blank line last paragraphs. To my knowledge and level of understanding, 'blank line' end paragraphs consisting of a single carriage return do not count as a valid paragraph. Note: They won't count as [any style]! This is irritating since in InDesign you're able to place your cursor in it and give it a paragraph style ... but in scripts we can't work with them.

The user-queries you save, and also the current dropdown-items you've selected, are stored in a script label. This happens with a 'hidden' undo-step. If you use 'undo' in Indesign and go back a few steps in your documents history, you might inadvertedly also undo the label storing step and thus loose the user queries you just saved.

Known issue: There is an issue when you're working with floating non-docked palettes in Indesign. For instance if you click into the non-docked paragraphstyle panel (say, to add a new style), and then click back into paragraphStyleChanger, it won't register the change of window focus and will not update itself. This probem does not occur with docked indesign panels. If you notice pSC not registering changes, click once in the document window and then in psC to force an update.

_____________
THANKS
A huge amount of thanks go to Marc Autret and Peter Kahrel. Without their endlessly helpful posts, documentations, solutions and examples this script wouldn't exist.

_____________
DONATIONS
If this script is a regular timesaver for you please consider donating a little to me. There's paypal behind my e-mail adress "stephan.moebius@gmail.com". ... Also: get in touch!

_____________
CHANGELOG
v2.83 - December 2025 - Fixed: Chain mode now properly exits when using getStyles buttons or anyStyle buttons. Switch buttons are disabled during chain mode.
v2.82 - December 2025 - New feature: Added chainable queries. Manage chains and query execution order and run multiple find/change tasks at once.
v2.81 - August 2025 - Hopefully fixed: Mac performance issues when selecting paragraph styles. Fixed: Style renaming detection bug when style name is changed back to a previously used name.
v2.80 - August 2025 - Fixed: EventHandler error when starting script a second time. Prevent reinitialization if script is already running. Replaced rescource intensive idleTask with proper eventHandling
v2.79 - February 2025 - New feature: Transfer user queries from other documents. Fixed: EventHandler error when starting script a second time. Prevent reinitialization if script is already running.
v2.78 - February 2025 - Fixed: Causes Indesign to crash when documents use faulty fonts. No longer does risky file-caching of the paragraphStyles-object via toSource/Eval. "Remove script label" now removes all PSC's older labels too. PSC now updates itself when switching documents.
v2.77 - September 2024 - Introduced option to let you import the findChange-Queries from an older skript-version in the currentDocument.
v2.76 - April 2022 - Bugfixes in nested objects
v2.74 - April 2022 - works with more cases of nested objects – anchored textframes or groups inside of stories, tables within cells within groups of tables - or any other wild combination.
v2.00 - May 2018 - Complete Rewrite of the UI with a modeless dialog interacting with the app, able to switch styles quickly, to store often used style combinations, to get styles from the current selection and made smarter about moved/renamed styles. Works with selected pages now. Notices layer changes. Added the 'alternating pattern' special case. ...
v1.11 - March 2017 - Little bugfix and more usefull way to preload styles into the dialog from selected paragraphs.
v1.1 - March 2017 - Now works with nested style groups (recursive, thanks to Peter Kahrel), added the ANY-style-option to _all_ find and change fields to give more logical combinations, more cleverly tell you what paragraphs its working on, works with a selection of multiple page Items, works with more sorts of pageItems and groups (recursive), optionally detects the current and next style from some selections, undoes in a single step, list styles in preferences that are missing (instead of reverting to defaults), works on selected cells and selected tables, comes in two languages (english & german).
v1.0 - May 2013 - A beefed up version of Thomas Silkjaers 2009 script (Thanks Dude!), changes made to run in CS6,  to include styles in style-groups (not nesting), to save last settings, to give a report of num changed, and to add an -ANY-Style option for the follow up paragraphs.

_____________
IDEAS
- Option in followed-by dropdowns: [Followed by its 'Next'-Style]  &  [Followed by its CHAIN of 'Next'-Styles]
- Setting: Also apply current indesign find/change dialog settings
- Button: Try logical reverse (some combinations couldn't possibly be reversed ... but some can!)
- Instant Mode !!! - live switching of styles.
- v.3.0 : have +/- Buttons to add or remove any number of "Followed by"-fields, to create unlimited chains of style conditions AND style change combinations. 
''';
    var _logging = 0; //  0 = no logging  1 = to log-file  2 = to console
    
    /* w = Window.find("palette", ScriptName + " " + ScriptVersion);
    if (w) {
        // Prüfen ob die IdleTask existiert als Indikator dass die Handler schon registriert sind
        if(app.idleTasks.itemByName("pSC_idleSelTask").isValid) {
            if(!w.visible) {
                w.show();
            }
            w.active = true;
            return; // Skript beenden, existierendes Fenster wird weiter verwendet
        } 
    } */
    
    // Edit the strings and prefs to your liking, ... 
    var nameOfAnyStyle = localize({en: '[Any Style]', de: '[-Beliebig-]'});
    var nameOfDontChange = localize({en: '[-Don\'t Change-]', de: '[-Nicht ändern-]'});
    var markOfNotFound = localize({en: '(Missing) ', de: '(Nicht gefunden) '});

    var _prefs = { /* fallback default preferences */
                autoRev: false, /* auto reverse last style combos, for quick back and forth comparisons */
                autoFind: false, /* make find the change styles from last run, for quick layout tests */
                startFind: false, /* next program start with find-style-combo from current selection (1st and 2nd paragraph) */
                useLayer: false, /* use Layer instead of document, when nothing is selected */
                location:[836,327]
            };
        
    const _CC = +(9 <= parseFloat(app.version));
    
    // ================== Own Prototypes ===================  
    ListBox.prototype.load = DropDownList.prototype.load = function(/*obj[]&*/dp) { 
        // prototypal Drobbox Managing of items by Marc Autret, see https://forums.adobe.com/thread/1311125
        // Assumes that  all dp items (dataprovider) offer a toString() ability  
        this.properties||(this.properties={});  
        this.properties.data||(this.properties.data=[]);  
        dp?(this.properties.data=dp):(dp=this.properties.data);  
        var CAN_SEP = "dropdownlist"==this.type,  
            n = (dp&&dp.length)||0,  
            i, s;  
        for ( i=0 ;  i < n ;  i++) {
            s=(''+dp[i]);
            this.add(/*CAN_SEP && '-'==s ? "separator" : */"item", s); // removed the ability to insert seperators
        };
        return this;  
    }
     // =====================================       
    ListBox.prototype.resync = DropDownList.prototype.resync = function(/*obj[]&*/dp) {  
        // Resync, or even reload, the data provider items  
        //this.selection = null;  
        this.removeAll();
        return this.load(dp||null);  
    }
     // =====================================
    ListBox.prototype.getData = DropDownList.prototype.getData = function() {  
        return this.properties.data  || null;
    }
     // =====================================
    ListItem.prototype.get = function() {  
        // Return an object instance from the DP (behind this ListItem)  
        return this.parent.properties.data[this.index] || null;
    }
    // =====================================
    Group.prototype.createButton = function(bName  /*str*/, bSprite  /*str*/, bAlign /*[str,str]*/) {
        var b;
        with (b = this[bName] = this.add("image", undefined, bSprite, {state:0})) {
            alignment = bAlign || this.alignChildren;
            var iSize = image.size;
            b.spriteHeight = iSize[1] / _vSprites;
            size = [iSize[0], spriteHeight];
            minimumSize = maximumSize = size; // added this so alignment 'fill' will work
        }
    }
    // ====== needed for sprites, see Marc Autret's: http://www.indiscripts.com/post/2011/04/sprite-buttons-in-scriptui
    Image.prototype.refresh = _CC ?
        function()
        {
            var wh = this.size;
            this.size = this.maximumSize = [1+wh[0],1+wh[1]]; // had to add maximumSize so alignment 'fill' will work
            this.size = this.maximumSize = [wh[0],wh[1]];
            wh = null;
        }:
        function()
        {
            this.size = [this.size[0],this.size[1]];
        };
    // =====================================
    Group.prototype.createSetting = function (t /* type-str: 'c' is checkmark*/, bxName/*str*/, bxText/*str*/, state/*bool*/, icon /*str*/) {
        var r;
        with (r = this[bxName] = this.add( "group", undefined, undefined)) {;
            r.name = bxName;
            maximumSize.width = 440;
            alignment = ["fill", "top"];
            alignChildren = ["fill", "top"];
            margins = [5,5,0,0];
            spacing = 10;
            if (t === "c") {
                r["c"] = add( "checkbox", undefined);  
                r["c"].value = _prefs[bxName] || false;
                r["c"].preferredSize = r["c"].maximumSize = r["c"].minimumSize = [13,13];
            }
            else {
                createButton ("c", icon);
            }
            r["t"] = add( "statictext", undefined, bxText, {multiline: "true", } );
            r["t"].preferredSize.width = _wW - 50;
            r["t"].preferredSize.height = 45;
            r["t"].minimumSize.width = _wW - 50;
            r["c"].enabled = r["t"].enabled = state;
        }
    }
    // =====================================
    Group.prototype.createDD = function( /*str*/ ddName, /*str*/ ddTitle, /*str*/ ddDefault)
    {
        var tg, t, a, g, dd;
        with (tg = this["title"+ddName] = this.add( "group", undefined, undefined ))  { // titleGroup
            tg["name"] = ddName; // custom property: w.p.m.titleffp.name = 'ffp' etc...
            spacing = 5;
            margins = [0,0,5,0];
            alignment = ["fill", "fill"];
            alignChildren = ["right", "bottom"];
            t = tg["title"] = add( "statictext", undefined, ddTitle );
            a = tg["alert"] = add( "image", undefined, alertIcon );
            a.visible = false;
            t.alignment = a.alignment = "left";
            if (ddName === "fsp" || ddName === "csp") {
                createButton ("but_get"+ddName, getIcon);
                tg["but_get"+ddName].margin = 0;
            }
        }
        with(g = this["grp"+ddName] = this.add( "group", undefined, undefined )){
            name = "grp"+ddName;
            preferredSize.width = minimumSize.width = _wW - 30;
            alignChildren = ["fill", "center"];
            margins = 0;
            spacing = 2;
            createButton ("but_any"+ddName, ellipsis);
            g["but_any"+ddName].alignment = "left";
            with (dd = g[ddName] = add("dropdownlist")) {
                dd.preferredSize.width = dd.minimumSize.width = _wW - 50;
                dd.name = ddName;
                // Add our prototype methods
                dd.load = ListBox.prototype.load;
                dd.resync = ListBox.prototype.resync;
                dd.getData = ListBox.prototype.getData;
                // Load initial data
                dd.load([new DP_item(0, ddDefault, false)]);
            }
        }
    }
  
    // ===========================================
    //   OBJECTS 
    // =========================================== 
    
     var QL_item = function(str, set /* obj {ffp : uid, fsp : uid, cfp : uid, csp : uid } */) {   
        this.rename(str||localize({en: '[User]', de: '[Benutzer]'}));
        this.set=set||new DD_set();
    }  
    var DP_item = function(uid,str,notFound) {   
        this.id=Number(uid)||0;  // this lines was: this.id=uid||0; but didn't work for null
        this.rename(str||'');
        this.notFound=notFound;
    }
     var DD_set = function(ffp, fsp, cfp, csp /* objs of DP_item */) {   
        this.ffp = (ffp && ffp instanceof DP_item)?ffp:new DP_item(0,nameOfAnyStyle,false);
        this.fsp = (fsp && fsp instanceof DP_item)?fsp:new DP_item(0,nameOfAnyStyle,false);
        this.cfp = (cfp && cfp instanceof DP_item)?cfp:new DP_item(0,nameOfDontChange,false);
        this.csp = (csp && csp instanceof DP_item)?csp:new DP_item(0,nameOfDontChange,false);
    }  
    var QL = function(sel /*QL_item*/,a /*array of QL_item*/, chains /*array of Chain_item*/, selChain /*number*/) {
        this.sel = sel||new QL_item();
        this.itms = a||[new QL_item()];
        this.chains = chains||[];
        this.selChain = (typeof selChain === 'number') ? selChain : 0;
    }
    // Chain_item: stores a named sequence of query names
    var Chain_item = function(name, queryNames /*array of strings*/) {
        this.name = name || localize({en: '[New Chain]', de: '[Neue Kette]'});
        this.queryNames = queryNames || [];
    }
    Chain_item.prototype.toString = function() {
        return this.name;
    }
    QL_item.prototype.rename = DP_item.prototype.rename = function(str){ 
        this.name=str|| localize({en: '[Unknown]', de: '[Unbekannt]'}); 
    }  
    QL_item.prototype.toString = DP_item.prototype.toString = function(){ 
        return (this.notFound?markOfNotFound:'') + this.name; 
    }

    // ================= POLYFILLS ====================
    
    if (!String.prototype.trim) 
    {
        // trims leading and traling spaces of a string
        String.prototype.trim = function () {  
            return this.replace(/^\s+/,'').replace(/\s+$/,'');  
        } 
    }
    if (!String.prototype.shorten) 
    {  
        // Shortens a string to roughly n characters by replacing the middle part with "..." similar to how adobe  does it with long stylenames 
        String.prototype.shorten = function (n) { 
            return (this.length > n) ? this.slice(0, (n/2)-2).trim() + "..." + this.slice((-n/2)+2).trim() : this+"";
        }
    }
    if (!Array.prototype.contains) 
    {
        // true if array contains given object
        Array.prototype.contains = function(obj, p /*property to look up given obj in*/) {
            var i = this.length;
            while (i--) {
                if ((p?this[i][p]:this[i]) === obj) {
                    return true;
                }
            }
            return false;
        }
    }
    Array.prototype["=="] = function(a) {
      // Make myArray1==myArray2 relevant (by Marc Autret)
       return this.toSource() == a.toSource()
    };
  
    // ===========================================
    //   MAIN 
    // ===========================================     

    var _scriptFolder = scriptFolder();
    var _scriptFileName = scriptFileName();
    var _old_ad;
    // the following bools prohibit double runs and triggers at some point or another. it's extremly ugly and convoluted ... but i coulnd't find a better way, gave up :(
    var _stopCalls = false; 
    var _isActive = false;
    var _inDDactionFlag = false;
    var _docChanged = false;
    var _hasDocAnParas = false;
    var _firstRun = true;
    var _scrLbl = ScriptName + ScriptVersion + "DDs";
    var _o = new Object(); // holds description of selection and its paragraphs
    // see http://www.indiscripts.com/post/2011/04/sprite-buttons-in-scriptui
    var _vSprites = 8;
    const _fixOffset = _CC ? 0 : 1;
    // if we are in CC get ui brightness as mathFloor UI-Brightness: either 0 or 1, if not in CC set it to bright
    var _CCbrightness = _CC ? ~~(app.generalPreferences.uiBrightnessPreference+0.49):1;
    var _wW = 220; // overall window width
    var _cachedSignatures = [];
    var _cachedDDState = null; // stores DD state before chain activation
    var _chainModeActive = false; // true when a chain is selected
    var nameOfChainMode = localize({en: '[-Chain-]', de: '[-Kette-]'});
    log('### START ### ');
    loadPrefs() && _prefs = loadPrefs();
    
    w = Window.find("palette", ScriptName);  
    /* if (w) { // remove this if-statement later after programming
        w.visible && w.close();
        w = null;
    } */
    
    if (!w) { 
        w = new Window("palette", ScriptName + " " + ScriptVersion, /*bounds*/undefined, {resizeable: true});
        with(w){
            var alertIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x0E\b\x03\x00\x00\x00(\u0096\u00DD\u00E3\x00\x00\x00\u00E7PLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00AAv\b6&\x02\x00\x00\x00\u009Dp\t\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00A6|\x0B\u00D9\u00B9<\u00D0\u00B8J\u00D5\u00B8G\u00BA\u008B\x1C\u00A5z\r\u00CE\u00B5E\u00B3\u0089\x1B\u00A2~\x16\u00C1\u00A67\u00BF\u00A42\u0092v\x19\u00B1\u008A\x1AwM\x04kC\x02wO\x05\u009De\x04\u008Ev\x1AgK\x06\u00B0\u008B\x19\u00A0l\x07\u0097`\x03P=\x06\u00AC\u008B\x15\u00A2u\n%\x1A\x02\x00\x00\x00\"\x1B\x00\x00\x00\x00\u00C5\u008F\x02\u00FC\u00DEY\u00FB\u00D4=\u00FA\u00D16\u00FA\u00CF2\u00FA\u00CA$\u00F9\u00C6\x1B\u00F9\u00C2\x11\u00C6\u0093\f\u00F5\u00E4w\u00FC\u00E3h\u00FB\u00E1b\u00FB\u00D9K\u00FB\u00D7G\u00FB\u00D5B\u00FA\u00CC+\u00C7\u0098\x17\u00F8\u00BF\b\u00F8\u00BC\x02\u00FE\u00EE\u0081\u00F7\u00E7}\u00FD\u00EBz\u00FD\u00E7q\u00FC\u00DBS\u00FB\u00DAN\u00DC\u00BCG\u00E6\u00C2C\u00DA\u00AF.MK.\u00FA\u00CD-\u00DD\u00B2%\u00CE\u009F\x1E\"!\x10\u00E0\u00AB\x0F\u0099g\x02\u00D6\u009D\x01\u00B5\x1F\x15F\x00\x00\x00'tRNS\x00K\x05\x14\x02\u00FD@8\x1C\x1C\r\t\x06\u00FE\u00FA\u00F9\u00F7\u00F2\u00EA\u00E3\u00E0\u00D4\u00C3\u00BF\u00BA\u00AD\u00A8\u00A6\u009A\u008B\u0081\x7Fyp[NL2\"hV\u00C2p\x00\x00\x00\u0097IDAT\b\u00D7m\u008C\u00D5\x16\u0082@\x00\x05W\u0090\x14\u00BB\u00BB\u00DD\u0095^R\u00C0\u00EE\u00FA\u00FF\u00EFq\r\u00F4\u00C5y\u009Bs\u00E7\\\u00F0\u0097JY\u00A4~6\u00B4\x16m:\x19\u009BT\u0098/3l*\u00D6\u00AEu\u0080NU\u00F8\u00E4|vu\u0081rz \u00BE\u00F3\u009Am#\u00E8\u00FA\u00A5\u00C9k\x1Em\x1D\x19AE=u\u009EoRQ^\u00BB\bj3=?&o\u00BD\u00DD\u00C6S\u00D4\u00A3n\x18\u00D7&\r\u00F8\u009C\u00E7\u00AB\x1A\u0082\u0086i\u0086\f\x0BZ{\u0085t\b\u0099a\x14\u00DD\u00EB\u00A0\u00CF\u009C\u0083\x00c<%\u00DC\x1A\u0080\x12\u00B8\u00C4\x17\u00EE\x01\u00DD\u0095\x12\u00CFX\u0096\u00E7\u00C2\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var arrowsDownIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x03\x00\x00\x00;\f\u00BC\\\x00\x00\x01\x0BPLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0F\x15\x1A\x13\x13\x13\u00D8\u00D8\u00D8',616@\u00CF\u00CF\u00CF\u008C\u008C\u008C\u008C\u008C\u008CEJTu{\u0084PQV\x0E\x0E\x0E\u00D8\u00D8\u00D8159\u008C\u008C\u0091\u008B\u008B\u0091TV]w{\u0084EJTx~\u0087w{\u0084\u0086\u008A\u0093../\u0086\u008A\u0093TW]\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8DJT48@Y^iY^h\u00D5\u00D5\u00D5zzzuuu\u00C7\u00C7\u00C7\u00C3\u00C3\u00C3ZZZY^hEEE\u00A6\u00A6\u00A6===\u00D8\u00D8\u00D8\u0089\u0089\u0089\u00D8\u00D8\u00D8~~~\u00D8\u00D8\u00D8111\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D859@CGNCFN\u0084\u0084\u0084\u0080\u0080\u0080\u00CC\u00CC\u00CCTW]\u00D8\u00D8\u00D8w{\u0084\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8TW\\z\x7F\u0087\u0080\u0085\u008C\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8000w{\u0084\u0097\u0097\u0097\x15\x15\x15'''\u0080\u0085\u008CjjjVVV++-\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8&+505?\u00CF\u00CF\u00CF\u008C\u008C\u008C\x1E!)%)1\u0086\u0086\u0086\u008C~\u00B0;\x00\x00\x00QtRNS\x00>f)G\u00A6\u00A6\u00A6\u00A6\f\b\u00FB\u00CA\u0097nC3\"\x16\u00CE\u00BF\u00A3\u008C|vYME7+\u00FC\u00FC\u00F4\u00F2\u00E0\u00D3\u00CA\u00C9\u00BD\u00A4\u009E\u008E\u008D\u0088vrnjhK%\x1D\x0F\n\u00FC\u00F5\u00F4\u00E9\u00DF\u00D7\u00D0\u00C9\u00C1\u00B9\u00B3\u00B0\u00A8\u0097\u008F\u0083\x7F~}{yb_WVR\x141#\u00B6\u00C6\x00\x00\x01\u00BAIDATH\u00C7\u00D5\u0095\u00E7N\u00C2P\x00\u0085\u00AB\u00DE\u00A2 {\u00EF!C\x04\x04\x01\u00F7\u00DE{\u00B5\f}\u00FF'\u00F1\u00AE\u0084\u009CRh\bM\x13?\u00C2\u009F/\u00E7\u00DCsi\x7F\u00A0\u00D8\u00C2P\u00E0X\u00DD\u009A\u00FE\u0096\u00C6\u00B8\u00C8\u0082\u00DD\u00E32\u0080\u00D1\u00D0\x15u\u00D7\u00FB(\u00DD_2\u0088\u00A8\u009A\u00CA\u0082\x18\u00CDj9\x10rK\u00B1\u008D\x15\x13fI\x02\u0082L\u0092C\x01$!H\u00E6\u009Ei\u00AC\x1B!T\u00F2 \u0099(\u0099\u00C4\u00A5\u00C9\u00D0\u0087xGg\x1D8\u00B3\u00C1\u00E5.\x0E\u00A5\u00AA\u00D4U\u00BB(\u00C9\u00B3\f\u00E2\u0095jZ\u00ADk\u0094\u00A4\u00A3\u00BD\u00E3/\u00E2\u00DF\u0086\u00B8\u008E\u00F1\u00B7\u0093I\u0092\u00F0'#5\u00FB\u00CCz\u00F2\u00AB&\u00CC\u0093\u00BF\x02\u0090N\u00D5\u00CD\u00E5\u00EB\u00C9\u0088q\u00DA\u0084\u00E46\u0097;X\x7F)SW\u00F6\u00A3\u00F4\u00FBd\x10\u0087*\u00A3\u008A\u00DF(\u00FD\u00CD\u00D1#\u00AC\u00CB-\u00D3{\u00DA'\x17eC\x00\u00CE\u00A9\u00BA9\u00DF\u00F7*\u00E3\u00A1\x076\u00C0e\x0E\u00A3\u00E1\x16u\u00AD\x03\u0094\u009E\u00AC\f\"m\u00B5\u00CD\u0082\x18\u00ED\u00A9}\x10rK\u00F9\x07\f\x04\x0E\u00D6\u00AD\u00CF\u00D4\x19\u009BI\u0090Q.\u00A3n\u0090\u00A1M\x16\fa\u00DD}G\u00E5%\u0095HI/\u00A1`\u00D1\u00A4\u009E\x14'\u00E2\u0096b\x1Bk&,,\x07\x02\u00E7\u00EA\u00D6R\u00BE\u00A38H/\u0097\u00DE \u00C8L\u009E\u00BA|\x06\u00EB\u00C1[\x16\x04\u00C9(\u00EA\u00C5\u00A9\u00F5`\\\u008F\x07A\u008A\u00AD%.\u008F\u0098\u00FEI-,\x7F\x04\x0E\u00D6\u00AD\u00CF\x1C3\x0E} #\\F\b\u00C8T\u0081\u00BAB\n\u00EB\u00E4\u0086\u00CA\u00F3O\u00E3\u00D0\u00D1\u00F8xj\u009D\u00F8\u00C6>\x02Rl-qy\u0083\u00B4\u0085u\u0081\u0083u\u00EB3]\u008CX\x1Ad\u0082\u00CB\u0084\x07d8\u00C6\u0082a\u00AC{\u00DE\u00A8|\u00A2\x12\u00A9\u00BB\u00EA(X4\u00EDJ\u008B\x13qK\u00B1\u008B?\u00B1>_\x7F\x1C\u009E\u00B3\u00B2\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var arrowsSwitchIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x03\x00\x00\x00;\f\u00BC\\\x00\x00\x00\u00FFPLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0F\x15\x1A\u00C2\u00C2\u00C216@\u00CD\u00CD\u00CD',6\u00D6\u00D6\u00D6'''\u00CE\u00CE\u00CE'+5\x15\x16\x18#'1\u00CE\u00CE\u00CE'+5\x17\x17\x17\x12\x17\x1Bbbb\u00AC\u00AC\u00AC\x18\x1B!&+5~~~\u00C7\u00C7\u00C7\x1D (%*4\u00CD\u00CD\u00CD'+6\u00CD\u00CD\u00CD\u0085\u0085\u0085777\u00CE\u00CE\u00CE\u00CE\u00CE\u00CE\u00D2\u00D2\u00D2\u00D2\u00D2\u00D2CCC $+\b\b\b(,3\x17\x1B\x1E(,3******www\u00C0\u00C0\u00C0%*4\u00CD\u00CD\u00CD'+6\u0082\u0082\u0082\x1D!(\x1C\x1F&',6\u00CD\u00CD\u00CD',6%(/(+2\u00CC\u00CC\u00CC\u00CA\u00CA\u00CA\u00CD\u00CD\u00CDQQQ',6\u0099\u0099\u0099\"%,\u00CE\u00CE\u00CE\u00CE\u00CE\u00CE\x1C\x1F'',7bbb\u00AC\u00AC\u00AC\x19\x1C!AAA\x16\x17\x1C\x16\x17\x1B\x11\x13\x16(,3\u00C2\u00C2\u00C2\u00CD\u00CD\u00CD&+5}}}16@05?%)1\u0084\u0084\u0084\x1E!)\u009C\u00C4\u00FD\u00B7\x00\x00\x00LtRNS\x00f@=)\u00A6\u00A6\u00A6\u00A6\x05\x05\u0081\u0081q\u0096UUD.\u00B4\u00A1\u00A0\u00F4\u00EC\u00E7\u00E7\u00E4\u00DF\u00DF\u0091tMF.\x12\f\u0090dKF8-\x12\f\u00DC\u00D4\u00CE\u00C5\u0091\u00F7\u00F6\u00D3\u00C5\u009E\u009D]<\u00F9\u00F5\u00F1\u009F\u0091\u0087x^=\u00D2\u00C4\u00B5\u00A2\u00A1\u008F\u0085\u0085j&\u009B\u00C6hr\x00\x00\x02XIDATH\u00C7\u00BD\u0091\to\u00DA@\x10\u0085\x07\u0093\x16l \t\u00E4\u00E0&\u0090@\b9I G\u008F\u00F4\u00BE[\u00BB\x07\u00FE\u00FF\u00BF\u00A53;\u0092\u00DFJ\u008BU\u00C9R\u00FDIh\x1Eo\u00DF\u00CC\u008E\u00D6\u0094\u00CE\u008F\x04J%s{H\u00A0\u00E2\u009A\u00FE0\x1C\u00FA\\_\u0084\u00CC\u00B3\u00EEP\u00DD\u00AB\u00F0\u00CA\u00E4C\u00A1\u00E2\u009B\u00E0\x1B\u0091\u0087D\u0087]\x16]\x16\x04\u008DS\u00AB\x0Bst\u00BED\u0087\u00B8\x11\u009B`7\u0098y\u00BE\x12\u00F0\u00D6\u00A0&\u00DA\x13\u00D3!s{h\u0099\u00BB\u00AEY\x1F\u0084\u0083:\u00D7\u00E7\u00E6\x1B\u00B5\x06\u009A\u00BC\b/L>\x14v\u00EBb\u00D6_\u0089<\u00F0\u00BC\u0083\x16\u008B\x16\x0B\u0082\u00C6)\u00A1\x0BsH\u00E7st\u0080\x1B\t\u009B\b\x1F\u00F9\x073\u00CFW\x02TX\u0083\u009A?\x13\x12\u00D3!s\u00FB\u00CA2w\u00D6\u0098\u00E3\u00D5g)\u00D7+\u00E6\u00BA9V\u00F3|un\u00F2+aG\u0093/E\u00D6\n\u0085Z\u0093E\u0093\x05A\u00E3\u0094\u00D0\u00859\u00A4\u00F39:67\u008E\u00D5\u00C4&\u00CC\u0087\u0082e\u00E6\u00FAJ\u0080\u00D2y\u0092@\u00A9dn/\x11\u00D8rM\x7FT\x1A\u00F9\\oK\u00CCm\x7F\u00A4n\u00A5T1\u00F9\u0092\u00B0\u00E5\u009B\u00E0[\u0091GDG}\x16}\x16\x04\u008DS\u00AB\x0Bst\u00BEDG\u00B8\x11\u009B`7\u0098\u00F9\u00BE\u00D2\u00BF\u00F9\u0095\u00F0\x1F\u00DA#\x02U\u00D7\f\u00A6\u00D14\u00E0\u00BA\x1F1\u00FB\u00BD\x07u\u00DFGK\u0093\u008F\u0084j`\u0082\u00F7\"O\u0089N{,z,\bZOu\u00BC\u00DD\u00B5\u008C\u0096Rt\u00BED\u00A7z\u00A3\u00BD\x1Ev\u0083\u0099\u00EF+\u0081\u008D5\u00A8\u00F9;!1\x1D2\u00B7G\u0096\u00B9\u00E9\u009A\u008DI4ip\u00D5o\u00D4\u00B9\u00D7\u00E4eti\u00F2\u0091\u00B0\u00D9\x10\u00B3\u00F1Z\u00E4\u00C9\u00C6\u00C6I\u0087E\u0087\x05YZOe&\u00BAt\u008E\x14\u00D2\u00F9\x1C\u009D\u00E8\u008DXI6\u00C1n0s|%@\u00C55\u00A8\u00F9'!1\x1D2\u00B7\u00C7\u0096\u00B9\u00E7\u009A^-\u00AEy\\ob\u00E6\u00A6\u00FDM\u0093\u00EF\u00E2\u0085\u00C9\u00C7\u00C2\u009E'\u00A6\u00F7U\u00E4q\u00B1x\u00DCf\u00D1fA\u0096\u00F6\u00BE\u00C8\u00A9\u00CCD\x17\u00FF[\u00C4\x0B)\u00A4\u00F39Z\u00D3\x1B\u00B1\x12o\u00A2|*Zf\u00AE\u00AF\x04(\u009D\u00A7\t\u0094J\u00E6\u00F62\u0081m\u00D7\ff\u00E5Y\u00C0\u00F5\u00AE\u00CC\u00DC\u00CD\u00BF\u00AB[-WM\u00BE,l\x07&\u00F8 \u00F2\u008C\u00E8\u00EC\u0091\u00C5#\x0Bb=g=g\u00AD\u00A7b\u00A1K\u00E7H\u00D1\u00F9\x12\u009D\u00E9\u008D\u00F6z\u00D8\rf\u00AE\u00AF\x04\u00FE\x02\u00A4A\u00C7\u00C4\u008173y\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var arrowsUpIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x03\x00\x00\x00;\f\u00BC\\\x00\x00\x00\u00D5PLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0F\x15\x1A\x00\x00\x00\u00D8\u00D8\u00D8',6\u00D0\u00D0\u00D016@\u00D4\u00D4\u00D4*/916@7;ALQZOT\\OT\\\u00D8\u00D8\u00D8\u008F\u0091\u0095',6ccc+0:\u00B0\u00B0\u00B0ACIaeo===\u00D8\u00D8\u00D8mqz*+-mqzPUZ\u00D8\u00D8\u00D8\u008A\u008D\u0092%)1\u0084\u0084\u0084\u00D1\u00D1\u00D1\u00D8\u00D8\u00D827A\u00D8\u00D8\u00D8\u0080\u0080\u0080\x14\x15\x15\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8\u0091\u0094\u0099\u0091\u0094\u0099kkk@BG[_g\u00B7\u00B7\u00B7bemOOO\u00D8\u00D8\u00D8$$$\u0097\u0097\u0097'''|||OOObem\u00D8\u00D8\u00D8VVV38>/5:\u009E\u009E\u009E\u00D8\u00D8\u00D8\u00D8\u00D8\u00D8&*4\u00D8\u00D8\u00D8\u00CF\u00CF\u00CF05?\x1E!)\u008C\u008C\u008C\u0087\u0087\u0087\u00A0+\u00EA\u00E1\x00\x00\x00@tRNS\x00@f)=\u00A6\u00A6\u00A6\u00A6\u00FC\u00FC\u00F2\u00CF\u00CA\u00C0|P\"\x05\u00B0\u00A3\u009C\u0097\u008C\u0088zvXMF%\x17\u00F4\u00E9\u00E4\u00DB\u009D\u008FkG:6\r\b\u00B8\u00B0\u00A8\u00A7\u0097\u0097\u0089\u0083}yidbYW530\x1F\x14$B\x7F\u00A8\x00\x00\x01kIDATH\u00C7\u00D5\u00D1go\u00830\x10\u0080a\u00D2\x16h\x12FB\u00F6\u00DE\u00BB{\u00EF\u00DA\t\u00F0\u00FF\x7FR\u008D\u00CD\x17\u00DFY\u00AAD]\u00A1\u00BC\x1F\x1F\u00DD\t\u00AC3tu\u00A7\u00B05\u00DD`\u009C\u00D1\x19\u00B2\n\u00A5\u00B4\x03\u00B1\u00C8\u00B0\u00F8)[\u0087\x19\x1C\u00FD\u00A2\u00BC\u00E2\u00DA\u00D0\u00D8^\u0094\u00C7:\u00AE\u00A0(\x0B^+pI\u009F0N\u00E9\x14\u00E1\x03\u00A5\u00B4\x01\u0091\u00DF\u00E8Y\u00C6\x06MjH\u00F8\u0096\u00DEh)P\u00CF\u008B\u00F6\u00A2<\u00D61\u009E(\u00FA\x05/\x14\u00D8\u008E\u00DA\x18'\u00D1\x04\u00E1m\x14E5\u00881\u00C3\u00F8^\u00C6Z\u0094T\u0093\u00F01\u00E2\u00C5m\u00E5\x7Ff\u00C4X\u00F4\x1F\u00EB\u009A0C\u00AF\n\x1B\u009AC\u008C\x0Bs\u0081lc\u009Af\x05\u00A2\u00CD\u00D0\u00AE\u00CAVa\x06G\u00BFM\u009E=44f\u008B\u00FE\u00BA~\x04y\u0098\u0082.\u00E9\x06H\u00CB\u00A4\fi{C\b\u00F1\u00C0\u008D\u00AA%\u0086%\u0080\x1EI\u00F2\u00B6\x12\x12^\u00A9kh\u00EC \u00CAc\x1Dw\u00AA(\x0B\u00BA\nl\u0091\x16Fv#\u0088\x1FW\u0084\x10w \u00E3\u0080\u00DF\b\u00A0K\u0092\u00DCw\t\u00D3\x1B\u00A5\u00DF\u00D2\u00F3\u00A2\u0083(\u008Fu\u008Cg\u008A\u00B2\u00A0\u0083\u00B1\u00D0\f\u009B\x0549\x0E\u00C7pru\x19\u0086\u00A1\u00D3\u0093\u00B1\x17&\x01t8:+\tCQ3E-/\"\u00A2<\u00D61\u00EA\u00CA\u00C7\x14\u00F4\u00AD~\u0080tn\u00CD!\u00ED^,\u00CB\u00F2G2\u008E\u00EA\f\u00EB\x00}+\u00C9\u00DFIh\u00F1\u00EA}Cc\u00E7\u00A2\x1C\u00D6q?\u0095lQ\u00F0l%\u00E9\u00A5\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var checkIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\r\x00\x00\x00h\x04\x03\x00\x00\x00\u00D8\u00FCg\u00A6\x00\x00\x00\x1EPLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0F\x15\x1A\u00CD\u00CD\u00CD333\u00CD\u00CD\u00CD222\u0084\u0084\u0084'''\u00B7\x1D\u009EY\x00\x00\x00\x06tRNS\x00>f)\u00A6\u00A6\u009E\u008E\u00C9t\x00\x00\x00\u00D8IDAT(\u00CFe\u008C\u00AD\x0E\u00C30\x10\u0083\r\u00FA\u0083C*\u0095\x16\u0085\x17\u0084\x0E\u00EC\x01J\u00C6;2\\i`t\x1A\x1A\u00DC\u00E0\u00DEvwVd\u009D\x14\u00FB\u00A4ON,\u00E3F\u00ED\u00D8\u00E1\n\x1C\u0080\u00C1)\x0F\x03H\u009E2\u00AD~\u00BBS\u00F7\u00C5kr\x05N)M\u00CCfr\u009A\u00EA\u00BF]\u00CCf\u00F5\u009B\x1D\u00ED\u00BF\u00A9'^\u008B+0/Kf6\u00939\u00D7\x7F\u00BB\u0098\u00CD\u00EA7;\u00DA?S'\u009C\u00E0\n\u00EC\u0080\u00CE)w\x1DH\u009E2\u00AD~\u00B3\u00A3\u00FD\x07u\u00E0\u00E0{\u00E0\b\u008CNy\x1CA\u00F2\u0094i\u00F5\u00DB\u009D\u00BA/\u00DEWW`Y\u00D7\u00C2l&K\u00A9\u00FFv1\u009B\u00D5ov\u00B4\u00FF\u00A3>\u00F8&W\u00E0\u009C\u00D2\u00CCl&\u00E7\u00B9\u00FE\u00DB\u00C5lV\u00BF\u00D9\u00D1\u00FE\u0085\u00DA\u00B0\u00C1\x15\u00D8\x03\u00BDS\u00EE{\u0090<eZ\u00FDv\u00A7\u00EE\u00FF\x01\x01l\u00A0\u00C7\u00CF`\tp\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var ellipsis = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x03\x00\x00\x00;\f\u00BC\\\x00\x00\x006PLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0F\x15\x1A\u00CC\u00CC\u00CC5:D!$*LLL/4>5:D\u0090\u0090\u00905:D\u00CC\u00CC\u00CC\u00CC\u00CC\u00CC\u00CC\u00CC\u00CC49C\u0083\u0083\u0083(,4\u00E4\x11\u0099'\x00\x00\x00\x0EtRNS\x00>f)\u00A6\u00A6\u00A1\u0099\u0098\u0084\u0080VU7\r\u00CC\u00C8$\x00\x00\x00WIDATH\u00C7\u00ED\u00D5)\x0E\x001\fC\u00D1\u00D9\u00F7\u00E9r\u00FF\u00CB\x16%\u00C8 \u00C8j%?\u00E9\x13\u0093\u00C0L\x12\u0096>\u008Fk\x064\u00C21=\x16\u00F9\u00FA\x02h\u0084c9-\u00F2u\t\u00DB~O:\u0095o\u008Fk\x054\u00C21_\x16\u00F7z\x0F\u00BFx\u0094\u00B1\x1E\x16\u00F9\u00BA\u0084\u00ED\u00AFG\u00D5\x00x\u00A9\f\u00D7\u00CE\u00FB\x11\x1B\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var getIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u0098\b\x03\x00\x00\x00\u00D3%9\u009C\x00\x00\x01\u0098PLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0F\x15\x1A\x00\x00\x00\u00DE\u00DE\u00DE&+3\u00F6\u00F7\u00F8\u00F2\u00F3\u00F4\u00A2\u00A2\u00A2\u00DF\u00DF\u00DF\u00DF\u00DF\u00DFtux\u00B9\u00BA\u00BDXXX\u00DF\u00DF\u00DF\u0087\u0087\u0087\u00CF\u00CF\u00CF\u00EF\u00F0\u00F1\u0081\u0081\u0081\u00E3\u00E5\u00E9\u00CA\u00CA\u00CA\u00DF\u00DF\u00DF\u00DF\u00DF\u00DF\u00C2\u00C2\u00C2\u00DF\u00DF\u00DF\x1D#*xxx\u00EA\u00EB\u00EE\u00E1\u00E3\u00E5666\u00DF\u00DF\u00DF\u00DE\u00DE\u00DE\u00DE\u00DE\u00DEooo$)1\u008D\u008E\u0092*-2\u00DF\u00DF\u00DF\x1A\x1E#\x19\x1D\"',4$*1',4\r\x0E\x11',4',4\u0096\u0096\u0096%*2\u00DD\u00DD\u00DD',4\u008D\u008D\u008D\u00D2\u00D2\u00D2\u00DF\u00DF\u00DFdhpRV^$)1\u00DD\u00DD\u00DD!&.',4xxx\u00D7\u00D7\u00D7\x1D &yyy\u00D6\u00D8\u00DB\u0093\u0094\u0097\x18\x1C!\u00BC\u00BC\u00BC\x17\x1A\x1FRRR',4\x12\x14\x18\u00DD\u00DD\u00DD',4\x0B\r\x0F',4\u00DD\u00DD\u00DD\u00DD\u00DD\u00DD',4\u00DD\u00DD\u00DD',4\u00D8\u00D8\u00D8\x1D &\x1B\x1F$%*1\u00CA\u00CA\u00CA$)1\u00BB\u00BD\u00C1\u009F\u00A2\u00A8kkk\u00DD\u00DD\u00DD\u00B8\u00B8\u00B8\u00DD\u00DD\u00DD\u00DF\u00DF\u00DF\u00DD\u00DD\u00DD\u009D\u009D\u009D&*3\u00F6\u00F8\u00F9',4\x1E!(\u00BA\u00BA\u00BC\u00F3\u00F5\u00F6\u00F9\u00FB\u00FB\u00BB\u00BD\u00BD\u008D\u008E\u0091\u00F1\u00F1\u00F4\u00C5\u00C6\u00C9\u00EA\u00EB\u00EE\u00AC\u00AE\u00AFxy}\u00B6\u00B7\u00B8tuyXY\\\u00EC\u00ED\u00F0\u00EF\u00F0\u00F1\u00B8\u00B9\u00BA\u00E1\u00E3\u00E5\u00E4\u00E5\u00E7\u00B2\u00B3\u00B5\u0094\u0096\u0099dhpRV^#'0ikp\x1B\x1E%\u00AB\u00AD\u00B4\u00E1\u00E4\u00ECLOU>AH\u00E6\u00E7\u00EA\u00D6\u00D8\u00DB\u00AF\u00B0\u00B2\u00A3\u00A4\u00A7pqs\u00C7\u00C9\u00CD\u009F\u00A2\u00A8\u00C8\u00CAm\u00D5\x00\x00\x00^tRNS\x00f@)=\u00A6\u00A6\u00A6\u00A6wK0\u00A7\u00A6\u0093k\u00C9\u00BC\u00A6\u00C0\u00A6\u00AF\u0094`\u00A1\u0081G\u00B3\u00A6\u00A6~S'\x19[\u00B5\u00A6wu\u00BB\u00B0\u0094\u008ElZ&\x19\u00EC\u00E4\u00DF\u00DF\u00D1\u00C6\u00B3\u00A6\u00A6\u009A\u0091d`_\u00E6\u00E5\u00B6\u00A6\u00A6\u00A3\u0098\u0096\u008F\u0086qWWVLE!!\x15\x15\u00E9\u00E8\u00C8\u00C3\u00B6\u00AD\u00A6\u00A6\u00A4\u009D\u008EfD\u00E1\u00BF\u00DA\u00C2\x00\x00\x03\u00C7IDATH\u00C7\u00B4\u0093?k\u00C30\x10\u00C5O\x02\r\u0092\u008Alc\u009C\u00D8\x18\u00E2\u00A4\u00D0\u00AC\u00A5$\x19\n)\x1DJ\u00A1CK\u00E9\u00D0\u00A1\u00FF\u00EC\u00EF\u00FF-z\x17\u00CB/\u0081\u00D4\u0083\u0087>!Y\u00FCx\u00A7\u00C7\x1D\u0098&\u00A8m\u00DB%\u0091i{\u0099\x01\x1E\u00CEh1\u00B3\x1E\u00D2\u00CD)t\x07\u00CA\u00B5\u009F\x02\u0097\u00D5\u00B2rd(\x11*\u00AA\u00E0\u00DC\u00EDv\u00C3\u0095^\u009E\u00C9\u00CDf\\\u00EA\u009C\x03\u00A45AGx\u00C3N\x0E\u00E1M\u00E3N\u00BC\u00E9\u008C\u0099\x19@\u00A4\u00C3)=\u00CA\u00CDUU\u00E5x\tDGP{\u00D6\u00FB2BL\t\u0083\u009A \u00FD\u0087F ?}\u00A9u\x16S\u00B2\x01\u00CAW\x0EQV\u00F4P\u00DF\u009DB[\b\u00E4\u00DAw\u0081\u00FBr_Z\u009D\u00E9\u00AF\"\x06\u0095pn\u00B7\u00DBvH\u00BF\u00B4\u00DA\x16\x05\u0097Zk\x01\u00F5\u0083\u0086\u008E\u00F0\u008D\u009D\x1C\u00C2[\u008F;\u00F1\u00A6\u00CD\u00B2\"\x03D:\u009C\u00D2\u00A3\u00DClY\u0096\u0096\u0097@t\x04\u00B5g\u00BD\u00EF#\u00C4\u00940\u00A8\tCV\x7Fh\x04v]\u00B7P*\u00EDz\u00A5\x03\u0094\u00AF\x1C\u00A24\u00EF\u00A1\u00BA>\u0085!\x17\u00C8\u00B5\u00B9\u00C0E\u00BD\u00A8\u0083J\u00D5G\x1E\u0083\u00EE\u00E1\u00DCl6\u00DD\u0090~\u00F5\u00A8B\u009Esi\b\x01P](\u00E8\b\u00AF\u00D9\u00C9!\u00BC\u00D5\u00B8\x13o\u00864\u00CDS@\u00A4\u00C3)=\u00CA-\u00D4u\x1Dx\tDGPw\u00D6\u00FB\"BL\t\u0083\u009A0\u00E4\t2\u00C6\u00AC\u0088\x12\u00D3+\x19\u00E0\u00E1\u008C\u0096d\u00DEC\u00BA=\u0085\u00FE@\u00B9\u00F6[\u00E0\u00AAY5\u009E\x12\u00FA\x11*z\u0082s\u00BD^\u00E3\u00D7~\u00F5\u00E4\u00E7s.\u00F5\u00DE\x03\u0092#\u00E8\bo\u00D9\u00C9!\u00BCi\u00DC\u00897}\u0092\u00CC\x13@\u00A4\u00C3)=\u00CA\u00CD7M\u00E3y\tDG\u00909\u00EB}\x15!\u00A6\u0084A\u00FD\u008F~+#\u009F\u00DF\u00A6a(\u008E[J\u00E4\u00ED\u00D0\\\u00AA\u009E*8\u00B5\u00D3\u00BA\r\u00D0\u00B4C;\r\tm\b\u0081\x00\t!@\u00C0m\u008E\u0093ln\u00A0?\u00D2\x15\u0092\u00B6\u00EB\u00D6\u00FD\u00FE\u00B7\u00F7\u009E\x1D;>d\u0087|\"\u00DB\u00D2G_\u00FB\u00F5\u00BD2\u00C6_\x12B\u00D9\u009C#\u00AD\\r\u00DC\u00F9T\u0091mI\u00C9\u00C9\x1E\u00EE\u00FF\x14\u00D9\u00A9\u00B4pw\x1F\u00E4\u00D5uz\u009D\u0086W\u00D9\u00C5\x03Z\u00E4=\u00E1\x7F\x14\u00B3\u00D9\u008C\u0093\u009C/\u00CD$\x1C\u008D\u00C2Q\x12\u0086\u00A1\u0091d\u00E3b\u00A2)\u00E4^_&a\u00F5\u00EDd_c\u00BD\x19\u0085\x10\u00C4d\u00C4\u008B\u00EA\u0091\x01%\u00F6H\b\u00F7C!D\b\u009F\u00CF\u008B\u008E|\u008D\u0092\u009C\u0094I9%n\u00A0\u00A4\x02N\tO\u00C8\u00F9\u009C5\x1D\u00A7\x05\x07\u00F2#\u0097\fO\u0096\u00CF3\u00A3R2g\x17e\u00A2\u00C8\u00EE)J\u00B8\u00FB\x13\u00E4dz<=\u008E'Y\u00B2\u00A4y\u00A1}\u0087\u00F5\x15\u00F0w0]\u00BDy\x10\u00C5\u0083A<\u0088\u00E28F\u00A9\u00D8N\"M!wU\x12Vd'}\u008D\u00F5\u00A6\x1FC\x10\u0093 Mu\x13\u0094\x12{\u0084\u00DFy\x12\u00A7i\x1A\u00C3w\u00C2\u00F2\u008EPj\u0094dN\u0099\u0094Sb\u0086\u0096Sa\u00C8n\tO\u00C8\u00F3\u00F3\u00E0\u0085\u00EBn\u00C2\u0081|\u00CFe\u0080g\u00F0Wq\u00D9\u00912p\u00DF\u00D8RtP\u00C2\u00DD\x0E\u00C8\u009B\u00DB\u00BB\u00DB;qs\u00B9\x1Ct\u00F2Bo\u00DD\u00E0\u00BFb\u00B5Z\x05\u00BA\u00FA\u00A7\x0FC1\x1E\u008B\u00F1P\b\u0081R\u00F1n9\u00D4\x14\u00F2\u009BJ\u00C2\x1A\u00DA\u00C93\u008D\u00F5\u00E6\u0099\u0080 &A\u009A\u00EA\u00A1\x01%\u00F6\u00E8\u0082\x14\u008B\u00C5B\u00C0\x07\u00D2ttj\u00902p\u00CB\u00A4\u009CR`\u00D8t+\f\u00B9\x02\u0094\u00D2W\u0084\u00ECP\u00C5\u0086\u0096r\x7F\u00AE\u00E8\u00BEV\u0092l\u00E3\u00DEPt\x7FI\x0Bw\x0FP\x1E\x1E\x1D\x1Ey\u008Dn\u00E37Z\u00E4#\u00A1\u00CF\x14\u00BD^\u008F\u0092\u009C\u00AFN\u00DD\u00AB\u00D5\u00BCZ\u00DD\u00F3<#\u00C9\u00E7F]S\u00C8-\u0095\u0084U\u00B7\u0093\u00EB\x1A\u00EB\u00CDu\x0F\u0082\u0098\x04i\u00AA\u009B\u00A0\u0094\u00D8#!t\u00CDk\u00B7\u00DB\x1E|k4\u00EF\b\u00A5\u0081\u009A\u00DEmiM\u00C9\u00B0Sa\u00C4\u008Fm\x07Mhr\u00AC\u00D9\u00F8\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var helpIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\r\x00\x00\x00h\b\x03\x00\x00\x00\x1D\f\u008A\u00A7\x00\x00\x00~PLTE!!!\x0F\x15\x1A\u00CC\u00CC\u00CC\x00\x00\x00\r\r\rPPP\u00CE\u00CE\u00CE111333\u00CD\u00CD\u00CD<<<\u00A1\u00A1\u00A1]]][[[\u009D\u009D\u009D666KKLDDD\u00AF\u00AF\u00AFPPP\u00AF\u00AF\u00AFPPP|||\u00C6\u00C6\u00C6\u00CD\u00CD\u00CD\u00BF\u00BF\u00BF\u00B8\u00B8\u00B8\u00CD\u00CD\u00CD\x14\x14\x14333\u00CD\u00CD\u00CD222333'''\u0084\u0084\u0084\u00BF\u00BF\u00BF\u00B8\u00B8\u00B8FFF@@@zzzuuu666\x01f\u0092U\x00\x00\x00\x1EtRNSx)\x14\x00TV\x1E\x14\u00A6\u00A6V\x1E\x14\u00C8\u00BA\u00B9\u00B2\u00A6\u00A3\u00A3jj\u00E6\u00E0\u00D6\u00A6\u00A6\u008Bc!U\u00E3Z\f\x00\x00\x00\u00D6IDAT8\u00CB\u009D\u008EG\x12\u00C20\x10\x04\u0097l\x13l\u00E3@F\u00CE\x06\u00FE\u00FFA\u0096\u0083J3\u0085N\u00EA\u008B\u00AB\u00CB\u00AD\u00DA\x11\u0083\u0088Y;\u00AC\x19\u00B4\u00DD\x00\u00C6\u00E5\u00AE\u00BFPi\u0082,\u00D7\x19\u00B9\u00EF\x02\u00F0g+\u00875\u0083\u00B6\x1D\u00C0\u00B8\u00DC\u00F6g*M\u0090%:#\u00F1]@\u00A4C\u00A4\x13\u0087\u00B5\u008E\u00EC\u008D\u00C6\u00E5\u00EB\u00C4\u00EF\u0082\u00EC\u00A03\x0E\u00BE\x0B\u0088\u00C4\u0088\u00C4s\u0087\u00B5\u0098\u00EC\u0086\u00C6\u00E5\u00F5\u00CE\u00EF\u0082\u00AC\u00D4\x19\u00A5\u00EF\x02\"\r\"\u00CD\u00C2a\u00AD!\x1B\u00D1\u00B8\u009C\u00B8\f\u00B3Bg\x14\u00BE\x0B\u0088\u00D4\u0088\u00D43\u0087\u00B5\u009AlD\u00E3r\u00E22\u00CC2\u009D\u0091\u00F9. \u00D2\"\u00D2.\x1D\u00D6Z\u00B2\x0F\x18\u0094\x0F\u00FD\u00D4\\\u0086Y\u00AA3R\u00DF\x05D\"D\u00A2\u008D\u00C3Z\u0084\u00B6?\u0082A\u00F9\u00FC\u00FD\u00E22\u00CC*\u009DQ\u00F9. _\u0082\x02=\u0089\u00CD2!\u00F0\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var saveIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x03\x00\x00\x00;\f\u00BC\\\x00\x00\x00\u00EAPLTE\x00\x00\x00\x00\x00\x00\x0E\x14\x19\x00\x00\x00\x00\x00\x00\u00C2\u00C2\u00C2(+3\x00\x00\x00\u009D\u009D\u009D\u00DD\u00DE\u00DF\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00FF\u00FF\u00FF\u00FF\u00FF\u00FF\x00\x00\x00\x00\x00\x00\x00\x00\x0089=\x00\x00\x00\x05\x07\t\x1D\x1D\x1DLLL\u00D1\u00D1\u00D1\x14\x14\x14|||\u00B8\u00B9\u00BA'''\u00F5\u00F4\u00F4\u00C9\u00C9\u00C9555555\u00B5\u00B5\u00B5\u00F0\u00EF\u00EF\u0086\u0086\u0086\u00C6\u00C7\u00C7\u00DA\u00DA\u00DAKKK\u00AF\u00AF\u00AF04;\u0094\u0094\u0094\u008C\u008C\u008C\x15\x15\x15\u00D5\u00D5\u00D6\u00CD\u00CE\u00CE\f\f\f***\u00E4\u00E4\u00E4\x19\x19\x19???***MMM???***BFN\x01\x02\x03\x00\x00\x00\x04\x05\x07\u008C\u008D\u0090\u00C2\u00C2\u00C259Cttt(,4IMV@DN\u00AF\u00AF\u00AF\u00A5\u00A6\u00A6\u009E\u009E\u009E\u008F\u008F\u008FV[fiii14<\u0096\u0096\u0096___VVVddd\u00AF\u00B0\u00B4~~\u0081\u009DDH\u00AA\x00\x00\x00;tRNS\x00f)@=\u00A6\u00914\u009E\u0094$!\u0085\x7F6|\\\x18\u008EgW\u00A5i9\u00A3\u009E\u0094\u008C\x7F\x7FfB<7\u009E\u0094\x7FF\u00A6\u008F\u009E\u009E\u009A\u0094\u0094\u0090\u0080\x7FtVFC8-\u008CR\x7Fn\x7F]r\u00A5\u00DC\x00\x00\x02\x00IDATH\u00C7\u00BD\u00D6\u00C9r\u00D3@\x14\u0085a\x1C\u0090\u00E4!\u0089me`\nC\x18d\b\x10\b\t\x04\u00E8\u0096Z\u00B2\x1D9\t\u00F0\u00FE\u00AF\u00C31\u00DDu\u00FA\u00B6\u00CB\x1B\u0095U\u00F9\u00EB\u00AC\u00BE\u0085\x16\u00B77\u00BA\u00B7y\x03\u00C5\u00B6\u0088j>W\u0089\rJ\u009C\u00A9\u00AFH)\fJ<CUu\u0086/\u00F4=\x1E\u00A2\u00AA:\x148\u009B\x02\u0097\u00AD #\u00B2\x00\u009F3\u0081\tk\x0B+%\u00AA\x1C\u00F6\u0083\u0080\r\u00BA\u00BF\u00A6f8RlDT\u00D7\u00D7\u00AAc\u0083\x12\u00A7\u00EA\x0BR\n\u0083\x12OQU\u009D*\u00A8\u00C7\x14UU*pZ\x01\u0097\u00AD #\u00B2\x00\u009F2\u0081\x1D\u00D6\x16\u0086o\u00E4p\x14\u00D6\u00E8\u00C8\u009D55\u00C3a\u00CE~\x10\u00F3\u00DB\u00DB|\u00DB\x06%\u00DE\u00E4\u009FP\u009EcP\u00E2\t\u00AA\u00EB\x13|a\u00E8\u00F1\x00\u00D5\u00F5\u0081\u00C0\u009B\u00DF\u00C0e+\u00C8\u0088,\u00C0GL\u00E06k\x0B\u00EB\\T;\x1C\u00865:\u00F2\u00E6\u008D#6&F\u00F3y4\u00B0A\u0089\u00B3\u00E8\x1B\u008A\"\fJ\u00BC@Yv\x11A=\u009E\u00A3,;\x178\u009BFom!2\"\x0B\u00F0\x05\x138`ma\x16\u00892\u0087\u00E3 \u00E0\u009D\u0096hvI\u00D4WS\u00BDc\u0083\x12\u008D>BZ\x1F\x19h\u0088\u00C6`:\u00F1\u00F8\x19\x19\u0083\x11M\u00A9\u00DF\u00D8\u00CAR\u00A2K\u00A0\u00CC\u00E33&p\u0087\u00B5\u0085F\u008B\u008C\u00C3$\b\u00D8\u00A0\u00AD55\u00C3K\u00CD~\x12\u00F5\u00D5\x1F\u00DD\u00B3A\u0089\x06\b\u00D1=\x03\u00F5\u00F8\x01\x19\u0083\u00E9}\u008F\x1F\u00911\x18\x11\u00CF\u00F1\u00DAV\u0096\x12]\x02e\x1E\u009F0\u0081=\u00D6\x16\u0086o\u00E4p?\u00AC\u00D1\u0091\x1F\u00AC\u00A9\x19v\n6$\x16\u00E5\u00DF\u00A2k\u0083\x125\x10Rt5\u00D4\u00E3;\u00A45V\u00ECy|\u008F\u00B4\u00C6\u0088zQ\u00BC\u00B2-\x16\x12]\x02e\x1E\x1F3\u0081]\u00D6\x16\u00EAB\u00A4\x1D\u00EE\u00855:\u00F2\u00E6\rb\u0096\x10\u00E3\u00EF\u00BF\u00E2]\x1B\u0094\u0098\u00C6\u00C7(\u008E\u008FSh\u0088i\u008A\u00C5}\u008F\x0FQ\u009Ab\u00C4t\x02\u00FC\u00DFd\"\u00D1%P\u00E6\u00F1%\x13\u00B8\u00CB\u00DA\u00C24\x16\u00A5\u009B\u00FF{\u00FF\x03\u00E1'\u00EC\u009C\u009B\u00FB\x0E\u0090\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var settingsIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x03\x00\x00\x00;\f\u00BC\\\x00\x00\x00\u00AEPLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0F\x15\x1A\u00B3\u00B3\u00B3ms|'*.\x1E #(+/)))EEE(+/GGGGGG666ZZZ36<]]]58>]]]58><<<!$(\u00C1\u00C1\u00C1y~\u0087+.39=Chhh;?E\u00AA\u00AA\u00AAfjshhh;?E###:::\u008F\u008F\u008FTX_;;;eeeeee\u00B3\u00B3\u00B3SW^pw\u0081ms|vvv\u00C1\u00C1\u00C1\u00AA\u00AA\u00AA\u008F\u008F\u008F}\u0083\u008Ey~\u0087\u0083\u0083\u0083\\`ghlwfjsoooNQW[[[@CH\u00D90DM\x00\x00\x00(tRNS\x00>f)\u00A6\u00A6\u00EB\u00F2\u009A\u00F4\u00F1\u00EE\u00EC\u009A\u00EF\u00EC\u00E9\u00E5\u00E5\u0094\u0094\u00EE\u00F1\u00A6\u00A6\u00E8\u00E6\u00E1\u00E1\u00A6\u00A6\u0092\u0092\u00F6\u00F4\u00A6\u00A6\u009C\u00E9\u00E8H\u0088\x07\u00F0\x00\x00\x02TIDATH\u00C7\u00B5\u00D6\u00C9n\u00DB0\x14\u0085a\u00B5\u0095\u00E8I\u00F2,\u00CF\u0089\u009D\u00B4I4\u00BA\x1E\x12\u00BB}\u00FF\x17\u00EB\u00D1]\u00988\u00BA\u00B4\x01-\u00FA/\x04\u00F0\x03qIp%\u00AFq\u00EB\u0091\u00B6QR\u00AE\u00B5\u0086e\x19:4a\x1C\u00C9\u0087q]-G%\u00E3\b\u00E3`\tk\b\u0091X\u00C30N\u0092\u00DFIR\u00BF\u00AC[C\u00B7\u00EE\u00EF(Z;t\x1FzJ\u00F7\u00EBX\u00BF`\bk\u00D27G\x0F\u00F1c\u00A0q\u0090\u0094\u00EFzg\u00B7,\u00BB\u008C\u00A2\t\u00E3@\x060\u00BEW\u00CBA\u00C98\u00C08Xb\u00D5\u0093C\x12d\x15Xi\u00B7\u00FB*\u00EF>\u00A8\u009Dn\u00D5\"\u00B6\u00DF\x14hu/*H\u008A>\x04Y\u00F7]A\u00D2\u00FD\u00C7+#z\u00EF\u00C2\x04Un\u00FC\u00EE\u00E8!\u00C6}\u008D\u00FD\u00E2\x14\u00EB\u009D\u009D\u00D3\u00A9\u00C3(Z0\u00F6e\x00c\\-\u00FB'\u00C6>\u00C6\u00C1\n\u00AB\u009E\x1CR \u00AB\u00C0J;\u009D\u0097\u00A2\u00F8S\x14\u00FD\u00DA\u00E9V-b\u00FBM\u0081V/\u00A2\u0082\u00A4(\x16d\u00BDt\x04I/\u00F1\x0B#\u008A;0A\u0095\x1B\x1B\u00B7\u009Dh\u009B\u00F8\u00F3\u00AD\u00D6h>\u008F\x1C\u00EA3N\u00E4\u00C3\u00B8\u00AD\u0096\u00939\u00E3\x04\u00E3`>k\x04\u0091X\u00A3\u00E8\u00CD\u00F7\x7F\u00FA~\u00FD\u00B2n\u008D\u00DC\u00FAtG\u00D1\u00D6\u00A1O\u0091\u00A7\u00F4i\u00FB\u00A6_0\u0082\u00FD\u00D76cm\u00E3\u00FC\u00B8\u00D1j\u008EG\u00E3\u00D0\u009Cq,\x1F\u00C6Mn`G\u00C61\u00C6\u00C1rV\x03\u0091X\u008D\u0099\u00E5y\u009A\u00E7\u00F5\u00CB\u00BA\u00D5\u00B8\u00F5\u00EB\u008E\u00A2\u008DC\u00BF\u008C\u00A7\u00F4k3\u00D3/h`M\u00FA\u00E1\u00E8!\u00AE\u0086\x1A\u0087\u00D9a\u00A5w\u00F6\x0E\u0087\x1E\u00A3h\u00C68\u0094\x01\u008C\u00ABj9<0\x0E1\x0E\u0096Y\u00F5\u00E4\u0090\fY\x05V\u00DA\u00EB\u00CD\u00B2,\u00CD\u00B2a\u00EDt\u00AB\x16\u00B1\u00FD\u00A6@\u00AB\u009F\u00A2\u0082\u00A4h%\u00C8\u00FA\u00D9\x13$\u00FD\\\u00CD\x18\u00D1\u00AA\x07\x03\u00EA\u00DC\u00D8\u00FC\u009Fai4\u009A\u00F4\u00BC\u00D4;[\u00E7s\u008BQ4e42\u0080qY-\u00CD\u0099\u00D1`\x1C,\u00B5\u00EA\u00C9!)\u00B2\n\u00AC\x14\u00A5\u00E9\u00DF45\u00EAt\u00AB@\u00A5@\u00ABWQAR\u00B4\x14d\u00BD\u00B6\x04I\u00AFKAj\u00D9j5\u00FBgh\u00DCn\u00AAm\x1A,vZ\u00DB\u008BE\u00DB\u00A1\x01\u00E3T>\u008C\u00BBj9]0N1\x0E\x16\u00B0\u00B6!\x12+\n\u0082_AP\u00BFl#}\u00BE\u00A3h\u00E7\u00D0\u00E7\u00B6\u00A7\u00F4y\u00A7\u00D0\u00DB\u00B5a\r\u00FA\x07h\x15Y9\u00CE\u0098\u00B4\u0084\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var trashIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x03\x00\x00\x00;\f\u00BC\\\x00\x00\x00\u00D8PLTE\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x14\x19\x00\x00\x00\u00C3\u00C3\u00C3CHR\x00\x00\x00(+1\x00\x00\x00\x00\x00\x00\x12\x13\x16\x1F#)(+1\x00\x00\x00\x07\b\t\u0097\u0097\u0097\u00D8\u00D9\u00DA\u00F6\u00F6\u00F6\x00\x00\x00\u00F6\u00F6\u00F6\x1C &(+1\x00\x00\x00\u0088\u008A\u008C\u00C8\u00CB\u00CD\u00DD\u00E0\u00E3\u00DD\u00E0\u00E3\u00CF\u00CF\u00CF\x1A\x1C %(.AAA(+1999\u0085\u0085\u0085(+1\u00D0\u00D0\u00D0\u00D0\u00D0\u00D0zzz\u00D0\u00D0\u00D0jnv\u00D0\u00D0\u00D0~~~\u00BB\u00BC\u00BC\u00CC\u00CC\u00CC\x1D\x1D\x1DFFF\u00D0\u00D0\u00D0\x1B\x1D!%(.(+1ddd\u0096\u0097\u0097\x00\x00\x00\u00A2\u00A2\u00A2\x00\x00\x00(+1\u00A2\u00A2\u00A2\x00\x00\x00)))mmm\\\\\\\u00D0\u00D0\u00D0\u00D0\u00D0\u00D0\u00C3\u00C3\u00C3BGRuuu37>\u00CA\u00CA\u00CAlqzjnvQTZ~\u00BA:;\x00\x00\x00@tRNS\x00@f)=\u00A6\u00A6\x1B)_\x7Fn_@*Y\u009E\u0094\x7FvSK\x1A\x13\u009E\u0094\x7FSO\u00AE\u00A6\u0095\u0095\u008Dza3+rC\u00A6\x1C\u009E\u0094\x7FwV\x13\u00BD\u00B6\u00A8\u009E\u0094\u008E\x7F}mS,\x7Fi_7$\u00F2X+[\x00\x00\x02\x14IDATH\u00C7\u00C5\u00D0\u00E7\u008E\u009B@\x14\u0086a\x1C\u00C7\u00A6\u00B8\u00B7]\x17\u00DCmpw\u0092m\u00D9M\u00A3\u00B8\u00DC\u00FF\x1D\u00E5`q\u00E6\f\u00E2\u00FC\x19\x19i_!\u0090\x1E}B\u00A3\u00D1\u00B2\u00C9\u00F5 \u00BB\u009AD\u00EF\u00F6\u00AAJj{\"\u009Bf'w\u00ADAK\u00F7\u00E4\u0089\u00AD+-\u00AB4u\u00FF\u00C6X\u00D5\t\u00D7k\x06\u00E1\u00C9\x1C\u00F3y\x06s\u00B94\u00DAtvBM\u00AFb\u009AZ9&ut<hf&\u00D1\u00BB\u00BDL\u0093p\u00E6\u0089f\x02\u00BD\u0093s\u0088\u00BE\x7F\u009C\u0093g\":\u00D2\x12\x11\u00A6\u00CE\u00EF\x18\u00CD\x1A\u00E1\u00E1\u00C0 <\u0099\u00A3i2\u00D8j\u00A5qFgG\u0084j&\u00A6x\u00C9_\u0098\u00D4q\x1A@c+\u0089\u00C1\u00EDeY\u0084\u00E3@4\x16\x18\x04\u00D3}\u00F4\u00FD\x05?\u00B1\x10\u00A7\u00D2\x12\x11\u00A6St\u00ABE\u00B8\u00DF3\bO\u00E6\u00F8\u00F6\u00C6\u00E0\u00CBK\x1A\u00C7tvD\u00A8ea\u008A\u0097\u009CM\u00CB\x02\u00B4\u00D0\u0093X\u00B8\u00BDtI\x17\x05\u00D1\u0082f\u0085\u00E5Q\u0083\u00D6\u00F0\x13\u009D~HK\u009D\u00A6\u00CB\x7F1\u00EA\u008F\u0084\u00C7#\u0083\u00F0d\u008E\u00BA\u00CE\u00E0\u00C7G\x1A\x17tvB\u00EDQ\u00C7\u00B4\u00CFh\u00E2C\x13#\u0089~\x13\u00F2+\u0086<\x13\u00D1\u00D8\u00BF\u00F4\u009BQ\u00FD\u00DD\u00C5\u00AF0\u00CB\x1F\u00808}}\u008D\u00B1\"a\u00B3\u008FhH\u00D8d\u00B0\u00DF\u00BF\x0Bw;\x06/\u00974N\u00A4\u00B3S\x15\u0091\u00A6V\u009EI\x1DG>4\u00EA$\u00D1o@~\u00B9#\x10f\x18\u008C\x11\u00FDs\u00AF\x11\u00D5\u00DB\u009E\u00FD2\u00B3\u00FC\u008E\b\u00D3\u00E7\u00E7\x18\u00CB\x126z\u0088\x1D\t\x1B\f\u00F6zw\u00E1v\u00CB\u00E0\u00F9\u009C\u00C6\u0091t\u00F6\x18\u00A1\u00B2H\u00F1\u0092\u00BF2\u00A9\u00E30\u0084\u0086\u00B5$\u0086u(,\u00D5\x04\u00C2\f\u00831bx\u00ED\u00D6\u00A3\u00BA\u009BkXb\u0096\u00DF\x10a\u00FA\u00F4\x14cI\u00C2z\x17\u00B1&a\u009D\u00C1n\u00F7.\u00DCl\x18\u00BC^\u00D38\u0094\u00CE\x1E#T\x12)^r6\u00CD\u008B\u00D0\u00FC!\u0089\u00C56T4@i&\u00A2qq5hG\r\u00ECU\u00D1`\u0096?\r\u00FA\u00E3\u00FB{\u008C\u0086\u0084\u00ED\x01\u00E2\u0083\u0084m\x06\x07\u0083\u00BB\u00D0\u00B6\x19\\\u00AD\u00D28\u0097\u00CEN\x19\"M\u00A9\u00FF\u00F0+\u00D2\u0080KZb\u00FE\x00\x00\x00\x00IEND\u00AEB`\u0082";
            var chainIcon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\u00A0\b\x06\x00\x00\x00\f\u00D2Ln\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\b\u008DIDATh\u0081\u00E5Z{LSi\x16?\u00F7Za\n\u00F2\x16Juy\u008B\u00CB#(O\u009D\fC\x16\u00CC\u00B2T\x16F\x10\u00FDg\u0082\u00BA*A\u0082f\u00A2\t\u00D5\x18u\u00C9\u00C6,\u0099\u00A8\u009B\u008D\x0B1\u00E9\u00A4\u00EB\x06\u00D0\u008A\u008A\u00E9N\x10S\u00E0\u008FB,\x18\u00B7U\x10\u0086\x05QF\u00A1\u0093\u0082h)\x0F\u0081\u00E1\u00D5n\u00CE\x1DZ;Dn\u00E1\u00BB\u00DD\u00C0\u00EC\u009E\u00E4r\x1F\u00DF\u00FD~=\u00E7{\u009C_\u00CF\u00AFP&\u0093\t\u00ECi\u00B4]\u00D1\u00E0\u00BF\x00\u00C8\u00B3\u00F5BHH\u0088\u00A9\u00A0\u00A0\u0080\u00B9\u00AE\u00AA\u00AA\u0082'O\u009EP\u00C4\x1EFDD\u0098n\u00DC\u00B8\x01\x02\u0081\u00809\u00CA\u00CA\u00CA`\u00F7\u00EE\u00DD\u00AC\u0083N\u00B1MJYY\u0099\u00C9\u00D1\u00D1\x11$\u00DF\u0094\u00D7\u00E1\u00BD(-9-..\x0E\u00FE\\\u00F2\u0097\x1A\u008DZ\u00F5\u00C5\u008A=\u008C\u008B\u008B\x03\u0085B\u00C1\\k\u00D4*QWW\x17\u00F8\u00FA\u00FA\u00E2\u00AD\u00C3R}h6@\u0095J\x05}\u00FDo\u00EA^\u00BF\u00EAN[\u00D44C4)b\u00B1\u0098\x12\b\x04\u00A6\u00D0\u00D0P\u00C8\u00C9\u00C91-\u00A7\x1F\u00CD\x06x\u00FE\u00FCyS`` \u009C8q\x02=\u00FD\u00A7U\u00D3{\"\u00C0\u00E4\u00E4d\u00B8s\u00E7\x0EP4\x1F'en\u00CF\u009E=0<<\u008CM.D!;;;\u00C3\u00C0\u00C0\x00\x04\u00F8\x0B\u00D2\u008A\u008A\u008A\u0098g\u00E8-E\u00F3)\u00E2\u0085\u008D\u00D6\u00D4\u00D4d9\u00E32\x12n\n\u009A\x03.[/0(\u00AC\x1Ag{\u00EB\u00D6\u00ADP]]M>)\u00FD\u00FD\u00FD\x10\x1C\x1C\u00CC\x00\u00E0:\u00C4\u00EB\u0089\u0089\t\u00D6\x0F\u00A7\u00D9\x1Akjj`\u00EF\u00DE\u00BD\x10\u00BD=,+77\u00D7\u0094\u009F\u009F\x0Fuu\u00CC\u00A61\x11m=4\u00B1XlBP\u00B4\u00DA\u00DAZP\u00D452\u0088\u00E81|\u00C4l\x02\u00A2\u00C5'|^\u00BD0n\u00EB\x00`^\u00A3Ve-\u00F5.\u00B5\u00E636\u0085\x1B\u00C2\u009E\u0080\u00B4=\u00C1V\u0087S\u0082\u0083\u0083\u0095\u00D6\u009C\u00F2\u00F4\u00E9\u00D3\x14b\x0F\u00C3\u00C3\u00C3\u0095\u008B9E$\x12)\u00D9\u00FA\u00AC\u00C3\u00AD\u00BATcqq\u00F1\x1F0]\u0095|}E\u00DD\u00D4\u00A8z\u00ED\u00E8\u00C8\u00F3\u00CF\u00CC\u00CC\x04\u00B5\u00A6-\u00C8`\u00D07r\u00E2\u0094\u00DE\u00DE\u00AE\u00F3fN\u00A1\u0080^O\u00CC)\u00CF\u009Eu\u00B5\u008C\f\x0F%,\u00EA\u00B5\u009EhRN\u009F>\u009DR^^\u00AEDN\u00B9r\u00E5\u008Ae\u00ECLF\u00E3\x04\u0091\u0087\u00E7\u00CE\u009DS\u009A9\u00E5YG\u0097\u00DA\u00FC\u009C\u00A2igN\u009C2:>\u00A5\x06#\u00CCXq\np\u00E2\u0094\u00EDQ\u00E1\t\u00D6\u009Cb2\x1A\x7F$\x02\\\u008AS\u00F8\u00CEn\u009F\x00\u0097\u00AD\u00E7\u00EE\u00EE\u00F3\u00B8\u00EDYg\u00A3\u0099SLF\u00E3\x14WN\u0099\u00FF\u00BE\u00F7\u00F9\u009F\u00CC\u009CB\u00D14\u009F(\u00E4\u009A\u009A\x1A8~\u00FC8\x18\f\u0086\u00CF>\u00FD4V\u0089\u009C\u0082\u00CFLF\u00E34\x11\u00E0\u00CD\u009B7S\u0084B\u00A1\u00F2\u00E8\u00D1\u00A3\x16N\u0091\x7F[\u008B\u00CBg\u0096S\u0082\r\t\r\u00BF\x04F0\x02\r4\u00CE\u00F0\u00F7\u00BD\u00CF\u00FF\u00C8\tp\u00D5\x13\u00ECV{\x02\u00D2\u00F6\x04[\x1DN\u00F1\u00F6\u00F6\u0096\u00EC\u00DA\u00B5\u008B\u00B9nii\x01\u00ADV{\u00CC\x16\x05\u00C4-\u00D5(\x14\n%'O\u009E\u0084\u00E9\u00E9i\u00E0\u00F3\u00F9\u0090\u009A\u009A\no\u00DE\u00BC\u00C9\x1C\x1A\x1A\u00BAO\x04\u0098\u009D\u009D\u009D9::\n\u00B5\u00B5\u00F5O\u009F\u00BFx\u00A9\u009F\u009B\u009D\u00F6\u00D9\u00B9s'\u00F4iuA\u00E3c\u00A3\u00FF\"\u00A9\u00A4\u00A0\u00B5\u00B5\x15\u00DFr\u00D4\u00FD\u00D0W\u00AA\u00D3\u00E9`\u00E3\u00C6\u008Dl]\u0080\x15\u00B0\u00AD\u00AD\r\x06\x07\u00F5\u00ADc#\u00FA\u00C8\u009F5\x18\t\u00EB\u0094\u00DB\u00B7o\x1F+((\u0090\x04\x04\x04\u00C0\u00DD\u00BBw%\u00E6\u00E7&0\u00CE\x13y\u0098\u0091\u0091!\u00D9\u00BCy3\\\u00BBv\r\x06\u0087\u00F4\u009D\u00E6\u00E7\x14M;\x11y\x18\x1B\x1B\x0B\u008D\u008D\u008D0?O\u00B7\u00A1c;v\u00EC\x00\u009C$0\x02Y\u00FA\u00E2\u00F3\u00F9\u0098\x0B\u00C1\u00D7\u00D7+z\u00FF\u00FE\u00FD\u00CC3\u00F4\x16\u0080^G\x04h\u00B6\u009E\u009E\x1E\x1CC\u00E6\u00CC\u00E3\u00F1\u00C0i\u0083\x1BYYa6Ww\u00AF\u00EFp\f}||\u00E0\u00CC\u00993\x182\u00D9\u00A4\f\f\f\x00\u0082 \u0080\u00EE\u0087\u00BE\u00BFy{{\u00C3\u00D4\u00D4\x14\u00F6\"\x0B\u00F9\u00F1\u00E3\u00C7\u0090\u0095\u0095\u0085\u00C4\u00B4\u00DD\u00CF\u00CFW\u0092\u0091\u0091\x01\u00CD\u00CD\u00CDl]\u00C0\x16\u00E01\x0F\x0F\x0FIzz:s\u008F`\u00ED\u00ED]\u00AD@/]\u00D1S\x00\u0090\u00CF\u00FA\u0091\x00\u00B0\u00E9W\x01_1\x17F`\u008AF\u009D\u00AE\u00EF\x1A'\u00C0\u00D5\u00ADSLk\u00BD\u0092\u00A2WC\u00FB\u0092-\u00D2\u00BE\u00BEd{\u009Ffk\u008C\u0088\u0088\u0090}D\u00FB\u0092q\u00D1\u00BEd\x0B\u00DA\x17~Ar\x14\u00A5%o[\u00D0\u00BE\u00DA5j\u00D5\u00D7\\\u00EA\x14\x1E\x02Xi_\u00D3\\\u00B4\u00AF\u00F6\u00D7\u00AF\u00BAc\x16GF\u00AA}})\x10\bd\x0B\u00DA\u0097\u00F5\u00D8\u0099H\u00B5/\u0099\u0095\u00F6e\u00A9S\u00D8\u008C^\u00A6\u00F6\u00D5\u008E\u00EFZ\u00D5)\u00F3\\\u00B5\u00AFm\u008B\u00B4/\u0093\u00BD\u00B5/\u009A\u00AB\u00F6\u00F5\x04g\u00DBJ\u00FB\u00A2\u00B9\u00D6)\u00EBq\x1DZi_\u008E\\\u00B5\u00AFm\u00B9\u00B9\u00B92+\u00ED\x0B\u00B8h_\u00B2E\u00DA\x17\u00CE\u00F8\u0084F\u00AD*%\x02D\u008BO\u00F8\u00FC\u00AB\u0085\td^\u00D6\u00A8U\x7F\u0085%\u008C\u00FA\u00FF\u00CB\u00D8\u00B4\u00BD\x01y,m\u009E6\u00FA\x0E\x13m=\u00ADV\u00AB\u00C7\u00F5\u0088\u0096\u0092\u0092\u0082\u00F2\u0095\x17q\u00C8\u00BD\u00BD\u00BD\u00FA\u00E2\u00E2b\x18\x19\x19a\u008E\u00CB\u0097/\u00E3\u00F7\x1B=[\x1F\x1E[#z\u0086\u00A5EQQ\x11\u00E3UEE\u0085\x1E\x17wbb\"\u0099\u0087\u00ED\u00ED\u00ED\f\u00AF\u0098\u00CD\u00CF\u00CF\x0F\x06\x07\x07\u00D9\u00BA\x00+`||<\u008E\u009B\u0097\u00C1``\rs\u00D9!\x17\x16\x16z\u0095\u0094\u0094\u00E8_\u00BE|\t\x07\x0E\x1CX\x16(\u00CD\u00D6\u0088c\u0086)L,\x163\u009Er\x06\u00D4h4\u0090\u0096\u0096fY*\u008F\x1E=\x02OOO\u00F2\u0090\u00DF\u00BF\x7F\x0F\u00EE\u00EE\u00EE\u00A0T*\u00F5\u0095\u0095\u0095\u00CC3\u00F4\u0096\x18\u00D0l\u00D1\u00D1\u00D1\u0096\u00F3\u00CC\u00CC\u0092u\u00E3\u00F2\u00F7\u00B2\u0087\u0087\u0087\x17\u008E!\u008E\u00E7\u00D9\u00B3g\u00C9\x01\u00FD\u00FD\u00FD\u00B1\u0082\u00B7\u00DC\x0F\r\r\u00C1\u0086\r\x1B\u00C8CNLL\u0084[\u00B7n\u0081\u008B\u008B\u008B\u00DE\u00C1\u00C1\x01\u00EE\u00DD\u00BB\u00C7\u0090?\u009BQ,\x19\u009B\u0099\u00CE\u00AA\u00AA*}}}=\u00F3\x00\u00C1\x0E\x1E<\u00E8\u00C5\u0096m([\u0080,\u00B6b\u00C05R\u00A7\u00B8yo\n\u00FFerJ\u00FE\u00D1\u00C3\u00FEl\x1D\u00BF\u00F9\u00FB?\u00FA\u0089<\u00FC\u00FD\u00EE4\u0085\u00D3'\x0E\u00CC\u0091\u00F2\u009B\u00A4\u009F~i`1\u009A\u00AD\u00F1w\u00BF\u00DD\u00A5\u00C0\u00DAd||\u009C9\u00AE_\u00BF\x0E\u00B1\u00D1\u00DB\x14\u00C4\u0080J\u00A5\x12+)X\u00B7\u00DEQ\u0084\u00C7\u008E\u0084\x04\u00CB\u0097O\"\u00C0\u009E\u009E\x1E\u0088\u008C\u00FC\u00A0R\u00F9\n\u0085\u00F0\u00EE\u00DD;r\u00C0\u00C8\u00C8H\u00E8\u00E8\u00EC\x12\u00ED\u00CF\u00C9\u00B69v\u00CB\x02\u009C\u00FCqF4?;\u00AD\u00B8t\u00E9\x12DE\u0086+8\x03z{\u00BA+\u00B0\n8r\u00E4\b\u00E3)g\u00C0\u00EF:;\u0099\x14\u00A6lz(2\u00CB\x7Fnnn\u00E4\u0080\u0093\u0093\u0093\u00E0\u00EA\u00EA\u00CA\u0084\u00FB\u00AA\u00F7\u0085\x023vNN\x0EwN\t\x0B\x0B\u00B3\u009Cggg\u00B9\x03\u00DE\u00BD'gBvssS \u00FB\x05\u0085\u0084\u0092\u0085,\x14\nA\u00AF\u00FF\u00B0\u00EE\u0086\u00F5zprZR\u008B\u00B4\r\x18\x1B\x13\x03\u00CD\u00CD-\u00B0%8P\x11\u00F1\u00EBPE}C\x03\u00C4\u00C4\u00FCD\u00A9D!\u00FF\u00FB\u00F9\x0BQb\u00E2g\u008A\u0086\u0086\x06\u00E6\x1E\u00B7\u009En\u00F0\u00AD\u0088\u00D3\x18\u00EA\x06\u00DF\u008A\u00CCc\u00F6vx\u00E4\x7F cS\x00\u0090\u00F4\u00CB\u00E4\u0094\u00A4\u00A4$\u00D6/\u0098\x0F\x1F>\u00D4\x13\u00CD\u00B2X,\u0096\u00E3\u00EF(f\u00A1\u00BC\u00B4\u00B44\u009B8\u00E4S\u00A7N\u00C9%\x12\t\u008C\u008D\u008D1Gyy9\x1C>|X\u00CE\u00D6\u0087\u00C7\u00D6\u0088\"\u00EE\u0096-[\u00F0?\x07\x18\u00AFRSS\u00E5\u009C8\u00A5\u00BB\u00BB\u00FB\u00E7\u009C\u00E2\u00EB\u00CB\u008DS\u00A2\u00A2\u00A2\u00A0\u00B2\u00B22\u00FB\u00C2\u0085\x0B\u00ACa.\x1B\u00B0\u00B9\u00B99;**J~\u00F5\u00EAU\u00ACS\u00E4\u009C\x01SSS\u00E5\u00F8\u00B3\u00D1\u00A1C\u0087\x18O9\x03vtt\u00E0z\u00B4,\x15\u00E4\x14,38q\u008A\u008B\u008B\x0B\x13\u00AE\u00AB\u00AB\u00AB\u00BC\u00AF\u00AF\x0FPP\u00E3L\x01\u0081\u0081\u0081\f\x10\u009E\u00E7\u00E6\u00E6\u00B8\x03^\u00BCx\u0091\t\u00B9\u00B0\u00B0P\u008E\"/\u009B\u00D1\u00B69\u00E5\u00C3\u0096\u00C5\u00AA\u00DE\x16\u00A7\u00F0\u00D8\x1A\u00B1\u00F8\u00BE\x7F\u00FF>\u00EC\u00DB\u00B7O\u008Eu\n\u00EA^\u00F8\u00CB\u00E3\u0083\x07\x0F\u00C8\x00e2Yvzz\u00BA\u00DC\\\u00A7,\u0080e\x13%\u00D8$\u00C2\u00F4E\u00AD\u00F9\u008CM\u00AD\u00F9J\u008A\u00C7\u00D2\u00C6\u00BE\u00E0\x00&W\n\u00C8\u0098V\u00AB\u0095.\u00D2\u00BE\u00F2\u0080\u0083\u00F6%\u00FD\u0088\u00F6%\u00B5\u0087\u00F6\u0095\u0087\u00F7\x15\x15\x15\u00D25\u00A9}\u00E5\x19\f\x06\u00D60W\u00A2}\u00E5\u0095\u0094\u0094H\x17\u00B4/\u00A9=\u00B4/\u00A9\u0095\u00F6\u0095gO\u00ED+\u00CF\u00DE\u00DA\u0097t\u00CDk_y8\u0086kZ\u00FB\u0092\u00DAC\u00FBr\u00C2?UUU\u00D2E\u00DAW\x1E[\u00B6\u00A1l\x01\u00B2\u00D8\u008A\x01\u0089\u00CC\u00EE\x19\u00FB?/\u00D8\x0E6tZ\u00A3\t\x00\x00\x00\x00IEND\u00AEB`\u0082";

            try {location = _prefs.location} catch(_){};
            preferredSize = [_wW,385];
            minimumSize = [_wW,385];
            margins = [5,5,5,15];
            spacing = 15;
            with (w.grp1 = add( "group", undefined, undefined )) {
                preferredSize.width = minimumSize.width = _wW - 5;
                alignment = ["fill", "top"];
                alignChildren = ["fill", "top"];
                margins = [5,5,5,0];
                spacing = 5;
                with (w.grp1.txt_info = add( "statictext", undefined, localize({en: 'Selection: ', de: 'Auswahl: '}), {multiline: "true", } )) {
                    preferredSize = minimumSize = [_wW - 60,42];
                    w.grp1.txt_info.needs_update = true; // custom bool
                }
                createButton ("but_set", settingsIcon, ["right", "top"]);
            }
            // main stack	
            with (w.p = add( "panel", undefined, undefined )) {
                orientation = "stack";
                preferredSize.width = minimumSize.width = _wW - 5;
                alignment = ["fill", "top"];
                alignChildren = ["fill", "center"];
                margins = 5;
                spacing = 5;
                // settings panel
                with (w.p.s = add( "group", undefined, undefined)) {
                    orientation = "column";
                    preferredSize.width = minimumSize.width = _wW - 25;
                    alignment = ["fill", "top"];
                    alignChildren = ["fill", "center"];
                    margins = [0,0,0,0];
                    spacing = 0;
                    visible = false;
                    createSetting("c","autoRev", localize({en: 'Automatically switch last runs styles (quick back and forth comparisons)', de: 'Automatisch letzte \'Finde\'- und \'Ändere\'-Stile umkehren (schnelle Vergleiche)'}), !_prefs.autoFind);
                    createSetting("c","autoFind", localize({en: 'Use \'change\'-styles as \'find\'-styles after each run (quick tests)', de: 'Automatisch letzte \'Ändere\'-Stile als \'Finde\'-Stile einsetzen (schnelle Tests)'}),  !_prefs.autoRev);
                    createSetting("c","startFind", localize({en: 'Start with find/next style from current selection', de: 'Starte mit Finde-Folge aus aktueller Selektion'}), true);
                    createSetting("c","useLayer", localize({en: 'Use active layer instead of document (if no selection)', de: 'Arbeite auf aktueller Ebene anstelle Dokument (wenn Auswahl leer)'}), true);
                    createSetting("b","remLbl", localize({en: 'Remove all (pSc-)script labels from this document', de: 'Entferne alle (pSc-)Skript-Etiketten aus dem Dokument'}), true, checkIcon);
                    createSetting("b","getOldLbl", localize({en: 'Import script label from last version', de: 'Importiere Skript-Etikett aus letzter Version'}), true, helpIcon);
                    createSetting("b","butHelp", localize({en: 'Readme', de: 'ReadMe (English)'}), true, helpIcon);
                }
                // main panel
                with (w.p.m = add( "group", undefined, undefined )) {
                    orientation = "column";
                    preferredSize.width = minimumSize.width = _wW - 25;
                    alignment = ["fill", "top"];
                    alignChildren = ["fill", "center"];
                    margins = [0,0,0,10];
                    spacing = 5;
                    visible = true;
                    with (w.p.m.grpQ = add( "group", undefined, undefined)) {
                        preferredSize.width = minimumSize.width = _wW - 45;
                        alignment = ["fill", "top"];
                        alignChildren = ["fill", "center"];
                        margins = [0,0,0,0];
                        spacing = 5;
                        with (w.p.m.grpQ.selQtitle = add( "statictext", undefined, localize({en: 'Query: ', de: 'Abfrage:'}) )) {
                            preferredSize.width = minimumSize.width = maximumSize.width = 50;
                        }
                        with (w.p.m.grpQ.selQ = add( "dropdownlist").load([new QL_item ()])) {
                            selection = 0;
                            preferredSize.width =minimumSize.width = _wW - 125;
                            maximumSize.width = 280;
                        }
                        createButton ("saveQ", saveIcon);
                        createButton ("delQ", trashIcon);
                    }
                    // Chain selection group
                    with (w.p.m.grpChain = add( "group", undefined, undefined)) {
                        preferredSize.width = minimumSize.width = _wW - 45;
                        alignment = ["fill", "top"];
                        alignChildren = ["fill", "center"];
                        margins = [0,0,0,20];
                        spacing = 5;
                        with (w.p.m.grpChain.selChainTitle = add( "statictext", undefined, localize({en: 'Chain: ', de: 'Kette:'}) )) {
                            preferredSize.width = minimumSize.width = maximumSize.width = 50;
                        }
                        with (w.p.m.grpChain.selChain = add( "dropdownlist", undefined, [localize({en: '[- No Chain -]', de: '[- Keine Kette -]'})])) {
                            selection = 0;
                            preferredSize.width = minimumSize.width = _wW - 125;
                            maximumSize.width = 280;
                        }
                        createButton ("editChain", chainIcon);
                        createButton ("delChain", trashIcon);
                    }                
                    createDD("ffp", localize({en: 'Find style:', de: 'Finde Format:'}), nameOfAnyStyle);
                    createDD("fsp", localize({en: 'followed by:', de: 'gefolgt von:'}), nameOfAnyStyle);
                    with (w.p.m.grpSwitch = add( "group", undefined, undefined)) {
                        preferredSize.width = minimumSize.width = _wW - 45;
                        margins =10;
                        spacing = 20;
                        alignment = ["center", "top"];
                        alignChildren = ["center", "center"];
                        createButton ("but_c2f", arrowsUpIcon);
                        createButton ("but_sw", arrowsSwitchIcon);
                        createButton ("but_f2c", arrowsDownIcon);
                    }
                    createDD("cfp", localize({en: 'Change to:', de: 'Ändere in:'}), nameOfDontChange);
                    createDD("csp", localize({en: 'followed by:', de: 'gefolgt von:'}), nameOfDontChange);
                } // end main panel
            }
            with (w.but_do = add( "button", undefined, localize({en: 'Do it!', de: 'Ausführen!'}))) {
                preferredSize.width = _wW - 50;
            }
        }
    } // End if (!w)
    
    var ff = w.p.m.grpffp.ffp;  // References for readability
    var fs = w.p.m.grpfsp.fsp;
    var cf = w.p.m.grpcfp.cfp;
    var cs = w.p.m.grpcsp.csp;
    var ql = w.p.m.grpQ.selQ;
    
    // ===========================================
    //   Behaviour 
    // ===========================================
    
    // When user opens a style dropdown while in chain mode, exit chain mode
    var ddActivateHandler = function() {
        if (_chainModeActive) {
            log('DD onActivate: exiting chain mode because user opened a dropdown');
            // Remove chain mode items before the dropdown opens
            removeChainModeItems();
            _chainModeActive = false;
            // Re-enable SaveQ button
            w.p.m.grpQ.saveQ.enabled = true;
            // Re-enable switch buttons
            w.p.m.grpSwitch.but_f2c.enabled = true;
            w.p.m.grpSwitch.but_sw.enabled = true;
            w.p.m.grpSwitch.but_c2f.enabled = true;
            // Reset chain dropdown
            w.p.m.grpChain.selChain.selection = 0;
            ql.selChain = 0;
            w.p.m.grpChain.delChain.enabled = false;
            // Restore cached state
            if (_cachedDDState) {
                _stopCalls = true;
                updateDDs(_cachedDDState);
                _stopCalls = false;
            }
            _cachedDDState = null;
        }
    };
    ff.onActivate = ddActivateHandler;
    fs.onActivate = ddActivateHandler;
    cf.onActivate = ddActivateHandler;
    cs.onActivate = ddActivateHandler;
    
    w.onShow = function () 
    { 
        pSC_prep();
        updateSelectionInfo();
        // start with fetching the current selection styles into FFP/FSP, if it's a preference
        if (_prefs.startFind) w.p.m.titlefsp.but_getfsp.notify(); 
    }
    // ===========================================
    w.onClose = function() 
    {
        storeDDs();
        pSC_stop(); // Unload eventhandlers and dialog
    }
    // ===========================================
    w.onResize = function() 
    {  
        w.layout.resize ();
    }
    // ===========================================
    w.onMove = function()
    {
        _prefs.location = [w.location[0],w.location[1]];
    }
    // ===========================================
     w.onActivate = function() 
     {
        updateSelectionInfo();
         _isActive &&  log('onActivate: ... STOP (is already active)');
         if (!_isActive) {
            _inDDactionFlag && log('onActivate: ... prohibitted by inDD');
            if (!_inDDactionFlag) {
                log('onActivate: ... START (comming from non-active state)');
                
                // If in chain mode, skip DD updates but still update query list and check for doc changes
                if (_chainModeActive) {
                    log('onActivate: in chain mode - skipping DD updates');
                    if(docChanged()) {
                        _docChanged = true;
                        _cachedSignatures = getSignatures();
                        installLayerEvent();
                        log('onActivate: docChanged in chain mode ... call updateQL()');
                        _stopCalls = true;
                        updateQL();
                        _stopCalls = false;
                        // Re-enter chain mode to restore "[-Chain-]" display after updateQL
                        // (updateQL might have reset chain selection)
                        var chainIdx = ql.selChain || 0;
                        if (chainIdx > 0) {
                            w.p.m.grpChain.selChain.selection = chainIdx;
                        }
                    }
                    _firstRun = false;
                    _docChanged = false;
                    _isActive = true;
                    log('onActivate: END (chain mode, _isActive now: ' + _isActive + ')');
                    return;
                }
                
                // The IF inhibits useless calls and inhibits running twice - secondary dialogs in SaveQ would cause de- and activations,
                // also task switching out of  and into inDesign calls activation twice etc... 
                if(docChanged()) {
                    _docChanged = true;
                    _cachedSignatures = getSignatures();
                    installLayerEvent();
                    log('onActivate: docChanged ... call updateQL() (prohibit sqlQ.onChange');
                    _stopCalls = true;
                    updateQL();
                    _stopCalls = false;
                    
                    var q = ql.selection.get();
                    log('onActivate: docChanged ... call updateDDs(q:' + q.name + ')');
                    updateDDs(q.set);
                }
                if((stylesChanged(_cachedSignatures) && !_docChanged) || shouldUpdateNames()) {
                    log('onActivate: styles did change or names need update - calling matchRenamed');
                    matchRenamed(); // matchRenamed will call updateDD too.
                }
                if (_firstRun && _prefs.startFind) { 
                // get styles from document immediatly if this setting is used.
                    w.p.m.titlefsp.but_getfsp.notify();
                }
                _firstRun = false;
                _docChanged = false;
                _isActive = true;
                log('onActivate: END (_isActive now: ' + _isActive + ')');
            }
        }
    }
    // ===========================================
    w.onDeactivate = function()
    {
        _isActive= false;
        _inDDactionFlag = false;
    }
    // ================== settings  =====================
    w.grp1.but_set.addEventListener("click", function()
    {
        w.p.s.visible = w.p.m.visible;
        w.p.m.visible = !w.p.s.visible;
        w.but_do.enabled = w.p.m.visible;
	});
    // ============== user combo dropdown =============
    w.p.m.grpQ.selQ.onChange = function()
    {
        try {
            log('selQ.onChange: setting inDDaction : ' +(_inDDactionFlag = true)); // opening the Dropdown call w.onDeactivate, so we force active state
            _inDDactionFlag = true;
            if (ql.selection) {
                w.p.m.grpQ.delQ.enabled = ql.selection.index > 0;
                 if (!_stopCalls && ql.selection.index == 0) {
                     log('selQ.onChange: 0 . Doing nothing');
                 }
                if (!_stopCalls && ql.selection.index > 0) {
                    // Block DD onChange handlers from resetting ql.selection during chain mode exit
                    _stopCalls = true;
                    // User selected a query: deactivate chain mode
                    if (_chainModeActive) {
                        exitChainMode();
                    }
                    // Reset chain dropdown to "No Chain"
                    w.p.m.grpChain.selChain.selection = 0;
                    ql.selChain = 0;
                    w.p.m.grpChain.delChain.enabled = false;
                    
                    var q = ql.selection.get();
                    log('selQ.onChange to: "' + q.name + '". Calling updateDD(q.set) ...');
                    updateDDs(q.set);
                    _stopCalls = false;
                    storeDDs();
                }
            }
        }
        catch(e) {
            _stopCalls = false; // Ensure flag is reset on error
            log('Error in Select Q: ' +'\n'+ e.toString()+'\r'); return;
        }
    }
    // ============ save combo button ================
    w.p.m.grpQ.saveQ.addEventListener("click", function()
    {
        function getValidName (list, s, title) { 
        // Return a valid listItem name or null - taken from Peter Kahrel's GrepQuery Manager. Thx, Peter!!!
		var w1 = new Window ("dialog", title, [w.location.x, w.location.y + w.size.height/2, undefined, undefined], {closeButton: false});
			var gr = w1.add("group");
				gr.add("statictext", undefined, localize({en: 'New name: ', de: 'Neuer Name: '}))
				var e = gr.add ("edittext", undefined, s);
				e.characters = 30; e.active = true;
			var buttons = w1.add("group"); buttons.alignment = "right";
				buttons.add("button", undefined, localize({en: 'OK', de: 'OK'}), {name:"ok"});
				buttons.add("button", undefined, localize({en: 'Cancel', de: 'Abbrechen'}), {name:"cancel"});
            w1.layout.layout(true);
            w1.center(w);
            if (w1.show()==1) {
                var list_item = list.find (e.text);
                if (list_item == null) 
                    return e.text;
                if (list_item.index != 0) {
                    if (askYN (localize({en: 'Overwrite %1?', de: '%1 überschreiben?'}, e.text)))
                        return e.text;
                }
                else { title = localize({en: 'Please choose another name', de: 'Bitte anderen Namen wählen'});}
                return getValidName (list, s, title); // Peter, your recursive patterns are so smart!
            }
            else return null;
        }
        try {
             _stopCalls = true;
            var s0 = ql.selection.get().name;
            var s = getValidName (ql, s0, localize({en: 'Save combination', de: 'Speichere Kombination'}));
            if (s != null) {
                var a = ql.getData();
                var i = 1; // start 1: never add in front of the default entry
                while (i < a.length && s.toLowerCase() > a[i].name.toLowerCase()) 
                    i++;
                var q = new QL_item(s , getCurrentDDs());
                // if new item has the same name (i.e user was asked to overwrite), 
                // then delete the old item, when splicing in the new one
                // log('SaveQ: at' + i + ' | Name: ' + s + ' | Set(Current selections): ' + q.toSource());
                a.splice(i, (i != a.length && s == a[i].name)?1:0, q); 
                ql.resync();
                log('saveQ(): setting selQ to: ' + a[i].name);
                ql.selection = ql.find(s);    
                storeDDs();
            }
            _stopCalls = false;
        }
        catch(e) {
            log('Error in Save Q: ' +'\n'+ e.toString()+'\r'); return;
        }
	});
    // ========== delete combo button =============
    w.p.m.grpQ.delQ.addEventListener("click", function()
    {
        _stopCalls = true;
		if (ql.selection != null && askYN (localize({en: 'Delete %1', de: 'Lösche %1'}, ql.selection.get().name))) 
        {
            try {
                log('DelQ ...');
                var a = ql.getData();
                var i = ql.selection.index;
                a.splice(i, 1);
                ql.resync(a);
                log('DelQ: Setting SelQ to 0 after delete');
                ql.selection = 0;
                storeDDs();
            }
            catch(e) {
                log('Error in Delete Q: ' +'\n'+ e.toString()+'\r'); return;
            }
        }
        _stopCalls = false;
	});
    // ============ Chain UI Event Handlers ============
    w.p.m.grpChain.selChain.onChange = function() {
        if (!_stopCalls) {
            var idx = w.p.m.grpChain.selChain.selection ? w.p.m.grpChain.selChain.selection.index : 0;
            ql.selChain = idx;
            w.p.m.grpChain.delChain.enabled = idx > 0;
            
            if (idx > 0) {
                // User selected a chain: enter chain mode
                enterChainMode();
            } else {
                // User selected "No Chain": exit chain mode
                if (_chainModeActive) {
                    exitChainMode();
                }
            }
            storeDDs();
        }
    };
    w.p.m.grpChain.editChain.addEventListener("click", function() {
        var selIdx = w.p.m.grpChain.selChain.selection ? w.p.m.grpChain.selChain.selection.index : 0;
        var chainToEdit = (selIdx > 0 && ql.chains && ql.chains[selIdx - 1]) ? ql.chains[selIdx - 1] : null;
        var result = chainEditor(chainToEdit);
        if (result) {
            if (chainToEdit) {
                // Update existing chain
                ql.chains[selIdx - 1] = result;
            } else {
                // Add new chain
                if (!ql.chains) ql.chains = [];
                ql.chains.push(result);
            }
            refreshChainDropdown();
            // Select the edited/new chain
            var newIdx = chainToEdit ? selIdx : ql.chains.length;
            w.p.m.grpChain.selChain.selection = newIdx;
            ql.selChain = newIdx;
            // Enter chain mode for the new/edited chain
            enterChainMode();
            storeDDs();
        }
    });
    w.p.m.grpChain.delChain.addEventListener("click", function() {
        var selIdx = w.p.m.grpChain.selChain.selection ? w.p.m.grpChain.selChain.selection.index : 0;
        if (selIdx > 0 && ql.chains && ql.chains[selIdx - 1]) {
            var chainName = ql.chains[selIdx - 1].name;
            if (askYN(localize({en: 'Delete chain "%1"?', de: 'Kette "%1" löschen?'}, chainName))) {
                // Exit chain mode before deleting
                if (_chainModeActive) {
                    exitChainMode();
                }
                ql.chains.splice(selIdx - 1, 1);
                refreshChainDropdown();
                w.p.m.grpChain.selChain.selection = 0;
                ql.selChain = 0;
                w.p.m.grpChain.delChain.enabled = false;
                storeDDs();
            }
        }
    });
    // ============ switch styles buttons ============ 
    w.p.m.grpSwitch.but_f2c.addEventListener("click", function()
    {
         log('copy find styles to change styles ...');
        _stopCalls = true;
        ql.selection = 0;
        updateDDs({cfp:ff.selection.get(), csp:fs.selection.get()});
        storeDDs();
        _stopCalls = false;
	});
    w.p.m.grpSwitch.but_sw.addEventListener("click", function()
    {
         log('switch find and change styles ...');
        _stopCalls = true;
        ql.selection = 0;
        updateDDs({ffp:cf.selection.get(), fsp:cs.selection.get(), cfp:ff.selection.get(), csp:fs.selection.get()});
        storeDDs();
        _stopCalls = false;
	});
    w.p.m.grpSwitch.but_c2f.addEventListener("click", function()
    {
         log('copy change styles to find styles ...');
        _stopCalls = true;
        ql.selection = 0;
        updateDDs({ffp:cf.selection.get(), fsp:cs.selection.get()});
        storeDDs();
        _stopCalls = false;
	});
    // =========== quick anyStyle buttons ============
    var but_anyClickHandler = function(ev)
    {
        // Exit chain mode if active (user intent is to modify dropdowns)
        if (_chainModeActive) {
            _stopCalls = true;
            exitChainMode();
            w.p.m.grpChain.selChain.selection = 0;
            ql.selChain = 0;
            w.p.m.grpChain.delChain.enabled = false;
        }
        var dd = this.parent.children[1]; // the corresponding dropdown ffp, fsp, cfp, csp.
        if (!dd.selection.index || dd.selection.index != 0) {
            _stopCalls = true; 
            dd.selection = dd.find((dd.name ==="ffp"||dd.name ==="fsp")?nameOfAnyStyle:nameOfDontChange);
            ql.selection = 0;
            _stopCalls = false;
            storeDDs();
        } else {
            _stopCalls = false;
        }
    }
    w.p.m.grpffp.but_anyffp.addEventListener("click", but_anyClickHandler);
    w.p.m.grpfsp.but_anyfsp.addEventListener("click", but_anyClickHandler);
    w.p.m.grpcfp.but_anycfp.addEventListener("click", but_anyClickHandler);
    w.p.m.grpcsp.but_anycsp.addEventListener("click", but_anyClickHandler);

    // ============ get styles buttons ================
    var getStylesClickHandler = function(ev)
    {
        var dd = this.parent.name; // the groups custom-value 'name': either 'fsp' or 'csp'.
        log('Fetch current style(s) from doc');
        
        // Exit chain mode if active (user intent is to modify dropdowns)
        if (_chainModeActive) {
            _stopCalls = true;
            exitChainMode();
            w.p.m.grpChain.selChain.selection = 0;
            ql.selChain = 0;
            w.p.m.grpChain.delChain.enabled = false;
        }
        
        if(_o.ps.length > 0) {
            _stopCalls = true; 
            if (dd === "fsp") {
                ff.selection = ff.find(getNestingPath((_o.cp && _o.cp[0].appliedParagraphStyle) || _o.ps[0].appliedParagraphStyle));
                fs.selection = (_o.cp || _o.ps.length === 1) ? fs.find(nameOfAnyStyle) : fs.find(getNestingPath(_o.ps[1].appliedParagraphStyle));
            }
            if (dd === "csp") {
                cf.selection = cf.find(getNestingPath((_o.cp && _o.cp[0].appliedParagraphStyle) || _o.ps[0].appliedParagraphStyle));
                cs.selection = (_o.cp ||_o.ps.length === 1) ? cs.find(nameOfDontChange) : cs.find(getNestingPath(_o.ps[1].appliedParagraphStyle));
            }
            ql.selection = 0; // setting to [custom] without updateDDs
            storeDDs();
            _stopCalls = false;
        } else {
            _stopCalls = false;
        }
    }
    w.p.m.titlefsp.but_getfsp.addEventListener("click", getStylesClickHandler);
    w.p.m.titlecsp.but_getcsp.addEventListener("click", getStylesClickHandler);
    
    // ============ the main dropdowns ==============
    ff.onChange = fs.onChange = cf.onChange = cs.onChange = function()
    {
        _inDDactionFlag = true;
        updateDoButtonEnabled();
        if (this.selection == 0) { // making it so complicated because of double onChange calls :(
            !w.p.m["title"+this.name].alert.visible && w.p.m["title"+this.name].alert.visible = this.selection.get().notFound;
        }
       else {
            w.p.m["title"+this.name].alert.visible && w.p.m["title"+this.name].alert.visible = false;
        }
       if (!_stopCalls) {
            log('User changes "'  + this.name + '". Setting selQ to 0');
            _stopCalls = true;
            ql.selection = 0; // setting to query to [custom] without updateDDs()
            _stopCalls = false;
            storeDDs();
        }
    }
    // ============ settings: checkboxes ============
    w.p.s.useLayer.c.onClick = w.p.s.autoRev.c.onClick = w.p.s.autoFind.c.onClick = w.p.s.startFind.c.onClick = function() 
    { 
        _prefs[this.parent.name] = this.value;
        if (this.parent.name === "useLayer") updateSelectionInfo();
        if (this.parent.name === "autoFind") w.p.s.autoRev.c.enabled = w.p.s.autoRev.t.enabled = !w.p.s.autoFind.c.value;
        if (this.parent.name === "autoRev") w.p.s.autoFind.c.enabled = w.p.s.autoFind.t.enabled = !w.p.s.autoRev.c.value;
    }
    // ============ LABELS ============
    // Gemeinsame Hilfsfunktionen für Label-Operationen
    var LabelUtils = {
        findLabels: function(doc, currentVersion, findAll) {
            var results = [];
            var testVersion = parseFloat(currentVersion);
            
            // Bei findAll mit aktueller Version beginnen
            // Bei !findAll mit der vorherigen Version beginnen
            if (!findAll) {
                testVersion = parseFloat((testVersion - 0.01).toFixed(2));
            }
            
            while (testVersion >= 2.00) {
                var labelName = ScriptName + testVersion.toFixed(2) + "DDs";
                try {
                    var content = doc.extractLabel(labelName);
                    if (content !== "") {
                        results.push({
                            name: labelName,
                            version: testVersion,
                            content: content
                        });
                        // Bei Suche nach älterem Label nach erstem Fund abbrechen
                        if (!findAll) break;
                    }
                } catch(e) { // no label found, continue
                }
                testVersion = parseFloat((testVersion - 0.01).toFixed(2));
            }
            return results;
        },
        
        removeLabels: function(doc, labelNames) {
            app.doScript(
                function() {
                    for (var i = 0; i < labelNames.length; i++) {
                        doc.insertLabel(labelNames[i], "");
                    }
                },
                undefined,
                undefined,
                UndoModes.ENTIRE_SCRIPT,
                localize({
                    en: 'Remove script labels',
                    de: 'Skript-Etiketten entfernt'
                })
            );
        }
    };
    // ====== settings: remove label =======
    w.p.s.remLbl.c.addEventListener("click", function() {
        if (askYN(localize({
            en: 'Really remove the script labels with all saved queries?',
            de: 'Wirklich alle Skript-Etiketten dieses Skripts löschen?'
        }))) {
            var ad = app.activeDocument;
            var foundLabels = LabelUtils.findLabels(ad, ScriptVersion, true);
            var labelsToRemove = [];
            
            // ES3-kompatible Schleife statt map
            for (var i = 0; i < foundLabels.length; i++) {
                labelsToRemove.push(foundLabels[i].name);
            }
            
            // Aktuelles Label hinzufügen falls noch nicht gefunden
            var hasCurrentLabel = false;
            for (var j = 0; j < labelsToRemove.length; j++) {
                if (labelsToRemove[j] === _scrLbl) {
                    hasCurrentLabel = true;
                    break;
                }
            }
            if (!hasCurrentLabel) {
                labelsToRemove.push(_scrLbl);
            }
            
            // Labels löschen
            LabelUtils.removeLabels(ad, labelsToRemove);
            
            // Feedback mit Anzahl der gelöschten Labels
            w.grp1.txt_info.text = localize({
                en: 'Script labels removed (' + labelsToRemove.length + '). Save and close the document now.',
                de: 'Skript-Etiketten entfernt (' + labelsToRemove.length + '). Jetzt Dokument speichern und schliessen.'
            });
            
            log('Removed ' + labelsToRemove.length + ' script labels... calling updateDDs()');
            updateDDs();
            w.but_do.enabled = false;
        }
    });

    // ====== settings: get old label =======
    w.p.s.getOldLbl.c.addEventListener("click", function() {
        // Create document selection dialog
        var docDialog = new Window("dialog", localize({
            en: "Import Script Settings",
            de: "Skript-Einstellungen importieren"
        }), undefined, {closeButton: false});
        
        with(docDialog) {
            alignChildren = ["fill", "top"];
            spacing = 10;
            margins = 16;

            // Add header text
            add("statictext", undefined, localize({
                en: "Import latest User-Queries from:",
                de: "Importiere neueste User-Queries aus:"
            }));

            // Add document dropdown
            var docGroup = add("group");
            docGroup.alignChildren = ["left", "center"];
            docGroup.spacing = 10;
            var docList = docGroup.add("dropdownlist");
            docList.preferredSize.width = 300;

            // Populate dropdown with open documents
            var docs = app.documents;
            var activeIndex = 0;
            for(var i = 0; i < docs.length; i++) {
                docList.add("item", docs[i].name);
                if(docs[i] === app.activeDocument) {
                    activeIndex = i;
                }
            }
            docList.selection = activeIndex;

            // Add buttons
            var btnGroup = add("group");
            btnGroup.alignment = ["center", "top"];
            btnGroup.spacing = 10;
            var okBtn = btnGroup.add("button", undefined, localize({en: "OK", de: "OK"}), {name: "ok"});
            var cancelBtn = btnGroup.add("button", undefined, localize({en: "Cancel", de: "Abbrechen"}), {name: "cancel"});
        }

        if(docDialog.show() === 1) {
            var selectedDoc = app.documents[docList.selection.index];
            var scrLbl_backup = _scrLbl;
            var includeNewestLabel = selectedDoc !== app.activeDocument
            var previousLabels = LabelUtils.findLabels(
                selectedDoc, 
                ScriptVersion,
                includeNewestLabel
            );
            
            if (previousLabels.length > 0) {
                var previousLabel = previousLabels[0];
                _scrLbl = previousLabel.name;
                w.grp1.txt_info.text = localize({
                    en: 'Imported script label from: ',
                    de: 'Skript-Etikett importiert aus Version: '
                }) + previousLabel.version + " (" + selectedDoc.name + ")" + localize({
                    en: ' - please save!',
                    de: ' - Bitte speichern!'
                });
                log('Loaded Script Label from ' + selectedDoc.name + ' ... calling updateQL()');
                updateQL(selectedDoc);
                storeDDs();
            } else {
                w.grp1.txt_info.text = localize({
                    en: 'No ' + includeNewestLabel ? 'suitable' : 'older' + ' script label found.',
                    de: 'Kein ' + includeNewestLabel ? 'passendes' : 'älteres' + ' Skript-Etikett gefunden.'
                });
                log('No suitable Script Label found in ' + selectedDoc.name + ' ... abort');
            }
            _scrLbl = scrLbl_backup;
            w.but_do.enabled = false;
        }
    });
    // ======== settings: read me (sprite button!)  ========
    w.p.s.butHelp.c.addEventListener("click", function()
    {
        var wI = new Window ("dialog", "Readme", undefined, {resizeable: true});
        wI.preferredSize = [_wW+90, w.size.height+300];
        wI.minimumSize = [_wW+10, w.size.height];
        wI.alignChildren = ["fill", "fill"];
        wI.spacing = 5;
        var readMe = wI.add ("edittext", undefined, __readMe, {multiline: true, readonly: true});
        readMe.alignment = ["fill","fill"];
        readMe.preferredSize = [_wW+90, w.size.height+300];
        readMe.minimumSize = [_wW+10, w.size.height];
        wI.center(w);
        wI.onResize = function () {
            this.layout.resize ()
        }
        wI.show ();
	});
    // ================ the run button ================= 
    w.but_do.onClick = function(){
        var chainIdx = w.p.m.grpChain.selChain.selection ? w.p.m.grpChain.selChain.selection.index : 0;
        
        // If a chain is selected, run the chain
        if (chainIdx > 0 && ql.chains && ql.chains[chainIdx - 1]) {
            runChain(ql.chains[chainIdx - 1]);
            return;
        }
        
        // Standard single query execution
        var rep = new Object();
        // ensure selection info is up to date before running
        updateSelectionInfo(); 
        app.doScript("rep = paragraphStyleChanger(_o.ps)", undefined, undefined, UndoModes.ENTIRE_SCRIPT, "paragraphStyleChanger");
        log('paragraphStyleChanger -- ' + rep.matches + ' matches -- ' + rep.changed + ' changed ' );
        switch (rep.changed) {
            case -2: break;  // still in default DD-settings, quit quietly
            case -1:  
                w.grp1.txt_info.text = (rep.matches + ((rep.matches === 1) ? (localize({en: ' match. ', de: ' Stelle. '})) : (localize({en: ' matches. ', de: ' Stellen. '}))) + localize({en: 'No changes necessary with these settings.', de: 'Nichts zu tun bei diesen Einstellungen.'})); 
                break;
            case 0: 
                if (rep.matches === 0) w.grp1.txt_info.text = (localize({en: 'No matches found.', de: 'Keine zutreffenden Stellen.'}));
                else w.grp1.txt_info.text = (rep.matches + ((rep.matches === 1) ? (localize({en: ' match. ', de: ' Treffer. '})) : (localize({en: ' matches. ', de: ' Treffer. '}))) + localize({en: 'But the desired formats didn\'t need to be applied.', de: ' Aber das gewünschte Format brauchte nicht zugewiesen werden.'}));
                break;
            default:  w.grp1.txt_info.text = (rep.matches + ((rep.matches === 1) ? (localize({en: ' match. ', de: ' Treffer. '})) : (localize({en: ' matches. ', de: ' Treffer. '}))) + rep.changed + ((rep.changed == 1) ? (localize({en: ' paragraph changed.', de: ' Absatz geändert'})) : (localize({en: ' paragraphs changed', de: ' Absätze geändert'}))))
        }
        if (_prefs.autoRev) w.p.m.grpSwitch.but_sw.dispatchEvent(new UIEvent ('click')); 
        if (_prefs.autoFind) w.p.m.grpSwitch.but_c2f.dispatchEvent(new UIEvent ('click'));
        // sends onClick event to switchStyles-button in order to autoReverse the DDs.
    }
    // ================ Run Chain ================= 
    function runChain(chain) {
        if (!chain || !chain.queryNames || chain.queryNames.length === 0) {
            w.grp1.txt_info.text = localize({en: 'Chain is empty.', de: 'Kette ist leer.'});
            return;
        }
        
        var queryItems = ql.getData();
        var totalMatches = 0;
        var totalChanged = 0;
        var stepsRun = 0;
        var invalidQueries = [];
        
        // Pre-flight check: validate all queries in chain
        for (var i = 0; i < chain.queryNames.length; i++) {
            var qName = chain.queryNames[i];
            var queryItem = null;
            for (var j = 0; j < queryItems.length; j++) {
                if (queryItems[j].name === qName) {
                    queryItem = queryItems[j];
                    break;
                }
            }
            if (!queryItem) {
                invalidQueries.push(qName + localize({en: ' (not found)', de: ' (nicht gefunden)'}));
            } else if (!validateQuery(queryItem)) {
                invalidQueries.push(qName + localize({en: ' (missing styles)', de: ' (fehlende Formate)'}));
            }
        }
        
        if (invalidQueries.length > 0) {
            var msg = localize({en: 'Chain cannot run. Invalid queries:', de: 'Kette kann nicht ausgeführt werden. Ungültige Abfragen:'}) + '\n' + invalidQueries.join('\n');
            alert(msg);
            return;
        }
        
        // Ensure selection info is current
        updateSelectionInfo();
        
        // Run each query in order
        for (var i = 0; i < chain.queryNames.length; i++) {
            var qName = chain.queryNames[i];
            var queryItem = null;
            for (var j = 0; j < queryItems.length; j++) {
                if (queryItems[j].name === qName) {
                    queryItem = queryItems[j];
                    break;
                }
            }
            
            if (queryItem && queryItem.set) {
                // Temporarily apply this query's settings to the dropdowns
                _stopCalls = true;
                updateDDs(queryItem.set);
                _stopCalls = false;
                
                // Run the paragraph style changer
                var rep = {};
                app.doScript("rep = paragraphStyleChanger(_o.ps)", undefined, undefined, UndoModes.ENTIRE_SCRIPT, "paragraphStyleChanger Step " + (i + 1));
                log('Chain step ' + (i + 1) + ' (' + qName + '): ' + rep.matches + ' matches, ' + rep.changed + ' changed');
                
                if (rep.matches && rep.matches > 0) totalMatches += rep.matches;
                if (rep.changed && rep.changed > 0) totalChanged += rep.changed;
                stepsRun++;
            }
        }
        
        // Summary message
        w.grp1.txt_info.text = localize({
            en: 'Chain: ' + stepsRun + ' steps, ' + totalMatches + ' matches, ' + totalChanged + ' changed.',
            de: 'Kette: ' + stepsRun + ' Schritte, ' + totalMatches + ' Treffer, ' + totalChanged + ' geändert.'
        });
        
        // Restore to first query (or leave at last) - optional
        // ql.selection = 0;
    }
    // ================ Sprites (Image-Buttons) ================= 
    var mouseEventHandler = function(ev)
    {
        this.properties.state = ("mouseover"==ev.type)+2*("mousedown"==ev.type);
        this.refresh();
    };
    var _bts =[
        w.grp1.but_set, 
        w.p.m.grpQ.saveQ,  
        w.p.m.grpQ.delQ, 
        w.p.m.grpChain.editChain,
        w.p.m.grpChain.delChain,
        w.p.m.grpSwitch.but_f2c, 
        w.p.m.grpSwitch.but_sw, 
        w.p.m.grpSwitch.but_c2f,
        w.p.m.grpffp.but_anyffp,
        w.p.m.grpfsp.but_anyfsp,
        w.p.m.grpcfp.but_anycfp,
        w.p.m.grpcsp.but_anycsp,
        w.p.m.titlefsp.but_getfsp,
        w.p.m.titlecsp.but_getcsp,
        w.p.s.remLbl.c, /*settings: remove label button */
        w.p.s.getOldLbl.c, /*settings: get old settings button */
        w.p.s.butHelp.c /*settings: readme button */
    ];
    for (var _i = 0; _i < _bts.length; _i++) {
       _bts[_i].onDraw = function() {
           // added 4th sprite for disabled buttons and additional 4 sprites for brightness setting in CC
            var dy = (this.enabled?this.properties.state:3) * this.spriteHeight + _fixOffset + (_CCbrightness*4*this.spriteHeight);
            this.graphics.drawImage(this.image,0,-dy);
        };
        _bts[_i].addEventListener("mouseover", mouseEventHandler);
        _bts[_i].addEventListener("mousedown", mouseEventHandler);
        _bts[_i].addEventListener("mouseup", mouseEventHandler);
        _bts[_i].addEventListener("mouseout", mouseEventHandler);
    }
    // Mouse-over handling was used to dampen idle updates; no longer necessary after removing Idle task
    _i = null;
    _bts = null;
    
    w.show();
  
    
    // ===========================================
    //   EVENTS 
    // ===========================================
    
    function pSC_prep () 
    {
        // create Events
        log('(pSC_prep) ... setting listeners');
        // Keep IdleTask for legacy button-enable refresh only; selection text updates now event-driven
        if(app.idleTasks.itemByName("pSC_idleSelTask").isValid) {
            try { app.idleTasks.itemByName("pSC_idleSelTask").remove(); } catch(e){}
        }
        if (!app.eventListeners.itemByName("pSC_selChange").isValid)
            app.eventListeners.add("afterSelectionChanged", function (){ updateSelectionInfo(); },{name:"pSC_selChange"});
        
        if (!app.eventListeners.itemByName("pSC_docActivated").isValid) {
            log('install afterActivate event in app');
            var afterActivateListener = app.addEventListener("afterActivate", handleAfterActivate);
            afterActivateListener.name = "pSC_docActivated";
        }
    }
    
    function pSC_stop () 
    {
        log('(pSC_stop) - removing listeners, killing functions etc...');
        savePrefs();
        try {
            // IdleTask und IdleEvent.ON_IDLE entfernen wenn vorhanden
            if(app.idleTasks.itemByName("pSC_idleSelTask").isValid) {
                app.idleTasks.itemByName("pSC_idleSelTask").remove(); //removing the task also removes its eventListener ON_IDLE.
            }
            
            // afterSelectionChanged event entfernen wenn vorhanden
            if(app.eventListeners.itemByName("pSC_selChange").isValid) {
                app.eventListeners.itemByName("pSC_selChange").remove();
            }
            
            // afterActivate event entfernen wenn vorhanden
            if(app.eventListeners.itemByName("pSC_docActivated").isValid) {
                app.eventListeners.itemByName("pSC_docActivated").remove();
            }
            
            // document MutationEvent.AFTER_ATTRIBUTE_CHANGED events in allen Dokumenten entfernen
            for(var i = 0; i < app.documents.length; i++) {
                var el = app.documents[i].eventListeners.itemByName("pSC_layerChangeInDoc");
                if(el && el.isValid) {
                    el.remove();
                    log('(pSC_stop): ' + i + ': ' + el.name + 'Event listener removed');
                }
            }
        } catch(e) {
            log('Error in cleanupEventListeners: ' + e);
        }
        docChanged = null;
        stylesChanged = null;
        _cachedSignatures = null;
        updateW = null;
        layerHandler = null;
        handleAfterActivate = null;


        w.onActivate = undefined;
        w.onDeactivate = undefined;
        // w.close();
		if (w && w.isValid) {
            w.destroy();
			w = null;
			delete w;
        }
        log('### END ### ');
    }
    
    
    function installLayerEvent () // installed for each document in w.onActivate and if DocChanged;
    {
        if (!app.activeDocument.eventListeners.itemByName("pSC_layerChangeInDoc").isValid) {
            log('installLayerEvent() for doc');
            var layerListener = app.activeDocument.addEventListener (MutationEvent.AFTER_ATTRIBUTE_CHANGED, layerHandler);
            layerListener.name = "pSC_layerChangeInDoc";
        }
    }

    
    // ===========================================
    //   FUNCTIONS 
    // ===========================================
    
    function layerHandler(layer) {
        if (_prefs.useLayer && app.selection.length === 0) updateSelectionInfo();
    }
    function handleAfterActivate(theEvent){
        if (theEvent.target.constructor.name === 'Document') {
            log('Document activated: ' + app.activeDocument.name);
            if(docChanged()) {
               installLayerEvent();
                _stopCalls = true;
                updateQL();
                _stopCalls = false;

                try {
                    var q = ql.selection.get();
                    matchRenamed();
                    updateDDs(q.set);
                    updateSelectionInfo();
                } catch(e) {
                    log('Error in handleAfterActivate operations: ' + e.message);
                }
            }
        }
    }
    // ===========================================
    function updateSelectionInfo()
    {
        _o = getParas();
        log('updateSelectionInfo: getParas() returns: ' + _o.toSource());
        w.grp1.txt_info.text = _o.desc;
        _hasDocAnParas = w.p.m.enabled = w.p.s.remLbl.enabled = app.documents.length > 0 && _o.ps;
        updateDoButtonEnabled();
    }

    function updateDoButtonEnabled() {
        try {
            var invalid = (ff.selection && ff.selection.get().notFound) || (fs.selection && fs.selection.get().notFound) || (cf.selection && cf.selection.get().notFound) || (cs.selection && cs.selection.get().notFound);
            w.but_do.enabled = _hasDocAnParas && !invalid;
        } catch(e) {
            w.but_do.enabled = _hasDocAnParas;
        }
    }

    function updateW()
    { // legacy Idle updater has been removed, keep for compatibility if invoked elsewhere
        if (w.grp1.txt_info.needs_update) {  
            updateSelectionInfo();
            w.grp1.txt_info.needs_update = false;
        }
    }
    // ===========================================
    // Enter chain mode: cache current DD state and show "[-Chain-]" in all dropdowns
    function enterChainMode() {
        if (_chainModeActive) return; // already in chain mode
        
        log('enterChainMode: caching current DD state');
        // Cache current dropdown state before switching to chain mode
        _cachedDDState = getCurrentDDs();
        _chainModeActive = true;
        
        // Reset query dropdown to [User/Custom]
        _stopCalls = true;
        ql.selection = 0;
        _stopCalls = false;
        
        // Disable SaveQ button in chain mode (nothing to save)
        w.p.m.grpQ.saveQ.enabled = false;
        
        // Disable switch buttons in chain mode (dropdowns show [-Chain-])
        w.p.m.grpSwitch.but_f2c.enabled = false;
        w.p.m.grpSwitch.but_sw.enabled = false;
        w.p.m.grpSwitch.but_c2f.enabled = false;
        
        // Add temporary "[-Chain-]" item to each dropdown and select it
        var dds = [ff, fs, cf, cs];
        for (var i = 0; i < dds.length; i++) {
            var dd = dds[i];
            // Add chain mode indicator at position 0 (will be first item)
            var chainItem = dd.add('item', nameOfChainMode, 0);
            chainItem.chainModeItem = true; // mark for later removal
            dd.selection = 0;
        }
        log('enterChainMode: complete');
    }
    // ===========================================
    // Exit chain mode: remove "[-Chain-]" items and restore cached DD state
    function exitChainMode() {
        if (!_chainModeActive) return; // not in chain mode
        
        log('exitChainMode: restoring cached DD state');
        _chainModeActive = false;
        
        // Re-enable SaveQ button
        w.p.m.grpQ.saveQ.enabled = true;
        
        // Re-enable switch buttons
        w.p.m.grpSwitch.but_f2c.enabled = true;
        w.p.m.grpSwitch.but_sw.enabled = true;
        w.p.m.grpSwitch.but_c2f.enabled = true;
        
        // Remove "[-Chain-]" items from dropdowns
        removeChainModeItems();
        
        // Preserve caller's _stopCalls state to prevent DD onChange from resetting ql.selection
        var wasStopCalls = _stopCalls;
        
        // Restore cached state or defaults
        if (_cachedDDState) {
            _stopCalls = true;
            updateDDs(_cachedDDState);
        } else {
            // Fallback to defaults
            _stopCalls = true;
            updateDDs(new DD_set());
        }
        
        // Restore caller's _stopCalls state (if caller had set it true, keep it true)
        _stopCalls = wasStopCalls;
        _cachedDDState = null;
        log('exitChainMode: complete');
    }
    // ===========================================
    // Remove chain mode indicator items from dropdowns
    function removeChainModeItems() {
        var dds = [ff, fs, cf, cs];
        for (var i = 0; i < dds.length; i++) {
            var dd = dds[i];
            // Find and remove the chain mode item (should be at index 0 if present)
            for (var j = dd.items.length - 1; j >= 0; j--) {
                if (dd.items[j].chainModeItem || dd.items[j].text === nameOfChainMode) {
                    dd.remove(j);
                    break;
                }
            }
        }
    }
    // ===========================================
    // Refresh the chain dropdown from ql.chains data
    function refreshChainDropdown() {
        var dd = w.p.m.grpChain.selChain;
        var prevSel = ql.selChain || 0;
        dd.removeAll();
        dd.add('item', localize({en: '[- No Chain -]', de: '[- Keine Kette -]'}));
        if (ql.chains) {
            for (var i = 0; i < ql.chains.length; i++) {
                dd.add('item', ql.chains[i].name);
            }
        }
        // Restore selection (clamped to valid range)
        if (prevSel > dd.items.length - 1) prevSel = 0;
        dd.selection = prevSel;
        w.p.m.grpChain.delChain.enabled = prevSel > 0;
    }
    // ===========================================
    // Validate a single query: returns true if all styles exist in the document
    function validateQuery(queryItem) {
        if (!queryItem || !queryItem.set) return false;
        var apsDP = stylesAsDPArray();
        var s = queryItem.set;
        var props = ['ffp', 'fsp', 'cfp', 'csp'];
        for (var i = 0; i < props.length; i++) {
            var p = props[i];
            if (!s[p]) continue;
            // Skip "any style" and "don't change" options (id = 0)
            if (s[p].id === 0) continue;
            // Check if the style ID exists in the document
            var found = false;
            for (var j = 0; j < apsDP.length; j++) {
                if (apsDP[j].id === s[p].id) {
                    found = true;
                    break;
                }
            }
            if (!found) return false;
        }
        return true;
    }
    // ===========================================
    // Chain Editor Dialog
    function chainEditor(existingChain) {
        var chainName = existingChain ? existingChain.name : '';
        var chainQueryNames = existingChain ? existingChain.queryNames.slice(0) : []; // copy array
        var queryItems = ql.getData();
        var warnPrefix = '\u26A0 '; // Warning triangle

        // Build validation map for all queries
        var queryValidMap = {};
        for (var i = 0; i < queryItems.length; i++) {
            var qName = queryItems[i].name;
            queryValidMap[qName] = validateQuery(queryItems[i]);
        }

        var dlg = new Window('dialog', existingChain ? localize({en: 'Edit Chain', de: 'Kette bearbeiten'}) : localize({en: 'New Chain', de: 'Neue Kette'}));
        dlg.orientation = 'column';
        dlg.alignChildren = ['fill', 'top'];

        // Name input
        var nameGrp = dlg.add('group');
        nameGrp.add('statictext', undefined, localize({en: 'Chain Name:', de: 'Kettenname:'}));
        var nameInput = nameGrp.add('edittext', undefined, chainName);
        nameInput.characters = 25;

        // Lists container
        var listsGrp = dlg.add('group');
        listsGrp.alignChildren = ['fill', 'fill'];

        // Available queries (left)
        var leftCol = listsGrp.add('group');
        leftCol.orientation = 'column';
        leftCol.alignChildren = ['fill', 'top'];
        leftCol.add('statictext', undefined, localize({en: 'Available Queries:', de: 'Verfügbare Abfragen:'}));
        var srcList = leftCol.add('listbox', undefined, [], {multiselect: false});
        srcList.preferredSize = [180, 200];

        // Populate source list (skip the default [User] entry at index 0)
        for (var i = 1; i < queryItems.length; i++) {
            var qName = queryItems[i].name;
            var displayName = queryValidMap[qName] ? qName : warnPrefix + qName;
            srcList.add('item', displayName);
        }

        // Transfer buttons (center)
        var centerCol = listsGrp.add('group');
        centerCol.orientation = 'column';
        centerCol.alignChildren = ['center', 'center'];
        var btnAdd = centerCol.add('button', undefined, '>>');
        btnAdd.preferredSize = [40, 25];
        var btnRemove = centerCol.add('button', undefined, '<<');
        btnRemove.preferredSize = [40, 25];

        // Chain queries (right)
        var rightCol = listsGrp.add('group');
        rightCol.orientation = 'column';
        rightCol.alignChildren = ['fill', 'top'];
        rightCol.add('statictext', undefined, localize({en: 'Chain (in order):', de: 'Kette (in Reihenfolge):'}));
        var chainList = rightCol.add('listbox', undefined, [], {multiselect: false});
        chainList.preferredSize = [180, 200];

        // Populate chain list
        function rebuildChainList() {
            chainList.removeAll();
            for (var i = 0; i < chainQueryNames.length; i++) {
                var qn = chainQueryNames[i];
                var displayName = queryValidMap[qn] ? qn : warnPrefix + qn;
                chainList.add('item', displayName);
            }
        }
        rebuildChainList();

        // Order buttons
        var orderCol = listsGrp.add('group');
        orderCol.orientation = 'column';
        orderCol.alignChildren = ['center', 'center'];
        var btnUp = orderCol.add('button', undefined, '\u25B2'); // Up arrow
        btnUp.preferredSize = [30, 25];
        var btnDown = orderCol.add('button', undefined, '\u25BC'); // Down arrow
        btnDown.preferredSize = [30, 25];

        // Warning message
        var warnGrp = dlg.add('group');
        warnGrp.alignment = ['fill', 'bottom'];
        var warnText = warnGrp.add('statictext', undefined, '', {multiline: true});
        warnText.preferredSize = [380, 40];

        function updateWarning() {
            var hasInvalid = false;
            for (var i = 0; i < chainQueryNames.length; i++) {
                if (!queryValidMap[chainQueryNames[i]]) {
                    hasInvalid = true;
                    break;
                }
            }
            warnText.text = hasInvalid ? localize({en: 'Warning: Chain contains queries with missing styles!', de: 'Warnung: Kette enthält Abfragen mit fehlenden Formaten!'}) : '';
        }
        updateWarning();

        // Button handlers
        btnAdd.onClick = function() {
            if (srcList.selection) {
                // Extract raw name (remove warning prefix if present)
                var selText = srcList.selection.text;
                var rawName = (selText.indexOf(warnPrefix) === 0) ? selText.substring(warnPrefix.length) : selText;
                chainQueryNames.push(rawName);
                rebuildChainList();
                updateWarning();
                chainList.selection = chainList.items.length - 1;
            }
        };
        btnRemove.onClick = function() {
            if (chainList.selection) {
                var idx = chainList.selection.index;
                chainQueryNames.splice(idx, 1);
                rebuildChainList();
                updateWarning();
                if (chainQueryNames.length > 0) {
                    chainList.selection = Math.min(idx, chainQueryNames.length - 1);
                }
            }
        };
        btnUp.onClick = function() {
            if (chainList.selection && chainList.selection.index > 0) {
                var idx = chainList.selection.index;
                var temp = chainQueryNames[idx];
                chainQueryNames[idx] = chainQueryNames[idx - 1];
                chainQueryNames[idx - 1] = temp;
                rebuildChainList();
                chainList.selection = idx - 1;
            }
        };
        btnDown.onClick = function() {
            if (chainList.selection && chainList.selection.index < chainQueryNames.length - 1) {
                var idx = chainList.selection.index;
                var temp = chainQueryNames[idx];
                chainQueryNames[idx] = chainQueryNames[idx + 1];
                chainQueryNames[idx + 1] = temp;
                rebuildChainList();
                chainList.selection = idx + 1;
            }
        };

        // OK / Cancel
        var btnGrp = dlg.add('group');
        btnGrp.alignment = ['right', 'bottom'];
        var btnOK = btnGrp.add('button', undefined, 'OK', {name: 'ok'});
        var btnCancel = btnGrp.add('button', undefined, localize({en: 'Cancel', de: 'Abbrechen'}), {name: 'cancel'});

        btnOK.onClick = function() {
            var trimmedName = nameInput.text.replace(/^\s+|\s+$/g, '');
            if (trimmedName.length === 0) {
                alert(localize({en: 'Please enter a chain name.', de: 'Bitte geben Sie einen Kettennamen ein.'}));
                return;
            }
            if (chainQueryNames.length === 0) {
                alert(localize({en: 'Please add at least one query to the chain.', de: 'Bitte fügen Sie mindestens eine Abfrage zur Kette hinzu.'}));
                return;
            }
            dlg.close(1);
        };

        if (dlg.show() === 1) {
            return new Chain_item(nameInput.text.replace(/^\s+|\s+$/g, ''), chainQueryNames);
        }
        return null;
    }
    // ===========================================
    function updateQL(sourceDoc)
    {
       var qlDP = new QL(); // the default set 
       if (app.documents.length !== 0 ) {  
           var doc = sourceDoc || app.activeDocument;
           qlDP = eval(doc.extractLabel(_scrLbl)) || qlDP;
           // Backward compatibility: ensure chains array exists
           if (!qlDP.chains) qlDP.chains = [];
           if (typeof qlDP.selChain !== 'number') qlDP.selChain = 0;
       }
       log('updateQL: select: "' + qlDP.sel.name + '" in:' + doc.name +'"');
       ql.resync(qlDP.itms);
       ql.selection = ql.find(qlDP.sel.name);
       // Sync chains to the chain dropdown
       ql.chains = qlDP.chains;
       ql.selChain = qlDP.selChain;
       if (w && w.p && w.p.m && w.p.m.grpChain) {
           refreshChainDropdown();
       }
    }
    // ===========================================  
    function storeDDs(lbl, i) 
    {
        if (app.documents.length === 0 || !_o.ps) return;
        var ad = app.activeDocument;
        log('StoreDDs in: ' + ad.name);
        try {
            // stores all the user queries of this document in a document script label. The currently selected items are stored in '[Custom]'-query [0]
            lbl = new QL();
            lbl.itms = ql.getData();
            (ql.selection)?(lbl.sel = ql.selection.get()):(lbl.sel = ql.items[0].get());
            lbl.itms[0].set = getCurrentDDs();
            // Store chains
            lbl.chains = ql.chains || [];
            lbl.selChain = ql.selChain || 0;
            // the insertLabel won't pollute indesigns undo-history this way
            app.doScript(function(){ad.insertLabel(_scrLbl, lbl.toSource())}, undefined, undefined, UndoModes.AUTO_UNDO, "Store label");
        }
        catch(e) {
            log('Error in StoreDDs: '+'\n'+ e.toString()+'\r'); return;
        }
    }
    // ===========================================
    function getCurrentDDs() // returns a set {ffp : DP_item, fsp :  DP_item, cfp :  DP_item, csp : DP_item}
    {
        var t, o = new DD_set(); 
        for (var DD in o) {
            t = w.p.m["grp"+DD][DD].selection;
            if (t) {
                o[DD] = t.get();
                if (t.index === 1 || t.index === 2) o[DD].name = app.findKeyStrings(o[DD].name)[0]; 
                // store [basic paragraph] and [no paragraph style] as local independant string... will localized again in updateDD()
            }
            else {
                o[DD] = {id:0, name:nameOfAnyStyle, notFound:false}
            }
        }
       return o; 
    }
    // ===========================================  
    function stylesAsDPArray() { // returns array [{id: style-uid, name: styleNameAsNestedPath, notFound: bool}]
        var a = [];
        if (app.documents.length !== 0 ) {
            var aps = getSafeStyles();
            for( i = 0; i < aps.length; i++ ) {
                a[i] = new DP_item (aps[i].id, getNestingPath(aps[i]), false) ;
            }
        }
        return a;
    }
    // ===========================================  
    function updateDDs(set /*optional DD_set of QL_item*/, apsDP, lbl, i, q, s) 
    {
        var apsDP = stylesAsDPArray(); // styles-data-provider for each of the four dropdowns
        (set)?log('updateDDs: with given set'):log('updateDDs: with label from doc or defaults');
        lbl = new QL(); // will have a fresh DD-Set with all AnyStyles in case doc got no label
        if (!set) {
            lbl = eval(ad.extractLabel(_scrLbl)) || lbl;
            set = lbl.itms[0].set;
            // use the set stored in [Custom] either from loaded label or from defaults in new QL()
        }
        try { 
            var dp = {ffp : "0", fsp : "1", cfp : "2", csp : "3" };
            for (var DD in set) {
                // put all styles and default any-styles in the data provider
                i = Number(dp[DD]);
               dp[DD] = apsDP.slice();
               dp[DD].splice(0,0, new DP_item (0, ((i <=1)?nameOfAnyStyle:nameOfDontChange), false));
               s = dp[DD][0]; // the any-style as default selection
               // establishing DD selections, adding missing items if needed 
                if (set[DD].id !== 0) { // if set-item is not the Any-Style...
                    s = (set[DD].name.indexOf("$ID/")===0) ? app.translateKeyString(set[DD].name) : set[DD].name;
                     if (!dp[DD].contains(s, "name")) { // if style couldn't  be found in the Dropdown ... slice in the Stylename as -missing-
                        dp[DD].splice(0,0, new DP_item (set[DD].id, s, true)); 
                        s = dp[DD][0]; // name with markedNotFound
                    }
                }
                //log('#### updateDDs: ' + DD + ' DATA ####');
                //log(dp[DD].toSource());
                _stopCalls = true;
                w.p.m["grp"+DD][DD].resync(dp[DD]);
                w.p.m["grp"+DD][DD].selection = w.p.m["grp"+DD][DD].find(s) || null;           
                _stopCalls = false;
                 log('-->' + DD + ' : ' + s);
            }
        }
        catch(e) {
            log('Error in UpdateDDs: ' +'\n'+ e.toString()+'\r'); return;
        }
    }
    // ===========================================  
    function matchRenamed() {
        try {
            log ('matchRenamed: ...');
            var i,j,n;
            var found = false;
            var changes = false;
            var qlDP = ql.getData();
            var apsDP = stylesAsDPArray(); // array [{id: style-uid, name: styleNameAsNestedPath, notFound: bool}]    
            for ( i = 0; i < qlDP.length; i++ ){  
                var s = qlDP[i].set;
                for (var DD in s) {
                    found = false;
                    sname = (s[DD].name.indexOf("$ID/")===0) ? app.translateKeyString(s[DD].name) : s[DD].name;
                    var n = apsDP.length;
                    // updating stored IDs to always match current docs style IDs, in case a style got recreated with another ID
                    while (n--) { 
                        if (apsDP[n].name == sname) {
                            found = true;
                            if (s[DD].id != apsDP[n].id) {
                                log('matchRenamed: Updating query: "' + qlDP[i].name + '" - ' + sname + ' id ' + s[DD].id + ' to ' + apsDP[n].id);
                                s[DD].id = apsDP[n].id;
                                changes = true;
                            }
                            break;
                        }
                    }
                    // if stylename in set couldn't be found in the nested Styles... but stored ID can be found in the current doc styles
                    if (!found && apsDP.contains(s[DD].id, "id")) { 
                        name_new = getNestingPath(app.activeDocument.paragraphStyles.itemByID(s[DD].id));
                        log('matchRenamed: Rematching: "' + sname + '" to "' + name_new + '"');
                        changes = true;
                        for (j = 0; j < qlDP.length; j++ ){ // go through all q.items and change each occurrance
                            var s2 = qlDP[j].set;
                            for (var DD2 in s2) {
                                if (s2[DD2].name === sname) {
                                    s2[DD2].id = s[DD].id;
                                    s2[DD2].rename(name_new);
                                    s2[DD2].notFound = false;
                                }
                            }
                        }
                    }
                }
            }
            var qS = ql.selection.get().set;
            updateDDs(qS);
            changes && storeDDs();
        }
        catch(e) {
            log('Error in matchRenamed: ' +'\n'+ e.toString()+'\r'); return;
        }
    }
    // ===========================================
    function shouldUpdateNames() {
        // Check if stored style names differ from current style names
        if (app.documents.length === 0 || !ql) return false;

        try {
            var qlDP = ql.getData();
            var apsDP = stylesAsDPArray();

            for (var i = 0; i < qlDP.length; i++) {
                var s = qlDP[i].set;
                for (var DD in s) {
                    var storedName = s[DD].name;
                    if (apsDP.contains(s[DD].id, "id")) {
                        var currentName = getNestingPath(app.activeDocument.paragraphStyles.itemByID(s[DD].id));
                        if (storedName !== currentName) {
                            log('shouldUpdateNames: Name mismatch found - stored: "' + storedName + '", current: "' + currentName + '"');
                            return true;
                        }
                    }
                }
            }
            return false;
        } catch(e) {
            log('Error in shouldUpdateNames: ' + e.message);
            return false;
        }
    }
    // ===========================================
    function docChanged() {
        if (app.documents.length === 0) return false;
        var ad = app.activeDocument;
        if (!_old_ad || _old_ad !== ad.id) {
            _old_ad = ad.id;
            log('docChanged() - yes - "' + ad.name + '"');
            return true;
        }
        else { log('docChanged() - no - "' + ad.name + '"'); }
    }
    // ===========================================
    function getStyleSignature(style) {
        try {
            // Add style modification timestamp or index to ensure uniqueness
            var modTime = "";
            try {
                // Try to get modification date if available
                if (style.modified) {
                    modTime = "_" + style.modified.getTime();
                } else {
                    // Fallback: use style index in document
                    var allStyles = app.activeDocument.allParagraphStyles;
                    for (var i = 0; i < allStyles.length; i++) {
                        if (allStyles[i].id === style.id) {
                            modTime = "_" + i;
                            break;
                        }
                    }
                }
            } catch(e) {
                modTime = "_" + Math.random(); // Ultimate fallback
            }
            return style.id + "|" + getNestingPath(style) + modTime;
        } catch(e) {
            return "invalid_" + Math.random(); // Defekte Styles isolieren
        }
    }
    // ===========================================
    function getSafeStyles() {
        var styles = [];
        var allStyles = app.activeDocument.allParagraphStyles;
        var stylesArray = [];

        // Schnellere Methode: Sammle alle Styles zuerst
        for(var i=0; i<allStyles.length; i++){
            stylesArray.push(allStyles[i]);
        }

        // Filtere beschädigte Styles heraus
        for(var i=0; i<stylesArray.length; i++){
            try {
                if (stylesArray[i] && stylesArray[i].isValid) {
                    styles.push(stylesArray[i]);
                }
            } catch(e) {
                // Style überspringen falls beschädigt
                log('Skipping invalid style at index ' + i + ': ' + e.message);
            }
        }
        return styles;
    }
    // ===========================================
    function getSignatures() {
        var signatures = [];
        var styles = getSafeStyles();
        for(var i=0; i<styles.length; i++) {
            signatures.push(getStyleSignature(styles[i]));
        }
        return signatures.join(",");
    }

    // ===========================================
    function stylesChanged(_cachedSignatures)
    {
        if (app.documents.length === 0 ) return false;
        try {
            var signatures = getSignatures();
            if(signatures != _cachedSignatures) {
                // Update the global _cachedSignatures variable directly
                _cachedSignatures = signatures;
                log('stylesChanged: detected change - new cache: '+ signatures.substring(0, 100) + '...');
                return true;
            }
            return false;
        }
        catch(e) {
            log('Error in StylesChanged: ' +'\n'+ e.toString()+'\r'); return;
        }
    }
    // =====================================  
    function loadPrefs()
    {       
        try {
            var f = File (_scriptFolder+ "~" + _scriptFileName + "_settings.txt");
            f.open ("r"); 
            var o = eval (f.read()); 
            f.close();
        } 
        catch(e){log('Error in loadPrefs: ' +'\n'+ e.toString()+'\r'); return;};
        return o;        
    }
    // =====================================  
    function savePrefs() 
    {
        try {
            var f = File (_scriptFolder+ "~" + _scriptFileName + "_settings.txt");
            f.open ("w"); 
            f.write (_prefs.toSource()); 
            f.close();
        }
        catch(e){log('Error in savePrefs: ' +'\n'+ e.toString()+'\r'); return;};
    }
    // =====================================  
    function getParas() 
    {
        // Returns a collection of paragraphs from the selection (s) and a descriptive string of it (or an error-message)
        var scope = ""; // scope name, i.e. "textframe", "table" or "page"
        var desc = "";
        var sts = []; // an array of stories
        var ps = []; // an array of  paragraphs
        var cp; // will hold only the current insertionPoints paragraph for the get-styles-Buttons
        if (app.documents.length == 0) {
            return {"ps": false, "desc": localize({en: 'No documents open.', de: 'Kein Dokument geöffnet.'})}
        }
        try { 
            ad = app.activeDocument;
            s = app.selection;
        } 
        catch(e) {
            (e.number == 90884 || e.number == 90886)?( desc = localize({en: 'Document closed.', de: 'Dokument geschlossen.'})):( desc = 'Error: '+e.number +"\r"+ e.message );
            return {"ps": false, "desc": desc}
        }
       if (s.length == 0) { // no selection ? then do all paras of layer or document 
            if (_prefs.useLayer) {
                GetStoriesAndParasSelection(sts, ps, ad.activeLayer.allPageItems);
                scope = localize({en: 'Layer', de: 'Ebene'})
            }
            else {
                GetStoriesAndParasSelection(sts, ps, ad.allPageItems);
                scope = localize({en: 'Document', de: 'Dokument'})
            }
        }
        else { // if s.length <> 0
            switch (s[0].constructor.name) {
                case "Character":
                case "Word":
                case "TextStyleRange":     
                case "Line":     
                case "Paragraph": 
                case "Text":
                case "TextColumn": scope = localize({en: 'Text', de: 'Text'});
                    break;
                case "InsertionPoint":
                    scope = localize({en: 'Story', de: 'Textfluss'});
                    cp = s[0].paragraphs;
                    break;
                case "Cell":
                    scope = localize({en: 'Cell' + ((s[0].cells.count() != 1)?('s'):('')), de: 'Zelle' + ((s[0].cells.count() != 1)?('n'):(''))});
                    break;
                case "Table":
                    scope = localize({en: 'Table', de: 'Tabelle'});
                    break;
                case "Page":
                    scope = localize({en: 'Page' + ((s.length != 1)?('s'):('')), de: 'Seite' + ((s.length != 1)?('n'):(''))});
                    break;
                case "Group":
                case "GraphicLine":
                case "Rectangle":
                case "Oval":
                case "Polygon":
                case "TextFrame":
                    if (s.length == 1) {
                        switch (s[0].constructor.name) {
                            case "Group":  scope = localize({en: 'Group', de: 'Gruppe'}); break;
                            case "GraphicLine": scope = localize({en: 'GraphicLine', de: 'Linie'}); break;
                            case "Rectangle": scope = localize({en: 'Rectangle', de: 'Rechteck'}); break;
                            case "Oval": scope = localize({en: 'Oval', de: 'Oval'}); break;
                            case "Polygon": scope = localize({en: 'Polygon', de: 'Polygon'}); break;
                            case  "TextFrame": scope = localize({en: 'Textframe', de: 'Textrahmen'}); break;
                            default: localize({en: 'Unknown', de: 'Unbekannt'});
                        }
                    } 
                    else { scope = localize({en: 'Several objects ', de: 'Mehrere Objekte'});}
                    break;
                default:
                    desc = s[0].constructor.name + localize({en: ' selected. Script can\'t work with that.', de: ' gewählt. Skript kann damit nicht arbeiten.'});
                    return {"ps": false, "desc": desc}   
            } // end switch
        } // end else (i.e. if s.length <> 0)
        
        GetStoriesAndParasSelection(sts, ps, s);

        if (ps.length == 0) {
            ps = false;
            desc = scope + localize({en: ' without paragraphs.', de: ' ohne Absätze.'});
        }
        else {
            desc = scope + "\r" + localize({
                en: ((sts.length != 0)?(sts.length + ((sts.length == 1)?(' Story, '):(' Stories, '))):("")) + ps.length + ((ps.length == 1) ? (' paragraph') : (' paragraphs')),
                de: ((sts.length != 0)?(sts.length + ((sts.length == 1)?(' Textfluss, '):(' Textflüsse, '))):("")) + ps.length + ((ps.length == 1) ? (' Absatz') : (' Absätze'))
            });
        }
        return {"ps": ps, "desc": desc, "cp":cp}
    }

    // =====================================  
    function GetStoriesAndParasSelection(sts, ps, sel) 
    {
        var s, i ,j, k;
        for (i = 0; i < sel.length; i++) {
            s = sel[i];
            switch (s.constructor.name) {
                case "Character":
                case "Word":
                case "TextStyleRange":
                case "Line":
                case "Paragraph":
                case "Text":
                case "TextColumn":
                    GetStoriesAndParasSelection(sts, ps, s.tables.everyItem().getElements());
                    GetStoriesAndParasSelection(sts, ps, s.allPageItems);
                    for (j=0; j < s.paragraphs.length; j++) {
                        ps.push(s.paragraphs[j]);
                    }
                    break;
                case "TextFrame":
                    GetStoriesAndParasSelection(sts, ps, s.parentStory.tables.everyItem().getElements());
                    GetStoriesAndParasSelection(sts, ps, s.parentStory.allPageItems);
                    GetStoriesAndParasSelection(sts, ps, s.textPaths.everyItem().getElements());
                    if (s.parentStory.itemLink == null) {
                        if (!sts.contains(s.parentStory)) {
                            sts.push(s.parentStory);
                            for (j=0; j < s.parentStory.paragraphs.length; j++) {
                                ps.push(s.parentStory.paragraphs[j]);
                            }
                        }
                    } 
                    break;
                case "InsertionPoint":
                case "TextPath":
                    GetStoriesAndParasSelection(sts, ps, s.parentStory.tables.everyItem().getElements());
                    GetStoriesAndParasSelection(sts, ps, s.parentStory.allPageItems);
                    if (s.parentStory.itemLink == null) {
                        if (!sts.contains(s.parentStory)) {
                            sts.push(s.parentStory);
                            for (j=0; j < s.parentStory.paragraphs.length; j++) {
                                ps.push(s.parentStory.paragraphs[j]);
                            }
                        }
                    }
                    break;
                case "Rectangle":
                case "GraphicLine":
                case "Oval":
                case "Polygon":
                    GetStoriesAndParasSelection(sts, ps, s.textPaths.everyItem().getElements());
                    break;
                case "Group":
                case "Page":
                    GetStoriesAndParasSelection(sts, ps, s.allPageItems);
                    break;
                case "Cell":
                case "Table":
                    GetStoriesAndParasSelection(sts, ps, s.allPageItems);
                    GetStoriesAndParasSelection(sts, ps, s.cells.everyItem().tables.everyItem().getElements());
                    for (j = 0; j < s.cells.length; j++) {
                        for (k=0; k < s.cells[j].paragraphs.length; k++) {
                            ps.push(s.cells[j].paragraphs[k]);
                        }
                    }
                    break;
                default:
            } 
        }
    }
    // =====================================  
    function getNestingPath (s) 
    {
        // expects paragraphStyle, returns a string of stylename including the styles group nesting
        // rercursive functions from Peter Kahrel ... thanks Peter!
        if (!s.isValid) return false;
        var str = s.name.shorten(20); 
        while (s.parent.constructor.name != "Document") 
            return getNestingPath (s.parent) + " > " + str;
        return str;
    }
    // =====================================  
    function getNestedListOfShortendedStyles (aps) {
        var a = [];
        for (var i = 0; i < aps.length; i++) {
            a.push(getNestingPath(aps[i]));
        }
        return a;
    }

    // =====================================  
    function paragraphStyleChanger(ps) {
        // expects a collection of paragraphs : returns number of matches where the find rules applied and number of changed paragraphs
        var ad = app.activeDocument;
        var set = getCurrentDDs(); // DD_set
        var doF = []; // collects first paragraphs to be changed
        var doS = []; // second paragraphs to be changed
        var block = []; // temporary array of paragraphs to prevent them beeing changed twice
        var ffp, fsp, cfp, csp; // paragraphStyles
        var this_p, next_p; // paragraphs
        var zeroChanges = false;
        var n = 0;
        var i = 0;
        var this_p_isLast = false;
        ffp = (set["ffp"].id > 0) && ad.paragraphStyles.itemByID(set["ffp"].id);
        fsp = (set["fsp"].id > 0) && ad.paragraphStyles.itemByID(set["fsp"].id);
        cfp = (set["cfp"].id > 0) && ad.paragraphStyles.itemByID(set["cfp"].id);
        csp = (set["csp"].id > 0) && ad.paragraphStyles.itemByID(set["csp"].id);
        // If still in default settings, do nothing and return -2 to report nothing
        if (!ffp && !fsp && !cfp && !csp) {
          return {"matches": -2, "changed": -2};
        }
        // notice settings that never would change anything
        if ((ffp == cfp && !csp) || (fsp == csp && !cfp) || (!cfp && !csp) || (ffp == cfp && fsp == csp)) {
          zeroChanges = true;
        }
        // here is the logic :)
        for (var i = 0; i < ps.length; i++) {
            this_p = ps[i];
            this_p_isLast = this_p == this_p.parentStory.paragraphs.lastItem();
            if(!this_p_isLast) next_p = this_p.paragraphs[-1].insertionPoints[-1].paragraphs[0];
            // 1 - If _this_  paragraphs style is A and followed by ANY/NOT FOUND style THEN change _this_ para.
            if (ffp && !fsp && cfp && !csp) {
                if (this_p.appliedParagraphStyle == ffp) {
                    n += 1;
                    doF.push(this_p);
                } 
            }
            // 2 - If _this_  paragraphs style is A and followed by ANY/NOT FOUND style THEN change _next_  para.
            if (ffp && !fsp && !cfp && csp) {
                if (this_p.appliedParagraphStyle == ffp) {
                    n += 1;
                     if(!this_p_isLast && next_p.appliedParagraphStyle != csp) doS.push(next_p);
                } 
            }
            // 3  - If _this_ paragraphs style is A and followed by ANY/NOT FOUND style THEN change _this_  para AND _next_  para.
            // this is the nastiest case and may result in paragraphs beeing changed twice - we have to prevent that.
            // The script is now set to prefer assigning styles to _consecutive_ paragraphs 
            // thus: A A A B --> X Y Y Y
            if (ffp && !fsp && cfp && csp) {
              if (this_p.appliedParagraphStyle == ffp) {
                    n += 1;
                    // don't add to changelist if its unnessary / don't change A into A, also dont change if its already on the changelist for second paras
                    if(!block.contains(this_p) && this_p.appliedParagraphStyle != cfp) doF.push(this_p);
                    if(!this_p_isLast && next_p.appliedParagraphStyle != csp) { 
                        doS.push(next_p);
                        block.push(next_p);
                    }
              } 
            }
            // 4 - If _this_ paragraphs style is ANY/NOT FOUND and _next_ paragraphs style is B THEN change _this_ para.
            if (!ffp && fsp && cfp && !csp && !this_p_isLast) {
                if (next_p.appliedParagraphStyle == fsp) {
                    n += 1;
                     if(this_p.appliedParagraphStyle != cfp) doF.push(this_p);
                } 
            }
            // 5 - If _this_ paragraphs style is ANY/NOT FOUND and _next_ paragraphs style is B THEN change _next_ para.
            if (!ffp && fsp && !cfp && csp && !this_p_isLast) {
                if (next_p.appliedParagraphStyle == fsp) {
                    n += 1;
                    doS.push(next_p);
                } 
            }
            // 6 - If _this_ paragraphs style is ANY/NOT FOUND and _next_ paragraphs style is B THEN change _this_ AND _next_ para.
            if (!ffp && fsp && cfp && csp && !this_p_isLast) {
                if (next_p.appliedParagraphStyle == fsp) {
                    n += 1;
                    if (!block.contains(this_p) && this_p.appliedParagraphStyle != cfp) doF.push(this_p); 
                    if (next_p.appliedParagraphStyle != csp) doS.push(next_p);
                    block.push(next_p);
                } 
            }
            // 7 - If _this_ paragraphs style is A and _next_ paragraphs style is B THEN change _this_ para.
            if (ffp && fsp && cfp && !csp && !this_p_isLast) {
                if (this_p.appliedParagraphStyle == ffp && next_p.appliedParagraphStyle == fsp) {
                    n += 1;
                    doF.push(this_p);
                } 
            }
            // 8 - If _this_ paragraphs style is A and _next_ paragraphs style is B THEN change _next_ para.
            if (ffp && fsp && !cfp && csp && !this_p_isLast) {
                if (this_p.appliedParagraphStyle == ffp && next_p.appliedParagraphStyle == fsp) {
                    n += 1;
                    doS.push(next_p);
                } 
            }
            // 9 - If _this_ paragraphs style is A and _next_ paragraphs style is B THEN change _this_ AND _next_ para.
            if (ffp && fsp && cfp && csp && !this_p_isLast) {
                if (this_p.appliedParagraphStyle == ffp && next_p.appliedParagraphStyle == fsp) {
                    n += 1;
                    if (!block.contains(this_p) && this_p.appliedParagraphStyle != cfp) doF.push(this_p); 
                    if (next_p.appliedParagraphStyle != csp) doS.push(next_p);
                    block.push(next_p);
                } 
            }
             // 10 - If _this_ AND _next_ paragraphs style is ANY/NOTFOUND THEN change _this_ para.
            if (!ffp && !fsp && cfp && !csp) {
                n += 1;
                if (this_p.appliedParagraphStyle != cfp) doF.push(this_p); 
            }
            // 11 - If _this_ AND _next_ paragraphs style is ANY/NOTFOUND THEN change _next_ para.
            if (!ffp && !fsp && !cfp && csp && !this_p_isLast ) {
                n += 1;
                if (next_p.appliedParagraphStyle != csp) doS.push(next_p); 
            }
            // 12 - If _this_ AND _next_ paragraphs style is ANY/NOTFOUND THEN change _this_ AND _next_ para.
            if (!ffp && !fsp && cfp && csp) {
                 if (!block.contains(this_p)) {
                    n += 1;
                    if (this_p.appliedParagraphStyle != cfp) doF.push(this_p);
                    if (!this_p_isLast && next_p.appliedParagraphStyle != csp) doS.push(next_p);
                    block.push(next_p);
                }
            }
            // 13 - the zeroChange run - just counting ffp and fsp matches
            if (!cfp && !csp) {
                 if ((ffp && fsp && !this_p_isLast && this_p.appliedParagraphStyle == ffp && next_p.appliedParagraphStyle == fsp) || 
                    (ffp && !fsp  && this_p.appliedParagraphStyle == ffp) ||
                    (!ffp && fsp && !this_p_isLast && next_p.appliedParagraphStyle == fsp))
                        n += 1;
            }
        } // end For (through all paragraphs)
        // apply "changeTo"-paragraph styles
        if (!zeroChanges) {
            for (i = 0; i < doF.length; i++) {
                doF[i].applyParagraphStyle(cfp, false);
            }
            for (i = 0; i < doS.length; i++) {
                doS[i].applyParagraphStyle(csp, false);
            }
        }
        // returning number of changed paragraphs
        return {"matches": n, "changed": zeroChanges? -1 : doF.length + doS.length};
    }

    // ===========================================
    //   UTILITY FUNCTIONS 
    // ===========================================

    function log (s) 
    {
        if (_logging === 0 || s == "") {return;}
        var d = new Date();
        var timestamp = ("0" + d.getHours()).slice(-2) + ":" + 
                       ("0" + d.getMinutes()).slice(-2) + ":" + 
                       ("0" + d.getSeconds()).slice(-2);
        
        // Add timestamp to message
        var logMessage = timestamp + " - " + s;
        if (_logging === 2 ) {$.writeln(s + "\n\r"); return;}
        var f = File (_scriptFolder + "~" + _scriptFileName + ".log");
        try { 
            // Read existing content if file exists
            var existingContent = "";
            if (f.exists) {
                f.open("r");
                existingContent = f.read();
                f.close();
            }
            
            // Write new entry at top, followed by existing content
            f.open("w"); 
            f.write(logMessage + "\n" + existingContent);
            f.close();
        }
        catch(e){ 
            alert('Error writing log to file: ' +'\n'+ e.toString()+'\r'); 
            return;
        }
    }
    // ===========================================
    function scriptFolder () 
    {
        return Folder ($.fileName).path+"/";
	}
    // ===========================================
    function scriptFileName () 
    {
        return File ($.fileName).name.replace(/\.[^.]+$/, "");
	}
    // ===========================================
    function askYN (s) 
    { // taken from Peter Kahrel GrepQuery Manager
        var w2 = new Window ("dialog", localize({en: 'Confirm', de: 'Bestätigen'}), [w.location.x, w.location.y + w.size.height/2, undefined, undefined], {closeButton: false});
            var t = w2.add ("group");
                t.add ("statictext", undefined, s);
            var b = w2.add ("group");
                b.add ("button", undefined, localize({en: 'Yes', de: 'Ja'}), {name: "ok"});
                b.add ("button", undefined, localize({en: 'No', de: 'Nein'}), {name: "cancel"});
       w2.layout.layout(true);
       w2.center(w);
       var temp = w2.show ();
       w2.close ();
       return temp == 1;
    }  
} // end main

main();