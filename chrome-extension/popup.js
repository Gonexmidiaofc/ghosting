document.getElementById('extractBtn').addEventListener('click', async () => {
  const btn = document.getElementById('extractBtn');
  const statusEl = document.getElementById('status');
  const apiUrl = document.getElementById('apiUrl').value.trim();
  
  if (!apiUrl) {
    statusEl.textContent = "Digite a URL do seu site.";
    statusEl.className = "error";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Extraindo da página...";
  statusEl.textContent = "";
  statusEl.className = "";

  try {
    // Pegar a aba atual
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes("facebook.com/ads/library")) {
      throw new Error("Você precisa estar na página da Biblioteca de Anúncios do Facebook.");
    }

    // Injetar o content script
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    if (!results || !results[0] || !results[0].result) {
      throw new Error("Falha ao extrair. A página terminou de carregar?");
    }

    const ads = results[0].result;
    
    if (ads.length === 0) {
      throw new Error("Nenhum anúncio encontrado na tela. Role a página para baixo para carregar.");
    }

    btn.textContent = "Enviando para o Ghosting Ads...";

    // Enviar para o Backend do projeto
    const response = await fetch(`${apiUrl}/api/admin/extension-import`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ads: ads, sourceUrl: tab.url })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro no servidor ao salvar anúncios.");
    }

    statusEl.textContent = `✅ Sucesso! ${ads.length} anúncio(s) salvo(s) e categorizado(s)!`;
    btn.textContent = "Pronto!";

  } catch (err) {
    statusEl.textContent = "❌ " + err.message;
    statusEl.className = "error";
    btn.textContent = "Tentar Novamente";
    btn.disabled = false;
  }
});
