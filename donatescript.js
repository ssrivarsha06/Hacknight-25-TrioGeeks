document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // DOM elements
    const mainContent = document.getElementById('main-content');
    const searchInput = document.getElementById('search-input');
    const backButton = document.getElementById('back-button');
    const filterButton = document.getElementById('filter-button');
    const filterIconButton = document.querySelector('.filter-icon-button');
    const toast = document.getElementById('toast');
    const toastClose = document.querySelector('.toast-close');
    
    // Initialize the charity cards
    renderCharityCards(charities);
    
    // Search functionality
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      
      if (!query.trim()) {
        renderCharityCards(charities);
        return;
      }
      
      const filteredCharities = charities.filter(charity => 
        charity.name.toLowerCase().includes(query) || 
        charity.location.toLowerCase().includes(query)
      );
      
      renderCharityCards(filteredCharities);
    });
    
    // Back button
    backButton.addEventListener('click', function() {
      window.history.back();
    });
    
    // Filter buttons
    filterButton.addEventListener('click', showFilterToast);
    filterIconButton.addEventListener('click', showFilterToast);
    
    // Toast close
    toastClose.addEventListener('click', hideToast);
    
    // Function to render charity cards
    function renderCharityCards(charitiesList) {
      mainContent.innerHTML = '';
      
      if (charitiesList.length === 0) {
        mainContent.innerHTML = `
          <div class="text-center py-10">
            <p class="text-gray-500">No charities found matching "${searchInput.value}"</p>
          </div>
        `;
        return;
      }
      
      charitiesList.forEach((charity, index) => {
        const charityCard = document.createElement('div');
        charityCard.className = 'charity-card';
        charityCard.style.animationDelay = `${index * 0.05}s`;
        
        charityCard.innerHTML = `
          <div class="flex">
            <div class="charity-image-container">
              <img src="${charity.image}" alt="${charity.name}" loading="lazy">
            </div>
            
            <div class="charity-card-content">
              <div>
                <h3 class="charity-card-name">${charity.name}</h3>
                <p class="charity-card-distance">${charity.distance}</p>
                <p class="charity-card-location">${charity.location}</p>
              </div>
              
              <div class="charity-card-actions">
                <button class="donate-button-card" data-charity-id="${charity.id}">Donate</button>
                
              </div>
            </div>
          </div>
        `;
        
        mainContent.appendChild(charityCard);
        
        // Reinitialize Lucide icons for the new elements
        lucide.createIcons({
          attrs: {
            class: ["charity-icon"]
          },
          icons: {
            Phone: {},
          }
        });
      });
      
      // Add event listeners to donate buttons
      document.querySelectorAll('.donate-button-card').forEach(button => {
        button.addEventListener('click', function() {
          const charityId = this.getAttribute('data-charity-id');
          window.location.href = `charity-details.html?id=${charityId}`;
        });
      });
      document.querySelectorAll('.call-button-card').forEach(button => {
        button.addEventListener('click', function() {
          const charityId = this.getAttribute('data-charity-id');
          const charity = charities.find(c => c.id === charityId);
          
          if (charity) {
            document.querySelector('.toast-title').textContent = 'Calling...';
            document.querySelector('.toast-description').textContent = `Connecting you to ${charity.name}`;
            showToast();
          }
        });
      });
      // Add event listeners to call buttons
      
    }
    
    // Function to show filter toast
    function showFilterToast() {
      document.querySelector('.toast-title').textContent = 'Filters';
      document.querySelector('.toast-description').textContent = 'Filter options would appear here';
      showToast();
    }
    
    // Function to show toast
    function showToast() {
      toast.classList.add('visible');
      
      // Auto hide after 5 seconds
      setTimeout(hideToast, 5000);
    }
    
    // Function to hide toast
    function hideToast() {
      toast.classList.remove('visible');
    }
  });