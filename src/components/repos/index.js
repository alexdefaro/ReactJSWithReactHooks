import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import api from "../../services/api";
import styled from 'styled-components';

import "./styles.css";

const FavoriteSpan = styled.span`
    color: gold; 
    cursor: pointer;
    float: right;
`;

const FavoriteRepo = styled.span`
    color: gold; 
`;

const NotFavoriteRepo = styled.span`
    color: black; 
`;

function Main() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/users/alexdefaro/repos');
            setRepos(response.data); 
        }
       
        fetchData();        
    }, []);  

    function handleFavorite(id) {
        const handledRepos = repos.map(item => {
            return item.id === id ? { ...item, favorite: true } : item;
        })

        setRepos(handledRepos);
    };

    return (
        <div className="product-list">
            { 
                repos.map(repo => (
                    <article key={repo.id}>
                        <strong>{repo.name}</strong>
                        <FavoriteSpan onClick={() => handleFavorite(repo.id)}> { repo.favorite ? <FavoriteRepo>★</FavoriteRepo>: <NotFavoriteRepo>★</NotFavoriteRepo>  }</FavoriteSpan>
                        <p>{repo.description}</p>
                        <Link to={ `/repos/${repo.name}` }>Access</Link>
                    </article>
                )) 
            }
            <Link to={ `/blocked` }>Access blocked URL</Link>
        </div>
    )
}

export default Main;
 