document.addEventListener('DOMContentLoaded', () => {
  const processMode = new URLSearchParams(window.location.search).get('process') === '1';

  if (processMode) {
    document.body.classList.add('show-process-hotspots');
    const hotspots = Array.from(document.querySelectorAll('.process-hotspot'));
    const closeHotspots = () => {
      hotspots.forEach((hotspot) => {
        hotspot.classList.remove('is-open');
        hotspot.setAttribute('aria-expanded', 'false');
      });
    };

    hotspots.forEach((hotspot) => {
      hotspot.addEventListener('click', (event) => {
        event.stopPropagation();
        const willOpen = !hotspot.classList.contains('is-open');
        closeHotspots();
        hotspot.classList.toggle('is-open', willOpen);
        hotspot.setAttribute('aria-expanded', String(willOpen));
      });
    });

    document.addEventListener('click', closeHotspots);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeHotspots();
    });
  }

  document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });

  document.querySelectorAll('.subscribe-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = form.querySelector('input[type="email"]');

      if (!email || !email.value.trim()) return;

      alert('Спасибо! Адрес добавлен в список рассылки.');
      form.reset();
    });
  });

  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    const input = searchForm.querySelector('.search-input');
    const button = searchForm.querySelector('.search-btn');
    const items = Array.from(document.querySelectorAll('.faq-item'));
    const status = document.createElement('p');
    status.className = 'search-status';
    status.setAttribute('aria-live', 'polite');
    searchForm.insertAdjacentElement('afterend', status);

    const runSearch = () => {
      const query = input?.value.trim().toLocaleLowerCase('ru') ?? '';
      let visibleCount = 0;

      items.forEach((item) => {
        const text = item.textContent?.toLocaleLowerCase('ru') ?? '';
        const isVisible = !query || text.includes(query);
        item.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      status.textContent = query
        ? `Найдено ответов: ${visibleCount}`
        : '';
    };

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      runSearch();
    });

    button?.addEventListener('click', (event) => {
      event.preventDefault();
      runSearch();
    });

    input?.addEventListener('input', runSearch);
  }

  document.querySelectorAll('.share-btn').forEach((button) => {
    button.setAttribute('type', 'button');
    button.addEventListener('click', async () => {
      const shareData = {
        title: document.title,
        text: 'Познакомьтесь со специалистами Flutt',
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
          return;
        }

        await navigator.clipboard.writeText(shareData.url);
        alert('Ссылка скопирована.');
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        alert('Скопируйте адрес страницы из строки браузера.');
      }
    });
  });

  document.querySelectorAll('.form-tabs').forEach((tabList) => {
    const buttons = Array.from(tabList.querySelectorAll('.tab-btn'));
    const form = tabList.parentElement?.querySelector('.appointment-form');
    const serviceSelect = form?.querySelector('select');

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        if (serviceSelect && serviceSelect.options[index + 1]) {
          serviceSelect.selectedIndex = index + 1;
        }
      });
    });
  });

});
