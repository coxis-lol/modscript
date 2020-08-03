// ==UserScript==
// @name        Moderation script Test
// @author      TheLUCKYfighter & Coxis (EU EN - Wrenchmen)
// @version     1.7.4
// @include     http://boards.euw.leagueoflegends.com/en/*
// @include     http://boards.eune.leagueoflegends.com/en/*
// @include     http://apollo-mod.euw.leagueoflegends.com/*
// @include     http://apollo-mod.eune.leagueoflegends.com/*
// @grant       none
// @run-at      document-end
// ==/UserScript==
// This script is open source inside the League of Legends Volunteer Program. It can be viewed, used, modified, shared with other volunteers by anybody who wants to do so. However, make sure anything you change is in line with the guidelines we have inside the Volunteer program. 

// Initialize //

$(window).load(function(){

    // Get URL

    var pageURL = window.location.href;

    // Explode URL

    var URLpart = pageURL.split("/");
    var locationURLpart = URLpart[2].split(".");

    // Set some variables

    var region = locationURLpart[1];

    // Check if on boards or on Apollo

    if (locationURLpart[0] == "apollo-mod") { 

        //////////////////
        // If on Apollo //
        //////////////////

        if(URLpart[3] == "confirm_delete") { // Execute this only on the deletion page

            // Single Deletion

            inject_css ();
            generate_buttons ();
            set_standard_bantimes ();
           
            // Define some more variables

            var violation;
            var template;
            var violatedRule;
            var internalNote;
            var suspensiongrade;


            // On button click functions
            
            var clicked_button = 0;
            
            $( ".buttons_1st_col" ).click(function () {
                suspensiongrade = first_stage( this.id );
                $('#delete-reason').val(" ");
                $('#violated-rule').val("Select One...");
                $('#delete-note').val(" ");

                var dropdown1 = $('#dropdown');
                dropdown1.empty().append(
                    '<option value="0">Nothing to choose!</option>');

                $('#suggest').css('background-color', '#848484').prop('disabled', true);
                $('#dropdown').prop('disabled', true);

            });
            
            

            $( ".buttons_active" ).click(function () {
                $( ".buttons_active").css('background-color', '#4682B4');
                $( ".buttons_last_col" ).css('background-color', '#4682B4');
                var offense_arr = clicked( this.id );
                var message_header = set_message_header ("solo");
                $('#delete-reason').val(message_header + offense_arr[0] + suspensiongrade + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (violation)
                clicked_button = 1;
            });
            $( ".buttons_last_col" ).click(function () {
                var offense_arr = clicked( this.id );
                var message_header = set_message_header ("solo");
                var cut1 = message_header.indexOf(" due");
                var cut2 = message_header.indexOf(":");
                var length = message_header.length;
                var cut3 = message_header.slice(0, cut1) + message_header.slice(cut2, length);
                $('#delete-reason').val(cut3 + offense_arr[0] + offense_arr[1]);
                //$('#delete-reason').val(offense_arr[0] + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (discretion)
                $( ".buttons_active").css('background-color', '#848484').prop('disabled', true);
                $("#none").css('background-color', '#00cc00');
                $("#warning").css('background-color', '#009933');
                $("#temporary").css('background-color', '#FFBF00');
                $("#final_warning").css('background-color', '#FF8000');
                $("#permanent").css('background-color', '#D80000');
                $("#special").css('background-color', '#9933ff');
                set_standard_bantimes ();
                clicked_button = 2;
            });
            $( ".suggest_active" ).click(function () {
                if (clicked_button == 1) {
                $( ".buttons_active").css('background-color', '#4682B4');
                $( ".buttons_last_col" ).css('background-color', '#4682B4');
                var offense_arr = clicked( this.id );
                var message_header = set_message_header ("solo");
                $('#delete-reason').val(message_header + offense_arr[0] + suspensiongrade + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (violation)
                $( ".suggest_active").css('background-color', '#FF00FF');
                clicked_button = 1;
                } else if (clicked_button == 2) {
                var offense_arr = clicked( this.id );
                var message_header = set_message_header ("solo");
                var cut1 = message_header.indexOf(" due");
                var cut2 = message_header.indexOf(":");
                var length = message_header.length;
                var cut3 = message_header.slice(0, cut1) + message_header.slice(cut2, length);
                $('#delete-reason').val(cut3 + offense_arr[0] + offense_arr[1]);
                //$('#delete-reason').val(offense_arr[0] + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (discretion)
                $( ".buttons_active").css('background-color', '#848484').prop('disabled', true);
                $( ".suggest_active").css('background-color', '#FF00FF');
                $("#none").css('background-color', '#00cc00');
                $("#warning").css('background-color', '#009933');
                $("#temporary").css('background-color', '#FFBF00');
                $("#final_warning").css('background-color', '#FF8000');
                $("#permanent").css('background-color', '#D80000');
                $("#special").css('background-color', '#9933ff');
                set_standard_bantimes ();
                clicked_button = 2;
                } else {
                alert("NOPE");
                }
            });
        }

        if(URLpart[3] == "confirm_bulk_delete") { // Execute this only on the bulk deletion page

            // Bulk Deletion

            inject_css ();
            generate_buttons ();
            set_standard_bantimes ();

            // Define some more variables

            var violation;
            var template;
            var violatedRule;
            var internalNote;
            var suspensiongrade;


            // On button click functions

            $( ".buttons_1st_col" ).click(function () {
                suspensiongrade = first_stage( this.id );
                $('#delete-reason').val(" ");
                $('#violated-rule').val("Select One...");
                $('#delete-note').val(" ");

                var dropdown1 = $('#dropdown');
                dropdown1.empty().append(
                    '<option value="0">Nothing to choose!</option>');

                $('#suggest').css('background-color', '#848484').prop('disabled', true);
                $('#dropdown').prop('disabled', true);

            });

            $( ".buttons_active" ).click(function () {
                $( ".buttons_active").css('background-color', '#4682B4');
                $( ".buttons_last_col" ).css('background-color', '#4682B4');
                var offense_arr = clicked( this.id );
                var message_header = set_message_header ("bulk");
                $('#delete-reason').val(message_header + offense_arr[0] + suspensiongrade + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (violation)
                clicked_button = 1;
            });
            $( ".buttons_last_col" ).click(function () {
                var offense_arr = clicked( this.id );
                $('#delete-reason').val(offense_arr[0] + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (discretion)
                $( ".buttons_active").css('background-color', '#848484').prop('disabled', true);
                $("#none").css('background-color', '#00cc00');
                $("#warning").css('background-color', '#009933');
                $("#temporary").css('background-color', '#FFBF00');
                $("#final_warning").css('background-color', '#FF8000');
                $("#permanent").css('background-color', '#D80000');
                $("#special").css('background-color', '#9933ff');
                set_standard_bantimes ();
                clicked_button = 2;
            });
            $( ".suggest_active" ).click(function () {
                if (clicked_button == 1) {
                $( ".buttons_active").css('background-color', '#4682B4');
                $( ".buttons_last_col" ).css('background-color', '#4682B4');
                var offense_arr = clicked( this.id );
                var message_header = set_message_header ("bulk");
                $('#delete-reason').val(message_header + offense_arr[0] + suspensiongrade + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (violation)
                $( ".suggest_active").css('background-color', '#FF00FF');
                clicked_button = 1;
                } else if (clicked_button == 2) {
                var offense_arr = clicked( this.id );
                $('#delete-reason').val(offense_arr[0] + offense_arr[1]);
                $('#violated-rule').val(offense_arr[2]);
                $('#delete-note').val(offense_arr[3]);
                $( "#" + this.id ).css('background-color', '#00BFFF'); //insert color selected button (discretion)
                $( ".buttons_active").css('background-color', '#848484').prop('disabled', true);
                $( ".suggest_active").css('background-color', '#FF00FF');
                $("#none").css('background-color', '#00cc00');
                $("#warning").css('background-color', '#009933');
                $("#temporary").css('background-color', '#FFBF00');
                $("#final_warning").css('background-color', '#FF8000');
                $("#permanent").css('background-color', '#D80000');
                $("#special").css('background-color', '#9933ff');
                set_standard_bantimes ();
                clicked_button = 2;
                } else {
                alert("NOPE");
                }
           });

        }


        //////////////////////////
        // End of Apollo Script //
        //////////////////////////

     } else if (locationURLpart[0] == "boards") { 

        //////////////////
        // If on Boards //
        //////////////////

        // Attach Mod-Queue link to Riot Bar

        var ModQ = "<li class=\"touchpoint-Apollo\" data-ping-meta=\"riotbar-content=touchpoints|riotbar-touchpoint=Moderation Que\"><a href=\"http://apollo-mod." + region + ".leagueoflegends.com/moderation/reported?application_id=0oazE84H&content_type=all&query=&report_type=*\">Moderation</a></li>";
        $("#riotbar-touchpoints ul").append(ModQ);

        // Attach link to Apollo profile on Boards profile

        var UserProfileLink = $('#profile-widget').find('a').attr('href');
        var UserLinkPart = UserProfileLink.split("/");
        var UserID = UserLinkPart[6];
        var ApolloLink = "http://apollo-mod." + region + ".leagueoflegends.com/users/" + URLpart[5] + "/" + UserID;
        var Apolloprofile = "<div class=\"badges\"><a class=\"match-history button\" href=\"" + ApolloLink + "\" target=\"_blank\">View Apollo profile</a></div>";
        $('#profile-widget').append(Apolloprofile);

    }
});        




/////////////////////////
// Re-usable functions //
/////////////////////////

function inject_css () {
    var css = `<style>
.titanic {
float: none;
}

.buttons_active, .buttons_1st_col, .buttons_last_col {
background-color: #4682B4;
color: #FFFFFF;
border-radius: 8px;
width: 100%;
}

.ul_style {
list-style-type: none;
text-align: center;
display: inline;
}

.td_style {
border-radius: 8px;
width: 20%;
text-align: center;	
}

#none {
background-color: #00cc00;
}

#warning {
background-color: #009933;
}

#temporary {
background-color: #FFBF00;
}

#final_warning {
background-color: #FF8000;
}

#permanent {
background-color: #D80000;
}

#special {
background-color: #9933ff;
}

</style>`

    $( "head" ).append(css); // inject css
}


function generate_buttons () {
    var columns22 = [
        "Suspension",
        "Guidelines",
        "Behavior",
        "Activity",
        "Discretion"
    ];

    var max_elements = 7;
    var buttons = [
        [ "None", "Warning", "Temporary", "Final warning", "Permanent", "Special"],                                               // Suspension grade
        [ "Incorrect Board", "Wrong Language", "SPAM", "Duplicate", "Naming and shaming", "Spoilers"],                  // Guidelines
        [ "Jerk", "Harassment", "Threats", "Mature", "Extreme language", "Trolling", "Negative feedback"],                                   // Behavior
        [ "Scam", "Hack", "Acc trading", "Forbidden promo", "Off-topic promo", "Illegal activity"],        	// Activity
        [ "No Note", "Note", "Clean Boards"]                                                              	// Mod Discretion
    ];
    
    //var tooltips = [[
    
    var tablecontent = "<table id=\"Table1\"><tr>";    
    for (i = 0; i < columns22.length; i++) { 
        tablecontent = tablecontent + "<td style=\"vertical-align: top;\" class=\"td_style\" >" + columns22[i] + "<ul class=\"ul_style\">";
        for (j = 0; j < max_elements; j++ ) {
            if ( buttons[i][j] == null ) {
                break;
            } else {
                if (i == 0) {
                    var item_class = "buttons_1st_col";
                    var item_disabled = "";
                } else if (i == 4) {
                    var item_class = "buttons_last_col";
                    var item_disabled = "";                
                } else {
                    var item_class = "buttons_active";
                    var item_disabled = "disabled=\"disabled\"";                
                }
                tablecontent = tablecontent + "<li><button type=\"button\" class=\"" + item_class + "\"  id=\"" + buttons[i][j].toLowerCase().replace(/\ /g, "_") + "\" " + item_disabled + ">" + buttons[i][j] + "</button></li>";
            }
        }
        tablecontent = tablecontent + "</ul></td>";
    }
    tablecontent = tablecontent + "</tr></table>";

    $('#delete-confirm div:first label').append(tablecontent);
    $( ".buttons_active").css('background-color', '#848484');
    $('#Table1').append("<select id=\"dropdown\"><option value=\"nothing\">Nothing to choose!</option></select><button type=\"button\" class=\"suggest_active\" id=\"suggest\">Suggest!</button>");
    $('#suggest').css('background-color', '#848484').css('color', 'white').css('border-radius', '8px').css('width', '100%').prop('disabled', true);
    $('#dropdown').css('width', '100%').prop('disabled', true);
    $('.text-info').append("<a href=\"https://docs.google.com/document/d/1IhQdbAUgvUDbfbYuEBnP1_V33l5e_ZkfV0HiDD5YSCg/edit\" target=\"_blank\"><img border=\"0\" alt=\"Help\" src=\"http://vignette4.wikia.nocookie.net/mixedmartialarts/images/8/89/Help_logo.png/revision/latest?cb=20100314171646\" width=\"15\" height=\"15\"></a>");
};

function set_standard_bantimes () {
    var select = $('#delete-ban');
    select.empty().append(
        '<option value="0">None</option>',
        '<option value="1">1 hour</option>',
        '<option value="24">24 hours</option>',
        '<option value="72">3 days</option>',
        '<option value="168">1 week</option>',
        '<option value="336">2 weeks</option>',
        '<option value="1000000">Permanent</option>'
    );
};

function set_message_header (type) {
    if (type == "solo") {

        var ApolloPath = window.location.href;
        var PathPieces = ApolloPath.split('/');
        var BoardID = PathPieces[4];
        var boardname;
        var discussion = PathPieces[5];
        var content = $.trim($("blockquote").text());                                                  
        var v1 = $( "#delete h2:first" ).text().indexOf( "(" );                                       
        var owner = $.trim($( "#delete h2:first" ).text().substring( 35,v1 ));  
        var owner_server = $.trim($( "#delete h2:first" ).text().substring( v1 ).replace('(','').replace(')','').toLowerCase());
        var header;

        switch (BoardID) { // name the board board
            case "eZuvYsEr" :
                boardname = "help-support-en";
                break;
            case "2BfrHbKG" :
                boardname = "off-topic-en";
                break;
            case "yTagKVTg" :
                boardname = "forum-games-contests-en";
                break;
            case "NzaqEm3e" :
                boardname = "player-behaviour-en";
                break;
            case "WtAasNBw" :
                boardname = "team-recruitment-en";
                break;
            case "39gqIYVI" :
                boardname = "champions-gameplay-en";
                break;
            case "N9uP9Byj" :
                boardname = "esports-en";
                break;
            case "EcLQbP23" :
                boardname = "events-tournaments-en";
                break;
            case "jeJYsmwG" :
                boardname = "streams-videos-en";
                break;
            case "Mpd1UjGe" :
                boardname = "community-creations-en";
                break;
            case "ETj6EdvQ" :
                boardname = "bug-reports-eu";
                break;
            case "wRt0H1Af" :
                boardname = "battlegrounds-en";
                break;
            case "uf6okO5d" :
                boardname = "alpha-client-bugs-en";
                break;
            case "VnI9tlaf" :
                boardname = "alpha-client-discussion-en";
                break;
            case "slFBEUB8" :
                boardname = "announcements-en";
                break;
            case "00edEA0o" :
                boardname = "new-player-advice-euw";
                break;
        }        

        var URLPathPieces = PathPieces[2].split('.');
        var origin = "http://boards." + owner_server + "." + URLPathPieces[2] + "." + URLPathPieces[3] + "/en/c/" + boardname + "/" + discussion; // link assembly
        if ( isNaN(PathPieces[6]) === false ) {
            origin = origin + "?comment=" + PathPieces[6];
        }

        if ($('#delete').text().indexOf("Comment") > -1) {                                       
            if (content.length > 400){
                header = "Greetings **" + owner + "**!" + "\n\n" + "This comment has been removed from the Boards due to it violating the Universal Rules:" + "\n\n>" + "[" + content.slice(0, 399).split("\n") + " (...)" + "](" + origin + ")";
            } else {
                header = "Greetings **" + owner + "**!" + "\n\n" + "This comment has been removed from the Boards due to it violating the Universal Rules:" + "\n\n>" + "[" + content + "](" + origin + ")";
            }
        } else {
            header = "Greetings **" + owner + "**!" + "\n\n" + "This discussion has been removed from the Boards due to it violating the Universal Rules:" + " **[" + content + "](" + origin + ")**";
        }
        return header;
    };


    if (type == "bulk") {
        var links = "";
        var collection = $("#bulkCollection").attr("value");
        var collection_obj = JSON.parse(collection);
        var UserID_key = Object.keys(collection_obj);
        var userID = UserID_key[0];
        collection = collection_obj[userID]["content"];
        var DiscussionID;
        var CommentID;

        var origin;
        origin = window.location.href.split("?");
        var decodedURIorigin = decodeURIComponent(origin[1]);
        var URIarray = decodedURIorigin.split("/");
        var UserServer = URIarray[4].toLowerCase();
        // alert(UserServer);
        for (i=0; i<collection.length; i++) {
            var item = collection[i].split("|");
            if (item.length == 3) {
                BoardID = item[0];
                DiscussionID = item[1];
                CommentID = item[2];
                switch (BoardID) { // name the board board
                    case "eZuvYsEr" :
                       boardname = "help-support-en";
                       break;
                   case "2BfrHbKG" :
                       boardname = "off-topic-en";
                       break;
                   case "yTagKVTg" :
                       boardname = "forum-games-contests-en";
                       break;
                   case "NzaqEm3e" :
                       boardname = "player-behaviour-en";
                       break;
                   case "WtAasNBw" :
                       boardname = "team-recruitment-en";
                       break;
                   case "39gqIYVI" :
                       boardname = "champions-gameplay-en";
                       break;
                   case "N9uP9Byj" :
                       boardname = "esports-en";
                       break;
                   case "EcLQbP23" :
                       boardname = "events-tournaments-en";
                       break;
                   case "jeJYsmwG" :
                       boardname = "streams-videos-en";
                       break;
                   case "Mpd1UjGe" :
                       boardname = "community-creations-en";
                       break;
                   case "ETj6EdvQ" :
                       boardname = "bug-reports-eu";
                       break;
                   case "wRt0H1Af" :
                       boardname = "battlegrounds-en";
                       break;
                   case "uf6okO5d" :
                       boardname = "alpha-client-bugs-en";
                       break;
                   case "VnI9tlaf" :
                       boardname = "alpha-client-discussion-en";
                       break;
                   case "slFBEUB8" :
                       boardname = "announcements-en";
                       break;
                   case "00edEA0o" :
                       boardname = "new-player-advice-euw";
                       break;    
                }        
                links = links + "\nComment: http://boards." + UserServer + ".leagueoflegends.com/en/c/" + boardname + "/" + DiscussionID + "?comment=" + CommentID; // - Server: " + UserServer + " BoardID: " + BoardID + " DiscID: " + DiscussionID + " CommentID: " + CommentID;
            } else if (item.length == 2) {
                BoardID = item[0];
                DiscussionID = item[1];
                switch (BoardID) { // name the board board
                    case "eZuvYsEr" :
                       boardname = "help-support-en";
                       break;
                    case "2BfrHbKG" :
                       boardname = "off-topic-en";
                       break;
                    case "yTagKVTg" :
                       boardname = "forum-games-contests-en";
                       break;
                    case "NzaqEm3e" :
                       boardname = "player-behaviour-en";
                       break;
                    case "WtAasNBw" :
                       boardname = "team-recruitment-en";
                       break;
                    case "39gqIYVI" :
                       boardname = "champions-gameplay-en";
                       break;
                    case "N9uP9Byj" :
                       boardname = "esports-en";
                       break;
                    case "EcLQbP23" :
                       boardname = "events-tournaments-en";
                       break;
                     case "jeJYsmwG" :
                       boardname = "streams-videos-en";
                       break;
                    case "Mpd1UjGe" :
                       boardname = "community-creations-en";
                       break;
                    case "ETj6EdvQ" :
                       boardname = "bug-reports-eu";
                       break;
                    case "wRt0H1Af" :
                       boardname = "battlegrounds-en";
                       break;
                    case "uf6okO5d" :
                       boardname = "alpha-client-bugs-en";
                       break;
                    case "VnI9tlaf" :
                       boardname = "alpha-client-discussion-en";
                       break;
                    case "slFBEUB8" :
                       boardname = "announcements-en";
                       break;
                   case "00edEA0o" :
                       boardname = "new-player-advice-euw";
                       break;    
                }        
                links = links + "\nDiscussion: http://boards." + UserServer + ".leagueoflegends.com/en/c/" + boardname + "/" + DiscussionID; // - Server: " + UserServer + " BoardID: " + BoardID + " DiscID: " + DiscussionID;
            };

        };


                header = "Greetings Summoner!" + "\n\n" + "This content has been removed from the Boards due to it violating the Universal Rules:" + "\n" + links;
        return header;
    };
};


function first_stage(buttonID) {
    $( ".buttons_active" ).prop('disabled', false);
    $( ".buttons_active").css('background-color', '#4682B4');
    $( "#none" ).css('background-color', '#333399');
    $( "#warning" ).css('background-color', '#333399');
    $( "#temporary" ).css('background-color', '#333399');
    $( "#final_warning" ).css('background-color', '#333399');
    $( "#permanent" ).css('background-color', '#333399');
    $( "#special" ).css('background-color', '#333399');
    $( ".buttons_last_col" ).css('background-color', '#4682B4');
    switch (buttonID) {
        case "none" : 
            suspensiongrade = "\n\n";
            var select = $('#delete-ban');
            select.empty().append('<option value="0">None</option>');
            $("#none").css('background-color', '#00cc00');
            break;
        case "warning" : 
            suspensiongrade = "\n\nNo action has been taken against your account, but we would like to ask you to review the **[Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi)** before posting any future content on the Boards. Continued posting in this manner may result in action being taken.\n\n";
            var select = $('#delete-ban');
            select.empty().append('<option value="0">None</option>');
            $("#warning").css('background-color', '#009933');
            break;
        case "temporary" :
            suspensiongrade = "\n\nAs a result of your actions, your posting rights have been temporarily suspended. Please review the **[Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi)** before posting any future content on the Boards. Future violations of the Universal Rules may result in more severe punishments or even a permanent suspension.\n\n";
            var select = $('#delete-ban');
            select.empty().append(
                '<option value="1">1 hour</option>',
                '<option value="24">24 hours</option>',
                '<option value="72">3 days</option>',
                '<option value="168">1 week</option>',
                '<option value="336">2 weeks</option>');
            $("#temporary").css('background-color', '#FFBF00');
            break;
        case "final_warning" :
            suspensiongrade = "\n\nAs a result of your actions, your posting rights have been temporarily suspended. Please review the **[Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi)** before posting any future content on the Boards. This is your **final warning**, future violations of the Universal Rules will result in the permanent suspension of your posting rights.\n\n";
            var select = $('#delete-ban');
            select.empty().append(
                '<option value="1">1 hour</option>',
                '<option value="24">24 hours</option>',
                '<option value="72">3 days</option>',
                '<option value="168">1 week</option>',
                '<option value="336">2 weeks</option>');
            $("#final_warning").css('background-color', '#FF8000');
            break;
        case "permanent" :
            suspensiongrade = "\n\nAs a result of your actions, your posting rights have been permanently suspended. You can review the **[Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi)** to better understand why these actions have been taken.\n\n";
            var select = $('#delete-ban');
            select.empty().append('<option value="1000000">Permanent</option>');
            $("#permanent").css('background-color', '#D80000');
            break;
        case "special" :
            var Reasons = prompt("As a result of the user's actions, in combination with the aggravating circumstances of ...", "");
            var Grade = prompt("What suspension do you want to give this player? Choose from: temporary, final warning or permanently.", "");
            var select = $('#delete-ban');
            if (Grade == "temporary" || Grade == "Temporary" || Grade == "temporarily" || Grade == "Temporarily") {
                suspensiongrade = "\n\nAs a result of your actions, in combination with the aggravating circumstances of " + Reasons + ", your posting rights have been temporarily suspended. Please review the **[Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi)** before posting any future content on the Boards. Future violations of the Universal Rules may result in more severe punishments or even a permanent suspension.\n\n"
                select.empty().append(
                '<option value="1">1 hour</option>',
                '<option value="24">24 hours</option>',
                '<option value="72">3 days</option>',
                '<option value="168">1 week</option>',
                '<option value="336">2 weeks</option>');
            } else if (Grade == "final warning" || Grade == "Final warning") {
            suspensiongrade = "\n\nAs a result of your actions, in combination with the aggravating circumstances of " + Reasons + ", your posting rights have been temporarily suspended. Please review the **[Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi)** before posting any future content on the Boards. This is your **final warning** - future violations of the Universal Rules will result in the permanent suspension of your posting rights.\n\n";
                select.empty().append(
                '<option value="1">1 hour</option>',
                '<option value="24">24 hours</option>',
                '<option value="72">3 days</option>',
                '<option value="168">1 week</option>',
                '<option value="336">2 weeks</option>');
            } else if (Grade == "permanently" || Grade == "Permanently" || Grade == "permanent" || Grade == "Permanent") {
            suspensiongrade = "\n\nAs a result of your actions, in combination with the aggravating circumstances of " + Reasons + ", your posting rights have been permanently suspended. You can review the **[Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi)** to better understand why these actions have been taken.\n\n";
                select.empty().append('<option value="1000000">Permanent</option>');
            } else {
              alert("You didn't choose a valid suspension time. Please choose one of the following options: temporary, final warning or permanently.");
                $( ".buttons_active").css('background-color', '#848484').prop('disabled', true);
                $("#none").css('background-color', '#00cc00');
                $("#warning").css('background-color', '#009933');
                $("#temporary").css('background-color', '#FFBF00');
                $("#final_warning").css('background-color', '#FF8000');
                $("#permanent").css('background-color', '#D80000');
                $("#special").css('background-color', '#9933ff');
                set_standard_bantimes ();};
            $("#special").css('background-color', '#9933ff');
            break;
    }

    return suspensiongrade;
}

function clicked(buttonID) {
    $( ".buttons_last_col").css('background-color', '#4682B4');
    var dropdown1 = $('#dropdown');
    var violation;
    var template;
    var violatedRule;
    var internalNote;
	var origin = window.location.href;
    var originindex1 = origin.indexOf("new-player-advice");
    var originindex2 = origin.indexOf("00edEA0o");
    
    switch (buttonID) {
        case "incorrect_board" : 
            violation = "\n\n**Violation:** Posting in the Incorrect Board";
            if (originindex1 > -1 || originindex2 > -1) {
                template = `The "New Player Advice" board is intended for new players to get assistance from more experienced players, and ask relatively low level/basic questions. Because we want to create the best environment possible for new players to ask their questions in, we're taking a harsher stance on moderation. Any other questions, such as more advanced questions, will therefore be removed.

Here is a list of every section of the Boards and what they're meant for:

[Creations & Concepts](http://boards.euw.leagueoflegends.com/en/c/community-creations-en) - For sharing anything created by the community and showing off your skin ideas and champion concepts (_Note: Not for requesting skins or current champ tweaks_)
[Streams & Videos](http://boards.euw.leagueoflegends.com/en/c/streams-videos-en) - For videos and streams!
[Battlegrounds](http://boards.euw.leagueoflegends.com/en/c/battlegrounds-en) - For discussion about battlegrounds.
[Esports](http://boards.euw.leagueoflegends.com/en/c/esports-en) - For discussion around esports
[Champions & Gameplay](http://boards.euw.leagueoflegends.com/en/c/champions-gameplay-en) - For discussion around anything that has to do with playing the game. 
[Teams & Clubs](http://boards.euw.leagueoflegends.com/en/c/team-recruitment-en) - Want a team? Want new people on your team? Check this section out!
[Player Behaviour](http://boards.euw.leagueoflegends.com/en/c/player-behaviour-en) - For discussion around chat restrictions, Ranked Restrictions, LeaverBuster, suspensions, etc.
[Games, Contests & Jokes](http://boards.euw.leagueoflegends.com/en/c/forum-games-contests-en) - For participating in, or having, Forum Games and Contests, starting a never ending pun-thread or telling that one amazing joke!
[New Player Advice](http://boards.euw.leagueoflegends.com/en/c/new-player-advice-euw) - For advice for new players. 
[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en) - For technical Help and Support to get you back onto the Fields of Justice!
[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu) - For reporting bugs.
[Alpha Client Discussion](http://boards.euw.leagueoflegends.com/en/c/alpha-client-discussion-en) - For discussions around the new Alpha Client.
[Alpha Client Bugs](http://boards.euw.leagueoflegends.com/en/c/alpha-client-bugs-en) - For bug reports regarding the new Alpha Client.
[Off-topic](http://boards.euw.leagueoflegends.com/en/c/off-topic-en) - For anything that doesn't fit above.

If your Query is Account or Billing related, please [Submit a Request](https://support.riotgames.com/hc/requests/new) to Player Support, as only Player Support can help with these issues - they cannot be handled on the boards.

If you wish to, you can find a link to your original content at the top of this notification to copy/paste in the correct section.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
            } else { 
                template = `We want a place for everything, but if we don’t keep things organized, the boards become a lot less useful and a lot more cluttered. Here is a list of every section of the Boards and what they're meant for:

[Creations & Concepts](http://boards.euw.leagueoflegends.com/en/c/community-creations-en) - For sharing anything created by the community and showing off your skin ideas and champion concepts (_Note: Not for requesting skins or current champ tweaks_)
[Streams & Videos](http://boards.euw.leagueoflegends.com/en/c/streams-videos-en) - For videos and streams!
[Battlegrounds](http://boards.euw.leagueoflegends.com/en/c/battlegrounds-en) - For discussion about battlegrounds.
[Esports](http://boards.euw.leagueoflegends.com/en/c/esports-en) - For discussion around esports
[Champions & Gameplay](http://boards.euw.leagueoflegends.com/en/c/champions-gameplay-en) - For discussion around anything that has to do with playing the game. 
[Teams & Clubs](http://boards.euw.leagueoflegends.com/en/c/team-recruitment-en) - Want a team? Want new people on your team? Check this section out!
[Player Behaviour](http://boards.euw.leagueoflegends.com/en/c/player-behaviour-en) - For discussion around chat restrictions, Ranked Restrictions, LeaverBuster, suspensions, etc.
[Games, Contests & Jokes](http://boards.euw.leagueoflegends.com/en/c/forum-games-contests-en) - For participating in, or having, Forum Games and Contests, starting a never ending pun-thread or telling that one amazing joke!
[New Player Advice](http://boards.euw.leagueoflegends.com/en/c/new-player-advice-euw) - For advice for new players. 
[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en) - For technical Help and Support to get you back onto the Fields of Justice!
[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu) - For reporting bugs.
[Alpha Client Discussion](http://boards.euw.leagueoflegends.com/en/c/alpha-client-discussion-en) - For discussions around the new Alpha Client.
[Alpha Client Bugs](http://boards.euw.leagueoflegends.com/en/c/alpha-client-bugs-en) - For bug reports regarding the new Alpha Client.
[Off-topic](http://boards.euw.leagueoflegends.com/en/c/off-topic-en) - For anything that doesn't fit above.

If your Query is Account or Billing related, please [Submit a Request](https://support.riotgames.com/hc/requests/new) to Player Support, as only Player Support can help with these issues - they cannot be handled on the boards.

If you wish to, you can find a link to your original content at the top of this notification to copy/paste in the correct section.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;}
            violatedRule = "Adhere to Board Guidelines";
            internalNote = "Incorrect Board";
            dropdown1.empty().append(
                '<option value="0">No specific section</option>',
                '<option value="1">Creations & Concepts</option>',
                '<option value="2">Streams & Videos</option>',
                '<option value="4">Battlegrounds</option>',
                '<option value="5">Esports</option>',
                '<option value="6">Champions & Gameplay</option>',
                '<option value="8">Teams & Clubs</option>',
                '<option value="9">Player Behavior (short)</option>',
                '<option value="10">Player Behavior (extended)</option>',
                '<option value="11">Games, Contests & Jokes</option>',
                '<option value="12">Bug Reports</option>',
                '<option value="13">Off-topic</option>',
                '<option value="14">New Player Advice</option>',
                '<option value="15">Alpha Client Discussion</option>',
                '<option value="16">Alpha Client Bugs</option>',
                '<option value="17">Help & Support</option>',
                '<option value="99">Player Support</option>');

            $('#suggest').css('background-color', '#B404AE').prop('disabled', false);
            $('#dropdown').prop('disabled', false);
            break;
        case "wrong_language" : 
            violation = "\n\n**Violation:** Using the wrong language";
            template = `Here is a list of all the different Boards available in Europe:

**EU West:**

[English Boards](http://boards.euw.leagueoflegends.com/en/)
[German Boards](http://boards.euw.leagueoflegends.com/de/)
[Spanish Boards](http://boards.euw.leagueoflegends.com/es/)
[French Boards](http://boards.euw.leagueoflegends.com/fr/)
[Italian Boards](http://boards.euw.leagueoflegends.com/it/)

**EU Nordic & East:**

[English Boards](http://boards.eune.leagueoflegends.com/en/)
[Polish Boards](http://boards.eune.leagueoflegends.com/pl/)
[Romanian Boards](http://boards.eune.leagueoflegends.com/ro/)
[Hungarian Boards](http://boards.eune.leagueoflegends.com/hu/)
[Czech Boards](http://boards.eune.leagueoflegends.com/cs/)
[Greek Boards](http://boards.eune.leagueoflegends.com/el/)

**Other:**

[Russian Boards](http://boards.ru.leagueoflegends.com/ru/)
[Turkish Boards](http://boards.tr.leagueoflegends.com)

If you wish to, you can find a link to your original content at the top of this notification to copy/paste on the correct Board.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
            violatedRule = "Adhere to Board Guidelines";
            internalNote = "Wrong Language";
            dropdown1.empty().append(
                '<option value="100">No specific Board</option>',
                '<option value="101">EUW: English</option>',
                '<option value="102">EUW: German</option>',
                '<option value="103">EUW: Spanish</option>',
                '<option value="104">EUW: French</option>',
                '<option value="105">EUW: Italian</option>',
                '<option value="106">EUNE: English</option>',
                '<option value="107">EUNE: Polish</option>',
                '<option value="108">EUNE: Romanian</option>',
                '<option value="109">EUNE: Hungarian</option>',
                '<option value="110">EUNE: Czech</option>',
                '<option value="111">EUNE: Greek</option>',
                '<option value="112">Other: Russian</option>',
                '<option value="113">Other: Turkish</option>');

            $('#suggest').css('background-color', '#B404AE').prop('disabled', false);
            $('#dropdown').prop('disabled', false); 
            break;
        case "spam" : 
            violation = "\n\n**Violation:** Posting SPAM";
            template = `Posts that fit under one of the following categories may be considered spam and removed:

* Posts that do not contribute to a topic
* Posts that serve no purpose
* Repeated posting of the same content
* Begging. Sorry, while everyone loves free stuff, begging the community isn't welcome
* Referral links. Again, sorry, but referral links are spam even if they're about League of Legends`;            
            violatedRule = "No Spamming";
            internalNote = "Spam";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "duplicate" : 
            violation = "\n\n**Violation:** Spamming";
            template = `Recreating or reposting the same threads or comments over and over again not only clutters the board, but makes it difficult to find the posts you're really interested in. Please ensure you select the single most fitting board for your post (even if it can fit into multiple), and post it there only.

If your post is getting buried and you would like to increase visibility, we recommend you delete your original and repost it - however you should only do this once every 24 hours, or you risk it being removed as spam if you consistently repost it.

Any duplicate of any thread or comment will be removed, and if it's extreme (IE: posting in every board over a short period of time), your posting rights may be removed to prevent spam.`;            
            violatedRule = "No Spamming";
            internalNote = "Spam";

            var dropdown1 = $('#dropdown');
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "naming_and_shaming" : 
            violation = "\n\n**Violation:** Naming & Shaming";
            template = `Naming and Shaming is explicitly forbidden on the boards. You may share your experience with other players, however please do not name players specifically, or post screenshots/links to their name.

If you have had a negative experience with a player, there are two methods of reporting users:

1. For in-game abuse, including both post- and pre-game chat, please use the post-game reporting tool.

2. For out-of-game abuse (IE: direct messages), please submit a report to [Player Support](https://support.riotgames.com/hc/requests/new)

Doing these will submit a report to Riot for further investigation.`;
            violatedRule = "Reporting Other Players";
            internalNote = "Naming & Shaming";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "spoilers" : 
            violation = "\n\n**Violation:** Spreading spoilers";
            template = `We understand users want to have discussions about popular TV-series, movies, books, games or anything with a story. However, when this discussion includes spoilers regarding that story, please clearly indicate this in the title of your thread or at the top of your comment or your post will be at risk of being removed.`;
            violatedRule = "Adhere to Board Guidelines";
            internalNote = "Spreading spoilers";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "jerk" : 
            violation = "\n\n**Violation:** Being offensive towards other players";
            if (originindex1 > -1 || originindex2 > -1) {
                template = `The "New Player Advice" board is intended for new players to get assistance from more experienced players, and ask relatively low level/basic questions. To ensure it is somewhere they feel they can ask any question, we are taking a harsher stance on moderation and negativity within this board.

Your topic has been removed as it did not fit in with these guidelines - please respect that new players may feel unwelcome and uneasy when they are being confronted for asking questions - this is not the type of environment we want within this board.`;
            } else { 
                template = `We are trying to foster an inclusive environment, and as such we allow some room for discussion and debating as long as it is handled in a mature manner. Simply calling summoner's names, mocking them, or belittling them (IE: their opinion, their preferred champion, their ranked status etc.) is not only immature, but a clear violation of the inclusive environment we're trying to build.

The boards should be an environment where everyone can have an opinion as long as it's delivered in a mature way. Countering people's arguments and ideas is fine, as long as you don't do so at their expense. Comments like "nobody cares", tell people to shut up because you don't agree, calling out their playstyle and ranking "bronzie" etc. or digressing into a flame war small snippets of the types of things we actively look out for and remove.

If you have a problem with other players posts, please utilise the \"Report\" function and do not attack them or respond to them in an argumentative manner.`;
            }
            violatedRule = "Don't be a jerk";
            internalNote = "Jerk";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "harassment" : 
            violation = "\n\n**Violation:** Harassment";
            template = `Here on the boards, we do not allow insulting or harassment of other members within this community. We understand that there can be stressful and trying moments when interacting with others, but there is never an excuse for harassing other players.

Posts that contain the following are unacceptable in the community we're trying to build and will be removed:

* Racism
* Xenophobia
* Homophobia
* Deathwishes
* Insults based on beliefs, disabilities, culture, etc
* Extremely offensive posts`;
            violatedRule = "Don't be a jerk";
            internalNote = "Harassment";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "threats" : 
            violation = "\n\n**Violation:** Threats";
            template = `We do not allow insulting or harassment of other members within this community. We understand that there can be stressful and trying moments when interacting with others, but there is no acceptable time to go beyond the boundaries of the game and threaten others with real-life harm. We take this sort of threat very seriously and hope you take this warning we've given you as serious.`;
            violatedRule = "Threats";
            internalNote = "Threats";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "mature" : 
            violation = "\n\n**Violation:** Posting mature content";
            template = `The Boards should be a place everyone can visit and feel comfortable in. Safety is high on our list, many players vary in age, and there are some things that children and young adults shouldn't see.

Posts that contain the following are not allowed on the Boards and will be removed:

* Pornographic materials of any kind
* Imagery that shows real life depictions of gore and death
* Imagery of horrifically violent acts
* Excessive fantasy gore
* Glorification of violence`;
            violatedRule = "No Mature Content";
            internalNote = "Mature content";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "extreme_language" : 
            violation = "\n\n**Violation:** Using extreme & inappropriate language";
            template = `The Boards are the perfect place to express your opinion, ask for feedback and share ideas. However, in an environment where everyone feels welcome and accepted, this should all happen in an appropriate and mature way. Excessive swearing or making offensive and inappropriate comments do not add any value to the environment we're trying to build and cause a negative, if not offensive, atmosphere. Therefore these posts will be removed from the Boards.`;
            violatedRule = "Don't be a jerk";
            internalNote = "Extreme/inappropriate language";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "trolling" : 
            violation = "\n\n**Violation:** Attempting to provoke conflict or incite, bait, or mock others";
            template = `Threads or comments that are created with the intention to create a strong negative or emotional reaction, provoke conflict etc, are considered trolling. Debating a topic, or holding a strong opinion on a topic is acceptable, however making posts simply to provoke conflict or incite, bait, or mock others who disagree with you is not.`;
            violatedRule = "Moderator Discretion";
            internalNote = "Attempting to provoke conflict or incite, bait, or mock others";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "negative_feedback" : 
            violation = "\n\n**Violation:** Providing deconstructive feedback";
            template = `Here on the boards, we value both positive, and negative, feedback. Negative feedback is important as it helps us understand other opinions from the community. However, we still ask you to keep the feedback constructive and within the boards Universal Rules if you wish to have it remain visible.`;
            violatedRule = "Moderator Discretion";
            internalNote = "Deconstructive feedback";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "scam" : 
            violation = "\n\n**Violation:** Attempting to scam other players";
            template = `Attempting to scam your fellow Summoner's by spreading scam websites or accounts or services for sale, is expressly against the Universal Rules. Even when done by accident or when trying to create awareness about them or warn for them, it's a dangerous thing to do and may result in some players actually clicking on them by accident or out of curiosity.

Deliberatly promoting scams will lead to the permanent suspension of your posting rights.`;
            violatedRule = "Phishing & Scamming";
            internalNote = "Scam";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;            
        case "hack" : 
            violation = "\n\n**Violation:** Posting Hacks & Illegal downloads";
            template = `We understand that hacks and exploits hurt the integrity of the game and we are actively looking for and punishing these players. However the Boards is not the correct place to bring visibility on these players or the exploits themselves. Deliberately promoting illegal 3rd part programs or exploits will lead to a permanent suspension of your posting rights.

Please continue to use our in-game reporting system and [Submit a Ticket](https://support.riotgames.com/hc/en-us/requests\new) to Player Support. Doing these will submit a report to Riot for further investigation.`;
            violatedRule = "Hacks & illegal downloads";
            internalNote = "Hacks";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;            
        case "acc_trading" : 
            violation = "\n\n**Violation:** Account trading/sharing";
            template = `Account trading or sharing is explicitly against the Terms and Conditions of League of Legends. Please familiarise yourself with the [Terms of Use](http://euw.leagueoflegends.com/en/legal/termsofuse#accountinformation).`;
            violatedRule = "Account, Product, & Service Promotion";
            internalNote = "Account trading/sharing";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;            
        case "forbidden_promo" : 
            violation = "\n\n**Violation:** Promoting forbidden services/products";
            template = `Promoting services or products which aren't in line with the Terms and Conditions of League of Legends is explicitly against the Boards rules. Please familiarise yourself with the [Terms of Use](http://euw.leagueoflegends.com/en/legal/termsofuse#accountinformation).`;
            violatedRule = "Account, Product, & Service Promotion";
            internalNote = "Promoting forbidden producs/services";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;            
        case "off-topic_promo" : 
            violation = "\n\n**Violation:** Advertising products, services or websites unrelated to League of Legends";
            template = `The promotion of the following services, products and websites is forbidden on the Boards and will be removed:

* Services, products and websites which are unrelated to League of Legends
* Services, products and websites created to gain own benefit from them (eg. revenue)`;
            violatedRule = "Adhere to Board Guidelines";
            internalNote = "Promoting off-topic products/services";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;
        case "illegal_activity" : 
            violation = "\n\n**Violation:** Illegal activity";
            template = `Just because we are the Boards of a fantasy game, League of Legends, we can't start ignoring real-life laws. As such, posts that contain or discuss about activities which are illegal in some or all countries the Boards are active in, will be removed.`;
            violatedRule = "Illegal Activity";
            internalNote = "Illegal Activity";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;     
        case "no_note" : 
            violation = "";
            template = "";
            violatedRule = "Moderator Discretion";
            internalNote = "Moderator Discretion";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;    
        case "note" : 
            violation = "";
            template = `

After review by our moderators, the decision has fallen that although the content you posted does not break any of the [Universal Rules](http://boards.euw.leagueoflegends.com/en/c/announcements-en/3eWpXbJi), it does not belong on the League of Legends Boards. As a result, no violation has been added to your history, but your content has been removed.`;
            violatedRule = "Moderator Discretion";
            internalNote = "Moderator Discretion";
            dropdown1.empty().append(
                '<option value="0">Nothing to choose!</option>');

            $('#suggest').css('background-color', '#848484').prop('disabled', true);
            $('#dropdown').prop('disabled', true);
            break;    
        case "clean_boards" : 
            violation = "";
            template = `

As this is a commonly asked question/reported bug and the answers/information you're searching for can already be found in other posts, your post has been removed. We want a place for everything, but if we don’t keep things organized, the boards become a lot less useful and a lot more cluttered. 

We understand that whenever a new event is taking place, technical issues are going on or an annoying bug is 'bugging' you, you want your voice to be heard. The Boards is the ideal place to do this, however, in order to prevent the Boards from getting cluttered, we would like you to take the following tips in mind before posting your own thread:

**Before posting about ongoing technical issues or reporting a bug:**

1. Check the Service Status ([EUW](http://status.leagueoflegends.com/?en_GB#euw) & [EUNE](http://status.leagueoflegends.com/?en_GB#eune)), confirmed ongoing issues will be listed there
2. Scroll through the "[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en)" & "[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu)" sections (definitely check out those shiny stickies at the top!)
3. Use the search bar on the left, chances are high that someone had the exact same issue as you and got it fixed

**Before posting your question:**

1. Scroll through the [Boards homepage](http://boards.euw.leagueoflegends.com/en/) (and sort on \"hot\"), popular questions usually appear at the top
2. Use the search bar on the left to search for your question, chances are high that someone asked the exact question you had and already got it answered

If you feel other posts don't answer your question, please feel free to repost your query.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
            violatedRule = "Moderator Discretion";
            internalNote = "Moderator Discretion";
            dropdown1.empty().append(
                '<option value="200">No specific thread</option>',
                '<option value="201">The Wrenchmen\'s Toolbox</option>',
                '<option value="202">Ongoing bugs knowledge base</option>',
                '<option value="203">Resolved bugs archive</option>',
                '<option value="204">How to recover your account</option>',
                '<option value="299">Input new URL</option>');

            $('#suggest').css('background-color', '#B404AE').prop('disabled', false);
            $('#dropdown').prop('disabled', false); 
            break;
      case "suggest" :
            var dropdown_value = $('#dropdown').val();
            violation = dropdown_violation ();
            template = dropdown_select ();
            if (dropdown_value < 200 && dropdown_value >= 0) {
                violatedRule = "Adhere to Board Guidelines";
            } else { 
                violatedRule = "Moderator Discretion";
            }
            internalNote = dropdown_internalNote (); 
            //$('#suggest').css('background-color', '#B404AE').prop('disabled', false); 
            
            var dropdown_value = $('#dropdown').val();
            if (dropdown_value <= 99 && dropdown_value >= 0) {
                $('#incorrect_board').css('background-color', '#00BFFF');
            } else if (dropdown_value <= 199 && dropdown_value >=100) { 
                $('#wrong_language').css('background-color', '#00BFFF');
			} else { 
           		$('#clean_boards').css('background-color', '#00BFFF');	
            }
   
            //alert("suggestion clicked");
            break;
    }

    var returned_array = [ violation, template, violatedRule, internalNote ];
    return returned_array;
    alert(returned_array);
}

function dropdown_violation () {
    var dropdown_value = $('#dropdown').val();
    var violation;
    
    if (dropdown_value <= 99 && dropdown_value >= 0) {
        violation = `\n\n**Violation:** Posting in the Incorrect Board`;
    } else if (dropdown_value <= 199 && dropdown_value >=100) {  
        violation = `\n\n**Violation:** Using the wrong language`;
    } else {
		violation = `

`;
	}
    return violation
}

function dropdown_internalNote () {
    var dropdown_value = $('#dropdown').val();
    var internalNote;
    
    if (dropdown_value <= 99 && dropdown_value >= 0) {
        internalNote = `Incorrect Board`;
    } else if (dropdown_value <= 199 && dropdown_value >=100) {  
        internalNote = `Wrong Language`;
	}  else { 
	    internalNote = `Moderator Discretion`;
    }
    return internalNote
}
    
function dropdown_select () {
    var dropdown_value = $('#dropdown').val();
    var board_suggestion;
    var pretemplate;
    var template;
    var origin = window.location.href;
    var originindex1 = origin.indexOf("new-player-advice");
    var originindex2 = origin.indexOf("00edEA0o");
    
    switch (dropdown_value) {
        case "0" :
            break;
        case "1" : 
            board_suggestion = '["Creations & Concepts"](http://boards.euw.leagueoflegends.com/en/c/community-creations-en)';
            break;
        case "2" : 
            board_suggestion = '["Streams & Videos"](http://boards.euw.leagueoflegends.com/en/c/streams-videos-en)';
            break;
        case "4" : 
            board_suggestion = '["Battlegrounds"](http://boards.euw.leagueoflegends.com/en/c/events-tournaments-en)';
            break;
        case "5" : 
            board_suggestion = '["Esports"](http://boards.euw.leagueoflegends.com/en/c/esports-en)';
            break;
        case "6" : 
            board_suggestion = '["Champions & Gameplay"](http://boards.euw.leagueoflegends.com/en/c/champions-gameplay-en)';
            break;
        case "8" : 
            board_suggestion = '["Teams & Clubs"](http://boards.euw.leagueoflegends.com/en/c/team-recruitment-en)';
            break;
        case "9" : 
            board_suggestion = '["Player Behaviour"](http://boards.euw.leagueoflegends.com/en/c/player-behaviour-en)';
            break;
        case "10" : 
            break;
        case "11" : 
            board_suggestion = '["Games, Contests & Jokes"](http://boards.euw.leagueoflegends.com/en/c/forum-games-contests-en)';
            break;
        case "12" : 
            board_suggestion = '["Bug Reports"](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu)';
            break;
        case "13" : 
            board_suggestion = '["Off-topic"](http://boards.euw.leagueoflegends.com/en/c/off-topic-en)';
            break;
        case "14" : 
            board_suggestion = '["New Player Advice"](http://boards.euw.leagueoflegends.com/en/c/new-player-advice-euw)';
            break;
        case "15" :
            board_suggestion = '[Alpha Client Discussion](http://boards.euw.leagueoflegends.com/en/c/alpha-client-discussion-en)';
            break;
        case "16" :
            board_suggestion = '[Alpha Client Bugs](http://boards.euw.leagueoflegends.com/en/c/alpha-client-bugs-en)';
            break;
        case "17" : 
            board_suggestion = '["Help & Support"](http://boards.euw.leagueoflegends.com/en/c/help-support-en)';
            break;
        case "99" :
            break;
        case "100" :
            break;
        case "101" : 
            board_suggestion = '[EUW English Boards](http://boards.euw.leagueoflegends.com/en/)';
            break;
        case "102" : 
            board_suggestion = '[EUW German Boards](http://boards.euw.leagueoflegends.com/de/)';
            break;
        case "103" : 
            board_suggestion = '[EUW Spanish Boards](http://boards.euw.leagueoflegends.com/es/)';
            break;
        case "104" : 
            board_suggestion = '[EUW French Boards](http://boards.euw.leagueoflegends.com/fr/)';
            break;
        case "105" : 
            board_suggestion = '[EUW Italian Boards](http://boards.euw.leagueoflegends.com/it/)';
            break;
        case "106" : 
            board_suggestion = '[EUNE English Boards](http://boards.eune.leagueoflegends.com/en/)';
            break;
        case "107" : 
            board_suggestion = '[EUNE Polish Boards](http://boards.eune.leagueoflegends.com/pl/)';
            break;
        case "108" : 
            board_suggestion = '[EUNE Romanian Boards](http://boards.eune.leagueoflegends.com/ro/)';
            break;
        case "109" : 
            board_suggestion = '[EUNE Hungarian Boards](http://boards.eune.leagueoflegends.com/hu/)';
            break;
        case "110" : 
            board_suggestion = '[EUNE Czech Boards](http://boards.eune.leagueoflegends.com/cs/)';
            break;
        case "111" : 
            board_suggestion = '[EUNE Greek Boards](http://boards.eune.leagueoflegends.com/el/)';
            break;
        case "112" : 
            board_suggestion = '[Russian Boards](http://boards.ru.leagueoflegends.com/ru/)';
            break;
        case "113" :
            board_suggestion = '[Turkish Boards](http://boards.tr.leagueoflegends.com)';
            break;
        case "200" : 
            break;
        case "201" : 
            board_suggestion = '[The Wrenchmen\'s Toolbox](http://boards.euw.leagueoflegends.com/en/c/help-support-en/hlYp1Qn8-common-fixes-answers-the-wrenchmens-toolbox)';
            break;
        case "202" : 
            board_suggestion = '[Ongoing bugs knowledge base](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu/9nVbui7f-updated-ongoing-bugs-knowledge-base)';
            break;
        case "203" : 
            board_suggestion = '[Resolved bugs archive](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu/v0u9Eutt)';
            break;
        case "204" : 
            board_suggestion = '[How to recover your account & keep it safe!](http://boards.euw.leagueoflegends.com/en/c/help-support-en/hPvMFBIN-how-to-recover-your-account-keep-it-safe)';
            break;
        case "299" : 
            break;
    }

    if (dropdown_value == 0) {
        pretemplate = `Here is a list of every section of the Boards and what they're meant for:

[Creations & Concepts](http://boards.euw.leagueoflegends.com/en/c/community-creations-en) - For sharing anything created by the community and showing off your skin ideas and champion concepts (_Note: Not for requesting skins or current champ tweaks_)
[Streams & Videos](http://boards.euw.leagueoflegends.com/en/c/streams-videos-en) - For videos and streams!
[Battlegrounds](http://boards.euw.leagueoflegends.com/en/c/battlegrounds-en) - For discussion about battlegrounds.
[Esports](http://boards.euw.leagueoflegends.com/en/c/esports-en) - For discussion around esports
[Champions & Gameplay](http://boards.euw.leagueoflegends.com/en/c/champions-gameplay-en) - For discussion around anything that has to do with playing the game. 
[Teams & Clubs](http://boards.euw.leagueoflegends.com/en/c/team-recruitment-en) - Want a team? Want new people on your team? Check this section out!
[Player Behaviour](http://boards.euw.leagueoflegends.com/en/c/player-behaviour-en) - For discussion around chat restrictions, Ranked Restrictions, LeaverBuster, suspensions, etc.
[Games, Contests & Jokes](http://boards.euw.leagueoflegends.com/en/c/forum-games-contests-en) - For participating in, or having, Forum Games and Contests, starting a never ending pun-thread or telling that one amazing joke!
[New Player Advice](http://boards.euw.leagueoflegends.com/en/c/new-player-advice-euw) - For advice for new players. 
[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en) - For technical Help and Support to get you back onto the Fields of Justice!
[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu) - For reporting bugs.
[Alpha Client Discussion](http://boards.euw.leagueoflegends.com/en/c/alpha-client-discussion-en) - For discussions around the new Alpha Client.
[Alpha Client Bugs](http://boards.euw.leagueoflegends.com/en/c/alpha-client-bugs-en) - For bug reports regarding the new Alpha Client.
[Off-topic](http://boards.euw.leagueoflegends.com/en/c/off-topic-en) - For anything that doesn't fit above.

If your Query is Account or Billing related, please [Submit a Request](https://support.riotgames.com/hc/requests/new) to Player Support, as only Player Support can help with these issues - they cannot be handled on the boards.

If you wish to, you can find a link to your original content at the top of this notification to copy/paste in the correct section.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
    } else if (dropdown_value <= 9 && dropdown_value >= 1 || dropdown_value <= 17 && dropdown_value >= 11) {
        pretemplate = `If you wish to re-post your content in the correct section, you can find a link to your content in the upper part of this notification. We suggest the ` + board_suggestion + ` section for this type of content.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
    } else if (dropdown_value == 10) {
        pretemplate = `Since your query is Player Behavior related we suggest the following:

* If you have any questions related to the action that was taken against your account, please [submit a ticket](https://support.riotgames.com/hc/requests/new) to Player Support.
* If you want to discuss the action taken against your account with other community members, please re-post your content in the ["Player Behaviour"](http://boards.euw.leagueoflegends.com/en/c/player-behaviour-en) section of the Boards.

If you wish to re-post your content in the correct section, copy details of it into the Support Ticket or want to have another look at the replies you already received in the deleted post, you'll be able to find a link in the upper part of this notification to your deleted content.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
    } else if (dropdown_value == 99) {
        pretemplate = `Since your query is Account or Billing related, we won't be able to assist you on the Boards. Please head to [Player Support](https://support.riotgames.com/hc) and [Submit a Ticket](https://support.riotgames.com/hc/requests/new), as only they can help with these issues.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
    } else if (dropdown_value <= 113 && dropdown_value >= 101) {
        pretemplate = `If you wish to re-post your content on the correct Board, you can find a link to your content in the upper part of this notification. We suggest the ` + board_suggestion + `.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
    } else if (dropdown_value == 100) {
        pretemplate = `Here is a list of all the different Boards available in Europe:

**EU West:**

[English Boards](http://boards.euw.leagueoflegends.com/en/)
[German Boards](http://boards.euw.leagueoflegends.com/de/)
[Spanish Boards](http://boards.euw.leagueoflegends.com/es/)
[French Boards](http://boards.euw.leagueoflegends.com/fr/)
[Italian Boards](http://boards.euw.leagueoflegends.com/it/)

**EU Nordic & East:**

[English Boards](http://boards.eune.leagueoflegends.com/en/)
[Polish Boards](http://boards.eune.leagueoflegends.com/pl/)
[Romanian Boards](http://boards.eune.leagueoflegends.com/ro/)
[Hungarian Boards](http://boards.eune.leagueoflegends.com/hu/)
[Czech Boards](http://boards.eune.leagueoflegends.com/cs/)
[Greek Boards](http://boards.eune.leagueoflegends.com/el/)

**Other:**

[Russian Boards](http://boards.ru.leagueoflegends.com/ru/)
[Turkish Boards](http://boards.tr.leagueoflegends.com)

If you wish to, you can find a link to your original content at the top of this notification to copy/paste on the correct Board.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
   } else if (dropdown_value == 200) {
       pretemplate =`As this is a commonly asked question/reported bug and the answers/information you're searching for can already be found in other posts, your post has been removed. We want a place for everything, but if we don’t keep things organized, the boards become a lot less useful and a lot more cluttered. 

We understand that whenever a new event is taking place, technical issues are going on or an annoying bug is 'bugging' you, you want your voice to be heard. The Boards is the ideal place to do this, however, in order to prevent the Boards from getting cluttered, we would like you to take the following tips in mind before posting your own thread:

**Before posting about ongoing technical issues or reporting a bug:**

1. Check the Service Status ([EUW](http://status.leagueoflegends.com/?en_GB#euw) & [EUNE](http://status.leagueoflegends.com/?en_GB#eune)), confirmed ongoing issues will be listed there
2. Scroll through the "[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en)" & "[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu)" sections (definitely check out those shiny stickies at the top!)
3. Use the search bar on the left, chances are high that someone had the exact same issue as you and got it fixed

**Before posting your question:**

1. Scroll through the [Boards homepage](http://boards.euw.leagueoflegends.com/en/) (and sort on \"hot\"), popular questions usually appear at the top
2. Use the search bar on the left to search for your question, chances are high that someone asked the exact question you had and already got it answered

If you feel other posts don't answer your question, please feel free to repost your query.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
   } else if (dropdown_value > 200 && dropdown_value < 299) {
       pretemplate =`As this is a commonly asked question/reported bug, the following thread has been put together to answer or give information regarding these sorts of queries: ` + board_suggestion + `

We understand that whenever a new event is taking place, technical issues are going on or an annoying bug is 'bugging' you, you want your voice to be heard. The Boards is the ideal place to do this, however, in order to prevent the Boards from getting cluttered, we would like you to take the following tips in mind before posting your own thread:

**Before posting about ongoing technical issues or reporting a bug:**

1. Check the Service Status ([EUW](http://status.leagueoflegends.com/?en_GB#euw) & [EUNE](http://status.leagueoflegends.com/?en_GB#eune)), confirmed ongoing issues will be listed there
2. Scroll through the "[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en)" & "[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu)" sections (definitely check out those shiny stickies at the top!)
3. Use the search bar on the left, chances are high that someone had the exact same issue as you and got it fixed

**Before posting your question:**

1. Scroll through the [Boards homepage](http://boards.euw.leagueoflegends.com/en/) (and sort on \"hot\"), popular questions usually appear at the top
2. Use the search bar on the left to search for your question, chances are high that someone asked the exact question you had and already got it answered

If you feel other posts don't answer your question, please feel free to repost your query.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
    } else if (dropdown_value == 299) {
	var URL = prompt("Please enter the URL:", "");
    pretemplate =`As this is a commonly asked question/reported bug, the following thread has been put together to answer or give information regarding these sorts of queries: ` + URL + `

We understand that whenever a new event is taking place, technical issues are going on or an annoying bug is 'bugging' you, you want your voice to be heard. The Boards is the ideal place to do this, however, in order to prevent the Boards from getting cluttered, we would like you to take the following tips in mind before posting your own thread:

**Before posting about ongoing technical issues or reporting a bug:**

1. Check the Service Status ([EUW](http://status.leagueoflegends.com/?en_GB#euw) & [EUNE](http://status.leagueoflegends.com/?en_GB#eune)), confirmed ongoing issues will be listed there
2. Scroll through the "[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en)" & "[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu)" sections (definitely check out those shiny stickies at the top!)
3. Use the search bar on the left, chances are high that someone had the exact same issue as you and got it fixed

**Before posting your question:**

1. Scroll through the [Boards homepage](http://boards.euw.leagueoflegends.com/en/) (and sort on \"hot\"), popular questions usually appear at the top
2. Use the search bar on the left to search for your question, chances are high that someone asked the exact question you had and already got it answered

If you feel other posts don't answer your question, please feel free to repost your query.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
   } else { 
       pretemplate =`As this is a commonly asked question/reported bug and the answers/information you're searching for can already be found in other posts, your post has been removed. We want a place for everything, but if we don’t keep things organized, the boards become a lot less useful and a lot more cluttered. 

We understand that whenever a new event is taking place, technical issues are going on or an annoying bug is 'bugging' you, you want your voice to be heard. The Boards is the ideal place to do this, however, in order to prevent the Boards from getting cluttered, we would like you to take the following tips in mind before posting your own thread:

**Before posting about ongoing technical issues or reporting a bug:**

1. Check the Service Status ([EUW](http://status.leagueoflegends.com/?en_GB#euw) & [EUNE](http://status.leagueoflegends.com/?en_GB#eune)), confirmed ongoing issues will be listed there
2. Scroll through the "[Help & Support](http://boards.euw.leagueoflegends.com/en/c/help-support-en)" & "[Bug Reports](http://boards.euw.leagueoflegends.com/en/c/bug-reports-eu)" sections (definitely check out those shiny stickies at the top!)
3. Use the search bar on the left, chances are high that someone had the exact same issue as you and got it fixed

**Before posting your question:**

1. Scroll through the [Boards homepage](http://boards.euw.leagueoflegends.com/en/) (and sort on \"hot\"), popular questions usually appear at the top
2. Use the search bar on the left to search for your question, chances are high that someone asked the exact question you had and already got it answered

If you feel other posts don't answer your question, please feel free to repost your query.

Apologies for the inconvenience & thanks for your understanding, Summoner!`;
   }
    if (dropdown_value >= 0 && dropdown_value <= 99) { 
              if (originindex1 > -1 || originindex2 > -1) {
                template = `The "New Player Advice" board is intended for new players to get assistance from more experienced players, and ask relatively low level/basic questions. Because we want to create the best environment possible for new players to ask their questions in, we're taking a harsher stance on moderation. Any other questions, such as more advanced questions, will therefore be removed.

` + pretemplate;
            } else { 
                template = pretemplate;
            }
    } else  {
        template = pretemplate;
    }
   
    return template;
}



