const btn = document.getElementById("toggle");
const countEl = document.getElementById("count");

chrome.storage.local.get(["enabled", "blockedCount"], data => {
  const enabled = data.enabled !== false;
  update(enabled);
  countEl.textContent = data.blockedCount || 0;
});

btn.onclick = () => {
  chrome.storage.local.get("enabled", data => {
    const next = !(data.enabled !== false);
    chrome.storage.local.set({ enabled: next });
    update(next);

    chrome.runtime.sendMessage({
      type: "TOGGLE",
      enabled: next
    });
  });
};

function update(enabled) {
  btn.textContent = enabled ? "BẬT" : "TẮT";
  btn.className = enabled ? "on" : "off";
      }
      
