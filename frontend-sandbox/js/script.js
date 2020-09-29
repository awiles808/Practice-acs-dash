$(document).ready(function() {

    // generate country drop down

    // example code
    var fipsList = Object.keys(gDropdown)
    var fips = gDropdown[fipsList[0]].fips;
    var county = gDropdown[fipsList[0]].name;
    $option = $('<option>').attr('value',fips).html(county);
    $('#county-dd').append($option);

    // loop
    for (let i = 1; i < fipsList.length; i++) {
        var fips = gDropdown[fipsList[i]].fips;
        var county = gDropdown[fipsList[i]].name;
        $option = $('<option>').attr('value',fips).html(county);
        $('#county-dd').append($option);
    }

    // on change save fips code
    $('#county-dd').change(function() {
        gFips = $(this).children("option:selected").val();
        console.log(gFips)
    });


});
