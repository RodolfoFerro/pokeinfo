'use babel';

import PokeinfoView from './pokeinfo-view';
import { CompositeDisposable } from 'atom';

export default {

  pokeinfoView: null,
  modalPanel: null,
  subscriptions: null,
  pokemonToSearch: null,
  pokemonInfo: null,

  activate(state) {
    pokemonToSearch = "None";
    pokemonInfo = "That is not a Pokémon!";

    this.pokeinfoView = new PokeinfoView(state.pokeinfoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pokeinfoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pokeinfo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pokeinfoView.destroy();
  },

  serialize() {
    return {
      pokeinfoViewState: this.pokeinfoView.serialize()
    };
  },

  toggle() {
    editor = atom.workspace.getActiveTextEditor();
    pokemonToSearch = editor.getSelectedText();
    if(!pokemonToSearch){
      pokemonToSearch = editor.getWordUnderCursor();
    }

    // Dictionary API consumption:
    data = null;
    xhr = null;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        jsonText = JSON.parse(xhr.responseText);
        // console.log(xhr.status);
        if (xhr.status === 200) {
          pokemonInfo = "The Pokémon selected is " + jsonText['name'][0].toUpperCase() + jsonText['name'].substring(1) + ". It's height is " + (jsonText['height']/10).toString() + " meters, and it's weight is " + (jsonText['weight']/10).toString()  + " kilograms.";
          console.log("The Pokémon selected is " + jsonText['name'][0].toUpperCase() + jsonText['name'].substring(1) + ". It's height is " + (jsonText['height']/10).toString() + " meters, and it's weight is " + (jsonText['weight']/10).toString()  + " kilograms.");
        }
        else {
          pokemonInfo = "That is not a Pokémon!";
        }
      }
    });
    xhr.open("GET", "http://pokeapi.co/api/v2/pokemon/"+pokemonToSearch.toLowerCase(), false);
    xhr.setRequestHeader("accept", "application/json");
    xhr.send(data);

    this.pokeinfoView.setElement();

    console.log('Pokeinfo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
