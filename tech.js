document.addEventListener('DOMContentLoaded', () => {
  // Select all tab buttons and the related content and image elements
  const tabButtons = document.querySelectorAll("[role='tab']");
  const tabPanels = document.querySelectorAll("[role='tabpanel']");
  const images = document.querySelectorAll('picture');

  // Function to change tab and content
  function changeTab(e) {
    const selectedTab = e.currentTarget; // Use currentTarget to ensure it's the button

    // Update the selected state for the tabs
    tabButtons.forEach((button) => {
      button.setAttribute('aria-selected', false);
      button.setAttribute('tabindex', -1);
    });
    selectedTab.setAttribute('aria-selected', true);
    selectedTab.setAttribute('tabindex', 0);

    // Hide all tab panels and images
    tabPanels.forEach((panel) => (panel.hidden = true));
    images.forEach((image) => (image.hidden = true));

    const targetPanel = document.getElementById(
      selectedTab.getAttribute('aria-controls')
    );
    const targetImage = document.getElementById(
      selectedTab.getAttribute('data-image')
    );

    // Check if the target panel and image exist before modifying them
    if (targetPanel) {
      targetPanel.hidden = false;
    } else {
      console.error(
        'No matching panel found for',
        selectedTab.getAttribute('aria-controls')
      );
    }

    if (targetImage) {
      targetImage.hidden = false;
    } else {
      console.error(
        'No matching image found for',
        selectedTab.getAttribute('data-image')
      );
    }
  }

  // Add event listener for each tab button
  tabButtons.forEach((button) => {
    button.addEventListener('click', changeTab);

    // Enable keyboard navigation for accessibility
    button.addEventListener('keydown', (e) => {
      let newIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        newIndex = [...tabButtons].indexOf(e.target) + 1;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        newIndex = [...tabButtons].indexOf(e.target) - 1;
      }

      if (
        newIndex !== undefined &&
        newIndex >= 0 &&
        newIndex < tabButtons.length
      ) {
        tabButtons[newIndex].click();
        tabButtons[newIndex].focus();
      }
    });
  });
});
