/* Created by Hershal Bhave on 2014-11-15 */

function get_google_calendar_events() {

    var current_date = new Date().toISOString();
    var encoded_current_date = encodeURIComponent(current_date);

    var calendar_id = "ieeecs.ece.utexas.edu_8qe5qi23uquh7aaop62at4ocjk@group.calendar.google.com";
    var browser_key = "AIzaSyBb3rCo6swXRDvmRJiJBiQ_dwakPkDdu_Q";

    var calendar_json_url =
        "https://www.googleapis.com/calendar/v3/calendars/" + calendar_id + "/events"
        + "?maxResults=10"
        + "&orderBy=startTime"
        + "&singleEvents=true"
        + "&timeMin=" + encoded_current_date
        + "&key=" + browser_key;

    /* Get list of upcoming events formatted in JSON */
    jQuery.getJSON(calendar_json_url, function(data) {

        /* Parse and render each event */
        jQuery.each(data.items, function(i, item) {

            if (i === 0) {
                jQuery("#google-calendar-event-list li").first().hide();
            };

            if (i > 5) { return; } ;
            
            /* Read the values in */
            var event_title = item.summary;
            var event_timezone = item.start.timezone;
            var event_location = item.location;
            var event_body = jQuery.trim(item.description);
            var event_date_start_finish = new Date(item.start.dateTime);
            var event_date_all_day = new Date(item.start.date);
            
            var is_full_day = (event_date_all_day !== 'Invalid Date');
            var event_date = is_full_day ? event_date_all_day : event_date_start_finish;
    
            var event_href = item.htmlLink;
            
            var day = event_date_all_day.getDate();
            event_date_all_day.setDate(day+1); //fixed bug where all-day events would be listed as the day before
            event_date_all_day.setHours(0); //set to 00:00:00 GMT-0600, midnight for all day-events

            if(is_full_day) {
                event_date = event_date_all_day.toString("dddd, MMMM d");
            } else {
                event_date = event_date.toString("dddd, MMMM d @ h:mm tt");
            };

            event_location_string = typeof event_location == 'undefined' ? '' : ' in ' + event_location;
            /* Render the event */
            jQuery("#google-calendar-event-list li").last().before(
                '<hr>'
                    + '<h4 class="list-group-item-heading"><a href="' + event_href + '">' + event_title + '</a></h4>'
                    + '<p class="text-muted">' + event_date + event_location_string + '</p>'
                    + '<p class="">' + event_body + '</p>'
            );
        });
    });
}