//--------------------------------------
// Version 2.2
// Author: Shaun Mackey
//--------------------------------------

//change how_many_nav_options to the desired number of buttons
//add a separate div for each section in index.html, (slider1, slider2, etc.)
//add a name for each button in button_names array
var how_many_nav_options = 4; 
var button_names = ["Button 1", "Button 2", "Button 3", "Button 4"];


//Don't change anything below this line

// init
var is_down = false;
var currently_open = "slider1";
$(document).ready(function () {
    $('#slider1').slideDown();
    setTimeout(set_slider_property, 1);
    currently_open = "slider1";
    document.getElementById("button1").className = "button-active";
});

// switches is_down's boolean
function set_slider_property() {
    if (is_down) {
        is_down = false;
    } else {
        is_down = true;
    }
}

// close and open sections/highlight active and inactive tabs
function run_transition(a, b) {
    var is_active = a.replace('slider', '');
    if (is_active != b) {
        $('#' + a).slideUp(500, function () {
            // Animation complete.
            if ($('#' + a + ':last').is(this)) {
                $('#slider' + b).slideDown(800);
                //set highlighting of nav options
                var inactive = a.replace('slider', '');
                var active = b.replace('slider', '');
                document.getElementById("button" + inactive).className = "button";
                document.getElementById("button" + active).className = "button-active";
            }
        });
    }
}

// build buttons
function button_clicks() {
    var i;
    for (i = 1; i < (how_many_nav_options+1); i++) {

        //build the links
        $("div#centerification").append('<a class="button" id="button' + i + '" href="#" >' + button_names[i-1] + '</a>');

        // click events
        $('#button' + i).on("click", function () {
            var which_clicked = this.id.replace('button', '');
            $(which_clicked).slideDown();
            if ($(':animated').length) {
                return false;
            } else {
                run_transition(currently_open, which_clicked);
                currently_open = "slider" + (which_clicked);
            }
            set_slider_property();
        }
        );
    }
}

button_clicks();
