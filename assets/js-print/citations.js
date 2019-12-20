function citations(content) {

  let parties = content.querySelectorAll(".partie");


  /* Create endnotes for each part (call + list) ------------------------------- */
  for (let n = 0; n < parties.length; n++) {
    let partie = parties[n];
    let numPart = partie.getAttribute("data-partie");
    let list = partie.getElementsByClassName("refs-biblio")[0].getElementsByTagName("ul")[0];

    let citations = partie.querySelectorAll(".citation");

    for (let i = 0; i < citations.length; i++) {

      let citationText = citations[i].innerHTML;
      if (citationText.charAt(0) === '(') {
        citationText = citationText.substr(1, citationText.length - 2);
      }

      let numRef = i + 1;

      let noteCall = document.createElement('a');
      noteCall.classList.add("ref-fn");
      noteCall.href = '#part' + numPart + '-fn' + numRef;
      noteCall.id = 'part' + numPart + '-ref' + numRef;
      noteCall.setAttribute("data-ref", numRef);
      noteCall.innerHTML = numRef;

      citations[i].parentNode.replaceChild(noteCall, citations[i]);

      let note = document.createElement("li");
      note.id = 'part' + numPart + '-fn' + numRef;
      note.innerHTML = '<span class="mark-fn">' + numRef + '</span> ' + citationText + '<a href="#part' + numPart + '-ref' + numRef + '">↩</a>';
      list.appendChild(note);

    }

    let texts = content.querySelectorAll("p");
    for (let n = 0; n < texts.length; n++) {     
         
        contentText = texts[n].innerHTML.replace(' <a class="ref-fn"', '&nbsp;<a class="ref-fn"');
        
        texts[n].innerHTML = contentText;
    }

  }


  /* Add endnotes for notices ------------------------------- */
  let notices = ["notice-ra57", "notice-ra73a", "notice-ra74"];
  let symbols = ["*", "†", "‡", "§"];

  for (let n = 0; n < notices.length; n++) {

    /* get text of notes */
    let bibnotice = content.getElementById(notices[n]);
    let bibnoticeP = bibnotice.getElementsByClassName("notice-content")[0].getElementsByTagName("p");
    let bibnoticeLastP = bibnoticeP[bibnoticeP.length - 1];
    let bibnoticeLastPText = bibnoticeLastP.innerHTML;

    /* transform last paragraph into note */
    if (notices[n] == 'notice-ra57') {
      bibnoticeLastP.innerHTML = 'D’après J.-C. Balty, 2005 <a class="ref-fn-notice" href="' + bibnotice.id + '-fn" id="' + bibnotice.id + '-ref">' + symbols[n] + '</a>'
    } else if (notices[n] == 'notice-ra73a') {
      bibnoticeLastP.innerHTML = 'D’après J.-C. Balty, 2012 <a class="ref-fn-notice" href="' + bibnotice.id + '-fn" id="' + bibnotice.id + '-ref">' + symbols[n] + '</a>'
    } else if (notices[n] == 'notice-ra74') {
      bibnoticeLastP.innerHTML = 'D’après E. Rosso, 2006 <a class="ref-fn-notice" href="' + bibnotice.id + '-fn" id="' + bibnotice.id + '-ref">' + symbols[n] + '</a>'
    }

    /* create call + endnotes */
    let listNote = content.querySelector("#refs-biblio-02").getElementsByTagName("ul")[0];
    let newNote = document.createElement("li");
    newNote.id = bibnotice.id + '-fn';
    newNote.innerHTML = '<span class="mark-fn-notice">' + symbols[n] + '</span> ' + bibnoticeLastPText + '<a href="' + bibnotice.id + '-ref">↩</a>';
    listNote.appendChild(newNote);
  }


}