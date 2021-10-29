$(document).ready(function() {

    // play button animation
    $("#play-ball").hover(function() {
        $(this).animate({ height: '105px', width: '105px' }),
            $(this).animate({ height: '100px', width: '100px' });
    });

    // game play area functions to hide play button 
    // when game grid is displayed. 
    // score and restart button also to be displayed 
    // when game grid is displayed.
    // congratulations message to display when game completed.
    $('#play').click(function() {
        $('#play').hide();
        $('.grid').show();
        $('#restart').show();
        $('#score').show();
        $('#congrats').show();
    })



});