# Kazoom

Automatically close your [Zoom](https://zoom.us/) tabs after successfully triggering the app.

![Zoom example](./zoom-example.png)

## In detail

This is a Firefox Add-on which closes tabs open on Zoom's website after 10 seconds. This should give you enough time to open the meeting in the app or open in the browser.

:sparkles: This is for you if:

- You use Firefox;
- You're tired of having tabs filling space that were used just to open the meeting on the app.

This is pretty much it :blue_heart:

## Caveats

- You cannot cancel the timer.
- 10 seconds timeout is not configurable.

## Permissions

Because the regex on [manifest.json](manifest.json) for the `content_scripts` `matches` is not as powerful as we want, the add-on requires the `tabs` permission to be able to retrieve the current URL of the tab. The regex from the `manifest` is still useful to prevent running the script unnecessarily, but we need to check that the Zoom URL is from a meeting and not, for example, from the homepage. Otherwise, we would close the tab when on any page that matched the domain `zoom.us`.

## Technical details

First of all, a disclaimer.
This is implemented towards my usage. I'm happy to make it more usable for others. So, don't be shy and give your ideas/contributions.

This add-on is split in two main files: [content_script.js](./content_script.js) and [background_script.js](./background_script.js).

[content_script.js](./content_script.js) displays the banner. It receives a number indicating the time and displays it and only initiates the process on the domain `zoom.us`. The process is to send a message to the other script and it'll start receiving a message once a second.

[background_script.js](./background_script.js) first checks if the tab is on a valid URL. If it is a valid one (i.e., a Zoom meeting URL), it stores the time it received the first message from the other script. On each second it sends the time missing to close the tab. Once it is due, the tab is closed.

## Related

What I've found is only available on Chrome (I have not tested any of them). Here's the list:

- https://github.com/seanstar12/zoom-close
- https://github.com/thesephist/clozoom

## Acknowledgements

Logo based on the [design by upklyak / Freepik](https://www.freepik.com/vectors/water)
