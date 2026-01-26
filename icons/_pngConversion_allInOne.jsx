function script_folder () {
    try {return File (app.activeScript).path+"/";}
    catch(e) {return File (e.fileName).path+"/";}
}
function graphic_to_text (infiles /*array of file objects*/ ) {
    var outfile, fname, s,
    re1 = /^\(new String\(/,
    re2 = /\)\)$/;
    for (var i = 0; i < infiles.length; i++) {
        if (infiles[i].exists) {
            fname = File (infiles[0].fullName.replace (/\.(png|idrc)$/, '.txA'));
            outfile = File (infiles[i].fullName.replace (/\.(png|idrc)$/, '.txt'));
            fname.open ('a');
            infiles[i].encoding = 'BINARY';
            infiles[i].open('r');
            s = infiles[i].read();
            fname.write('var ' + outfile.name.replace ('.txt', '') + ' = ');
            fname.write(s.toSource().replace(re1, '').replace(re2, ''));
            fname.write(';\r');
            infiles[i].close();
            fname.close();
        }
     }
}
var ScriptFolder = script_folder();

graphic_to_text (Folder(ScriptFolder).getFiles ("*.png"));