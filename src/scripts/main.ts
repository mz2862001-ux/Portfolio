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


// --- DOM Elements Selection ---
const contactModal = document.getElementById('contact-modal') as HTMLElement;
const openFormBtn = document.getElementById('open-form-btn') as HTMLButtonElement;
const closeFormBtn = document.getElementById('close-form-btn') as HTMLButtonElement;
const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const btnText = submitBtn.querySelector('.btn-text') as HTMLElement;
const spinner = submitBtn.querySelector('.spinner') as HTMLElement;
const formStatus = document.getElementById('form-status') as HTMLElement;

// --- Modal Display Logic ---

// Open Modal: Remove 'hidden' class to show the popup card
openFormBtn.addEventListener('click', (): void => {
  contactModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling when modal is open
});

// Close Modal Function
const closeModal = (): void => {
  contactModal.classList.add('hidden');
  document.body.style.overflow = ''; // Restore background scrolling
  resetForm();
};

// Close Modal via X button
closeFormBtn.addEventListener('click', closeModal);

// Close Modal when clicking outside the actual modal card (on the overlay)
contactModal.addEventListener('click', (e: MouseEvent): void => {
  if (e.target === contactModal) {
    closeModal();
  }
});

// --- Form Validation & API Handling ---

// Form Reset Helper
const resetForm = (): void => {
  contactForm.reset();
  formStatus.className = 'form-status hidden';
  formStatus.textContent = '';

  // Clear all validation error messages
  document.querySelectorAll('.error-message').forEach(err => {
    err.textContent = '';
  });
};

// Handle Form Submit Event
contactForm.addEventListener('submit', async (e: Event): Promise<void> => {
  e.preventDefault(); // Stop standard browser submission

  // Clear previous error states
  let isValid: boolean = true;
  document.querySelectorAll('.error-message').forEach(err => err.textContent = '');
  formStatus.className = 'form-status hidden';

  // Fetch Input Field Values
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const messageInput = document.getElementById('message') as HTMLTextAreaElement;

  // Client-Side Validation
  if (!nameInput.value.trim()) {
    (document.getElementById('name-error') as HTMLElement).textContent = 'Name is required.';
    isValid = false;
  }

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    (document.getElementById('email-error') as HTMLElement).textContent = 'Email is required.';
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    (document.getElementById('email-error') as HTMLElement).textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (!messageInput.value.trim()) {
    (document.getElementById('message-error') as HTMLElement).textContent = 'Message cannot be empty.';
    isValid = false;
  }

  // Stop execution if validation fails
  if (!isValid) return;

  // Activate Loading State (UX Best Practices)
  submitBtn.disabled = true;
  btnText.textContent = 'Sending...';
  spinner.classList.remove('hidden');

  // Collect Data into an Object for the REST API
  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim()
  };

  try {
    // 🚀 REST API Call using native fetch
    // Replace the URL with your production endpoint later (e.g., Formspree, EmailJS, or your backend)
    const response = await fetch('https://formspree.io/f/YOUR_ENDPOINT_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // Success State
      formStatus.textContent = 'Thank you! Your message has been sent successfully.';
      formStatus.className = 'form-status success';
      contactForm.reset(); // Clear form fields on success

      // Optional: Auto-close the modal after 2.5 seconds so the user can see the success message
      setTimeout(closeModal, 2500);
    } else {
      // Server Error State
      throw new Error('API server returned an error error.');
    }

  } catch (error) {
    // Network or Runtime Error State
    formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
    formStatus.className = 'form-status error';
  } finally {
    // Restore Button State regardless of success or failure
    submitBtn.disabled = false;
    btnText.textContent = 'Submit';
    spinner.classList.add('hidden');
  }
});