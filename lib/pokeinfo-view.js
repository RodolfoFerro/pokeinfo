'use babel';

export default class PokeinfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('pokeinfo');

    elementHeader = document.createElement('div');
    elementHeader.classList.add('poke-header');
    elementHeader.textContent = "Pokéinfo";
    this.element.appendChild(elementHeader);

    pokeSearchedMsg = document.createElement('div');
    pokeSearchedMsg.textContent = "Welcome to pokeinfo's plugin.";
    pokeSearchedMsg.classList.add('pokemon-searched');
    this.element.appendChild(pokeSearchedMsg);

    pokeInfoMsg = document.createElement('div');
    pokeInfoMsg.textContent =  'Move your cursor to a word or select a word then toggle Pokeinfo.';
    pokeInfoMsg.classList.add('poke-definition');
    this.element.appendChild(pokeInfoMsg);


    // Create message element
    // const message = document.createElement('div');
    // message.textContent = 'The Pokeinfo package is Alive! It\'s ALIVE!';
    // message.classList.add('message');
    // this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setElement() {
    this.element.children[1].textContent = "SELECTION: " + pokemonToSearch + ". "
    this.element.children[2].textContent = "INFO: " + pokemonInfo;
  }

}
