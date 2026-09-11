const themeLinks = {
  light: document.querySelector('[data-theme="light"]'),
  dark: document.querySelector('[data-theme="dark"]')
};
const themeChoices = document.querySelectorAll('input[name="theme"]');
const storageKey = 'diw-ut2-theme';

function applyTheme(theme) {
  const useDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  themeLinks.light.disabled = useDark;
  themeLinks.dark.disabled = !useDark;
  document.documentElement.dataset.theme = theme;

  themeChoices.forEach((choice) => {
    choice.checked = choice.value === theme;
  });
}

const savedTheme = localStorage.getItem(storageKey) || 'system';
applyTheme(savedTheme);

themeChoices.forEach((choice) => {
  choice.addEventListener('change', () => {
    localStorage.setItem(storageKey, choice.value);
    applyTheme(choice.value);
  });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ((localStorage.getItem(storageKey) || 'system') === 'system') {
    applyTheme('system');
  }
});
