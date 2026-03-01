const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");

if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", () => {
		const isOpen = siteNav.classList.toggle("open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
	});

	siteNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			siteNav.classList.remove("open");
			menuToggle.setAttribute("aria-expanded", "false");
			menuToggle.setAttribute("aria-label", "메뉴 열기");
		});
	});
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
			});
		},
		{
			threshold: 0.2,
			rootMargin: "0px 0px -10% 0px",
		},
	);

	revealItems.forEach((item) => {
		revealObserver.observe(item);
	});
} else {
	revealItems.forEach((item) => {
		item.classList.add("visible");
	});
}
