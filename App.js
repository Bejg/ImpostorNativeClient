import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, StatusBar, Modal, TouchableOpacity, Animated, BackHandler, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { colors, layout } from './src/styles/GlobalStyles';
import SetupScreen from './src/screens/SetupScreen';
import AddWordScreen from './src/screens/AddWordScreen';
import RevealScreen from './src/screens/RevealScreen';
import GameScreen from './src/screens/GameScreen';
import VotingScreen from './src/screens/VotingScreen';
import ResultScreen from './src/screens/ResultScreen';
import SplashScreen from './src/screens/SplashScreen';
import PlayersScreen from './src/screens/PlayersScreen';
import SettingsOptionScreen from './src/screens/SettingsOptionScreen';
import BackButton from './src/components/BackButton';
import VotingRevealCard from './src/components/VotingRevealCard';
import InfoCard from './src/components/InfoCard';

// TODO: Move this to a more appropriate configuration file
const API_URL = 'https://impostor.bqhost.ovh/api';



const MIN_PLAYERS = 3;

// ... (previous code) ...
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [gameState, setGameState] = useState('setup');
  const [currentScreen, setCurrentScreen] = useState('setup');
  const [gameScreen, setGameScreen] = useState('setup'); // Dodajemy osobny stan dla ekranów gry
  const [settingsOption, setSettingsOption] = useState(null); // Dodajemy stan do śledzenia aktywnej opcji ustawień
  const [playersList, setPlayersList] = useState([]);
  const [impostorCount, setImpostorCount] = useState(1);
  const [showSplash, setShowSplash] = useState(true);

  // Wczytaj graczy z pamięci przy starcie aplikacji
  useEffect(() => {
    const loadSavedPlayers = async () => {
      try {
        const savedPlayers = await AsyncStorage.getItem('savedPlayers');
        if (savedPlayers) {
          setPlayersList(JSON.parse(savedPlayers));
        } else {
          // Domyślne wartości, jeśli nie ma zapisanych graczy
          setPlayersList(["Gracz 1", "Gracz 2", "Gracz 3", "Gracz 4"]);
        }
      } catch (error) {
        console.error('Błąd podczas wczytywania zapisanych graczy:', error);
        setPlayersList(["Gracz 1", "Gracz 2", "Gracz 3", "Gracz 4"]);
      }
    };

    loadSavedPlayers();
  }, []);

  const handleHealthCheckComplete = (isHealthy) => {
    if (isHealthy) {
      setShowSplash(false);
    }
  };
  const [gameData, setGameData] = useState({
    players: [],
    category: '',
    secretWord: '',
    impostorHint: '',
    wordId: null,
    currentPlayerIndex: 0,
    startingPlayerName: ''
  });

  // Notification State (now using InfoCard)
  const [infoCardVisible, setInfoCardVisible] = useState(false);
  const [infoCardData, setInfoCardData] = useState({ title: '', message: '', type: 'info' });

  // Player Reveal Card State
  const [revealCardVisible, setRevealCardVisible] = useState(false);
  const [revealedPlayer, setRevealedPlayer] = useState(null);

  // Zapisz graczy do pamięci, gdy lista się zmieni
  useEffect(() => {
    const savePlayers = async () => {
      try {
        await AsyncStorage.setItem('savedPlayers', JSON.stringify(playersList));
      } catch (error) {
        console.error('Błąd podczas zapisywania graczy:', error);
      }
    };

    if (playersList.length > 0) {
      savePlayers();
    }
  }, [playersList]);

  // Obsługa przycisku wstecz na Androidzie - pokazuje dialog potwierdzenia
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Definiujemy ekran, na których powinien działać wewnętrzny przycisk wstecz
      const screensWithBackButton = ['players', 'settingsOption', 'add-word'];

      // Jeśli jesteśmy na ekranie z wewnętrzny przyciskiem wstecz, nie kończ aplikacji
      // W ScreenHeader jest już obsługa przycisku wstecz, więc zwracamy false,
      // aby nie powodować konfliktu z główną obsługą
      if (screensWithBackButton.includes(currentScreen)) {
        return false;
      }
      // W przeciwnym przypadku, jeśli jesteśmy w głównym przepływie aplikacji, pokaż dialog potwierdzenia
      else {
        Alert.alert(
          'Zamknij aplikację',
          'Czy na pewno chcesz wyjść z aplikacji?',
          [
            {
              text: 'Nie',
              style: 'cancel'
            },
            {
              text: 'Tak',
              onPress: () => BackHandler.exitApp()
            }
          ],
          { cancelable: false }
        );
        return true; // Zatrzymaj domyślne zachowanie przycisku wstecz
      }
    });

    return () => backHandler.remove();
  }, [gameState, currentScreen]);


  const showInfoCard = useCallback((message, type = 'info', title = null) => {
    const cardTitle = title || (type === 'error' ? 'Błąd' : type === 'success' ? 'Sukces' : 'Informacja');
    setInfoCardData({ message, type, title: cardTitle });
    setInfoCardVisible(true);
  }, []);

  const startGame = async () => {
    if (playersList.length < MIN_PLAYERS) {
      showInfoCard(`Wymagane jest minimum ${MIN_PLAYERS} graczy.`, 'error');
      return;
    }
    if (impostorCount >= playersList.length) {
      showInfoCard("Liczba Impostorów musi być mniejsza niż liczba graczy.", 'error');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/random`);
      console.log('Response from /random:', response);  
      if (!response.ok) throw new Error("Błąd pobierania słowa");
      const selectedItem = await response.json();

      if (!selectedItem || !selectedItem.word || !selectedItem.hint) {
        throw new Error("Pobrane dane słowa są niekompletne.");
      }

      let roles = Array(playersList.length).fill('Citizen');
      let assigned = 0;
      while (assigned < impostorCount) {
        const idx = Math.floor(Math.random() * playersList.length);
        if (roles[idx] !== 'Impostor') {
          roles[idx] = 'Impostor';
          assigned++;
        }
      }

      const playersObjects = playersList.map((name, index) => ({
        id: index,
        name: name,
        role: roles[index],
        isEliminated: false
      }));

      const starter = playersObjects[Math.floor(Math.random() * playersObjects.length)].name;

      setGameData({
        players: playersObjects,
        category: "Sekretne słowo",
        secretWord: selectedItem.word,
        impostorHint: selectedItem.hint,
        wordId: selectedItem.id,
        currentPlayerIndex: 0,
        startingPlayerName: starter
      });

      setGameState('reveal');

    } catch (error) {
      showInfoCard(error.message, 'error');
      console.error('Błąd podczas rozpoczynania gry:', error );
    }
  };


  const navigateToAddWord = () => {
    setCurrentScreen('add-word');
  };

  const navigateToSetup = () => {
    setCurrentScreen('setup');
  };

  const navigateToPlayers = () => {
    setCurrentScreen('players');
  };

  const navigateToGameMode = () => {
    setSettingsOption('gameMode');
    setCurrentScreen('settingsOption');
  };

  const navigateToCategories = () => {
    setSettingsOption('categories');
    setCurrentScreen('settingsOption');
  };

  const navigateBackToSetup = () => {
    setCurrentScreen('setup');
    setSettingsOption(null);
  };

  const navigateBackToSettings = () => {
    setCurrentScreen('setup');
  };

  const nextPlayer = () => {
    if (gameData.currentPlayerIndex + 1 < gameData.players.length) {
      setGameData(prev => ({ ...prev, currentPlayerIndex: prev.currentPlayerIndex + 1 }));
    } else {
      setGameState('game');
    }
  };

  const onVote = () => {
    setGameState('voting');
  };

  const [winner, setWinner] = useState(null);

  const checkWinCondition = useCallback((players) => {
    const remainingImpostors = players.filter(p => p.role === 'Impostor' && !p.isEliminated).length;
    const remainingCitizens = players.filter(p => p.role === 'Citizen' && !p.isEliminated).length;
    
    if (remainingImpostors === 0) {
        const impostorsNames = players.filter(p => p.role === 'Impostor').map(p => p.name).join(', ');
        setWinner({ type: 'Citizens', msg: `Zwycięstwo! Wszyscy Impostorzy (${impostorsNames}) zostali złapani!` });
        setGameState('result');
        return true;
    }

    if (remainingCitizens <= remainingImpostors) {
        setWinner({ type: 'Impostors', msg: 'Porażka Obywateli! Impostorzy zdominowali grupę.' });
        setGameState('result');
        return true;
    }
    
    return false;
  }, []);

  const handleVote = (votedPlayerId) => {
    const votedPlayer = gameData.players.find(p => p.id === votedPlayerId);

    const updatedPlayers = gameData.players.map(p =>
      p.id === votedPlayerId ? { ...p, isEliminated: true } : p
    );

    setGameData(prev => ({ ...prev, players: updatedPlayers }));

    const gameEnded = checkWinCondition(updatedPlayers);

    if (!gameEnded) {
        setRevealedPlayer(votedPlayer);
        setRevealCardVisible(true);
    }
  };

  const handleDeleteWord = async () => {
    if (!gameData.wordId) {
      showInfoCard("Nie można usunąć słowa, ID nieznane.", 'error');
      return false;
    }
  
    try {
      const response = await fetch(`${API_URL}/${gameData.wordId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Błąd serwera`);
      }
  
      showInfoCard(`Słowo "${gameData.secretWord}" usunięte.`, 'success');
      return true;
    } catch (error) {
      showInfoCard(`Nie udało się usunąć słowa. Błąd: ${error.message}`, 'error');
      return false;
    }
  };

  const onRestart = () => {
    setGameState('setup');
    setCurrentScreen('setup');
    setWinner(null);
  };

  const handleAddWord = async (word, hint) => {
    if (!word || !hint) {
      showInfoCard("Słowo i podpowiedź nie mogą być puste.", 'error');
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, hint }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Błąd serwera');
      }

      const result = await response.json();
      showInfoCard(`Słowo "${result.item.word}" dodane!`, 'success');
      return true;
    } catch (error) {
      showInfoCard(`Nie udało się dodać słowa: ${error.message}`, 'error');
      return false;
    }
  };


  if (!fontsLoaded || showSplash) {
    return (
      <SplashScreen
        onHealthCheckComplete={handleHealthCheckComplete}
        apiUrl={API_URL}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <LinearGradient colors={colors.background} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          {['reveal', 'game', 'voting', 'result'].includes(gameState) && (
            <BackButton onPress={onRestart} />
          )}
          {gameState === 'setup' && currentScreen === 'setup' && (
            <SetupScreen
              players={playersList}
              setPlayers={setPlayersList}
              impostorCount={impostorCount}
              setImpostorCount={setImpostorCount}
              onStart={startGame}
              onNavigateToAddWord={navigateToAddWord}
              onNavigateToPlayers={navigateToPlayers}
              onNavigateToGameMode={navigateToGameMode}
              onNavigateToCategories={navigateToCategories}
            />
          )}

          {gameState === 'setup' && currentScreen === 'add-word' && (
            <AddWordScreen
                onAddWord={handleAddWord}
                onBack={navigateToSetup}
            />
          )}

          {gameState === 'setup' && currentScreen === 'players' && (
            <PlayersScreen
              players={playersList}
              setPlayers={setPlayersList}
              onBack={navigateBackToSetup}
            />
          )}

          {gameState === 'setup' && currentScreen === 'settingsOption' && settingsOption && (
            <SettingsOptionScreen
              title={
                settingsOption === 'gameMode' ? 'Tryb gry' :
                settingsOption === 'categories' ? 'Kategorie' :
                typeof settingsOption === 'string' && settingsOption !== 'gameMode' && settingsOption !== 'categories' ? settingsOption :
                'Ustawienia'
              }
              onBack={navigateBackToSettings}
            />
          )}

          {gameState === 'reveal' && (
            <RevealScreen
              playerName={gameData.players[gameData.currentPlayerIndex]?.name || ''}
              role={gameData.players[gameData.currentPlayerIndex]?.role || ''}
              secretWord={gameData.secretWord}
              category={gameData.category}
              impostorHint={gameData.impostorHint}
              onNext={nextPlayer}
            />
          )}

          {gameState === 'game' && (
            <GameScreen
              category={gameData.category}
              starter={gameData.startingPlayerName}
              onVote={onVote}
            />
          )}

          {gameState === 'voting' && (
            <VotingScreen
              players={gameData.players.filter(p => !p.isEliminated)}
              onVotePlayer={handleVote}
            />
          )}

          {gameState === 'result' && winner && (
            <ResultScreen
              winner={winner}
              secretWord={gameData.secretWord}
              wordId={gameData.wordId}
              onDeleteWord={handleDeleteWord}
              onRestart={onRestart}
            />
          )}

          <InfoCard
            visible={infoCardVisible}
            title={infoCardData.title}
            message={infoCardData.message}
            type={infoCardData.type}
            onOkPress={() => setInfoCardVisible(false)}
          />

          <VotingRevealCard
            visible={revealCardVisible}
            player={revealedPlayer}
            onOkPress={() => {
              setRevealCardVisible(false);
              setGameState('game');
            }}
          />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...layout.container,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
  },
  // Notification Styles
  notificationContainer: {
    position: 'absolute',
    top: 55,
    alignSelf: 'center', // Center horizontally within the parent
    width: '90%',
    zIndex: 1000,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 10,
  },
  successBg: {
    backgroundColor: colors.success,
  },
  errorBg: {
    backgroundColor: colors.danger,
  },
  infoBg: {
    backgroundColor: colors.primary,
  },
  notificationText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
  },
  notificationClose: {
    color: colors.text,
    fontSize: 24,
    marginLeft: 10,
  },
});