/* The words. Populations: 2021 Census (rounded). Areas are computed from the ONS boundaries. */
window.CONTENT = (() => {

const B = [
{
  code: 'E09000001', slug: 'city', name: 'City of London', label: ['City of', 'London'], abbr: 'CITY', ring: 'The Core',
  pop: 8600, formed: 'Not a borough at all: a city and county with a charter older than Parliament',
  tagline: 'The Square Mile, where it all began.',
  etym: {word: 'Londinium', gloss: 'meaning unknown', note: 'The Romans borrowed an older name. What it meant, nobody knows: guesses run from a Celtic personal name to a word for a river too wide to ford.'},
  motto: {text: 'Domine dirige nos', tr: 'Lord, direct us'},
  story: [
    'Around AD 47 Roman engineers found the spot they were looking for: a place where the Thames was narrow enough to bridge, with two low gravel hills on the north bank to build on. Those hills are Cornhill and Ludgate Hill. Barely fifteen years later Boudica’s army burned the new town to the ground. It was rebuilt, walled, and has been trading more or less ever since.',
    'The City got through the Normans, the Plague and the Great Fire of 1666 mostly by negotiating. It still elects a Lord Mayor, an office that goes back to 1189, and still has its own police force. On state occasions the Lord Mayor meets the monarch at Temple Bar and offers the City’s Pearl Sword. It’s a show of loyalty. It is not, whatever the legend says, the King asking permission to come in.'
  ],
  facts: [
    'Fewer than 9,000 people live here, but more than half a million come in to work every weekday.',
    'Every year the City pays the Crown a rent of six horseshoes, sixty-one nails, a billhook and a hatchet. The Quit Rents ceremony has been held since the 13th century.',
    'The Great Fire destroyed about 13,200 houses and 87 parish churches. Christopher Wren rebuilt 51 of the churches, and St Paul’s as well.'
  ]
},
{
  code: 'E09000030', slug: 'tower-hamlets', name: 'Tower Hamlets', label: ['Tower', 'Hamlets'], abbr: 'TWH', ring: 'Inner London',
  pop: 310300, formed: 'Formed in 1965 from Bethnal Green, Poplar and Stepney',
  tagline: 'A fortress, the docks, and a street that has taken in everyone.',
  etym: {word: 'The Tower Hamlets', gloss: 'the villages that guarded the Tower', note: 'The villages east of the City had a duty to supply men for the garrison of the Tower of London. That feudal obligation gave the borough its name.'},
  motto: {text: 'From great things to greater', tr: ''},
  story: [
    'William the Conqueror started building the White Tower in the 1070s to impress, and intimidate, the city he had just taken. The Tower of London is actually in this borough, not the City. For centuries the villages downstream (Stepney, Wapping, Limehouse, Poplar) lived off the river: sailors, rope-makers, shipbuilders.',
    'In 1802 the West India Docks opened, the first of the great enclosed docks. For more than a century this was the busiest port in the world, so it was the Luftwaffe’s first target when the Blitz began on 7 September 1940. The docks closed in the 1960s and 70s. Canary Wharf’s towers went up on their derelict quays from the late 1980s.'
  ],
  facts: [
    'Brick Lane’s mosque was built in 1743 as a chapel for French Huguenots. It became a synagogue in 1898 and a mosque in 1976: three faiths and three waves of newcomers in one building. The sundial on it reads <i>Umbra sumus</i>, “we are shadows”.',
    'Canary Wharf is named after a 1930s warehouse that stored fruit shipped in from the Canary Islands.',
    'In the 2021 Census this was the most densely populated local authority in England and Wales, at nearly 16,000 people per square kilometre.'
  ]
},
{
  code: 'E09000012', slug: 'hackney', name: 'Hackney', label: ['Hackney'], abbr: 'HCK', ring: 'Inner London',
  pop: 259200, formed: 'Formed in 1965 from Hackney, Shoreditch and Stoke Newington',
  tagline: 'London’s first theatreland, and its most reinvented streets.',
  etym: {word: 'Hacan-ieg', gloss: 'Haca’s island', note: 'Ieg means island: here, a patch of dry ground in the marshes of the River Lea, owned by a Saxon called Haca.'},
  motto: {text: 'Justitia turris nostra', tr: 'Justice is our tower'},
  story: [
    'Before Bankside, Shoreditch was where London went to the theatre. In 1576 James Burbage built The Theatre just outside the City’s jurisdiction, where the authorities couldn’t shut it down. The Curtain opened nearby a year later, and a young Shakespeare acted and staged plays at both.',
    'In the winter of 1598, after a row with their landlord, Burbage’s sons and their company took The Theatre apart, carried the timbers across the Thames and used them to build a new playhouse called the Globe. Hackney then settled into four centuries as Tudor country retreat, Victorian suburb, poor East End neighbour and, most recently, one of the most reinvented postcodes in Europe.'
  ],
  facts: [
    'Sutton House, built in 1535 for Henry VIII’s courtier Ralph Sadleir, is the oldest house in Hackney.',
    'The “hackney carriage”, the official term for a London cab, might come from horses once pastured here. It might also come from the Old French <i>haquenée</i>, an ambling horse. Nobody is sure.',
    'Stoke Newington gave a schoolboy Edgar Allan Poe his lessons (1817–20). Daniel Defoe was living there when he wrote <i>Robinson Crusoe</i>.'
  ]
},
{
  code: 'E09000019', slug: 'islington', name: 'Islington', label: ['Islington'], abbr: 'ISL', ring: 'Inner London',
  pop: 216600, formed: 'Formed in 1965 from Islington and Finsbury',
  tagline: 'Dairies, spas, a man-made river and the Arsenal.',
  etym: {word: 'Gislandune', gloss: 'Gisla’s hill', note: 'The -ton isn’t a farm here. It started as <i>dūn</i>, a hill. Upper Street runs along the ridge.'},
  motto: {text: 'We serve', tr: ''},
  story: [
    'For centuries “Merry Islington” was London’s dairy and playground, with cow pastures, spa wells, tea gardens and taverns just beyond the City walls. In 1683 Richard Sadler found a medicinal spring in his garden and built a music house next to it. There has been a Sadler’s Wells theatre on the site ever since.',
    'In 1613 Hugh Myddelton finished the New River, an artificial channel that brought clean spring water about forty miles from Hertfordshire to a reservoir at New River Head in Clerkenwell. It was one of the great engineering feats of Stuart England, and part of it still supplies London’s water.'
  ],
  facts: [
    'Arsenal began in 1886 as a works team at the Royal Arsenal in Woolwich, south-east London, and moved to Highbury in 1913. That’s why north London’s biggest club is named after a south London factory.',
    'The Angel on the Monopoly board is named after a coaching inn, a regular stop for travellers on the Great North Road.',
    'George Orwell lived at 27b Canonbury Square in the mid-1940s, when <i>Animal Farm</i> made him famous.'
  ]
},
{
  code: 'E09000007', slug: 'camden', name: 'Camden', label: ['Camden'], abbr: 'CMD', ring: 'Inner London',
  pop: 210100, formed: 'Formed in 1965 from Hampstead, Holborn and St Pancras',
  tagline: 'The heath, the Museum, and three stations in a row.',
  etym: {word: 'Camden Place', gloss: 'a house in Kent', note: 'Charles Pratt took the title Earl Camden from his house in Chislehurst, and Camden Town was built on his land from 1791. The house itself was named after the Elizabethan antiquary William Camden.'},
  motto: {text: 'Non sibi sed toti', tr: 'Not for oneself, but for all'},
  story: [
    'Camden runs from lawyers’ Holborn and scholars’ Bloomsbury up to the hilltop villages of Hampstead and Highgate. The British Museum was founded here in 1753, free to “all studious and curious persons”. Karl Marx spent years in its Reading Room working on <i>Das Kapital</i>, and he is buried just up the road in Highgate Cemetery.',
    'The Victorians then lined up three great railway termini along one road: Euston (1837), King’s Cross (1852) and St Pancras (1868). St Pancras, a red-brick Gothic fantasy, came close to being demolished in the 1960s. John Betjeman helped save it, and today it is the terminus for Eurostar trains to Paris and Brussels.'
  ],
  facts: [
    'John Keats wrote “Ode to a Nightingale” under a plum tree in a Hampstead garden in 1819.',
    'The view of St Paul’s from Parliament Hill is protected: planners won’t allow anything to be built that blocks it.',
    'Camden Market began in 1974 as a small weekend crafts market beside the canal lock.'
  ]
},
{
  code: 'E09000033', slug: 'westminster', name: 'Westminster', label: ['Westminster'], abbr: 'WSM', ring: 'Inner London',
  pop: 204300, formed: 'Formed in 1965 from Westminster, Paddington and St Marylebone',
  tagline: 'Crown, Parliament, and the West End.',
  etym: {word: 'West mynster', gloss: 'the minster to the west', note: 'The abbey church to the west of the City. The borough is one of only two cities inside London.'},
  motto: {text: 'Custodi civitatem Domine', tr: 'Keep the city, O Lord'},
  story: [
    'Edward the Confessor rebuilt an abbey on Thorney Island, a gravelly islet in the Thames marshes, and moved his palace next to it. The abbey was consecrated in December 1065, a few days before he died. William the Conqueror was crowned there on Christmas Day 1066, and almost every English and British monarch since has been crowned in the same building.',
    'That split London in two: the City kept the money, and Westminster had the Crown and later Parliament, with the Strand running between them along the riverbank. Westminster Hall (1097) survived the fire that destroyed most of the old palace in 1834. The Houses of Parliament that replaced it, Barry and Pugin’s Gothic building, are Victorian.'
  ],
  facts: [
    '“Soho” is thought to come from an old hunting cry, “So-ho!”, from the days when these fields were hunting grounds.',
    'Big Ben is the bell, not the tower. It cracked in 1859, soon after it was installed, and it has rung with the crack ever since, which is why its note sounds slightly off.',
    'Trafalgar Square’s Fourth Plinth was built for an equestrian statue of William IV that was never made because the money ran out. It stood empty for about 150 years and now shows a rotating series of new artworks.'
  ]
},
{
  code: 'E09000020', slug: 'kensington-chelsea', name: 'Kensington and Chelsea', label: ['Kensington', '& Chelsea'], abbr: 'K&C', ring: 'Inner London',
  pop: 143400, formed: 'Formed in 1965 from the Royal Borough of Kensington and Chelsea',
  tagline: 'Palaces, museums, and the Carnival.',
  etym: {word: 'Chenesit-un · Cealc-hyth', gloss: 'Cynesige’s farm · the chalk wharf', note: 'Kensington was a Saxon farm. Chelsea was a riverside landing place where chalk, or perhaps lime, was unloaded.'},
  motto: {text: 'Quam bonum in unum habitare', tr: 'How good it is to dwell together in unity'},
  story: [
    'In 1689 William III, whose asthma hated the damp riverside air at Whitehall, bought a house in the village of Kensington and turned it into a palace. Queen Victoria was born there in 1819. In 1901, as she had wished, Kensington was made a Royal Borough.',
    'The Great Exhibition of 1851 in Hyde Park made a profit, and Prince Albert spent it on land in South Kensington for museums and colleges. The result, soon nicknamed “Albertopolis”, includes the V&A, the Natural History Museum, the Science Museum, Imperial College and the Royal Albert Hall.'
  ],
  facts: [
    'The Chelsea Physic Garden (1673) is London’s oldest botanic garden. Seeds from it are said to have helped start cotton farming in the colony of Georgia.',
    'Notting Hill Carnival grew out of Claudia Jones’s indoor Caribbean carnival of 1959 and a local street fair in 1966. It is now one of the biggest street festivals in Europe.',
    'The Chelsea Flower Show is held in the grounds of the Royal Hospital Chelsea, founded by Charles II in 1682 and still home to the scarlet-coated Chelsea Pensioners.'
  ]
},
{
  code: 'E09000013', slug: 'hammersmith-fulham', name: 'Hammersmith and Fulham', label: ['Hammersmith', '& Fulham'], abbr: 'H&F', ring: 'Inner London',
  pop: 183200, formed: 'Formed in 1965 from Hammersmith and Fulham (it was just “Hammersmith” until 1979)',
  tagline: 'Bishops, bridges, and three football clubs.',
  etym: {word: 'Hamersmyth · Fulanham', gloss: 'a hammer smithy · Fulla’s river-bend', note: 'Hammersmith was probably just a forge. Fulham was a <i>hamm</i>, a meadow in a bend of the river, belonging to a man called Fulla.'},
  motto: null,
  story: [
    'For more than 1,300 years, from around 704 until 1975, Fulham Palace was a residence of the Bishops of London. It sat inside what was said to be the longest moat in England, filled in during the 1920s. Downstream, the villages of Hammersmith and Fulham grew from market gardens into riverside suburbs, joined by Joseph Bazalgette’s ornate green-and-gold Hammersmith Bridge (1887).',
    'In 1908 London hosted its first Olympic Games in a huge new stadium at White City, built for the Franco-British Exhibition. Half a century later the BBC built its Television Centre on the same land, and much of the country’s television came from there.'
  ],
  facts: [
    'Chelsea FC’s Stamford Bridge is in Fulham, in this borough, not in Chelsea. With Fulham and QPR, that gives the borough three professional clubs.',
    'The marathon’s odd 26.2 miles comes from the 1908 Games: the course ran from Windsor Castle to finish in front of the royal box at White City.',
    'William Morris lived and ran his Kelmscott Press on Hammersmith’s riverside. The house is named after his manor in Oxfordshire.'
  ]
},
{
  code: 'E09000032', slug: 'wandsworth', name: 'Wandsworth', label: ['Wandsworth'], abbr: 'WND', ring: 'Inner London',
  pop: 327500, formed: 'Formed in 1965 from Battersea and most of Wandsworth',
  tagline: 'Radical debates, the Boat Race, and four white chimneys.',
  etym: {word: 'Wendlesworth', gloss: 'Wendel’s enclosure', note: 'Its districts are Saxon too: Battersea is “Beaduric’s island”, Putney “Putta’s landing place”, Tooting “the people of Tota”.'},
  motto: {text: 'We serve', tr: ''},
  story: [
    'In the autumn of 1647, in St Mary’s Church, Putney, Cromwell’s soldiers and officers argued about who should get to vote. “The poorest he that is in England hath a life to live, as the greatest he,” said Colonel Thomas Rainsborough. The Putney Debates are one of the founding arguments of modern democracy.',
    'Battersea Power Station went up in two halves: the first generated power in 1933, and the fourth chimney was finished in the 1950s. The brick exterior was by Giles Gilbert Scott, who also designed the red telephone box. It closed in 1983, spent decades as the most famous ruin in London (Pink Floyd flew a giant inflatable pig over it in 1976), and reopened in 2022.'
  ],
  facts: [
    'The Boat Race between Oxford and Cambridge has started at Putney since 1845, and finishes 4¼ miles upstream at Mortlake.',
    'Clapham Junction, one of the busiest railway junctions in Europe, isn’t in Clapham. It’s in Battersea.',
    'The River Wandle was named after the town, not the other way round. It once powered dozens of mills making flour, snuff and dyed cloth.'
  ]
},
{
  code: 'E09000022', slug: 'lambeth', name: 'Lambeth', label: ['Lambeth'], abbr: 'LAM', ring: 'Inner London',
  pop: 317600, formed: 'Formed in 1965 from Lambeth, plus Clapham and Streatham',
  tagline: 'Archbishops, pleasure gardens, and the heart of Windrush London.',
  etym: {word: 'Lambehitha', gloss: 'the landing place for lambs', note: '<i>Hyth</i> is a landing place on a river: lambs were ferried ashore here.'},
  motto: {text: 'Spectemur agendo', tr: 'Let us be judged by our acts'},
  story: [
    'Since around 1200 Lambeth Palace has been the London home of the Archbishops of Canterbury, looking across the river at Westminster. For almost two hundred years, from the 1660s, the Vauxhall Pleasure Gardens were where Londoners of every class came for lamp-lit walks, fireworks, music and flirting.',
    'In June 1948 the <i>Empire Windrush</i> brought hundreds of Caribbean passengers to Britain. Many of them were housed in a deep wartime shelter under Clapham Common, and the nearest labour exchange was in Brixton. People stayed nearby, and Brixton became the centre of Black British life. Windrush Square and the Black Cultural Archives mark it today.'
  ],
  facts: [
    'The Oval hosted the first FA Cup Final (1872) and the first Test match played in England (1880).',
    'Charlie Chaplin spent a poor childhood in Kennington and Lambeth, including a spell in the Lambeth workhouse.',
    'The Russian word for a railway station, <i>vokzal</i>, is often said to come from Vauxhall, by way of a pleasure garden near St Petersburg that borrowed the name.'
  ]
},
{
  code: 'E09000028', slug: 'southwark', name: 'Southwark', label: ['Southwark'], abbr: 'SWK', ring: 'Inner London',
  pop: 307700, formed: 'Formed in 1965 from Bermondsey, Camberwell and Southwark',
  tagline: 'The Globe, the Borough, and a shard of glass.',
  etym: {word: 'Suthringa geweorche', gloss: 'the fort of the men of Surrey', note: 'The defensive work at the south end of the bridge, which Londoners just called “the Borough”.'},
  motto: {text: 'United to serve', tr: ''},
  story: [
    'For most of history London Bridge was the only bridge, so everything from Kent, Dover and the Continent came up Borough High Street, which was lined with inns for travellers. Chaucer’s pilgrims set out from one of them, the Tabard. Across the water and partly out of reach of the City’s rules, Bankside filled up with bear-baiting pits, brothels and playhouses: the Rose (1587), the Swan and, from 1599, the Globe.',
    'Today the south bank has a reconstructed Globe (1997), Tate Modern in a converted power station (2000), and the Shard (2012). At 310 metres, the Shard is the tallest building in Britain.'
  ],
  facts: [
    'There has been a market at the southern end of London Bridge for at least 800 years, possibly a thousand. Borough Market is still there.',
    'In 1824 Charles Dickens’s father was locked up for debt in the Marshalsea prison. Charles was twelve and was sent to work in a blacking factory. He drew on it for <i>Little Dorrit</i>.',
    'At Cross Bones, an unconsecrated graveyard for the poor and for the “Winchester Geese”, prostitutes licensed by the Bishop of Winchester, the gates are covered in ribbons left in their memory.'
  ]
},
{
  code: 'E09000023', slug: 'lewisham', name: 'Lewisham', label: ['Lewisham'], abbr: 'LEW', ring: 'Inner London',
  pop: 300600, formed: 'Formed in 1965 from Lewisham and Deptford',
  tagline: 'A royal dockyard, a murdered playwright, and an overstuffed walrus.',
  etym: {word: 'Levesham', gloss: 'Lēofsa’s homestead', note: 'One of London’s many <i>-hams</i>: a Saxon homestead named after its owner.'},
  motto: {text: 'Salus populi suprema lex', tr: 'The welfare of the people is the highest law'},
  story: [
    'Henry VIII founded the royal naval dockyard at Deptford in 1513, and the King’s Yard sent ships all over the world. In 1581 Elizabeth I knighted Francis Drake on the deck of the <i>Golden Hind</i> here, just back from sailing round the world. In 1593 the playwright Christopher Marlowe was stabbed to death in a house in Deptford, in a quarrel that may or may not have been over the bill.',
    'In 1698 Peter the Great came to learn shipbuilding and stayed at John Evelyn’s house, Sayes Court. He and his entourage wrecked it. Evelyn’s servant described them as “right nasty”. A couple of centuries later the railway brought green Victorian suburbs: Forest Hill, Catford, Sydenham.'
  ],
  facts: [
    'The Horniman Museum’s famous walrus was stuffed by Victorian taxidermists who had never seen one alive. They filled it until the wrinkles disappeared.',
    'Blackheath, which Lewisham shares with Greenwich, was where Wat Tyler’s rebels gathered in 1381 to hear John Ball preach: “When Adam delved and Eve span, who was then the gentleman?”',
    'Marlowe is buried in an unmarked grave at St Nicholas’ Church, Deptford.'
  ]
},
{
  code: 'E09000011', slug: 'greenwich', name: 'Greenwich', label: ['Greenwich'], abbr: 'GRN', ring: 'Inner London',
  pop: 289100, formed: 'Formed in 1965 from Greenwich and most of Woolwich · Royal Borough since 2012',
  tagline: 'Where the world’s time begins.',
  etym: {word: 'Grenewic', gloss: 'the green trading place', note: '<i>Wīc</i> is a Saxon trading port, borrowed from Latin <i>vicus</i>. Woolwich, next door, was the port for wool.'},
  motto: null,
  story: [
    'Three Tudor monarchs were born in the riverside Palace of Placentia: Henry VIII in 1491, Mary I in 1516 and Elizabeth I in 1533. Inigo Jones’s Queen’s House, begun in 1616, was the first strictly classical building in England. In 1675 Charles II founded the Royal Observatory on the hill above, to solve the problem of longitude at sea.',
    'In 1884 an international conference in Washington chose the meridian through the Observatory as the world’s Prime Meridian, zero degrees longitude. The line on the map on this page is it. Every place on Earth now measures its east or west, and its time zone, from this hill.'
  ],
  facts: [
    'Since 1833 a red time ball on the Observatory roof has dropped at exactly 1 p.m. so that ships on the Thames could set their chronometers.',
    'The <i>Cutty Sark</i> (1869) is the last surviving tea clipper in the world.',
    'The Millennium Dome is numerology in fabric: twelve masts for the months, 365 metres across for the days, 52 metres high for the weeks.'
  ]
},
{
  code: 'E09000004', slug: 'bexley', name: 'Bexley', label: ['Bexley'], abbr: 'BXY', ring: 'Outer London',
  pop: 246500, formed: 'Formed in 1965 from Bexley, Erith, Crayford and part of Chislehurst & Sidcup · formerly Kent',
  tagline: 'The Arts & Crafts movement, a ruined abbey, and a cathedral for sewage.',
  etym: {word: 'Byxlea', gloss: 'the box-tree clearing', note: '<i>Lēah</i> is a clearing in woodland. This one was full of box trees.'},
  motto: null,
  story: [
    'In 1859 the newly married William Morris asked his friend Philip Webb to design him a home in rural Bexleyheath. Red House was the result. Morris couldn’t buy furniture he liked, so he and his friends painted, carved and embroidered it themselves, and that became the firm of Morris & Co. and the start of the Arts and Crafts movement.',
    'A few miles away, on the marshes, is the Crossness Pumping Station (1865). After the “Great Stink” of 1858, Joseph Bazalgette’s new sewers carried London’s waste east, and here four giant beam engines lifted it into reservoirs to be let out on the ebb tide. The painted cast-iron engine house is known as the “Cathedral on the Marsh”.'
  ],
  facts: [
    'Lesnes Abbey was founded in 1178 by Richard de Luci. Tradition says it was penance for his part in the quarrel that led to Thomas Becket’s murder.',
    'Hall Place, a Tudor mansion of 1537, is said to have been built partly from the stones of dissolved monasteries.',
    'Kate Bush grew up in Welling, in this borough.'
  ]
},
{
  code: 'E09000006', slug: 'bromley', name: 'Bromley', label: ['Bromley'], abbr: 'BRM', ring: 'Outer London',
  pop: 330000, formed: 'Formed in 1965 from Bromley, Beckenham, Orpington, Penge and part of Chislehurst & Sidcup · formerly Kent',
  tagline: 'Darwin’s garden, Victorian dinosaurs, and London’s biggest borough.',
  etym: {word: 'Bromleag', gloss: 'the clearing where broom grows', note: 'Another <i>lēah</i>, this time full of yellow-flowering broom.'},
  motto: null,
  story: [
    'For forty years, from 1842, Charles Darwin lived at Down House in the village of Downe. Every day he walked the same gravel loop, the “Sandwalk”, which he called his thinking path. <i>On the Origin of Species</i> was written here and published in 1859.',
    'Joseph Paxton’s Crystal Palace was moved from Hyde Park to Sydenham Hill after the Great Exhibition and rebuilt, bigger, in 1854. It burned down on a November night in 1936, and the glow could be seen for miles. The park still has its Victorian dinosaur sculptures, the first life-size models of dinosaurs anywhere in the world. Before one of them was finished, scientists held a New Year’s Eve dinner inside the mould for the Iguanodon.'
  ],
  facts: [
    'At about 150 km², Bromley is the largest London borough, and a good deal of it is farmland and woods.',
    'Camden Place in Chislehurst, the house that gave Camden Town its name, is where the exiled French emperor Napoleon III died in 1873.',
    'H. G. Wells was born on Bromley High Street in 1866. A century later David Bowie was at school in Bromley.'
  ]
},
{
  code: 'E09000008', slug: 'croydon', name: 'Croydon', label: ['Croydon'], abbr: 'CRY', ring: 'Outer London',
  pop: 390800, formed: 'Formed in 1965 from Croydon and Coulsdon & Purley · formerly Surrey',
  tagline: 'The first air traffic control tower, and the word “Mayday”.',
  etym: {word: 'Crogdene', gloss: 'the valley of crocuses', note: 'Probably the saffron crocus, grown for dye and spice.'},
  motto: {text: 'Ad summa nitamur', tr: 'Let us strive for the highest'},
  story: [
    'In 1920 Croydon became the Air Port of London, the country’s main international airport, and built the world’s first purpose-built air traffic control tower. In 1923 its senior radio officer, Frederick Mockford, was asked for an easily understood distress call. He took the French <i>m’aider</i> (“help me”) and wrote it as “Mayday”. In 1930 Amy Johnson took off from here on her solo flight to Australia.',
    'Croydon also had the world’s first public railway, the horse-drawn Surrey Iron Railway (1803), and for centuries the Archbishops of Canterbury kept a summer palace here. In the 2000s a small record shop in Croydon, Big Apple, was where dubstep got started.'
  ],
  facts: [
    'At the 2021 Census it was London’s most populous borough, with around 391,000 people. That’s more than Cardiff.',
    'Its old terminal building, Airport House, still stands on Purley Way.',
    'Croydon’s Tramlink (2000) brought trams back to London streets for the first time since 1952.'
  ]
},
{
  code: 'E09000029', slug: 'sutton', name: 'Sutton', label: ['Sutton'], abbr: 'SUT', ring: 'Outer London',
  pop: 209600, formed: 'Formed in 1965 from Sutton & Cheam, Beddington & Wallington and Carshalton · formerly Surrey',
  tagline: 'England’s first oranges, a Tudor fantasy palace, and a village of the future.',
  etym: {word: 'Sudtone', gloss: 'the southern farm', note: 'About as plain as English place names get: the farm to the south.'},
  motto: null,
  story: [
    'At Beddington in the 1580s, Sir Francis Carew is said to have grown the first orange trees in England, sheltered in winter under a movable shed. Tradition says the seeds came from Walter Raleigh, who had married Carew’s niece. Carshalton’s ponds are a source of the River Wandle, and Carshalton has its own legend: a spring called Anne Boleyn’s Well, said to have burst out where her horse struck the ground.',
    'In 2002, at Hackbridge, the Beddington Zero Energy Development (BedZED) opened. With its bright rooftop wind cowls, it was the UK’s first large eco-village and a model for green housing all over the world.'
  ],
  facts: [
    'Nonsuch Park, shared with neighbouring Epsom & Ewell, contains the site of Henry VIII’s most extravagant palace. It was begun in 1538 and meant to have “none such” like it, and it had been torn down by the 1680s.',
    'Whitehall in Cheam is a timber-framed house built around 1500, now a museum.',
    'The Wandle’s clear chalk-stream water once supported watercress beds and mills along its banks.'
  ]
},
{
  code: 'E09000024', slug: 'merton', name: 'Merton', label: ['Merton'], abbr: 'MRT', ring: 'Outer London',
  pop: 215200, formed: 'Formed in 1965 from Mitcham, Wimbledon and Merton & Morden · formerly Surrey',
  tagline: 'Strawberries, Nelson, and one of England’s oldest laws.',
  etym: {word: 'Mertone', gloss: 'the farm by the pool', note: 'From Old English <i>mere</i> (a pool) and <i>tūn</i> (a farm).'},
  motto: null,
  story: [
    'Merton Priory, founded in 1117, was one of the richest religious houses in England. The young Thomas Becket was educated there. In 1235 the king’s council met at the priory and issued the Statute of Merton, often called the first English statute. When Henry VIII dissolved the priory, its stones were carted off to build his palace at Nonsuch.',
    'In 1801 Lord Nelson bought Merton Place and lived there with Emma Hamilton, calling it “Paradise Merton”. He left it in 1805 for Trafalgar and did not come back. The All England Club held its first tennis Championships at Wimbledon in 1877, to pay for a new pony roller for the lawns.'
  ],
  facts: [
    'William Morris set up his dye and textile works at Merton Abbey Mills on the Wandle in 1881.',
    'Mitcham was famous for lavender, grown in fields that scented the whole district.',
    'The Wombles live, of course, on Wimbledon Common.'
  ]
},
{
  code: 'E09000021', slug: 'kingston', name: 'Kingston upon Thames', label: ['Kingston', 'upon Thames'], abbr: 'KNG', ring: 'Outer London',
  pop: 168100, formed: 'Formed in 1965 from Kingston, Malden & Coombe and Surbiton · formerly Surrey · Royal Borough',
  tagline: 'Where Saxon kings were crowned, and where cinema began.',
  etym: {word: 'Cyninges tūn', gloss: 'the king’s estate', note: 'An estate belonging to the Saxon crown, beside what was for centuries the first bridge over the Thames above London Bridge.'},
  motto: null,
  story: [
    'Outside the Guildhall stands the Coronation Stone. Tradition says Saxon kings were crowned at Kingston in the tenth century, among them Athelstan (925), the first king of all England, and Æthelred the Unready (978). The town calls itself the oldest royal borough in England: King John gave it a charter in 1200.',
    'In 1830 a boy called Edward Muggeridge was born here. As Eadweard Muybridge he went to California and in 1878 photographed a galloping horse in a sequence of pictures, proving that all four hooves leave the ground at once. His moving images were a step towards cinema. He came home to Kingston to die, and left his equipment to the town museum.'
  ],
  facts: [
    'David Mach’s sculpture <i>Out of Order</i> (1988) is a row of red telephone boxes toppling like dominoes.',
    'Until Putney Bridge was built in 1729, Kingston had the first bridge over the Thames upstream of London Bridge.',
    'The Hogsmill River meets the Thames in the town centre.'
  ]
},
{
  code: 'E09000027', slug: 'richmond', name: 'Richmond upon Thames', label: ['Richmond', 'upon Thames'], abbr: 'RCH', ring: 'Outer London',
  pop: 195200, formed: 'Formed in 1965 from Richmond and Barnes (Surrey) and Twickenham (Middlesex)',
  tagline: 'Palaces on both banks, and a view protected by Parliament.',
  etym: {word: 'Richmond', gloss: 'named after a town in Yorkshire', note: 'The village was called Shene until Henry VII, Earl of Richmond in Yorkshire, rebuilt the palace around 1501 and renamed it after his earldom. The Yorkshire name is Norman French: <i>riche mont</i>, “strong hill”.'},
  motto: null,
  story: [
    'This is the only London borough on both banks of the Thames, and the river brought royalty. Elizabeth I died at Richmond Palace in 1603. Hampton Court was Cardinal Wolsey’s palace until Henry VIII took it. Charles I walled in Richmond Park for hunting in 1637, and it is still the largest of the Royal Parks, with hundreds of red and fallow deer.',
    'Then the riverside villas came. Alexander Pope built a grotto at Twickenham, Horace Walpole made the Gothic confection of Strawberry Hill, and Kew’s royal garden grew into the Royal Botanic Gardens, a UNESCO World Heritage Site since 2003.'
  ],
  facts: [
    'The view from Richmond Hill, down over the Thames, is the only view in England protected by an Act of Parliament (1902).',
    'Hampton Court’s maze, planted for William III in the 1690s, is the oldest surviving hedge maze in Britain.',
    'Twickenham Stadium has been the home of English rugby since 1909.'
  ]
},
{
  code: 'E09000018', slug: 'hounslow', name: 'Hounslow', label: ['Hounslow'], abbr: 'HNS', ring: 'Outer London',
  pop: 288200, formed: 'Formed in 1965 from Brentford & Chiswick, Heston & Isleworth and Feltham · formerly Middlesex',
  tagline: 'Highwaymen, Palladian villas, and the straight line that mapped Britain.',
  etym: {word: 'Honeslaw', gloss: 'Hund’s burial mound', note: '<i>Hlāw</i> is a mound or barrow. Whose it was, a man called Hund or just a hound, is argued over.'},
  motto: null,
  story: [
    'Hounslow Heath lay across the roads to Bath and Exeter, and in the 17th and 18th centuries it was notorious for highwaymen. In 1784 General William Roy used it for something more useful. He measured a dead-straight baseline of just over five miles across the heath with glass rods, and it became the starting point for the triangulation behind the Ordnance Survey. Two old cannons still mark the ends.',
    'By the river, the rich built villas: Lord Burlington’s Chiswick House (1729), the Duke of Northumberland’s Syon House, and Robert Adam’s interiors at Osterley. In November 1642 Charles I’s army, advancing on London, met the London militia at Turnham Green and turned back. It was as close to the capital as the royalists would ever get.'
  ],
  facts: [
    'Chiswick means “cheese farm”.',
    'William Hogarth spent his summers in a small house in Chiswick. It is now a museum, next to what is today a very busy roundabout.',
    'Beer has been brewed on Fuller’s Griffin Brewery site in Chiswick for more than 350 years.'
  ]
},
{
  code: 'E09000017', slug: 'hillingdon', name: 'Hillingdon', label: ['Hillingdon'], abbr: 'HIL', ring: 'Outer London',
  pop: 305900, formed: 'Formed in 1965 from Uxbridge, Hayes & Harlington, Ruislip-Northwood and Yiewsley & West Drayton · formerly Middlesex',
  tagline: 'Heathrow, and the bunker where the Battle of Britain was run.',
  etym: {word: 'Hildendune', gloss: 'Hilda’s hill', note: 'Another <i>dūn</i>, a hill, with a Saxon owner’s name attached.'},
  motto: null,
  story: [
    'Heathrow was once exactly what it sounds like: Heath Row, a line of cottages on the edge of Hounslow Heath. In 1929 Fairey Aviation opened a small test airfield nearby. After the war it became London Airport, opening in 1946 with tents for terminals, and the hamlet disappeared under the runways.',
    'At RAF Uxbridge, sixty feet underground, No. 11 Group’s operations room directed the fighter squadrons defending London and the south-east in 1940. Churchill watched there on 16 August. As he left, he told his aide: “Never in the field of human conflict has so much been owed by so many to so few.” The bunker is now a museum.'
  ],
  facts: [
    'The Harmondsworth Great Barn (1426), with its enormous oak frame, was called “the Cathedral of Middlesex” by John Betjeman.',
    'Ruislip Lido began in 1811 as a reservoir to feed the Grand Junction Canal.',
    'Hillingdon is the westernmost London borough and, at about 115 km², the second-largest.'
  ]
},
{
  code: 'E09000009', slug: 'ealing', name: 'Ealing', label: ['Ealing'], abbr: 'EAL', ring: 'Outer London',
  pop: 367100, formed: 'Formed in 1965 from Ealing, Acton and Southall · formerly Middlesex',
  tagline: 'The Queen of the Suburbs, the oldest film studio, and Little Punjab.',
  etym: {word: 'Gillingas', gloss: 'the people of Gilla', note: '<i>-ingas</i> names mean “the followers of” someone, and are some of the oldest Saxon names in England.'},
  motto: {text: 'Progress with unity', tr: ''},
  story: [
    'Ealing Studios, where filming started in 1902, claims to be the oldest continuously working film studio in the world. In the late 1940s and 50s it made the Ealing comedies, among them <i>Kind Hearts and Coronets</i>, <i>The Lavender Hill Mob</i> and <i>The Ladykillers</i>, gentle, subversive films that did a lot to shape how Britain saw itself.',
    'From the 1950s Punjabi families settled in Southall, working in local factories and at nearby Heathrow. It became one of the largest Punjabi communities outside South Asia. The Gurdwara Sri Guru Singh Sabha is one of the largest Sikh temples outside India.'
  ],
  facts: [
    'In a small basement club opposite Ealing Broadway station in 1962, Mick Jagger and Keith Richards met Brian Jones. The Rolling Stones grew out of that meeting.',
    'Pitzhanger Manor was the country retreat that the architect John Soane designed for himself.',
    'Acton means “oak farm”.'
  ]
},
{
  code: 'E09000005', slug: 'brent', name: 'Brent', label: ['Brent'], abbr: 'BRT', ring: 'Outer London',
  pop: 339800, formed: 'Formed in 1965 from Wembley and Willesden · formerly Middlesex',
  tagline: 'Wembley’s arch, and a temple carved by hand.',
  etym: {word: 'Brigantā', gloss: 'the holy one', note: 'Named after the River Brent, which has an old Celtic name, probably “holy” or “high” one, related to the goddess Brigantia.'},
  motto: {text: 'Forward together', tr: ''},
  story: [
    'Wembley Stadium opened in 1923 for the British Empire Exhibition. Its first FA Cup Final drew such a huge crowd that people spilled onto the pitch, and a mounted policeman on a pale horse called Billie helped push them back. It went down in history as the “White Horse Final”. Wembley hosted the 1948 Olympics, the 1966 World Cup Final and Live Aid, and was rebuilt in 2007 under its great white arch.',
    'In 1995 the BAPS Shri Swaminarayan Mandir opened in Neasden. Thousands of pieces of Bulgarian limestone and Italian marble were carved by hand in India, shipped to London and put together like a giant jigsaw. It was the largest Hindu temple outside India at the time.'
  ],
  facts: [
    'Brent is one of the most diverse places in Britain. More than half its residents were born outside the UK.',
    'Kilburn’s Irish community was so large that it was nicknamed “County Kilburn”.',
    'Neasden means “the nose-shaped hill” and Willesden “the hill of the spring”.'
  ]
},
{
  code: 'E09000015', slug: 'harrow', name: 'Harrow', label: ['Harrow'], abbr: 'HRW', ring: 'Outer London',
  pop: 261200, formed: 'The one borough that stayed as it was: Harrow was already a borough in 1965 · formerly Middlesex',
  tagline: 'A holy hill, a famous school, and Metro-land.',
  etym: {word: 'Hearg', gloss: 'the heathen shrine', note: 'One of the few English place names that remembers a pagan temple, which probably stood where the church is now, on top of the hill.'},
  motto: null,
  story: [
    'Harrow on the Hill rises out of the Middlesex clay, with St Mary’s spire on top. The church was consecrated in 1094, probably on the site of the old pagan shrine. In 1572 a local farmer, John Lyon, got a charter from Elizabeth I for a free grammar school. Harrow School went on to educate Byron, Churchill, Nehru and seven British prime ministers.',
    'Then the Metropolitan Railway arrived. Its advertisers called the countryside “Metro-land”, and fields became semi-detached suburbs, a process John Betjeman lovingly recorded. Kodak built a huge factory at Harrow in 1891.'
  ],
  facts: [
    'Byron used to lie on a flat tomb in St Mary’s churchyard and daydream. It is now caged to protect it from his fans.',
    'About a quarter of Harrow’s residents are Hindu, one of the highest proportions anywhere in England.',
    'W. S. Gilbert, of Gilbert & Sullivan, died in 1911 in the lake at his home, Grim’s Dyke in Harrow Weald, trying to rescue a young woman who had got into difficulty while swimming.'
  ]
},
{
  code: 'E09000003', slug: 'barnet', name: 'Barnet', label: ['Barnet'], abbr: 'BAR', ring: 'Outer London',
  pop: 389300, formed: 'Formed in 1965 from Hendon, Finchley, Barnet, East Barnet and Friern Barnet · formerly Middlesex & Hertfordshire',
  tagline: 'A battle in the fog, a garden suburb, and your hair.',
  etym: {word: 'Bærnet', gloss: 'land cleared by burning', note: 'The forest here was cleared for farming by setting it on fire.'},
  motto: {text: 'Unitas efficit ministerium', tr: 'Unity makes service'},
  story: [
    'On Easter Sunday 1471, in thick fog, Edward IV beat Richard Neville, Earl of Warwick, “the Kingmaker”, at the Battle of Barnet. In the murk, some of Warwick’s men mistook their own allies’ badge, a star with streams, for Edward’s sun in splendour and attacked them. Warwick was killed, and the Wars of the Roses turned decisively.',
    'In 1907 Henrietta Barnett (no relation to the place) founded Hampstead Garden Suburb, a planned community meant to mix rich and poor among hedges, greens and Lutyens churches. Hendon’s aerodrome made it one of the birthplaces of British aviation, and the RAF Museum stands on the site.'
  ],
  facts: [
    '“Barnet” is Cockney rhyming slang for hair, from Barnet Fair, the town’s famous horse fair.',
    'The first official airmail in Britain flew from Hendon to Windsor in September 1911.',
    'Margaret Thatcher was MP for Finchley for thirty-three years.'
  ]
},
{
  code: 'E09000010', slug: 'enfield', name: 'Enfield', label: ['Enfield'], abbr: 'ENF', ring: 'Outer London',
  pop: 330000, formed: 'Formed in 1965 from Enfield, Edmonton and Southgate · formerly Middlesex',
  tagline: 'The world’s first cash machine, and a famous rifle.',
  etym: {word: 'Enefelde', gloss: 'Ēana’s open land', note: '<i>Feld</i> meant open country, land without trees, rather than a field.'},
  motto: null,
  story: [
    'On 27 June 1967, at Barclays in Enfield Town, the world’s first cash machine went into service. The actor Reg Varney made the first withdrawal. There were no plastic cards: customers put in paper vouchers impregnated with a faintly radioactive carbon-14 marker.',
    'On the River Lea, the Royal Small Arms Factory (1816) made the Lee–Enfield rifle, carried by British soldiers through both world wars, and the Bren gun, whose name combines Brno and Enfield. Earlier, the young Tudor royals spent time at Elsyng Palace here, and it was at Enfield in 1547 that Edward VI and his sister Elizabeth learned their father, Henry VIII, was dead.'
  ],
  facts: [
    'John Keats went to school in Enfield, where he first fell in love with poetry.',
    'Enfield is London’s northernmost borough.',
    'Forty Hall, a Jacobean mansion, still stands in its park beside the lost palace site.'
  ]
},
{
  code: 'E09000014', slug: 'haringey', name: 'Haringey', label: ['Haringey'], abbr: 'HGY', ring: 'Outer London',
  pop: 264200, formed: 'Formed in 1965 from Hornsey, Tottenham and Wood Green · formerly Middlesex',
  tagline: 'The People’s Palace, and the birth of television.',
  etym: {word: 'Haringeie', gloss: 'Hæring’s enclosure', note: 'The same Saxon name slowly turned into three: Haringey, Harringay and Hornsey.'},
  motto: null,
  story: [
    'Alexandra Palace, the “People’s Palace” on the hill, opened on 24 May 1873 and burned down sixteen days later. It was rebuilt and reopened in 1875. On 2 November 1936 the BBC began the world’s first regular high-definition television service from studios in the palace. The transmitter mast is still there.',
    'Tottenham Hotspur was founded in 1882 by schoolboys from a cricket club. It is named after Harry Hotspur, Sir Henry Percy, whose family owned land in Tottenham. Bruce Castle, a Tudor manor house, was once a school run by the family of Rowland Hill, who invented the Penny Post.'
  ],
  facts: [
    'Luke Howard, the man who named the clouds (cumulus, stratus, cirrus) in 1802, lived in Tottenham.',
    '“Ally Pally” gets its name from Princess Alexandra of Denmark, who married the future Edward VII.',
    'From the palace terrace you can see across the whole city to the towers of Canary Wharf and beyond.'
  ]
},
{
  code: 'E09000031', slug: 'waltham-forest', name: 'Waltham Forest', label: ['Waltham', 'Forest'], abbr: 'WFT', ring: 'Outer London',
  pop: 278400, formed: 'Formed in 1965 from Walthamstow, Leyton and Chingford · formerly Essex',
  tagline: 'William Morris’s childhood, Hitchcock’s birthplace, and Britain’s first car.',
  etym: {word: 'Waltham', gloss: 'the forest homestead', note: 'Waltham Forest was the old name for the royal hunting forest, most of which survives as Epping Forest.'},
  motto: {text: 'Fellowship is life', tr: 'from William Morris'},
  story: [
    'William Morris was born in Walthamstow in 1834 and spent his boyhood exploring Epping Forest. His family home, Water House, is now the William Morris Gallery. The borough’s motto comes from his writing: “Fellowship is life, and lack of fellowship is death.”',
    'In a garden workshop in Walthamstow in the early 1890s, Frederick Bremer built one of the first British petrol cars. It survives in the Vestry House Museum. In 1899 Alfred Hitchcock was born above his father’s greengrocer’s shop in Leytonstone, and Leytonstone Tube station has mosaics of his films.'
  ],
  facts: [
    'Walthamstow Market, at about a kilometre, claims to be the longest outdoor street market in Europe.',
    'Queen Elizabeth’s Hunting Lodge in Chingford was built in 1543 for Henry VIII, as a grandstand for watching the hunt.',
    'Walthamstow Wetlands, opened in 2017 on working reservoirs, is one of Europe’s largest urban wetland reserves.'
  ]
},
{
  code: 'E09000026', slug: 'redbridge', name: 'Redbridge', label: ['Redbridge'], abbr: 'RED', ring: 'Outer London',
  pop: 310300, formed: 'Formed in 1965 from Ilford, Wanstead & Woodford and parts of Chigwell and Dagenham · formerly Essex',
  tagline: 'Named after a bridge that isn’t there any more.',
  etym: {word: 'The Red Bridge', gloss: 'a red-brick bridge', note: 'The borough is named after a red-brick bridge over the River Roding, knocked down in the early 1920s. The name lived on in a Tube station (opened 1947), and the new borough borrowed it in 1965.'},
  motto: {text: 'In unity progress', tr: ''},
  story: [
    'Wanstead House (1722) was one of the grandest Palladian mansions in England, a rival to Blenheim. Its heiress, Catherine Tylney-Long, married William Pole-Wellesley, the Duke of Wellington’s nephew. He gambled and spent her fortune. In 1825 the house was sold off in lots and demolished, and she died that same year. Only the park, the lakes and a grotto survive.',
    'At Ilford in 1879 Alfred Harman started making photographic plates in his basement. Ilford became one of the best-known names in photography.'
  ],
  facts: [
    'Winston Churchill was MP for Woodford from 1945 to 1964. His statue stands on Woodford Green.',
    'Hainault Forest is a surviving piece of the old royal forest.',
    'Valentines Mansion in Ilford dates from the 1690s and has a restored Georgian garden.'
  ]
},
{
  code: 'E09000016', slug: 'havering', name: 'Havering', label: ['Havering'], abbr: 'HAV', ring: 'Outer London',
  pop: 262000, formed: 'Formed in 1965 from Romford and Hornchurch · formerly Essex',
  tagline: 'A royal liberty at London’s eastern edge.',
  etym: {word: 'Haueringas', gloss: 'the people of Hæfer', note: 'Its oldest village is Havering-atte-Bower, “at the bower”, meaning the royal residence that once stood there.'},
  motto: {text: 'Liberty', tr: ''},
  story: [
    'Medieval kings and queens stayed in a palace at Havering-atte-Bower. In 1465 Edward IV made the district the Royal Liberty of Havering, which gave it its own courts and privileges, and they lasted until 1892. That is where the borough’s one-word motto comes from. Romford got its market charter in 1247, and there has been a market there ever since.',
    'Hornchurch takes its name from the “horned church”: St Andrew’s has had a carved bull’s head with horns on its east end for centuries. In 1940 RAF Hornchurch was one of the fighter stations defending London.'
  ],
  facts: [
    'Havering is the easternmost borough, and about half of it is Green Belt.',
    'Upminster, at the far eastern end of the District line, has a smock windmill built in 1803.',
    'Rainham Marshes, on the Thames, is a nature reserve on old military firing ranges.'
  ]
},
{
  code: 'E09000002', slug: 'barking-dagenham', name: 'Barking and Dagenham', label: ['Barking', '& Dagenham'], abbr: 'B&D', ring: 'Outer London',
  pop: 218900, formed: 'Formed in 1965 from Barking and Dagenham (it was just “Barking” until 1980) · formerly Essex',
  tagline: 'An abbey from 666, and the women who changed the law.',
  etym: {word: 'Berecingas · Dæccanhaam', gloss: 'Berica’s people · Dæcca’s homestead', note: 'Two Saxon names: a tribe, and one man’s farm.'},
  motto: {text: 'Dei gratia probemur rebus', tr: 'By the grace of God, let us be judged by our deeds'},
  story: [
    'Barking Abbey was founded in 666 by Erkenwald, later Bishop of London, for his sister Æthelburh. It became one of the most important nunneries in England. After his coronation in 1066, William the Conqueror stayed there while his new fortress in London, the future Tower, was being built.',
    'In the 1920s and 30s the Becontree estate went up: “homes for heroes”, at the time the largest public housing estate in the world. Ford opened its Dagenham plant in 1931. In 1968 its women sewing machinists went on strike because their work was graded as unskilled. The strike led directly to the Equal Pay Act of 1970.'
  ],
  facts: [
    'Sir Alf Ramsey, who managed England to the 1966 World Cup, was born in Dagenham.',
    'In the 19th century Barking was one of England’s busiest fishing ports.',
    'The Dagenham Girl Pipers, founded in 1930, played bagpipes around the world.'
  ]
},
{
  code: 'E09000025', slug: 'newham', name: 'Newham', label: ['Newham'], abbr: 'NWM', ring: 'Outer London',
  pop: 351100, formed: 'Formed in 1965 from East Ham, West Ham and parts of Barking and Woolwich · formerly Essex',
  tagline: 'Iron ships, the Olympic flame, and the newest name on the map.',
  etym: {word: 'New + Ham', gloss: 'East Ham and West Ham, joined', note: 'A name invented in 1965. The old <i>hamm</i> was land in a bend of the river.'},
  motto: {text: 'Progress with the people', tr: ''},
  story: [
    'In the 19th century the marshes became industrial riverside. The Royal Docks (Victoria, Albert and King George V) made up the largest area of enclosed docks in the world. At Leamouth, the Thames Ironworks built HMS <i>Warrior</i> (1860), Britain’s first iron-hulled armoured warship. The yard’s works football team became West Ham United, which is why the club is still called “the Irons” and its crest shows crossed riveting hammers.',
    'On 19 January 1917 a munitions factory in Silvertown exploded, killing 73 people. It was the largest explosion London has ever had. In 2012, contaminated industrial land at Stratford became the Olympic Park, and the flame was lit there.'
  ],
  facts: [
    'Abbey Mills Pumping Station (1868), another of Bazalgette’s palaces of sewage, is called the “Cathedral of Sewage”.',
    'Newham is one of the most ethnically diverse local authorities in England, and one of the youngest.',
    'The 2012 stadium is now West Ham’s home ground, so the Irons live on the Olympic Park.'
  ]
}
];

/* Historic county of each borough before it joined London. */
const counties = {
  city: ['city'],
  'tower-hamlets': ['middlesex'], hackney: ['middlesex'], islington: ['middlesex'], camden: ['middlesex'],
  westminster: ['middlesex'], 'kensington-chelsea': ['middlesex'], 'hammersmith-fulham': ['middlesex'],
  wandsworth: ['surrey'], lambeth: ['surrey'], southwark: ['surrey'], lewisham: ['kent'], greenwich: ['kent'],
  bexley: ['kent'], bromley: ['kent'], croydon: ['surrey'], sutton: ['surrey'], merton: ['surrey'], kingston: ['surrey'],
  richmond: ['surrey', 'middlesex'], hounslow: ['middlesex'], hillingdon: ['middlesex'], ealing: ['middlesex'],
  brent: ['middlesex'], harrow: ['middlesex'], barnet: ['middlesex', 'herts'], enfield: ['middlesex'], haringey: ['middlesex'],
  'waltham-forest': ['essex'], redbridge: ['essex'], havering: ['essex'], 'barking-dagenham': ['essex'], newham: ['essex'],
};
const countyInfo = {
  middlesex: {name: 'Middlesex', hue: 250},
  surrey: {name: 'Surrey', hue: 150},
  kent: {name: 'Kent', hue: 35},
  essex: {name: 'Essex', hue: 325},
  herts: {name: 'Hertfordshire', hue: 95},
  city: {name: 'The City', hue: 25},
};

/* Old English building blocks. Each hit: [borough slug, place, meaning] */
const names = [
  {el: '-ham', oe: 'hām / hamm', meaning: 'a homestead, or a meadow in a river bend', hits: [
    ['lewisham', 'Lewisham', 'Lēofsa’s homestead'], ['newham', 'East & West Ham', 'river-bend land'],
    ['barking-dagenham', 'Dagenham', 'Dæcca’s homestead'], ['hammersmith-fulham', 'Fulham', 'Fulla’s river bend'],
    ['haringey', 'Tottenham', 'Totta’s homestead'], ['richmond', 'Twickenham', 'Twicca’s river bend'],
    ['lambeth', 'Streatham', 'homestead on the Roman street'], ['bromley', 'Beckenham', 'Beohha’s homestead'],
    ['waltham-forest', 'Waltham', 'the forest homestead']]},
  {el: '-ton', oe: 'tūn', meaning: 'a farm or estate: later, a town', hits: [
    ['kensington-chelsea', 'Kensington', 'Cynesige’s farm'], ['kingston', 'Kingston', 'the king’s estate'],
    ['sutton', 'Sutton', 'the southern farm'], ['merton', 'Merton', 'the farm by the pool'],
    ['westminster', 'Paddington', 'Padda’s farm'], ['ealing', 'Acton', 'the oak farm'],
    ['enfield', 'Edmonton', 'Ēadhelm’s farm'], ['lambeth', 'Kennington', 'the farm of Cēna’s people']]},
  {el: '-don', oe: 'dūn', meaning: 'a hill', hits: [
    ['islington', 'Islington', 'Gisla’s hill'], ['hillingdon', 'Hillingdon', 'Hilda’s hill'],
    ['merton', 'Wimbledon', 'Wynnmann’s hill'], ['barnet', 'Hendon', 'at the high hill'],
    ['brent', 'Neasden', 'the nose-shaped hill'], ['brent', 'Willesden', 'the hill of the spring']]},
  {el: '-ley', oe: 'lēah', meaning: 'a woodland clearing', hits: [
    ['bexley', 'Bexley', 'the box-tree clearing'], ['bromley', 'Bromley', 'the clearing where broom grows'],
    ['brent', 'Wembley', 'Wemba’s clearing']]},
  {el: '-ey', oe: 'ēg / īeg', meaning: 'an island: dry ground in a marsh', hits: [
    ['hackney', 'Hackney', 'Haca’s island'], ['southwark', 'Bermondsey', 'Beornmund’s island'],
    ['wandsworth', 'Battersea', 'Beaduric’s island']]},
  {el: '-hithe', oe: 'hӯth', meaning: 'a landing place on the river', hits: [
    ['lambeth', 'Lambeth', 'the landing place for lambs'], ['kensington-chelsea', 'Chelsea', 'the chalk wharf'],
    ['wandsworth', 'Putney', 'Putta’s landing place'], ['tower-hamlets', 'Stepney', 'Stybba’s landing place'],
    ['southwark', 'Rotherhithe', 'the landing place for cattle']]},
  {el: '-wich', oe: 'wīc', meaning: 'a trading port, or a dairy farm', hits: [
    ['greenwich', 'Greenwich', 'the green trading place'], ['greenwich', 'Woolwich', 'the wool port'],
    ['westminster', 'Aldwych', 'the old trading place: Saxon Lundenwic'], ['hounslow', 'Chiswick', 'the cheese farm']]},
  {el: '-worth', oe: 'worth', meaning: 'an enclosure', hits: [
    ['wandsworth', 'Wandsworth', 'Wendel’s enclosure'], ['hounslow', 'Isleworth', 'Gīslhere’s enclosure'],
    ['kingston', 'Tolworth', 'Tala’s enclosure']]},
  {el: '-ing', oe: '-ingas', meaning: 'the people of…, among the oldest Saxon names', hits: [
    ['ealing', 'Ealing', 'Gilla’s people'], ['barking-dagenham', 'Barking', 'Berica’s people'],
    ['havering', 'Havering', 'Hæfer’s people'], ['wandsworth', 'Tooting', 'Tōta’s people'],
    ['tower-hamlets', 'Wapping', 'Wæppa’s people']]},
];

const inner = ['city', 'tower-hamlets', 'hackney', 'islington', 'camden', 'westminster', 'kensington-chelsea',
  'hammersmith-fulham', 'wandsworth', 'lambeth', 'southwark', 'lewisham', 'greenwich'];

return {boroughs: B, counties, countyInfo, names, inner};
})();
