const saveToClipboard = (str: string) => {
  const textArea = document.createElement("textarea");
  textArea.style.cssText = "position:absolute;left:-100%";

  document.body.appendChild(textArea);

  textArea.value = str;
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
};

chrome.runtime.onMessage.addListener(request => {
  saveToClipboard(request.text);
  alert("Coppied!");
});
