var root = "../../";

$(document).ready(function() {
  var button = $('button#compile');

  button.click(function(ev) {
    button.text('Compiling…');
    button.attr('disabled', 'disabled');
    button.addClass('disabled');

    var bibtex = new BibTeX('./');
    window.bibtex = bibtex;

    var log = $('#log').text('');
    bibtex.on_stdout = function(txt) { log.append(txt+'\n'); }
    bibtex.on_stderr = function(txt) { log.append(txt+'\n'); }

    var code = $('#editor').val();

    var texlive = new TeXLive(bibtex);    
      texlive.compile(code, root, function(tex) {
        button.text('Compile');
        button.removeAttr('disabled');
        button.removeClass('disabled');
      })

    // downloadFiles(bibtex, document_files, function() {
    //   var texlive = new TeXLive(bibtex);

    //   texlive.compile(code, root, function(tex) {
    //     button.text('Compile');
    //     button.removeAttr('disabled');
    //     button.removeClass('disabled');
    //   });
    // });
  });

  var downloadFiles = function(bibtex, files, callback) {
    var pending = files.length;
    var cb = function() {
      pending--;
      if(pending === 0)
        callback();
    }

    for(var i in files) {
      bibtex.addUrl.apply(bibtex, files[i]).then(cb);
    }
  }

  var document_files = [
      // [root+'test.aux', '/', 'test.aux']
  ];
});
