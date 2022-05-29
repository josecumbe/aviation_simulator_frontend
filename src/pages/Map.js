import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import '../App.js';
import api from '../services/api.js';

export default function Map() {

    const [receivers, setReceivers] = useState([]);

    async function markers() {
        const result = await api.get('/receiver');
        setReceivers(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        markers();
      }, []);
   
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
      });

    return <div className="map">
        {
            isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100vw", height: "100vh" }}
                  center={{ lat: -1.940278, lng: 29.873888 }}
                  zoom={10}
                >   
                    {receivers.map(receiver => {
                
                        return <>
                            <Marker
                                position={{ lat: receiver.latitude, lng: receiver.longitude }}
                                icon={{
                                    // path: google.maps.SymbolPath.CIRCLE,
                                    url: (require('../assets/icon.ico')),
                                    fillColor: '#EB00FF',
                                    scale: 5,
                                }}
                            />
                            <Circle
                                center={{
                                    lat: parseFloat(receiver.latitude),
                                    lng: parseFloat(receiver.longitude)
                                }}
                                radius={receiver.coverage * 1000}
                            />
                            
                        
                        </>
                       
                    })}
                    
                </GoogleMap>

                
            ) : <></>
        }
    </div>

}