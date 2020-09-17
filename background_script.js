const tabOpenTimeoutInSeconds = 10;
let tabs = [];

function connected(port) {
  tabs.push({
      time: new Date(),
      port
    });

  // Handle someone closing the tab before we do
  port.onDisconnect.addListener(p => {
      tabs = tabs.filter(tab => tab.port.sender.tab.id !== p.sender.tab.id);
  });

  // Send initial message
  port.postMessage({time: tabOpenTimeoutInSeconds});
}

function elapsedTimeInSeconds(current, past) {
    return Math.floor((current.getTime() - past.getTime()) / 1000);
}

browser.runtime.onConnect.addListener(connected);

setInterval(() => {
    const currentTime = new Date();

    tabs.forEach(({time, port}) => {
        const missingTime = tabOpenTimeoutInSeconds - elapsedTimeInSeconds(currentTime, time);

        try {
            port.postMessage({time: missingTime});
        } catch (e) {
            // Due to the asynchronous nature, we may try to post on a port that is disconnected
        }
    });

    tabs = tabs.filter(({time, port}) => {
        if (elapsedTimeInSeconds(currentTime, time) > tabOpenTimeoutInSeconds) {
            browser.tabs.remove(port.sender.tab.id);
            return false;
        }

        return true;
    });
}, 1000);
