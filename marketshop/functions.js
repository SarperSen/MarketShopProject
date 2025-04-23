

function toggleSideCategoryPanel(show = null) {
    const sidePanel = document.getElementById('sideCategoryPanel');
    if (!sidePanel) return;
  
    if (show === true) {
      sidePanel.style.display = 'block';
    } else if (show === false) {
      sidePanel.style.display = 'none';
    } else {
      const isVisible = sidePanel.style.display === 'block';
      sidePanel.style.display = isVisible ? 'none' : 'block';
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const categoryLeft = document.getElementById('categoryLeft');
    const sidePanel = document.getElementById('sideCategoryPanel');
  
    if (categoryLeft) {
      // Tıklama ile aç/kapat
      categoryLeft.addEventListener('click', () => toggleSideCategoryPanel());
  
      // Üzerine gelince aç
      categoryLeft.addEventListener('mouseenter', () => toggleSideCategoryPanel(true));
  
      // Üzerinden çıkınca kapat
      categoryLeft.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!sidePanel.matches(':hover')) {
            toggleSideCategoryPanel(false);
          }
        }, 300);
      });
  
      // Panelin dışına çıkınca da kapanmalı
      if (sidePanel) {
        sidePanel.addEventListener('mouseleave', () => toggleSideCategoryPanel(false));
      }
    }
  });
  
  



// KAMPANYA KARTLARI    discount_cards[]
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://sarpersen.github.io/MarketShopProject/marketshop/fileJson/discountCards.json")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("campaign-list");
  
        data.discount_cards.forEach(card => {
          const div = document.createElement("div");
          div.className = "campaign-card";
  
          div.innerHTML = `
            <a href="${card.kartLink}" target="_blank">
              <img src="${card.resimLink}" alt="${card.buttonText}">
            </a>
          `;
  
          container.appendChild(div);
        });
      })
      .catch(err => console.error("Kampanya verisi yüklenemedi:", err));
  });
  
  

// SLIDER 1   -sliderOne_cards[]
let sliderIndex1 = 0;

function loadSlider1() {
  fetch("https://sarpersen.github.io/MarketShopProject/marketshop/fileJson/sliderOne.json")
    .then(res => res.json())
    .then(data => {
      const sliderContainer = document.querySelector(".slider-container-1");

      data.sliderOne_cards.forEach(card => {
        const slide = document.createElement("div");
        slide.className = "slider-item-1";
        slide.innerHTML = `
          <a href="${card.discountLink}" target="_blank">
            <img src="${card.imageLink}" alt="kampanya">
          </a>
        `;
        sliderContainer.appendChild(slide);
      });

      // Slider güncelleme fonksiyonu
      function updateSlider1() {
        sliderContainer.style.transform = `translateX(-${sliderIndex1 * 100}%)`;
      }

      // Sağ buton
      document.querySelector(".slider-btn-1.right").addEventListener("click", () => {
        sliderIndex1 = (sliderIndex1 + 1) % data.sliderOne_cards.length;
        updateSlider1();
      });

      // Sol buton
      document.querySelector(".slider-btn-1.left").addEventListener("click", () => {
        sliderIndex1 = (sliderIndex1 - 1 + data.sliderOne_cards.length) % data.sliderOne_cards.length;
        updateSlider1();
      });

      // Otomatik geçiş (3 saniyede bir örnek, isteğe bağlı ayarlanabilir)
      setInterval(() => {
        sliderIndex1 = (sliderIndex1 + 1) % data.sliderOne_cards.length;
        updateSlider1();
      }, 3000);
    })
    .catch(err => console.error("1. Slider verisi yüklenemedi:", err));
}

document.addEventListener("DOMContentLoaded", loadSlider1);



// SLIDER 2 - Ürün kartları entegrasyonu  -sliderTwo_electricCards[]
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("slider-content-2");
    const next = document.getElementById("nextBtn2");
    const prev = document.getElementById("prevBtn2");
  
    fetch("https://sarpersen.github.io/MarketShopProject/marketshop/fileJson/sliderTwo.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("slider-content-2");
  
      data.sliderTwo_electricCards.forEach(item => {
        const card = document.createElement("div");
        card.className = "slider-item-2";
        card.innerHTML = `
        <a href="${item.productLink}" target="_blank">
          <img src="${item.imageLink}" alt="${item.productName}">
          <div class="product-info">
            <div class="product-title">${item.productName}</div>
            <div class="product-rating">${item.rating}</div>
            <div class="product-price">${item.price}</div>
          </div>
        </a>
        <button>Sepete Ekle</button>
      `;      
        container.appendChild(card);
      });
    });
  
  
    // Kaydırma
    next.addEventListener("click", () => {
      container.scrollBy({ left: 320, behavior: "smooth" });
    });
  
    prev.addEventListener("click", () => {
      container.scrollBy({ left: -320, behavior: "smooth" });
    });
  });
  
  

// SANA ÖZEL ÜRÜNLER KOLEKSİYONU  -special_products[]
function loadSpecialProducts() {
    fetch("https://sarpersen.github.io/MarketShopProject/marketshop/fileJson/specialprocuts.json")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("special-products-scroll");
  
        data.special_products.forEach(product => {
          const card = document.createElement("a");
          card.className = "special-card";
          card.href = product.productLink;
          card.target = "_blank";
          card.innerHTML = `
            <img src="${product.imageLink}" alt="ürün">
            <div class="product-name">${product.productName}</div>
            <div class="product-rating">${product.rating}</div>
            <div class="product-price">${product.price}</div>
          `;
          container.appendChild(card);
        });
  
        // Kaydırma fonksiyonu
        const scrollArea = container;
        document.getElementById("special-prev").onclick = () => {
          scrollArea.scrollLeft -= 300;
        };
        document.getElementById("special-next").onclick = () => {
          scrollArea.scrollLeft += 300;
        };
      })
      .catch(err => console.error("Özel ürünler yüklenemedi:", err));
  }
  
  document.addEventListener("DOMContentLoaded", loadSpecialProducts);
  
  
