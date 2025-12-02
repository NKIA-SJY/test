document.addEventListener("DOMContentLoaded", () => {
  // Archive 페이지가 아닌 곳에서는 바로 종료
  const archiveGrid = document.querySelector(".archive-grid");
  if (!archiveGrid) return;

  const items = Array.from(document.querySelectorAll(".archive-item"));
  const themeChips = document.querySelectorAll(".archive-filters [data-theme]");
  const artistSelect = document.getElementById("artistFilter");
  const tagInput = document.getElementById("tagSearch");
  const countText = document.querySelector(".archive-count-text");

  let currentTheme = "all";
  let currentArtist = "all";
  let currentKeyword = "";

  function normalize(str) {
    return (str || "").toString().toLowerCase().trim();
  }

  function applyArchiveFilter() {
    let visibleCount = 0;

    const keyword = normalize(currentKeyword).replace(/^#/, ""); // 앞의 # 제거

    items.forEach((item) => {
      const itemTheme = item.getAttribute("data-theme") || "all";
      const itemArtist = item.getAttribute("data-artist") || "all";
      const itemTagsAttr = item.getAttribute("data-tags") || "";

      const titleText = item.querySelector(".archive-title")?.textContent || "";
      const tagsText = item.querySelector(".archive-tags")?.textContent || "";

      const fullText = normalize(itemTagsAttr + " " + titleText + " " + tagsText);

      const themeMatch =
        currentTheme === "all" || currentTheme === itemTheme;

      const artistMatch =
        currentArtist === "all" || currentArtist === itemArtist;

      const keywordMatch =
        keyword === "" || fullText.includes(keyword);

      const isVisible = themeMatch && artistMatch && keywordMatch;

      item.style.display = isVisible ? "" : "none";
      if (isVisible) visibleCount += 1;
    });

    if (countText) {
      countText.textContent = `총 ${visibleCount} 작품`;
    }
  }

  // 테마 chip 클릭 이벤트
  themeChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const selectedTheme = chip.getAttribute("data-theme") || "all";
      currentTheme = selectedTheme;

      // is-active 클래스 토글
      themeChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      applyArchiveFilter();
    });
  });

  // Artist select 변경 이벤트
  if (artistSelect) {
    artistSelect.addEventListener("change", () => {
      currentArtist = artistSelect.value || "all";
      applyArchiveFilter();
    });
  }

  // 태그 / 키워드 검색 입력 이벤트
  if (tagInput) {
    tagInput.addEventListener("input", () => {
      currentKeyword = tagInput.value;
      applyArchiveFilter();
    });
  }

  // 초기 렌더링 시 한 번 실행
  applyArchiveFilter();
});