/* Created by Hershal Bhave on 2014-11-15 */

function get_google_calendar_events() {

    var calendar_json_url = "https://www.google.com/calendar/feeds/ieeecs.ece.utexas.edu_8qe5qi23uquh7aaop62at4ocjk%40group.calendar.google.com/public/full?orderby=starttime&sortorder=ascending&max-results=10&futureevents=true&alt=json";

    /* Get list of upcoming events formatted in JSON */
    jQuery.getJSON(calendar_json_url, function(data){

        /* Parse and render each event */
        jQuery.each(data.feed.entry, function(i, item){

            if(i == 0) {
                jQuery("#google-calendar-event-list li").first().hide();
            };

            /* Read the values in */
            var event_location = item.gd$where[0].valueString;
            var event_title = item.title.$t;
            var event_body = jQuery.trim(item.content.$t);
            var event_date = new Date(item.gd$when[0].startTime);
            var event_href = item.link[0].href;

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
