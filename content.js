function replaceGUIDs(friendlyNames) {
  console.log('Replacing GUIDs with:', friendlyNames);
  document.querySelectorAll('.css-cke5iv.ei767vo0').forEach(span => {
    const guid = span.textContent.trim();
    if (friendlyNames[guid]) {
      console.log(`Replacing ${guid} with ${friendlyNames[guid]}`);
      span.textContent = friendlyNames[guid];
    }
  });
}

chrome.storage.sync.get('friendlyNames', (data) => {
  if (data.friendlyNames) {
    replaceGUIDs(data.friendlyNames);
  }
});

const observer = new MutationObserver((mutations) => {
  chrome.storage.sync.get('friendlyNames', (data) => {
    if (data.friendlyNames) {
      replaceGUIDs(data.friendlyNames);
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', () => {
  chrome.storage.sync.get('friendlyNames', (data) => {
    if (data.friendlyNames) {
      replaceGUIDs(data.friendlyNames);
    }
  });
});
