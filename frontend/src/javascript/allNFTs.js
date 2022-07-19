import '../css/Image.css';
import ImageDisplay from './imageDisplay'
import axios from 'axios';
import { useEffect, useState } from 'react';

import { UserContext } from './UserContext';
import { useContext } from 'react';

export default function AllNFTs() {

    const[result, setResult] = useState({});

    try {
        useEffect (() => {
            axios.get('http://localhost:3500/nfts')
            .then(response => {
                setResult(response.data);
                console.log("result : ", result);
            }) 
            .catch(error => {console.error('There was an error!', error);});
        }, []);
        const nfts =result.map((item, i) => (
            <ImageDisplay
                img={item.image}
                title={item.name}
                desc={item.description}
                hovertext={item.owner}
            />
        ))

        return (
            <div className="background">
            <h3>View all the NFTs on our site here !</h3>
            <div className="box">
                {nfts}
            </div>
        </div>
        )
    } catch (err) {
        console.error('There was an error!', err);
    }
}
/*
var images = [
            {
                img:"images/pikachu.png",
                title:"Pikachu",
                desc:"Pi-Ka !",
                author:"unknown"
            },
            {
                img:"images/daftpunk_lq.png",
                title:"Daft Punk",
                desc:"C'est nous les daft punk.",
                author:"O. Kynn"
            },
            {
                img:"images/bts-young-forever.jpg",
                title:"BTS",
                desc:"Young Forever...",
                author:"O. Kynn"
            },
            {
                img:"images/nuit.jpg",
                title:"Nuit étoilée",
                desc:"La Nuit étoilée est une peinture de l'artiste peintre postimpressionniste néerlandais Vincent van Gogh. Le tableau représente ce que Van Gogh pouvait voir et extrapoler de la chambre qu'il occupait dans l'asile du monastère Saint-Paul-de-Mausole à Saint-Rémy-de-Provence en mai 1889.",
                author:"V. Van Gogh"
            },
            {
                img:"images/orozco.jpg",
                title:"Christiania Impressions",
                desc:"L'artiste hip-hop dano-mexicain Marios Orozco est récemment revenu à la peinture et présente en mai une sélection d'une production époustouflante des perspectives de Christiania de 2011-2012.",
                author:"Marios Orozco"
            },
            {
                img:"images/wolf.jpg",
                title:"Smach !",
                desc:"PROGRAMMED TO WORK AND NOT TO FEEL",
                author:"angiewolfartist"
            },
            {
                img:"images/printemps.jpg",
                title:"Printemps par la Seine",
                desc:"Claude Monet, né sous le nom d'Oscar-Claude Monet le 14 novembre 1840 à Paris et mort le 5 décembre 1926 à Giverny, est un peintre français et l’un des fondateurs de l'impressionnisme.",
                author:"Monet"
            }
        ]
*/