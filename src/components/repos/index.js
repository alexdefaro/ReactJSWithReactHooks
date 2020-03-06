import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 

import api from "../../services/api";
import RepoData from "../repodata"

function Repos() {
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
        <div>
            { 
                repos.map(repo => (
                    <RepoData key={ repo.id } 
                        repoInfo={ repo } 
                        linkToGit={ false } 
                        onHandleFavorite={() => handleFavorite(repo.id) }></RepoData>
                )) 
            }
            <Link to={ `/blocked` }>Access blocked URL</Link>
        </div>
    )
}

export default Repos;
 