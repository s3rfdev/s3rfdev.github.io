import json

with open('salad_pipeline/galleries_export.json') as f:
    galleries = json.load(f)

with open('salad_pipeline/prompts.json') as f:
    prompts_data = json.load(f)

ru_dict = {
    'Titanium Curved Monolith Atrium': 'Атриум из монолитного изогнутого титана',
    'Biophilic Vertical Forest Tower': 'Биофильная башня с вертикальным лесом',
    'Helical Spiral Concrete Staircase': 'Винтовая бетонная спиральная лестница',
    'Parametric Waterfront Cultural Pavilion': 'Параметрический прибрежный павильон',
    'Timber Lamella Parametric Vault': 'Параметрический свод из деревянных ламелей',
    'Desert Dune Research Institute': 'Институт исследований в пустынных дюнах',
    'Geometric Facade Tessellation Macro': 'Макро геометрии и тесселяции фасада',
    'Cantilevered Glass Observation Deck': 'Консольная стеклянная смотровая площадка',
    'Curvilinear High-Tech Library Atrium': 'Криволинейный атриум хай-тек библиотеки',
    'Perforated Metal Kinetic Facade': 'Перфорированный кинетический фасад',
    'Subterranean Concrete Auditorium': 'Подземный бетонный амфитеатр',
    'Organic Glass Canopy Drop Point': 'Органический стеклянный навес терминала',
    'Monolithic Brutalist Cantilever Bridge': 'Монолитный бруталистский консольный мост',
    'Bionic Airport Check-In Hall': 'Бионический зал регистрации аэропорта',
    'Floating Lake Pavilion at Dawn': 'Плавающий озерный павильон на рассвете',
    'Curved Terrazzo Interior Ramp': 'Изогнутая рампа из светлого терраццо',
    'Futuristic Airport Terminal Spine': 'Несущая колонна футуристичного терминала',
    'Aerodynamic Rooftop Penthouse Pod': 'Аэродинамический капсульный пентхаус на крыше',

    # Cleanrooms
    'Silicon Ingot Czochralski Pulling Chamber': 'Камера вытягивания монокристалла кремния',
    'Extreme Ultraviolet (EUV) Photolithography Core': 'Ядро EUV-фотолитографического сканера',
    'Robotic Wafer Handler in Cleanroom': 'Роботизированный манипулятор кремниевых пластин',
    'Silicon Wafer with Prism Diffraction Grating': 'Кремниевая пластина с дифракционной решеткой',
    'Wafer Cassette (FOUP) in Nitrogen Purge Bay': 'Кассета FOUP в шлюзе азотной продувки',
    'Gold Wire Bonding on Microchip Package': 'Термозвуковая разварка золотых микропроводников',
    'Chemical Vapor Deposition (CVD) Plasma Chamber': 'Плазменная камера осаждения CVD',
    'High-Magnification Macro of Monolithic Microchip Die': 'Макросъемка кристалла микропроцессора',
    'Semiconductor Cleanroom Class 1 Gown Worker': 'Инженер в защитном скафандре в чистой комнате ISO 1',
    'Automated Overhead Hoist Transport (OHT)': 'Автоматизированный монорельс OHT чистой комнаты',
    'Atomic Force Microscope (AFM) Probe Tip': 'Зонд атомно-силового микроскопа (AFM)',
    'Cryogenic Quantum Chip Mount (Blank Wafer, No Engraving)': 'Криогенный держатель квантового процессора',
    'Cryogenic Quantum Chip Mount': 'Криогенный держатель квантового процессора',
    'Focused Ion Beam (FIB) Circuit Edit Stage': 'Камера фокусированного ионного пучка (FIB)',
    'Cleanroom Yellow Lithium Lighting Litho Bay': 'Зона фотолитографии с желтым актиничным светом',
    'Silicon Carbide (SiC) Power Semiconductor Wafer': 'Пластина карбида кремния (SiC)',
    'Microfluidic Lab-on-a-Chip Glass Substrate': 'Стеклянная подложка микрофлюидного чипа',
    'Cleanroom Ultrapure Water Manifold Macro': 'Коллектор сверхчистой воды чистой комнаты',
    'Laser Inspection System Scanning Silicon Wafer': 'Лазерная система дефектоскопии пластин',
    'Precision Wafer Slicing Diamond Wire Saw': 'Алмазная резка кремниевых слитков',
    'Laser Micromachining Nozzle in Action': 'Сопло лазерной микрообработки в работе',
    'Gold-Plated RF Shielded Enclosure Grid': 'Позолоченный экранирующий ВЧ-кожух',

    # Luxury Macro
    'Liquid Mercury Droplets on Polished Slate': 'Капли жидкой ртути на полированном сланце',
    'Holographic Dichroic Glass Reflection': 'Отражения в дихроичном голографическом стекле',
    'Matte White Architectural Corian Curve': 'Изогнутая поверхность из матового белого кориана',
    'Raw Sawn Travertine Stone Pores': 'Текстура пор пиленого римского травертина',
    'Liquid Chrome Splash Freezing in Air': 'Всплеск жидкого хрома в невесомости',
    'Brushed Champagne Titanium Texture': 'Брашированный титан оттенка шампань',
    'Pure Solid Brass Polished Cylinder Macro': 'Макро полированного цилиндра из чистой латуни',
    'Fine White Ceramic Porcelain Glaze Crazing': 'Кракелюр на глазури тонкого белого фарфора',
    'Architectural Frosted Acrylic Glass Edge': 'Срез матового архитектурного акрила',
    'Raw Cast Concrete Texture with Air Pockets': 'Текстура необработанного бетона с кавернами',
    'Calacatta Gold Italian Marble Veining': 'Золотистые прожилки итальянского мрамора Calacatta',
    'Matte Anodized Space Gray Aluminum Bevel': 'Фаска матового анодированного алюминия Space Gray',
    'Deep Obsidian Volcanic Glass Fracture': 'Раковистый излом вулканического обсидиана',
    'Ultra-Fine Pleated White Mulberry Silk': 'Плиссированный натуральный шелк тутового шелкопряда',
    'Cast Smoked Glass Monolith Edge': 'Грань монолита из дымчатого литого стекла',
    'Textured Black Basalt Stone Surface': 'Фактурная поверхность черного базальта',
    'Fine Perforated Acoustic Titanium Sheet': 'Перфорированный лист акустического титана',
    'Seamless Honeycomb Composite Macro': 'Макро сотовой композитной панели',
    'Satin Rose Gold Mirror Metal Macro': 'Сатинированное розовое золото с отражением',
    'Architectural Bronze Patina Macro': 'Макросъемка патинированной архитектурной бронзы',
    'Precision Diamond-Knurled Steel Grip': 'Прецизионная алмазная накатка на стали',

    # Clean Tech Energy
    'Solitary Offshore Wind Turbine in Deep Ocean': 'Одиночный морской ветрогенератор в океане',
    'Desert Utility-Scale Solar Array at Blue Hour': 'Солнечная электростанция в пустыне в синий час',
    'Geothermal Power Manifolds in Iceland Mist': 'Геотермальный коллектор в тумане Исландии',
    'Tokamak Fusion Reactor Interior Core': 'Внутренняя вакуумная камера реактора Токамак',
    'Wind Turbine Nacelle Maintenance Platform': 'Сервисная площадка гондолы ветрогенератора',
    'Concentrated Solar Power Tower Molten Salt Receiver': 'Башня гелиоконцентратора с расплавом солей',
    'High-Voltage Direct Current (HVDC) Converter Hall': 'Зал преобразователей постоянного тока HVDC',
    'Green Hydrogen Electrolyzer Stack Array (Clean, No Text)': 'Батарея промышленных водородных электролизеров',
    'Green Hydrogen Electrolyzer Stack Array': 'Батарея промышленных водородных электролизеров',
    'Smart Grid Transformer Bushing Insulators': 'Высоковольтные проходные изоляторы подстанции',
    'Superconducting Maglev Guideway Track': 'Сверхпроводящая магистраль поезда на магнитной подушке',
    'Subsea Power Cable Installation Vessel': 'Судно-кабелеукладчик подводных силовых линий',
    'Automated Battery Pack Giga-Factory Line': 'Автоматизированная гигафабрика аккумуляторных батарей',
    'Wave Energy Converter Buoy in Ocean': 'Волновой энергетический генератор в океане',
    'Cryogenic Liquid Hydrogen Storage Tank Sphere': 'Сферический резервуар жидкого водорода',
    'Solar Canopy EV Mega-Charging Hub': 'Мега-хаб зарядки электромобилей с солнечным навесом',
    'Aerodynamic Wind Turbine Blade Hub Macro': 'Аэродинамическая ступица лопасти ветрогенератора',

    # Podiums
    'Rough Chiseled Black Slate Podium in Sunbeam': 'Подиум из колотого черного сланца в луче света',
    'Honed Travertine Cylinder in Warm Studio Light': 'Цилиндр из шлифованного травертина в студийном свете',
    'Frosted Acrylic Glass Plinth in Water Ripple Pool': 'Плинт из матового акрила в бассейне с рябью',
    'Dark Basalt Monolith with Copper Foil Micro-Line': 'Базальтовый монолит с тонкой медной линией',
    'Sculptural White Cast Concrete Stepped Dais': 'Ступенчатый подиум из скульптурного бетона',
    'Polished Green Guatemala Marble Disc Podium': 'Дисковый подиум из зеленого мрамора Гватемала',
    'Raw Sawn Oak Timber Block with Linen Fabric': 'Блок пиленого дуба с льняной тканью',
    'Floating Frosted Disc with Botanical Shadows': 'Парящий матовый диск с растительными тенями',
    'Brushed Titanium Wedge Plinth on Slate': 'Клиновидный титановый постамент на сланце',
    'Honed Calacatta Gold Marble Pillar in Studio': 'Колонна из мрамора Calacatta Gold в студии',
    'Textured Terracotta Clay Geometric Dais': 'Геометрический подиум из фактурной терракоты',
    'Mirror Water Pool with Floating Slate Slab': 'Зеркальный бассейн с плавающей плитой сланца',
    'Matte Black Ceramic Pedestal in Cyan Rim Light': 'Черный керамический пьедестал с неоновым контуром',
    'Curved Glass Wave Platform on Sand': 'Волнообразная платформа из гнутого стекла',
    'Brushed Brass Cylinder on White Travertine': 'Латунный цилиндр на белом травертине',
    'Smoky Quartz Transparent Crystal Base': 'Прозрачное основание из дымчатого кварца',
    'Honed Fossil Limestone Stepped Stage': 'Ступенчатая сцена из ископаемого известняка',
    'Solid Dark Walnut Wood Block on Silk': 'Блок массива темного ореха на шелке',
    'Perforated Architectural Metal Mesh Riser': 'Подставка из перфорированной архитектурной сетки',

    # UFOs
    'Liquid Mercury Teardrop Saucer Over Icelandic Black Beach': 'Каплевидный диск из жидкой ртути над черным пляжем',
    'Matte White Ceramic Oval Craft Over Desert Salt Flat': 'Матовый белый керамический аппарат над солончаком',
    'Mirror Titanium Toroidal Ring Hovering in Mountain Mist': 'Зеркальное титановое кольцо в горном тумане',
    'Polished Obsidian Disk Skimming Glassy Lake': 'Диск из полированного обсидиана над гладким озером',
    'Organic Bionic Aerodynamic Saucer in Rain Storm': 'Органическая бионическая тарелка в дождевом шторме',
    'Macro Detail of Seamless Liquid Metal Hull': 'Макросъемка бесшовного корпуса из жидкого металла',
    'Dual Streamlined Disks in Formation Over Red Dunes': 'Два обтекаемых диска в строю над красными дюнами',
    'Dark Matte Carbon Aerodynamic Triangle Over Foggy Forest': 'Треугольный карбоновый аппарат над туманным лесом',
    'Polished Silver Saucer Above Arctic Sea Ice': 'Серебряный обтекаемый диск над арктическими льдами',
    'Iridescent Bismuth Hull Saucer in Sunset Clouds': 'Тарелка с радужным корпусом из висмута в облаках',
    'Subtle Gravitational Lens Distortion Below Hovering Disk': 'Гравитационное линзирование под зависшим диском',
    'Matte Dark Ceramic Saucer at Rest in Pine Clearing': 'Темный керамический диск на поляне в хвойном лесу',
    'Super-Reflective Chrome Ellipsoid Rising from Sea': 'Зеркальный хромированный эллипсоид, взлетающий из моря',
    'Aerodynamic Saucer Entering Low Cumulus Cloud': 'Аэродинамическая тарелка, входящая в кучевое облако',
    'Minimalist Teardrop Craft Hovering Over Salt Lake': 'Минималистичный каплевидный аппарат над соляным озером',
    'High-Speed Trans-Medium Saucer Vapor Cone': 'Конус Маха вокруг аппарата на транс-средовом переходе',
    'Macro Leading Edge Gravitational Distortion': 'Макро передней кромки и искривление пространства',
    'Streamlined Chrome Disk Resting at Edge of Desert Dune': 'Хромированный обтекаемый диск на гребне пустынной дюны'
}

theme_meta = [
    {
        'id': 'photo-bionic-architecture',
        'export_key': 'bionic-architecture',
        'title_en': 'Bionic & Parametric Architecture',
        'title_ru': 'Бионическая и параметрическая архитектура',
        'summary_en': 'Futuristic organic pavilions, double-curved titanium atriums, biophilic concrete towers, and monumental glass volumes. RenderMind commercial 4K stock series.',
        'summary_ru': 'Футуристичные органические павильоны, криволинейные титановые атриумы, биофильные башни и монументальные стеклянные объемы. Коммерческая 4K серия RenderMind.'
    },
    {
        'id': 'photo-silicon-cleanrooms',
        'export_key': 'silicon-cleanrooms',
        'title_en': 'Silicon Cleanrooms & Quantum Chips',
        'title_ru': 'Чистые комнаты и квантовые процессоры',
        'summary_en': 'Semiconductor fabrication ISO-1 cleanrooms, EUV photolithography scanners, wafer steppers, and cryogenic quantum mounts. RenderMind commercial 4K stock series.',
        'summary_ru': 'Полупроводниковое производство ISO-1, EUV-фотолитография, кремниевые пластины и криогенные квантовые чипы. Коммерческая 4K серия RenderMind.'
    },
    {
        'id': 'photo-luxury-macro-materials',
        'export_key': 'luxury-macro-materials',
        'title_en': 'Luxury Macro Materials & Textures',
        'title_ru': 'Премиальные макро-материалы и текстуры',
        'summary_en': 'High-end architectural and industrial surfaces: liquid mercury, dichroic holographic glass, honed travertine, and raw metals. RenderMind commercial 4K stock series.',
        'summary_ru': 'Высокотехнологичные и природные материалы: капли ртути, дихроичное голографическое стекло, шлифованный травертин и металлы. Коммерческая 4K серия RenderMind.'
    },
    {
        'id': 'photo-clean-tech-energy',
        'export_key': 'clean-tech-energy',
        'title_en': 'Clean Tech & Renewable Energy',
        'title_ru': 'Зеленая энергетика и чистые технологии',
        'summary_en': 'Deep-ocean offshore wind turbines, desert utility solar arrays, Tokamak fusion cores, BESS battery farms, and green hydrogen. RenderMind commercial 4K stock series.',
        'summary_ru': 'Глубоководные ветропарки, пустынные солнечные поля, реакторы Токамак, контейнерные хранилища BESS и зеленый водород. Коммерческая 4K серия RenderMind.'
    },
    {
        'id': 'photo-commercial-podiums',
        'export_key': 'commercial-product-podiums',
        'title_en': 'Minimalist Product Podiums',
        'title_ru': 'Коммерческие подиумы для продуктов',
        'summary_en': 'Editorial display stages for luxury cosmetics, perfume, and hardware: chiseled black slate, Calacatta marble, and frosted acrylic. RenderMind commercial 4K stock series.',
        'summary_ru': 'Студийные подиумы для люксовой косметики, парфюма и гаджетов: черный сланец, мрамор Calacatta, матовый акрил и бетон. Коммерческая 4K серия RenderMind.'
    },
    {
        'id': 'photo-streamlined-ufos',
        'export_key': 'streamlined-ufos',
        'title_en': 'Aerodynamic Streamlined UFOs',
        'title_ru': 'Обтекаемые хромированные НЛО',
        'summary_en': 'Seamless mirror-chrome and ceramic extraterrestrial craft skimming oceans, deserts, and mountain peaks. RenderMind commercial 4K stock series.',
        'summary_ru': 'Бесшовные обтекаемые летательные аппараты из жидкой ртути, хрома и темной керамики над океанами, пустынями и вершинами. Коммерческая 4K серия RenderMind.'
    }
]

out_lines = []
out_lines.append('export const galleries: Gallery[] = [')

for t in theme_meta:
    shots = galleries.get(t['export_key'], [])
    out_lines.append('  {')
    out_lines.append(f"    id: '{t['id']}',")
    out_lines.append("    kind: 'photo',")
    out_lines.append(f"    title: t('{t['title_en']}', '{t['title_ru']}'),")
    out_lines.append("    summary: t(")
    out_lines.append(f"      '{t['summary_en']}',")
    out_lines.append(f"      '{t['summary_ru']}',")
    out_lines.append("    ),")
    out_lines.append(f"    meta: '{len(shots)} files · 4K UHD',")
    out_lines.append("    resolution: '3840×2160 (4K UHD)',")
    out_lines.append("    formats: '4K PNG (Master) · WebP Preview',")
    out_lines.append("    link: '',")
    out_lines.append("    items: [")
    for s in shots:
        en_title = s['title'].replace("'", "\\'")
        ru_title = ru_dict.get(s['title'], s['title']).replace("'", "\\'")
        src_path = s['src']
        out_lines.append('      {')
        out_lines.append(f"        src: '{src_path}',")
        out_lines.append(f"        title: t('{en_title}', '{ru_title}'),")
        out_lines.append('      },')
    out_lines.append('    ],')
    out_lines.append('  },')

with open('salad_pipeline/galleries_ts_chunk.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))

print(f"Generated {len(theme_meta)} galleries code!")
