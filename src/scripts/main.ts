/**
 * Portfolio — Application Entry
 * Initializes lightweight enhancements for the static page.
 */

function setFooterYear(): void {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event: MouseEvent) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector<HTMLElement>(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function initThemeToggle(): void {

  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;


  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);


  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";


    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

function init(): void {
  setFooterYear();
  initSmoothScroll();
  initThemeToggle();
}

document.addEventListener("DOMContentLoaded", init);

function initAlgorithmShowcase(): void {
    // Select DOM elements and cast them to their respective types
    const bubbleBtn = document.getElementById("btn-bubble") as HTMLButtonElement | null;
    const pointerBtn = document.getElementById("btn-pointer") as HTMLButtonElement | null;
    const codeDisplay = document.getElementById("code-block") as HTMLElement | null;
    const fileNameDisplay = document.getElementById("algo-file-name") as HTMLElement | null;
    const complexityBadge = document.getElementById("complexity-badge") as HTMLElement | null;
    const complexityText = document.getElementById("complexity-text") as HTMLElement | null;

    // Early return if any of the required elements are missing in the DOM
    if (!bubbleBtn || !pointerBtn || !codeDisplay || !fileNameDisplay || !complexityBadge || !complexityText) return;

    // Source code template for Optimized Bubble Sort
    const bubbleCode: string = `function bubbleSortOptimized(arr: number[]): number[] {
    let n = arr.length;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements using destructuring assignment
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (!swapped) break;
    }
    return arr;
}`;

    // Source code template for the optimized Three-Pointer technique
    const pointerCode: string = `function threePointerSort(arr: number[]): number[] {
    // Multi-Pointer Technique for sorting specific categories
    // Highly efficient: Beats 90%+ on LeetCode | Time Complexity: O(n)
    let low = 0;
    let mid = 0;
    let high = arr.length - 1;

    while (mid <= high) {
        if (arr[mid] === 0) {
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
    return arr;
}`;

    // Set initial state on page load
    codeDisplay.textContent = bubbleCode;

    // Event listener for Bubble Sort tab configuration
    bubbleBtn.addEventListener("click", () => {
        pointerBtn.classList.remove("active");
        bubbleBtn.classList.add("active");
        
        fileNameDisplay.textContent = "bubbleSort.ts";
        codeDisplay.textContent = bubbleCode;
        complexityBadge.textContent = "Time Complexity: O(n²)";
        complexityBadge.style.backgroundColor = "#ff4d4d"; // Soft red for standard complexity
        complexityText.textContent = "The traditional sorting approach. It is highly educational for understanding data flow, but scales poorly with large datasets due to intensive nested iterations.";
    });

    // Event listener for Three-Pointer tab configuration
    pointerBtn.addEventListener("click", () => {
        bubbleBtn.classList.remove("active");
        pointerBtn.classList.add("active");
        
        fileNameDisplay.textContent = "threePointer.ts";
        codeDisplay.textContent = pointerCode;
        complexityBadge.textContent = "Time Complexity: O(n)";
        complexityBadge.style.backgroundColor = "#2ecc71"; // Safe green for optimized performance
        complexityText.textContent = "An enterprise-grade optimized solution! It processes and sorts the array in a single pass, drastically minimizing computational overhead and maximizing backend resource efficiency.";
    });
}

// Execute the dynamic toggle setup
initAlgorithmShowcase();
