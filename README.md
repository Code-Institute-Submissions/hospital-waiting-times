<h1>Hospital Waiting Times in Northern Ireland</h1>

<p>This is my second milestone project for the Code Institute. Regarding my choice for this project, at first I had a hard time deciding what to do as with the options available for the project I had many ideas.
After some deliberation, I made the choice to do an interactive dashboard as I found that to be the most intriguing option. In terms of the dataset, I tried many of the options available on the internet and it took
me a while to finally rest on the one that is the basis for my project. As I started working with the current dataset I found the results of combining the data with the dc charts to be very interesting and knew that 
I would be able to create something that would be both visually interesting to look at but also that would be interesting in terms of what the data was showing.</p>

<h2>UX</h2>

<p>One of my favourite TV shows is Grey's Anatomy and when I watch it I always notice how busy their Emergency Room is. On top of that, there is always a story in the news about how long people have to wait to be seen
in A&E in the UK. With so much emphasis being put on this issue, I came to the conclusion that it must be a topic of interest for a lot of people, but they might not know how or where to access the information that would 
allow them to better understand what they are seeing in the media, or if they have researched it, they might be bombarded with numbers and information that makes them more confused than before they began. I therefore decided
that taking such data, that was relevant to my part of the UK which is Northern Ireland, and converting that in to a visual format with graphs would allow people to easily see and understand exactly what all of this information
is saying. The dashboard will show how long people wait in A&E on a yearly basis, which month is the worst in terms of waiting times, which hospitals have the highest waiting times. Also as a user of the website I would expect the
graphs to be interactive and I would be able to see my interaction with the data have an immediate effect on the other graphs.</p>

<h3>Project Objectives</h3>

<ul>
<li>Be a reference point for people who are interested in finding out more about statistics regarding waiting times in A&E Departments</li>
<li>Provide interactive graphs that can relay different pieces of information to the user when different options are selected</li>
<li>Encourage/Promote further research by the user in to the subject material being displayed</li>
</ul>

<h3>Wireframes</h3>

<h2>Features</h2>

<h3>Existing Features</h3>

<ul>
<li>Health Trust Selector - Allows the user to choose from any of the health trusts in the data and view the statistics related to it.</li>
<li>Wait Counter - Shows the total waiting time in hours over the ten year period of the study.</li>
<li>Wait per trust pie chart</li>
<li>Wait per month bar chart</li>
<li>Wait per year line chart</li>
<li>Longest wait row chart - this chart shows which of the hospitals in Northern Ireland have the longest overall waiting time per the ten year study.</li>
<li>Wait per group stacked bar chart - This chart breaks down the waiting times per year in to the three hour groups from the csv file and shows which group had the longest waiting times.</li>
<li>Footer - This contains a link to my github account for people to view my other work.</li>
</ul>

<h3>Features to Implement</h3>
<ul>
<li>Trust Series Chart - A series line chart showing the waiting times of the health trusts per year so as to be able to compare which trust has the better record.</li>
</ul>

<h2>Technologies Used</h2>

<ul>
<li>Javascript - Used to build charts and utilise the values output by these charts</li>
<li><a href="https://jquery.com/" target="_blank">Jquery</a> - Used to support loader and alert box; </li>
<li><a href="https://cdnjs.cloudflare.com/ajax/libs/dc/2.1.8/dc.min.css" target="_blank">DC CSS</a> and <a href="https://cdnjs.cloudflare.com/ajax/libs/dc/2.1.8/dc.min.js" target="_blank">DC JS</a> - Used to build charts</li>
<li><a href="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js" target="_blank">D3</a> - Used to build charts</li>
<li><a href="https://cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.12/crossfilter.min.js" target="_blank">Crossfilter</a> - Filters data in csv file</li>
<li><a href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" target="_blank">Bootstrap</a> - Supports resposive grid layout</li>
<li><a href="https://cdnjs.cloudflare.com/ajax/libs/queue-async/1.0.7/queue.min.js" target="_blank">Queue</a> - Used to load the data</li>
<li><a href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" target="">Font Awesome</a> - Used for the github icon in the footer</li>
<li><a href="https://fonts.googleapis.com/css?family=Alegreya+SC:400,500,700,800,900" target="_blank">Google Fonts</a> - Alegreya SC is used throughout the webpage</li>
</ul>

<h2>Testing</h2>

<ul>
<li>I used W3C validator to check for errors in HTML and CSS code; no errors were returned.</li>
<li>JSHint was used to check validity of javascript code, no errors were found</li>
<li>The dashboard is responsive at all screen resolutions</li>
    <ul>
    <li>I created a prompt on load to notify users viewing on mobile devices to use their device in landscape</li>
    </ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>