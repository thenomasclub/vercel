export function setupScrollHeader() {
  const header = document.querySelector('.scroll-header');
  if (!header) return () => {};

  function onScroll() {
    if (window.scrollY > window.innerHeight * 0.9) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}