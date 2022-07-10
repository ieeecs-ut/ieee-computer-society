/* Copyright (c) 2007 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * MODIFIED BY Ross McNulty
 *
 * Changes: Works with Gooogle Calendar API v3, uses formatting code from
 * original file
 */

 // the url: https://www.googleapis.com/calendar/v3/calendars/ieee.ece.utexas.edu_e1lj5bjmrlhe6dc59h6umr8qok%40group.calendar.google.com/events?key={AIzaSyCovyIP9Tyn7T5m48kLhUNbxwQd7qhczMA}

document.onLoad = loadEvents();

/* Created by Hershal Bhave on 2014-11-15 
 * Modified by Ross McNulty
 */
function loadEvents() {

    var current_date = new Date().toISOString();
    var encoded_current_date = encodeURIComponent(current_date);

    var calendar_id = "ieeecs.ece.utexas.edu_8qe5qi23uquh7aaop62at4ocjk%40group.calendar.google.com";
    var browser_key = "AIzaSyBb3rCo6swXRDvmRJiJBiQ_dwakPkDdu_Q";

    var calendar_json_url =
        "https://www.googleapis.com/calendar/v3/calendars/" + calendar_id + "/events" +
        "?maxResults=5" +
        "&orderBy=startTime" +
        "&singleEvents=true" +
        "&timeMin=" + encoded_current_date +
        "&key=" + browser_key;

    var eventDiv = document.getElementById('events');
    var loaderDiv = document.getElementById('calendar-loader');
    if (eventDiv.childNodes.length > 0) {
      eventDiv.removeChild(eventDiv.childNodes[0]);
    }   
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    /* create a new unordered list */
    var ul = document.createElement('ul');

    /* Get list of upcoming events formatted in JSON */
    jQuery.getJSON(calendar_json_url, function(data){

        /* Parse and render each event */
        jQuery.each(data.items, function(i, item){

          var entry = item;
          var title = item.summary;
          title = title.replace("IEEECS: ", "");
          var startDateTime = item.start.dateTime;
          var startJSDate = new Date(startDateTime);
          var entryLinkHref = null;
          if (entry.htmlLink !== null) {
            entryLinkHref = entry.htmlLink;
          }
          var dateString = days[startJSDate.getDay()] + ", " + months[startJSDate.getMonth()] + " " + startJSDate.getDate();
          var timeString = null;
          if (startJSDate.getHours() != 0 || startJSDate.getMinutes() != 0) {
            if(startJSDate.getHours() < 12) {
              timeString = " " + startJSDate.getHours() + ":" + padNumber(startJSDate.getMinutes()) + "am";
            } else if(startJSDate.getHours() == 12) {
              timeString = " " + startJSDate.getHours() + ":" + padNumber(startJSDate.getMinutes()) + "pm";
            } else {
              timeString = " " + startJSDate.getHours() - 12 + ":" + padNumber(startJSDate.getMinutes()) + "pm";
            }
          }
          var li = document.createElement('li');

          /* if we have a link to the event, create an 'a' element */
          if (entryLinkHref !== null) {
            var dateDiv = document.createElement('div');
            var timeSpan = document.createElement('span');
            var summaryDiv = document.createElement('div');
            dateDiv.setAttribute('class', "event-date");
            summaryDiv.setAttribute('class', "event-summary");
            entryLink = document.createElement('a');
            entryLink.setAttribute('href', entryLinkHref);
            entryLink.appendChild(document.createTextNode(title));
            dateDiv.appendChild(document.createTextNode(dateString));
            if(timeString !== null) {
              timeSpan.appendChild(document.createTextNode(timeString + ' - '));
              summaryDiv.appendChild(timeSpan);
            }
            summaryDiv.appendChild(entryLink);
            li.appendChild(dateDiv);
            li.appendChild(summaryDiv);
          } else {
            li.appendChild(document.createTextNode(title + ' - ' + dateString));
          }     

          /* append the list item onto the unordered list */
          ul.appendChild(li);

        });
    });

    ul.style.display="none";
    eventDiv.appendChild(ul);
    fadeOutIn(loaderDiv,ul);
}

/**
 * Adds a leading zero to a single-digit number.  Used for displaying dates.
 * 
 * @param {int} num is the number to add a leading zero, if less than 10
 */
function padNumber(num) {
  if (num <= 9) {
    return "0" + num;
  }
  return num;
}

function fadeOutIn(element1,element2) {
    var op = 1;  // initial opacity
    var op2 = 0.1;
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element1.style.display = 'none';
            element2.style.opacity = op2;
            element2.style.display = "block";
            var timer2 = setInterval(function () {
              if (op2 >= 1){
                clearInterval(timer2);
              }
              element2.style.opacity = op2;
              element2.style.filter = 'alpha(opacity=' + op2 * 100 + ")";
              op2 += op2 * 0.1;
            }, 15);
        }
        element1.style.opacity = op;
        element1.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 15);
}
