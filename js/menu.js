document.addEventListener('DOMContentLoaded', () => {
	const hamburger = document.querySelector('.sidebar__hamburger');
	const overlay = document.getElementById('sidebarOverlayNav');

	// Exit if required elements are missing
	if (!hamburger || !overlay) {
		return;
	}

	const navLinks = overlay.querySelectorAll('a');

	function closeMenu() {
		overlay.classList.remove('active');
		hamburger.setAttribute('aria-expanded', 'false');
	}

	hamburger.addEventListener('click', function (e) {
		e.stopPropagation();
		const isOpen = overlay.classList.toggle('active');
		hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	});

	overlay.addEventListener('click', function (e) {
		if (e.target === overlay) {
			closeMenu();
		}
	});

	navLinks.forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			closeMenu();
		}
	});
});
