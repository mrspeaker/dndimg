const gui = require('nw.gui');
import drag from './drag';
import $ from 'jquery'
import imgur_client_id from './imgur_client_id';

const clipboard = gui.Clipboard.get();
{
  /* Hack to enable cmd keys */
  let win = gui.Window.get();
  const nativeMenuBar = new gui.Menu({ type: "menubar" });
  try {
    nativeMenuBar.createMacBuiltin("My App");
    win.menu = nativeMenuBar;
  } catch (ex) {
    console.log(ex.message);
  }
}

function uploaded ({data}, status) {

  clipboard.set(data.link, 'text');

  $("#msg").html(`<a href="${data.link}" target="_blank">${data.link}</a>`);
  //console.log("completeHandler", status);
}

drag((file) => {

  $("#msg").html(`Uploading...`);

  var reader = new FileReader();
  reader.onload = function (e) {

    const formData = e.target.result.replace("data:image/png;base64,", "");
    const data = new FormData();
    data.append("image", formData);

    $.ajax({
      headers: {"Authorization": 'Client-ID ' + imgur_client_id},
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      xhr: function() {
         var x = $.ajaxSettings.xhr();
         if (x.upload) {
             x.upload.addEventListener('progress',(p) => {
              console.log("Prog: " + p.loaded + "/" + p.total);
            }, false);
         }
         return x;
      },
      success: (result, status, jqXHR) => uploaded(result, status),
      error: (a, b, c) => console.log("errorHandler", a, JSON.stringify(a)),
      data: data,
      cache: false,
      contentType: false,
      processData: false
    });

  }
  reader.readAsDataURL(file);
});

export default {};
