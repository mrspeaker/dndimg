function drag (cb) {

  const hover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
  }

  const drag = document.querySelector("#drag");
  drag.addEventListener("dragover", hover, false);
  drag.addEventListener("dragleave", hover, false);
  drag.addEventListener("drop", e => {

    hover(e);

    var files = e.target.files || e.dataTransfer.files;
    for (var i = 0, f; f = files[i]; i++) {
      cb(f);
    }
  }, false);
}

export default (cb) => drag(cb);
