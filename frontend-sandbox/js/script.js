$(document).ready(function() {

    function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    console.log('before');
    wait(1000);  //1 second in milliseconds
    console.log('after');

    $('#hello-title').text('Hello Macho Man');
    $('#hello-title').css('color', '#74b0f2');
    $('#macho-man').show();

});
