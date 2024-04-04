const langEl = document.querySelector('.langWrap');
const link = document.querySelectorAll('.langWrap a');

link.forEach((el) => {
  el.addEventListener('click', () => {
    langEl.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  });
});

const allLangs = ['ua', 'en', 'de', 'pl'];
let langButtons = document.querySelectorAll('[data-btn]');
const currentPathName = window.location.pathname;
let currentLang =
  localStorage.getItem('language') || checkBrowserLang() || 'ua';
let currentTexts = {};

const homeTexts = {
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Das Unternehmen',
    pl: 'Główna',
  },
  'home_page-navlink2': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-navlink3': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-dd1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-dd2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-dd3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-dd4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-navlink4': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakt',
    pl: 'Kontakty',
  },
  'home_page-caption1': {
    ua: 'ТОВ "КОЛЯР" - Гарантія високої якості та вчасної доставки!',
    en: '"KOLYAR" LLC - Guarantee of high quality and timely delivery!',
    de: 'LLC „KOLYAR“ – Garantie für hohe Qualität und pünktliche Lieferung!',
    pl: 'Sp. z o.o. "KOLYAR" - gwarancja wysokiej jakości i terminowości dostaw!',
  },
  'home_page-caption2': {
    ua: 'ТОВ "КОЛЯР" - Пошук способів співпраці!',
    en: '"KOLYAR" LLC - We are looking for opportunities for cooperation!',
    de: 'LLC „KOLYAR“ – Wir suchen nach Möglichkeiten der Zusammenarbeit!',
    pl: 'Sp. z o.o. "KOLYAR" - Poszukiwanie sposobów współpracy!',
  },
  'home_page-caption3': {
    ua: 'Дякуємо, що обрали - ТОВ "КОЛЯР"!',
    en: 'Thank you for choosing "KOLYAR" LLC!',
    de: 'Vielen Dank, dass Sie sich für KOLYAR LLC entschieden haben!',
    pl: 'Dziękujemy za wybranie KOLYAR LLC!',
  },
  'home_page-about': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-body1': {
    ua: 'ТОВ «КОЛЯР» - компанія, яка успішно працює на ринку сільськогосподарської продукції України та міжнародному ринку. Ми здійснюємо експортні поставки товарів українського походження:  зернових, бобових, олійних культур, лікарських рослин, насіння для корму птахів та домашніх тварин, спецій, круп, овочів, олій і т.ін. Наша компанія, активно, співпрацює з великою кількістю провідних українських виробників сільськогосподарської продукції, елеваторами, зернопереробними підприємствами, комбікормовими заводами, олійно-жировими комбінатами, транспортними підприємствами.',
    en: '"KOLYAR" LLC is a company that successfully operates on the market of agricultural products of Ukraine and the international market. We export goods of Ukrainian origin: grains, legumes, oil crops, medicinal plants, seeds for bird and pet feed, spices, cereals, vegetables, oils, etc. Our company actively cooperates with a large number of leading Ukrainian producers of agricultural products, elevators, grain processing enterprises, feed mills, oil and fat plants, transport enterprises.',
    de: '„KOLYAR“ LLC ist ein Unternehmen, das erfolgreich auf dem Markt für Agrarprodukte der Ukraine und auf dem internationalen Markt tätig ist. Wir exportieren Waren ukrainischen Ursprungs: Getreide, Hülsenfrüchte, Ölpflanzen, Heilpflanzen, Samen für Vogel- und Haustierfutter, Gewürze, Getreide, Gemüse, Öle usw. Unser Unternehmen arbeitet aktiv mit einer Vielzahl führender ukrainischer Hersteller von Agrarprodukten, Elevatoren, Getreideverarbeitungsbetrieben, Futtermühlen, Öl- und Fettfabriken sowie Transportunternehmen zusammen.',
    pl: '„KOLYAR” LLC to firma, która z sukcesem działa na rynku produktów rolnych Ukrainy i na rynku międzynarodowym. Eksportujemy towary pochodzenia ukraińskiego: zboża, rośliny strączkowe, rośliny oleiste, rośliny lecznicze, nasiona na karmę dla ptaków i zwierząt domowych, przyprawy, zboża, warzywa, oleje itp. Nasza firma aktywnie współpracuje z dużą liczbą wiodących ukraińskich producentów produktów rolnych, elewatorów, przedsiębiorstw przetwórstwa zbożowego, wytwórni pasz, zakładów olejarskich i tłuszczowych, przedsiębiorstw transportowych.',
  },
  'home_page-body2': {
    ua: 'Наша продукція відвантажується в ряд країни Європи та Азії. Зокрема, в Німеччину, Австрію, Нідерланди, Італію, Іспанію, Польщу, Чехію, Угорщину, Сербію, Болгарію, Туреччину, Ірак, Узбекистан та інші країни.',
    en: 'Our products are shipped to a number of countries in Europe and Asia. In particular, to Germany, Austria, the Netherlands, Italy, Spain, Poland, the Czech Republic, Hungary, Serbia, Bulgaria, Turkey, Iraq, Uzbekistan and other countries.',
    de: 'Unsere Produkte werden in eine Reihe von Ländern in Europa und Asien versendet. Insbesondere nach Deutschland, Österreich, Niederlande, Italien, Spanien, Polen, Tschechien, Ungarn, Serbien, Bulgarien, Türkei, Irak, Usbekistan und andere Länder.',
    pl: 'Nasze produkty wysyłamy do wielu krajów Europy i Azji. W szczególności do Niemiec, Austrii, Holandii, Włoch, Hiszpanii, Polski, Czech, Węgier, Serbii, Bułgarii, Turcji, Iraku, Uzbekistanu i innych krajów.',
  },
  'home_page-body3': {
    ua: 'Доставка наших товарів здійснюються різними видами транспортних засобів, зокрема: вагонами-зерновозами, морськими контейнерами, вантажними автомобілями. Ми забезпечуємо упакування продукції у будь-які види тари (поліпропіленові/паперові мішки, біг-беги, бочки, на піддонах) або насипом, в залежності від вимог наших покупців.',
    en: 'The delivery of our goods is carried out by various types of vehicles, in particular: grain wagons, sea containers, trucks. We provide packaging of products in any types of containers (polypropylene/paper bags, big bags, barrels, on pallets) or in bulk, depending on the requirements of our customers.',
    de: 'Die Lieferung unserer Waren erfolgt durch verschiedene Arten von Fahrzeugen, insbesondere: Getreidewaggons, Seecontainer, LKWs. Je nach den Anforderungen unserer Kunden bieten wir die Verpackung von Produkten in Behältern aller Art (Polypropylen-/Papiersäcke, Big Bags, Fässer, auf Paletten) oder in loser Schüttung an.',
    pl: 'Dostawa naszych towarów odbywa się za pomocą różnego rodzaju pojazdów, w szczególności: wagonów zbożowych, kontenerów morskich, samochodów ciężarowych. Zapewniamy pakowanie produktów w wszelkiego rodzaju pojemniki (worki polipropylenowe/papierowe, big bagi, beczki, na paletach) lub luzem, w zależności od wymagań naszych klientów.',
  },
  'home_page-body4': {
    ua: 'Ми дуже цінуємо наших клієнтів, тому поставляємо товари тільки високої якості. Ми завжди здійснюємо ретельний відбір кращих товарів, проводимо постійні перевірки якості у незалежних акредитованих лабораторіях.',
    en: 'We value our customers very much, so we deliver only high-quality products. We always carry out a careful selection of the best products, we conduct constant quality checks in independent accredited laboratories.',
    de: 'Wir legen großen Wert auf unsere Kunden und liefern daher nur qualitativ hochwertige Produkte. Wir führen stets eine sorgfältige Auswahl der besten Produkte durch und führen ständige Qualitätskontrollen in unabhängigen akkreditierten Laboren durch.',
    pl: 'Bardzo cenimy naszych klientów, dlatego dostarczamy wyłącznie produkty wysokiej jakości. Zawsze przeprowadzamy staranną selekcję najlepszych produktów, prowadzimy stałą kontrolę jakości w niezależnych, akredytowanych laboratoriach.',
  },
};

const aboutTexts = {
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Das Unternehmen',
    pl: 'Główna',
  },
  'home_page-navlink2': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-navlink3': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-dd1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-dd2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-dd3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-dd4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-navlink4': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakt',
    pl: 'Kontakty',
  },
};

const oliyniTexts = {
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Das Unternehmen',
    pl: 'Główna',
  },
  'home_page-navlink2': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-navlink3': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-dd1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-dd2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-dd3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-dd4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-navlink4': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakt',
    pl: 'Kontakty',
  },
};

const boboviTexts = {
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Das Unternehmen',
    pl: 'Główna',
  },
  'home_page-navlink2': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-navlink3': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-dd1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-dd2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-dd3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-dd4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-navlink4': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakt',
    pl: 'Kontakty',
  },
};

const nasinnyaTexts = {
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Das Unternehmen',
    pl: 'Główna',
  },
  'home_page-navlink2': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-navlink3': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-dd1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-dd2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-dd3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-dd4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-navlink4': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakt',
    pl: 'Kontakty',
  },
};

const zernoviTexts = {
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Das Unternehmen',
    pl: 'Główna',
  },
  'home_page-navlink2': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-navlink3': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-dd1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-dd2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-dd3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-dd4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-navlink4': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakt',
    pl: 'Kontakty',
  },
};

const contactsTexts = {
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Das Unternehmen',
    pl: 'Główna',
  },
  'home_page-navlink2': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'home_page-navlink3': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-dd1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-dd2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-dd3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-dd4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-navlink4': {
    ua: 'Контакти',
    en: 'Contacts',
    de: 'Kontakt',
    pl: 'Kontakty',
  },
};

function checkPagePathName() {
  switch (currentPathName) {
    case '/index.html':
      currentTexts = homeTexts;
      break;
    case '/aboutus.html':
      currentTexts = aboutTexts;
      break;
    case '/oliyni.html':
      currentTexts = oliyniTexts;
      break;
    case '/bobovi.html':
      currentTexts = boboviTexts;
      break;
    case '/nasinnya.html':
      currentTexts = nasinnyaTexts;
      break;
    case '/zernovi.html':
      currentTexts = zernoviTexts;
      break;
    case '/contacts.html':
      currentTexts = contactsTexts;
      break;
    default:
      currentTexts = homeTexts;
      break;
  }
}
checkPagePathName();

function changeLang() {
  for (const key in currentTexts) {
    let elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      elem.textContent = currentTexts[key][currentLang];
    }
  }
}
changeLang();

langButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (!event.target.classList.contains('lang-btn-active')) {
      currentLang = event.target.dataset.btn;
      localStorage.setItem('language', event.target.dataset.btn);
      resetActiveClass(langButtons, 'lang-btn-active');
      btn.classList.add('lang-btn-active');
      changeLang();
    }
  });
});

function resetActiveClass(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}

function checkActiveLangButton() {
  switch (currentLang) {
    case 'ua':
      document
        .querySelector('[data-btn="ua"]')
        .classList.add('lang-btn-active');
      break;
    case 'en':
      document
        .querySelector('[data-btn="en"]')
        .classList.add('lang-btn-active');
      break;
    case 'de':
      document
        .querySelector('[data-btn="de"]')
        .classList.add('lang-btn-active');
      break;
    case 'pl':
      document
        .querySelector('[data-btn="pl"]')
        .classList.add('lang-btn-active');
      break;

    default:
      document
        .querySelector('[data-btn="ua"]')
        .classList.add('lang-btn-active');
      break;
  }
}
checkActiveLangButton();

function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 4).toLowerCase();
  const result = allLangs.some((elem) => {
    return elem === navLang;
  });
  if (result) {
    return navLang;
  }
}

console.log('navigator.language', checkBrowserLang());
