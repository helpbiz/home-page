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
const formStatus = document.getElementById("formStatus");

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
	contactForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(contactForm);
		const company = String(formData.get("company") || "").trim();
		const name = String(formData.get("name") || "").trim();
		const phone = String(formData.get("phone") || "").trim();
		const interest = String(formData.get("interest") || "").trim();
		const message = String(formData.get("message") || "").trim();

		formData.set("company", company);
		formData.set("name", name);
		formData.set("phone", phone);
		formData.set("interest", interest);
		formData.set("message", message);
		formData.append("_subject", `[상담신청] ${company} ${name}`);
		formData.append("_template", "table");
		formData.append("_captcha", "false");

		if (formStatus) {
			formStatus.textContent = "상담 신청을 전송하고 있습니다...";
			formStatus.classList.remove("error", "success");
		}

		try {
			const response = await fetch("https://formsubmit.co/ajax/helpbiz@naver.com", {
				method: "POST",
				headers: {
					Accept: "application/json",
				},
				body: formData,
			});

			if (!response.ok) {
				throw new Error("request_failed");
			}

			contactForm.reset();
			if (formStatus) {
				formStatus.textContent = "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.";
				formStatus.classList.add("success");
			}
		} catch (_error) {
			if (formStatus) {
				formStatus.textContent = "전송에 실패했습니다. helpbiz@naver.com 으로 직접 연락해 주세요.";
				formStatus.classList.add("error");
			}
		}
	});
}
