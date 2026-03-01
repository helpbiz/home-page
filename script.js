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
const contactForm = document.getElementById("contactForm");

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

if (contactForm instanceof HTMLFormElement) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const formData = new FormData(contactForm);
		const company = String(formData.get("company") || "").trim();
		const name = String(formData.get("name") || "").trim();
		const phone = String(formData.get("phone") || "").trim();
		const interest = String(formData.get("interest") || "").trim();
		const message = String(formData.get("message") || "").trim();

		const subject = `[상담신청] ${company} ${name}`;
		const body = [
			"HelpBiz 상담 신청이 접수되었습니다.",
			"",
			`회사명: ${company}`,
			`담당자명: ${name}`,
			`연락처: ${phone}`,
			`관심 분야: ${interest}`,
			"",
			"상담 내용:",
			message,
		].join("\n");

		window.location.href = `mailto:helpbiz@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	});
}
