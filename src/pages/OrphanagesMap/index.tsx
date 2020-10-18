import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerImg from '../../images/Local.svg';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
// import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
})

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

const OrphanagesMap: React.FC = () => {

    //estado da variavel
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);


    //buscando api dados do banco de dados
    useEffect(() => {
        api.get('orphanages').then(response => {
            // console.log(response.data)
            setOrphanages(response.data)
        });
    }, []);



    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita 😁</p>
                </header>

                <footer>
                    <strong>Salvador</strong>
                    <span>Bahia</span>
                </footer>
            </aside>

            {/* mapa liflet */}
            <Map
                center={[-12.9869435, -38.4324061]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>




            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;