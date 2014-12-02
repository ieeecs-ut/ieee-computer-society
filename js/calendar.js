/* Created by Hershal Bhave on 2014-11-15 */

function get_google_calendar_events() {

    var current_date = new Date().toISOString()
    var encoded_current_date = encodeURIComponent(current_date);

    var calendar_id = "ieeecs.ece.utexas.edu_8qe5qi23uquh7aaop62at4ocjk@group.calendar.google.com";
    var browser_key = "AIzaSyBb3rCo6swXRDvmRJiJBiQ_dwakPkDdu_Q"

    var calendar_json_url =
        "https://www.googleapis.com/calendar/v3/calendars/" + calendar_id + "/events"
        + "?maxResults=10"
        + "&orderBy=startTime"
        + "&singleEvents=true"
        + "&timeMin=" + encoded_current_date
        + "&key=" + browser_key;

    /* Get list of upcoming events formatted in JSON */
    jQuery.getJSON(calendar_json_url, function(data){

        /* Parse and render each event */
        jQuery.each(data.items, function(i, item){

            if(i == 0) {
                jQuery("#google-calendar-event-list li").first().hide();
            };

            /* Read the values in */
            var event_title = item.summary;
            var event_location = item.location;
            var event_body = jQuery.trim(item.description);
            var event_date = new Date(item.start.dateTime);
            var event_href = item.htmlLink;

            if(event_date.getHours() != 0 || event_date.getMinutes() != 0) {
                event_date = event_date.toString("MMM d @htt");
            } else {
                /* otherwise format start as date only (without time) */
                event_date = event_date.toString("MMM d");
            };

            /* Render the event */
            jQuery("#google-calendar-event-list li").last().before(
                '<hr>'
                    + '<h4 class="list-group-item-heading"><a href="' + event_href + '">' + event_title + '</a></h4>'
                    + '<p class="text-muted">' + event_date + ' in ' + event_location + '</p>'
                    + '<p class="">' + event_body + '</p>'
            );
        });
    });
}
