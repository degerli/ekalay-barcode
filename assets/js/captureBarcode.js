$(document).ready (function(){
    $("#success-alert").hide();
});

// Get the input box

var textInput = document.getElementById('krhid');

// Init a timeout variable to be used below
var timeout = null;

// Listen for barcode scanner
textInput.onkeyup = function (e) {

    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(timeout);

    // Make a new timeout set to go off in 800ms
    timeout = setTimeout(function () {
        // Query time to REST API
        var timeInOut = document.getElementById('countdown').textContent;
        var krhid = document.getElementById('krhid').value;
        var data = {}
        $.ajax({
          type: "GET",
          url: "https://e.updkalay.com/barcode/inout/" + krhid + "/?datetime=" + encodeURIComponent(timeInOut),
          data: data,
          dataType: "json",
          success: function(data) {
              if (data.error) {
                  console.log(krhid + " | " + timeInOut);

                  var dialog = bootbox.dialog({
                    message: '<center><h1 style="color:red;"><strong>Failed!</strong> Please try again! ['+ data.msg +']</h1></center>',
                    closeButton: false
                  });
                  // do something in the background
                  textInput.disabled=true;
                  setTimeout(function() {
                      dialog.modal('hide');
                      textInput.disabled=false;
                      textInput.value="";
                      textInput.focus();
                  }, 3000);
              }
              else {
                  console.log(krhid + " | " + timeInOut);
                  if(data.isin) {
                      var dialog = bootbox.dialog({
                        message: '<center><h1 style="color:green;"><strong>Success!</strong> ('+ krhid +') has been signed <b>in</b> successfully!</h1></center>',
                        closeButton: false
                      });
                  }
                  else {
                      var dialog = bootbox.dialog({
                        message: '<center><h1 style="color:green;"><strong>Success!</strong> ('+ krhid +') has been signed <b>out</b> successfully!</h1></center>',
                        closeButton: false
                      });
                  }
                  // do something in the background
                  textInput.disabled=true;
                  setTimeout(function() {
                      dialog.modal('hide');
                      textInput.disabled=false;
                      textInput.value="";
                      textInput.focus();
                  }, 3000);
              }
          },
          complete: function(response){
              textInput.focus();
          }
        });
    }, 200);
};

with (document.getElementById('krhid')) {
        onblur = function(e) {
            var elm = e.target;
            setTimeout(function(){elm.focus()});
        }
        onkeydown = function(e) {
            var key = e.which || e.keyCode;
            if (key == 9) e.preventDefault();
            // code for tab is 9
        }
    }
