document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("sortOption");
    const container = document.querySelector(".homeTable");
  
    select.addEventListener("change", () => {
      const cells = Array.from(container.querySelectorAll(".homeCell"));
  
      // Step 1: Fade cells out
      cells.forEach(cell => {
        cell.classList.remove("fade-in");
        cell.classList.add("fade-out");
      });
  
      setTimeout(() => {
        // Step 2: Sort cells
        const sortType = select.value;
        const sorted = [...cells].sort((a, b) => {
          if (sortType === "date") {
            return b.dataset.date - a.dataset.date;
          } else if (sortType === "date-asc") {
            return a.dataset.date - b.dataset.date;
          } else if (sortType === "title") {
            return a.querySelector(".homeCellTitle").textContent.localeCompare(
              b.querySelector(".homeCellTitle").textContent
            );
          }
        });
  
        // Step 3: remove and then append in the new order
        sorted.forEach(cell => {
            cell.classList.remove("fade-out"); // Reset for fade-in
            cell.style.opacity = "0"; // Immediately hide
            container.appendChild(cell);
        });
        
        // Step 4: trigger reflow
        void container.offsetHeight;
  
        // Step 5: Fade in
        sorted.forEach(cell => {
            cell.classList.add("fade-in");
            cell.style.opacity = "1";
        });
    }, 300);
  });
});
