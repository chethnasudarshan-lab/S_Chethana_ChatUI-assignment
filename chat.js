// Assignment: Chat UI
// Author: S Chethana
// this is the main javascript file

$(document).ready(function() {
    var myInput = $('#chat-input');
    var buttonSend = $('#send-btn');
    var theList = $('#messages-list');
    var isWaiting = false; // so you cant send right away
    
    // some fake bot answers since we don't have a backend
    var botAnswers = [
        "That's an interesting question! Let me think about it.",
        "I can certainly help you with that.",
        "Could you provide a bit more detail please?",
        "Based on what I know, you should start small.",
        "I am just a frontend app so I don't know the answer!",
        "It looks like you're looking for creative ideas.",
        "I'm sorry, I don't have enough context to answer.",
        "Yes, absolutely!",
        "That sounds like a great plan."
    ];

    // check if we type something to enable button
    myInput.on('input', function() {
        if (myInput.val() != "" && isWaiting == false) {
            buttonSend.prop('disabled', false); // enable
        } else {
            buttonSend.prop('disabled', true); // disable
        }
    });

    // press enter to send message
    myInput.keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault(); // stop new line from forming
            buttonSend.click();
        }
    });

    buttonSend.click(function() {
        var myText = myInput.val();
        
        // dont do anything if its empty
        if(myText == "") {
            return;
        }

        // hide the welcome screen when we talk
        $('#welcome-screen').hide();
        theList.removeClass('d-none');

        // get current time
        var msgTime = new Date().toLocaleTimeString();
        
        // add my message to the screen (aligned right)
        var myDiv = "<div class='user-message' style='text-align: right; margin-bottom: 20px;'>" + 
            "<span style='background-color: #e3f2fd; padding: 12px 15px; border-radius: 15px 15px 0px 15px; display: inline-block; max-width: 70%; text-align: left;'>" + 
            myText + "</span><br>" +
            "<small style='font-size: 11px; color: gray;'>Me - " + msgTime + "</small></div>";
            
        theList.append(myDiv);
        
        // empty input box and disable send button
        myInput.val("");
        buttonSend.prop('disabled', true);

        // scroll to the bottom automatically
        var chatBox = document.getElementById("chat-container");
        chatBox.scrollTop = chatBox.scrollHeight;

        // make bot reply after a short delay
        isWaiting = true;
        $('#typing-indicator').removeClass('d-none');
        chatBox.scrollTop = chatBox.scrollHeight; // scroll down again for the typing text
        
        setTimeout(function() {
            // hide typer
            $('#typing-indicator').addClass('d-none');
            
            // grab a random response from our array
            var randomNum = Math.floor(Math.random() * botAnswers.length);
            var reply = botAnswers[randomNum];
            
            var botTime = new Date().toLocaleTimeString();
            
            // bot message html (aligned left)
            var botDiv = "<div class='ai-message' style='text-align: left; margin-bottom: 20px;'>" + 
            "<span style='background-color: #f1f1f1; padding: 12px 15px; border-radius: 15px 15px 15px 0px; display: inline-block; max-width: 70%;'>" + 
            "🤖 Bot: " + reply + "</span><br>" +
            "<small style='font-size: 11px; color: gray;'>" + botTime + "</small></div>";
            
            theList.append(botDiv);
            
            chatBox.scrollTop = chatBox.scrollHeight;
            isWaiting = false; // we can type again
            
        }, 1500); // wait 1.5 seconds so it feels real
    });

    // sidebar buttons for mobile view
    $('#mobile-menu-btn').click(function() {
        $('#sidebar').css('left', '0'); // show sidebar
    });

    $('#close-sidebar-btn').click(function() {
        $('#sidebar').css('left', '-300px'); // hide sidebar
    });
    
    // click suggestions to auto-fill input
    $('.suggestion-card').click(function() {
        var cardText = $(this).find('p').text();
        myInput.val(cardText);
        buttonSend.prop('disabled', false); // turn on button
        myInput.focus();
    });
    
    // clear chat button (new chat)
    $('#new-chat-btn').click(function() {
        theList.empty(); // clear html
        theList.addClass('d-none'); // hide list
        $('#welcome-screen').show(); // show welcome again
        myInput.val("");
        buttonSend.prop('disabled', true);
    });
});
