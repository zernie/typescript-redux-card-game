export enum CardType {
  Minion = 'MINION',
  Weapon = 'WEAPON',
  Hero = 'HERO',
  Enchantment = 'ENCHANTMENT',
}

export enum PlayerKind {
  Player = 'PLAYER',
  Opponent = 'OPPONENT',
}

export  enum PlayState {
  Invalid = 'INVALID',
  Playing = 'PLAYING',
  Winning = 'WINNING',
  Losing = 'LOSING',
  Won = 'WON',
  Lost = 'LOST',
  Tied = 'TIED',
  Disconnected = 'DISCONNECTED',
  Conceded = 'CONCEDED',
  Quit = 'QUIT',
}

export  enum Step {
  Invalid = 'INVALID',
  BeginFirst = 'BEGIN_FIRST',
  BeginShuffle = 'BEGIN_SHUFFLE',
  BeginDraw = 'BEGIN_DRAW',
  BeginMulligan = 'BEGIN_MULLIGAN',
  MainBegin = 'MAIN_BEGIN',
  MainReady = 'MAIN_READY',
  MainResource = 'MAIN_RESOURCE',
  MainDraw = 'MAIN_DRAW',
  MainStart = 'MAIN_START',
  MainAction = 'MAIN_ACTION',
  MainCombat = 'MAIN_COMBAT',
  MainEnd = 'MAIN_END',
  MainNext = 'MAIN_NEXT',
  FinalWrapUp = 'FINAL_WRAPUP',
  FinalGameOver = 'FINAL_GAMEOVER',
  MainCleanup = 'MAIN_CLEANUP',
  MainStartTriggers = 'MAIN_START_TRIGGERS',
}

export  enum Zone {
  Invalid = 'INVALID',
  Play = 'PLAY',
  Deck = 'DECK',
  Hand = 'HAND',
  Graveyard = 'GRAVEYARD',
  RemovedFromGame = 'REMOVEDFROMGAME',
  SetAside = 'SETASIDE',
  Secret = 'SECRET',
}
