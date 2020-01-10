# React & Redux based Hearthstone clone
Built for educational purposes only. Your contributions are welcome 😉

### [PLAY DEMO](https://zergetaev.ru/typescript-redux-card-game/)

## Roadmap:

### Gameplay
* [x] Stats
  * [x] Armor
  * [x] HP
  * [x] Mana
    * [ ] Overload
* [x] Entities
    * [x] Player
    * [x] Hero
    * [x] Minion
    * [x] Weapon
    * [ ] Hero power
    * [ ] Spell
        * [ ] Secret
        * [ ] Quest
            * [ ] Sidequest
* [x] Zones
    * [x] Play
    * [x] Hand
    * [x] Deck
    * [ ] Graveyard
    * [ ] Set aside
    * [ ] Secret
    * [ ] Removed from game            
* [x] Turns
  * [x] Player control switch
  * [x] Fatigue damage
  * [x] Card overdraw damage
  * [ ] 🕡 Turn timer 
    (https://github.com/matpaul/redux-timer-middleware, https://stackoverflow.com/questions/3969475/javascript-pause-settimeout)
* [x] Basic mechanics
  * [x] Charge
  * [x] Windfury
  * [x] Taunt
  * [ ] Battlecry (needs triggers)
  * [ ] Stealth (needs targeting improvements)
  * [ ] Poisonous
  * [ ] Divine shield
* [ ] Card targeting requirements

### Visual
* [x] Card rendering (basic)
  * [ ] Use [Sunwell](https://github.com/HearthSim/Sunwell)?
* [x] Drag & Drop cards(react-dnd)
    * [x] Touch screens support
* [ ] Fix minion death animation bug (#10)

### Technical
* [ ] Merge all game entities into `game.entities` (?)
* [ ] Tests
* [ ] [Sequences](https://hearthstone.gamepedia.com/Advanced_rulebook#Advanced_mechanics_101_.28READ_THIS_FIRST.29) (will require major refactoring)
* [ ] Load cards from https://hearthstonejson.com/
* [ ] Save/Load
  * [ ] LocalStorage
  * [ ] File system
* [ ] ~~Multiplayer~~
* [ ] Triggers

## Project structure
* `src/models` contains game models' type declarations and some helper functions.
* `src/redux` contains contains actual game logic, using Redux and decoupled from UI rendering. 
   It is highly recommended to use [redux-devtools](https://github.com/reduxjs/redux-devtools) for debugging.
* `src/UI` is a React implementation of Game UI.

## Development
    $ yarn && yarn start

Open `localhost:3000` in your web browser :tada:
