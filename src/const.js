const Raiting = {
  MAX: 5,
};

const Icon = {
  ICON_URL: `img/pin.svg`,
  ACTIVE_ICON_URL: `img/pin-active.svg`,
  ICON_SIZE: [30, 30],
};

const SortType = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`,
};

const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURF: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  PROPERTY: `/property`,
};

const CardType = {
  FAVORITE: `favorites`,
  CITY: `cities`,
  NEAR_PLACES: `near-places`,
};

const Calculations = {
  RADIUS: 2500,
  EARTH_RADIUS: 6372795,
};


export {
  Raiting,
  Icon,
  SortType,
  City,
  AppRoute,
  CardType,
  Calculations,
};
