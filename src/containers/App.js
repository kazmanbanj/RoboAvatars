import React, { Component } from 'react';
import CardList from '../components/cardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import SortControls from '../components/SortControls';
import FilterBar from '../components/FilterBar';
import AddRobotModal from '../components/AddRobotModal';
import './App.css';
import { robots as initialRobots } from '../robots';

class App extends Component {
  constructor() {
    super();
    const savedFavorites = JSON.parse(localStorage.getItem('robo-favorites') || '[]');
    const savedDarkMode = JSON.parse(localStorage.getItem('robo-darkmode') || 'false');

    this.state = {
      robots: [],
      searchfield: '',
      sortOrder: 'id',
      activeRole: 'All',
      favorites: savedFavorites,
      showFavoritesOnly: false,
      darkMode: savedDarkMode,
      showAddModal: false,
    };
  }

  componentDidMount() {
    // Merge base robots with any user-added robots saved in localStorage
    const savedRobots = JSON.parse(localStorage.getItem('robo-added') || '[]');
    this.setState({ robots: [...initialRobots, ...savedRobots] });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  onSortChange = (sortOrder) => {
    this.setState({ sortOrder });
  };

  onRoleChange = (role) => {
    this.setState({ activeRole: role });
  };

  onToggleFavorite = (id) => {
    this.setState((prevState) => {
      const already = prevState.favorites.includes(id);
      const updated = already
        ? prevState.favorites.filter((fid) => fid !== id)
        : [...prevState.favorites, id];
      localStorage.setItem('robo-favorites', JSON.stringify(updated));
      return { favorites: updated };
    });
  };

  onToggleFavoritesOnly = () => {
    this.setState((prev) => ({ showFavoritesOnly: !prev.showFavoritesOnly }));
  };

  onToggleDarkMode = () => {
    this.setState((prev) => {
      const next = !prev.darkMode;
      localStorage.setItem('robo-darkmode', JSON.stringify(next));
      return { darkMode: next };
    });
  };

  onAddRobot = (formData) => {
    // Read current saved list outside setState to avoid double-write in StrictMode
    const savedRobots = JSON.parse(localStorage.getItem('robo-added') || '[]');
    const allRobots = [...initialRobots, ...savedRobots];
    const newId = allRobots.length > 0
      ? Math.max(...allRobots.map((r) => r.id)) + 1
      : 1;
    const newRobot = {
      id: newId,
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      role: formData.role,
    };
    const updatedSaved = [...savedRobots, newRobot];
    localStorage.setItem('robo-added', JSON.stringify(updatedSaved));
    // Derive full robots list from source of truth
    this.setState({
      robots: [...initialRobots, ...updatedSaved],
      showAddModal: false,
    });
  };

  getFilteredSortedRobots() {
    const { robots, searchfield, sortOrder, activeRole, favorites, showFavoritesOnly } = this.state;

    let result = robots.filter((robot) => {
      const matchesSearch = robot.name.toLowerCase().includes(searchfield.toLowerCase());
      const matchesRole = activeRole === 'All' || robot.role === activeRole;
      const matchesFav = !showFavoritesOnly || favorites.includes(robot.id);
      return matchesSearch && matchesRole && matchesFav;
    });

    if (sortOrder === 'az') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'za') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }
    // 'id' keeps insertion order (default)

    return result;
  }

  render() {
    const {
      robots,
      searchfield,
      sortOrder,
      activeRole,
      favorites,
      showFavoritesOnly,
      darkMode,
      showAddModal,
    } = this.state;

    if (robots.length === 0) {
      return (
        <div className={`app-root${darkMode ? ' dark' : ''}`}>
          <div className="loading">Loading...</div>
        </div>
      );
    }

    const filteredRobots = this.getFilteredSortedRobots();

    return (
      <div className={`app-root${darkMode ? ' dark' : ''}`}>
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Robot Avatars</h1>
          <div className="header-actions">
            <button
              className="btn-icon"
              onClick={this.onToggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              className={`btn-icon${showFavoritesOnly ? ' fav-active' : ''}`}
              onClick={this.onToggleFavoritesOnly}
              aria-pressed={showFavoritesOnly}
              title={showFavoritesOnly ? 'Show all robots' : 'Show favorites only'}
            >
              {showFavoritesOnly ? '★' : '☆'}
              <span className="btn-label">{favorites.length}</span>
            </button>
            <button
              className="btn-primary"
              onClick={() => this.setState({ showAddModal: true })}
            >
              + Add Robot
            </button>
          </div>
        </header>

        {/* Controls */}
        <div className="controls-bar">
          <SearchBox searchChange={this.onSearchChange} searchfield={searchfield} />
          <SortControls sortOrder={sortOrder} onSortChange={this.onSortChange} />
        </div>
        <FilterBar activeRole={activeRole} onRoleChange={this.onRoleChange} />

        {/* Results count */}
        <p className="results-count">
          Showing <strong>{filteredRobots.length}</strong> of {robots.length} robots
        </p>

        {/* Card grid */}
        <Scroll>
          {filteredRobots.length > 0 ? (
            <CardList
              robots={filteredRobots}
              favorites={favorites}
              onToggleFavorite={this.onToggleFavorite}
            />
          ) : (
            <div className="empty-state">
              <p>No robots match your filters.</p>
              <button
                className="btn-secondary"
                onClick={() => this.setState({ searchfield: '', activeRole: 'All', showFavoritesOnly: false })}
              >
                Clear filters
              </button>
            </div>
          )}
        </Scroll>

        {/* Add Robot Modal */}
        {showAddModal && (
          <AddRobotModal
            onAdd={this.onAddRobot}
            onClose={() => this.setState({ showAddModal: false })}
          />
        )}
      </div>
    );
  }
}

export default App;
