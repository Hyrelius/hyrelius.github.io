const container = document.getElementById("scrollContainer");
const sections = container.querySelectorAll('.section');

// Debug logging for GitHub Pages
console.log('Scrolling script loaded');
console.log('Container found:', !!container);
console.log('Sections found:', sections.length);

// Update debug info
const debugInfo = document.getElementById('debug-info');
if (debugInfo) {
    debugInfo.innerHTML = `
        Script: Loaded<br>
        Container: ${!!container}<br>
        Sections: ${sections.length}<br>
        Scroll Width: ${container ? container.scrollWidth : 'N/A'}
    `;
}

function getCurrentSection() {
    // Find the section closest to the left edge of the container
    let minDiff = Infinity;
    let current = sections[0];
    sections.forEach(section => {
      const diff = Math.abs(section.getBoundingClientRect().left - container.getBoundingClientRect().left);
      if (diff < minDiff) {
        minDiff = diff;
        current = section;
      }
    });
    return current;
  }

    container.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const threshold = 100;
      const width = window.innerWidth;

      if (x < threshold) {
        container.classList.add("edge-left");
        container.classList.remove("edge-right");
      } else if (x > width - threshold) {
        container.classList.add("edge-right");
        container.classList.remove("edge-left");
      } else {
        container.classList.remove("edge-left", "edge-right");
      }
    });


    container.addEventListener("click", (e) => {
        const x = e.clientX;
        const width = window.innerWidth;
        const scrollAmount = window.innerWidth;
      
        if (x < 100 || x > width - 100) {
          // Fade out all sections
          sections.forEach(section => section.classList.add('fading'));
      
          // Scroll
          const scrollBy = x < 100 ? -scrollAmount : scrollAmount;
          container.scrollBy({ left: scrollBy, behavior: 'smooth' });
      
          // After scroll, fade in the current section
          setTimeout(() => {
            const current = getCurrentSection();
            sections.forEach(section => section.classList.add('fading')); // Ensure all are faded
            current.classList.remove('fading'); // Fade in the current
          }, 700); // Match the scroll duration/transition
        }
      });

    // Optional: allow vertical wheel scroll to move horizontally
    container.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Fade out all sections
        sections.forEach(section => section.classList.add('fading'));

        container.scrollBy({ left: e.deltaY, behavior: 'auto' });
        e.preventDefault();

        // After scroll, fade in the current section
        setTimeout(() => {
          const current = getCurrentSection();
          sections.forEach(section => section.classList.add('fading'));
          current.classList.remove('fading');
        }, 700); // Match the transition duration
      }
    }, { passive: false });

    window.addEventListener('DOMContentLoaded', () => {
        sections.forEach(section => section.classList.add('fading'));
        setTimeout(() => {
          getCurrentSection().classList.remove('fading');
        }, 100);
      });