import React from 'react';
import { getPokemons } from './services/get-pokemons';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      api: [],
      inputValue: ''
    }

    this.getInputValue = this.getInputValue.bind(this);
  }

  componentDidMount () {
    getPokemons()
    .then(data => {
      this.setState({
        api: data,
      });
      console.log(this.state.api);
    });
  }

  getInputValue (event) {
    const targetValue = event.currentTarget.value; 
    this.setState ({
      inputValue: targetValue
    })
  }

  render() {
    const filteredPokemons = this.state.api.filter(item => item.name.toUpperCase().includes(this.state.inputValue.toUpperCase()));
    return (
      <div className="App">
        <header className="app__header">
          <h1 className="header__title">Pokémon Directory</h1>
          <form className="header__form">
            <label htmlFor="searchInput" className="form__label">
              Search for a Pokémon by name
            </label>
            <input
              type="text"
              id="searchInput"
              name="searchInput"
              className="form__input"
              onChange={this.getInputValue}
            />
          </form>
        </header>

        <main className="app__main">
          <section className="main__container">
            <ul className="main__list">
              {filteredPokemons.map((pokemon, id) => {
                return (
                <li className="list__item" key={id}>
                    <div className="list__item-container" id={pokemon.id}>
                      <img className="list__item-image" src={pokemon.url} alt={`Imagen de ${pokemon.name}`} />
                      <h2 className="list__item-name">{pokemon.name}</h2>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>

      </div>
    );
  }
}

export default App;
