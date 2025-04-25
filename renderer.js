window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input-text');
  const output = document.getElementById('output-text');
  const button = document.getElementById('button');

  button.addEventListener('click', async () => {
    const text = input.value;
    if (window.api && window.api.toHiraganaOverlay) {
      const result = await window.api.toHiraganaOverlay(text);
      output.innerHTML = result;
    } else {
      output.innerText = "Conversion function not available.";
    }
  });
});
