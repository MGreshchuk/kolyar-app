const langEl = document.querySelector('.langWrap');
const link = document.querySelector('.n-l1 .n-l2 .n-l3 .n-l4');
const carouselEl = document.querySelector(
  '.carousel-cap1 carousel-cap2 carousel-cap3'
);
const descrEl = document.querySelector(
  '.about-paragraph-1 about-paragraph-2 about-paragraph-3 about-paragraph-4'
);

link.forEach((el) => {
  el.addEventListener('click', () => {
    langEl.querySelector('.active').classList.remove('active');
    el.classList.add('active');

    const attr = el.getAttribute('language');

    carouselEl.textContent = data[attr].carouselCap1;
    carouselEl.textContent = data[attr].carouselCap2;
    carouselEl.textContent = data[attr].carouselCap3;
    descrEl.textContent = data[attr].description;
  });
});

let data = {
  english: {
    navLink1: 'Home',
    navLink2: 'About',
    navLink3: 'Production',
    navLink4: 'Contact',
    carouselCap1:
      'LLC "KOLYAR" - Guarantee of high quality and timely delivery!',
    carouselCap2: 'LLC "KOLYAR" - Search for ways to cooperate!',
    carouselCap3: 'Thank you for choosing "KOLYAR" LLC!',
    aboutParagraph1:
      '"KOLYAR" LLC is a company that works successfully on the market agricultural products of Ukraine and the international market. We we carry out export deliveries of goods of Ukrainian origin: grain, leguminous, oil crops, medicinal plants, seeds for feed for birds and domestic animals, spices, cereals, vegetables, oils, etc. Our company actively cooperates with a large number of leading companies Ukrainian producers of agricultural products, elevators, grain processing enterprises, feed mills, oil and fat plants, transport enterprises.',
    aboutParagraph2:
      'Our products are shipped to a number of countries in Europe and Asia. In particular, in Germany, Austria, the Netherlands, Italy, Spain, Poland, the Czech Republic, Hungary, Serbia, Bulgaria, Turkey, Iraq, Uzbekistan and others countries.',
    aboutParagraph3:
      'The delivery of our goods is carried out by various types of transport means, in particular: grain wagons, sea containers, trucks. We provide product packaging in any types of containers (polypropylene/paper bags, big-bags, barrels, on pallets) or in bulk, depending on the requirements of our customers.',
    aboutParagraph4:
      'We value our customers very much, so we deliver only high-quality products quality We always carefully select the best products, we conduct constant quality checks at independent accredited ones laboratories.',
  },
};
