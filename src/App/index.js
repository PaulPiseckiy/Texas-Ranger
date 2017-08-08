//@flow
import React, { Component } from 'react';

import Block from '../Block';
import Search from '../Search';
import './index.css';

type jokeType = {
  id: number,
  joke: string
};

const PATH_BASE = 'http://api.icndb.com/jokes';
const PARAM_SEARCH = '/random';
const PARAM_NUM = '18';
const PARAM_ESCAPE = 'escape=javascript';

class App extends Component {
  state: {
    jokes: jokeType[],
    jokesCollection: jokeType[],
    favouriteJokes: jokeType[],
    favouriteCollection: jokeType[],
    isShowFavourite: boolean,
    isLoading: boolean,
    searchTerm: string,
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      jokes: [],
      jokesCollection: [],
      favouriteJokes: [],
      favouriteCollection: [],
      isShowFavourite: false,
      isLoading: false,
      searchTerm: '',
    };
    
    (this: any).setJokes = this.setJokes.bind(this);
    (this: any).fetchJokes = this.fetchJokes.bind(this);
    (this: any).onDismiss = this.onDismiss.bind(this);
    (this: any).onSearchChange = this.onSearchChange.bind(this);
    (this: any).onFavouriteAdd = this.onFavouriteAdd.bind(this);
    (this: any).onShowFavourite = this.onShowFavourite.bind(this);
  }
  
  componentDidMount() {
    this.fetchJokes();
  }

  setJokes(newJokes: jokeType[]): void {
    const oldJokes = this.state.jokes;

    const updatedJokes = [
      ...oldJokes,
      ...newJokes
    ];

    this.setState({ 
      jokes: updatedJokes,
      jokesCollection: updatedJokes,
      isLoading: false,
    });
  }

  fetchJokes() {
    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PARAM_SEARCH}/${PARAM_NUM}?${PARAM_ESCAPE}`)  
      .then(response => response.json())
      .then((result: Object) => this.setJokes(result.value))
      .catch(e => e);
  }

  onDismiss(id: number) {
    const { jokes, favouriteJokes } = this.state;

    const isNotId = item => item.id !== id;

    const updatedJokes = jokes.filter(isNotId);
    const updatedFavouriteJokes = favouriteJokes.filter(isNotId);

    this.setState({ 
      jokes: updatedJokes,
      jokesCollection: updatedJokes,
      favouriteJokes: updatedFavouriteJokes,
      favouriteCollection: updatedFavouriteJokes
    });
  }

  onSearchChange(event: Event & {target: HTMLInputElement}) {
    const { 
      searchTerm,
      jokesCollection,
      favouriteCollection
    } = this.state;

    const arrFilter = (arr) => arr.filter(
      item => item.joke.toLowerCase()
        .includes(searchTerm.toLowerCase()
    ));
    
    this.setState({ 
      searchTerm: event.target.value,
      jokes: arrFilter(jokesCollection),
      favouriteJokes: arrFilter(favouriteCollection)
    });
  }

  onFavouriteAdd(id: number) {
    const { jokes, favouriteJokes } = this.state;

    const isId = (item) => item.id === id;
    const isNotId = item => item.id !== id;
    
    if (favouriteJokes.find(isId)) {
      this.setState({favouriteJokes: favouriteJokes.filter(isNotId)})
      return null;
    }

    const newJoke: any = jokes.find(isId);
    const updatedJokes = [
      ...favouriteJokes,
      newJoke
    ]
    
    this.setState({ 
      favouriteJokes: updatedJokes,
      favouriteCollection: updatedJokes
    });
  }

  onShowFavourite() {
    this.setState({ isShowFavourite: !this.state.isShowFavourite});
  }
  
  render() {
    const { 
      jokes,
      isLoading, 
      searchTerm, 
      favouriteJokes, 
      isShowFavourite
    } = this.state;

    const trueJokes = isShowFavourite ? favouriteJokes : jokes;

    return (
      <div className="page">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
        />  
        <div className="content-wrapper">
          <IfEmptyFavourite isShowFavourite={isShowFavourite} favouriteJokes={favouriteJokes} />
          { trueJokes.map( item => 
            <Block 
              key={item.id}
              onClick={() => this.onFavouriteAdd(item.id)}
              onDismiss={() => this.onDismiss(item.id)}
              isFavouriteJoke=
              {
                favouriteJokes.find( joke => 
                joke.id === item.id) ? "selected" : ""
              }
            >
              {item.joke}
            </Block>
          )}
        </div>
        <Loading isLoading={isLoading}/>
        <FixedButtons
          fetchJokes={this.fetchJokes}
          isShowFavourite={isShowFavourite}
          onShowFavourite={this.onShowFavourite}
        />
      </div>
    );
  }
}

const Loading = ({ isLoading }) => 
  isLoading 
    ? <i className="fa fa-refresh fa-spin fa-2x fa-fw load-indicator"/>
    : null

const FixedButtons = ({ fetchJokes, onShowFavourite, isShowFavourite }) =>
  <div>
    { isShowFavourite
        ? null
        : <button className="load-button" onClick={fetchJokes}>
            More
          </button>
    }
    <button className="star-button" onClick={onShowFavourite}>
      <i className="fa fa-star-half-o fa-3x" />
    </button>
  </div>

const IfEmptyFavourite = ({ isShowFavourite, favouriteJokes }) =>
  isShowFavourite && !favouriteJokes.length
  ? <div>Your collection is still empty</div>
  : null


export default App;