export enum Ability {
  Adapt = "Adapt",
  Battlecry = "Battlecry",
  Charge = "Charge",
  ChooseOne = "Choose one",
  Combo = "Combo",
  Counter = "Counter",
  DeathRattle = "Deathrattle",
  Discover = "Discover",
  DivineShield = "Divine shield",
  Enrage = "Enrage",
  Freeze = "Freeze",
  Immune = "Immune",
  Inspire = "Inspire",
  Overload = "Overload",
  Poisonous = "Poisonous",
  Quest = "Quest",
  Secret = "Secret",
  Silence = "Silence",
  Stealth = "Stealth",
  Taunt = "Taunt",
  Windfury = "Windfury"
}

export enum BlockType {
  Attack = "ATTACK",
  Joust = "JOUST",
  Continuous = "CONTINUOUS",
  Power = "POWER",
  Script = "SCRIPT",
  Trigger = "TRIGGER",
  Deaths = "DEATHS",
  Play = "PLAY",
  Fatigue = "FATIGUE",
  Ritual = "RITUAL",
  RevealCard = "REVEAL_CARD",
  GameReset = "GAME_RESET",
  MoveMinion = "MOVE_MINION",
  Action = "ACTION"
}

export enum CardClass {
  Invalid = "INVALID",
  DeathKnight = "DEATHKNIGHT",
  Druid = "DRUID",
  Hunter = "HUNTER",
  Mage = "MAGE",
  Paladin = "PALADIN",
  Priest = "PRIEST",
  Rogue = "ROGUE",
  Shaman = "SHAMAN",
  Warlock = "WARLOCK",
  Warrior = "WARRIOR",
  Dream = "DREAM ",
  Neutral = "NEUTRAL"
}

export enum CardType {
  Minion = "MINION",
  Weapon = "WEAPON",
  Hero = "HERO",
  Enchantment = "ENCHANTMENT",
  Spell = "SPELL",
  HeroPower = "HERO_POWER",
  Player = "PLAYER"
}

export type Controller = number;

/* export enum Controller {
  Player = "PLAYER",
  Opponent = "OPPONENT"
}*/

export enum PlayState {
  Invalid = "INVALID",
  Playing = "PLAYING",
  Winning = "WINNING",
  Losing = "LOSING",
  Won = "WON",
  Lost = "LOST",
  Tied = "TIED",
  Disconnected = "DISCONNECTED",
  Conceded = "CONCEDED",
  Quit = "QUIT"
}

export enum Step {
  Invalid = "INVALID",
  BeginFirst = "BEGIN_FIRST",
  BeginShuffle = "BEGIN_SHUFFLE",
  BeginDraw = "BEGIN_DRAW",
  BeginMulligan = "BEGIN_MULLIGAN",
  MainBegin = "MAIN_BEGIN",
  MainReady = "MAIN_READY",
  MainResource = "MAIN_RESOURCE",
  MainDraw = "MAIN_DRAW",
  MainStart = "MAIN_START",
  MainAction = "MAIN_ACTION",
  MainCombat = "MAIN_COMBAT",
  MainEnd = "MAIN_END",
  MainNext = "MAIN_NEXT",
  FinalWrapUp = "FINAL_WRAPUP",
  FinalGameOver = "FINAL_GAMEOVER",
  MainCleanup = "MAIN_CLEANUP",
  MainStartTriggers = "MAIN_START_TRIGGERS"
}

export enum Zone {
  Invalid = "INVALID",
  Play = "PLAY",
  Deck = "DECK",
  Hand = "HAND",
  Graveyard = "GRAVEYARD",
  RemovedFromGame = "REMOVEDFROMGAME",
  SetAside = "SETASIDE",
  Secret = "SECRET"
}

export enum EntityType {
  Invalid = "INVALID",

  /**
   All cards on the stack
   */
  Stack = "STACK",

  /**
   The target
   */
  Target = "TARGET",

  /**
   The source
   */
  Source = "SOURCE",

  /**
   Player's heroID
   */
  Hero = "HERO",

  /**
   Player's heroID power
   */
  HeroPower = "HERO_POWER",

  /**
   Opponent's heroID power
   */
  OpHeroPower = "OP_HERO_POWER",

  /**
   The target of the current event. (e.g. the defender, the target of a spell, or the just damaged or healed
   character)
   */
  EventTarget = "EVENT_TARGET",

  /**
   The source of the current event. (e.g. the attacker, the played card, or the just damaging or healing entity)
   */
  EventSource = "EVENT_SOURCE",

  /**
   The top card from the playerID's deck
   */
  TopCardFromDeck = "TOPCARDFROMDECK",

  /**
   The top card from the opponentID's deck
   */
  OpTopDeck = "OP_TOPDECK",

  /**
   All cards in the playerID's hand
   */
  Hand = "HAND",

  /**
   All cards in the playerID's deck
   */
  Deck = "DECK",

  /**
   Player's secrets
   */
  Secrets = "SECRETS",

  /**
   Player's minions
   */
  Minions = "MINIONS",

  /**
   Player's minions except the source
   */
  MinionsNoSource = "MINIONS_NOSOURCE",

  /**
   All friends characters
   */
  Friends = "FRIENDS",

  /**
   Opponent's Hero
   */
  OpHero = "OP_HERO",

  /**
   All cards in the opponentID's hand
   */
  OpHand = "OP_HAND",

  /**
   All cards in the opponentID's deck
   */
  OpDeck = "OP_DECK",

  /**
   All opponentID secret
   */
  OpSecrets = "OP_SECRETS",

  /**
   All opponentID minion
   */
  OpMinions = "OP_MINIONS",

  /**
   All opponentID character
   */
  Enemies = "ENEMIES",

  /**
   All opponentID character except the source
   */
  EnemiesNoTarget = "ENEMIES_NOTARGET",

  /**
   All characters
   */
  All = "ALL",

  /**
   All characters except the source
   */
  AllNoSource = "ALL_NOSOURCE",

  /**
   Player's weapon
   */
  Weapon = "WEAPON",

  /**
   Opponent's weapon
   */
  OpWeapon = "OP_WEAPON",

  /**
   All minions
   */
  AlLMinions = "ALLMINIONS",

  /**
   All minions except the source
   */
  AllMinionsNoSource = "ALLMINIONS_NOSOURCE",

  /**
   All cards in the graveyard
   */
  Graveyard = "GRAVEYARD",

  /**
   All heroes
   */
  Heroes = "HEROES",

  /**
   The Controller entity of the playerID
   */
  Controller = "CONTROLLER",

  /**
   The Controller entity of the opponentID.
   */
  OpController = "OP_CONTROLLER",

  /**
   The cards have been discarded from the playerID's hand.
   */
  Discarded = "DISCARDED"
}

export enum PlayReq {
  REQ_MINION_TARGET = 1,
  REQ_FRIENDLY_TARGET = 2,
  REQ_ENEMY_TARGET = 3,
  REQ_DAMAGED_TARGET = 4,
  REQ_MAX_SECRETS = 5,
  REQ_FROZEN_TARGET = 6,
  REQ_CHARGE_TARGET = 7,
  REQ_TARGET_MAX_ATTACK = 8,
  REQ_NONSELF_TARGET = 9,
  REQ_TARGET_WITH_RACE = 10,
  REQ_TARGET_TO_PLAY = 11,
  REQ_NUM_MINION_SLOTS = 12,
  REQ_WEAPON_EQUIPPED = 13,
  REQ_ENOUGH_MANA = 14,
  REQ_YOUR_TURN = 15,
  REQ_NONSTEALTH_ENEMY_TARGET = 16,
  REQ_HERO_TARGET = 17,
  REQ_SECRET_ZONE_CAP = 18,
  REQ_MINION_CAP_IF_TARGET_AVAILABLE = 19,
  REQ_MINION_CAP = 20,
  REQ_TARGET_ATTACKED_THIS_TURN = 21,
  REQ_TARGET_IF_AVAILABLE = 22,
  REQ_MINIMUM_ENEMY_MINIONS = 23,
  REQ_TARGET_FOR_COMBO = 24,
  REQ_NOT_EXHAUSTED_ACTIVATE = 25,
  REQ_UNIQUE_SECRET_OR_QUEST = 26,
  REQ_TARGET_TAUNTER = 27,
  REQ_CAN_BE_ATTACKED = 28,
  REQ_ACTION_PWR_IS_MASTER_PWR = 29,
  REQ_TARGET_MAGNET = 30,
  REQ_ATTACK_GREATER_THAN_0 = 31,
  REQ_ATTACKER_NOT_FROZEN = 32,
  REQ_HERO_OR_MINION_TARGET = 33,
  REQ_CAN_BE_TARGETED_BY_SPELLS = 34,
  REQ_SUBCARD_IS_PLAYABLE = 35,
  REQ_TARGET_FOR_NO_COMBO = 36,
  REQ_NOT_MINION_JUST_PLAYED = 37,
  REQ_NOT_EXHAUSTED_HERO_POWER = 38,
  REQ_CAN_BE_TARGETED_BY_OPPONENTS = 39,
  REQ_ATTACKER_CAN_ATTACK = 40,
  REQ_TARGET_MIN_ATTACK = 41,
  REQ_CAN_BE_TARGETED_BY_HERO_POWERS = 42,
  REQ_ENEMY_TARGET_NOT_IMMUNE = 43,
  REQ_ENTIRE_ENTOURAGE_NOT_IN_PLAY = 44,
  REQ_MINIMUM_TOTAL_MINIONS = 45,
  REQ_MUST_TARGET_TAUNTER = 46,
  REQ_UNDAMAGED_TARGET = 47,
  REQ_CAN_BE_TARGETED_BY_BATTLECRIES = 48,
  REQ_STEADY_SHOT = 49,
  REQ_MINION_OR_ENEMY_HERO = 50,
  REQ_TARGET_IF_AVAILABLE_AND_DRAGON_IN_HAND = 51,
  REQ_LEGENDARY_TARGET = 52,
  REQ_FRIENDLY_MINION_DIED_THIS_TURN = 53,
  REQ_FRIENDLY_MINION_DIED_THIS_GAME = 54,
  REQ_ENEMY_WEAPON_EQUIPPED = 55,
  REQ_TARGET_IF_AVAILABLE_AND_MINIMUM_FRIENDLY_MINIONS = 56,
  REQ_TARGET_WITH_BATTLECRY = 57,
  REQ_TARGET_WITH_DEATHRATTLE = 58,
  REQ_TARGET_IF_AVAILABLE_AND_MINIMUM_FRIENDLY_SECRETS = 59,
  REQ_SECRET_ZONE_CAP_FOR_NON_SECRET = 60,
  REQ_TARGET_EXACT_COST = 61,
  REQ_STEALTHED_TARGET = 62,
  REQ_MINION_SLOT_OR_MANA_CRYSTAL_SLOT = 63,
  REQ_MAX_QUESTS = 64,
  REQ_TARGET_IF_AVAILABE_AND_ELEMENTAL_PLAYED_LAST_TURN = 65,
  REQ_TARGET_NOT_VAMPIRE = 66,
  REQ_TARGET_NOT_DAMAGEABLE_ONLY_BY_WEAPONS = 67,
  REQ_NOT_DISABLED_HERO_POWER = 68,
  REQ_MUST_PLAY_OTHER_CARD_FIRST = 69,
  REQ_HAND_NOT_FULL = 70,
  REQ_TARGET_IF_AVAILABLE_AND_NO_3_COST_CARD_IN_DECK = 71,
  REQ_CAN_BE_TARGETED_BY_COMBOS = 72,
  REQ_CANNOT_PLAY_THIS = 73,
  REQ_FRIENDLY_MINIONS_OF_RACE_DIED_THIS_GAME = 74,
  REQ_DRAG_TO_PLAY_PRE29933 = 75,
  REQ_OPPONENT_PLAYED_CARDS_THIS_GAME = 77,
  REQ_LITERALLY_UNPLAYABLE = 78,
  REQ_TARGET_IF_AVAILABLE_AND_HERO_HAS_ATTACK = 79,
  REQ_FRIENDLY_MINION_OF_RACE_DIED_THIS_TURN = 80,
  REQ_TARGET_IF_AVAILABLE_AND_MINIMUM_SPELLS_PLAYED_THIS_TURN = 81,
  REQ_FRIENDLY_MINION_OF_RACE_IN_HAND = 82,
  REQ_DRAG_TO_PLAY_PRE31761 = 83,
  REQ_MANA_CRYSTAL = 84,
  REQ85 = 85,
  REQ_FRIENDLY_DEATHRATTLE_MINION_DIED_THIS_GAME = 86,
  REQ87 = 87,
  REQ88 = 88,
  REQ_FRIENDLY_REBORN_MINION_DIED_THIS_GAME = 89,
  REQ_MINION_DIED_THIS_GAME = 90,
  REQ_BOARD_NOT_COMPLETELY_FULL = 92,
  REQ_TARGET_IF_AVAILABLE_AND_HAS_OVERLOADED_MANA = 93,
  REQ_DRAG_TO_PLAY = 94
}

/**
 * Another classification for cards which is mutual exclusive.
 * The most used value is DRAGON, since a lot of cards interact with
 * dragons in hand.
 */
export enum Race {
  Blank = "BLANK",
  All = "ALL",
  Beast = "BEAST",
  Demon = "DEMON",
  DRAGON = "DRAGON",
  Mechanical = "MECHANICAL",
  Murloc = "MURLOC",
  Pirate = "PIRATE",
  Totem = "TOTEM",
  Elemental = "ELEMENTAL"
}

// export enum Race {
//   INVALID = 0,
//   BLOODELF = 1,
//   DRAENEI = 2,
//   DWARF = 3,
//   GNOME = 4,
//   GOBLIN = 5,
//   HUMAN = 6,
//   NIGHTELF = 7,
//   ORC = 8,
//   TAUREN = 9,
//   TROLL = 10,
//   UNDEAD = 11,
//   WORGEN = 12,
//   GOBLIN2 = 13,
//   MURLOC = 14,
//   DEMON = 15,
//   SCOURGE = 16,
//   MECHANICAL = 17,
//   ELEMENTAL = 18,
//   OGRE = 19,
//   BEAST = 20,
//   TOTEM = 21,
//   NERUBIAN = 22,
//   PIRATE = 23,
//   DRAGON = 24,
//   BLANK = 25,
//   ALL = 26,
//   EGG = 38
// }

/**
 Indicates which (group of) entities the effect will influence.
 */
export enum PowerArea {
  /**
   There will be no effect.
   */
  NONE,

  /**
   The effect will be triggered by the selected target (target chosen by playerID).
   */
  TARGET,

  /**
   The effect will be triggered by the heroID of the controller.
   */
  HERO,

  /**
   The effect will be triggered by the heroID of the opponentID controller.
   */
  OP_HERO,

  /**
   The effect will be triggered by the heroID of all controllers.
   */
  HEROES,

  /**
   The effect will be triggered by the board of the controller.
   */
  BOARD,

  /**
   The effect will be triggered by the board of the opponentID controller.
   */
  OP_BOARD,

  /**
   The effect will be triggered by the board of all controllers.
   */
  BOARDS,

  /**
   The effect will be triggered by the hand of the controller.
   */
  HAND,

  /**
   The effect will be triggered by the hand of the opponentID controller.
   */
  OP_HAND,

  /**
   The effect will be triggered by the hand of all controllers.
   */
  HANDS,

  /**
   The effect will be triggered by the entity itself.
   */
  SELF,

  /**
   The effect will be triggered by the GAME entity.
   */
  GAME,

  /**
   The effect will be triggered by the controller entity.
   */
  CONTROLLER,

  /**
   The effect will be triggered by the opponentID controller entity.
   */
  OP_CONTROLLER,

  /**
   The effect will be triggered by all controller entities.
   */
  CONTROLLERS,

  /**
   The effect will be triggered by the secrets of the controller.
   */
  SECRET,

  ///	<summary>
  ///	The effect will be triggered by the secrets of all controllers.
  ///	</summary>
  SECRETS,

  /**
   The effect will be triggered by the HAND and BOARD of the controller.
   */
  HAND_AND_BOARD,

  /**
   The effect will be triggered by the HAND and BOARD of the opponentID controller.
   */
  OP_BOARD_AND_OP_HERO,

  /**
   The effect will be triggered by the HERO and BOARD of all controllers.
   */
  BOARDS_HEROES,

  /**
   This effect will be triggered by the GRAVEYARD of the controller.
   */
  GRAVEYARD,

  /**
   This effect will be triggered by the GRAVEYARD and SECRET of the controller.
   */
  GRAVEYARD_AND_SECRET,

  /**
   This effect will be triggered by the GRAVEYARD of the opponentID controller.
   */
  OP_GRAVEYARD,

  /**
   This effect will be triggered by the GRAVEYARD and SECRET of the opponentID controller.
   */
  OP_GRAVEYARD_AND_OP_SECRET
}

export enum TargetingType {
  None,
  All,
  FriendlyCharacters,
  EnemyCharacters,
  AllMinions,
  FriendlyMinions,
  EnemyMinions,
  Heroes
}

/* Events in Hearthstone.*/
export enum TriggerType {
  NONE,

  MULTITRIGGER,

  /* The effect will be triggered at the end of turn.*/
  TURN_END,
  /* The effect will be triggered at the start of turn.*/
  TURN_START,
  /* The effect will be triggered when a minion dies.*/
  DEATH,
  /* The effect will be triggered after a playerID uses Hero Power.*/
  INSPIRE,
  /* The effect will be triggered when a character is damaged.*/
  DEAL_DAMAGE,
  /* The effect will be triggered when a spell or a character deals damages.*/
  TAKE_DAMAGE,
  /* 
  effect will be triggered when a character gets Predamage. 
  This event happens just before the character is actually damaged.
  */
  PREDAMAGE,

  /* The effect will be triggered when characters are healed.*/
  HEAL,
  /* The effect will be triggered when a minion loses its Divine Shield*/
  LOSE_DIVINE_SHIELD,
  /* The effect will be triggered when characters attack.*/
  ATTACK,
  /* The effect will be triggered after an attack action is ended.*/
  AFTER_ATTACK,
  /* The effect will be triggered whenever a minion is summoned*/
  SUMMON,
  /* The effect will be triggered after a minion is summoned.*/
  AFTER_SUMMON,
  /* The effect will be triggered when a playerID plays a card.*/
  PLAY_CARD,
  /* The effect will be triggered after a playerID plays a card.*/
  AFTER_PLAY_CARD,
  /* The effect will be triggered when a playerID plays a Minion card.*/
  PLAY_MINION,
  /* The effect will be triggered after a minion is played.*/
  AFTER_PLAY_MINION,
  /* The effect will be triggered when a playerID plays a Spell card.*/
  CAST_SPELL,
  /* The effect will be triggered after a spell is played.*/
  AFTER_CAST,
  /* The effect will be triggered when a secret is activated.*/
  SECRET_REVEALED,
  /* The effect will be triggered when an entity enters any types of zone.*/
  ZONE,
  /* The effect will be triggered when a card is discarded from hand.*/
  DISCARD,
  /* The effect will be triggered when a game begins.*/
  GAME_START,
  /* The effect will be triggered when a card is drawed.*/
  DRAW,
  /* The effect will be triggered when a card is targeted by an attacking minion or a played card.*/
  TARGET,
  /* The effect will be triggered when a entity is frozen.*/
  FROZEN,
  /* The effect will be triggered when a heroID gains armor.*/
  ARMOR,
  /* The effect will be triggered when a heroID equips a weapon.*/
  EQUIP_WEAPON,
  /* The effect will be triggered when a card is shuffled into a deck.*/
  SHUFFLE_INTO_DECK,

  OVERLOAD,

  WORGEN_TRANSFORM
}

/*
Types of entity that can invoke an event.
*/
export enum TriggerSource {
  ALL,
  FRIENDLY,
  ENEMY,
  SELF,
  MINIONS,
  MINIONS_EXCEPT_SELF,
  OP_MINIONS,
  ALL_MINIONS,
  ALL_MINIONS_EXCEPT_SELF,
  HERO,
  OP_HERO,
  ENCHANTMENT_TARGET,
  WEAPON,
  HERO_POWER,
  FRIENDLY_SPELL_CASTED_ON_THE_OWNER,
  FRIENDLY_SPELL_CASTED_ON_OWN_MINIONS,
  FRIENDLY_EVENT_SOURCE,
  ADJACENT_TO_THE_OWNER
}

/*
Indicates where this trigger should be activated.
*/
export enum TriggerActivation {
  PLAY,
  HAND,
  DECK,
  HAND_OR_PLAY
}

/*
Types of event sequences in Hearthstone.
*/
export enum SequenceType {
  None,
  PlayCard,
  PlayMinion,
  PlaySpell,
  Summon,
  DamageDealt,
  Attack,
  Target
}

export enum PlayType {
  PlayerPlay,
  PlayerDraw,
  PlayerGet,
  PlayerMulligan,
  PlayerHandDiscard,
  PlayerDeckDiscard,
  PlayerBackToHand,
  PlayerSecretPlayed,
  PlayerHeroPower,
  PlayerPlayToDeck,
  PlayerGetToDeck,
  OpponentPlay,
  OpponentDraw,
  OpponentGet,
  OpponentMulligan,
  OpponentHandDiscard,
  OpponentDeckDiscard,
  OpponentPlayToDeck,
  OpponentBackToHand,
  OpponentSecretPlayed,
  OpponentSecretTriggered,
  OpponentHeroPower,
  OpponentGetToDeck
}
