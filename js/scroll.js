document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll to anchor links
	const anchorLinks = document.querySelectorAll('a[href^="#"]');

	anchorLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href');

			// Skip empty anchors
			if (href === '#' || href === '') {
				return;
			}

			const targetId = href.substring(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				e.preventDefault();

				// Close mobile menu if open
				const overlay = document.getElementById('sidebarOverlayNav');
				const hamburger = document.querySelector('.sidebar__hamburger');
				if (overlay && overlay.classList.contains('active')) {
					overlay.classList.remove('active');
					if (hamburger) {
						hamburger.setAttribute('aria-expanded', 'false');
					}
				}

				// Calculate position with sticky sidebar offset
				const headerOffset = 0;
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				// Smooth scroll
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});

	// Gallery items fade-in animation
	const items = document.querySelectorAll('.gallery-grid__item');

	if (items.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');

						// Delay for sequential appearance
						const delay = entry.target.dataset.delay || 0;
						entry.target.style.transitionDelay = `${delay}ms`;
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		// Add delay for each item
		items.forEach((item, index) => {
			item.dataset.delay = index * 100;
			observer.observe(item);
		});
	}

	// Back to top button
	const backToTopButton = document.getElementById('backToTop');

	if (backToTopButton) {
		// Show/hide button on scroll
		function toggleBackToTop() {
			if (window.pageYOffset > 300) {
				backToTopButton.classList.add('visible');
			} else {
				backToTopButton.classList.remove('visible');
			}
		}

		// Smooth scroll to top on click
		backToTopButton.addEventListener('click', function (e) {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});

		// Track scroll
		window.addEventListener('scroll', toggleBackToTop);

		// Check initial state
		toggleBackToTop();
	}
});