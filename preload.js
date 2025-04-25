const { contextBridge } = require('electron');
const Kuroshiro = require('kuroshiro').default;
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
const wanakana = require('wanakana');

const kuroshiro = new Kuroshiro();

(async () => {
  await kuroshiro.init(new KuromojiAnalyzer());

  contextBridge.exposeInMainWorld('api', {
    toHiraganaOverlay: async (text) => {
      const lines = text.split('\n');
      const converted = await Promise.all(lines.map(async line => {
        const kana = await kuroshiro.convert(line, { to: "hiragana", mode: "normal" });
        const fullHiragana = wanakana.toHiragana(kana);
        return `<span class="hiragana-line">${fullHiragana}</span><br><span class="original-line">${line}</span>`;
      }));
      return converted.join('<br><br>');
    }
  });  
})();
