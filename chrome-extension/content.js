(function() {
  console.log("Ghosting Ads Extractor: Content script injetado.");
  
  function extractAds() {
    const extracted = [];
    
    // Procura por indicadores de que é um card de anúncio.
    // O texto "Id. do anúncio:" ou "Library ID:" geralmente fica no cabeçalho de cada anúncio.
    const allDivs = Array.from(document.querySelectorAll('div'));
    
    // Filtra divs que parecem ser o cabeçalho do anúncio
    const adHeaders = allDivs.filter(div => {
      const text = div.textContent;
      return text && (text.includes("Id. do anúncio:") || text.includes("Library ID:")) && div.children.length === 0;
    });

    console.log(`Encontrados ${adHeaders.length} cabeçalhos de anúncios.`);

    // Remove duplicatas pegando o elemento pai mais próximo que seja o Card real
    const processedCards = new Set();
    const maxAds = 3;

    for (let header of adHeaders) {
      if (extracted.length >= maxAds) break;

      // Sobe na árvore DOM para encontrar o contêiner do Card (geralmente uns 5 a 8 níveis acima)
      let card = header;
      for (let i = 0; i < 7; i++) {
        if (card.parentElement) card = card.parentElement;
      }

      if (processedCards.has(card)) continue;
      processedCards.add(card);

      // Agora dentro deste card, precisamos encontrar a Copy e a Mídia.
      
      // 1. Encontrar a Mídia (Vídeo ou Imagem)
      let mediaUrl = "";
      const video = card.querySelector('video');
      if (video) {
        mediaUrl = video.src || video.querySelector('source')?.src;
      }
      
      if (!mediaUrl) {
        // Se não tem vídeo, procura a maior imagem (ignora ícones pequenos)
        const images = Array.from(card.querySelectorAll('img'));
        let largestImage = null;
        let maxSize = 0;
        
        for (let img of images) {
          const size = img.clientWidth * img.clientHeight;
          if (size > maxSize && size > 10000) { // Maior que 100x100
            maxSize = size;
            largestImage = img;
          }
        }
        if (largestImage) mediaUrl = largestImage.src;
      }

      // 2. Encontrar a Copy (Texto do Anúncio)
      // O texto do anúncio geralmente é o bloco de texto mais longo dentro do card
      // que não é o nome da página ou links irrelevantes.
      let copyText = "";
      const textNodes = Array.from(card.querySelectorAll('div, span'));
      
      let longestText = "";
      for (let node of textNodes) {
        // Apenas elementos que contêm texto diretamente (sem filhos blocos longos)
        const text = node.innerText || node.textContent;
        if (text && text.length > longestText.length && text.length > 20) {
          // Garante que não é o container inteiro com todos os textos juntos
          if (node.children.length < 5) {
            longestText = text;
          }
        }
      }
      
      copyText = longestText.trim();
      
      // Pega o nome da página (geralmente o primeiro link de perfil no card)
      let title = "Oferta Extraída";
      const links = Array.from(card.querySelectorAll('a'));
      for (let a of links) {
        if (a.textContent && a.textContent.length > 2 && !a.textContent.includes("Ver") && !a.textContent.includes("Id.")) {
          title = a.textContent.trim();
          break;
        }
      }

      if (copyText || mediaUrl) {
        extracted.push({
          title: title,
          copyText: copyText,
          mediaUrl: mediaUrl || ""
        });
      }
    }

    return extracted;
  }

  return extractAds();
})();
