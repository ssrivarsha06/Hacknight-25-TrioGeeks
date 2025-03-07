// Data storage functions
const ITEMS_STORAGE_KEY = "expiry-tracker-items";
// Constants for local storage key

// Load stored expiry items from localStorage
function loadExpiryItems() {
  const storedItems = localStorage.getItem(ITEMS_STORAGE_KEY);
  if (!storedItems) return [];

  try {
    return JSON.parse(storedItems).map((item) => ({
      name: item.name,
      expiryDate: new Date(item.expiryDate),
    }));
  } catch (error) {
    console.error("Error loading expiry items:", error);
    return [];
  }
}

// Populate the dropdown in home.html
function populateDropdown() {
  const expiryDropdown = document.getElementById("expiryDropdown");
  const ingredientsInput = document.getElementById("ingredients-input");

  if (!expiryDropdown || !ingredientsInput) return; // Prevent errors if elements are missing

  expiryDropdown.innerHTML = `<option value="">Select an item</option>`;
  const items = loadExpiryItems();

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = `${item.name} (Expires: ${item.expiryDate.toDateString()})`;
    expiryDropdown.appendChild(option);
  });

  // Append selected item to the input field instead of replacing it
  expiryDropdown.addEventListener("change", function () {
    if (this.value) {
      const currentText = ingredientsInput.value.trim();
      if (currentText) {
        ingredientsInput.value = `${currentText}, ${this.value}`;
      } else {
        ingredientsInput.value = this.value;
      }
      this.value = ""; // Reset dropdown after selection
    }
  });
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", populateDropdown);

// Sample items data
const sampleItems = [
  {
    id: "1",
    name: "Kellogg's Chocos",
    quantity: 2,
    buyDate: new Date("2025-01-21"),
    expiryDate: new Date("2025-04-02"),
    image: "./images/lays.png",
    category: "Breakfast",
  },
  {
    id: "2",
    name: "Lays Classic",
    quantity: 4,
    buyDate: new Date("2025-01-21"),
    expiryDate: new Date("2025-04-02"),
    image: "./images/lays.png",
    category: "Snacks",
  },
  {
    id: "3",
    name: "Heinz Tomato Ketchup",
    quantity: 1,
    buyDate: new Date("2025-01-21"),
    expiryDate: new Date("2025-04-02"),
    image: "./images/sauce.png",
    category: "Condiments",
  },
  {
    id: "4",
    name: "Maggie",
    quantity: 2,
    buyDate: new Date("2025-01-21"),
    expiryDate: new Date("2025-04-02"),
    image: "./images/maggie.png",
    category: "Instant Food",
  },
];

// Data utility functions
function saveItems(items) {
  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
}

function loadItems() {
  const storedItems = localStorage.getItem(ITEMS_STORAGE_KEY);
  if (!storedItems) return [];

  try {
    const parsedItems = JSON.parse(storedItems);
    // Convert string dates back to Date objects
    return parsedItems.map((item) => ({
      ...item,
      buyDate: new Date(item.buyDate),
      expiryDate: new Date(item.expiryDate),
    }));
  } catch (error) {
    console.error("Error parsing stored items:", error);
    return [];
  }
}

function addItem(item) {
  const items = loadItems();
  const newItem = {
    ...item,
    id: Date.now().toString(),
  };
  saveItems([...items, newItem]);
  return newItem;
  renderItems();
}

function updateItem(item) {
  const items = loadItems();
  const updatedItems = items.map((existingItem) =>
    existingItem.id === item.id ? item : existingItem
  );
  saveItems(updatedItems);
}

// Delete an item
function deleteItem(id) {
  let items = loadItems();
  items = items.filter((item) => item.id !== id);
  saveItems(items);
  renderItems(); // Refresh UI
}
// Edit an item
function editItem(id) {
  const items = loadItems();
  const item = items.find((item) => item.id === id);
  if (!item) return;
 // Prompt user for new values
 const newName = prompt("Edit item name:", item.name) || item.name;
 const newQuantity = parseInt(prompt("Edit quantity:", item.quantity), 10) || item.quantity;
 const newExpiryDate = prompt("Edit expiry date (YYYY-MM-DD):", item.expiryDate.toISOString().split('T')[0]);

 if (newExpiryDate) {
   item.name = newName;
   item.quantity = newQuantity;
   item.expiryDate = new Date(newExpiryDate);
   saveItems(items);
   renderItems(); // Refresh UI
 }
}
function getExpiryDaysText(expiryDate) {
  const today = new Date();
  const days = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (days < 0) {
    return "Expired";
  } else if (days === 0) {
    return "Expires today";
  } else if (days === 1) {
    return "Expires tomorrow";
  } else {
    return `Expires in ${days} days`;
  }
}

function filterItemsByExpiry(items, filter) {
  const today = new Date();
 // let items = loadItems(); // Load all items from storage

  switch (filter) {
    case "< 3 days":
      return items.filter(item => {
        const days = Math.floor((item.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return days >= 0 && days < 3;
      });
    case "< 5 days":
      return items.filter(item => {
        const days = Math.floor((item.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return days >= 0 && days < 5;
      });
    case "> 7 days":
      return items.filter(item => {
        const days = Math.floor((item.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return days > 7;
      });
    default:
      return true;
  }
}
/*
function filterItemsByExpiry(items, filter) {
  const today = new Date();

  return items.filter((item) => {
    const days = Math.floor((item.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (filter === "< 3 days") return days >= 0 && days < 3;
    if (filter === "< 5 days") return days >= 0 && days < 5;
    if (filter === "> 7 days") return days > 7;
    
    return true; // If no filter is selected, return all items
  });
}*/

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Show appropriate color for expiry text
function getExpiryColorClass(expiryDate) {
  const today = new Date();
  const days = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (days < 0) {
    return "red";
  } else if (days < 3) {
    return "red";
  } else if (days < 5) {
    return "orange";
  } else if (days < 7) {
    return "blue";
  } else {
    return "green";
  }
}

// DOM manipulation functions
function createItemCard(item) {
  const expiryText = getExpiryDaysText(item.expiryDate);
  const colorClass = getExpiryColorClass(item.expiryDate);
  
  const itemCard = document.createElement('div');
  itemCard.className = 'item-card';
  itemCard.innerHTML = `
    <div class="item-content">
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="item-details">
        <div class="item-header">
          <h3 class="item-name">${item.quantity} x ${item.name}</h3>
          <span class="expiry-text ${colorClass}">${expiryText}</span>
        </div>
        <div class="item-dates">
          <p>Bought on: ${formatDate(item.buyDate)}</p>
          <p>Expires on: ${formatDate(item.expiryDate)}</p>
        </div>
        <div class="item-actions">
          <button class="edit-btn" data-id="${item.id}">Edit</button>
                    <button class="delete-btn" data-id="${item.id}">Delete</button>
        </div>
      </div>
    </div>
  `;
  
  return itemCard;
}

function displayEmptyState(container, searchQuery, activeFilter) {
  let message = "Add your first item to get started";
  
  if (searchQuery) {
    message = "Try a different search term";
  } else if (activeFilter) {
    message = "No items match the selected filter";
  }
  
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">
        <span style="font-size: 2rem;">🔍</span>
      </div>
      <h3 class="empty-title">No items found</h3>
      <p class="empty-message">${message}</p>
    </div>
  `;
}

// Page navigation functions
function navigateToPage(pageId) {
  // Save current page to history for back button functionality
  window.history.pushState({ pageId }, '', `#${pageId}`);
  showPage(pageId);
}

function showPage(pageId) {
  const app = document.getElementById('app');
  
  if (pageId === 'add-item') {
    renderAddItemPage(app);
  } else if (pageId === 'barcode-scan') {
    renderAddItemPage(app, true);
  } else {
    // Default to home page
    renderHomePage(app);
  }
}

// Render home page (index)
function renderHomePage(container) {
  let activeFilter = null;
  let searchQuery = '';
  
  container.innerHTML = `
    <header class="header">
      <h1>Expiry Dates</h1>
    </header>
    
    <div class="search-container">
      <div class="search-input-wrapper">
        <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <input type="text" class="search-input" placeholder="Search" id="searchInput" />
      </div>
      <button class="filter-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-sliders-horizontal"><line x1="21" x2="3" y1="4" y2="4"/><line x1="21" x2="3" y1="12" y2="12"/><line x1="21" x2="3" y1="20" y2="20"/><polyline points="14 15 14 20 14 9"/><polyline points="8 9 8 4 8 16"/></svg>
      </button>
    </div>
    
    <div class="filter-chips">
      <span class="filter-label">Items</span>
      <div class="chips-container">
        <button class="chip red" data-filter="< 3 days">&lt; 3 days</button>
        <button class="chip blue" data-filter="< 5 days">&lt; 5 days</button>
        <button class="chip green" data-filter="> 7 days">&gt; 7 days</button>
      </div>
      <button class="view-all active">View all</button>
    </div>
    
    <div class="items-container" id="itemsContainer">
      <!-- Items will be loaded here -->
    </div>
    
    <button class="add-button" id="addButton">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    </button>
    
    <nav class="bottom-nav">
      <a href="#" class="nav-item active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
        <span class="nav-label">Expiry</span>
      </a>
      <a href="#" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-chef-hat"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg>
        <span class="nav-label">Recipes</span>
      </a>
      <a href="#" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-gift"><rect width="18" height="14" x="3" y="8" rx="2"/><path d="M12 8V22"/><path d="M19 12v.01"/><path d="M17 15v.01"/><path d="M13 12v.01"/><path d="M13 15v.01"/><path d="M16 12v.01"/><path d="M16 15v.01"/><path d="M3 12v.01"/><path d="M20 5H9.5a2.5 2.5 0 0 1 0-5H12v5"/><path d="M4 5h10.5a2.5 2.5 0 0 0 0-5H12v5"/></svg>
        <span class="nav-label">Rewards</span>
      </a>
    </nav>
  `;
  
  // Attach event listeners
  const searchInput = container.querySelector('#searchInput');
  const filterChips = container.querySelectorAll('.chip');
  const viewAllBtn = container.querySelector('.view-all');
  const addButton = container.querySelector('#addButton');
  
  // Add button opens the entry selector dialog
  addButton.addEventListener('click', showEntrySelectorDialog);
  
  // Search functionality
  searchInput.addEventListener('input', function() {
    searchQuery = this.value.trim().toLowerCase();
    renderItems(searchQuery, activeFilter);
  });
  
  // Filter chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Toggle filter
      if (activeFilter === filter) {
        activeFilter = null;
        filterChips.forEach(c => c.classList.remove('active'));
        viewAllBtn.classList.add('active');
      } else {
        activeFilter = filter;
        filterChips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        viewAllBtn.classList.remove('active');
      }
      
      renderItems(searchQuery, activeFilter);
    });
  });
  
  // View all button
  viewAllBtn.addEventListener('click', function() {
    activeFilter = null;
    filterChips.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    renderItems(searchQuery, activeFilter);
  });
  /*function renderItems() {
    const container = document.getElementById("itemsContainer");
    if (!container) return;
  
    container.innerHTML = ""; // Clear existing items
    const items = loadItems();
    
    if (items.length === 0) {
      displayEmptyState(container);
    } else {
      items.forEach((item) => {
        container.appendChild(createItemCard(item));
      });
    }
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        const itemId = this.getAttribute("data-id");
        editItem(itemId);
  });
});

document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    const itemId = this.getAttribute("data-id");
    deleteItem(itemId);
  });
});
}*/
function renderItems(filter = null) {
  console.log("Loaded items:", loadItems()); // Debugging

  const container = document.getElementById("itemsContainer");
  if (!container) return;

  container.innerHTML = ""; // Clear existing items
  let items = filter ? filterItemsByExpiry(filter) : loadItems(); // Apply filter if selected
  console.log("Filtered items:", items); // Debugging

  // Apply filter if provided
 

  if (items.length === 0) {
      displayEmptyState(container);
  } else {
      items.forEach((item) => {
          container.appendChild(createItemCard(item));
      });
  }

  // Attach event listeners correctly for edit and delete buttons
  document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", function (event) {
          event.stopPropagation();
          const itemId = this.dataset.id;  // Fix: Use dataset.id instead of getAttribute
          editItem(itemId);
      });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function (event) {
          event.stopPropagation();
          const itemId = this.dataset.id;  // Fix: Use dataset.id instead of getAttribute
          deleteItem(itemId);
      });
  });
}
















  /*// Render items when page loads
  renderItems('', null);
  
  function renderItems(query, filter) {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';
    
    let items = loadItems();
    
    // Apply search filter
    if (query) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    */
    // Apply expiry filter
    if (filter) {
      items = filterItemsByExpiry(items, filter);
    }
    
    // Display items or empty state
    if (items.length > 0) {
      items.forEach(item => {
        const itemCard = createItemCard(item);
        itemsContainer.appendChild(itemCard);
      });
    } else {
      displayEmptyState(itemsContainer, query, filter);
    }
  }


// Render add item page
function renderAddItemPage(container, isBarcodeMode = false) {
  container.innerHTML = `
    <header class="header">
      <button class="back-button" id="backButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      </button>
      <h1>Add Item</h1>
    </header>
    
    <form id="addItemForm" class="add-item-form">
      <button type="button" id="imageUploadBtn" class="image-upload">
        <div id="uploadPlaceholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>
          <span>Upload Images</span>
        </div>
        <img id="uploadedImage" class="uploaded-image hidden" src="" alt="Uploaded item">
      </button>
      
      <input type="text" id="itemName" class="form-input" placeholder="Item name" required>
      
      <div class="form-row">
        <input type="number" id="quantity" class="form-input" placeholder="Quantity" min="1" value="1">
        <input type="text" id="category" class="form-input" placeholder="Category">
      </div>
      
      <div class="form-row">
        <input type="date" id="buyDate" class="form-input" placeholder="Buying Date" title="Buying Date">
        <input type="date" id="expiryDate" class="form-input" placeholder="Expiry Date" title="Expiry Date">
      </div>
      
      <textarea id="description" class="form-textarea" placeholder="Description"></textarea>
      
      <div class="form-actions">
        <button type="button" id="cancelBtn" class="cancel-button">Cancel</button>
        <button type="submit" id="saveBtn" class="save-button">Save</button>
      </div>
      
      ${isBarcodeMode ? `
        <div class="or-divider">
          <span>or</span>
        </div>
        
        <button type="button" id="barcodeBtn" class="barcode-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-scan-barcode"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M17 7v10"/></svg>
          <span>Scan Barcode</span>
        </button>
      ` : ''}
    </form>
    
    <nav class="bottom-nav">
      <a href="#" class="nav-item active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
        <span class="nav-label">Expiry</span>
      </a>
      <a href="#" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-chef-hat"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg>
        <span class="nav-label">Recipes</span>
      </a>
      <a href="#" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-gift"><rect width="18" height="14" x="3" y="8" rx="2"/><path d="M12 8V22"/><path d="M19 12v.01"/><path d="M17 15v.01"/><path d="M13 12v.01"/><path d="M13 15v.01"/><path d="M16 12v.01"/><path d="M16 15v.01"/><path d="M3 12v.01"/><path d="M20 5H9.5a2.5 2.5 0 0 1 0-5H12v5"/><path d="M4 5h10.5a2.5 2.5 0 0 0 0-5H12v5"/></svg>
        <span class="nav-label">Rewards</span>
      </a>
    </nav>
  `;
  
  // Set default dates
  const today = new Date();
  const buyDateInput = document.getElementById('buyDate');
  const expiryDateInput = document.getElementById('expiryDate');
  buyDateInput.valueAsDate = today;
  
  // Set expiry date to 30 days from now as default
  const defaultExpiryDate = new Date();
  defaultExpiryDate.setDate(today.getDate() + 30);
  expiryDateInput.valueAsDate = defaultExpiryDate;
  
  // Back button
  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', function() {
    navigateToPage('home');
  });
  
  // Cancel button
  const cancelBtn = document.getElementById('cancelBtn');
  cancelBtn.addEventListener('click', function() {
    navigateToPage('home');
  });
  
  // Image upload
  const imageUploadBtn = document.getElementById('imageUploadBtn');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  const uploadedImage = document.getElementById('uploadedImage');
  let selectedImage = null;
  
  imageUploadBtn.addEventListener('click', function() {
    // In a real app, this would open a file picker
    // For this demo, we'll just set a placeholder
    const defaultImages = [
      "./images/kellogs.png",
      "./images/lays.png",
      "./images/maggie.png"
    ];
    
    // Pick a random image from the defaults
    const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
    selectedImage = randomImage;
    
    // Show the selected image
    uploadedImage.src = randomImage;
    uploadPlaceholder.classList.add('hidden');
    uploadedImage.classList.remove('hidden');
    
    showToast('Image uploaded successfully');
  });
  
  // Form submission
  const addItemForm = document.getElementById('addItemForm');
  const saveBtn = document.getElementById('saveBtn');
  
  addItemForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const itemNameInput = document.getElementById('itemName');
    const itemName = itemNameInput.value.trim();
    
    if (!itemName) {
      showToast('Please enter an item name', true);
      return;
    }
    
    saveBtn.disabled = true;
    
    // Get form values
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const category = document.getElementById('category').value.trim();
    const buyDate = new Date(document.getElementById('buyDate').value);
    const expiryDate = new Date(document.getElementById('expiryDate').value);
    const description = document.getElementById('description').value.trim();
    
    // Create new item
    try {
      addItem({
        name: itemName,
        quantity,
        buyDate,
        expiryDate,
        category,
        description,
        image: selectedImage || '/placeholder.svg',
      });
      
      showToast('Item has been added successfully');
      
      setTimeout(() => {
        navigateToPage('home');
      }, 500);
    } catch (error) {
      console.error('Error adding item:', error);
      showToast('An error occurred while adding your item', true);
      saveBtn.disabled = false;
    }
  });
}

// Entry selector dialog
function showEntrySelectorDialog() {
  const dialog = document.getElementById('entrySelectorDialog');
  dialog.classList.remove('hidden');
  
  const manualEntryBtn = document.getElementById('manualEntryBtn');
  const barcodeEntryBtn = document.getElementById('barcodeEntryBtn');
  const dialogOverlay = dialog.querySelector('.dialog-overlay');
  
  manualEntryBtn.addEventListener('click', function() {
    dialog.classList.add('hidden');
    navigateToPage('add-item');
  });
  
  barcodeEntryBtn.addEventListener('click', function() {
    dialog.classList.add('hidden');
    navigateToPage('barcode-scan');
  });
  
  dialogOverlay.addEventListener('click', function() {
    dialog.classList.add('hidden');
  });
}

// Toast notification
function showToast(message, isError = false) {
  // Check if a toast container already exists
  let toastContainer = document.querySelector('.toast-container');
  
  // If not, create one
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 6rem;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 9999;
    `;
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    background-color: ${isError ? 'var(--app-red)' : 'var(--app-olive)'};
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    max-width: 90%;
  `;
  toast.textContent = message;
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      toastContainer.removeChild(toast);
      
      // Remove container if empty
      if (toastContainer.children.length === 0) {
        document.body.removeChild(toastContainer);
      }
    }, 300);
  }, 3000);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Handle browser back button
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.pageId) {
      showPage(event.state.pageId);
    } else {
      showPage('home');
    }
  });
  
  // Initial page load
  const hash = window.location.hash.slice(1);
  showPage(hash || 'home');
});


