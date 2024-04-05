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
  'home_page-title': {
    ua: 'ТОВ "Коляр" - Головна',
    en: '"Kolyar" LLC - Main',
    de: '"Kolyar" LLC - Startseite',
    pl: '"Kolyar" LLC - Główna',
  },
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Startseite',
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
    pl: 'LLC "KOLYAR" - gwarancja wysokiej jakości i terminowości dostaw!',
  },
  'home_page-caption2': {
    ua: 'ТОВ "КОЛЯР" - Пошук способів співпраці!',
    en: '"KOLYAR" LLC - We are looking for opportunities for cooperation!',
    de: 'LLC „KOLYAR“ – Wir suchen nach Möglichkeiten der Zusammenarbeit!',
    pl: 'LLC "KOLYAR" - Poszukiwanie sposobów współpracy!',
  },
  'home_page-caption3': {
    ua: 'Дякуємо, що обрали - ТОВ "КОЛЯР"!',
    en: 'Thank you for choosing "KOLYAR" LLC!',
    de: 'Vielen Dank, dass Sie sich für KOLYAR LLC entschieden haben!',
    pl: 'Dziękujemy za wybranie KOLYAR LLC!',
  },
  'home_page-about': {
    ua: 'Вітаємо Вас на сторінці ТОВ "КОЛЯР"',
    en: 'Welcome to the page of "KOLYAR" LLC',
    de: 'Willkommen auf der Seite von "KOLYAR" LLC',
    pl: 'Witamy na stronie firmy "KOLYAR" LLC',
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

  'home_page-production-title': {
    ua: 'Продукція',
    en: 'Production',
    de: 'Produkte',
    pl: 'Produkcja',
  },
  'home_page-production1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-production2': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-production3': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-production4': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-footer1': {
    ua: 'Наші соцмережі',
    en: 'Our socials',
    de: 'Unsere sozialen Netzwerke',
    pl: 'Nasze sieci społecznościowe',
  },
  'home_page-footer2': {
    ua: '© 2024 ТОВ "КОЛЯР"',
    en: '© 2024 "KOLYAR" LLC',
    de: '© 2024 "KOLYAR" LLC',
    pl: '© 2024 "KOLYAR" LLC',
  },
};

const aboutTexts = {
  'home_page-title': {
    ua: 'ТОВ "Коляр" - Про нас',
    en: '"Kolyar" LLC - About Us',
    de: '"Kolyar" LLC - Unternehmensprofil',
    pl: '"Kolyar" LLC - O nas',
  },
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Startseite',
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
  'about_page-welcome': {
    ua: 'Про нас',
    en: 'About Us',
    de: 'Unternehmensprofil',
    pl: 'O nas',
  },
  'about_page-body1': {
    ua: 'ТОВ «КОЛЯР» - компанія, яка успішно працює на ринку сільськогосподарської продукції України та міжнародному ринку. Ми здійснюємо експортні поставки товарів українського походження:  зернових, бобових, олійних культур, лікарських рослин, насіння для корму птахів та домашніх тварин, спецій, круп, овочів, олій і т.ін. Наша компанія, активно, співпрацює з великою кількістю провідних українських виробників сільськогосподарської продукції, елеваторами, зернопереробними підприємствами, комбікормовими заводами, олійно-жировими комбінатами, транспортними підприємствами.',
    en: '"KOLYAR" LLC is a company that successfully operates on the market of agricultural products of Ukraine and the international market. We export goods of Ukrainian origin: grains, legumes, oil crops, medicinal plants, seeds for bird and pet feed, spices, cereals, vegetables, oils, etc. Our company actively cooperates with a large number of leading Ukrainian producers of agricultural products, elevators, grain processing enterprises, feed mills, oil and fat plants, transport enterprises.',
    de: '"KOLYAR" LLC ist ein Unternehmen, das erfolgreich auf dem Markt für Agrarprodukte der Ukraine und auf dem internationalen Markt tätig ist. Wir exportieren Waren ukrainischen Ursprungs: Getreide, Hülsenfrüchte, Ölpflanzen, Heilpflanzen, Samen für Vogel- und Haustierfutter, Gewürze, Getreide, Gemüse, Öle usw. Unser Unternehmen arbeitet aktiv mit einer Vielzahl führender ukrainischer Hersteller von Agrarprodukten, Elevatoren, Getreideverarbeitungsbetrieben, Futtermühlen, Öl- und Fettfabriken sowie Transportunternehmen zusammen.',
    pl: '"KOLYAR" LLC to firma, która z sukcesem działa na rynku produktów rolnych Ukrainy i na rynku międzynarodowym. Eksportujemy towary pochodzenia ukraińskiego: zboża, rośliny strączkowe, rośliny oleiste, rośliny lecznicze, nasiona na karmę dla ptaków i zwierząt domowych, przyprawy, zboża, warzywa, oleje itp. Nasza firma aktywnie współpracuje z dużą liczbą wiodących ukraińskich producentów produktów rolnych, elewatorów, przedsiębiorstw przetwórstwa zbożowego, wytwórni pasz, zakładów olejarskich i tłuszczowych, przedsiębiorstw transportowych.',
  },
  'about_page-body2': {
    ua: 'Наша продукція відвантажується в ряд країни Європи та Азії. Зокрема, в Німеччину, Австрію, Нідерланди, Італію, Іспанію, Польщу, Чехію, Угорщину, Сербію, Болгарію, Туреччину, Ірак, Узбекистан та інші країни.',
    en: 'Our products are shipped to a number of countries in Europe and Asia. In particular, to Germany, Austria, the Netherlands, Italy, Spain, Poland, the Czech Republic, Hungary, Serbia, Bulgaria, Turkey, Iraq, Uzbekistan and other countries.',
    de: 'Unsere Produkte werden in eine Reihe von Ländern in Europa und Asien versendet. Insbesondere nach Deutschland, Österreich, Niederlande, Italien, Spanien, Polen, Tschechien, Ungarn, Serbien, Bulgarien, Türkei, Irak, Usbekistan und andere Länder.',
    pl: 'Nasze produkty wysyłamy do wielu krajów Europy i Azji. W szczególności do Niemiec, Austrii, Holandii, Włoch, Hiszpanii, Polski, Czech, Węgier, Serbii, Bułgarii, Turcji, Iraku, Uzbekistanu i innych krajów.',
  },
  'about_page-body3': {
    ua: 'Доставка наших товарів здійснюються різними видами транспортних засобів, зокрема: вагонами-зерновозами, морськими контейнерами, вантажними автомобілями. Ми забезпечуємо упакування продукції у будь-які види тари (поліпропіленові/паперові мішки, біг-беги, бочки, на піддонах) або насипом, в залежності від вимог наших покупців.',
    en: 'The delivery of our goods is carried out by various types of vehicles, in particular: grain wagons, sea containers, trucks. We provide packaging of products in any types of containers (polypropylene/paper bags, big bags, barrels, on pallets) or in bulk, depending on the requirements of our customers.',
    de: 'Die Lieferung unserer Waren erfolgt durch verschiedene Arten von Fahrzeugen, insbesondere: Getreidewaggons, Seecontainer, LKWs. Je nach den Anforderungen unserer Kunden bieten wir die Verpackung von Produkten in Behältern aller Art (Polypropylen-/Papiersäcke, Big Bags, Fässer, auf Paletten) oder in loser Schüttung an.',
    pl: 'Dostawa naszych towarów odbywa się za pomocą różnego rodzaju pojazdów, w szczególności: wagonów zbożowych, kontenerów morskich, samochodów ciężarowych. Zapewniamy pakowanie produktów w wszelkiego rodzaju pojemniki (worki polipropylenowe/papierowe, big bagi, beczki, na paletach) lub luzem, w zależności od wymagań naszych klientów.',
  },
  'about_page-body4': {
    ua: 'Ми дуже цінуємо наших клієнтів, тому поставляємо товари тільки високої якості. Ми завжди здійснюємо ретельний відбір кращих товарів, проводимо постійні перевірки якості у незалежних акредитованих лабораторіях.',
    en: 'We value our customers very much, so we deliver only high-quality products. We always carry out a careful selection of the best products, we conduct constant quality checks in independent accredited laboratories.',
    de: 'Wir legen großen Wert auf unsere Kunden und liefern daher nur qualitativ hochwertige Produkte. Wir führen stets eine sorgfältige Auswahl der besten Produkte durch und führen ständige Qualitätskontrollen in unabhängigen akkreditierten Laboren durch.',
    pl: 'Bardzo cenimy naszych klientów, dlatego dostarczamy wyłącznie produkty wysokiej jakości. Zawsze przeprowadzamy staranną selekcję najlepszych produktów, prowadzimy stałą kontrolę jakości w niezależnych, akredytowanych laboratoriach.',
  },
  'about_page-body5': {
    ua: 'ТОВ «КОЛЯР» є дійсним членом Торгово-Промислової палати України.',
    en: '"KOLYAR" LLC is a valid member of the Chamber of Commerce and Industry of Ukraine.',
    de: '"KOLYAR" LLC ist ein gültiges Mitglied der Handels- und Industriekammer der Ukraine.',
    pl: '"KOLYAR" LLC jest ważnym członkiem Izby Przemysłowo-Handlowej Ukrainy.',
  },
  'about_page-body6': {
    ua: 'НАША МЕТА: Бути однією з найкращих українських компаній-експортерів, яка постачає сільськогосподарську продукцію високої якості, за конкурентними цінами, чітко ',
    en: 'OUR GOAL: To be one of the best Ukrainian exporting companies, which supplies high-quality agricultural products at competitive prices, will strictly adhere to the terms of the concluded contracts.',
    de: 'UNSER ZIEL: Eines der besten ukrainischen Exportunternehmen zu sein, das qualitativ hochwertige Agrarprodukte zu wettbewerbsfähigen Preisen liefert, wird sich strikt an die Bedingungen der abgeschlossenen Verträge halten.',
    pl: 'NASZ CEL: Być jedną z najlepszych ukraińskich firm eksportowych, dostarczającą wysokiej jakości produkty rolne po konkurencyjnych cenach, będzie ściśle przestrzegać warunków zawartych kontraktów.',
  },
  'about_page-body7': {
    ua: 'НАША КОМАНДА: Колектив нашої компанії – це висококваліфіковані фахівці у сферах торгівлі сільськогосподарською продукцією, міжнародній торгівлі, логістиці, які постійно вивчають та досліджують ринок, мають багаторічний досвід практичної успішної діяльності. Наша команда завжди знайде оптимальне взаємовигідне рішення для максимального задоволення потреб та вимог наших партнерів по бізнесу. Наше кредо – чесність, порядність та прозорість в усьому, що ми робимо.',
    en: 'OUR TEAM: The staff of our company are highly qualified specialists in the fields of trade in agricultural products, international trade, and logistics, who are constantly studying and researching the market, and have many years of practical and successful experience. Our team will always find the optimal mutually beneficial solution to maximally satisfy the needs and requirements of our business partners. Our credo is honesty, integrity and transparency in everything we do.',
    de: 'UNSER TEAM: Die Mitarbeiter unseres Unternehmens sind hochqualifizierte Spezialisten in den Bereichen Handel mit landwirtschaftlichen Produkten, internationaler Handel und Logistik, die den Markt ständig studieren und erforschen und über langjährige praktische und erfolgreiche Erfahrung verfügen. Unser Team wird immer die optimale, für beide Seiten vorteilhafte Lösung finden, um die Bedürfnisse und Anforderungen unserer Geschäftspartner maximal zu erfüllen. Unser Credo ist Ehrlichkeit, Integrität und Transparenz in allem, was wir tun.',
    pl: 'NASZ ZESPÓŁ: Kadra naszej firmy to wysoko wykwalifikowani specjaliści z zakresu handlu produktami rolnymi, handlu międzynarodowego i logistyki, którzy stale studiują i badają rynek oraz posiadają wieloletnie praktyczne i pełne sukcesów doświadczenie. Nasz zespół zawsze znajdzie optymalne, wzajemnie korzystne rozwiązanie, aby maksymalnie zaspokoić potrzeby i wymagania naszych partnerów biznesowych. Naszym credo jest uczciwość, uczciwość i przejrzystość we wszystkim, co robimy.',
  },
  'about_page-body8': {
    ua: 'ІНТЕРЕСИ: ТОВ «КОЛЯР» зацікавлене в налагодженні плідної співпраці з новими та подальшому розвитку співпраці з нашими постійними бізнес-партнерами в Україні, які займаються виробництвом, переробкою, зберіганням, транспортуванням аграрної та промислової продукції. Ми, також, зацікавлені у розвитку взаємовигідних стосунків з нашими постійними та потенційними клієнтами закордоном, які мають інтерес у закупівлях української сільськогосподарської, продовольчої та промислової продукції. Наша компанія є відкритою для обговорення та зацікавлена у втіленні нових перспективних інвестиційних проектів.',
    en: 'INTERESTS: "KOLYAR" LLC is interested in establishing fruitful cooperation with new and further development of cooperation with our permanent business partners in Ukraine, who are engaged in production, processing, storage, transportation of agricultural and industrial products. We are also interested in developing mutually beneficial relations with our regular and potential customers abroad who are interested in purchasing Ukrainian agricultural, food and industrial products. Our company is open to discussion and is interested in implementing new promising investment projects.',
    de: 'INTERESSEN: „KOLYAR“ LLC ist daran interessiert, eine fruchtbare Zusammenarbeit mit unseren ständigen Geschäftspartnern in der Ukraine aufzubauen, die sich mit der Produktion, Verarbeitung, Lagerung und dem Transport landwirtschaftlicher und industrieller Produkte befassen. Wir sind auch daran interessiert, für beide Seiten vorteilhafte Beziehungen zu unseren Stammkunden und potenziellen Kunden im Ausland aufzubauen, die am Kauf ukrainischer Agrar-, Lebensmittel- und Industrieprodukte interessiert sind. Unser Unternehmen ist offen für Diskussionen und an der Umsetzung neuer vielversprechender Investitionsprojekte interessiert.',
    pl: 'ZAINTERESOWANIA: "KOLYAR" LLC jest zainteresowana nawiązaniem owocnej współpracy w postaci nowego i dalszego rozwoju współpracy z naszymi stałymi partnerami biznesowymi na Ukrainie, zajmującymi się produkcją, przetwarzaniem, magazynowaniem, transportem produktów rolnych i przemysłowych. Jesteśmy również zainteresowani rozwojem wzajemnie korzystnych relacji z naszymi stałymi i potencjalnymi klientami za granicą, którzy są zainteresowani zakupem ukraińskich produktów rolnych, spożywczych i przemysłowych. Nasza firma jest otwarta na dyskusję i zainteresowana realizacją nowych perspektywicznych projektów inwestycyjnych.',
  },
  'home_page-footer1': {
    ua: 'Наші соцмережі',
    en: 'Our socials',
    de: 'Unsere sozialen Netzwerke',
    pl: 'Nasze sieci społecznościowe',
  },
  'home_page-footer2': {
    ua: '© 2024 ТОВ "КОЛЯР"',
    en: '© 2024 "KOLYAR" LLC',
    de: '© 2024 "KOLYAR" LLC',
    pl: '© 2024 "KOLYAR" LLC',
  },
};

const oliyniTexts = {
  'home_page-title': {
    ua: 'ТОВ "Коляр" - Олійні, спеції',
    en: '"Kolyar" LLC - Oilseeds, spices',
    de: '"Kolyar" LLC - Ölsaaten und Gewürze',
    pl: '"Kolyar" LLC - Rośliny oleiste i pzyprawy',
  },
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Startseite',
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
  'home_page-production1': {
    ua: 'Олійні, спеції',
    en: 'Oilseeds, spices',
    de: 'Ölsaaten und Gewürze',
    pl: 'Rośliny oleiste i pzyprawy',
  },
  'home_page-item1': {
    ua: 'Ріпак',
    en: 'Rapeseed "00" (Non-GMO)',
    de: 'Rapssaat "00" (ohne GVO)',
    pl: 'Rzepak',
  },
  'home_page-item2': {
    ua: 'Гірчиця біла',
    en: 'Mustard seeds (Sinapis Alba)',
    de: 'Senfsaat (Sinapis Alba)',
    pl: 'Gorczyca biała',
  },
  'home_page-item3': {
    ua: 'Гірчиця жовта (сарептська)',
    en: 'Mustard seeds (Brassica juncea)',
    de: 'Senfsaat (Brassica juncea - Sarepta)',
    pl: 'Gorczyca żółta Sarepska',
  },
  'home_page-item4': {
    ua: 'Гірчиця чорна (сиза)',
    en: 'Mustard seeds (Brassica nigra)',
    de: 'Senfsaat (Brassica nigra)',
    pl: 'Gorczyca czarna',
  },
  'home_page-item5': {
    ua: 'Коріандр золотистий',
    en: 'Coriander',
    de: 'Korianderfrüchte ganz',
    pl: 'Kolendra złota',
  },
  'home_page-item6': {
    ua: 'Коріандр коричневий',
    en: 'Brown coriander',
    de: 'Korianderfrüchte ganz, braun',
    pl: 'Kolendra brązowa',
  },
  'home_page-item7': {
    ua: 'Коріандр-половинки',
    en: 'Coriander halves',
    de: 'Korianderfrüchte split',
    pl: 'Kolendra połówki',
  },
  'home_page-item8': {
    ua: 'Соняшник олійний',
    en: 'Sunflower seeds',
    de: 'Sonnenblumensaat schwarz',
    pl: 'Słonecznik',
  },
  'home_page-item9': {
    ua: 'Соняшник кондитерський',
    en: 'Confectionery sunflower',
    de: 'Süßwaren-Sonnenblumesaat',
    pl: 'Słonecznik cukierniczy',
  },
  'home_page-item10': {
    ua: 'Соняшник смугастий сорту Iperi',
    en: 'Striped sunflower',
    de: 'Sonnenblumensaat gestreift',
    pl: 'Słonecznik pasiasty odmiany Iperi',
  },
  'home_page-item11': {
    ua: 'Льон олійний',
    en: 'Linseed / Flax seed',
    de: 'Leinsaat (ohne GVO)',
    pl: 'Siemię lniane',
  },
  'home_page-item12': {
    ua: 'Льон - довгунець',
    en: 'Flax seed oblong',
    de: 'Leinsaat länglich',
    pl: 'Siemię lniane, podłużne',
  },
  'home_page-item13': {
    ua: 'Насіння конопель',
    en: 'Hemp seeds',
    de: 'Hanfsamen',
    pl: 'Konopie',
  },
  'home_page-item14': {
    ua: 'Амарант',
    en: 'Amaranth',
    de: 'Amarant',
    pl: 'Amarantus',
  },
  'home_page-footer1': {
    ua: 'Наші соцмережі',
    en: 'Our socials',
    de: 'Unsere sozialen Netzwerke',
    pl: 'Nasze sieci społecznościowe',
  },
  'home_page-footer2': {
    ua: '© 2024 ТОВ "КОЛЯР"',
    en: '© 2024 "KOLYAR" LLC',
    de: '© 2024 "KOLYAR" LLC',
    pl: '© 2024 "KOLYAR" LLC',
  },
};

const boboviTexts = {
  'home_page-title': {
    ua: 'ТОВ "Коляр" - Бобові',
    en: '"Kolyar" LLC - Legumes',
    de: '"Kolyar" LLC - Hülsenfrüchte',
    pl: '"Kolyar" LLC - Rośliny strączkowe',
  },
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Startseite',
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
  'home_page-production1': {
    ua: 'Бобові',
    en: 'Legumes',
    de: 'Hülsenfrüchte',
    pl: 'Rośliny strączkowe',
  },
  'home_page-item1': {
    ua: 'Горох зелений',
    en: 'Green pea',
    de: 'Erbsen',
    pl: 'Groch zielony',
  },
  'home_page-item2': {
    ua: 'Горох жовтий',
    en: 'Yellow pea',
    de: 'Gelbe Erbse',
    pl: 'Groch żółty',
  },
  'home_page-item3': {
    ua: 'Горох жовтий шліфований (половинки)',
    en: 'Ground yellow peas (halves)',
    de: 'Gemahlene gelbe Erbsen (Hälften)',
    pl: 'Groch żółty połówki',
  },
  'home_page-item4': {
    ua: 'Боби кінські світло-коричневі',
    en: 'Light brown beans',
    de: 'Bohnen',
    pl: 'Bobik',
  },
  'home_page-item5': {
    ua: 'Боби кінські темно-коричневі',
    en: 'Dark brown beans',
    de: 'Dunkelbraun bohnen',
    pl: 'Kolendra złota',
  },
  'home_page-item6': {
    ua: 'Соя',
    en: 'Soy beans',
    de: 'Sojabohnen',
    pl: 'Soja',
  },
  'home_page-item7': {
    ua: 'Нут',
    en: 'Chickpeas',
    de: 'Kichererbsen',
    pl: 'Ciecierzyca',
  },
  'home_page-item8': {
    ua: 'Сочевиця',
    en: 'Lentil',
    de: 'Linse',
    pl: 'Soczewica',
  },
  'home_page-footer1': {
    ua: 'Наші соцмережі',
    en: 'Our socials',
    de: 'Unsere sozialen Netzwerke',
    pl: 'Nasze sieci społecznościowe',
  },
  'home_page-footer2': {
    ua: '© 2024 ТОВ "КОЛЯР"',
    en: '© 2024 "KOLYAR" LLC',
    de: '© 2024 "KOLYAR" LLC',
    pl: '© 2024 "KOLYAR" LLC',
  },
};

const nasinnyaTexts = {
  'home_page-title': {
    ua: 'ТОВ "Коляр" - Насіння для корму птахів',
    en: '"Kolyar" LLC - Bird seed',
    de: '"Kolyar" LLC - Samen für Vogelfutter',
    pl: '"Kolyar" LLC - Nasiona dla ptaków',
  },
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Startseite',
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

  'home_page-production1': {
    ua: 'Насіння для корму птахів',
    en: 'Bird seed',
    de: 'Samen für Vogelfutter',
    pl: 'Nasiona dla ptaków',
  },
  'home_page-item1': {
    ua: 'Вика озима мохната',
    en: 'Vetch seeds',
    de: 'Wicke',
    pl: 'Wyka ozima',
  },
  'home_page-item2': {
    ua: 'Вика озима панонська',
    en: 'Pannonian vetch seeds',
    de: 'Pannonische Wicke',
    pl: 'Wyka ozima',
  },
  'home_page-item3': {
    ua: 'Вика ярова світло-коричнева',
    en: 'Light brown vetch seeds',
    de: 'Hellbraun Wicke',
    pl: 'Wyka jara',
  },
  'home_page-item4': {
    ua: 'Вика ярова темно-коричнева',
    en: 'Dark brown vetch seeds',
    de: 'Dunkelbraun Wicke',
    pl: 'Wyka jara',
  },
  'home_page-item5': {
    ua: 'Польовий горох (Пелюшка)',
    en: 'Field pea "Pelushke"',
    de: 'Felderbsen (Peluschken)',
    pl: 'Peluszka',
  },
  'home_page-item6': {
    ua: 'Люпин плоский',
    en: 'Flat lupine',
    de: 'Lupine',
    pl: 'Łubin',
  },
  'home_page-item7': {
    ua: 'Люпин круглий (безкалоїдний)',
    en: 'Round lupine',
    de: 'Lupine',
    pl: 'Łubin',
  },
  'home_page-item8': {
    ua: 'Канаркове просо',
    en: 'Canary seeds',
    de: 'Kanariensaat',
    pl: 'Kanar',
  },
  'home_page-item9': {
    ua: 'Сорго біле',
    en: 'White sorghum',
    de: 'Mohrenhirse',
    pl: 'Sorgo',
  },
  'home_page-item10': {
    ua: 'Сорго червоне',
    en: 'Red sorghum',
    de: 'Mohrenhirse',
    pl: 'Sorgo',
  },
  'home_page-item11': {
    ua: 'Рижій',
    en: 'False flax seeds',
    de: 'Leindottersamen',
    pl: 'Lnianka siewna',
  },
  'home_page-item12': {
    ua: 'Сафлор',
    en: 'Safflower seeds (Cardy)',
    de: 'Kardisaat ganz',
    pl: 'Kardi',
  },
  'home_page-item13': {
    ua: 'Олійна редька',
    en: 'Oil radish',
    de: 'Ölrettich',
    pl: 'Rzodkiewka olejna',
  },
  'home_page-footer1': {
    ua: 'Наші соцмережі',
    en: 'Our socials',
    de: 'Unsere sozialen Netzwerke',
    pl: 'Nasze sieci społecznościowe',
  },
  'home_page-footer2': {
    ua: '© 2024 ТОВ "КОЛЯР"',
    en: '© 2024 "KOLYAR" LLC',
    de: '© 2024 "KOLYAR" LLC',
    pl: '© 2024 "KOLYAR" LLC',
  },
};

const zernoviTexts = {
  'home_page-title': {
    ua: 'ТОВ "Коляр" - Зернові',
    en: '"Kolyar" LLC - Cereals',
    de: '"Kolyar" LLC - Getreide',
    pl: '"Kolyar" LLC - Rośliny uprawne',
  },
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Startseite',
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
  'home_page-production1': {
    ua: 'Зернові',
    en: 'Cereals',
    de: 'Getreide',
    pl: 'Rośliny uprawne',
  },
  'home_page-item1': {
    ua: 'Гречка',
    en: 'Buckwheat seeds',
    de: 'Buchweizen',
    pl: 'Nasiona gryki',
  },
  'home_page-item2': {
    ua: 'Просо жовте',
    en: 'Millet',
    de: 'Hirse gelb',
    pl: 'Proso żółte',
  },
  'home_page-item3': {
    ua: 'Просо червоне',
    en: 'Millet',
    de: 'Hirse rot',
    pl: 'Czerwone proso',
  },
  'home_page-item4': {
    ua: 'Кукурудза',
    en: 'Maize',
    de: 'Mais',
    pl: 'Kukurydza',
  },
  'home_page-item5': {
    ua: 'Пшоно',
    en: 'Millet groats',
    de: 'Hirsekörne (Hirse geschält)',
    pl: 'Kasza jaglana',
  },
  'home_page-item6': {
    ua: 'Гречка (крупа)',
    en: 'Buckwheat groats',
    de: 'Buchweizengrütze',
    pl: 'Gryka',
  },
  'home_page-item7': {
    ua: 'Овес',
    en: 'Oats',
    de: 'Hafer',
    pl: 'Owies',
  },
  'home_page-item8': {
    ua: 'Овес-голозерний',
    en: 'Oats',
    de: 'Hafer',
    pl: 'Owies pełnoziarnisty',
  },
  'home_page-footer1': {
    ua: 'Наші соцмережі',
    en: 'Our socials',
    de: 'Unsere sozialen Netzwerke',
    pl: 'Nasze sieci społecznościowe',
  },
  'home_page-footer2': {
    ua: '© 2024 ТОВ "КОЛЯР"',
    en: '© 2024 "KOLYAR" LLC',
    de: '© 2024 "KOLYAR" LLC',
    pl: '© 2024 "KOLYAR" LLC',
  },
};

const contactsTexts = {
  'home_page-title': {
    ua: 'ТОВ "Коляр" - Контакти',
    en: '"Kolyar" LLC - Contacts',
    de: '"Kolyar" LLC - Kontakt',
    pl: '"Kolyar" LLC - Kontakty',
  },
  'home_page-navlink1': {
    ua: 'Головна',
    en: 'Main',
    de: 'Startseite',
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
  'home_page-body-title': {
    ua: 'ТОВ "КОЛЯР"',
    en: '"KOLYAR" LLC',
    de: '"KOLYAR" LLC',
    pl: '"KOLYAR" LLC',
  },
  'home_page-body1': {
    ua: 'вул. Гетьмана Мазепи, 40/17, м. Івано-Франківськ, 76018, Україна',
    en: 'Hetman Mazepa, 40/17, str., Ivano-Frankivsk, 76018, Ukraine',
    de: 'Hetman Mazepa, 40/17, str., Iwano-Frankiwsk, 76018, Ukraine',
    pl: 'Hetmana Mazepy, 40/17, ul., Iwano-Frankowsk, 76018, Ukraina',
  },
  'home_page-body-ceo': {
    ua: 'Загальний: +380 67 3445020',
    en: 'General: +380 67 3445020',
    de: 'Allgemein: +380 67 3445020',
    pl: 'Ogólne: +380 67 3445020',
  },
  'home_page-body-lead': {
    ua: 'Керівництво: +380 97 0788122',
    en: 'Management: +380 97 0788122',
    de: 'Leitung: +380 97 0788122',
    pl: 'Zarządzanie: +380 97 0788122',
  },
  'home_page-body-traders': {
    ua: 'Трейдери: +380 67 3447286',
    en: 'Traders: +380 67 3447286',
    de: 'Händler: +380 67 3447286',
    pl: 'Handlowcy: +380 67 3447286',
  },
  'home_page-body-finance': {
    ua: 'Фінанси і бухгалтерія:',
    en: 'Finance and accounting:',
    de: 'Finanz-und Rechnungswesen:',
    pl: 'Finanse i księgowość:',
  },
  'home_page-footer1': {
    ua: 'Наші соцмережі',
    en: 'Our socials',
    de: 'Unsere sozialen Netzwerke',
    pl: 'Nasze sieci społecznościowe',
  },
  'home_page-footer2': {
    ua: '© 2024 ТОВ "КОЛЯР"',
    en: '© 2024 "KOLYAR" LLC',
    de: '© 2024 "KOLYAR" LLC',
    pl: '© 2024 "KOLYAR" LLC',
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
