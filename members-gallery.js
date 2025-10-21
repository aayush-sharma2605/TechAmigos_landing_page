// Initialize circular gallery for members
document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('members-gallery');
  if (galleryContainer) {
    const membersData = [
      { image: '1.jpeg', text: 'Aashta - President' },
      { image: 'namit.jpeg', text: 'Namit - Vice President' },
      { image: '2.jpeg', text: 'Kamakshi - Secretary' }
    ];

    const app = new window.CircularGalleryApp(galleryContainer, {
      items: membersData,
      bend: 2,
      textColor: '#f8fafc',
      borderRadius: 0.05,
      font: 'bold 24px Poppins',
      scrollSpeed: 1.5,
      scrollEase: 0.08
    });
  }
});
