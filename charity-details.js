document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Get URL parameters
  const params = new URLSearchParams(window.location.search);
  const charityId = params.get('id');
  
  // Find the charity by ID
  const charity = charities.find(c => c.id === charityId);
  
  if (!charity) {
    // If charity not found, redirect to home
    window.location.href = 'donate.html';
    return;
  }
  
  // Populate charity details
  document.getElementById('charity-name').textContent = charity.name;
  document.getElementById('charity-location').textContent = charity.location;
  document.getElementById('charity-distance').textContent = charity.distance.replace('km', 'km').replace('away', '').trim() + ' away';
  
  const charityImage = document.getElementById('charity-image');
  charityImage.src = charity.image;
  charityImage.alt = charity.name;
  
  // Set up event listeners
  const backButton = document.getElementById('back-button');
  const cancelButton = document.getElementById('cancel-button');
  const donateButton = document.getElementById('donate-button');
  const toast = document.getElementById('toast');
  const toastClose = document.querySelector('.toast-close');
  const callButton = document.querySelector('.call-button');
  
  backButton.addEventListener('click', function() {
    window.history.back();
  });
  
  cancelButton.addEventListener('click', function() {
    window.history.back();
  });
  
  donateButton.addEventListener('click', function() {
    // Disable the button during processing
    donateButton.disabled = true;
    donateButton.textContent = 'Processing...';
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Enable button again
      donateButton.disabled = false;
      donateButton.textContent = 'Donate';
      
      // Update toast content
      document.querySelector('.toast-title').textContent = 'Donation successful';
      document.querySelector('.toast-description').textContent = `Thank you for donating to ${charity.name}`;
      
      // Show toast
      showToast();
      
      // Redirect to home after a delay
      setTimeout(() => {
        window.location.href = 'donate.html';
      }, 2000);
    }, 1500);
  });
  
  toastClose.addEventListener('click', function() {
    hideToast();
  });
  
  callButton.addEventListener('click', function() {
    showCallToast();
  });
  
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
  
  // Function to show call toast
  function showCallToast() {
    document.querySelector('.toast-title').textContent = 'Calling...';
    document.querySelector('.toast-description').textContent = `Connecting you to ${charity.name}`;
    showToast();
  }
});
