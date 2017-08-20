# iTunes Music Search  
The Iron Yard Week 4 Project
---

View the finished project: [iTunes Music Player](http://thesearchformusic.surge.sh/)

---

As your final project for this portion of the course, let's take stock of all you have learned and build a real application that is useful and you can share with friends. For this app, we will be using iTunes API to pull data from.

You'll use this data to pull songs based on a search that your user performs. Here is an idea of what the end result should look like, though you can have fun with the design.

Here are the steps you'll need to take in order to complete this project.

1. Build a simple form that has an `<input>` where a user can fill in their favorite band, like            "Backstreet Boys", and it will return a handful of songs by them or with their name in it.

2. When the user types in a band name and presses the submit button, you should then make the search       request. You can trap this with an event listener.

3. Once you have the search term, you should fetch the specific endpoint and use the results to display    a listing of songs related to the search term.

4. Then to add some features, you should set it up so when a user clicks on one of the songs, it should     then play in an `<audio>` tag that you've also added to the page.