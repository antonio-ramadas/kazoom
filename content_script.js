const mainMsgId = 'kazoom-description';
const timerMsgId = 'kazoom-timer';

function mainMsg(time) {
    const ampersand = time <= 3 ? '⌛️' : '⏳';

    return `This tab is going to close ${ampersand}`;
}

const div = document.createElement('div');
div.id = 'kazoom-banner';
div.innerHTML = `
<h1 id="${mainMsgId}">${mainMsg()}</h1>
<h2 id="${timerMsgId}"></h2>`;
document.getElementsByTagName('body')[0].prepend(div);

const port = browser.runtime.connect();

port.onMessage.addListener(({time}) => {
  document.getElementById(mainMsgId).innerText = mainMsg(time);
  document.getElementById(timerMsgId).innerText = `In ${time} seconds`;
});
