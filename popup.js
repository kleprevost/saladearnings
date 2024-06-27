document.getElementById('save').addEventListener('click', () => {
  const friendlyNames = {};
  for (let i = 1; i <= 20; i++) {
    const guid = document.getElementById(`guid${i}`).value;
    const name = document.getElementById(`name${i}`).value;
    if (guid && name) {
      friendlyNames[guid] = name;
    }
  }

  console.log('Saving friendly names:', friendlyNames);

  chrome.storage.sync.set({ friendlyNames }, () => {
    console.log('Friendly names saved.');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('friendlyNames', (data) => {
    console.log('Loaded friendly names:', data.friendlyNames);
    if (data.friendlyNames) {
      const guids = Object.keys(data.friendlyNames);
      for (let i = 1; i <= 20; i++) {
        if (guids[i - 1]) {
          document.getElementById(`guid${i}`).value = guids[i - 1];
          document.getElementById(`name${i}`).value = data.friendlyNames[guids[i - 1]];
        }
      }
    }
  });
});
