import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './pokemonApi.module.scss';

function PokemonApi() {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const response = await axios.get(
                    'https://pokeapi.co/api/v2/pokemon?limit=10'
                );
                setPokemonList(response.data.results);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                console.log('123')
            }
        }

        fetchPokemonData();
    }, []);

    const handlePokemonClick = async (pokemonName) => {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            );
            console.log(response);
            setSelectedPokemon(response.data);
        } catch (error) {
            console.error('Ошибка загрузки покемона: ', error);
        }
    };

    return (
        <div className={styles.pokemonWindow}>
            <div className={styles.containerContent}>
                <div className={styles.infoHeader}>
                    <div className={styles.title}>покемоны api</div>
                    <img
                        src="/images/click.svg"
                        alt="Click"
                        className={styles.instructionImg}
                    />
                    <p className={styles.instructionText}>
                        Нажмите на нужное Покемона
                    </p>
                </div>
                <div className={styles.chipsContainer}>
                    <div className={styles.pokemonList}>
                        <ul>
                            {pokemonList.map((pokemon, index) => (
                                <li
                                    className={styles.pokemonItem}
                                    key={index}
                                    onClick={() =>
                                        handlePokemonClick(pokemon.name)
                                    }
                                >
                                    {pokemon.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.pokemonDetailsContainer}>
                        {selectedPokemon && (
                            <div className={styles.pokemonСard}>
                                <h5>{selectedPokemon.name}</h5>
                                <img
                                    src={selectedPokemon.sprites.front_default}
                                    alt={selectedPokemon.name}
                                    className={styles.pokemonImage}
                                />
                                <p>ID: {selectedPokemon.id}</p>
                                <p>Height: {selectedPokemon.height}</p>
                                <p>
                                    Attack:
                                    {
                                        selectedPokemon.stats.find(
                                            (stat) =>
                                                stat.stat.name === 'attack'
                                        ).base_stat
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonApi;
