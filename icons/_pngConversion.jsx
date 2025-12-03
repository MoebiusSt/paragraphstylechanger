function script_folder () {
    try {return File (app.activeScript).path+"/";}
    catch(e) {return File (e.fileName).path+"/";}
}
function graphic_to_text (infiles /*array of file objects*/ ) {
    var outfile, s,
    re1 = /^\(new String\(/,
    re2 = /\)\)$/;
    for (var i = 0; i < infiles.length; i++) {
        if (infiles[i].exists) {
            outfile = File (infiles[i].fullName.replace (/\.(png|idrc)$/, '.txt'));
            outfile.open ('w');
            infiles[i].encoding = 'BINARY';
            infiles[i].open('r');
            s = infiles[i].read();
            outfile.write('var ' + outfile.name.replace ('.txt', '') + ' = ');
            outfile.write(s.toSource().replace(re1, '').replace(re2, ''));
            outfile.write(';');
            infiles[i].close();
            outfile.close();
        }
     }
}
var ScriptFolder = script_folder();

graphic_to_text (Folder(ScriptFolder).getFiles ("*.png"));